import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    metaDescription: z.string(),
    context: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    breakImage1: z.string().optional(),
    breakImage1Alt: z.string().optional(),
    breakImage2: z.string().optional(),
    breakImage2Alt: z.string().optional(),
    section1Title: z.string().optional(),
    section2Title: z.string().optional(),
    section3Title: z.string().optional(),
    internalLinks: z.array(z.object({
      to: z.string(),
      anchor: z.string(),
    })).optional(),
    externalLinks: z.array(z.object({
      to: z.string(),
      anchor: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

export const collections = { blog };
