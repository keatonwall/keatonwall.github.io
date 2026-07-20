// Site-wide metadata and shared constants.

// The site/brand name (header wordmark, page titles, RSS).
export const SITE_TITLE = 'Brick by Brick';
// The person behind it (footer, home eyebrow, copyright).
export const AUTHOR_NAME = 'Keaton Wall';
export const SITE_DESCRIPTION =
  'A place to keep what I learn. Tech, work, home projects, family, money, and everything in between.';
export const SITE_URL = 'https://www.keatonwall.com';

// The blog taxonomy. `id` is stored in frontmatter; `label` is shown in the UI.
// Keep this list in sync with the `category` enum in src/content.config.ts
// and the select options in .pages.yml.
export const CATEGORIES = [
  { id: 'tech', label: 'Tech & Building' },
  { id: 'work', label: 'Work & Leadership' },
  { id: 'home', label: 'Home & Yard' },
  { id: 'family', label: 'Family & Relationships' },
  { id: 'money', label: 'Money' },
  { id: 'faith', label: 'Faith & Life' },
  { id: 'learning', label: 'Learning' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id) as [CategoryId, ...CategoryId[]];

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

// Navigation shown in the header.
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/tags', label: 'Tags' },
  { href: '/search', label: 'Search' },
  { href: '/about', label: 'About' },
];
