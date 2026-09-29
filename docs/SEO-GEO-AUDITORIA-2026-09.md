# Auditoría SEO y de visibilidad en buscadores con IA — septiembre de 2026

Rama `seo-geo-auditoria`. Nada de esto está en producción: el merge a `master` despliega en Vercel.
Todas las comprobaciones son del 29 de septiembre de 2026.

Leyenda: **C** = confirmado y reproducido · **H** = hipótesis · **NV** = no verificable desde el repo.

## 1. Diagnóstico

| # | Problema y evidencia | URL / archivo | Impacto esperado | Prio | Estado |
|---|---|---|---|---|---|
| 1 | `/about` y `/contact` daban 404 y estaban enlazadas en el pie de todas las páginas. | `components/Footer.tsx` | Enlaces rotos en todo el sitio; sin página de identidad ni de contacto para usuarios y asistentes. | Alta | C → creadas |
| 2 | `opensells.com` redirige a `www` (307, temporal), pero canonical, hreflang, sitemap, robots y JSON-LD usaban el dominio sin www: cada URL "canónica" respondía con una redirección. | `app/[locale]/layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts`, blog | Señales de canonicidad contradictorias. | Alta | C → todo a `www` desde `lib/site.ts` |
| 3 | El menú y el pie usaban `#features` / `#pricing` / `#blog`: desde un artículo apuntaban a la URL del artículo. | `Navbar.tsx`, `Footer.tsx` | Navegación rota fuera de la portada. | Alta | C → enlaces a páginas |
| 4 | `/en` enseñaba un bloque en español («¿Y si hubiera una forma más rápida? … 5 minutos lo que tú tardas 15 horas»), escrito a mano en el componente. La cifra no tenía medición detrás. | `components/Problem.tsx` | Traducción incompleta y afirmación sin soporte. | Media | C → traducido y sin cifra |
| 5 | La comparativa Hunter/Apollo decía que no redactan con IA; su documentación oficial lo contradice. Prometía «2 búsquedas» (plan que ya no existe), «envío masivo», GPT-4o, y «según los propios usuarios, de 2-3 h a 15-20 min». | `lib/blog.ts` | Afirmaciones falsas sobre terceros y sobre el propio producto. | Alta | C → reescrita con fuentes |
| 6 | El artículo «datos reales» publicaba tasas por sector y una fila atribuida a «Datos OpenSells» sin metodología ni enlaces. No hay registros que lo respalden. | `lib/blog.ts` | Cifras que un asistente podría citar como hechos. | Alta | C → retiradas; guía de medición |
| 7 | Las respuestas del FAQ solo existían en el JSON-LD: el acordeón era de cliente y solo pintaba la abierta. | `components/FAQ.tsx` | FAQPage sin respaldo visible en el HTML. | Media | C → `<details>` nativo |
| 8 | robots.txt abierto, sitemap y datos estructurados ya existían. | `app/robots.ts`, `app/sitemap.ts` | — | — | C → corregidos, no duplicados |
| 9 | **Nuevo.** Con `localeDetection: true`, un navegador o bot con `Accept-Language: en` que pedía un artículo en español era redirigido (307) a `/en/blog/<slug>`, que da **404** en los 7 artículos solo en español. La portada en español también era inalcanzable para él. | `i18n/routing.ts` | Artículos inaccesibles para rastreadores y asistentes que piden en inglés. | **Crítica** | C → desactivado |
| 10 | **Nuevo.** El botón de registro de todos los artículos iba a `app.opensells.com/register`, que da **404**. | `app/[locale]/blog/[slug]/page.tsx` | Conversión perdida en todo el blog. | **Crítica** | C → `/login?tab=register` |
| 11 | **Nuevo.** Artículos con precios y planes antiguos (14,50 €, 29 €, «plan gratis», «2 búsquedas»), funciones inexistentes (verificación de emails, Outlook, seguimientos automáticos) y cifras sin fuente (8-15 %, «70 % de las respuestas», McKinsey «40x»). | `lib/blog.ts` | Información falsa sobre el producto. | Alta | C → reescritos |
| 12 | **Nuevo.** Tres artículos afirmaban que el cold email B2B es «completamente legal en España». El art. 21 LSSI exige consentimiento previo y la ley define destinatario como persona física **o jurídica**. | `lib/blog.ts` | Riesgo legal para quien siga el consejo. | Alta | C → corregido con BOE |
| 13 | **Nuevo.** La FAQ decía que VERI*FACTU es «el sistema con el que Hacienda exige emitir facturas». Según la AEAT es una de dos modalidades del RRSIF; hay exclusiones (SII, forales). | `messages/*.json` | Afirmación fiscal inexacta. | Media | C → corregido con AEAT |
| 14 | **Nuevo.** El hero enseñaba «Pregunta por Marta Ribó»; la app lo retiró el 2026-09-06 y enseña la razón social. | `components/Hero.tsx` | Maqueta que promete algo que no existe. | Media | C → razón social |
| 15 | **Nuevo.** Títulos duplicados: «… \| OpenSells Blog \| OpenSells» en artículos y páginas legales. | varios | Títulos feos en resultados. | Baja | C → corregido |
| 16 | **Nuevo.** `/cookies` y las 404 heredaban el canonical de la portada (merge superficial de metadata). | `app/[locale]/layout.tsx` | Canonical incorrecto. | Media | C → alternates por página |
| 17 | SearchAction hacia `/blog?q=`: el blog no tiene buscador. `sameAs: app.opensells.com` no es una identidad equivalente. | `layout.tsx` | Marcado falso. | Baja | C → retirados |
| 18 | Precio «$» ambiguo; USD solo en la versión española; el SoftwareApplication solo declaraba 39 EUR. | `Pricing.tsx`, `page.tsx` | Moneda y elegibilidad poco claras. | Media | C → «USD», regla de moneda explicada, 4 ofertas |
| 19 | `lastmod` del sitemap = `new Date()` en cada build. | `app/sitemap.ts` | Los buscadores dejan de creerse el lastmod. | Baja | C → fechas reales |
| 20 | El dominio sin www redirige con **307** (temporal) y `/es/*` con 307. | Vercel / next-intl | Mejor 308/301 permanente. | Baja | C → acción en Vercel (§5) |
| 21 | La política de privacidad dice «no usamos cookies publicitarias ni de seguimiento de terceros», pero el sitio carga el píxel de OpenAI Ads en todas las páginas y la política de cookies lo declara. No hay banner de consentimiento. | `privacy/page.tsx`, `layout.tsx` | Contradicción legal; el píxel publicitario suele requerir consentimiento previo (art. 22.2 LSSI). | Alta | C → **pendiente del propietario** (no tocado) |
| 22 | Los Términos dicen reembolso en 7 días «si el Servicio no cumple lo descrito»; la landing decía «sin dar explicaciones». | `terms/page.tsx`, `messages` | Promesa contradictoria. | Media | C → landing alineada con los Términos |
| 23 | Falta el aviso legal con titular y NIF (art. 10 LSSI). | — | Requisito legal y señal de confianza. | Media | NV → decisión del propietario |
| 24 | La emisión real a la AEAT está desactivada por defecto en el backend (`VERIFACTU_MODO`); no puedo ver si en Render está en `produccion`. La landing promete «remisión a la AEAT con tu certificado». | app `backend/fiscal/gateway.py` | Si no está activa, la promesa es falsa. | Alta | NV → **confirmar** |
| 25 | La app solo está en español; `/en` no lo decía. | app `next_app` (sin i18n) | Expectativa falsa para visitantes en inglés. | Media | C → avisado en /en |
| H1 | Los asistentes citan mejor páginas con definiciones claras, límites explícitos y fuentes. | — | Más probabilidad de mención; sin garantía. | — | H |

