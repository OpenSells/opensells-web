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

const DISCOUNT = 0.5;

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

        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => {
            const originalPrice = parseFloat(plan.price_monthly);
            const discountedPrice = Math.round(originalPrice * DISCOUNT * 100) / 100;
            const isFree = plan.key === 'free';
            const isPopular = plan.key === 'profesional';

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 flex flex-col ${isPopular ? 'bg-emerald-500 text-white shadow-xl ring-2 ring-emerald-500' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 whitespace-nowrap">
                    {t('popular')}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-1 ${isPopular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-xs mb-4 ${isPopular ? 'text-emerald-100' : 'text-slate-400'}`}>{plan.description}</p>

                  {isFree ? (
                    <div className="flex items-end gap-1">
                      <span className={`text-4xl font-extrabold ${isPopular ? 'text-white' : 'text-slate-900'}`}>€0</span>
                      <span className={`text-sm mb-1 ${isPopular ? 'text-emerald-100' : 'text-slate-400'}`}>{t('per_month')}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className={`text-4xl font-extrabold ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                          €{discountedPrice}
                        </span>
                        <span className={`text-sm line-through ${isPopular ? 'text-emerald-200' : 'text-slate-400'}`}>
                          €{originalPrice}
                        </span>
                      </div>
                      <p className={`text-xs font-semibold ${isPopular ? 'text-emerald-100' : 'text-emerald-600'}`}>
                        primer mes · luego €{originalPrice}{t('per_month')}
                      </p>
                    </div>
                  )}
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

        <p className="mt-8 text-center text-xs text-slate-400">{t('no_card')}</p>
      </div>
    </section>
  );
}
