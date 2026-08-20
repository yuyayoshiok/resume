import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Project markdown lives at the repository root so that GitHub renders it too.
const projects = defineCollection({
  loader: glob({ base: "../projects", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    subtitle: z.string(),
    desc: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects };
