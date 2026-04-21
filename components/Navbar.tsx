'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const FLAGS: Record<string, string> = { es: '🇪🇸', en: '🇬🇧' };
const LABELS: Record<string, string> = { es: 'ES', en: 'EN' };

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const appUrl = 'https://app.opensells.com';
  const otherLocale = locale === 'es' ? 'en' : 'es';
  const switchPath = locale === 'es'
    ? `/en${pathname}`
    : pathname.replace(/^\/en/, '') || '/';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={locale === 'en' ? '/en' : '/'} className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">Open<span className="text-emerald-500">Sells</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition">{t('features')}</a>
            <a href="#pricing" className="hover:text-slate-900 transition">{t('pricing')}</a>
            <a href="#blog" className="hover:text-slate-900 transition">{t('blog')}</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(switchPath)}
              className="hidden sm:flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition"
            >
              <span className="text-base leading-none">{FLAGS[otherLocale]}</span>
              <span className="uppercase">{LABELS[otherLocale]}</span>
            </button>
            <Link
              href={`${appUrl}/login`}
              className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              {t('login')}
            </Link>
            <Link
              href={`${appUrl}/register`}
              className="inline-flex h-9 items-center rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition"
            >
              {t('cta')}
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 space-y-1">
            {[
              { href: '#features', label: t('features') },
              { href: '#pricing', label: t('pricing') },
              { href: '#blog', label: t('blog') },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 rounded-lg"
              >
                {label}
              </a>
            ))}
            <div className="pt-2 flex items-center gap-3 px-2">
              <button
                onClick={() => router.push(switchPath)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-slate-200 rounded-md px-2 py-1"
              >
                <span className="text-base leading-none">{FLAGS[otherLocale]}</span>
                <span className="uppercase">{LABELS[otherLocale]}</span>
              </button>
              <Link href={`${appUrl}/login`} className="text-sm text-slate-600 font-medium">{t('login')}</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
