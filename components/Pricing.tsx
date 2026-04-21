'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Plan = {
  key: string;
  name: string;
  price_monthly: string;
  price_yearly: string;
  description: string;
  features: string[];
  cta: string;
};

export default function Pricing() {
  const t = useTranslations('pricing');
  const [yearly, setYearly] = useState(false);
  const plans = t.raw('plans') as Plan[];
  const appUrl = 'https://app.opensells.com';

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
          <p className="mt-3 text-lg text-slate-500">{t('subtitle')}</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-semibold ${!yearly ? 'text-slate-900' : 'text-slate-400'}`}>{t('toggle_monthly')}</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${yearly ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${yearly ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${yearly ? 'text-slate-900' : 'text-slate-400'}`}>
            {t('toggle_yearly')}
            <span className="ml-2 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5">{t('save_badge')}</span>
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? plan.price_yearly : plan.price_monthly;
            const isFree = plan.key === 'free';
            const isPopular = plan.key === 'profesional';

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 flex flex-col ${isPopular ? 'bg-emerald-500 text-white shadow-xl ring-2 ring-emerald-500' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900">
                    {t('popular')}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-1 ${isPopular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-xs mb-4 ${isPopular ? 'text-emerald-100' : 'text-slate-400'}`}>{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-extrabold ${isPopular ? 'text-white' : 'text-slate-900'}`}>€{price}</span>
                    <span className={`text-sm mb-1 ${isPopular ? 'text-emerald-100' : 'text-slate-400'}`}>{t('per_month')}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg className={`h-4 w-4 flex-shrink-0 mt-0.5 ${isPopular ? 'text-white' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={isPopular ? 'text-emerald-50' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={isFree ? `${appUrl}/register` : `${appUrl}/register?plan=${plan.key}`}
                  className={`block text-center rounded-xl py-3 text-sm font-bold transition-colors ${
                    isPopular
                      ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                      : isFree
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">{t('discount_note')}</p>
        <p className="mt-2 text-center text-xs text-slate-400">{t('no_card')}</p>
      </div>
    </section>
  );
}
