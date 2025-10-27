# Website V4

Version 4 of [my portfolio site](https://dylanalmond.net/).


## Overview

- Static site built with Astro, focused on fast, accessible, and SEO-friendly delivery.
- Content is authored in Markdown/MDX and served as static pages with optional client-side enhancements.

## Tech stack

- Astro (framework)
- TypeScript
- Tailwind CSS
- Alpine.js (lightweight client-side interactivity)
- Web Components (custom elements)
- Markdown / MDX for content
- PWA (offline support)

## Project layout

```
/
├── public/           # Static assets (images, etc.)
├── src/
│   ├── blog/         # Markdown blog posts
│   ├── components/   # Reusable UI components
│   ├── config/       # JSON-LD schemas + site config
│   ├── images/       # Project images
│   ├── layouts/      # Layout components
│   ├── pages/        # Site pages and routes
│   ├── scripts/      # Client-side script entry points
|   ├── styles/       # Global styles (Tailwind)
|   └── util/         # Utility helpers
└── package.json      # Project scripts and dependencies
```

## Getting started

1. Install dependencies

```sh
yarn install
```

2. Start the development server

```sh
yarn dev
```

3. Build for production

```sh
yarn build
```

4. Preview the production build locally

```sh
yarn preview
```

## Notes / Conventions

- Content: Add new posts under src/blog. Posts are MD or MDX and should follow the collection schema in src/content.config.ts.
- Web components: Component implementations and definitions live in src/components. Register custom elements once (e.g., in a client script) and import where needed. Shadow DOM usage is allowed — prefer light DOM for SEO-critical content unless encapsulation is required.
- Site metadata and contact/social links: src/config/site.ts
- RSS and sitemap: generated automatically; last-modified dates are derived from Git history using src/util/getModifiedTime.ts.
- PWA: service worker and assets are configured via the Vite PWA integration and pwa-assets.config.ts.
- Formatting: Prettier configuration is in .prettierrc. Run the configured script with:

```sh
yarn prettier
```

## Features

- Accessible, keyboard-friendly navigation
- SEO best practices
- Responsive design
- Markdown-powered blog
