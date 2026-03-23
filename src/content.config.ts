import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/blog' }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      pinned: z.boolean().optional(),
      title: z.string(),
      description: z.string().optional(),
      link: z.string().optional(),
      tags: z.array(z.string()),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),

      // Project start + finish dates
      dateStarted: z.coerce.date(),
      // Undefined = ongoing project
      dateFinished: z.coerce.date().optional(),

      // Handled by remark plugin
      dateCreated: z.coerce.date().optional(),
      lastModified: z.coerce.date().optional(),
    }),
});

export const collections = { blog };
