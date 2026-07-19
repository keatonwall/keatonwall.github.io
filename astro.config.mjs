// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.keatonwall.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Light + dark code themes; CSS in global.css toggles between them.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
