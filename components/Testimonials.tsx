import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as { quote: string; name: string; role: string; location: string }[];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className="h-4 w-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role} · {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
