import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      thumbnail: image().optional(),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/imprint' }),
  schema: z.object({}),
});

export const collections = { blog, imprint };
