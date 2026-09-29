/* Precios, cupos y condiciones que enseña la web. UNA sola fuente.
 *
 * ⚠️ Esto es el escaparate: lo que se cobra lo deciden los price de Stripe y
 * los cupos de `backend/core/plan_config.py` del repo OpenSells/OpenSells.
 * Comprobado contra ese código el 2026-09-29:
 *   - `billing_catalog.py`: 39 € / 89 € con el IVA dentro; 29 $ / 69 $ sin IVA
 *     español.
 *   - `credit_packs.py`: bolsas de 100 leads (9 € / 7 $) y 300 (25 € / 19 $).
 *   - `plan_config.py`: 600 / 1.500 leads al mes, 1 ficha y 3 borradores por
 *     lead, 30 / 50 mensajes de IA al día, 100 leads por búsqueda, 50 filas de
 *     CSV al mes mientras no se ha pagado.
 *   - `paises.py` (`moneda_de_pais`): dólares para los países hispanohablantes
 *     distintos de España, según la IP con la que se registra la cuenta, no
 *     según el país que se elige en la app. Todo lo demás, euros.
 * Si cambia cualquiera de esos números en la app, hay que cambiarlo aquí: la
 * web no se entera sola. */

export type PlanKey = 'profesional' | 'agencia';

export type Plan = {
  key: PlanKey;
  eur: number;
  usd: number;
  leadsMonth: number;
  callBriefsMonth: number;
  emailDraftsMonth: number;
  aiMessagesDay: number;
  leadsPerSearch: number;
};

export const PLANS: Plan[] = [
  {
    key: 'profesional',
    eur: 39,
    usd: 29,
    leadsMonth: 600,
    callBriefsMonth: 600,
    emailDraftsMonth: 1800,
    aiMessagesDay: 30,
    leadsPerSearch: 100,
  },
  {
    key: 'agencia',
    eur: 89,
    usd: 69,
    leadsMonth: 1500,
    callBriefsMonth: 1500,
    emailDraftsMonth: 4500,
    aiMessagesDay: 50,
    leadsPerSearch: 100,
  },
];

export const PACKS = [
  { leads: 100, eur: 9, usd: 7 },
  { leads: 300, eur: 25, usd: 19 },
];

export const TRIAL = {
  /** La prueba es el plan Profesional entero durante un mes, sin tarjeta. */
  plan: 'profesional' as PlanKey,
  months: 1,
  /** Filas de CSV al mes mientras la cuenta no ha pagado (`CSV_FILAS_MES_SIN_PAGAR`). */
  csvRowsMonth: 50,
  /** Días desde el primer cobro para pedir el reembolso (Términos, apartado 4). */
  refundDays: 7,
};

/* Países en los que la cuenta ve y paga los precios en dólares: los
 * hispanohablantes de `PAISES_HISPANOS` salvo España. Códigos ISO 3166-1. */
export const USD_COUNTRIES = [
  'MX', 'CO', 'AR', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO',
  'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR',
];

export function planByKey(key: PlanKey): Plan {
  return PLANS.find((p) => p.key === key)!;
}

/** Número con el separador de miles del idioma (1.500 / 1,500). */
export function fmt(n: number, locale: string): string {
  return n.toLocaleString(locale === 'en' ? 'en-US' : 'es-ES');
}

/** Precio con su moneda escrita sin ambigüedad: «39 €», «29 USD». */
export function money(amount: number, currency: 'EUR' | 'USD', locale: string): string {
  if (currency === 'EUR') return locale === 'en' ? `€${amount}` : `${amount} €`;
  return `${amount} USD`;
}

/** Valores para interpolar en los textos de `messages/*.json`. */
export function pricingValues(locale: string): Record<string, string> {
  const pro = planByKey('profesional');
  const ag = planByKey('agencia');
  return {
    proEur: money(pro.eur, 'EUR', locale),
    proUsd: money(pro.usd, 'USD', locale),
    agEur: money(ag.eur, 'EUR', locale),
    agUsd: money(ag.usd, 'USD', locale),
    pack1Leads: fmt(PACKS[0].leads, locale),
    pack1Eur: money(PACKS[0].eur, 'EUR', locale),
    pack1Usd: money(PACKS[0].usd, 'USD', locale),
    pack2Leads: fmt(PACKS[1].leads, locale),
    pack2Eur: money(PACKS[1].eur, 'EUR', locale),
    pack2Usd: money(PACKS[1].usd, 'USD', locale),
    csvRows: fmt(TRIAL.csvRowsMonth, locale),
    refundDays: String(TRIAL.refundDays),
  };
}
