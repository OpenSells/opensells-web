'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

/* El ejemplo de ficha del hero.
 *
 * Los apartados son los que la aplicación enseña de verdad (a qué se dedican,
 * por qué llamarles, cómo abrir), y los ganchos son del tipo que el producto
 * genera de verdad: velocidad de la web, píxeles de publicidad y carencias de
 * la ficha de Google. No se inventa nada que el producto no haga.
 *
 * La empresa es ficticia y el teléfono va con los últimos dígitos ocultos a
 * propósito: es un anuncio público y no vamos a publicar el número de nadie.
 */
const FICHA = {
  es: {
    url: 'app.opensells.com/ficha',
    empresa: 'Clínica Dental Sant Martí',
    telefono: '93 412 ·· ··',
    telefonoNota: 'Fijo de Barcelona',
    preguntarPor: 'Pregunta por Marta Ribó',
    dedicanLabel: 'A qué se dedican',
    dedican: 'Clínica dental de barrio con tres profesionales. Atienden sobre todo a familias de la zona y llevan quince años abiertos.',
    ganchosLabel: 'Por qué llamarles',
    ganchos: [
      'Su web tarda 6,1 segundos en cargar en el móvil',
      'No tienen ningún píxel de publicidad instalado',
      'Su ficha de Google no enlaza a la web',
    ],
    aperturaLabel: 'Cómo abrir',
    apertura: '«Hola Marta, te llamo porque he visto que vuestra web tarda bastante en abrirse desde el móvil, y eso suele costar pacientes. ¿Tienes un minuto?»',
    pie: 'Preparada con IA antes de que marques',
    botonLlamar: 'Llamar',
  },
  en: {
    url: 'app.opensells.com/brief',
    empresa: 'Sant Martí Dental Clinic',
    telefono: '+34 93 412 ·· ··',
    telefonoNota: 'Barcelona landline',
    preguntarPor: 'Ask for Marta Ribó',
    dedicanLabel: 'What they do',
    dedican: 'A neighbourhood dental clinic with three practitioners. Mostly local families, and they have been open for fifteen years.',
    ganchosLabel: 'Why call them',
    ganchos: [
      'Their site takes 6.1 seconds to load on mobile',
      'They have no advertising pixel installed',
      'Their Google listing does not link to their site',
    ],
    aperturaLabel: 'How to open',
    apertura: '"Hi Marta, I am calling because I noticed your website takes a while to open on a phone, and that usually costs you patients. Do you have a minute?"',
    pie: 'Prepared by AI before you dial',
    botonLlamar: 'Call',
  },
} as const;

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const appUrl = 'https://app.opensells.com';
  // `locale` llegaba a este componente y no se usaba: la maqueta salía en
  // español también en /en.
  const f = locale === 'en' ? FICHA.en : FICHA.es;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-4 py-1.5 text-xs font-semibold text-brand-700 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          {t('badge')}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t('headline')}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('subheadline')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`${appUrl}/login?tab=register`}
            className="inline-flex h-12 items-center rounded-xl bg-brand-500 px-8 text-base font-semibold text-white shadow-md hover:bg-brand-600 transition-colors"
          >
            {t('cta_primary')}
          </Link>
          <a
            href="#how"
            className="inline-flex h-12 items-center rounded-xl border border-slate-200 bg-white px-8 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {t('cta_secondary')}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          {[t('trust_1'), t('trust_2'), t('trust_3')].map((trust, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {trust}
            </span>
          ))}
        </div>

        {/* Ficha de llamada: es lo que de verdad diferencia al producto, asi que
            es lo que se ensena. Antes habia una tabla de leads con una columna
            de email y estados de embudo de correo ("Respondio"), que contradecia
            al titular de arriba: prometia telefono y llamada preparada y no
            mostraba ni un telefono. Los apartados y sus nombres son los mismos
            que ve el usuario dentro de la aplicacion. */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden text-left">
          {/* Browser chrome */}
          <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200 max-w-xs">
              {f.url}
            </div>
          </div>

          {/* Cabecera: la empresa, su telefono y por quien preguntar */}
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 truncate">{f.empresa}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="font-semibold text-brand-600">{f.telefono}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{f.telefonoNota}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
              </svg>
              {f.preguntarPor}
            </span>
          </div>

          <div className="px-5 sm:px-6 py-5 space-y-5">
            {/* A que se dedican */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{f.dedicanLabel}</p>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{f.dedican}</p>
            </div>

            {/* Por que llamarles */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{f.ganchosLabel}</p>
              <ul className="mt-2 space-y-1.5">
                {f.ganchos.map((gancho, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {gancho}
                  </li>
                ))}
              </ul>
            </div>

            {/* Como abrir */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{f.aperturaLabel}</p>
              <p className="mt-2 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-slate-700 leading-relaxed">
                {f.apertura}
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-400">{f.pie}</p>
            <span className="inline-flex items-center rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white">
              {f.botonLlamar}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
