import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Política de Cookies | OpenSells' : 'Cookie Policy | OpenSells',
    description: isEs
      ? 'Política de cookies de OpenSells. Solo usamos cookies estrictamente necesarias para el funcionamiento de la plataforma.'
      : 'OpenSells cookie policy. We only use strictly necessary cookies for the platform to function.',
    robots: { index: false },
  };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-10">
            {isEs ? 'Política de Cookies' : 'Cookie Policy'}
          </h1>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-slate-600 prose-li:text-slate-600">
            {isEs ? (
              <>
                <p>Este sitio web utiliza únicamente cookies estrictamente necesarias para su funcionamiento. No utilizamos cookies publicitarias, de seguimiento ni de terceros.</p>
                <h2>Cookies que utilizamos</h2>
                <ul>
                  <li><strong>Sesión de usuario:</strong> cookie de sesión que mantiene tu inicio de sesión mientras navegas por la plataforma. Se elimina al cerrar el navegador.</li>
                  <li><strong>Preferencia de idioma:</strong> cookie que recuerda el idioma seleccionado (español o inglés).</li>
                </ul>
                <h2>Cómo desactivarlas</h2>
                <p>Puedes configurar tu navegador para bloquear o eliminar cookies, aunque esto puede afectar al funcionamiento del sitio. Consulta la ayuda de tu navegador para más información.</p>
                <h2>Contacto</h2>
                <p>Para cualquier consulta: <strong>opensellscontact@gmail.com</strong></p>
              </>
            ) : (
              <>
                <p>This website uses only strictly necessary cookies for its operation. We do not use advertising, tracking or third-party cookies.</p>
                <h2>Cookies We Use</h2>
                <ul>
                  <li><strong>User session:</strong> a session cookie that keeps you logged in while browsing the platform. Deleted when you close your browser.</li>
                  <li><strong>Language preference:</strong> a cookie that remembers your selected language (Spanish or English).</li>
                </ul>
                <h2>How to Disable Them</h2>
                <p>You can configure your browser to block or delete cookies, though this may affect site functionality. Refer to your browser's help section for details.</p>
                <h2>Contact</h2>
                <p>For any questions: <strong>opensellscontact@gmail.com</strong></p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
