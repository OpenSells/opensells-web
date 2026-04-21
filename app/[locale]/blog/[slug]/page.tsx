import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getPostsByLocale } from '@/lib/blog';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ['es', 'en'];
  return locales.flatMap((locale) =>
    getPostsByLocale(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  const base = 'https://opensells.com';
  const canonical = locale === 'es' ? `${base}/blog/${slug}` : `${base}/en/blog/${slug}`;

  return {
    title: `${post.title} | OpenSells Blog`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const prefix = locale === 'en' ? '/en' : '';
  const appUrl = 'https://app.opensells.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'OpenSells' },
    publisher: { '@type': 'Organization', name: 'OpenSells', url: 'https://opensells.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar locale={locale} />
      <main className="min-h-screen bg-white">
        <article className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-20">
          {/* Back link */}
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readTime} {locale === 'es' ? 'de lectura' : 'read'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed border-b border-slate-100 pb-8 mb-8">
            {post.description}
          </p>

          {/* Content */}
          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-li:text-slate-600
              prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-emerald-50 border border-emerald-100 p-8 text-center">
            <p className="text-lg font-bold text-slate-900 mb-2">
              {locale === 'es' ? '¿Listo para conseguir tus primeros leads?' : 'Ready to get your first leads?'}
            </p>
            <p className="text-slate-500 mb-6 text-sm">
              {locale === 'es'
                ? 'Prueba OpenSells gratis y consigue leads verificados en menos de 5 minutos. Sin tarjeta de crédito.'
                : 'Try OpenSells free and get verified leads in under 5 minutes. No credit card required.'}
            </p>
            <Link
              href={`${appUrl}/register`}
              className="inline-flex h-11 items-center rounded-xl bg-emerald-500 px-8 text-sm font-bold text-white hover:bg-emerald-600 transition-colors"
            >
              {locale === 'es' ? 'Empieza gratis' : 'Start free'}
            </Link>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
