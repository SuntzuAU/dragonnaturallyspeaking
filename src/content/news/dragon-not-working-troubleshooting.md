---
title: "Dragon Not Working? Common Dragon NaturallySpeaking Problems and How to Fix Them"
date: "2026-06-26"
metaDescription: "Dragon NaturallySpeaking not working? This guide covers the most common Dragon speech recognition problems in 2026 and explains when switching to a cloud alternative makes more sense than troubleshooting."
heroImage: "general/2026/06/26/images-dragonnaturallyspeaking-dragon-not-working-hero.jpg"
heroImageAlt: "Frustrated Australian professional at a desk with Dragon NaturallySpeaking showing an error on screen"
breakImage1: "general/2026/06/26/images-dragonnaturallyspeaking-dragon-not-working-break1.jpg"
breakImage1Alt: "Australian professional checking microphone settings on a Windows laptop"
breakImage2: "general/2026/06/26/images-dragonnaturallyspeaking-dragon-not-working-break2.jpg"
breakImage2Alt: "Australian professional successfully dictating into a cloud speech recognition application on Windows"
context: "professional"
section1Title: "The Most Common Dragon Problems"
section2Title: "When Troubleshooting Is Not Worth It"
imagesPending: true
heroAspectRatio: "16:9"
breakAspectRatio1: "21:9"
breakAspectRatio2: "21:9"
heroPrompt: "Attractive Australian professional aged 32-42, smart casual attire, sitting at a modern desk with a laptop showing a Windows error dialog. Mildly frustrated expression, one hand on chin, leaning slightly forward. Clean home office environment, natural daylight, shallow depth of field, warm tones."
breakPrompt1: "Attractive fit Australian professional aged 30-42 checking audio settings on a Windows laptop, USB headset visible on the desk beside them. Focused expression, calm and methodical. Modern home office, warm side lighting, shallow depth of field."
breakPrompt2: "Attractive Australian professional aged 30-42 dictating confidently into a headset at a clean desk, Windows application open on screen showing text appearing in real time. Relaxed productive expression. Modern home office or small business setting, warm natural light, shallow depth of field."
internalLinks:
  - to: "/dragon-professional-16"
    anchor: "Dragon Professional 16"
externalLinks:
  - to: "voicerecognition.com.au"
    anchor: "speech recognition software for Windows"
    url: "https://www.voicerecognition.com.au"
  - to: "speechrecognition.cloud"
    anchor: "Speech Recognition Cloud for Windows"
    url: "https://www.speechrecognition.cloud"
---

Dragon NaturallySpeaking problems fall into a few well-worn categories. Some are quick to fix. Others — particularly the ones that come back repeatedly — are a signal that the product configuration or the version you are running has reached the end of its useful life. This guide covers both: the fixes worth trying and the point at which switching to a different product is the better use of your time.

## The Most Common Dragon Problems

### Dragon Is Not Recognising My Voice

The most common cause of sudden accuracy degradation is a microphone problem rather than a Dragon problem. Check these first before touching any Dragon settings:

- **Microphone not selected.** Windows sometimes resets the default recording device after a Windows Update or driver update. Open Sound Settings in Windows, go to Input, and confirm Dragon's expected microphone is selected and not set to zero volume.
- **Microphone physically damaged or loose.** USB headset connections can fail intermittently. Try a different USB port, or test the microphone in Windows Voice Recorder to confirm it is capturing audio at all.
- **Background noise increase.** Dragon's accuracy degrades in noisy environments. If you have moved to a different workspace, added a fan or air conditioner, or are working near an open window, accuracy will drop.

If the microphone is working correctly and accuracy has dropped noticeably, the second thing to check is whether your voice profile has corrupted. This happens more often than Nuance acknowledges. Symptoms include sudden accuracy that is much worse than what you are used to, errors on words Dragon has always handled correctly, and accuracy that does not improve even after re-doing accuracy tuning.

If you suspect a corrupted profile, the practical fix is to create a new voice profile rather than trying to repair the existing one. You lose your corrections but usually recover your previous accuracy level within a few sessions.

### Dragon Will Not Open or Crashes on Launch

Dragon Professional 16 installs deeply into Windows. Compatibility problems with Windows Updates, antivirus software, or other applications that hook into Windows audio or accessibility APIs are a persistent source of launch failures.

Steps in order:

1. Check Windows Event Viewer for crash details — Application log, look for entries from DragonPad or NaturallySpeaking at the time of the crash
2. Temporarily disable your antivirus real-time protection and try launching — some security products flag Dragon's microphone access or inject DLLs that conflict with Dragon's audio pipeline
3. Run Dragon as Administrator
4. Check whether a recent Windows Update coincides with when the problem started — Microsoft's monthly updates occasionally break Dragon's Windows hooks; Nuance typically releases a patch within a few weeks of a major compatibility break

### Dragon Not Working in a Specific Application

Dragon does not always work equally well in every Windows application. The most common manifestation is Dragon reverting to a dictation box — text goes into a separate Dragon window rather than directly into the target application. This happens when Dragon cannot hook into the target app's text input layer.

