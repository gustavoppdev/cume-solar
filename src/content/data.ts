export type Connection = "single" | "twoPhase" | "threePhase";

/**
 * Every premise the calculator displays, with the month it was checked. Each one
 * comes from a published figure: the availability minimum is fixed in kWh by
 * ANEEL, and the tariff is the national residential average. The municipal
 * lighting levy and the Fio B share are named on the page but stay out of the
 * arithmetic, because neither is published as a single national number.
 */
export const premises = {
  checkedAt: "2026-09",
  /** National residential average, with taxes, in BRL per kWh. */
  tariffPerKwh: 0.95,
  /** Billed minimum in kWh, by connection type. */
  availabilityKwh: { single: 30, twoPhase: 50, threePhase: 100 } satisfies Record<Connection, number>,
  /** Share of the grid-use tariff charged on compensated energy in 2026. */
  fioBShare: 0.6,
  /** Monthly output of one installed kWp on a well-oriented roof, national average. */
  yieldKwhPerKwp: 120,
  /** Market price of an installed residential system, equipment and labour, in BRL per Wp. */
  priceBrlPerWp: { low: 3, high: 4.5 },
} as const;

/** The slider, and the bill value above which each connection type is assumed. */
export const billRange = { min: 150, max: 2500, step: 10, initial: 650 } as const;
export const connectionAbove = { twoPhase: 350, threePhase: 800 } as const;

/** Module output in watts, and the roof area one module occupies, in m². */
export const moduleSpec = { watts: 610, areaM2: 2.8 } as const;

export const systemSpec = [
  { key: "modules", value: "610 W · monocristalino" },
  { key: "inverter", value: "5 kW · 2 entradas MPPT" },
  { key: "mounting", value: "Alumínio anodizado · telha cerâmica" },
  { key: "moduleWarranty", value: "25 anos de potência" },
  { key: "inverterWarranty", value: "10 anos" },
  { key: "service", value: "5 anos de instalação" },
] as const;

export const installs = [
  { city: "Sorocaba, SP", kwp: 4.4, date: "2026-03" },
  { city: "Uberlândia, MG", kwp: 8.1, date: "2026-01" },
  { city: "Londrina, PR", kwp: 5.5, date: "2025-11" },
  { city: "Feira de Santana, BA", kwp: 12.2, date: "2025-08" },
  { city: "Chapecó, SC", kwp: 6.6, date: "2025-04" },
  { city: "Campina Grande, PB", kwp: 9.8, date: "2024-10" },
] as const;

/** Working days per stage, counted from the approved quote, and who holds the stage. */
export const processSteps = [
  { key: "visit", days: 3, owner: "us" },
  { key: "design", days: 5, owner: "us" },
  { key: "request", days: 30, owner: "utility" },
  { key: "install", days: 2, owner: "us" },
  { key: "approval", days: 15, owner: "utility" },
] as const;

export const states = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"], ["AM", "Amazonas"], ["BA", "Bahia"],
  ["CE", "Ceará"], ["DF", "Distrito Federal"], ["ES", "Espírito Santo"], ["GO", "Goiás"],
  ["MA", "Maranhão"], ["MT", "Mato Grosso"], ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"],
  ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"], ["PE", "Pernambuco"], ["PI", "Piauí"],
  ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"], ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"], ["SP", "São Paulo"],
  ["SE", "Sergipe"], ["TO", "Tocantins"],
] as const;
