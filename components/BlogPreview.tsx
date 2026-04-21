import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function BlogPreview({ locale }: { locale: string }) {
  const t = useTranslations('blog_preview');
  const posts = t.raw('posts') as { slug: string; title: string; excerpt: string; date: string; readTime: string }[];
  const blogBase = locale === 'en' ? '/en/blog' : '/blog';

  return (
    <section id="blog" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
            <p className="mt-2 text-slate-500">{t('subtitle')}</p>
          </div>
          <Link
            href={blogBase}
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
          >
            {t('cta')}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${blogBase}/${post.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-violet-600 transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
