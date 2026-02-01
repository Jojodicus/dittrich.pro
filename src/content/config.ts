import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    thumbnail: z.string().optional(),
    readTime: z.number().optional(),
    draft: z.boolean().default(false),
    toc: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
          level: z.number(),
        })
      )
      .optional(),
  }),
});

const imprint = defineCollection({
  type: 'content',
  schema: z.object({}),
});

export const collections = { blog, imprint };
