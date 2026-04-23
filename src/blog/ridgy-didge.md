---
draft: false
pinned: true
title: 'Ridgy Didge'
dateStarted: '2024-10-01'
description: 'Designed and built the Ridgy Didge website, a portfolio and marketing site for a web and software house in Southampton, built with Astro for strong performance and SEO.'
tags: ['Web Development', 'UI/UX Design', 'Design & SEO']
link: 'https://ridgy-didge.co.uk/'
image:
  src: '../images/ridgy-didge/banner.png'
  alt: 'The Ridgy Didge logo on a dark background.'
---

## Overview

Ridgy Didge is a web and software house based in Southampton, UK, delivering digital products for clients ranging from NHS and Vodafone to growing startups and local businesses. I joined the team as a developer in October 2024 and took on the design and build of the company website.

The goal was a content-driven portfolio site that accurately represents the quality of work delivered to clients and performs well in both traditional and AI-driven search.

![Ridgy Didge Homepage](../images/ridgy-didge/hero.png)

## Design

The site needed to communicate Ridgy Didge's services and process clearly, showcase selected client work, and convert visitors into enquiries. The design prioritised clean layout and clear hierarchy, with the case study section as the primary trust signal given the calibre of clients the company has worked with.

I also contributed to the visual direction for the site, covering the logo, colour palette, and typography.

![Website Design — About Section](../images/ridgy-didge/about.png)

![Website Design — Work / Case Studies](../images/ridgy-didge/work.png)

## Development

The site was built with [**Astro**](https://astro.build/) for its near-zero JavaScript overhead and strong build-time performance, well suited to a static content-heavy site with strict Core Web Vitals requirements.

Key decisions included:

- **Astro Content Collections** for structured case study management.
- **Static-first generation** with vanilla TypeScript for targeted interactivity.
- **JSON-LD structured data** for enhanced visibility in search engines and AI surfaces, directly reflecting the GEO services offered to clients.
- **PWA support** via a service worker for offline resilience and installability.

