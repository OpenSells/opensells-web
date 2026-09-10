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

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const faqItems = t.raw('items') as { q: string; a: string }[];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OpenSells',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://app.opensells.com',
    description: tMeta('description'),
    offers: {
      '@type': 'Offer',
      price: 39,
      priceCurrency: 'EUR',
      description: locale === 'es'
        ? 'Primer mes gratis, sin tarjeta. Después 39 €/mes.'
        : 'First month free, no card required. Then €39/month.',
    },
    featureList: locale === 'es'
      ? 'Búsqueda de empresas por sector y ciudad, Datos públicos de contacto incluido teléfono cuando está disponible, Ficha de llamada preparada con IA, Estados notas y tareas de seguimiento, Borradores de email con IA, Envío desde OpenSells mediante Gmail conectado, Exportación CSV en planes de pago'
      : 'Company search by industry and city, Public contact data including phone when available, AI-prepared call brief, Lead statuses notes and follow-up tasks, AI email drafts, Sending from OpenSells through connected Gmail, CSV export on paid plans',
    publisher: {
      '@type': 'Organization',
      name: 'OpenSells',
      url: 'https://opensells.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <Problem />
        <Features />
        <HowItWorks />
        <Pricing />
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
