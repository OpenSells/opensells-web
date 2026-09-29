/* Una sola fuente para las URL del sitio.
 *
 * El host canónico es www: producción sirve en https://www.opensells.com y el
 * dominio sin www redirige ahí (configurado en Vercel, no en este repo). Hasta
 * septiembre de 2026 canonical, hreflang, sitemap y JSON-LD apuntaban al
 * dominio sin www, así que cada URL declarada como canónica respondía con una
 * redirección. Cualquier URL absoluta del sitio sale de aquí. */

export const SITE_URL = 'https://www.opensells.com';
export const APP_URL = 'https://app.opensells.com';

/* El registro vive en /login?tab=register. `${APP_URL}/register` no existe
 * (404): los artículos del blog lo enlazaban y el botón no llevaba a ningún
 * sitio. */
export const REGISTER_URL = `${APP_URL}/login?tab=register`;
export const LOGIN_URL = `${APP_URL}/login`;

export const CONTACT_EMAIL = 'opensellscontact@gmail.com';

export type Locale = 'es' | 'en';

/** Ruta interna con el prefijo del idioma (el español va sin prefijo). */
export function localePath(locale: string, path: string): string {
  const clean = path === '/' ? '' : path;
  return locale === 'en' ? `/en${clean}` : clean || '/';
}

/** URL absoluta y canónica de una ruta en un idioma. */
export function absoluteUrl(locale: string, path: string): string {
  const p = localePath(locale, path);
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}

/** `alternates` de Next para una página.
 *
 * `path` es la ruta sin prefijo de idioma. Si la página existe en los dos
 * idiomas con la misma ruta, se declaran los dos y `x-default` (español, el
 * mercado principal). Si solo existe en uno, solo canonical: declarar como
 * traducción una página que no lo es confunde a los buscadores. */
export function pageAlternates(
  locale: string,
  path: string,
  translations: Partial<Record<Locale, string>> | 'same' | 'none' = 'same',
) {
  const canonical = absoluteUrl(locale, path);
  if (translations === 'none') return { canonical };
  const paths: Partial<Record<Locale, string>> =
    translations === 'same' ? { es: path, en: path } : { [locale as Locale]: path, ...translations };
  const languages: Record<string, string> = {};
  if (paths.es) languages.es = absoluteUrl('es', paths.es);
  if (paths.en) languages.en = absoluteUrl('en', paths.en);
  if (paths.es && paths.en) languages['x-default'] = languages.es;
  return Object.keys(languages).length > 1 ? { canonical, languages } : { canonical };
}

/* Fecha de la última modificación real de cada página estática, para el
 * `lastmod` del sitemap. Actualizarla a mano cuando cambie el contenido de la
 * página; poner `new Date()` le dice a los buscadores que todo cambia en cada
 * despliegue, y dejan de creérselo. */
export const PAGE_UPDATED: Record<string, string> = {
  '/': '2026-09-29',
  '/how-it-works': '2026-09-29',
  '/ai-call-brief': '2026-09-29',
  '/for-agencies': '2026-09-29',
  '/pricing': '2026-09-29',
  '/about': '2026-09-29',
  '/contact': '2026-09-29',
  '/blog': '2026-09-29',
};

/* Identificadores estables de las entidades JSON-LD, para que la página de
 * inicio, los artículos y el resto se refieran a la misma organización. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
