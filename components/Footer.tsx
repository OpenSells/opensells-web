import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xl font-extrabold text-white">Open<span className="text-emerald-400">Sells</span></span>
            <p className="mt-3 text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('product')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">{t('links.features')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('links.pricing')}</a></li>
              <li><Link href={`${prefix}/blog`} className="hover:text-white transition-colors">{t('links.blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('company')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={`${prefix}/about`} className="hover:text-white transition-colors">{t('links.about')}</Link></li>
              <li><Link href={`${prefix}/contact`} className="hover:text-white transition-colors">{t('links.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('legal')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={`${prefix}/privacy`} className="hover:text-white transition-colors">{t('links.privacy')}</Link></li>
              <li><Link href={`${prefix}/terms`} className="hover:text-white transition-colors">{t('links.terms')}</Link></li>
              <li><Link href={`${prefix}/cookies`} className="hover:text-white transition-colors">{t('links.cookies')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-slate-600">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