## 2. Qué se cambió

**Base técnica**
- `lib/site.ts`: host canónico `https://www.opensells.com`, URL de registro, helper `pageAlternates` (canonical + hreflang recíproco + `x-default` al español solo cuando la página existe en los dos idiomas) y `PAGE_UPDATED` para el `lastmod`.
- `i18n/routing.ts`: `localeDetection: false`.
- Layout: `metadataBase`, sin `alternates` heredables, JSON-LD `Organization` + `WebSite` con `@id` fijo, sin SearchAction ni sameAs.
- Sitemap: 32 URL, todas canónicas, indexables y 200; hreflang solo entre traducciones reales (4 pares de artículos + páginas estáticas).
- Menú y pie con enlaces a páginas; selector de idioma que lleva a la traducción real o al blog del otro idioma.
- FAQ con `<details>/<summary>` nativo: respuestas en el HTML inicial, accesible por teclado sin JS.

**Contenido**
- Portada: H1 con «Software de prospección B2B con IA» delante del titular; title y description descriptivos y sin VERI*FACTU (la facturación queda como bloque aparte «Solo en España»); ejemplo del hero marcado como ficticio; FAQ ampliada (qué es, de dónde salen los datos, países/idioma) y corregida (VERI*FACTU, legal, reembolso).
- Precios desde una sola fuente: `lib/pricing.ts` (comprobado contra `billing_catalog.py`, `credit_packs.py`, `plan_config.py`, `paises.py`). «USD» en vez de «$», regla de moneda explicada (IP de registro, IVA incluido en EUR).
- Blog: los 16 artículos revisados. Mismos slugs y fechas de publicación; fecha de actualización visible y en `dateModified`. Comparativas con aviso de que las publica OpenSells, criterios, fuentes oficiales enlazadas, fecha de comprobación, límites de cada herramienta (también de OpenSells) y sin precios de terceros. El artículo de «datos reales» es ahora una guía de medición con nota de revisión.

