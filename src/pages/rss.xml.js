import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  return rss({
    title: 'Dylan Almond | Portfolio',
    description: `Explore Dylan Almond's portfolio of websites, apps, and digital projects.`,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/work/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
