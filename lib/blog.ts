import { PLANS, money } from '@/lib/pricing';
import { REGISTER_URL } from '@/lib/site';

export type Post = {
  slug: string;
  locale: string;
  title: string;
  description: string;
  /** Fecha de publicación original. */
  date: string;
  /** Última revisión real del contenido (dateModified y lastmod del sitemap). */
  updated: string;
  readTime: string;
  /** Slug del mismo artículo en el otro idioma, solo si es una traducción de
   * verdad (mismo tema y mismo contenido). Se usa para hreflang. */
  translation?: string;
  /** Se enseña en la portada. */
  featured?: boolean;
  content: string;
};

/* Revisión del 2026-09-29.
 *
 * Se reescribieron todos los artículos porque arrastraban afirmaciones que no
 * se sostenían:
 *   - Precios y planes antiguos (14,50 €, 29 €, «plan gratis», «2 búsquedas»).
 *   - Funciones que OpenSells no tiene (verificación de emails, Outlook,
 *     seguimientos automáticos, «envío masivo»).
 *   - Cifras sin fuente ni medición: tasas de respuesta «de nuestros
 *     usuarios», «reduce de 2-3 horas a 15-20 minutos», rangos por sector.
 *   - Que el cold email B2B es «completamente legal en España». El art. 21 de
 *     la LSSI exige consentimiento previo también cuando el destinatario es
 *     una empresa (la ley define destinatario como persona física o jurídica).
 *   - En las comparativas, que Hunter y Apollo no redactan con IA: su
 *     documentación oficial dice lo contrario.
 * Los slugs se mantienen aunque lleven «2025»: cambiarlos solo por el año
 * rompería enlaces sin ganar nada. */

const UPDATED = '2026-09-29';
const CHECKED_ES = '29 de septiembre de 2026';
const CHECKED_EN = '29 September 2026';

const pro = PLANS.find((p) => p.key === 'profesional')!;
const ag = PLANS.find((p) => p.key === 'agencia')!;

const PRICE_ES = `primer mes del plan Profesional gratis y sin tarjeta; después, Profesional ${money(pro.eur, 'EUR', 'es')}/mes y Agencia ${money(ag.eur, 'EUR', 'es')}/mes con IVA incluido (${money(pro.usd, 'USD', 'es')} y ${money(ag.usd, 'USD', 'es')} si pagas desde Latinoamérica)`;
const PRICE_EN = `first month of the Professional plan free, no card; then Professional ${money(pro.eur, 'EUR', 'en')}/mo and Agency ${money(ag.eur, 'EUR', 'en')}/mo including Spanish VAT (${money(pro.usd, 'USD', 'en')} and ${money(ag.usd, 'USD', 'en')} when paying from Latin America)`;

const CTA_ES = `<p><a href="${REGISTER_URL}">Prueba OpenSells gratis</a>: el ${PRICE_ES}. <a href="/pricing">Ver precios y condiciones</a>.</p>`;
const CTA_EN = `<p><a href="${REGISTER_URL}">Try OpenSells free</a>: ${PRICE_EN}. <a href="/en/pricing">See pricing and terms</a>. Note that the app interface is currently in Spanish.</p>`;

const LEGAL_ES = `
<h2>Antes de nada: lo que dice la ley en España</h2>
<p>El <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">artículo 21 de la LSSI</a> prohíbe enviar por correo electrónico comunicaciones publicitarias o promocionales que no hayan sido «previamente solicitadas o expresamente autorizadas» por quien las recibe. La misma ley define al destinatario como persona física <em>o jurídica</em>, así que la regla no se limita a los particulares: también alcanza a las empresas. La excepción principal es la relación contractual previa: puedes escribir a tus clientes sobre productos o servicios similares a los que ya te contrataron, ofreciéndoles una forma sencilla y gratuita de darse de baja.</p>
<p>En la práctica, eso deja poco margen al email comercial en frío dirigido a empresas en España. Si además la dirección identifica a una persona (nombre.apellido@empresa.es), entra en juego el RGPD. Que un dato sea público no te autoriza por sí solo a usarlo con fines comerciales. Esto no es asesoramiento legal: si vas a hacer campañas por email, consúltalo con un profesional. En otros países hispanohablantes las reglas son distintas.</p>`;

const LEGAL_EN = `
<h2>First: the legal side</h2>
<p>Rules on unsolicited commercial email vary by country, and they often apply to business recipients too. In Spain, for example, <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">article 21 of the LSSI</a> (Spanish e-commerce law) prohibits promotional emails that were not "previously requested or expressly authorised" by the recipient, and the law defines a recipient as a natural <em>or legal</em> person — so it covers companies, not just consumers. The main exception is an existing customer relationship involving similar products or services, with an easy, free way to opt out.</p>
<p>Public data is not, by itself, permission to contact someone commercially. If an address identifies a person (firstname.lastname@company.com), data protection law such as the GDPR also applies. This is not legal advice: check the rules of the country you are sending to before you run an email campaign.</p>`;

const GOOGLE_SENDER = 'https://support.google.com/a/answer/81126';