**Páginas nuevas** (es + en): `/how-it-works`, `/ai-call-brief`, `/for-agencies`, `/pricing`, `/about`, `/contact`.

## 3. Mapa de intenciones y URL (para no duplicar)

| Intención de búsqueda | URL | Nota |
|---|---|---|
| Qué es OpenSells / software de prospección B2B | `/` | Resumen + FAQ |
| Cómo funciona, fuentes de datos, límites | `/how-it-works` | Nueva |
| Preparar llamadas comerciales con IA / guion de llamada | `/ai-call-brief` | Nueva |
| Prospección para agencias que venden a negocios locales | `/for-agencies` | Nueva |
| Precios, prueba, moneda, cancelación | `/pricing` | Nueva; la portada resume y enlaza |
| Quién está detrás / confianza | `/about` | Nueva; faltan datos del titular |
| Contacto / derechos RGPD | `/contact` | Nueva |
| Alternativas a Hunter y Apollo (es) | `/blog/alternativas-hunter-io-apollo` | Reescrita |
| Herramientas de prospección en España (es) | `/blog/herramientas-prospeccion-comercial-espana` | Reescrita |
| Hunter alternatives (en) | `/en/blog/hunter-io-alternatives` | Reescrita; no es traducción de la española |
| Cold email software (en) | `/en/blog/best-cold-email-software-2025` | Reescrita |
| Cómo conseguir clientes B2B | `/blog/como-conseguir-clientes-b2b` | Solo es |
| Cold email: guía, qué es, factores, medición | 4 pares es/en + 2 sueltos | Posible consolidación futura: `que-es-el-cold-email` y `guia-cold-email-espana-2025` se solapan |

No se han creado páginas por ciudad o sector: no aportarían información distinta.

## 4. Pendiente del propietario

