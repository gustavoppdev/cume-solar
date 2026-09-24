import { useSyncExternalStore } from "react";
import { billRange, connectionAbove, moduleSpec, premises, type Connection } from "@/content/data";

export type Estimate = {
  bill: number;
  connection: Connection;
  /** The share of the bill a system would generate, in BRL. */
  generated: number;
  /** The availability minimum, which keeps arriving, in BRL. */
  fixed: number;
  modules: number;
  areaM2: number;
  kwp: number;
  /** The market price range of such a system, installed, in BRL. */
  investment: { low: number; high: number };
};

export function inferConnection(bill: number): Connection {
  if (bill > connectionAbove.threePhase) return "threePhase";
  if (bill > connectionAbove.twoPhase) return "twoPhase";
  return "single";
}

export function estimate(bill: number, connection: Connection): Estimate {
  const fixed = Math.min(bill, premises.availabilityKwh[connection] * premises.tariffPerKwh);
  const generated = bill - fixed;
  const neededKwp = generated / premises.tariffPerKwh / premises.yieldKwhPerKwp;
  const modules = Math.max(1, Math.ceil((neededKwp * 1000) / moduleSpec.watts));
  const watts = modules * moduleSpec.watts;
  const roundTo500 = (value: number) => Math.round(value / 500) * 500;
  return {
    bill,
    connection,
    generated,
    fixed,
    modules,
    areaM2: modules * moduleSpec.areaM2,
    kwp: watts / 1000,
    investment: {
      low: roundTo500(watts * premises.priceBrlPerWp.low),
      high: roundTo500(watts * premises.priceBrlPerWp.high),
    },
  };
}

type Input = { bill: number; override: Connection | null };

let input: Input = { bill: billRange.initial, override: null };
let current = estimate(input.bill, inferConnection(input.bill));
const initial = current;
const listeners = new Set<() => void>();

function set(next: Input) {
  input = next;
  current = estimate(next.bill, next.override ?? inferConnection(next.bill));
  listeners.forEach((listener) => listener());
}

export const getEstimate = () => current;
export const setBill = (bill: number) => set({ ...input, bill });
export const setConnection = (connection: Connection) => set({ ...input, override: connection });

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The estimate the visitor is looking at, shared by the calculator and the quote form. */
export function useEstimate() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => initial,
  );
}
