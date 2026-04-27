import type { MetadataRoute } from 'next';
import { getPostsByLocale } from '@/lib/blog';

const base = 'https://opensells.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const esPosts = getPostsByLocale('es');
  const enPosts = getPostsByLocale('en');

  const esPostEntries: MetadataRoute.Sitemap = esPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const enPostEntries: MetadataRoute.Sitemap = enPosts.map((post) => ({
    url: `${base}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { es: base, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { es: base, en: `${base}/en` } },
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { es: `${base}/blog`, en: `${base}/en/blog` } },
    },
    {
      url: `${base}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: { languages: { es: `${base}/blog`, en: `${base}/en/blog` } },
    },
    ...esPostEntries,
    ...enPostEntries,
  ];
}
