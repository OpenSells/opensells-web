import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  /* Sin redirección por idioma del navegador. Con `true`, quien pedía una URL
   * en español con el navegador (o el bot) en inglés acababa en /en/...: la
   * portada iba a /en, y los artículos que solo existen en español, a una URL
   * /en/blog/... que da 404. Los buscadores recomiendan no redirigir por
   * idioma; el selector de idioma del menú sigue ahí. */
  localeDetection: false,
});
