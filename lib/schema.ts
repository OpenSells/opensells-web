import { PLANS, USD_COUNTRIES } from '@/lib/pricing';
import { ORG_ID, REGISTER_URL, SITE_URL, SOFTWARE_ID, absoluteUrl } from '@/lib/site';

/* El producto como SoftwareApplication, con una oferta por plan y moneda.
 *
 * Las ofertas son exactamente los precios que se ven en la tabla de precios:
 * euros con IVA incluido para todo el mundo salvo los países hispanohablantes
 * de Latinoamérica, que pagan en dólares (ver `lib/pricing.ts`). Antes había
 * una sola oferta de 39 EUR, sin Agencia y sin los dólares.
 *
 * Sin AggregateRating ni reseñas: no hay valoraciones publicadas que citar. */
export function softwareSchema(locale: string, description: string) {
  const isEs = locale === 'es';
  const planName = (key: string) =>
    key === 'profesional' ? (isEs ? 'Profesional' : 'Professional') : isEs ? 'Agencia' : 'Agency';
  const pricingUrl = absoluteUrl(locale, '/pricing');

  const offers = PLANS.flatMap((plan) => [
    {
      '@type': 'Offer',
      name: `${planName(plan.key)} (EUR)`,
      price: plan.eur,
      priceCurrency: 'EUR',
      url: pricingUrl,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.eur,
        priceCurrency: 'EUR',
        unitCode: 'MON',
        valueAddedTaxIncluded: true,
      },
    },
    {
      '@type': 'Offer',
      name: `${planName(plan.key)} (USD)`,
      price: plan.usd,
      priceCurrency: 'USD',
      url: pricingUrl,
      // Códigos ISO 3166-1 alfa-2, que es lo que acepta eligibleRegion como texto.
      eligibleRegion: USD_COUNTRIES,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.usd,
        priceCurrency: 'USD',
        unitCode: 'MON',
      },
    },
  ]);

  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: 'OpenSells',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: isEs ? 'Software de prospección B2B' : 'B2B prospecting software',
    operatingSystem: 'Web',
    url: SITE_URL,
    installUrl: REGISTER_URL,
    inLanguage: 'es',
    description,
    publisher: { '@id': ORG_ID },
    offers,
    featureList: isEs
      ? [
          'Búsqueda de empresas por sector y ciudad',
          'Datos públicos de contacto, incluido el teléfono cuando está publicado',
          'Ficha de llamada preparada con IA',
          'Estados, notas y tareas de seguimiento',
          'Borradores de email con IA',
          'Envío desde OpenSells mediante una cuenta de Gmail conectada',
          'Exportación CSV en los planes de pago',
          'Presupuestos y facturas con VERI*FACTU (solo España)',
        ]
      : [
          'Company search by industry and city',
          'Public contact details, including phone number when published',
          'AI-prepared call brief',
          'Lead statuses, notes and follow-up tasks',
          'AI email drafts',
          'Sending from OpenSells through a connected Gmail account',
          'CSV export on paid plans',
          'Quotes and VERI*FACTU invoices (Spain only)',
        ],
  };
}

/** BreadcrumbList a partir de pares [nombre, ruta sin prefijo de idioma]. */
export function breadcrumbSchema(locale: string, items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absoluteUrl(locale, path),
    })),
  };
}
