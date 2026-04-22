'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FinalCTA() {
  const t = useTranslations('finalcta');
  const values = t.raw('values') as string[];
  const appUrl = 'https://app.opensells.com';

  return (
    <section className="py-20 sm:py-28 bg-violet-600">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <p className="text-violet-200 text-sm font-semibold uppercase tracking-widest mb-4">
          {t('guarantee')} ✓
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
          {t('title')}
        </h2>
        <p className="text-violet-100 text-lg mb-10 max-w-xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="bg-white/10 rounded-2xl p-6 mb-10 text-left max-w-md mx-auto">
          <p className="text-white font-semibold text-sm mb-4">{t('value_title')}</p>
          <ul className="space-y-2.5">
            {values.map((v, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-violet-100">
                <svg className="h-4 w-4 text-violet-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {v}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`${appUrl}/register`}
          className="inline-flex h-14 items-center rounded-xl bg-white px-10 text-base font-bold text-violet-600 shadow-lg hover:bg-violet-50 transition-colors"
        >
          {t('cta')}
        </Link>
        <p className="mt-4 text-sm text-violet-200">{t('sub')}</p>
      </div>
    </section>
  );
}
