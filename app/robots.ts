import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/* Acceso abierto para todos los rastreadores, como hasta ahora.
 *
 * ⚠️ Esta regla general también deja pasar a los rastreadores de
 * entrenamiento de modelos (GPTBot, ClaudeBot, Google-Extended, CCBot…), no
 * solo a los de búsqueda (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot,
 * PerplexityBot). Es la política que había y no se ha cambiado: decidir si se
 * bloquea el entrenamiento es cosa del propietario. Si se decide, se añade una
 * regla `disallow: '/'` por cada user-agent de entrenamiento, sin tocar los de
 * búsqueda. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
