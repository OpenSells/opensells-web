import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import BlogPreview from '@/components/BlogPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { ORG_ID, SOFTWARE_ID, WEBSITE_ID, absoluteUrl, pageAlternates } from '@/lib/site';
import { softwareSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    // `absolute`: la plantilla «%s | OpenSells» no se aplica a la portada.
    title: { absolute: t('title') },
    description: t('description'),
    alternates: pageAlternates(locale, '/'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: absoluteUrl(locale, '/'),
      siteName: 'OpenSells',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const faqItems = t.raw('items') as { q: string; a: string }[];
  const url = absoluteUrl(locale, '/');

  /* Las respuestas del FAQPage son las mismas que se ven en la página (el
   * acordeón las lleva todas en el HTML inicial). */
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: tMeta('title'),
        description: tMeta('description'),
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SOFTWARE_ID },
        publisher: { '@id': ORG_ID },
      },
      softwareSchema(locale, tMeta('description')),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        inLanguage: locale,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <Problem />
        <Features locale={locale} />
        <HowItWorks />
        <Pricing locale={locale} />
        <FAQ />
        {/* El blog va ANTES del cierre: estaba después, así que justo tras
            pedirle la venta se le ofrecía una puerta para irse a leer. Lo
            último que ve ahora es la llamada a la acción. */}
        <BlogPreview locale={locale} />
        <FinalCTA />
      </main>
      <Footer locale={locale} />
    </>
  );
}
