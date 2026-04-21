'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const MOCK_LEADS = [
  { company: 'Agencia Creativa Sur', email: 'hola@agenciacreativasur.com', sector: 'Marketing', ciudad: 'Sevilla', estado: 'Contactado' },
  { company: 'Diseño Moderno BCN', email: 'info@disenomodernobcn.es', sector: 'Diseño', ciudad: 'Barcelona', estado: 'Respondió' },
  { company: 'Consultoría Digital MG', email: 'contacto@cdmg.es', sector: 'Consultoría', ciudad: 'Madrid', estado: 'Nuevo' },
  { company: 'Tech Solutions VLC', email: 'ventas@techsolutionsvlc.com', sector: 'Tecnología', ciudad: 'Valencia', estado: 'Nuevo' },
  { company: 'SEO Experts España', email: 'hola@seoexperts.es', sector: 'Marketing', ciudad: 'Madrid', estado: 'Contactado' },
];

const ESTADO_COLORS: Record<string, string> = {
  'Nuevo': 'bg-slate-100 text-slate-600',
  'Contactado': 'bg-blue-50 text-blue-700',
  'Respondió': 'bg-emerald-50 text-emerald-700',
};

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const appUrl = 'https://app.opensells.com';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
            href={`${appUrl}/register`}
            className="inline-flex h-12 items-center rounded-xl bg-emerald-500 px-8 text-base font-semibold text-white shadow-md hover:bg-emerald-600 transition-colors"
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

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('social_proof')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('no_card')}
          </span>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden text-left">
          {/* Browser chrome */}
          <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200 max-w-xs">
              app.opensells.com/leads
            </div>
          </div>

          {/* Dashboard header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Leads encontrados</p>
              <p className="text-2xl font-extrabold text-slate-900">847 <span className="text-sm font-normal text-emerald-600">+24 hoy</span></p>
            </div>
            <div className="flex gap-2">
              <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500">Marketing · Madrid</div>
              <div className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white">Nueva búsqueda</div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  <th className="px-5 py-2.5 text-left">Empresa</th>
                  <th className="px-5 py-2.5 text-left hidden sm:table-cell">Email</th>
                  <th className="px-5 py-2.5 text-left hidden md:table-cell">Sector</th>
                  <th className="px-5 py-2.5 text-left hidden lg:table-cell">Ciudad</th>
                  <th className="px-5 py-2.5 text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_LEADS.map((lead, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800 whitespace-nowrap">{lead.company}</td>
                    <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{lead.email}</td>
                    <td className="px-5 py-3 text-slate-500 hidden md:table-cell">{lead.sector}</td>
                    <td className="px-5 py-3 text-slate-500 hidden lg:table-cell">{lead.ciudad}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${ESTADO_COLORS[lead.estado]}`}>
                        {lead.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Mostrando 5 de 847 leads</p>
            <div className="flex gap-1">
              {[1,2,3].map(n => (
                <span key={n} className={`h-1.5 w-1.5 rounded-full ${n === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
