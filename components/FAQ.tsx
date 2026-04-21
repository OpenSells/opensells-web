'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
        </div>

        <dl className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {item.q}
                <svg
                  className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <dd className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
