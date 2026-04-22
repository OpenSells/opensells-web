import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Política de Privacidad | OpenSells' : 'Privacy Policy | OpenSells',
    description: isEs
      ? 'Cómo OpenSells recoge, usa y protege tus datos personales.'
      : 'How OpenSells collects, uses and protects your personal data.',
    alternates: {
      canonical: isEs ? 'https://opensells.com/privacy' : 'https://opensells.com/en/privacy',
    },
    robots: { index: false },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';
  const updated = '22 de abril de 2026';

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
          </h1>
          <p className="text-sm text-slate-400 mb-10">
            {isEs ? `Última actualización: ${updated}` : `Last updated: ${updated}`}
          </p>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-slate-600 prose-li:text-slate-600">

            {isEs ? (
              <>
                <p>En OpenSells (en adelante, «nosotros» o «la plataforma»), nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe qué datos recogemos, cómo los usamos y qué derechos tienes sobre ellos, de conformidad con el Reglamento General de Protección de Datos (RGPD) y la normativa española aplicable.</p>

                <h2>1. Responsable del tratamiento</h2>
                <p>OpenSells · opensellscontact@gmail.com · España</p>

                <h2>2. Datos que recogemos</h2>
                <ul>
                  <li><strong>Datos de cuenta:</strong> nombre, dirección de correo electrónico y contraseña (cifrada).</li>
                  <li><strong>Datos de uso:</strong> búsquedas realizadas, leads consultados, emails generados y actividad general en la plataforma.</li>
                  <li><strong>Datos de pago:</strong> gestionados íntegramente por Stripe. OpenSells no almacena datos de tarjeta.</li>
                  <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo y cookies de sesión.</li>
                </ul>

                <h2>3. Finalidad y base legal</h2>
                <ul>
                  <li>Prestación del servicio contratado (ejecución del contrato — art. 6.1.b RGPD).</li>
                  <li>Gestión de pagos y facturación (obligación legal — art. 6.1.c RGPD).</li>
                  <li>Comunicaciones sobre el servicio y novedades (interés legítimo — art. 6.1.f RGPD).</li>
                  <li>Mejora de la plataforma mediante análisis de uso (interés legítimo).</li>
                </ul>

                <h2>4. Conservación de los datos</h2>
                <p>Conservamos tus datos mientras tu cuenta esté activa. Tras la cancelación, los eliminamos en un plazo máximo de 30 días, salvo que la ley exija conservarlos por más tiempo (p. ej., datos de facturación durante 5 años).</p>

                <h2>5. Terceros y subencargados</h2>
                <ul>
                  <li><strong>Stripe</strong> — procesamiento de pagos (EE. UU., con cláusulas contractuales estándar).</li>
                  <li><strong>Brevo (Sendinblue)</strong> — envío de emails transaccionales (UE).</li>
                  <li><strong>Render</strong> — infraestructura de servidores (EE. UU., con cláusulas contractuales estándar).</li>
                  <li><strong>Vercel</strong> — hosting del sitio web (EE. UU., con cláusulas contractuales estándar).</li>
                </ul>

                <h2>6. Tus derechos</h2>
                <p>Puedes ejercer en cualquier momento los derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición escribiendo a <strong>opensellscontact@gmail.com</strong>. También tienes derecho a reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>

                <h2>7. Cookies</h2>
                <p>Usamos cookies estrictamente necesarias para el funcionamiento de la sesión. No usamos cookies publicitarias ni de seguimiento de terceros. Puedes consultar nuestra <a href="/cookies">Política de Cookies</a> para más información.</p>

                <h2>8. Cambios en esta política</h2>
                <p>Si realizamos cambios materiales, te lo notificaremos por email o mediante un aviso en la plataforma con al menos 15 días de antelación.</p>
              </>
            ) : (
              <>
                <p>At OpenSells ("we", "us" or "the platform"), we take your privacy seriously. This policy describes what data we collect, how we use it and your rights over it, in accordance with the General Data Protection Regulation (GDPR) and applicable Spanish law.</p>

                <h2>1. Data Controller</h2>
                <p>OpenSells · opensellscontact@gmail.com · Spain</p>

                <h2>2. Data We Collect</h2>
                <ul>
                  <li><strong>Account data:</strong> name, email address and password (encrypted).</li>
                  <li><strong>Usage data:</strong> searches performed, leads viewed, emails generated and general platform activity.</li>
                  <li><strong>Payment data:</strong> managed entirely by Stripe. OpenSells does not store card details.</li>
                  <li><strong>Technical data:</strong> IP address, browser type, operating system and session cookies.</li>
                </ul>

                <h2>3. Purpose and Legal Basis</h2>
                <ul>
                  <li>Providing the contracted service (contract performance — Art. 6.1.b GDPR).</li>
                  <li>Payment and billing management (legal obligation — Art. 6.1.c GDPR).</li>
                  <li>Service communications and updates (legitimate interest — Art. 6.1.f GDPR).</li>
                  <li>Platform improvement through usage analytics (legitimate interest).</li>
                </ul>

                <h2>4. Data Retention</h2>
                <p>We retain your data while your account is active. After cancellation, we delete it within 30 days, unless the law requires longer retention (e.g., billing data for 5 years).</p>

                <h2>5. Third Parties and Sub-processors</h2>
                <ul>
                  <li><strong>Stripe</strong> — payment processing (USA, standard contractual clauses).</li>
                  <li><strong>Brevo (Sendinblue)</strong> — transactional email sending (EU).</li>
                  <li><strong>Render</strong> — server infrastructure (USA, standard contractual clauses).</li>
                  <li><strong>Vercel</strong> — website hosting (USA, standard contractual clauses).</li>
                </ul>

                <h2>6. Your Rights</h2>
                <p>You may exercise your rights of access, rectification, erasure, portability, restriction and objection at any time by writing to <strong>opensellscontact@gmail.com</strong>. You also have the right to lodge a complaint with the Spanish Data Protection Agency (aepd.es).</p>

                <h2>7. Cookies</h2>
                <p>We use strictly necessary cookies for session functionality. We do not use advertising or third-party tracking cookies. See our <a href="/en/cookies">Cookie Policy</a> for details.</p>

                <h2>8. Changes to This Policy</h2>
                <p>If we make material changes, we will notify you by email or via a platform notice at least 15 days in advance.</p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
