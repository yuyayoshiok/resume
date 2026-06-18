import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    emoji: z.string(),
    order: z.number(),
    desc: z.string(),
    subtitle: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects };
