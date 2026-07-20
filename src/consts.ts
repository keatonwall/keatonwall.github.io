// Site-wide metadata and shared constants.

export const SITE_TITLE = 'Keaton Wall';
export const SITE_DESCRIPTION =
  'Notes on building, learning, work, and faith. Things worth writing down.';
export const SITE_URL = 'https://www.keatonwall.com';

// The blog taxonomy. `id` is stored in frontmatter; `label` is shown in the UI.
// Keep this list in sync with the `category` enum in src/content.config.ts
// and the select options in .pages.yml.
export const CATEGORIES = [
  { id: 'tech', label: 'Tech & Building' },
  { id: 'learning', label: 'Learning & Ideas' },
  { id: 'work', label: 'Work & Leadership' },
  { id: 'faith', label: 'Faith & Life' },
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
  { href: '/about', label: 'About' },
];
