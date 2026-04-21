import type { MetadataRoute } from 'next';

const base = 'https://opensells.com';

export default function sitemap(): MetadataRoute.Sitemap {
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
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${base}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];
}
