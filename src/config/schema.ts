import type { CollectionEntry } from 'astro:content';
import { site } from '../config/site';
import type {
  AboutPage,
  Blog,
  BlogPosting,
  ContactPage,
  WebPage,
  WebSite,
} from 'schema-dts';

export const personSchema = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.telephone,
  jobTitle: site.jobTitle,
  sameAs: Object.values(site.socials),
};

export const BlogPostSchema = (
  url: string,
  post: CollectionEntry<'blog'>,
): BlogPosting => {
  return {
    '@type': 'BlogPosting',
    '@id': `${url}/#BlogPosting`,
    mainEntityOfPage: post.data.link ?? url,
    headline: post.data.title,
    name: post.data.title,
    description: post.data.description,
    datePublished: post.data.date.toISOString(),
    dateCreated: post.data.date.toISOString(),
    author: { '@id': personSchema['@id'] },
    publisher: { '@id': personSchema['@id'] },
    image: post.data.image ? site.url + post.data.image.src.src : '',
    keywords: post.data.tags,
  };
};

export const BlogSchema = (
  url: string,
  posts: CollectionEntry<'blog'>[],
  title: string,
  description: string,
): Blog => {
  return {
    '@type': 'Blog',
    '@id': url,
    mainEntityOfPage: url,
    name: title,
    description: description,
    publisher: { '@id': personSchema['@id'] },
    blogPost: posts.map((post) =>
      BlogPostSchema(new URL(post.id, site.url).toString(), post),
    ),
  };
};

export const ContactSchema = (
  url: string,
  title: string,
  description: string,
): ContactPage => {
  return {
    '@type': 'ContactPage',
    '@id': url,
    name: title,
    description: description,
    mainEntity: { '@id': personSchema['@id'] },
  };
};

export const ServicesSchema = (
  url: string,
  title: string,
  description: string,
): WebPage => {
  return {
    '@type': 'WebPage',
    '@id': url,
    name: title,
    description: description,
    mainEntity: {
      '@type': 'OfferCatalog',
      itemListElement: site.services.map(({ name, description }) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: name,
          description: description,
          provider: { '@id': personSchema['@id'] },
        },
      })),
    },
  };
};

export const AboutSchema = (
  url: string,
  title: string,
  description: string,
): AboutPage => {
  return {
    '@type': 'AboutPage',
    name: title,
    description: description,
    url: url,
    mainEntity: { '@id': personSchema['@id'] },
  };
};

export const WebSiteSchema = (
  url: string,
  title: string,
  description: string,
): WebSite => {
  return {
    '@type': 'WebSite',
    name: title,
    description: description,
    url: url,
  };
};
