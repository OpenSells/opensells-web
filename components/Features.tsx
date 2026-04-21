import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('features');
  const items = t.raw('items') as { icon: string; title: string; description: string }[];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
          <p className="mt-3 text-lg text-slate-500">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-violet-200 hover:bg-violet-50/30 transition-colors">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
