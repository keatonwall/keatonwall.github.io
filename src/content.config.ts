import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_IDS } from './consts';

const blog = defineCollection({
  // Load Markdown/MDX files from src/content/blog/.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Falls back to the catch-all rather than failing the build. A post saved
    // without a category should land in Learning, not block every deploy.
    category: z.enum(CATEGORY_IDS).default('learning'),
    tags: z.array(z.string()).default([]),
    // Public path (e.g. /images/foo.jpg) written by the CMS into public/images.
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Recipes I want to try. Frontmatter only, one file per recipe, managed in
// Pages CMS. Keep fields in sync with the `toTry` collection in .pages.yml.
const toTry = defineCollection({
  loader: glob({ base: './src/content/to-try', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url().optional(),
    source: z.string().optional(),
    note: z.string().optional(),
    addedDate: z.coerce.date(),
    tried: z.boolean().default(false),
    // Slug of the blog post written about it, e.g. best-salmon-traeger.
    post: z.string().optional(),
  }),
});

export const collections = { blog, toTry };
