import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import InfoPage from '@/components/InfoPage';
import Pricing from '@/components/Pricing';
import { getPage, PAGE_PATHS, type PageKey } from '@/lib/pages';
import { softwareSchema } from '@/lib/schema';
import { absoluteUrl, pageAlternates } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

/* Cada página de /how-it-works, /pricing, etc. es un `page.tsx` de dos líneas
 * que llama a esto. El contenido está en `lib/pages.ts`. */
export function infoMetadata(key: PageKey) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const page = getPage(locale, key);
    const path = PAGE_PATHS[key];
    return {
      // La plantilla del layout añade «| OpenSells», salvo si ya lo lleva.
      title: page.title.includes('OpenSells') ? { absolute: page.title } : page.title,
      description: page.description,
      alternates: pageAlternates(locale, path),
      openGraph: {
        title: page.title,
        description: page.description,
        url: absoluteUrl(locale, path),
        siteName: 'OpenSells',
        locale: locale === 'es' ? 'es_ES' : 'en_US',
        type: 'website',
      },
    };
  };
}

export function infoPage(key: PageKey) {
  return async function Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const page = getPage(locale, key);
    const isPricing = key === 'pricing';
    return (
      <InfoPage
        locale={locale}
        path={PAGE_PATHS[key]}
        content={page}
        extraSchema={isPricing ? [softwareSchema(locale, page.description)] : []}
      >
        {isPricing && <Pricing locale={locale} showDetailsLink={false} />}
      </InfoPage>
    );
  };
}
