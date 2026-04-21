import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostsByLocale } from '@/lib/blog';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Blog — Recursos para prospectar mejor | OpenSells' : 'Blog — Resources to prospect better | OpenSells',
    description: isEs
      ? 'Guías y estrategias de prospección B2B, cold email y generación de leads para freelancers y agencias.'
      : 'B2B prospecting guides, cold email strategies and lead generation resources for freelancers and agencies.',
    alternates: {
      canonical: isEs ? 'https://opensells.com/blog' : 'https://opensells.com/en/blog',
      languages: { es: 'https://opensells.com/blog', en: 'https://opensells.com/en/blog' },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog_preview' });
  const posts = getPostsByLocale(locale);
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-white">
        <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">{t('title')}</h1>
            <p className="mt-4 text-lg text-slate-500">{t('subtitle')}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`${prefix}/blog/${post.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed">{post.description}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                    {locale === 'es' ? 'Leer artículo' : 'Read article'}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
