import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { REGISTER_URL, WEBSITE_ID, ORG_ID, absoluteUrl } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import type { PageContent } from '@/lib/pages';

/* Plantilla de las páginas de producto y empresa (/how-it-works,
 * /ai-call-brief, /for-agencies, /pricing, /about, /contact).
 *
 * Todo el texto va en el HTML inicial, con un H1 y H2 por sección, para que
 * se entienda sin ejecutar JavaScript. El contenido vive en `lib/pages.ts`. */
export default function InfoPage({
  locale,
  path,
  content,
  children,
  extraSchema = [],
}: {
  locale: string;
  path: string;
  content: PageContent;
  children?: React.ReactNode;
  extraSchema?: object[];
}) {
  const url = absoluteUrl(locale, path);
  const isEs = locale === 'es';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': content.schemaType ?? 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: content.title,
        description: content.description,
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORG_ID },
        ...(content.schemaType === 'AboutPage' || content.schemaType === 'ContactPage'
          ? { about: { '@id': ORG_ID } }
          : {}),
      },
      breadcrumbSchema(locale, [
        [isEs ? 'Inicio' : 'Home', '/'],
        [content.breadcrumb, path],
      ]),
      ...extraSchema,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar locale={locale} />
      <main className="min-h-screen bg-white">
        <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-100">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            {content.eyebrow && (
              <p className="text-sm font-semibold text-brand-600 mb-3">{content.eyebrow}</p>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">{content.h1}</h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">{content.intro}</p>
          </div>
        </section>

        {children}

        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-16">
          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-slate-600 prose-li:text-slate-600
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800"
          >
            {content.sections.map((section) => (
              <section key={section.h2}>
                <h2>{section.h2}</h2>
                {section.body?.map((html, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((html, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
                    ))}
                  </ul>
                )}
                {section.after?.map((html, i) => (
                  <p key={`a${i}`} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
              </section>
            ))}
          </div>

          {content.cta !== false && (
            <div className="mt-14 rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
              <p className="text-lg font-bold text-slate-900 mb-2">
                {isEs ? 'Pruébalo con tu sector y tu ciudad' : 'Try it with your industry and city'}
              </p>
              <p className="text-slate-500 mb-6 text-sm">
                {isEs
                  ? 'El primer mes del plan Profesional es gratis y no pedimos tarjeta.'
                  : 'The first month of the Professional plan is free and no card is required. The app is in Spanish.'}
              </p>
              <a
                href={REGISTER_URL}
                className="inline-flex h-11 items-center rounded-xl bg-brand-500 px-8 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
              >
                {isEs ? 'Empieza gratis' : 'Start free'}
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
