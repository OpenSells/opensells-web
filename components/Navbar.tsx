'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { LOGIN_URL, REGISTER_URL, localePath } from '@/lib/site';

const LABELS: Record<string, string> = { es: 'ES', en: 'EN' };

function FlagES() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0">
      <rect width="20" height="14" fill="#c60b1e"/>
      <rect y="3.5" width="20" height="7" fill="#f1bf00"/>
    </svg>
  );
}

function FlagEN() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0">
      <rect width="20" height="14" fill="#012169"/>
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#fff" strokeWidth="2.8"/>
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="1.6"/>
      <path d="M10,0 V14 M0,7 H20" stroke="#fff" strokeWidth="4.5"/>
      <path d="M10,0 V14 M0,7 H20" stroke="#C8102E" strokeWidth="2.8"/>
    </svg>
  );
}

const FLAG_COMPONENTS: Record<string, () => React.ReactElement> = { es: FlagES, en: FlagEN };

type NavbarProps = {
  locale: string;
  /* Ruta de esta misma página en el otro idioma. Si no se pasa, se asume que
   * la página existe con la misma ruta en los dos. Los artículos del blog la
   * pasan siempre: la mayoría no tienen traducción, y cambiar de idioma
   * mandaba a una URL /en/blog/... que no existe. */
  alternateHref?: string;
};

export default function Navbar({ locale, alternateHref }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const switchHref = alternateHref ?? localePath(otherLocale, pathname);

  /* Enlaces a páginas, no a anclas: «#pricing» se resolvía sobre la URL en la
   * que estuvieras, y desde un artículo no llevaba a ninguna parte. */
  const links = [
    { href: localePath(locale, '/how-it-works'), label: t('features') },
    { href: localePath(locale, '/ai-call-brief'), label: t('callBrief') },
    { href: localePath(locale, '/for-agencies'), label: t('agencies') },
    { href: localePath(locale, '/pricing'), label: t('pricing') },
    { href: localePath(locale, '/blog'), label: t('blog') },
  ];

  const switcher = (className: string) => (
    <a href={switchHref} hrefLang={otherLocale} lang={otherLocale} className={className} aria-label={t('switchLanguage')}>
      {FLAG_COMPONENTS[otherLocale]?.()}
      <span className="uppercase">{LABELS[otherLocale]}</span>
    </a>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={localePath(locale, '/')} className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">Open<span className="text-brand-500">Sells</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-slate-900 transition">{label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {switcher('hidden sm:flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition')}
            <a
              href={LOGIN_URL}
              className="hidden sm:inline-flex h-9 items-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              {t('login')}
            </a>
            <a
              href={REGISTER_URL}
              className="inline-flex h-9 items-center rounded-xl bg-brand-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition"
            >
              {t('cta')}
            </a>
            <button
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t('menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-slate-100 py-3 space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 rounded-lg"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 flex items-center gap-3 px-2">
              {switcher('flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-slate-200 rounded-md px-2 py-1')}
              <a href={LOGIN_URL} className="inline-flex h-9 items-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">{t('login')}</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
