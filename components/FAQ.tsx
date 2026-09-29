import { useTranslations } from 'next-intl';

/* Acordeón con <details>/<summary> nativos.
 *
 * Antes era un componente de cliente que solo pintaba la respuesta abierta:
 * el HTML que recibían buscadores y asistentes traía las preguntas pero no las
 * respuestas (solo estaban dentro del JSON-LD). Con <details> todas las
 * respuestas van en el HTML inicial, el teclado y los lectores de pantalla lo
 * entienden sin ARIA extra y no hace falta JavaScript. */
export default function FAQ({ namespace = 'faq' }: { namespace?: string }) {
  const t = useTranslations(namespace);
  const items = t.raw('items') as { q: string; a: string }[];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('title')}</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details key={i} className="group rounded-xl border border-slate-200 overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{item.q}</h3>
                <svg
                  className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
