import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/blog' }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      title: z.string(),
      description: z.string().optional(),
      link: z.string().optional(),
      tags: z.array(z.string()),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      // Project start + finish dates
      dateStarted: z.date({ coerce: true }),
      // Undefined = ongoing project
      dateFinished: z.date({ coerce: true }).optional(),

      // Handled by remark plugin
      dateCreated: z.date({ coerce: true }).optional(),
      lastModified: z.date({ coerce: true }).optional(),
    }),
});

export const collections = { blog };
