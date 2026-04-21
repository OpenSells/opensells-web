'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const appUrl = 'https://app.opensells.com';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t('badge')}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t('headline')}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('subheadline')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`${appUrl}/register`}
            className="inline-flex h-12 items-center rounded-xl bg-emerald-500 px-8 text-base font-semibold text-white shadow-md hover:bg-emerald-600 transition-colors"
          >
            {t('cta_primary')}
          </Link>
          <a
            href="#how"
            className="inline-flex h-12 items-center rounded-xl border border-slate-200 bg-white px-8 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {t('cta_secondary')}
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('social_proof')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('no_card')}
          </span>
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-4 text-xs text-slate-400 font-mono">app.opensells.com</span>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50 h-64 sm:h-80 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="text-5xl">🎯</div>
              <p className="text-slate-500 text-sm font-medium">OpenSells Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
