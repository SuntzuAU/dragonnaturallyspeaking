# Image Generation Pipeline (mirror)

> **Mirror of the canonical doc at [SuntzuAU/vra-network-config/IMAGE-GENERATION.md](https://github.com/SuntzuAU/vra-network-config/blob/main/IMAGE-GENERATION.md).**
> If editing, edit the canonical version first, then sync here.

This document describes the VRA gateway network's automated image generation system for blog posts. If you are a Claude session about to write or regenerate images for an article in this repo, **read this first**.

Last synced from canonical: 2026-04-22

---

## Architecture (end-to-end)

```
                                       (A)                               (B)
Article commit with frontmatter       +------+   POST /generate       +-------------+
imagesPending:true  ----(push)----->  | Gen  |  ------------------->  | Cloudflare  |
                                       |Workflow|                      |  Worker     |
                                       +------+                        +-------------+
                                          ^                                   |
                                          |                                   | (C)
                                          | (E) commits image keys back       v
                                          |                              +-------------+
                                          +------------------------------|  Gemini 3   |
                                          |                              | Pro Image   |
                                          |                              +-------------+
                                          |                                   |
                                          |                                   | base64 PNG
                                          |                                   v
                                          |                              +-------------+
                                          +------------------------------|  R2 bucket  |
                                                                         | (public)    |
                                                                         +-------------+
                                                                                |
                                                                                v
                                                                    image served to site
```

**(A)** A commit that touches `src/content/news/*.md` triggers the `Generate On-Demand Post Images` GitHub Actions workflow. It only generates if the article frontmatter has `imagesPending: true`.

**(B)** The workflow runs `node generate-images.js post:<filename>.md`, which parses frontmatter, builds the request, and POSTs to the Cloudflare Worker.

**(C)** The Worker (`master-image-generator.speech-recognition-cloud.workers.dev`) calls Google Gemini's `gemini-3-pro-image-preview` model via the Generative Language API with the prompt and requested `aspectRatio` + `imageSize`. The image returns as base64, the Worker decodes it and uploads to the `gateway-images` R2 bucket under `siteId/YYYY/MM/DD/seo-slug-shortuuid.jpg`.

**(D)** The Worker responds with the R2 key.

**(E)** `generate-images.js` writes the R2 key back into the article's frontmatter (`heroImage`, `breakImage1`, `breakImage2`) and flips `imagesPending: false`. The workflow commits the update with `[skip ci]` in the message so it doesn't self-trigger. Cloudflare Pages redeploys with the images live.

---

## Per-article frontmatter

To request images, add these fields to the article's frontmatter before committing:

```yaml
---
title: "..."
date: "2026-04-22"
metaDescription: "..."

# Image keys - leave empty strings; workflow fills these in.
heroImage: ""
heroImageAlt: "Short descriptive alt text for the hero"
breakImage1: ""
breakImage1Alt: "Short descriptive alt text for break image 1"
breakImage2: ""
breakImage2Alt: "Short descriptive alt text for break image 2"

# Required to trigger generation. Flipped to false after a successful run.
imagesPending: true

# Aspect ratio per role. MUST be one of Gemini's supported values (see below).
heroAspectRatio: "16:9"
breakAspectRatio1: "21:9"
breakAspectRatio2: "21:9"

# Optional: override the default image resolution per role.
# Values: "512", "1K", "2K", "4K". Default is 2K.
# heroImageSize: "4K"
# breakImageSize1: "2K"
# breakImageSize2: "2K"

# Prompts. Each one is sent to Gemini with the global suffix from
# src/image-prompt-library.json appended automatically.
heroPrompt: "One or two sentences describing the hero scene. Mid-dictation, fit Australian adult 28-45, smiling, approved mic type."
breakPrompt1: "Short paragraph for break 1. Must include people prominently."
breakPrompt2: "Short paragraph for break 2. Must include people prominently."
---
```

**Alternative to custom prompts**: use a scene from the shared library (`src/image-prompt-library.json`) by setting `heroScene`, `breakScene1`, `breakScene2` to a scene key (e.g. `"doctor-surgery"`). Custom prompts win if both are set.

---

## Supported aspect ratios (Gemini 3 Pro Image Preview)

Any value NOT in this list will be rejected by Gemini with a 400 and the image will fail to generate.

`1:1`, `1:4`, `1:8`, `2:3`, `3:2`, `3:4`, `4:1`, `4:3`, `4:5`, `5:4`, `8:1`, `9:16`, `16:9`, `21:9`

**Common mistake**: `3:1` is **not** supported. Use `21:9` for cinematic break strips - it's the closest supported ratio (2.33:1 vs 3:1) and actually fits the Astro break-image layout box better than 3:1 would have.

### Role defaults (in `generate-images.js`)

| Role | Default aspect ratio | Notes |
|---|---|---|
| `hero` | `16:9` | Full-width hero above the article title |
| `break1` | `21:9` | Cinematic strip injected after the 1st h2 section |
| `break2` | `21:9` | Cinematic strip injected ~2/3 through |
| `feat1` / `feat2` | `16:9` | Site-level feature images (Phase 1) |

Per-article overrides via the frontmatter `heroAspectRatio` / `breakAspectRatio1` / `breakAspectRatio2` fields.

---

## imageSize (resolution)

The Worker passes `imageSize` through to `generationConfig.imageConfig.imageSize`. Gemini supports `"512"`, `"1K"`, `"2K"`, `"4K"`. Higher sizes cost more tokens and take longer.

**Default**: `2K` - meaningful quality uplift over the base `1K` default without the `4K` cost jump.

Per-role frontmatter override: `heroImageSize`, `breakImageSize1`, `breakImageSize2`.

**Known caveat**: a small number of Gemini users have reported `imageSize` being silently ignored for certain edit workflows. If an image comes back at the wrong resolution, check the R2 customMetadata first - the Worker records the requested size there.

---

## Prompt rules (applied via the shared suffix)

Every prompt sent to the Worker has the `suffix`, `heroSuffix` or `breakSuffix` from `src/image-prompt-library.json` appended automatically. These enforce network-wide rules so individual articles don't need to repeat them.

Current rules (see `src/image-prompt-library.json` for the live text):

- Subjects **prominently featured**, attractive and fit Australian adults **aged 28-45**
- **Warm genuine smiles or confident relaxed expressions**, looking toward camera or mid-conversation
- Professionally dressed and well-groomed
- **Equipment restricted to**: discreet Bluetooth headset with boom microphone, compact gooseneck desktop microphone, or dictating directly into laptop built-in microphone
- **Never** a large bulky studio microphone, podcast-style microphone, or Yeti / Yeti-style microphone
- Photorealistic DSLR style, warm lighting, shallow depth of field, rich colour grading
- No text overlays, no logos, no UI mockups, no watermarks, no stock-photo cliches
- **No empty rooms** - break images must feature people

Per-article prompts should focus on scene specifics (subject role, setting, action, equipment detail) and trust the suffix to enforce the global rules.

---

## Guardrails on the generate-on-demand workflow

The workflow `.github/workflows/generate-on-demand.yml` has 8 guardrails. Understanding them matters when a run fails.

1. **Path filter**: only runs on push to `main` touching `src/content/news/*.md`
2. **Per-article opt-in**: requires `imagesPending: true` in the frontmatter. No flag, no generation.
3. **Per-run cap**: hard limit of **3 articles per single push**. Pushing more fails preflight.
4. **Concurrency lock**: only one run of this workflow active at a time.
5. **Daily quota**: max **5 successful runs per trailing 24 hours**, measured via `gh run list`.
6. **Kill switch**: repo variable `IMAGE_GEN_ENABLED` must equal `"true"`. If unset or any other value, the workflow fails preflight immediately.
7. **No self-trigger loop**: the `github-actions[bot]` commit that writes the image keys is skipped by the workflow. Also uses `[skip ci]` in the commit message as a belt-and-braces second layer.
8. **Audit log**: every successful generation appends to `implementations/image-generation.log` with timestamp, slug, and run id.

### Budget ceiling under normal conditions

5 runs/24h x 3 articles/run x 3 images/article = **45 images / 24h maximum**. Typical cadence: 3-9 images per day across the network.

### When preflight fails on a text-only edit

A text edit to an article commits to `src/content/news/*.md`, which matches the path filter, which fires the workflow. If `imagesPending: false` across all touched files, the workflow detects zero work and exits early - but the daily-quota and kill-switch checks run BEFORE that zero-work check and can still fail the job with an email notification. This is cosmetic noise; no images are affected. A future improvement is to reorder preflight so the flag check runs first.

---

## Per-site setup requirements

A gateway site repo needs all of the following for the on-demand pipeline to work:

1. **File**: `generate-images.js` at repo root - the shared Node script
2. **File**: `.github/workflows/generate-on-demand.yml` - the push-triggered workflow
3. **File**: `src/content/config.ts` - Astro content collection schema with `imagesPending`, `heroPrompt`, `breakPrompt1`, `breakPrompt2`, `heroAspectRatio`, `breakAspectRatio1`, `breakAspectRatio2`, `heroImageSize`, `breakImageSize1`, `breakImageSize2` fields declared as optional
4. **File**: `src/pages/news/[slug].astro` - Astro layout that reads `heroImage`, `breakImage1`, `breakImage2` from frontmatter and renders them (break images should be injected inline via the h2-split script - see dragonnaturallyspeaking for the pattern)
5. **File**: `src/image-prompt-library.json` - copy of the shared library
6. **Repo secret**: `ADMIN_TOKEN` - optional Worker auth bearer token (skip if the Worker doesn't require auth in that environment)
7. **Repo variable**: `IMAGE_GEN_ENABLED` = `"true"` - **must be set or the workflow fails preflight**
8. **Repo variable**: `R2_PUBLIC_BASE` - e.g. `https://pub-c7a09e1ddb7c45e6a38fcdca1e4b6897.r2.dev`

The `SITE_ID` environment variable in the workflow YAML should match the R2 folder prefix convention (e.g. `dragonnaturallyspeaking`, `cloudprinting`, etc.).

---

## Troubleshooting

### "I committed with imagesPending:true but nothing happened"

Check in this order:
1. Repo variable `IMAGE_GEN_ENABLED` is set to `true` (lowercase `true` as a string)
2. Daily quota not exhausted - check the Actions tab for successful run count in trailing 24h
3. The commit actually touched `src/content/news/*.md` (not `src/content/news/_placeholder.md`, which is filtered out)
4. You haven't stacked more than 3 flagged articles in a single push
5. Workflow file `.github/workflows/generate-on-demand.yml` exists and is on main

### "Hero generated but break images are missing"

Almost always an unsupported aspect ratio. Gemini returns a 400 error for ratios outside the supported list, `generate-images.js` catches and skips that role, but the hero (which defaulted to `16:9`) succeeded. Fix: check `breakAspectRatio1` / `breakAspectRatio2` are in the supported list.

### "Images look plain / generic / wrong equipment"

The prompt library is the knob for global quality. Edit `src/image-prompt-library.json` suffix fields to strengthen directives. Gemini responds better to short concrete prompts than long prompts with many negatives.

### "Images exist in R2 but aren't showing on the live page"

Layout issue, not generation issue. Verify the image loads at its direct R2 URL first. If yes, check `src/pages/news/[slug].astro` is rendering break images inline inside the body, not at container edges. See the DNS repo's layout for the h2-split injection pattern.

### "Preflight failed on a text-only edit"

Known cosmetic bug - see "When preflight fails on a text-only edit" section above. Article content still deployed correctly. Ignore the email.

---

## Rollback references

Key commits on the DNS repo (as reference templates for other site migrations):

- `f7f2615` - added `generate-on-demand.yml` with 8 guardrails
- `2943b4c` - rewrote `image-prompt-library.json` for people-first prompts
- `924c444` - fixed aspect ratio 3:1 -> 21:9 in `generate-images.js`, added imageSize 2K
- `ff1cb18` - inlined break images inside `[slug].astro` body via h2-split script
- Worker source lives in the Cloudflare dashboard for `master-image-generator` (not in git). Current version accepts `aspectRatio` (allow-listed) and `imageSize` ("512", "1K", "2K", "4K") in the POST body.
