// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import { remarkModifiedTime } from './remark-modified-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://dylanalmond.net',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  integrations: [alpinejs(), sitemap()],
});
