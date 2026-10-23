import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['published', 'coming-soon']).default('coming-soon'),
    // Set false to keep a published post off X and Substack (see scripts/crosspost).
    crosspost: z.boolean().default(true),
  }),
});

export const collections = { blog };
