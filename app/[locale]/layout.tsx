import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import { CONTACT_EMAIL, ORG_ID, SITE_URL, WEBSITE_ID } from '@/lib/site';
import '../globals.css';

/* La web se estaba viendo en Arial: globals.css lo fijaba a mano y no había
 * ninguna fuente cargada. Inter es la tipografía de referencia del SaaS B2B
 * y tiene el latín completo, así que los acentos y la ñ salen bien. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  /* Sin `alternates` aquí: el merge de metadata es superficial y cada página
   * que no declaraba los suyos heredaba el canonical de la portada (pasaba en
   * /cookies y en las 404). Cada página declara el suyo con `pageAlternates`. */
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: 'OpenSells', template: '%s | OpenSells' },
    description: t('description'),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'OpenSells',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'es' | 'en')) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });

  /* La organización y el sitio, una vez y con @id fijo, para que el resto de
   * páginas se refieran a ellos. Se quitaron dos cosas que no eran ciertas:
   *   - SearchAction hacia /blog?q=: el blog no tiene buscador, esa URL
   *     enseñaba la lista entera sin filtrar nada.
   *   - sameAs: app.opensells.com: es la aplicación, no otro perfil de la
   *     misma organización. sameAs es para perfiles equivalentes verificados
   *     (LinkedIn, etc.); de momento no hay ninguno que declarar. */
  const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'OpenSells',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
        email: CONTACT_EMAIL,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: CONTACT_EMAIL,
          availableLanguage: ['es'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'OpenSells',
        url: SITE_URL,
        description: t('description'),
        // Español a secas, no de España: la web es para todo el público hispano.
        inLanguage: locale === 'es' ? 'es' : 'en',
        publisher: { '@id': ORG_ID },
      },
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${inter.className} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Script id="oaiq-pixel" strategy="beforeInteractive">
          {`!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"3taQBBxRK3YTxL7gw2bHo6"});`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
