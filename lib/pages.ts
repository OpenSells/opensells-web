import { PACKS, PLANS, TRIAL, USD_COUNTRIES, fmt, money } from '@/lib/pricing';
import { CONTACT_EMAIL, REGISTER_URL, localePath } from '@/lib/site';

/* Contenido de las páginas de producto y empresa.
 *
 * Todo lo que se afirma aquí se comprobó contra el código de la app
 * (repo OpenSells/OpenSells) el 2026-09-29: fuentes de datos, qué contiene la
 * ficha de llamada, cómo se cuentan los leads, monedas y límites. Si cambia la
 * app, hay que cambiar esto: la web no se entera sola. */

export type Section = {
  h2: string;
  /** Párrafos (HTML de confianza, escrito aquí). */
  body?: string[];
  list?: string[];
  after?: string[];
};

export type PageContent = {
  title: string;
  description: string;
  breadcrumb: string;
  eyebrow?: string;
  h1: string;
  intro: string;
  sections: Section[];
  schemaType?: 'WebPage' | 'AboutPage' | 'ContactPage';
  cta?: false;
};

export type PageKey = 'howItWorks' | 'callBrief' | 'agencies' | 'pricing' | 'about' | 'contact';

export const PAGE_PATHS: Record<PageKey, string> = {
  howItWorks: '/how-it-works',
  callBrief: '/ai-call-brief',
  agencies: '/for-agencies',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

const pro = PLANS.find((p) => p.key === 'profesional')!;
const ag = PLANS.find((p) => p.key === 'agencia')!;

function es(): Record<PageKey, PageContent> {
  const L = (p: string) => localePath('es', p);
  return {
    howItWorks: {
      title: 'Cómo funciona: de la búsqueda de empresas a la llamada preparada',
      description: 'Cómo funciona OpenSells paso a paso: de dónde salen los datos, qué incluye cada lead, cómo se prepara la ficha de llamada con IA, el seguimiento, el email y sus límites.',
      breadcrumb: 'Cómo funciona',
      eyebrow: 'Producto',
      h1: 'Cómo funciona OpenSells',
      intro: 'OpenSells es un software de prospección B2B para quien vende a negocios: escribes un sector y una ciudad, encuentra empresas con sus datos públicos de contacto y te prepara con IA una ficha para cada llamada. La llamada la haces tú; OpenSells te ayuda a llegar preparado y a no perder el seguimiento.',
      sections: [
        {
          h2: '1. Buscas por sector y ciudad',
          body: [
            'Escribes lo que buscas como lo dirías: «clínicas dentales en Bogotá», «talleres en Monterrey», «asesorías en Valencia». Eliges tu país en la aplicación y el buscador reconoce además el país o la ciudad que escribas. Cada búsqueda entrega hasta 100 empresas.',
            'Los datos salen de fuentes públicas: la ficha del negocio en Google Maps (a través de la API de Google Places) y la propia web de cada empresa. No usamos listas compradas.',
          ],
        },
        {
          h2: '2. Qué obtienes de cada empresa',
          list: [
            'Nombre, dirección y web.',
            'Teléfono, cuando el negocio lo publica.',
            'Email, cuando aparece en su web. <strong>No verificamos buzones</strong> (ni SMTP ni MX): pueden estar desactualizados o ser genéricos.',
            'Señales de su web y de su ficha de Google que sirven de argumento comercial: velocidad en móvil, si se detecta publicidad o herramientas de medición, redes enlazadas, carencias de la ficha.',
          ],
          after: [
            'Las empresas que ya tenías guardadas no se vuelven a descontar de tu cupo. Cada empresa nueva guardada descuenta un lead, tenga o no teléfono o email.',
          ],
        },
        {
          h2: '3. Abres la ficha de llamada',
          body: [
            `Antes de marcar, la IA te resume a qué se dedica la empresa, por qué puede tener sentido llamarles, cómo abrir la conversación, hasta tres preguntas y respuestas a las objeciones más probables. Se redacta a partir de su web, su ficha de Google y lo que tú vendes. <a href="${L('/ai-call-brief')}">Así es la ficha de llamada</a>.`,
          ],
        },
        {
          h2: '4. Llamas tú y dejas el seguimiento organizado',
          body: [
            'OpenSells no hace llamadas automáticas ni las graba. Llamas desde tu teléfono y, al terminar, cambias el estado del lead, añades una nota o creas una tarea para el siguiente paso.',
          ],
        },
        {
          h2: '5. Si prefieres escribir: borradores de email con IA',
          body: [
            'Para los leads con email, la IA redacta un borrador personalizado leyendo su web. Lo revisas y puedes enviarlo desde OpenSells con tu propia cuenta de Gmail conectada, uno a uno o por lotes. Solo funciona con Gmail. Antes de enviar emails comerciales, comprueba que tienes base legal: en España, el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a> exige consentimiento previo también cuando el destinatario es una empresa.',
          ],
        },
        {
          h2: '6. Exportas tus leads',
          body: [
            `Con un plan de pago puedes exportar tus leads a CSV sin límite, para llevarlos a tu CRM o a una hoja de cálculo. Durante la prueba, la exportación está limitada a ${TRIAL.csvRowsMonth} leads al mes.`,
          ],
        },
        {
          h2: 'Solo en España: presupuestos y facturas con VERI*FACTU',
          body: [
            `Aparte de la prospección, OpenSells incluye presupuestos y facturas para los clientes que cierres, con registros en modalidad VERI*FACTU que se remiten a la AEAT con tu certificado electrónico. Solo aplica a quien factura en España (no a territorios forales ni a quien lleva el SII). Más detalle en la <a href="${L('/')}#faq">pregunta sobre VERI*FACTU</a>.`,
          ],
        },
        {
          h2: 'Para quién encaja y para quién no',
          list: [
            '<strong>Encaja</strong> si vendes a negocios con presencia pública: agencias de marketing o diseño web, consultoras, asesorías, formación, software para pymes, servicios profesionales.',
            '<strong>Encaja peor</strong> si necesitas a una persona con un cargo concreto dentro de una gran empresa: OpenSells trabaja con los datos que publica el negocio, no con perfiles personales.',
            'Está pensado para España y los países hispanohablantes de Latinoamérica. La aplicación está en español.',
          ],
        },
        {
          h2: 'Límites que conviene conocer',
          list: [
            'Los datos dependen de lo que cada negocio publica: no todas las empresas tienen teléfono o email visibles, y pueden estar desactualizados.',
            'La IA puede equivocarse o quedarse en lo genérico si la web tiene poca información: revisa la ficha y los borradores antes de usarlos.',
            'No hay verificación de emails, ni secuencias automáticas, ni llamadas automáticas.',
            'Que un dato sea público no te autoriza por sí solo a contactar con fines comerciales: revisa la normativa de tu país.',
          ],
          after: [`Ver <a href="${L('/pricing')}">precios y condiciones</a>.`],
        },
      ],
    },

    callBrief: {
      title: 'Ficha de llamada con IA para llamadas comerciales B2B',
      description: 'Qué es la ficha de llamada de OpenSells, qué contiene, de dónde saca la información la IA, un ejemplo ilustrativo y sus límites.',
      breadcrumb: 'Ficha de llamada con IA',
      eyebrow: 'Preparación de llamadas',
      h1: 'La ficha de llamada: qué decir antes de marcar',
      intro: 'Para cada empresa que encuentras, OpenSells puede preparar con IA una ficha de llamada: un resumen corto de a qué se dedican, por qué puede tener sentido llamarles y cómo empezar. Está pensada para leerla en un minuto justo antes de marcar.',
      sections: [
        {
          h2: 'Qué contiene',
          list: [
            '<strong>A qué se dedican</strong>, en una o dos frases concretas.',
            '<strong>Señales detectadas</strong> en su web y su ficha de Google: velocidad en móvil, si se detecta publicidad o herramientas de medición, redes enlazadas desde su web, carencias de la ficha.',
            '<strong>Motivos para llamar</strong>: dos o tres ganchos que cruzan algo de esa empresa con lo que tú vendes.',
            '<strong>Cómo abrir</strong>: la primera frase, corta y para decir en voz alta. Se ajusta a si el teléfono parece un móvil (hablas con la persona) o un fijo (suele contestar recepción).',
            '<strong>Hasta tres preguntas</strong> para descubrir si encajan y <strong>respuestas a las objeciones</strong> más probables.',
            '<strong>La razón social</strong>, cuando la conocemos, para pedir por la empresa correcta en recepción.',
            '<strong>Un aviso de «no encaja»</strong> cuando es evidente que esa empresa no es cliente de lo que vendes. Es un aviso, no un veto: decides tú.',
          ],
        },
        {
          h2: 'De dónde saca la información',
          body: [
            'La IA lee la web de la empresa y los datos de su ficha pública de Google, y los cruza con lo que tú has contado que vendes (el problema que resuelves, tu beneficio principal, tu diferenciador y tu tono). Los datos técnicos (velocidad, redes, carencias de la ficha) los mide OpenSells; la IA solo redacta la parte de criterio.',
            'Cuando algo no se ha podido comprobar, la ficha no lo presenta como una carencia: «no lo tiene» y «no hemos podido mirarlo» no son lo mismo, y quien lee la ficha se lo diría al cliente por teléfono.',
          ],
        },
        {
          h2: 'Ejemplo ilustrativo',
          body: [
            '<em>Empresa, persona y datos ficticios, para enseñar el formato.</em>',
            '<strong>A qué se dedican:</strong> clínica dental de barrio con tres profesionales, sobre todo familias de la zona.<br/><strong>Señales:</strong> la web tarda en cargar en móvil; no se detectan anuncios en Google; enlazan un perfil de TikTok; la ficha de Google no enlaza a la web.<br/><strong>Motivo para llamar:</strong> ya atraen atención desde TikTok, pero su web y su ficha pueden estar perdiendo parte de ese tráfico.<br/><strong>Cómo abrir:</strong> «Buenos días, llamo por la web de la clínica: he visto un par de cosas que pueden estar haciéndoos perder pacientes que os encuentran en TikTok.»',
          ],
        },
        {
          h2: 'En el español de cada país',
          body: [
            'La ficha se redacta en el español del país de la empresa: en Latinoamérica, con «ustedes», el trato de usted habitual en una primera llamada y el voseo donde se usa (Argentina, Uruguay, Paraguay); en España, en el español de aquí.',
          ],
        },
        {
          h2: 'Límites',
          list: [
            'La IA puede equivocarse o quedarse en lo genérico si la web tiene poca información. Revísala antes de llamar.',
            'La llamada la haces tú: OpenSells no llama, no graba y no transcribe.',
            `Cada plan incluye un cupo de fichas al mes (${fmt(pro.callBriefsMonth, 'es')} en Profesional y ${fmt(ag.callBriefsMonth, 'es')} en Agencia), una por lead.`,
            'Las llamadas comerciales tienen reglas propias en cada país. Respeta siempre a quien te pida que no le vuelvas a llamar.',
          ],
          after: [`Ver <a href="${L('/how-it-works')}">cómo funciona todo el flujo</a> o <a href="${L('/pricing')}">los precios</a>.`],
        },
      ],
    },

    agencies: {
      title: 'Prospección B2B para agencias que venden a negocios locales',
      description: 'Cómo usan OpenSells las agencias de marketing, diseño web y SEO y los consultores que venden a pymes: buscar por nicho y ciudad, usar señales de su web como argumento y llamar preparados.',
      breadcrumb: 'Para agencias',
      eyebrow: 'Caso de uso',
      h1: 'Para agencias y consultores que venden a negocios locales',
      intro: 'Si tu cliente es una clínica, un taller, una asesoría o una tienda de tu ciudad, lo difícil no es encontrar negocios: es saber a cuáles llamar y qué decirles. OpenSells te da la lista por sector y ciudad y, para cada negocio, un motivo concreto para llamar.',
      sections: [
        {
          h2: 'Quién lo usa',
          list: [
            'Agencias de marketing digital, publicidad y redes sociales.',
            'Estudios de diseño y desarrollo web, y consultores SEO.',
            'Consultoras y servicios profesionales para pymes (protección de datos, prevención de riesgos, asesoría, formación).',
            'Empresas que venden software o equipamiento a negocios locales.',
          ],
        },
        {
          h2: 'Las señales como argumento de venta',
          body: [
            'La ficha de llamada incluye señales medidas en la web y la ficha de Google de cada negocio. Para una agencia, cada una es un punto de partida para la conversación:',
          ],
          list: [
            '<strong>Web lenta en móvil</strong> → rediseño u optimización web.',
            '<strong>Sin publicidad detectada</strong> en Google o Meta → campañas.',
            '<strong>Sin herramientas de medición</strong> detectadas → analítica.',
            '<strong>Ficha de Google incompleta o que no enlaza a la web</strong> → SEO local.',
            '<strong>Redes enlazadas desde la web</strong> → contexto para hablar de contenido.',
          ],
          after: [
            'Las señales dicen lo que se ha podido medir; si algo no se ha podido comprobar, la ficha no lo presenta como una carencia.',
          ],
        },
        {
          h2: 'Un flujo de trabajo típico',
          list: [
            'Eliges un nicho y una ciudad donde tengas trabajos parecidos que enseñar («clínicas de fisioterapia en Sevilla»).',
            'Revisas la lista y descartas lo que no encaja.',
            'Abres la ficha de cada negocio antes de llamar.',
            'Anotas el resultado, creas la tarea del siguiente paso y, si lo prefieres, preparas un email con IA para quien te lo pida.',
            'Exportas los leads a CSV para tu CRM (sin límite en los planes de pago).',
          ],
        },
        {
          h2: 'Qué plan encaja',
          body: [
            `El plan <strong>Agencia</strong> incluye ${fmt(ag.leadsMonth, 'es')} leads, ${fmt(ag.callBriefsMonth, 'es')} fichas de llamada y ${fmt(ag.emailDraftsMonth, 'es')} borradores de email al mes, con prioridad máxima en la cola de búsquedas, por ${money(ag.eur, 'EUR', 'es')}/mes con IVA incluido (${money(ag.usd, 'USD', 'es')} si pagas desde Latinoamérica). Si trabajas solo, el Profesional (${fmt(pro.leadsMonth, 'es')} leads) suele bastar. <a href="${L('/pricing')}">Ver precios y condiciones</a>.`,
          ],
        },
        {
          h2: 'Lo que no hace',
          list: [
            'No busca personas con un cargo concreto: trabaja con los datos que publica el negocio.',
            'No verifica emails ni envía secuencias automáticas; el envío de email es solo con Gmail.',
            'No llama por ti.',
          ],
        },
      ],
    },

    pricing: {
      title: 'Precios: planes, prueba gratis, moneda y condiciones',
      description: `Profesional ${money(pro.eur, 'EUR', 'es')}/mes y Agencia ${money(ag.eur, 'EUR', 'es')}/mes con IVA incluido (${money(pro.usd, 'USD', 'es')} y ${money(ag.usd, 'USD', 'es')} en Latinoamérica). Primer mes gratis sin tarjeta. Qué cuenta como lead, bolsas, cancelación y reembolso.`,
      breadcrumb: 'Precios',
      eyebrow: 'Precios y condiciones',
      h1: 'Precios y condiciones',
      intro: `Dos planes mensuales y un primer mes gratis del plan Profesional, sin tarjeta. Abajo tienes todo lo que conviene saber antes de empezar: qué cuenta como lead, en qué moneda pagas, qué pasa al acabar la prueba y cómo cancelar.`,
      sections: [
        {
          h2: 'La prueba gratuita',
          list: [
            `Al registrarte tienes <strong>un mes del plan Profesional completo</strong>, sin tarjeta y sin cobro.`,
            `Lo único limitado durante la prueba es la exportación: ${TRIAL.csvRowsMonth} leads al mes a CSV.`,
            'Si al terminar no has añadido un método de pago, la suscripción se cancela sola y la cuenta pasa a <strong>solo lectura</strong>: sigues viendo tus leads, nichos y tareas, pero no puedes buscar ni generar fichas o emails hasta contratar un plan.',
          ],
        },
        {
          h2: 'Qué cuenta como un lead',
          body: [
            'Cada empresa nueva que se guarda en tu cuenta descuenta un lead del cupo del mes, tenga o no teléfono o email. Las empresas que ya tenías no se vuelven a descontar. Cada lead trae su ficha de llamada y sus borradores de email (una ficha y tres borradores por lead).',
          ],
        },
        {
          h2: 'Moneda e impuestos',
          body: [
            'Los precios en euros llevan el IVA incluido.',
            `Si registras la cuenta desde un país hispanohablante de Latinoamérica (${USD_COUNTRIES.length} países, entre ellos México, Colombia, Argentina, Chile y Perú), ves y pagas los precios en <strong>dólares estadounidenses (USD)</strong>, sin IVA español. Tu banco o Stripe pueden mostrarte el importe convertido a tu moneda local.`,
            'La moneda se decide por la conexión desde la que te registras, no por el país que elijas para buscar. Desde cualquier otro país, los precios son en euros.',
          ],
        },
        {
          h2: 'Bolsas de leads',
          body: [
            `Si agotas el cupo del mes, puedes comprar una bolsa suelta: ${fmt(PACKS[0].leads, 'es')} leads por ${money(PACKS[0].eur, 'EUR', 'es')} (${money(PACKS[0].usd, 'USD', 'es')}) o ${fmt(PACKS[1].leads, 'es')} por ${money(PACKS[1].eur, 'EUR', 'es')} (${money(PACKS[1].usd, 'USD', 'es')}). Es un pago único, no caduca, trae sus fichas y borradores, y solo se gasta cuando has agotado los del plan.`,
          ],
        },
        {
          h2: 'Cancelación y reembolso',
          list: [
            'Sin permanencia: cancelas desde tu panel y mantienes el acceso hasta el final del periodo pagado.',
            `Puedes solicitar el reembolso completo en los ${TRIAL.refundDays} días siguientes a tu primer pago, en los términos del <a href="${L('/terms')}">apartado 4 de los Términos de servicio</a>.`,
            'Si un cobro falla, mantienes el acceso mientras se reintenta el pago en los días siguientes.',
            'Tus leads son tuyos: con un plan de pago puedes exportarlos sin límite antes de cancelar. Mantenemos tu historial 30 días.',
          ],
        },
        {
          h2: 'Facturación VERI*FACTU (solo España)',
          body: [
            'Los presupuestos y facturas con VERI*FACTU para tus propios clientes están incluidos en todos los planes, también en la prueba, sin coste extra. Solo aplican a quien factura en España.',
          ],
        },
      ],
    },

    about: {
      title: 'Sobre OpenSells',
      description: 'Qué es OpenSells, para quién está hecho, de dónde salen sus datos, qué no promete y cómo contactar.',
      breadcrumb: 'Sobre OpenSells',
      h1: 'Sobre OpenSells',
      intro: 'OpenSells es un software de prospección B2B hecho para quien vende a negocios locales en España y Latinoamérica: freelancers, agencias y consultores que necesitan encontrar a quién llamar y llegar a cada llamada sabiendo qué decir.',
      schemaType: 'AboutPage',
      sections: [
        {
          h2: 'Qué problema resuelve',
          body: [
            'Buscar empresas a mano (Google, la web de cada una, copiar datos a una hoja) se come horas antes de hablar con nadie, y llamar sin preparación hace que la conversación se pierda en la primera frase. OpenSells junta las dos cosas: encuentra negocios por sector y ciudad con sus datos públicos y prepara con IA una ficha para cada llamada.',
          ],
        },
        {
          h2: 'Cómo trabajamos con los datos',
          list: [
            'Usamos fuentes públicas: la ficha del negocio en Google Maps (API de Google Places) y la propia web de cada empresa.',
            'No vendemos ni usamos listas compradas. Los leads que encuentras son tuyos y no los cedemos a terceros.',
            'No verificamos buzones de email, y lo decimos: una dirección pública puede estar desactualizada.',
            `Cómo tratamos tus datos como usuario está en la <a href="${L('/privacy')}">política de privacidad</a>.`,
          ],
        },
        {
          h2: 'Lo que no prometemos',
          list: [
            'No garantizamos ventas ni tasas de respuesta: dependen de tu oferta, tu sector y tu forma de contactar.',
            'La IA puede equivocarse. Por eso las fichas separan lo que no existe de lo que no hemos podido comprobar, y te pedimos que las revises.',
            'Que un dato sea público no autoriza por sí solo a contactar con fines comerciales. Cumplir la normativa de cada país es responsabilidad de quien contacta.',
          ],
        },
        {
          h2: 'Dónde funciona',
          body: [
            'OpenSells se desarrolla y se opera desde España. Está pensado para España y los países hispanohablantes de Latinoamérica, y la aplicación está en español. Las funciones de facturación VERI*FACTU solo aplican en España.',
          ],
        },
        {
          h2: 'Contacto',
          body: [`Escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> o mira la <a href="${L('/contact')}">página de contacto</a>.`],
        },
      ],
    },

    contact: {
      title: 'Contacto',
      description: 'Cómo contactar con OpenSells: soporte, dudas antes de registrarte, privacidad y protección de datos.',
      breadcrumb: 'Contacto',
      h1: 'Contacto',
      intro: `La forma de contactar con OpenSells es por email: ${CONTACT_EMAIL}.`,
      schemaType: 'ContactPage',
      cta: false,
      sections: [
        {
          h2: 'Soporte y dudas',
          body: [
            `Para dudas sobre el producto, tu cuenta, los planes o la facturación, escribe a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. Si ya tienes cuenta, indica el email con el que te registraste. Nunca te pediremos tu contraseña.`,
          ],
        },
        {
          h2: 'Privacidad y protección de datos',
          body: [
            `Para ejercer tus derechos de acceso, rectificación, supresión, portabilidad, limitación u oposición, escribe al mismo email. Si tu empresa aparece en los resultados de OpenSells y quieres hacernos una consulta, también. Más información en la <a href="${L('/privacy')}">política de privacidad</a>.`,
          ],
        },
        {
          h2: 'Antes de escribir',
          list: [
            `Precios, prueba, moneda y cancelación: <a href="${L('/pricing')}">precios y condiciones</a>.`,
            `Cómo funciona y sus límites: <a href="${L('/how-it-works')}">cómo funciona</a>.`,
            `Preguntas frecuentes: <a href="${L('/')}#faq">en la portada</a>.`,
          ],
        },
        {
          h2: '¿Quieres probarlo?',
          body: [`<a href="${REGISTER_URL}">Crea tu cuenta gratis</a>: el primer mes del plan Profesional no requiere tarjeta.`],
        },
      ],
    },
  };
}

function en(): Record<PageKey, PageContent> {
  const L = (p: string) => localePath('en', p);
  return {
    howItWorks: {
      title: 'How it works: from company search to a prepared call',
      description: 'How OpenSells works step by step: where the data comes from, what each lead includes, how the AI call brief is prepared, follow-up, email and the limits.',
      breadcrumb: 'How it works',
      eyebrow: 'Product',
      h1: 'How OpenSells works',
      intro: 'OpenSells is B2B prospecting software for people who sell to businesses: type an industry and a city, get companies with their public contact details, and get an AI-prepared brief for each call. You make the call; OpenSells helps you arrive prepared and keep follow-up on track. The app interface is currently in Spanish.',
      sections: [
        {
          h2: '1. Search by industry and city',
          body: [
            'Type what you are looking for as you would say it: "dental clinics in Bogotá", "car repair shops in Monterrey". You choose your country in the app, and the search also recognises the country or city you type. Each search returns up to 100 companies.',
            'Data comes from public sources: the business\'s Google Maps listing (through the Google Places API) and each company\'s own website. No purchased lists.',
          ],
        },
        {
          h2: '2. What you get for each company',
          list: [
            'Name, address and website.',
            'Phone number, when the business publishes one.',
            'Email, when it appears on their website. <strong>We do not verify mailboxes</strong> (no SMTP or MX checks).',
            'Signals from their website and Google listing you can use as a sales angle: mobile speed, whether ads or analytics are detected, linked social profiles, gaps in the listing.',
          ],
          after: ['Companies you already saved are not charged again. Each new company saved uses one lead from your allowance, whether or not it has a phone or email.'],
        },
        {
          h2: '3. Open the call brief',
          body: [`Before you dial, AI summarises what the company does, why calling may make sense, how to open, up to three questions and responses to likely objections. It is written from their website, their Google listing and what you sell. <a href="${L('/ai-call-brief')}">See the call brief</a>.`],
        },
        {
          h2: '4. You call, and keep follow-up organised',
          body: ['OpenSells does not place automated calls or record them. You call from your own phone and then update the lead status, add a note or create a task for the next step.'],
        },
        {
          h2: '5. If you prefer to write: AI email drafts',
          body: ['For leads with an email, AI drafts a personalised message after reading their website. You review it and can send it from OpenSells through your own connected Gmail account, one by one or in batches. Gmail only. Check you have a legal basis first: in Spain, <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 LSSI</a> requires prior consent even for business recipients.'],
        },
        {
          h2: '6. Export your leads',
          body: [`On a paid plan you can export leads to CSV without limit. During the trial, export is limited to ${TRIAL.csvRowsMonth} leads per month.`],
        },
        {
          h2: 'Spain only: quotes and VERI*FACTU invoices',
          body: ['Separately from prospecting, OpenSells includes quotes and invoices for the customers you close, with VERI*FACTU records sent to the Spanish tax agency (AEAT) using your electronic certificate. Only relevant if you invoice in Spain.'],
        },
        {
          h2: 'Who it fits and who it doesn\'t',
          list: [
            '<strong>Good fit</strong> if you sell to businesses with a public presence: marketing and web agencies, consultancies, accountants, training, SME software, professional services.',
            '<strong>Poorer fit</strong> if you need a specific job title inside a large company: OpenSells works with what the business publishes, not personal profiles.',
            'Built for Spain and Spanish-speaking Latin America. The app is in Spanish.',
          ],
        },
        {
          h2: 'Limits worth knowing',
          list: [
            'Data depends on what each business publishes and may be missing or outdated.',
            'AI can be wrong or generic when a website says little: review briefs and drafts.',
            'No email verification, no automated sequences, no automated calls.',
            'Public data does not, on its own, authorise commercial contact: check local rules.',
          ],
          after: [`See <a href="${L('/pricing')}">pricing and terms</a>.`],
        },
      ],
    },

    callBrief: {
      title: 'AI call brief: prepare every B2B sales call',
      description: 'What the OpenSells call brief is, what it contains, where the AI gets its information, an illustrative example and its limits.',
      breadcrumb: 'AI call brief',
      eyebrow: 'Call preparation',
      h1: 'The call brief: what to say before you dial',
      intro: 'For each company you find, OpenSells can prepare an AI call brief: a short summary of what they do, why calling may make sense and how to open. It is designed to be read in a minute, right before you dial.',
      sections: [
        {
          h2: 'What it contains',
          list: [
            '<strong>What they do</strong>, in one or two concrete sentences.',
            '<strong>Detected signals</strong> from their website and Google listing: mobile speed, whether ads or analytics are detected, linked social profiles, gaps in the listing.',
            '<strong>Reasons to call</strong>: two or three hooks linking something about that company to what you sell.',
            '<strong>How to open</strong>: a short first sentence to say out loud, adjusted to whether the number looks like a mobile or a landline.',
            '<strong>Up to three questions</strong> to qualify them and <strong>responses to likely objections</strong>.',
            '<strong>The registered company name</strong>, when known, so you ask for the right business at reception.',
            '<strong>A "not a fit" warning</strong> when the company is clearly not a buyer for what you sell. A warning, not a veto.',
          ],
        },
        {
          h2: 'Where the information comes from',
          body: [
            'The AI reads the company\'s website and its public Google listing and combines them with what you told OpenSells you sell. Technical data (speed, social links, listing gaps) is measured by OpenSells; the AI only writes the judgement parts.',
            'When something could not be checked, the brief does not present it as a gap: "they don\'t have it" and "we couldn\'t check" are different things.',
          ],
        },
        {
          h2: 'Illustrative example',
          body: [
            '<em>Fictitious company, person and data, to show the format.</em>',
            '<strong>What they do:</strong> a neighbourhood dental clinic with three practitioners, mostly local families.<br/><strong>Signals:</strong> slow website on mobile; no Google ads detected; a TikTok profile is linked; the Google listing does not link to the website.<br/><strong>Reason to call:</strong> TikTok already brings them attention, but their website and listing may be losing part of that traffic.<br/><strong>How to open:</strong> "Good morning, I\'m calling about the clinic\'s website: I noticed a couple of things that may be costing you patients who find you on TikTok."',
          ],
        },
        {
          h2: 'Written in local Spanish',
          body: ['Briefs are written in the Spanish of the company\'s country, since the app targets Spain and Spanish-speaking Latin America.'],
        },
        {
          h2: 'Limits',
          list: [
            'AI can be wrong or generic when a website says little. Review it before calling.',
            'You make the call: OpenSells does not call, record or transcribe.',
            `Each plan includes a monthly allowance of briefs (${fmt(pro.callBriefsMonth, 'en')} on Professional, ${fmt(ag.callBriefsMonth, 'en')} on Agency), one per lead.`,
            'Sales calls are regulated differently in each country. Always respect do-not-call requests.',
          ],
          after: [`See <a href="${L('/how-it-works')}">the full workflow</a> or <a href="${L('/pricing')}">pricing</a>.`],
        },
      ],
    },

    agencies: {
      title: 'B2B prospecting for agencies selling to local businesses',
      description: 'How marketing, web design and SEO agencies and SME consultants use OpenSells: search by niche and city, use website signals as a sales angle and call prepared.',
      breadcrumb: 'For agencies',
      eyebrow: 'Use case',
      h1: 'For agencies and consultants selling to local businesses',
      intro: 'If your clients are clinics, repair shops, accountants or shops in your city, finding businesses is not the hard part: knowing which ones to call and what to say is. OpenSells gives you the list by industry and city and, for each business, a concrete reason to call.',
      sections: [
        {
          h2: 'Who uses it',
          list: [
            'Digital marketing, advertising and social media agencies.',
            'Web design and development studios, and SEO consultants.',
            'Consultancies and professional services for SMEs.',
            'Companies selling software or equipment to local businesses.',
          ],
        },
        {
          h2: 'Signals as a sales angle',
          list: [
            '<strong>Slow mobile website</strong> → redesign or optimisation.',
            '<strong>No ads detected</strong> on Google or Meta → campaigns.',
            '<strong>No analytics detected</strong> → measurement.',
            '<strong>Incomplete Google listing, or no link to the website</strong> → local SEO.',
            '<strong>Social profiles linked from the website</strong> → context for content.',
          ],
          after: ['Signals report what could be measured; anything that could not be checked is not presented as a gap.'],
        },
        {
          h2: 'A typical workflow',
          list: [
            'Pick a niche and a city where you can show similar work.',
            'Review the list and drop what doesn\'t fit.',
            'Open each business\'s brief before calling.',
            'Log the outcome, create the next-step task and, if they ask, prepare an AI email.',
            'Export leads to CSV for your CRM (unlimited on paid plans).',
          ],
        },
        {
          h2: 'Which plan fits',
          body: [`The <strong>Agency</strong> plan includes ${fmt(ag.leadsMonth, 'en')} leads, ${fmt(ag.callBriefsMonth, 'en')} call briefs and ${fmt(ag.emailDraftsMonth, 'en')} email drafts per month, with top priority in the search queue, for ${money(ag.eur, 'EUR', 'en')}/mo including Spanish VAT (${money(ag.usd, 'USD', 'en')} when paying from Latin America). Working solo, Professional (${fmt(pro.leadsMonth, 'en')} leads) is usually enough. <a href="${L('/pricing')}">See pricing and terms</a>.`],
        },
        {
          h2: 'What it doesn\'t do',
          list: [
            'It doesn\'t find people by job title: it works with what the business publishes.',
            'No email verification or automated sequences; email sending is Gmail only.',
            'It doesn\'t call for you. The app is in Spanish.',
          ],
        },
      ],
    },

    pricing: {
      title: 'Pricing: plans, free trial, currency and terms',
      description: `Professional ${money(pro.eur, 'EUR', 'en')}/mo and Agency ${money(ag.eur, 'EUR', 'en')}/mo including VAT (${money(pro.usd, 'USD', 'en')} and ${money(ag.usd, 'USD', 'en')} in Latin America). First month free, no card. What counts as a lead, packs, cancellation and refunds.`,
      breadcrumb: 'Pricing',
      eyebrow: 'Pricing and terms',
      h1: 'Pricing and terms',
      intro: 'Two monthly plans and a free first month of the Professional plan, no card required. Below is everything worth knowing before you start: what counts as a lead, which currency you pay in, what happens when the trial ends and how to cancel.',
      sections: [
        {
          h2: 'The free trial',
          list: [
            'When you sign up you get <strong>one month of the full Professional plan</strong>, with no card and no charge.',
            `The only thing limited during the trial is export: ${TRIAL.csvRowsMonth} leads per month to CSV.`,
            'If you have not added a payment method when it ends, the subscription cancels automatically and the account switches to <strong>read-only</strong>: you can still view your leads, niches and tasks, but not search or generate briefs or emails until you subscribe.',
          ],
        },
        {
          h2: 'What counts as a lead',
          body: ['Each new company saved to your account uses one lead from the monthly allowance, whether or not it has a phone or email. Companies you already had are not charged again. Each lead comes with its call brief and email drafts (one brief and three drafts per lead).'],
        },
        {
          h2: 'Currency and tax',
          body: [
            'Euro prices include Spanish VAT.',
            `If you sign up from a Spanish-speaking Latin American country (${USD_COUNTRIES.length} countries, including Mexico, Colombia, Argentina, Chile and Peru), you see and pay prices in <strong>US dollars (USD)</strong>, without Spanish VAT. Your bank or Stripe may show the amount converted to your local currency.`,
            'The currency is set by the connection you sign up from, not by the country you choose to search in. From any other country, prices are in euros.',
          ],
        },
        {
          h2: 'Lead packs',
          body: [`If you run out mid-month, buy a one-off pack: ${fmt(PACKS[0].leads, 'en')} leads for ${money(PACKS[0].eur, 'EUR', 'en')} (${money(PACKS[0].usd, 'USD', 'en')}) or ${fmt(PACKS[1].leads, 'en')} for ${money(PACKS[1].eur, 'EUR', 'en')} (${money(PACKS[1].usd, 'USD', 'en')}). One-time payment, never expires, includes its briefs and drafts, and is only used after your plan's allowance.`],
        },
        {
          h2: 'Cancellation and refunds',
          list: [
            'No lock-in: cancel from your dashboard and keep access until the end of the paid period.',
            `You can request a full refund within ${TRIAL.refundDays} days of your first payment, under <a href="${L('/terms')}">section 4 of the Terms of Service</a>.`,
            'If a payment fails, you keep access while it is retried over the following days.',
            'Your leads are yours: on a paid plan you can export them without limit before cancelling. We keep your history for 30 days.',
          ],
        },
        {
          h2: 'VERI*FACTU invoicing (Spain only)',
          body: ['Quotes and VERI*FACTU invoices for your own customers are included on every plan, trial included, at no extra cost. Only relevant if you invoice in Spain.'],
        },
      ],
    },

    about: {
      title: 'About OpenSells',
      description: 'What OpenSells is, who it is for, where its data comes from, what it does not promise and how to get in touch.',
      breadcrumb: 'About',
      h1: 'About OpenSells',
      intro: 'OpenSells is B2B prospecting software for people selling to local businesses in Spain and Latin America: freelancers, agencies and consultants who need to find who to call and arrive at each call knowing what to say.',
      schemaType: 'AboutPage',
      sections: [
        {
          h2: 'The problem it solves',
          body: ['Finding companies by hand (Google, each website, copying data into a spreadsheet) takes hours before you talk to anyone, and calling unprepared loses the conversation in the first sentence. OpenSells combines both: it finds businesses by industry and city with their public data and prepares an AI brief for each call.'],
        },
        {
          h2: 'How we work with data',
          list: [
            'We use public sources: the business\'s Google Maps listing (Google Places API) and each company\'s own website.',
            'We don\'t sell or use purchased lists. The leads you find are yours and we don\'t share them with third parties.',
            'We don\'t verify email mailboxes, and we say so.',
            `How we handle your data as a user is in the <a href="${L('/privacy')}">privacy policy</a>.`,
          ],
        },
        {
          h2: 'What we don\'t promise',
          list: [
            'We don\'t guarantee sales or reply rates: they depend on your offer, your industry and how you reach out.',
            'AI can be wrong. That is why briefs separate what doesn\'t exist from what we couldn\'t check, and why we ask you to review them.',
            'Public data does not, on its own, authorise commercial contact. Complying with each country\'s rules is the responsibility of whoever makes contact.',
          ],
        },
        {
          h2: 'Where it works',
          body: ['OpenSells is developed and operated from Spain. It is built for Spain and Spanish-speaking Latin America, and the app is in Spanish. VERI*FACTU invoicing only applies in Spain.'],
        },
        {
          h2: 'Contact',
          body: [`Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or see the <a href="${L('/contact')}">contact page</a>.`],
        },
      ],
    },

    contact: {
      title: 'Contact',
      description: 'How to contact OpenSells: support, pre-signup questions, privacy and data protection.',
      breadcrumb: 'Contact',
      h1: 'Contact',
      intro: `The way to contact OpenSells is by email: ${CONTACT_EMAIL}.`,
      schemaType: 'ContactPage',
      cta: false,
      sections: [
        {
          h2: 'Support and questions',
          body: [`For questions about the product, your account, plans or billing, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. If you already have an account, include the email you signed up with. We will never ask for your password.`],
        },
        {
          h2: 'Privacy and data protection',
          body: [`To exercise your rights of access, rectification, erasure, portability, restriction or objection, write to the same address. See the <a href="${L('/privacy')}">privacy policy</a>.`],
        },
        {
          h2: 'Before you write',
          list: [
            `Pricing, trial, currency and cancellation: <a href="${L('/pricing')}">pricing and terms</a>.`,
            `How it works and its limits: <a href="${L('/how-it-works')}">how it works</a>.`,
            `FAQ: <a href="${L('/')}#faq">on the home page</a>.`,
          ],
        },
        {
          h2: 'Want to try it?',
          body: [`<a href="${REGISTER_URL}">Create your free account</a>: the first month of the Professional plan needs no card. The app is in Spanish.`],
        },
      ],
    },
  };
}

export function getPage(locale: string, key: PageKey): PageContent {
  return (locale === 'en' ? en() : es())[key];
}