const posts: Post[] = [
  // ─── ESPAÑOL ────────────────────────────────────────────────────────────────
  {
    slug: 'guia-cold-email-espana-2025',
    locale: 'es',
    translation: 'cold-email-b2b-guide-2025',
    title: 'Cold email B2B en España: guía práctica y marco legal (2026)',
    description: 'Qué es el cold email B2B, qué dice la LSSI sobre enviarlo a empresas en España, cómo escribir un email que se lea y qué medir. Sin cifras mágicas.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '7 min',
    content: `
<h2>Qué es el cold email B2B</h2>
<p>El <strong>cold email B2B</strong> es un email comercial que se envía a una empresa o a un profesional con quien no has tenido contacto previo. Se usa para abrir una conversación: presentar un servicio, proponer una llamada o pedir el contacto de la persona adecuada.</p>
${LEGAL_ES}

<h2>Qué alternativas tienes si vendes a negocios en España</h2>
<p>Por ese marco legal, muchas empresas que venden a negocios locales en España priorizan otros primeros contactos y reservan el email para quien ya ha mostrado interés:</p>
<ul>
  <li><strong>Teléfono.</strong> Muchos negocios locales publican un teléfono aunque no tengan un email comercial útil. Las llamadas comerciales también tienen reglas propias; respeta siempre a quien te pida que no le vuelvas a llamar.</li>
  <li><strong>Visita o evento.</strong> Ferias, asociaciones de comerciantes o del sector.</li>
  <li><strong>Contenido y recomendaciones.</strong> Más lentos, pero traen contactos que ya saben quién eres.</li>
</ul>
<p>OpenSells está pensado para el primer caso: encuentra negocios por sector y ciudad con su teléfono cuando está publicado y te prepara una <a href="/ai-call-brief">ficha para cada llamada</a>.</p>

<h2>Si envías emails: cómo escribir uno que se lea</h2>
<p>Tanto si escribes a tus clientes, a quien te ha dado permiso o a contactos de otros países donde la ley lo permita, estas pautas ayudan:</p>
<ol>
  <li><strong>Asunto concreto.</strong> «Propuesta de colaboración» no dice nada. Mejor algo que solo pueda ir dirigido a esa empresa.</li>
  <li><strong>El primer párrafo habla de ellos.</strong> Demuestra que has mirado su negocio: un servicio de su web, su zona, algo que has visto.</li>
  <li><strong>Corto.</strong> Qué haces, para quién y qué propones, en pocas líneas que se lean en el móvil.</li>
  <li><strong>Una sola petición y fácil de aceptar.</strong> «¿Te encaja hablar 15 minutos esta semana?» mejor que «Espero tu respuesta».</li>
  <li><strong>Identifícate y ofrece la baja.</strong> Nombre, empresa y una forma sencilla de no recibir más mensajes.</li>
  <li><strong>Seguimiento con moderación.</strong> Uno o dos recordatorios espaciados; si te piden que pares, para.</li>
</ol>

<h2>Entregabilidad: lo que pide Gmail</h2>
<p>Google publica <a href="${GOOGLE_SENDER}">requisitos para quien envía a cuentas de Gmail</a>: autenticar el dominio (SPF o DKIM, y los dos más DMARC si envías más de 5.000 mensajes al día), mantener la tasa de spam por debajo del 0,3 % y, en los envíos masivos de marketing, ofrecer la baja con un clic.</p>

<h2>Qué medir</h2>
<p>Mide respuestas, no aperturas: muchos clientes de correo precargan las imágenes y la apertura deja de ser un dato fiable. Separa las respuestas positivas del resto y compara por campaña y por sector, no en global. En <a href="/blog/tasa-respuesta-cold-email-espana-datos-reales">esta guía</a> explicamos cómo montar la medición paso a paso. No damos «tasas medias»: dependen tanto de la lista, la oferta y el sector que cualquier cifra general engaña.</p>

<h2>Dónde encaja OpenSells</h2>
<p>OpenSells encuentra negocios por sector y ciudad y recoge sus datos públicos: el teléfono y, cuando la empresa lo publica en su web, un email. <strong>No verificamos los buzones</strong> (ni SMTP ni MX), así que pueden estar desactualizados o ser genéricos. Para los leads con email, la IA redacta un borrador leyendo su web, que revisas y puedes enviar desde tu cuenta de Gmail conectada. Tener una base legal para enviarlo es responsabilidad de quien lo envía.</p>
${CTA_ES}
    `,
  },
  {
    slug: 'como-generar-leads-b2b-freelance',
    locale: 'es',
    translation: 'how-to-generate-b2b-leads-freelance',
    title: 'Cómo generar leads B2B siendo freelance (2026)',
    description: 'Canales para que un freelance consiga clientes B2B sin depender solo de recomendaciones o plataformas: teléfono, LinkedIn, eventos, contenido y email, con sus pros y contras.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '6 min',
    content: `
<h2>El problema</h2>
<p>Muchos freelancers consiguen sus primeros clientes por recomendación o por plataformas como Workana, Fiverr o Upwork. Funciona, pero no controlas cuándo llega el siguiente proyecto y las plataformas se quedan una comisión. La alternativa es la <strong>prospección activa</strong>: elegir a qué empresas quieres venderles y contactarlas tú, de forma constante.</p>

<h2>Por qué venderle a empresas</h2>
<p>Las empresas compran servicios de forma recurrente (mantenimiento web, marketing, asesoría, formación) y suelen tener un presupuesto asignado. A cambio, deciden más despacio y quieren confianza: el primer contacto casi nunca cierra la venta, abre una conversación.</p>

<h2>Los canales, con sus pros y contras</h2>

<h3>1. Teléfono a negocios locales</h3>
<p>Muchos negocios publican un teléfono aunque no tengan un email comercial útil, y una llamada te dice enseguida si hay interés. Funciona mucho mejor si llamas preparado: qué hacen, qué has visto en su web, cómo abrir y qué responder a «no me interesa». Es lo que hace la <a href="/ai-call-brief">ficha de llamada de OpenSells</a>.</p>

<h3>2. LinkedIn</h3>
<p>Bueno para llegar a directivos y perfiles profesionales. Lento si se hace bien: conectar, interactuar y escribir un mensaje corto que hable de ellos, sin vender en el primer mensaje.</p>

<h3>3. Eventos y networking</h3>
<p>Ferias, asociaciones del sector o encuentros locales. Una conversación en persona genera confianza rápido, pero no escala y depende del calendario.</p>

<h3>4. Contenido y SEO</h3>
<p>Escribir sobre los problemas de tus clientes (no sobre tus servicios) atrae contactos que ya te conocen. Tarda meses en dar resultados, así que conviene combinarlo con un canal activo.</p>

<h3>5. Email</h3>
<p>Útil con clientes y con quien te ha dado permiso. En España, enviar emails comerciales no solicitados está restringido también cuando el destinatario es una empresa (<a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a>); en otros países las reglas cambian. Consúltalo antes de hacer campañas.</p>

<h2>Un sistema semanal sencillo</h2>
<ol>
  <li><strong>Elige un nicho y una ciudad</strong> donde tu servicio resuelva un problema visible (webs lentas, fichas de Google sin web, negocios sin reservas online…).</li>
  <li><strong>Prepara la lista</strong> una vez por semana y descarta a quien no encaja.</li>
  <li><strong>Reserva franjas fijas para contactar</strong>, aunque tengas trabajo: la cartera tarda semanas en madurar.</li>
  <li><strong>Apunta cada resultado</strong> (no contesta, interesado, volver a llamar) y crea la tarea del siguiente paso.</li>
  <li><strong>Revisa al final de la semana</strong> qué nicho y qué mensaje funcionan, con tus propios números.</li>
</ol>

<h2>Cómo decidir si un negocio encaja antes de contactar</h2>
<ul>
  <li>¿El problema que resuelves se ve desde fuera (en su web, su ficha de Google, sus redes)?</li>
  <li>¿Parece tener actividad y tamaño para pagar tu servicio?</li>
  <li>¿Sabes por quién preguntar o cómo llegar a quien decide?</li>
  <li>¿Es un sector que entiendes y en el que puedes enseñar trabajos parecidos?</li>
</ul>

<h2>Errores habituales</h2>
<ul>
  <li><strong>Prospectar solo cuando falta trabajo.</strong> Cuando lo notas, ya vas tarde.</li>
  <li><strong>Competir solo en precio.</strong> Atrae a los clientes que menos valoran tu trabajo.</li>
  <li><strong>No hacer seguimiento.</strong> Muchos «ahora no» son «ahora no puedo», no «nunca».</li>
</ul>
${CTA_ES}
    `,
  },
  {
    slug: 'tasa-respuesta-cold-email',
    locale: 'es',
    translation: 'improve-cold-email-reply-rate',
    title: 'Cómo mejorar la tasa de respuesta de tus emails comerciales: 7 factores',
    description: 'Los siete factores que más influyen en que te respondan un email comercial: asunto, primera línea, longitud, personalización, momento, seguimiento y reputación del dominio.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '6 min',
    content: `
<h2>Antes de empezar</h2>
<p>No hay una «tasa de respuesta media» que sirva de referencia: depende de la lista, del sector, de la oferta y de si el destinatario esperaba tu mensaje. Lo útil es medir tus propios envíos y mejorar un factor cada vez. Y en España, recuerda que el email comercial no solicitado está restringido también entre empresas (<a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a>).</p>

<h2>1. El asunto</h2>
<p>Decide si se abre. Funcionan los asuntos cortos y concretos, que solo podrían ir dirigidos a esa empresa, sin palabras que suenen a publicidad ni signos de exclamación.</p>
<p><strong>Peor:</strong> «Propuesta de colaboración para tu empresa»<br/><strong>Mejor:</strong> «Una idea sobre la web de [Empresa]»</p>

<h2>2. La primera línea</h2>
<p>Aparece en la vista previa. Tiene que demostrar que has mirado su negocio: un servicio de su web, algo de su ficha de Google, su zona.</p>

<h2>3. La longitud</h2>
<p>Un email que se lee entero en la pantalla del móvil tiene más probabilidades de respuesta. Si necesitas mucho texto para explicar lo que ofreces, simplifica primero la propuesta.</p>

<h2>4. La personalización</h2>
<p>Personalizar de verdad (no solo poner el nombre) exige leer la web de cada empresa. La IA puede preparar un borrador a partir de esa lectura; revísalo siempre, porque puede equivocarse o sonar genérico si la web tiene poca información. OpenSells lo hace para los leads con email y te deja el borrador para editar.</p>

<h2>5. El momento</h2>
<p>Evita enviar cuando es más probable que el mensaje quede enterrado (lunes a primera hora, viernes por la tarde). Más que seguir una regla general, prueba franjas distintas y compara con tus datos.</p>

<h2>6. El seguimiento</h2>
<p>Mucha gente no responde al primer mensaje porque está ocupada. Uno o dos recordatorios breves y espaciados, que aporten algo nuevo, suelen ser suficientes. Si te piden que no les escribas más, no lo hagas.</p>

<h2>7. La reputación del dominio</h2>
<p>Si tus mensajes van a spam, lo demás da igual. Google publica <a href="${GOOGLE_SENDER}">requisitos para quien envía a Gmail</a>: autenticación SPF o DKIM (ambos y DMARC por encima de 5.000 envíos diarios) y una tasa de spam por debajo del 0,3 %. Envía poco volumen, a listas cuidadas, y ofrece siempre la baja.</p>

<h2>Cómo saber si has mejorado</h2>
<p>Cambia un factor cada vez y compara grupos de envíos parecidos. En <a href="/blog/tasa-respuesta-cold-email-espana-datos-reales">nuestra guía de medición</a> explicamos qué contar, durante cuánto tiempo y qué límites tiene.</p>
${CTA_ES}
    `,
  },
  {
    slug: 'como-conseguir-clientes-b2b',
    locale: 'es',
    featured: true,
    title: 'Cómo conseguir clientes B2B: canales y método (2026)',
    description: 'Guía para freelancers y agencias que venden a empresas: qué canales usar para conseguir clientes B2B, cuánto tardan, cómo cualificar y cómo organizar el seguimiento.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '8 min',
    content: `
<h2>Por qué vender a empresas es distinto</h2>
<p>En B2B casi no hay compras impulsivas: el ciclo es más largo, suele decidir más de una persona y la decisión se apoya en confianza y en trabajos parecidos que puedas enseñar. Por eso funcionan los canales que abren conversaciones, más que los que buscan un clic.</p>

<h2>Los canales principales</h2>

<h3>1. Llamada a negocios locales</h3>
<p>Si vendes a negocios con presencia local (clínicas, talleres, asesorías, hostelería, inmobiliarias…), el teléfono suele estar publicado y te da una respuesta inmediata. La clave es llamar preparado: saber a qué se dedican, qué problema visible tienen y cómo abrir la conversación. Las llamadas comerciales tienen reglas propias según el país: respeta siempre a quien no quiera recibirlas.</p>

<h3>2. LinkedIn</h3>
<p>Útil para llegar a directivos de empresas medianas y grandes. Funciona el «social selling»: conectar, aportar y después proponer una conversación. Vender en el primer mensaje suele cerrar la puerta.</p>

<h3>3. Email</h3>
<p>Imprescindible para el seguimiento con quien ya ha mostrado interés. Para el primer contacto en frío, ojo con la ley: en España el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a> exige consentimiento previo también si el destinatario es una empresa.</p>

<h3>4. Contenido y SEO</h3>
<p>Escribir sobre los problemas de tus clientes atrae contactos cualificados durante años, pero tarda meses en arrancar.</p>

<h3>5. Recomendaciones y alianzas</h3>
<p>Los clientes que llegan recomendados suelen confiar antes. Pide referencias de forma explícita y busca negocios complementarios (un diseñador con una agencia de marketing, un desarrollador con una consultora) con los que derivaros trabajo.</p>

<h3>6. Eventos</h3>
<p>Ferias y encuentros del sector sirven para proyectos grandes y para conocer a quien decide. No escalan, pero aceleran la confianza.</p>

<h2>Cuánto tarda cada canal</h2>
<p>Como orientación cualitativa: el teléfono y el email a contactos que ya te conocen dan respuesta en días; LinkedIn y los eventos, en semanas; el contenido y el SEO, en meses. Los plazos reales dependen de tu sector y de tu oferta: mídelos con tus propios datos.</p>

<h2>Cómo cualificar a un prospecto antes de contactar</h2>
<ul>
  <li>¿Tiene un problema que puedes ver desde fuera y que tú resuelves?</li>
  <li>¿Tiene actividad y tamaño para pagar tu servicio?</li>
  <li>¿Sabes por quién preguntar?</li>
  <li>¿Puedes enseñar un trabajo parecido para su sector o su ciudad?</li>
</ul>

<h2>Organiza el seguimiento</h2>
<p>La mayoría de ventas B2B no se cierran en el primer contacto. Apunta el resultado de cada llamada o mensaje, crea la tarea del siguiente paso y revisa cada semana qué nichos responden mejor.</p>

<h2>Dónde encaja OpenSells</h2>
<p>OpenSells cubre la parte de encontrar negocios y preparar el contacto: buscas por sector y ciudad, obtienes sus datos públicos (el teléfono cuando está publicado y el email si aparece en su web, sin verificar), abres una ficha de llamada preparada con IA y organizas el seguimiento con estados, notas y tareas. Puedes exportar tus leads a CSV en los planes de pago. <a href="/how-it-works">Así funciona</a>.</p>
${CTA_ES}
    `,
  },
  {
    slug: 'que-es-el-cold-email',
    locale: 'es',
    title: 'Qué es el cold email y cómo funciona en B2B (2026)',
    description: 'Qué es el cold email, en qué se diferencia del spam, qué dice la ley en España sobre enviarlo a empresas y cómo se hace paso a paso cuando está permitido.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '5 min',
    content: `
<h2>Definición</h2>
<p>El <strong>cold email</strong> («email frío») es un email que envías a alguien con quien no has tenido contacto previo. En B2B se usa para contactar a empresas o profesionales que podrían necesitar lo que ofreces. Es el equivalente escrito de una llamada en frío.</p>

<h2>¿Es lo mismo que el spam?</h2>
<p>La diferencia práctica está en la segmentación y la relevancia: un email escrito para una empresa concreta, con remitente identificado y opción de baja, no se parece a un envío genérico a miles de direcciones compradas. Pero cuidado: <strong>la diferencia legal no depende de lo bien escrito que esté</strong>, sino de si el destinatario lo pidió o lo autorizó.</p>
${LEGAL_ES}

<h2>Cómo funciona, paso a paso, cuando está permitido</h2>
<ol>
  <li><strong>Defines a quién escribes</strong>: sector, tamaño, zona y quién decide.</li>
  <li><strong>Construyes la lista</strong> con empresas que encajan y con una base legal para escribirles.</li>
  <li><strong>Escribes un email corto y personalizado</strong>: por qué ellos, qué propones y una sola petición.</li>
  <li><strong>Haces un seguimiento moderado</strong>: uno o dos recordatorios espaciados.</li>
  <li><strong>Gestionas las respuestas</strong> y respetas inmediatamente cualquier petición de baja.</li>
</ol>

<h2>Qué medir</h2>
<p>Respuestas (y cuántas son positivas), reuniones y ventas. Las aperturas son poco fiables porque muchos clientes de correo precargan las imágenes. Explicamos cómo medir en <a href="/blog/tasa-respuesta-cold-email-espana-datos-reales">esta guía</a>.</p>

<h2>El papel de la IA</h2>
<p>Lo más costoso de un buen email en frío es investigar a cada empresa. La IA puede leer su web y proponer un borrador; sigue haciendo falta revisarlo, porque puede equivocarse o quedarse en lo genérico si la web tiene poca información. OpenSells prepara esos borradores para los leads con email y, sobre todo, una <a href="/ai-call-brief">ficha para llamar</a>, que en España suele ser un primer contacto más viable.</p>
${CTA_ES}
    `,
  },
  {
    slug: 'alternativas-hunter-io-apollo',
    locale: 'es',
    featured: true,
    title: 'Alternativas a Hunter.io y Apollo.io para España y Latinoamérica (2026)',
    description: 'Comparativa con fuentes oficiales de Hunter, Apollo, Snov.io, Kaspr y OpenSells: qué hace cada una, para qué caso encaja y qué límites tiene. Comprobada en septiembre de 2026.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '8 min',
    content: `
<p><em><strong>Transparencia:</strong> este artículo lo publica OpenSells, que es una de las herramientas comparadas. Describimos cada alternativa con lo que dice su propia web o documentación oficial (enlazadas al final), comprobadas el ${CHECKED_ES}. Las funciones y los precios cambian: confírmalos siempre en la web de cada herramienta.</em></p>

<h2>Respuesta corta</h2>
<p>Depende de a quién le vendas y por qué canal. <strong>Hunter</strong> encaja cuando ya sabes a qué empresa escribir y buscas el email correcto. <strong>Apollo</strong>, cuando quieres una gran base de datos de contactos con secuencias y llamadas en la misma plataforma. <strong>Snov.io</strong>, si quieres buscar, verificar y enviar desde un mismo sitio. <strong>Kaspr</strong>, si trabajas desde LinkedIn y necesitas teléfonos. <strong>OpenSells</strong>, si vendes a negocios locales y quieres encontrarlos por sector y ciudad y llamarles con la conversación preparada.</p>

<h2>Criterios de la comparación</h2>
<ul>
  <li><strong>De dónde salen los datos:</strong> base de datos de personas y empresas, perfiles de LinkedIn o fichas públicas de negocios.</li>
  <li><strong>Canal principal:</strong> email, LinkedIn o teléfono.</li>
  <li><strong>Qué ayuda a escribir o preparar:</strong> redacción con IA, secuencias, preparación de llamadas.</li>
  <li><strong>Para qué caso encaja</strong> y cuál es su límite más claro.</li>
</ul>
<p>No comparamos «cobertura en España» con porcentajes porque no tenemos una medición independiente de ninguna herramienta, tampoco de la nuestra.</p>

<h2>Tabla comparativa</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:8px 0 16px">
  <thead>
    <tr style="background:#f4f4f4">
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Herramienta</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Qué es (según su web)</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Redacción con IA</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Encaja si…</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border:1px solid #ddd;padding:8px">Hunter</td><td style="border:1px solid #ddd;padding:8px">Búsqueda de emails por dominio y por persona, verificador, descubrimiento de empresas, CRM ligero y secuencias</td><td style="border:1px solid #ddd;padding:8px">Sí (AI Writing Assistant)</td><td style="border:1px solid #ddd;padding:8px">Ya tienes las empresas y necesitas el email correcto</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Apollo</td><td style="border:1px solid #ddd;padding:8px">Base de datos B2B de contactos y cuentas, secuencias, marcador telefónico</td><td style="border:1px solid #ddd;padding:8px">Sí (asistente de redacción)</td><td style="border:1px solid #ddd;padding:8px">Prospectas perfiles concretos en empresas con presencia digital y quieres todo en una plataforma</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Snov.io</td><td style="border:1px solid #ddd;padding:8px">Buscador y verificador de emails, campañas por goteo y automatización de LinkedIn</td><td style="border:1px solid #ddd;padding:8px">Sí (AI Email Writer)</td><td style="border:1px solid #ddd;padding:8px">Quieres buscar, verificar y enviar desde el mismo sitio</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Kaspr</td><td style="border:1px solid #ddd;padding:8px">Extensión de Chrome que da teléfonos y emails desde perfiles de LinkedIn, con foco en datos europeos</td><td style="border:1px solid #ddd;padding:8px">No es su foco</td><td style="border:1px solid #ddd;padding:8px">Tu flujo empieza en LinkedIn y quieres llamar</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px"><strong>OpenSells</strong></td><td style="border:1px solid #ddd;padding:8px">Negocios por sector y ciudad desde fichas públicas de Google Maps y su web; ficha de llamada con IA; seguimiento</td><td style="border:1px solid #ddd;padding:8px">Sí: ficha de llamada y borradores de email</td><td style="border:1px solid #ddd;padding:8px">Vendes a negocios locales y prefieres llamar</td></tr>
  </tbody>
</table>

<h2>Cada alternativa, con sus límites</h2>

<h3>Hunter</h3>
<p>Su punto fuerte es encontrar el email de una empresa o de una persona a partir de un dominio, y verificarlo. Además ofrece Discover para buscar empresas por filtros (ubicación, sector, tecnología), un CRM ligero, secuencias con seguimientos y un asistente de redacción con IA. Tiene plan gratuito con créditos mensuales. <strong>Límite a tener en cuenta:</strong> está orientado al email; si tu canal es el teléfono, no es su foco.</p>

<h3>Apollo</h3>
<p>Una plataforma amplia: base de datos de contactos y cuentas (más de 240 millones de contactos según su web), secuencias, asistente de redacción con IA y marcador para llamadas. Permite empezar gratis. <strong>Límite:</strong> es más completa y, por eso, más compleja; tiene más sentido cuando buscas a personas con un cargo concreto que cuando vendes a pequeños negocios de barrio.</p>

<h3>Snov.io</h3>
<p>Combina buscador y verificador de emails con campañas por goteo, redacción con IA y automatización de LinkedIn. Se puede probar sin tarjeta. <strong>Límite:</strong> como Hunter, gira en torno al email.</p>

<h3>Kaspr</h3>
<p>Extensión de Chrome para LinkedIn que da teléfonos y emails de los perfiles, con énfasis en datos europeos. Se puede empezar gratis. <strong>Límite:</strong> depende de que tus prospectos estén en LinkedIn; muchos negocios pequeños no tienen ahí a quien decide.</p>

<h3>OpenSells</h3>
<p>Escribes un sector y una ciudad («talleres en Monterrey») y obtienes negocios con sus datos públicos: el teléfono cuando está publicado y el email si aparece en su web. Para cada uno puedes abrir una <a href="/ai-call-brief">ficha de llamada</a> preparada con IA y organizar el seguimiento con estados, notas y tareas. Para los leads con email, la IA redacta un borrador que puedes enviar desde tu Gmail conectado.</p>
<p><strong>Límites:</strong> no verificamos emails; no hay secuencias automáticas; el envío es solo con Gmail; la aplicación está en español; los datos dependen de lo que cada negocio publica, y no sirve para buscar a una persona con un cargo concreto dentro de una gran empresa.</p>
<p><strong>Precio:</strong> ${PRICE_ES}.</p>

<h2>Cómo elegir</h2>
<ul>
  <li><strong>Ya sabes a qué empresas escribir:</strong> Hunter.</li>
  <li><strong>Buscas cargos concretos y quieres base de datos, secuencias y llamadas en una plataforma:</strong> Apollo.</li>
  <li><strong>Buscar, verificar y enviar en el mismo sitio:</strong> Snov.io.</li>
  <li><strong>Tu flujo empieza en LinkedIn y quieres teléfonos:</strong> Kaspr.</li>
  <li><strong>Vendes a negocios locales y quieres llamar preparado:</strong> OpenSells.</li>
</ul>
<p>Si vas a enviar emails comerciales en España, revisa antes el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a>: exige consentimiento previo también cuando el destinatario es una empresa.</p>

<h2>Fuentes (consultadas el ${CHECKED_ES})</h2>
<ul>
  <li>Hunter: <a href="https://help.hunter.io/en/articles/11048031-what-is-hunter">What is Hunter?</a> y <a href="https://help.hunter.io/en/articles/11999872-using-the-ai-writing-assistant-in-hunter-s-email-sequences">AI writing assistant</a></li>
  <li>Apollo: <a href="https://www.apollo.io/">apollo.io</a> y <a href="https://knowledge.apollo.io/hc/en-us/articles/15396174946445-Use-the-Writing-Assistant-to-Compose-Emails">Use the Writing Assistant to Compose Emails</a></li>
  <li>Snov.io: <a href="https://snov.io/">snov.io</a></li>
  <li>Kaspr: <a href="https://www.kaspr.io/">kaspr.io</a></li>
  <li>OpenSells: <a href="/how-it-works">cómo funciona</a> y <a href="/pricing">precios</a></li>
</ul>
${CTA_ES}
    `,
  },
  {
    slug: 'herramientas-prospeccion-comercial-espana',
    locale: 'es',
    featured: true,
    title: 'Herramientas de prospección comercial en España: 7 opciones comparadas (2026)',
    description: 'OpenSells, LinkedIn Sales Navigator, Apollo, Hunter, lemlist, Waalaxy y Kaspr comparadas con fuentes oficiales: qué hace cada una, para qué caso encaja y sus límites.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '9 min',
    content: `
<p><em><strong>Transparencia:</strong> este artículo lo publica OpenSells, que es una de las herramientas comparadas. Cada descripción se basa en la web oficial de la herramienta (enlaces al final), comprobada el ${CHECKED_ES}. Precios y funciones cambian: consulta siempre la web oficial antes de decidir.</em></p>

<h2>Respuesta corta</h2>
<p>No hay una «mejor» herramienta: depende de tu canal y de a quién vendes. Para <strong>directivos en LinkedIn</strong>, Sales Navigator (búsqueda) y Waalaxy (automatización). Para una <strong>base de datos de contactos con secuencias</strong>, Apollo. Para <strong>encontrar el email de una empresa concreta</strong>, Hunter. Para <strong>campañas multicanal</strong>, lemlist. Para <strong>teléfonos desde LinkedIn</strong>, Kaspr. Para <strong>negocios locales por sector y ciudad y llamadas preparadas</strong>, OpenSells.</p>

<h2>Criterios</h2>
<ul>
  <li>De dónde salen los prospectos (LinkedIn, base de datos propia, fichas públicas de negocios).</li>
  <li>Canal principal (LinkedIn, email, teléfono, varios).</li>
  <li>Qué automatiza o prepara.</li>
  <li>Para qué caso encaja y su límite principal.</li>
</ul>

<h2>Tabla comparativa</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:8px 0 16px">
  <thead>
    <tr style="background:#f4f4f4">
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Herramienta</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Origen de los prospectos</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Canal principal</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Encaja si…</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border:1px solid #ddd;padding:8px"><strong>OpenSells</strong></td><td style="border:1px solid #ddd;padding:8px">Fichas públicas de Google Maps y la web de cada negocio</td><td style="border:1px solid #ddd;padding:8px">Teléfono (y email)</td><td style="border:1px solid #ddd;padding:8px">Vendes a negocios locales</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">LinkedIn Sales Navigator</td><td style="border:1px solid #ddd;padding:8px">Perfiles y empresas de LinkedIn</td><td style="border:1px solid #ddd;padding:8px">LinkedIn (InMail)</td><td style="border:1px solid #ddd;padding:8px">Buscas cargos concretos</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Apollo</td><td style="border:1px solid #ddd;padding:8px">Base de datos B2B propia</td><td style="border:1px solid #ddd;padding:8px">Email y llamadas</td><td style="border:1px solid #ddd;padding:8px">Quieres datos, secuencias y marcador en una plataforma</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Hunter</td><td style="border:1px solid #ddd;padding:8px">Dominios y búsqueda de empresas</td><td style="border:1px solid #ddd;padding:8px">Email</td><td style="border:1px solid #ddd;padding:8px">Ya sabes a qué empresa escribir</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">lemlist</td><td style="border:1px solid #ddd;padding:8px">Base de datos propia</td><td style="border:1px solid #ddd;padding:8px">Email, LinkedIn, llamadas, WhatsApp y SMS</td><td style="border:1px solid #ddd;padding:8px">Haces campañas multicanal</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Waalaxy</td><td style="border:1px solid #ddd;padding:8px">LinkedIn</td><td style="border:1px solid #ddd;padding:8px">LinkedIn y email</td><td style="border:1px solid #ddd;padding:8px">Quieres automatizar LinkedIn</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Kaspr</td><td style="border:1px solid #ddd;padding:8px">Perfiles de LinkedIn</td><td style="border:1px solid #ddd;padding:8px">Teléfono y email</td><td style="border:1px solid #ddd;padding:8px">Necesitas teléfonos de perfiles de LinkedIn</td></tr>
  </tbody>
</table>

<h2>Cada herramienta</h2>

<h3>1. OpenSells</h3>
<p>Buscas por sector y ciudad y obtienes negocios con sus datos públicos: teléfono cuando está publicado y email si aparece en su web (sin verificar). Para cada uno, una <a href="/ai-call-brief">ficha de llamada con IA</a> (a qué se dedican, señales de su web y su ficha de Google, cómo abrir, preguntas y objeciones), estados, notas y tareas, y borradores de email que puedes enviar con tu Gmail. En España incluye además presupuestos y facturas con VERI*FACTU.</p>
<p><strong>Límites:</strong> no sirve para buscar cargos dentro de grandes empresas; no verifica emails ni automatiza secuencias; la aplicación está en español. <strong>Precio:</strong> ${PRICE_ES}.</p>

<h3>2. LinkedIn Sales Navigator</h3>
<p>La herramienta de prospección de LinkedIn: más de 50 filtros de búsqueda (función, antigüedad, experiencia…), recomendaciones de leads y cuentas, y créditos de InMail para escribir fuera de tu red. Tiene prueba gratuita. <strong>Límite:</strong> solo llega a quien está activo en LinkedIn.</p>

<h3>3. Apollo</h3>
<p>Base de datos de contactos y cuentas, secuencias, asistente de redacción con IA y marcador telefónico. Se puede empezar gratis. <strong>Límite:</strong> amplia y por tanto más compleja; más orientada a personas con cargo que a pequeños negocios.</p>

<h3>4. Hunter</h3>
<p>Búsqueda de emails por dominio y por persona, verificación, descubrimiento de empresas por filtros, CRM ligero, secuencias y asistente de redacción con IA. Plan gratuito con créditos mensuales. <strong>Límite:</strong> centrada en el email.</p>

<h3>5. lemlist</h3>
<p>Plataforma de campañas en email, LinkedIn, llamadas, WhatsApp y SMS, con base de datos propia y funciones de IA para personalizar. Prueba de 14 días. <strong>Límite:</strong> su valor está en las secuencias; exige configuración y cuidado con la normativa de cada canal.</p>

<h3>6. Waalaxy</h3>
<p>Automatiza la prospección en LinkedIn (invitaciones, mensajes y seguimientos) y añade seguimientos por email. Funciona desde el navegador. <strong>Límite:</strong> depende de LinkedIn y de sus reglas de uso.</p>

<h3>7. Kaspr</h3>
<p>Extensión de Chrome que muestra teléfonos y emails en los perfiles de LinkedIn, con foco en datos europeos. Se puede empezar gratis. <strong>Límite:</strong> tus prospectos tienen que estar en LinkedIn.</p>

<h2>Según tu situación</h2>
<ul>
  <li><strong>Freelance o agencia que vende a negocios locales:</strong> OpenSells.</li>
  <li><strong>Vendes a directivos que están en LinkedIn:</strong> Sales Navigator, y Waalaxy si quieres automatizar.</li>
  <li><strong>Ya tienes la lista y necesitas campañas multicanal:</strong> lemlist.</li>
  <li><strong>Necesitas teléfonos de perfiles de LinkedIn:</strong> Kaspr.</li>
  <li><strong>Quieres una base de datos grande con secuencias y llamadas:</strong> Apollo.</li>
  <li><strong>Necesitas el email de una empresa concreta:</strong> Hunter.</li>
</ul>
<p>Antes de enviar emails comerciales en España, revisa el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a>.</p>

<h2>Fuentes (consultadas el ${CHECKED_ES})</h2>
<ul>
  <li><a href="https://business.linkedin.com/sales-solutions/sales-navigator">LinkedIn Sales Navigator</a></li>
  <li><a href="https://www.apollo.io/">Apollo</a></li>
  <li><a href="https://help.hunter.io/en/articles/11048031-what-is-hunter">Hunter — What is Hunter?</a></li>
  <li><a href="https://www.lemlist.com/">lemlist</a></li>
  <li><a href="https://www.waalaxy.com/">Waalaxy</a></li>
  <li><a href="https://www.kaspr.io/">Kaspr</a></li>
  <li>OpenSells: <a href="/how-it-works">cómo funciona</a> y <a href="/pricing">precios</a></li>
</ul>
${CTA_ES}
    `,
  },
  {
    slug: 'tasa-respuesta-cold-email-espana-datos-reales',
    locale: 'es',
    translation: 'cold-email-reply-rates-spain-real-data',
    title: 'Tasa de respuesta en cold email B2B: cómo medirla bien (guía de medición)',
    description: 'Cómo medir la tasa de respuesta de tus emails comerciales: qué contar, qué muestra y periodo necesitas, cómo comparar y qué límites tiene la medición. Sin benchmarks inventados.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '7 min',
    content: `
<p><em><strong>Nota de revisión (${CHECKED_ES}):</strong> una versión anterior de este artículo se titulaba «datos reales» y publicaba rangos de tasas de respuesta por tipo de email y por sector, con referencias sin enlace y una fila atribuida a «datos OpenSells». No teníamos una muestra documentada que los respaldara, así que los hemos retirado. En su lugar, explicamos cómo medir tus propios datos.</em></p>

<h2>Por qué no damos una «tasa media»</h2>
<p>La tasa de respuesta depende de a quién escribes, de si esperaban tu mensaje, de la oferta, del sector, del país y hasta del día. Un número general mezcla campañas que no se parecen en nada. Lo que sí sirve es comparar tus propios envíos entre sí, con un método estable.</p>
<p>Y un aviso previo para España: el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 de la LSSI</a> prohíbe los emails comerciales no solicitados o no autorizados, también a empresas. Aplica este método a envíos que tengan base legal.</p>

<h2>1. Define las métricas antes de enviar</h2>
<ul>
  <li><strong>Enviados:</strong> mensajes que salieron de tu cuenta.</li>
  <li><strong>Rebotados:</strong> los que el servidor devolvió. Réstalos: <em>entregados = enviados − rebotados</em>.</li>
  <li><strong>Tasa de respuesta:</strong> <em>respuestas humanas ÷ entregados</em>. No cuentes respuestas automáticas («fuera de la oficina»).</li>
  <li><strong>Tasa de respuesta positiva:</strong> respuestas que piden información o aceptan hablar ÷ entregados. Define antes qué cuenta como positiva.</li>
  <li><strong>Reuniones y ventas:</strong> lo que de verdad importa; mídelas por campaña.</li>
  <li><strong>Bajas y quejas:</strong> cuántos piden no recibir más. Una señal de alarma, no un detalle.</li>
</ul>
<p><strong>No uses la tasa de apertura como indicador principal:</strong> muchos clientes de correo cargan las imágenes automáticamente o las bloquean, así que la apertura cuenta de más o de menos.</p>

<h2>2. Decide la muestra y el periodo</h2>
<ul>
  <li><strong>Agrupa envíos comparables:</strong> mismo sector, misma oferta, mismo tipo de contacto.</li>
  <li><strong>No saques conclusiones con pocos envíos.</strong> Con pocas decenas, una o dos respuestas de más cambian mucho el porcentaje. Espera a tener un volumen razonable en cada grupo antes de comparar.</li>
  <li><strong>Fija una ventana de respuesta</strong> (por ejemplo, 14 días desde el último mensaje) y aplícala a todos los grupos.</li>
  <li><strong>Cuenta los seguimientos aparte:</strong> anota a qué mensaje de la secuencia responde cada persona.</li>
</ul>

<h2>3. Cambia una variable cada vez</h2>
<p>Si cambias el asunto, el texto y el sector a la vez, no sabrás qué funcionó. Prueba un cambio (el asunto, la primera línea, la petición final) entre dos grupos parecidos.</p>

<h2>4. Registra en una hoja</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:8px 0 16px">
  <thead>
    <tr style="background:#f4f4f4">
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Columna</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Para qué</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border:1px solid #ddd;padding:8px">Campaña / grupo</td><td style="border:1px solid #ddd;padding:8px">Comparar solo lo comparable</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Sector y ciudad</td><td style="border:1px solid #ddd;padding:8px">Ver qué nicho responde</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Variante probada</td><td style="border:1px solid #ddd;padding:8px">Saber qué cambió</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Fecha de envío</td><td style="border:1px solid #ddd;padding:8px">Aplicar la ventana de respuesta</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Entregado (sí/no)</td><td style="border:1px solid #ddd;padding:8px">Calcular sobre entregados</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Respuesta (ninguna / positiva / negativa / baja)</td><td style="border:1px solid #ddd;padding:8px">Tasas de respuesta y de bajas</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Mensaje al que responde</td><td style="border:1px solid #ddd;padding:8px">Valorar los seguimientos</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Reunión / venta</td><td style="border:1px solid #ddd;padding:8px">El resultado real</td></tr>
  </tbody>
</table>

<h2>5. Conoce los límites</h2>
<ul>
  <li>Las respuestas por otros canales (te llaman, te escriben por WhatsApp) no aparecen solas: apúntalas.</li>
  <li>Un grupo pequeño da porcentajes muy inestables.</li>
  <li>Lo que funciona en un sector o un país no se traslada tal cual a otro.</li>
  <li>Tu reputación de envío influye: Google pide <a href="${GOOGLE_SENDER}">autenticación del dominio y una tasa de spam por debajo del 0,3 %</a> para entregar en Gmail.</li>
</ul>

<h2>Y si llamas por teléfono</h2>
<p>El mismo método sirve: llamadas hechas, contestadas, conversaciones útiles, interesados y reuniones. En OpenSells puedes cambiar el estado de cada lead, añadir notas y crear tareas, y exportar tus leads a CSV en los planes de pago para analizarlos.</p>
${CTA_ES}
    `,
  },

  // ─── ENGLISH ────────────────────────────────────────────────────────────────
  {
    slug: 'cold-email-b2b-guide-2025',
    locale: 'en',
    translation: 'guia-cold-email-espana-2025',
    featured: true,
    title: 'B2B cold email: a practical guide and the legal side (2026)',
    description: 'What B2B cold email is, why the law may restrict it even for business recipients (Spain as an example), how to write an email people read and what to measure.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '7 min',
    content: `
<h2>What B2B cold email is</h2>
<p><strong>B2B cold email</strong> is a commercial email sent to a business or professional you have not been in contact with before. It is used to open a conversation: introduce a service, suggest a call or ask who the right person is.</p>
${LEGAL_EN}

<h2>Alternatives when you sell to local businesses</h2>
<p>Because of those rules, many companies selling to local businesses in Spain use other first-contact channels and keep email for people who have shown interest:</p>
<ul>
  <li><strong>Phone.</strong> Many local businesses publish a phone number even when they have no useful sales email. Sales calls have their own rules too; always respect anyone who asks not to be called again.</li>
  <li><strong>Visits and events.</strong> Trade fairs, local business associations, industry meetups.</li>
  <li><strong>Content and referrals.</strong> Slower, but they bring contacts who already know you.</li>
</ul>
<p>OpenSells is built for the first case: it finds businesses by industry and city, with their phone number when published, and prepares a <a href="/en/ai-call-brief">brief for each call</a>.</p>

<h2>If you send email: how to write one people read</h2>
<ol>
  <li><strong>A specific subject line.</strong> "Partnership proposal" says nothing. Use something that could only be for that company.</li>
  <li><strong>The first paragraph is about them.</strong> Show you looked at their business: a service on their website, their area, something you noticed.</li>
  <li><strong>Short.</strong> What you do, for whom and what you propose, in a few lines that fit on a phone screen.</li>
  <li><strong>One easy ask.</strong> "Would a 15-minute call this week work?" beats "Looking forward to your reply".</li>
  <li><strong>Identify yourself and offer an opt-out.</strong></li>
  <li><strong>Follow up sparingly.</strong> One or two spaced reminders; if they ask you to stop, stop.</li>
</ol>

<h2>Deliverability: what Gmail requires</h2>
<p>Google publishes <a href="${GOOGLE_SENDER}">requirements for senders to Gmail accounts</a>: authenticate your domain (SPF or DKIM, and both plus DMARC above 5,000 messages a day), keep the spam rate below 0.3% and, for bulk marketing, offer one-click unsubscribe.</p>

<h2>What to measure</h2>
<p>Measure replies, not opens: many email clients preload images, so opens are unreliable. Separate positive replies and compare by campaign and industry, not overall. Our <a href="/en/blog/cold-email-reply-rates-spain-real-data">measurement guide</a> explains how. We do not publish "average reply rates": they depend so much on the list, the offer and the industry that any general number misleads.</p>

<h2>Where OpenSells fits</h2>
<p>OpenSells finds businesses by industry and city and collects their public details: the phone number and, when the company publishes one on its website, an email. <strong>We do not verify mailboxes</strong> (no SMTP or MX checks), so addresses may be outdated or generic. For leads with an email, AI drafts a message after reading their site; you review it and can send it through your connected Gmail. Having a legal basis to send it is the sender's responsibility.</p>
${CTA_EN}
    `,
  },
  {
    slug: 'how-to-generate-b2b-leads-freelance',
    locale: 'en',
    translation: 'como-generar-leads-b2b-freelance',
    title: 'How to generate B2B leads as a freelancer (2026)',
    description: 'Channels for freelancers to win B2B clients without relying only on referrals or platforms: phone, LinkedIn, events, content and email, with their pros and cons.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '6 min',
    content: `
<h2>The problem</h2>
<p>Many freelancers get their first clients through referrals or platforms like Upwork or Fiverr. It works, but you don't control when the next project arrives and platforms take a commission. The alternative is <strong>active prospecting</strong>: choosing which companies you want to sell to and contacting them yourself, consistently.</p>

<h2>Why sell to businesses</h2>
<p>Businesses buy services on a recurring basis (website maintenance, marketing, bookkeeping, training) and usually have a budget for them. In exchange they decide more slowly and want trust: the first contact rarely closes the sale, it opens a conversation.</p>

<h2>The channels, pros and cons</h2>

<h3>1. Calling local businesses</h3>
<p>Many businesses publish a phone number even without a useful sales email, and a call tells you quickly whether there is interest. It works much better when you call prepared: what they do, what you saw on their site, how to open and how to handle "not interested". That is what the <a href="/en/ai-call-brief">OpenSells call brief</a> does.</p>

<h3>2. LinkedIn</h3>
<p>Good for reaching managers and professionals. Slow when done well: connect, engage and send a short message about them, without selling in the first message.</p>

<h3>3. Events and networking</h3>
<p>Trade fairs, industry associations and local meetups. Meeting in person builds trust fast but does not scale.</p>

<h3>4. Content and SEO</h3>
<p>Writing about your clients' problems (not your services) attracts contacts who already know you. It takes months, so combine it with an active channel.</p>

<h3>5. Email</h3>
<p>Useful with clients and people who have given permission. In Spain, unsolicited commercial email is restricted even when the recipient is a company (<a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 LSSI</a>); rules differ by country. Check before running campaigns.</p>

<h2>A simple weekly system</h2>
<ol>
  <li><strong>Pick a niche and a city</strong> where your service solves a visible problem.</li>
  <li><strong>Build the list</strong> once a week and drop anyone who is not a fit.</li>
  <li><strong>Block fixed time to reach out</strong>, even when you are busy: pipeline takes weeks to mature.</li>
  <li><strong>Log every outcome</strong> and create the next-step task.</li>
  <li><strong>Review weekly</strong> which niche and message work, using your own numbers.</li>
</ol>

<h2>How to tell whether a business is a fit</h2>
<ul>
  <li>Can you see the problem you solve from the outside (website, Google listing, social media)?</li>
  <li>Does it look active and big enough to pay for your service?</li>
  <li>Do you know who to ask for?</li>
  <li>Can you show similar work in that industry?</li>
</ul>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Only prospecting when work dries up.</strong></li>
  <li><strong>Competing only on price.</strong></li>
  <li><strong>Not following up.</strong> Many "not now" answers mean "not right now", not "never".</li>
</ul>
${CTA_EN}
    `,
  },
  {
    slug: 'improve-cold-email-reply-rate',
    locale: 'en',
    translation: 'tasa-respuesta-cold-email',
    title: 'How to improve your sales email reply rate: 7 factors',
    description: 'The seven factors that most affect whether a sales email gets a reply: subject line, opening line, length, personalisation, timing, follow-up and domain reputation.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '6 min',
    content: `
<h2>Before you start</h2>
<p>There is no "average reply rate" worth benchmarking against: it depends on the list, the industry, the offer and whether the recipient expected your message. What helps is measuring your own sends and improving one factor at a time. Also check the law in the recipient's country: in Spain, for example, unsolicited commercial email is restricted even between businesses (<a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 LSSI</a>).</p>

<h2>1. The subject line</h2>
<p>It decides whether the email gets opened. Short, specific subjects that could only be for that company work better than anything that sounds like an ad.</p>
<p><strong>Worse:</strong> "Partnership proposal for your company"<br/><strong>Better:</strong> "An idea about [Company]'s website"</p>

<h2>2. The opening line</h2>
<p>It shows in the preview. It has to prove you looked at their business: a service on their site, their Google listing, their area.</p>

<h2>3. Length</h2>
<p>An email that can be read in full on a phone screen is more likely to get a reply. If you need a lot of text to explain your offer, simplify the offer first.</p>

<h2>4. Personalisation</h2>
<p>Real personalisation (not just a first name) means reading each company's website. AI can draft from that reading; always review it, because it can be wrong or generic when the website says little. OpenSells does this for leads with an email and leaves you an editable draft.</p>

<h2>5. Timing</h2>
<p>Avoid sending when your message is most likely to get buried (first thing Monday, Friday afternoon). Rather than a general rule, test different slots and compare with your own data.</p>

<h2>6. Follow-up</h2>
<p>Many people don't reply to the first message because they are busy. One or two short, spaced reminders that add something new are usually enough. If someone asks you to stop, stop.</p>

<h2>7. Domain reputation</h2>
<p>If your messages land in spam, nothing else matters. Google's <a href="${GOOGLE_SENDER}">sender requirements</a> ask for SPF or DKIM (both plus DMARC above 5,000 messages a day) and a spam rate below 0.3%. Send low volumes to curated lists and always offer an opt-out.</p>

<h2>How to know you improved</h2>
<p>Change one factor at a time and compare similar groups of sends. Our <a href="/en/blog/cold-email-reply-rates-spain-real-data">measurement guide</a> explains what to count, for how long and the limits.</p>
${CTA_EN}
    `,
  },
  {
    slug: 'cold-email-outreach-step-by-step',
    locale: 'en',
    title: 'Cold email outreach, step by step (2026)',
    description: 'A step-by-step guide to B2B email outreach: check the legal basis, define your ideal customer, build the list, write the email, follow up and protect your domain.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '8 min',
    content: `
<h2>Step 0: check the legal basis</h2>
<p>Before anything else, check whether you are allowed to email the people on your list. Rules vary by country and often cover business recipients: in Spain, <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">article 21 of the LSSI</a> requires prior request or express authorisation for promotional emails, and the law defines recipients as natural or legal persons. This is not legal advice.</p>

<h2>Step 1: define your ideal customer</h2>
<ul>
  <li><strong>Industry</strong> and <strong>company size</strong></li>
  <li><strong>Geography:</strong> countries, cities or regions</li>
  <li><strong>Who decides:</strong> owner, managing director, head of marketing…</li>
  <li><strong>The problem you solve</strong> and how you can tell from the outside that they have it</li>
</ul>
<p>"Marketing agencies in Barcelona with 5–20 people" is far easier to write to well than "any company that might need marketing".</p>

<h2>Step 2: build the list</h2>
<ul>
  <li><strong>Relevant companies</strong> that actually fit your profile.</li>
  <li><strong>Addresses you are allowed to use.</strong></li>
  <li><strong>Verified addresses</strong> if you send email: bounces hurt your domain. Note that OpenSells does <em>not</em> verify mailboxes; if you use its public emails, run them through a verifier first.</li>
</ul>
<p>OpenSells finds businesses by industry and city from public Google Maps listings and each company's website, with the phone number when published and the email if it appears on the site.</p>

<h2>Step 3: write the email</h2>
<ol>
  <li><strong>Subject:</strong> specific, short, never generic.</li>
  <li><strong>Opening line:</strong> something specific about their business.</li>
  <li><strong>Value proposition:</strong> one sentence — what problem you solve for companies like theirs.</li>
  <li><strong>Proof:</strong> a similar piece of work you can show.</li>
  <li><strong>One low-commitment ask.</strong></li>
  <li><strong>Who you are and how to opt out.</strong></li>
</ol>

<h2>Step 4: personalise with care</h2>
<p>AI can read a company's website and suggest a draft, which saves most of the research time. Review every draft: AI can get details wrong or fall back to generic text when a website says little.</p>

<h2>Step 5: follow up</h2>
<p>One or two short, spaced follow-ups that add something new. Stop as soon as someone asks.</p>

<h2>Step 6: protect your domain</h2>
<ul>
  <li>Follow Google's <a href="${GOOGLE_SENDER}">sender requirements</a>: SPF/DKIM (and DMARC for bulk senders), spam rate below 0.3%, one-click unsubscribe for bulk marketing.</li>
  <li>Start with low volumes and increase gradually.</li>
  <li>Remove bounces and opt-outs immediately.</li>
</ul>

<h2>Step 7: measure</h2>
<p>Replies, positive replies, meetings and deals per campaign. Opens are unreliable. See our <a href="/en/blog/cold-email-reply-rates-spain-real-data">measurement guide</a>.</p>

<h2>Consider the phone</h2>
<p>If you sell to local businesses, a prepared phone call is often a more direct first contact than email. That is what OpenSells' <a href="/en/ai-call-brief">AI call brief</a> is for.</p>
${CTA_EN}
    `,
  },
  {
    slug: 'best-cold-email-software-2025',
    locale: 'en',
    title: 'Cold email software compared (2026): what each tool is for',
    description: 'Instantly, Smartlead, lemlist, Apollo and OpenSells compared from their official websites: what each tool does, which use case it fits and its main limit. Checked September 2026.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '7 min',
    content: `
<p><em><strong>Disclosure:</strong> this article is published by OpenSells, one of the tools compared. Each description is based on the tool's official website (links at the end), checked on ${CHECKED_EN}. Features and prices change: confirm them on each official site.</em></p>

<h2>Short answer</h2>
<p>It depends on whether you need to <strong>find leads</strong>, <strong>send at volume</strong> or <strong>run multichannel sequences</strong>. For high-volume sending across many mailboxes: Instantly or Smartlead (Smartlead adds white-label for agencies). For multichannel campaigns: lemlist. For a contact database with sequences and a dialer: Apollo. OpenSells is not primarily cold email software: it finds local businesses and prepares phone calls, with AI email drafts as a secondary channel.</p>

<h2>Criteria</h2>
<ul>
  <li>Does it include lead data, or do you bring your own list?</li>
  <li>Sending infrastructure (mailboxes, warm-up).</li>
  <li>Channels beyond email.</li>
  <li>AI assistance.</li>
</ul>

<h2>Comparison</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:8px 0 16px">
  <thead>
    <tr style="background:#f4f4f4">
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Tool</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">What it is (per its website)</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Fits if…</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border:1px solid #ddd;padding:8px">Instantly</td><td style="border:1px solid #ddd;padding:8px">Sending at scale across many mailboxes, warm-up, B2B lead database, AI copilot and CRM</td><td style="border:1px solid #ddd;padding:8px">You send high volumes</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Smartlead</td><td style="border:1px solid #ddd;padding:8px">Unlimited mailboxes, warm-up engine, white-label for agencies, AI agents</td><td style="border:1px solid #ddd;padding:8px">You are an agency running outreach for clients</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">lemlist</td><td style="border:1px solid #ddd;padding:8px">Campaigns across email, LinkedIn, calls, WhatsApp and SMS, with a lead database</td><td style="border:1px solid #ddd;padding:8px">You run multichannel sequences</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Apollo</td><td style="border:1px solid #ddd;padding:8px">B2B contact and account database, sequences, writing assistant, dialer</td><td style="border:1px solid #ddd;padding:8px">You want data, sequences and calls in one platform</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px"><strong>OpenSells</strong></td><td style="border:1px solid #ddd;padding:8px">Local businesses by industry and city, AI call brief, follow-up, AI email drafts sent via connected Gmail</td><td style="border:1px solid #ddd;padding:8px">You sell to local businesses and prefer to call</td></tr>
  </tbody>
</table>

<h2>Each tool</h2>
<h3>Instantly</h3>
<p>Built around sending infrastructure: many mailboxes across concurrent campaigns, warm-up, plus a B2B lead database, an AI copilot for copy and campaigns, and a CRM. <strong>Limit:</strong> volume tools need careful compliance with the rules of each recipient country.</p>

<h3>Smartlead</h3>
<p>Unlimited mailboxes, a warm-up engine and a full white-label experience for agencies, with AI agents for research and writing. <strong>Limit:</strong> same compliance caveat as any volume tool.</p>

<h3>lemlist</h3>
<p>Multichannel campaigns (email, LinkedIn, calls, WhatsApp, SMS) with a lead database and AI personalisation. 14-day free trial. <strong>Limit:</strong> sequences take setup work.</p>

<h3>Apollo</h3>
<p>A large contact database with sequences, an AI writing assistant and a dialer. Free to start. <strong>Limit:</strong> broad and therefore more complex; aimed at people with job titles more than small local businesses.</p>

<h3>OpenSells</h3>
<p>Finds local businesses by industry and city from public listings and their websites, prepares a call brief with AI and keeps follow-up organised. AI email drafts can be sent through a connected Gmail account (single sends or in batches). <strong>Limits:</strong> no mailbox verification, no automated sequences or warm-up, Gmail only, app in Spanish. <strong>Pricing:</strong> ${PRICE_EN}.</p>

<h2>Sources (checked on ${CHECKED_EN})</h2>
<ul>
  <li><a href="https://instantly.ai/">Instantly</a></li>
  <li><a href="https://www.smartlead.ai/">Smartlead</a></li>
  <li><a href="https://www.lemlist.com/">lemlist</a></li>
  <li><a href="https://www.apollo.io/">Apollo</a> and <a href="https://knowledge.apollo.io/hc/en-us/articles/15396174946445-Use-the-Writing-Assistant-to-Compose-Emails">its writing assistant</a></li>
  <li>OpenSells: <a href="/en/how-it-works">how it works</a> and <a href="/en/pricing">pricing</a></li>
</ul>
${CTA_EN}
    `,
  },
  {
    slug: 'hunter-io-alternatives',
    locale: 'en',
    featured: true,
    title: 'Hunter.io alternatives (2026): a sourced comparison',
    description: 'Snov.io, Apollo, Kaspr and OpenSells as Hunter.io alternatives, described from their official documentation: what each does, which case it fits and its limits.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '7 min',
    content: `
<p><em><strong>Disclosure:</strong> this article is published by OpenSells, one of the tools compared. Descriptions are based on each tool's official website or help centre (links at the end), checked on ${CHECKED_EN}. Features and prices change.</em></p>

<h2>What Hunter does</h2>
<p>According to its help centre, Hunter offers domain search and email finder, an email verifier, Discover (find companies by location, industry or technology), a lightweight CRM, email sequences with follow-ups and an AI writing assistant, with a free plan of monthly credits. So the common claim that "Hunter doesn't help you write emails" is out of date.</p>

<h2>Why look for an alternative</h2>
<ul>
  <li>Your channel is <strong>LinkedIn</strong> or the <strong>phone</strong>, not email.</li>
  <li>You want a <strong>larger contact database</strong> with calling built in.</li>
  <li>You sell to <strong>local businesses</strong> and want to find them by industry and city.</li>
</ul>

<h2>Comparison</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:8px 0 16px">
  <thead>
    <tr style="background:#f4f4f4">
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Tool</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">What it is (per its website)</th>
      <th style="border:1px solid #ddd;padding:8px;text-align:left">Fits if…</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border:1px solid #ddd;padding:8px">Snov.io</td><td style="border:1px solid #ddd;padding:8px">Email finder and verifier, drip campaigns, AI email writer, LinkedIn automation</td><td style="border:1px solid #ddd;padding:8px">You want finding, verifying and sending in one tool</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px">Apollo</td><td style="border:1px solid #ddd;padding:8px">Contact and account database, sequences, writing assistant, dialer</td><td style="border:1px solid #ddd;padding:8px">You target job titles and want calling built in</td></tr>
    <tr><td style="border:1px solid #ddd;padding:8px">Kaspr</td><td style="border:1px solid #ddd;padding:8px">Chrome extension for phone numbers and emails from LinkedIn profiles, European data focus</td><td style="border:1px solid #ddd;padding:8px">Your workflow starts on LinkedIn</td></tr>
    <tr style="background:#fafafa"><td style="border:1px solid #ddd;padding:8px"><strong>OpenSells</strong></td><td style="border:1px solid #ddd;padding:8px">Local businesses by industry and city from public listings; AI call brief; follow-up</td><td style="border:1px solid #ddd;padding:8px">You sell to local businesses in Spain or Latin America and prefer calling</td></tr>
  </tbody>
</table>

<h2>Each alternative</h2>
<h3>Snov.io</h3>
<p>Email finder and verifier, drip campaigns, an AI email writer and LinkedIn automation; free to try without a card. <strong>Limit:</strong> email-centred, like Hunter.</p>
<h3>Apollo</h3>
<p>A large B2B database (240M+ contacts per its website), sequences, a writing assistant and a dialer; free to start. <strong>Limit:</strong> broader and more complex.</p>
<h3>Kaspr</h3>
<p>Phone numbers and emails on LinkedIn profiles through a Chrome extension, with a focus on European data; free to start. <strong>Limit:</strong> only reaches people on LinkedIn.</p>
<h3>OpenSells</h3>
<p>Type an industry and a city and get businesses with their public details (phone when published, email if on their website, not verified), an AI call brief for each and statuses, notes and tasks. <strong>Limits:</strong> not for finding specific job titles; no verification or sequences; Gmail only; the app is in Spanish. <strong>Pricing:</strong> ${PRICE_EN}.</p>

<h2>When Hunter is still the right choice</h2>
<p>When you already know which companies you want to contact and need the right email address, verified, with light sequencing. That is its core.</p>

<h2>Sources (checked on ${CHECKED_EN})</h2>
<ul>
  <li><a href="https://help.hunter.io/en/articles/11048031-what-is-hunter">Hunter — What is Hunter?</a> and <a href="https://help.hunter.io/en/articles/11999872-using-the-ai-writing-assistant-in-hunter-s-email-sequences">AI writing assistant</a></li>
  <li><a href="https://snov.io/">Snov.io</a></li>
  <li><a href="https://www.apollo.io/">Apollo</a></li>
  <li><a href="https://www.kaspr.io/">Kaspr</a></li>
  <li>OpenSells: <a href="/en/how-it-works">how it works</a> and <a href="/en/pricing">pricing</a></li>
</ul>
${CTA_EN}
    `,
  },
  {
    slug: 'b2b-lead-generation-guide',
    locale: 'en',
    featured: true,
    title: 'B2B lead generation: a practical guide (2026)',
    description: 'What B2B lead generation is, inbound vs outbound, the main channels with their trade-offs and how to build a simple, measurable system without a big budget.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '8 min',
    content: `
<h2>What B2B lead generation is</h2>
<p><strong>B2B lead generation</strong> is finding and attracting businesses that could buy your product or service. B2B buying is slower than consumer buying, often involves several people and depends on trust, so the goal is to start relevant conversations, not collect clicks.</p>

<h2>Inbound vs outbound</h2>
<p><strong>Inbound:</strong> you publish content or tools that bring potential customers to you. Leads tend to be better informed, but it takes months to build.</p>
<p><strong>Outbound:</strong> you reach out first — phone, LinkedIn, email where permitted, events. You control the pace, but it takes consistent effort. Most small businesses combine both.</p>

<h2>The main channels</h2>
<h3>1. Phone calls to local businesses</h3>
<p>Many local businesses publish a phone number. A prepared call gets you an answer quickly. Sales calls are regulated differently in each country; always respect do-not-call requests.</p>
<h3>2. LinkedIn</h3>
<p>Best for reaching managers and decision-makers at larger companies: connect, engage, then propose a conversation.</p>
<h3>3. Email</h3>
<p>Essential for follow-up. For first contact, check the law: in Spain, <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 LSSI</a> requires prior consent even for business recipients.</p>
<h3>4. Content and SEO</h3>
<p>Articles that answer the questions your customers search for. Slow to start, durable once working.</p>
<h3>5. Paid advertising</h3>
<p>Fast but costly; makes sense once you know what a customer is worth to you.</p>
<h3>6. Referrals and partnerships</h3>
<p>Referred leads arrive with trust. Ask explicitly, and partner with complementary businesses.</p>

<h2>A simple system</h2>
<ol>
  <li><strong>Define your ideal customer</strong> and the problem you solve.</li>
  <li><strong>Pick one primary channel</strong> and do it well before adding more.</li>
  <li><strong>Build a focused list</strong> of companies that fit.</li>
  <li><strong>Prepare each contact</strong>: why them, what to say.</li>
  <li><strong>Log outcomes and next steps.</strong></li>
  <li><strong>Measure</strong> conversations, meetings and deals per niche.</li>
</ol>

<h2>Tools by job</h2>
<ul>
  <li><strong>Finding local businesses and preparing calls:</strong> OpenSells.</li>
  <li><strong>Contact databases:</strong> Apollo, Hunter.</li>
  <li><strong>Email sequences:</strong> Instantly, lemlist.</li>
  <li><strong>CRM:</strong> HubSpot, Pipedrive — or a spreadsheet at the start.</li>
  <li><strong>Search performance:</strong> Google Search Console, Bing Webmaster Tools.</li>
</ul>
<p>See our sourced comparisons of <a href="/en/blog/hunter-io-alternatives">Hunter alternatives</a> and <a href="/en/blog/best-cold-email-software-2025">cold email software</a>.</p>
${CTA_EN}
    `,
  },
  {
    slug: 'cold-email-reply-rates-spain-real-data',
    locale: 'en',
    translation: 'tasa-respuesta-cold-email-espana-datos-reales',
    title: 'Cold email reply rates: how to measure them properly (measurement guide)',
    description: 'How to measure the reply rate of your sales emails: what to count, what sample and time window you need, how to compare and the limits of the measurement. No invented benchmarks.',
    date: '2026-06-02',
    updated: UPDATED,
    readTime: '7 min',
    content: `
<p><em><strong>Revision note (${CHECKED_EN}):</strong> an earlier version of this article was titled "real data" and published reply-rate ranges by email type and industry, with unlinked references and a row attributed to "OpenSells data". We did not have a documented sample to support them, so we removed them. Instead, this guide explains how to measure your own data.</em></p>

<h2>Why we don't publish an "average rate"</h2>
<p>Reply rates depend on who you write to, whether they expected your message, the offer, the industry, the country and even the day. A general number mixes campaigns that have nothing in common. What helps is comparing your own sends, with a stable method.</p>
<p>A legal note: in Spain, <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21">art. 21 LSSI</a> prohibits unsolicited or unauthorised commercial emails, including to businesses. Apply this method to sends that have a legal basis.</p>

<h2>1. Define the metrics before sending</h2>
<ul>
  <li><strong>Sent</strong> and <strong>bounced</strong>: <em>delivered = sent − bounced</em>.</li>
  <li><strong>Reply rate:</strong> <em>human replies ÷ delivered</em>. Exclude auto-replies.</li>
  <li><strong>Positive reply rate:</strong> replies asking for information or agreeing to talk ÷ delivered. Define "positive" in advance.</li>
  <li><strong>Meetings and deals:</strong> what actually matters, per campaign.</li>
  <li><strong>Opt-outs and complaints:</strong> a warning sign, not a detail.</li>
</ul>
<p><strong>Don't use open rate as your main indicator:</strong> many email clients preload or block images, so opens over- or under-count.</p>

<h2>2. Decide the sample and time window</h2>
<ul>
  <li><strong>Group comparable sends:</strong> same industry, same offer, same type of contact.</li>
  <li><strong>Don't draw conclusions from a few dozen sends:</strong> one or two extra replies swing the percentage a lot.</li>
  <li><strong>Fix a reply window</strong> (for example 14 days after the last message) and apply it to every group.</li>
  <li><strong>Track follow-ups separately:</strong> note which message in the sequence each reply answers.</li>
</ul>

<h2>3. Change one variable at a time</h2>
<p>If you change the subject, the copy and the industry together, you won't know what worked.</p>

<h2>4. Log it in a spreadsheet</h2>
<p>Suggested columns: campaign/group, industry and city, variant tested, send date, delivered (yes/no), reply (none/positive/negative/opt-out), message replied to, meeting/deal.</p>

<h2>5. Know the limits</h2>
<ul>
  <li>Replies through other channels (they call you, message you) don't appear on their own: log them.</li>
  <li>Small groups give unstable percentages.</li>
  <li>What works in one industry or country doesn't transfer as-is.</li>
  <li>Sender reputation matters: Google requires <a href="${GOOGLE_SENDER}">domain authentication and a spam rate below 0.3%</a> to deliver to Gmail.</li>
</ul>

<h2>If you call instead</h2>
<p>The same method works: calls made, answered, useful conversations, interested, meetings. In OpenSells you can change each lead's status, add notes and tasks, and export your leads to CSV on paid plans to analyse them.</p>
${CTA_EN}
    `,
  },
];

export function getPostsByLocale(locale: string): Post[] {
  return posts.filter((p) => p.locale === locale);
}

export function getPostBySlug(slug: string, locale: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.locale === locale);
}

export function getFeaturedPosts(locale: string): Post[] {
  return posts.filter((p) => p.locale === locale && p.featured).slice(0, 3);
}
