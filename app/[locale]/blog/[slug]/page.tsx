import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getPostsByLocale, type Post } from '@/lib/blog';
import { ORG_ID, REGISTER_URL, WEBSITE_ID, absoluteUrl, localePath, pageAlternates } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ['es', 'en'];
  return locales.flatMap((locale) =>
    getPostsByLocale(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

/* hreflang solo cuando el artículo tiene una traducción de verdad (`translation`
 * en lib/blog.ts). Los que no la tienen declaran solo su canonical. */
function postAlternates(post: Post) {
  const path = `/blog/${post.slug}`;
  if (!post.translation) return pageAlternates(post.locale, path, 'none');
  const other = post.locale === 'es' ? 'en' : 'es';
  return pageAlternates(post.locale, path, { [other]: `/blog/${post.translation}` });
}

/** URL del mismo artículo en el otro idioma, o el blog del otro idioma. */
function otherLocaleHref(post: Post) {
  const other = post.locale === 'es' ? 'en' : 'es';
  return localePath(other, post.translation ? `/blog/${post.translation}` : '/blog');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  const alternates = postAlternates(post);

  return {
    // La plantilla del layout añade «| OpenSells». Antes salía «… | OpenSells Blog | OpenSells».
    title: post.title,
    description: post.description,
    alternates,
    openGraph: {
      title: post.title,
      description: post.description,
      url: alternates.canonical,
      siteName: 'OpenSells',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const isEs = locale === 'es';
  const postPath = `/blog/${slug}`;
  const postUrl = absoluteUrl(locale, postPath);
  const dateFmt = (d: string) =>
    new Date(d).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: post.description,
        url: postUrl,
        image: `${postUrl}/opengraph-image`,
        inLanguage: locale,
        datePublished: post.date,
        dateModified: post.updated,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@id': WEBSITE_ID },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      },
      breadcrumbSchema(locale, [
        [isEs ? 'Inicio' : 'Home', '/'],
        ['Blog', '/blog'],
        [post.title, postPath],
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar locale={locale} alternateHref={otherLocaleHref(post)} />
      <main className="min-h-screen bg-white">
        <article className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-20">
          <nav aria-label={isEs ? 'Migas de pan' : 'Breadcrumb'} className="mb-10 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href={localePath(locale, '/')} className="hover:text-slate-700">{isEs ? 'Inicio' : 'Home'}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={localePath(locale, '/blog')} className="hover:text-slate-700">Blog</Link></li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
            <span>
              {isEs ? 'Publicado el ' : 'Published '}
              <time dateTime={post.date}>{dateFmt(post.date)}</time>
            </span>
            {post.updated !== post.date && (
              <>
                <span>·</span>
                <span>
                  {isEs ? 'Actualizado el ' : 'Updated '}
                  <time dateTime={post.updated}>{dateFmt(post.updated)}</time>
                </span>
              </>
            )}
            <span>·</span>
            <span>{post.readTime} {isEs ? 'de lectura' : 'read'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed border-b border-slate-100 pb-8 mb-8">
            {post.description}
          </p>

          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-li:text-slate-600
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800
              prose-table:block prose-table:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <p className="mt-10 text-sm text-slate-400">
            {isEs
              ? 'Publicado por OpenSells. Si ves un dato desactualizado o incorrecto, escríbenos desde '
              : 'Published by OpenSells. If you spot outdated or wrong information, tell us via '}
            <Link href={localePath(locale, '/contact')} className="text-brand-600 hover:underline">
              {isEs ? 'contacto' : 'our contact page'}
            </Link>.
          </p>

          <div className="mt-14 rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
            <p className="text-lg font-bold text-slate-900 mb-2">
              {isEs ? '¿Quieres probarlo con tu sector y tu ciudad?' : 'Want to try it with your industry and city?'}
            </p>
            <p className="text-slate-500 mb-6 text-sm">
              {isEs
                ? 'El primer mes del plan Profesional es gratis y no pedimos tarjeta.'
                : 'The first month of the Professional plan is free and no card is required. The app is in Spanish.'}
            </p>
            {/* Antes enlazaba a app.opensells.com/register, que da 404. */}
            <a
              href={REGISTER_URL}
              className="inline-flex h-11 items-center rounded-xl bg-brand-500 px-8 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
            >
              {isEs ? 'Empieza gratis' : 'Start free'}
            </a>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
