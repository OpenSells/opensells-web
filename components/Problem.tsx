import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Problem() {
  const t = useTranslations('problem');
  const items = t.raw('items') as { icon: string; title: string; text: string }[];
  const appUrl = 'https://app.opensells.com';

  return (
    <section className="bg-slate-900 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t('title')}</h2>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="font-semibold text-white text-sm mb-2">{item.title}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="mt-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 p-8">
          <p className="text-white font-bold text-xl mb-2">¿Y si hubiera una forma más rápida?</p>
          <p className="text-slate-400 text-sm mb-6">OpenSells hace en 5 minutos lo que tú tardas 15 horas. Pruébalo gratis hoy.</p>
          <Link
            href={`${appUrl}/register`}
            className="inline-flex h-11 items-center rounded-xl bg-violet-500 px-8 text-sm font-bold text-white hover:bg-violet-400 transition-colors"
          >
            Empieza gratis — sin tarjeta
          </Link>
        </div>
      </div>
    </section>
  );
}
