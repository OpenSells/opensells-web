import { useTranslations } from 'next-intl';

export default function Problem() {
  const t = useTranslations('problem');
  const items = t.raw('items') as { icon: string; text: string }[];

  return (
    <section className="bg-slate-900 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t('title')}</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
