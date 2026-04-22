import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Términos de Servicio | OpenSells' : 'Terms of Service | OpenSells',
    description: isEs
      ? 'Condiciones de uso de la plataforma OpenSells.'
      : 'Terms and conditions for using the OpenSells platform.',
    alternates: {
      canonical: isEs ? 'https://opensells.com/terms' : 'https://opensells.com/en/terms',
    },
    robots: { index: false },
  };
}

export default async function TermsPage({ params }: Props) {
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
            {isEs ? 'Términos de Servicio' : 'Terms of Service'}
          </h1>
          <p className="text-sm text-slate-400 mb-10">
            {isEs ? `Última actualización: ${updated}` : `Last updated: ${updated}`}
          </p>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-slate-600 prose-li:text-slate-600">

            {isEs ? (
              <>
                <p>Al registrarte y usar OpenSells («el Servicio»), aceptas estos Términos de Servicio. Si no estás de acuerdo, no uses el Servicio.</p>

                <h2>1. Descripción del Servicio</h2>
                <p>OpenSells es una plataforma SaaS de prospección B2B que permite a freelancers y agencias encontrar leads verificados, generar borradores de email con IA y gestionar su pipeline de ventas.</p>

                <h2>2. Registro y cuenta</h2>
                <p>Debes tener al menos 18 años para crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad que ocurra en tu cuenta. Notifícanos inmediatamente ante cualquier uso no autorizado.</p>

                <h2>3. Planes y pagos</h2>
                <ul>
                  <li><strong>Plan Gratis:</strong> acceso limitado sin cargo.</li>
                  <li><strong>Plan Profesional:</strong> 29 €/mes (primer mes al 50% de descuento = 14,50 €).</li>
                  <li><strong>Plan Agencia:</strong> 69 €/mes (primer mes al 50% de descuento = 34,50 €).</li>
                </ul>
                <p>Los pagos se procesan mediante Stripe. Las suscripciones se renuevan automáticamente cada mes. Puedes cancelar en cualquier momento desde tu panel de cuenta — el acceso se mantiene hasta el final del periodo facturado.</p>

                <h2>4. Política de reembolso</h2>
                <p>Ofrecemos reembolso completo dentro de los primeros 7 días desde el primer pago si el Servicio no cumple lo descrito. Fuera de ese plazo, no se realizan reembolsos parciales por periodos no utilizados.</p>

                <h2>5. Uso aceptable</h2>
                <p>Te comprometes a no usar el Servicio para:</p>
                <ul>
                  <li>Enviar spam o comunicaciones comerciales no solicitadas de forma masiva.</li>
                  <li>Scraping automatizado que sobrecargue nuestros servidores.</li>
                  <li>Actividades ilegales o que infrinjan derechos de terceros.</li>
                  <li>Revender o redistribuir el Servicio sin autorización.</li>
                </ul>
                <p>El incumplimiento puede resultar en la suspensión inmediata de la cuenta.</p>

                <h2>6. Propiedad intelectual</h2>
                <p>Todo el código, diseño y contenido de la plataforma es propiedad de OpenSells. Los datos de leads que generas a través del Servicio son tuyos; nosotros no los vendemos ni cedemos a terceros.</p>

                <h2>7. Limitación de responsabilidad</h2>
                <p>OpenSells no garantiza que los leads obtenidos conduzcan a ventas ni que los datos sean 100% precisos en todo momento. La responsabilidad máxima de OpenSells se limita al importe pagado por el usuario en los 3 meses anteriores al hecho causante.</p>

                <h2>8. Modificaciones del Servicio</h2>
                <p>Podemos modificar o discontinuar funcionalidades del Servicio con un preaviso mínimo de 30 días. Los cambios en precios se notificarán con 30 días de antelación.</p>

                <h2>9. Ley aplicable</h2>
                <p>Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los juzgados y tribunales de España, salvo que la normativa de protección al consumidor establezca otro fuero.</p>

                <h2>10. Contacto</h2>
                <p>Para cualquier consulta sobre estos términos: <strong>opensellscontact@gmail.com</strong></p>
              </>
            ) : (
              <>
                <p>By registering and using OpenSells ("the Service"), you agree to these Terms of Service. If you disagree, please do not use the Service.</p>

                <h2>1. Service Description</h2>
                <p>OpenSells is a B2B prospecting SaaS platform that allows freelancers and agencies to find verified leads, generate AI-powered email drafts and manage their sales pipeline.</p>

                <h2>2. Registration and Account</h2>
                <p>You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your password and all activity that occurs under your account. Notify us immediately of any unauthorized use.</p>

                <h2>3. Plans and Payments</h2>
                <ul>
                  <li><strong>Free Plan:</strong> limited access at no charge.</li>
                  <li><strong>Professional Plan:</strong> €29/month (first month at 50% off = €14.50).</li>
                  <li><strong>Agency Plan:</strong> €69/month (first month at 50% off = €34.50).</li>
                </ul>
                <p>Payments are processed via Stripe. Subscriptions renew automatically each month. You may cancel at any time from your account dashboard — access continues until the end of the billed period.</p>

                <h2>4. Refund Policy</h2>
                <p>We offer a full refund within the first 7 days of your first payment if the Service does not match its description. Outside this window, no partial refunds are issued for unused periods.</p>

                <h2>5. Acceptable Use</h2>
                <p>You agree not to use the Service to:</p>
                <ul>
                  <li>Send spam or mass unsolicited commercial communications.</li>
                  <li>Automated scraping that overloads our servers.</li>
                  <li>Illegal activities or those infringing third-party rights.</li>
                  <li>Resell or redistribute the Service without authorization.</li>
                </ul>
                <p>Violations may result in immediate account suspension.</p>

                <h2>6. Intellectual Property</h2>
                <p>All platform code, design and content is owned by OpenSells. The lead data you generate through the Service belongs to you; we do not sell or share it with third parties.</p>

                <h2>7. Limitation of Liability</h2>
                <p>OpenSells does not guarantee that obtained leads will result in sales or that data will be 100% accurate at all times. OpenSells' maximum liability is limited to the amount paid by the user in the 3 months prior to the causative event.</p>

                <h2>8. Service Modifications</h2>
                <p>We may modify or discontinue Service features with a minimum 30-day notice. Price changes will be communicated 30 days in advance.</p>

                <h2>9. Governing Law</h2>
                <p>These terms are governed by Spanish law. For any dispute, the parties submit to Spanish courts, unless consumer protection regulations establish a different jurisdiction.</p>

                <h2>10. Contact</h2>
                <p>For any questions about these terms: <strong>opensellscontact@gmail.com</strong></p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