1. **¿Está VERI*FACTU en `produccion` en Render?** Si no, cambiar «remisión a la AEAT» por «preparado para…» en `messages/*.json` y `lib/pages.ts`.
2. **Píxel de OpenAI Ads sin consentimiento** y política de privacidad que dice lo contrario (#21). Decidir: banner de consentimiento o cargar el píxel solo tras aceptar.
3. **Aviso legal / identidad del titular** (#23) y si quieres que `/about` diga quién está detrás. No se ha publicado ningún nombre ni NIF.
4. **Reembolso**: ¿«sin explicaciones» (y se cambian los Términos) o «si no cumple lo descrito» (como ahora)?
5. **Política de entrenamiento de IA**: robots.txt sigue permitiendo todo, también a GPTBot, ClaudeBot, Google-Extended y CCBot. Si quieres bloquear solo el entrenamiento, hay un comentario en `app/robots.ts` con cómo.
6. **Perfiles oficiales** (LinkedIn, etc.) para `sameAs`, si existen.
7. **Multiusuario en el plan Agencia**: no lo he afirmado porque no lo he podido comprobar.
8. Nombre ficticio del hero («Clínica Dental Sant Martí»): va marcado como ejemplo, pero un nombre claramente inventado evitaría coincidir con una clínica real.
9. Errores de lint preexistentes (comillas sin escapar) en `privacy`, `terms` y `cookies`: no bloquean el build y no los he tocado para no mover textos legales.

## 5. Acciones fuera del código

**Vercel**
- Dominio `opensells.com` → `www.opensells.com` con **308** (permanente) en Settings → Domains; hoy es 307.
- Comprobar que no hay protección de bots (Attack Challenge Mode / Firewall) que bloquee a `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Bingbot`, `Googlebot`. Hoy responden 200 simulando esos user-agents (29/09); los bots reales llegan desde sus propias IP, así que conviene confirmarlo en los logs de Vercel. Si algún día se activa, crear excepciones por user-agent verificado, no desactivar la protección.

**Google Search Console** (propiedad de dominio `opensells.com`)
- Enviar `https://www.opensells.com/sitemap.xml` y retirar el antiguo si figura el de sin-www.
- Inspeccionar y pedir indexación de: `/`, `/en`, las 6 páginas nuevas y los 4 artículos comparativos/de medición.
- Revisar en 2-3 semanas el informe de páginas: las URL sin www deben pasar a «Página con redirección» y las /about y /contact a indexadas.

**Bing Webmaster Tools** (ChatGPT Search usa el índice de Bing)
- Verificar el sitio (se puede importar desde Search Console), enviar el sitemap y activar IndexNow si se quiere.
- Revisar el informe de rendimiento de Copilot / IA si está disponible para la propiedad.

## 6. Medición (sin datos personales)

**Lo que existe hoy:** píxel de OpenAI Ads (carga de página en la web; `registration_completed` en la app tras el registro). No hay analítica web general.

| Qué | Cómo | Dónde | Estado |
|---|---|---|---|
| Visitas desde asistentes | Referrer y `utm_source` (ChatGPT añade `utm_source=chatgpt.com`; Perplexity, Copilot y Gemini llegan con su dominio de referrer) | Requiere analítica web: propuesta **Vercel Web Analytics** (sin cookies, un paquete) | Pendiente de decisión |
| Clics en registro | Evento en los botones con `href` a `REGISTER_URL` | Misma herramienta | Pendiente |
| Registros completados | `registration_completed` (ya existe) | Píxel OpenAI; recuento real en la BD | Existe |
| Primera acción de valor | Primera búsqueda guardada o primera ficha generada, por usuario | BD de la app (consulta, no código nuevo) | Consultable |
| Atribución del registro | Guardar el **dominio** de referrer y `utm_source` del primer aterrizaje (solo esos dos campos) y enviarlos en el registro | Cambio en landing + app + migración | Propuesta, no implementada |

Un clic en «Empieza gratis» no es un registro. Parte del tráfico de asistentes llega sin referrer (apps móviles, copiar y pegar): nunca habrá atribución completa.

### Preguntas de prueba (26)

*Descubrimiento de herramientas*
1. ¿Qué software me ayuda a encontrar negocios locales para venderles mis servicios?
2. Herramienta para sacar un listado de clínicas dentales de una ciudad con su teléfono
3. ¿Cómo consigo una lista de empresas por sector y ciudad en España?
4. Software de prospección B2B para México
5. ¿Qué alternativa a Hunter.io sirve para negocios pequeños en España?
6. Alternativas a Apollo para Latinoamérica
7. Mejores herramientas de prospección comercial en España

*Preparación de llamadas*
8. ¿Cómo preparo una llamada en frío a un negocio local?
9. ¿Hay alguna IA que me prepare qué decir antes de llamar a un cliente?
10. Guion de llamada para vender servicios de marketing a una clínica
11. ¿Qué responder cuando me dicen «no me interesa» por teléfono?

*Agencias y freelancers*
12. ¿Cómo consigue clientes una agencia de marketing pequeña?
13. ¿Cómo encontrar clientes como diseñador web freelance?
14. ¿Cómo detectar negocios con la web lenta para ofrecerles mis servicios?
15. Prospección para consultoras de protección de datos

*Email y legalidad*
16. ¿Es legal enviar emails comerciales a empresas en España?
17. ¿Qué dice la LSSI sobre el cold email B2B?
18. ¿Cuál es una buena tasa de respuesta en cold email?
19. ¿Cómo medir la tasa de respuesta de mis emails comerciales?

*Precio y compra*
20. Software de prospección barato con prueba gratis
21. ¿Qué herramienta de leads B2B cobra en euros con IVA incluido?

*Marca (categoría separada)*
22. ¿Qué es OpenSells?
23. OpenSells opiniones
24. ¿Cuánto cuesta OpenSells?
25. ¿OpenSells funciona en Colombia?
26. OpenSells vs Hunter

### Protocolo

- **Plataformas:** ChatGPT (con búsqueda activada), Claude (con búsqueda web), Perplexity, Google (resultado orgánico y AI Overview/AI Mode si aparece), Copilot.
- **Condiciones:** sesión sin iniciar o perfil limpio; idioma español; país España (y una segunda pasada con VPN o ajuste de región México para 4, 6, 25); anotar si la búsqueda estaba activada.
- **Repeticiones:** 3 por pregunta y plataforma, en días distintos; una sola ejecución no es una posición estable.
- **Registro por ejecución** (hoja): fecha, plataforma, interfaz/modelo, idioma, país, búsqueda sí/no, pregunta, ¿menciona OpenSells? (sí/no), posición en la lista si la hay, ¿cita una URL de opensells.com? (cuál), exactitud (correcta / con errores: cuáles), contexto de la recomendación (recomendado / mencionado / comparado / negativo), competidores mencionados.
- **Primera medición:** antes de desplegar esta rama, para tener línea base. No inventar resultados: si no se ejecuta, la celda se queda vacía.

### Plan 30 / 60 / 90 días (desde el despliegue)

- **Día 0-30:** línea base del protocolo; Search Console y Bing con el sitemap nuevo; comprobar que las URL sin www salen como redirección y que /about, /contact y las páginas nuevas se indexan; decidir la analítica y la atribución; resolver los pendientes 1-4.
- **Día 31-60:** segunda pasada del protocolo; en Search Console, impresiones y clics por página nueva y por consulta (buscar «ficha de llamada», «prospección agencias», «alternativas hunter»); si hay analítica, visitas con referrer de asistentes y clics en registro; corregir cualquier inexactitud que repitan los asistentes en la página que la origina.
- **Día 61-90:** tercera pasada; comparar menciones y exactitud con la línea base; registros completados y primera acción de valor por origen (si se implementó la atribución); decidir si consolidar los artículos de cold email que se solapan y si hace falta alguna página nueva con información propia (no por ciudad).

## 7. Reputación: lo que el código no resuelve

- Reseñas reales en perfiles de terceros (G2, Capterra, Trustpilot, Google Business Profile si aplica): pedirlas a usuarios reales, sin incentivos que las condicionen. No publicar reseñas propias.
- Perfil de empresa en LinkedIn y, cuando exista, añadirlo a `sameAs`.
- Menciones en directorios y comparativas de terceros (listados de herramientas de ventas en español), con información correcta de precios y países.
- Casos de uso reales documentados con permiso del cliente (hoy no hay ninguno publicado; no inventarlos).
- Contenido propio con datos medidos: si algún día hay una muestra documentada de llamadas o emails, publicarla con metodología (ver la guía de medición del blog).
