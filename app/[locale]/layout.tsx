import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import '../globals.css';

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = 'https://opensells.com';
  const canonical = locale === 'es' ? base : `${base}/en`;

  return {
    title: { default: 'OpenSells', template: '%s | OpenSells' },
    description: t('description'),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    alternates: {
      canonical,
      languages: { es: base, en: `${base}/en` },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonical,
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

  const base = 'https://opensells.com';
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OpenSells',
    url: base,
    description: 'Plataforma SaaS para generación de leads B2B con IA. Genera leads verificados y emails personalizados en segundos.',
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${base}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenSells',
      url: base,
      logo: { '@type': 'ImageObject', url: `${base}/favicon.svg` },
      sameAs: ['https://app.opensells.com'],
    },
  };

  return (
    <html lang={locale} className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
