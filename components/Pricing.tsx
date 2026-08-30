'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Plan = {
  key: string;
  name: string;
  price_monthly: string;
  description: string;
  features: string[];
  cta: string;
};

export default function Pricing() {
  const t = useTranslations('pricing');
  const plans = t.raw('plans') as Plan[];
  const appUrl = 'https://app.opensells.com';

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
          <p className="mt-3 text-lg text-slate-500">{t('subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {plans.map((plan) => {
            const originalPrice = parseFloat(plan.price_monthly);
            const isPopular = plan.key === 'profesional';

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 flex flex-col ${isPopular ? 'bg-brand-500 text-white shadow-xl ring-2 ring-brand-500' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 whitespace-nowrap">
                    {t('popular')}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-1 ${isPopular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-xs mb-4 ${isPopular ? 'text-brand-100' : 'text-slate-400'}`}>{plan.description}</p>

                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-4xl font-extrabold ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                        €{originalPrice}
                      </span>
                      <span className={`text-sm ${isPopular ? 'text-brand-100' : 'text-slate-400'}`}>
                        {t('per_month')}
                      </span>
                    </div>
                    <p className={`text-xs font-semibold ${isPopular ? 'text-brand-100' : 'text-brand-600'}`}>
                      {t('first_month_free')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg className={`h-4 w-4 flex-shrink-0 mt-0.5 ${isPopular ? 'text-white' : 'text-brand-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={isPopular ? 'text-brand-50' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`${appUrl}/login?tab=register&plan=${plan.key}`}
                  className={`block text-center rounded-xl py-3 text-sm font-bold transition-colors ${
                    isPopular
                      ? 'bg-white text-brand-600 hover:bg-brand-50'
                      : 'bg-brand-500 text-white hover:bg-brand-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-center">
          <p className="text-sm font-semibold text-slate-900">{t('packs_title')}</p>
          <p className="mt-1 text-sm text-slate-500">{t('packs_note')}</p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">{t('no_card')}</p>
      </div>
    </section>
  );
}
