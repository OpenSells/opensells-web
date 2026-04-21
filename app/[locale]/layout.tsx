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
    title: t('title'),
    description: t('description'),
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

  return (
    <html lang={locale} className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
