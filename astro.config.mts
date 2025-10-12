import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import getModifiedTime from './src/util/getModifiedTime';
import path from 'node:path';
import fs from 'node:fs';

// https://astro.build/config
export default defineConfig({
  site: 'https://dylanalmond.net',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    alpinejs(),
    mdx(),
    sitemap({
      async serialize(item) {
        const url = new URL(item.url);
        const isFromBlog = !!url.pathname.startsWith('/work');

        // If a blog post, grab the last modified date of the post's file based on the url
        if (isFromBlog) {
          const slug = url.pathname.replace('/work/', '').replace(/\/$/, '');

          const possibleFiles = [
            path.join(process.cwd(), 'src', 'blog', `${slug}.mdx`),
            path.join(process.cwd(), 'src', 'blog', `${slug}.md`),
          ];

          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.7;

          for (const filePath of possibleFiles) {
            if (fs.existsSync(filePath)) {
              const { lastModified } = getModifiedTime(filePath);
              item.lastmod = lastModified;
              break;
            }
          }
        } else {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 1;
        }

        return item;
      },
    }),
  ],
});
