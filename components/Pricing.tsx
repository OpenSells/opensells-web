import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PLANS, fmt, money, pricingValues, type PlanKey } from '@/lib/pricing';
import { REGISTER_URL, localePath } from '@/lib/site';

type PlanCopy = {
  key: PlanKey;
  name: string;
  description: string;
  features: string[];
  cta: string;
};

/** Sustituye {marcadores} por su valor. Los textos de los planes llevan los
 * números como marcadores para que salgan siempre de `lib/pricing.ts`. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in values ? values[k] : m));
}

export default function Pricing({ locale, showDetailsLink = true }: { locale: string; showDetailsLink?: boolean }) {
  const t = useTranslations('pricing');
  const copy = t.raw('plans') as PlanCopy[];
  const values = pricingValues(locale);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
          <p className="mt-3 text-lg text-slate-500">{t('subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {copy.map((plan) => {
            const data = PLANS.find((p) => p.key === plan.key)!;
            const isPopular = plan.key === 'profesional';
            const planValues: Record<string, string> = {
              leadsMonth: fmt(data.leadsMonth, locale),
              leadsPerSearch: fmt(data.leadsPerSearch, locale),
              callBriefsMonth: fmt(data.callBriefsMonth, locale),
              emailDraftsMonth: fmt(data.emailDraftsMonth, locale),
              aiMessagesDay: fmt(data.aiMessagesDay, locale),
            };

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
                        {money(data.eur, 'EUR', locale)}
                      </span>
                      <span className={`text-sm ${isPopular ? 'text-brand-100' : 'text-slate-400'}`}>
                        {t('per_month')}
                      </span>
                    </div>
                    {/* «$» a secas era ambiguo (dólar de EE. UU., peso…): se
                        escribe USD. */}
                    <p className={`text-xs ${isPopular ? 'text-brand-100' : 'text-slate-500'}`}>
                      {t('usd_price', { price: money(data.usd, 'USD', locale) })}
                    </p>
                    <p className={`text-xs font-semibold ${isPopular ? 'text-brand-100' : 'text-brand-600'}`}>
                      {t('first_month_free')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg className={`h-4 w-4 flex-shrink-0 mt-0.5 ${isPopular ? 'text-white' : 'text-brand-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={isPopular ? 'text-brand-50' : 'text-slate-600'}>{fill(f, planValues)}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`${REGISTER_URL}&plan=${plan.key}`}
                  className={`block text-center rounded-xl py-3 text-sm font-bold transition-colors ${
                    isPopular
                      ? 'bg-white text-brand-600 hover:bg-brand-50'
                      : 'bg-brand-500 text-white hover:bg-brand-600'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-center">
          <p className="text-sm font-semibold text-slate-900">{t('packs_title')}</p>
          <p className="mt-1 text-sm text-slate-500">{fill(t.raw('packs_note') as string, values)}</p>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-slate-500 leading-relaxed">{t('currency_note')}</p>
        <p className="mt-3 text-center text-xs text-slate-400">{fill(t.raw('no_card') as string, values)}</p>
        {showDetailsLink && (
          <p className="mt-4 text-center text-sm">
            <Link href={localePath(locale, '/pricing')} className="font-semibold text-brand-600 hover:text-brand-700">
              {t('details_link')} →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