Workarounds:
- Enable the Dragon Dictation Box manually and paste from there — not ideal, but functional
- Check whether a newer Dragon version has added support for your application
- For browser-based applications, ensure Dragon's browser extension (if available for your browser) is installed and enabled

If the target application is one you use constantly and the dictation box workaround is adding meaningful friction to your day, that is a legitimate reason to evaluate whether a cursor-based alternative without application-specific dependencies would suit you better.

### Dragon Keeps Asking to Release Serial Numbers

This is one of the most common frustrations with Dragon Professional 16 in practice. Dragon licences are device-bound. When you reinstall Windows, replace a computer, or move from a laptop to a desktop, you need to release the serial number from the old machine before activating on the new one. If the old machine is gone — lost, dead, wiped — you cannot self-service the release and need to contact support.

The process is: contact Nuance (now Microsoft) support or your Australian Dragon reseller with proof of purchase, explain the situation, and request a manual serial number release. It is usually resolved within a few days, but it can block your work entirely in the meantime.

This is not a bug — it is by design. Dragon's licence model exists to prevent sharing. But it creates a genuinely poor experience for users who replace computers frequently or who run Dragon across a small business where machines turn over.

### Dragon Working Slowly or High CPU Usage

Dragon Professional 16 is a resource-intensive application. It uses significant CPU and RAM, particularly during accuracy tuning, profile saves, and when driving large documents.

- **Close other memory-intensive applications** before running Dragon on a machine with 8GB RAM or less
- **Disable Dragon's automatic vocabulary updates** if CPU spikes are happening mid-dictation — these can be scheduled for times you are not actively using Dragon
- **Check disk space** — Dragon's profile data grows over time and very low disk space causes performance problems

On machines older than five years, you may be at the limit of what Dragon Professional 16 will run well on. The minimum spec is genuinely a minimum; comfortable performance requires more.

<div style="background:#0d1b2a;border-radius:14px;padding:28px 32px;margin:40px 0;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;">
<p style="margin:0;color:#cbd5e1;font-size:15px;max-width:520px;line-height:1.6;">Spending more time managing Dragon than using it? Speech Recognition Cloud installs in minutes, requires no training, and works in any Windows application without serial number management.</p>
<a href="https://www.speechrecognition.cloud" style="display:inline-block;background:#ff6b35;color:#ffffff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px;text-decoration:none;white-space:nowrap;letter-spacing:0.02em;">Try Free — No Card Required</a>
</div>

## When Troubleshooting Is Not Worth It

There is a class of Dragon user for whom troubleshooting is always going to be an ongoing activity rather than a one-time fix. These are the situations where the honest advice is to evaluate whether a different product would cost less time over the next two years than continuing to maintain Dragon.

**You are on Dragon 13, 14, or 15.** These versions are no longer supported on Windows 11 and receive no updates. Compatibility problems will increase over time as Windows evolves, not decrease. The options are to upgrade to Dragon Professional 16 or move to a different product.

**You have replaced your computer and lost your voice profile.** Voice profiles cannot be transferred between machines that have significantly different hardware profiles. If you are starting fresh anyway, the investment in re-training is the same whether you stay on Dragon or switch to a product that requires no training at all.

**The serial number release problem has happened more than once.** If serial number friction is a recurring part of your Dragon experience, it will keep happening. Cloud-based dictation products do not have this problem — your login follows you to any machine.

**Dragon's accuracy has plateaued below your expectations.** Some users never reach the accuracy level they expected from Dragon. If months of corrections and accuracy tuning have not produced the result you want, a different ASR engine may simply handle your voice, accent, or vocabulary better.

### What to Try Instead

[Speech Recognition Cloud for Windows](https://www.speechrecognition.cloud) is worth a trial before committing to anything. The free edition gives you 20 minutes of dictation per month — enough to verify whether the accuracy and workflow suit you — with no credit card required. It installs as a small Windows application, presses a hotkey to activate, and types at your cursor in any Windows program. No dictation box, no profile training, no serial number.

For users who need to stay on Dragon, the right path depends on which version you are on and what the specific problem is. [Speech recognition software for Windows](https://www.voicerecognition.com.au) advice, upgrade eligibility checks, and Dragon support are available through Voice Recognition Australia, which has been deploying Dragon in Australian businesses for over 25 years.

## Summary

- Sudden accuracy drops are usually a microphone problem before they are a Dragon problem — check audio settings first
- Corrupted voice profiles are more common than Nuance acknowledges — create a new profile before assuming the product is broken
- Application compatibility and dictation box issues are a Dragon architecture constraint, not a configuration problem
- Serial number management is an inherent part of Dragon's device-bound licence model — if it has caused problems once, it will again
- Users on Dragon 13, 14, or 15 should plan to upgrade or move to a supported alternative — Windows 11 compatibility will not improve on end-of-life versions
- Speech Recognition Cloud is worth trialling for users who are spending significant time managing Dragon rather than using it — free edition available with no credit card
