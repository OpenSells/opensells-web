import type { MetadataRoute } from 'next';
import { getPostsByLocale, type Post } from '@/lib/blog';
import { PAGE_UPDATED, absoluteUrl } from '@/lib/site';

/* Solo URL canónicas e indexables que responden 200:
 *   - host www (el que sirve producción; el dominio sin www redirige);
 *   - sin las páginas legales, que llevan noindex;
 *   - `lastModified` con la fecha real de la última revisión (PAGE_UPDATED y
 *     `updated` de cada artículo), no `new Date()` en cada build;
 *   - hreflang recíproco solo entre páginas que son la misma en los dos
 *     idiomas, con x-default al español. */

function languages(es?: string, en?: string) {
  if (!es || !en) return undefined;
  return { languages: { es, en, 'x-default': es } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = Object.keys(PAGE_UPDATED);

  const pages: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    (['es', 'en'] as const).map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: PAGE_UPDATED[path],
      alternates: languages(absoluteUrl('es', path), absoluteUrl('en', path)),
    })),
  );

  const postEntry = (post: Post) => {
    const own = absoluteUrl(post.locale, `/blog/${post.slug}`);
    const other = post.translation
      ? absoluteUrl(post.locale === 'es' ? 'en' : 'es', `/blog/${post.translation}`)
      : undefined;
    const [es, en] = post.locale === 'es' ? [own, other] : [other, own];
    return {
      url: own,
      lastModified: post.updated,
      alternates: languages(es, en),
    };
  };

  return [
    ...pages,
    ...getPostsByLocale('es').map(postEntry),
    ...getPostsByLocale('en').map(postEntry),
  ];
}
