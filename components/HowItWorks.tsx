import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('how');
  const steps = t.raw('steps') as { number: string; title: string; description: string }[];

  return (
    <section id="how" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-8 bottom-8 w-px bg-violet-200 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-violet-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-extrabold text-lg">{step.number}</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
