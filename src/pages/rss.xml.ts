import rss, { type RSSOptions } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import getModifiedTime from '../util/getModifiedTime';

export async function GET(context: RSSOptions) {
  const blog = await getCollection('blog');

  return rss({
    title: 'Dylan Almond | Portfolio',
    description: `Explore Dylan Almond's portfolio of websites, apps, and digital projects.`,
    site: context.site,
    items: blog.map((post) => {
      const { dateCreated } = getModifiedTime(post.filePath!);

      return {
        title: post.data.title,
        pubDate: new Date(dateCreated),
        description: post.data.description,
        link: `/work/${post.id}/`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
