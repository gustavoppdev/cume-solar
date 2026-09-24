import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseColor, toHex } from "./color";

let cache: Record<string, string> | null = null;

function rootVariables() {
  if (cache) return cache;
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  const root = css.match(/:root\s*{([^}]*)}/)?.[1] ?? "";
  cache = Object.fromEntries(
    [...root.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
  );
  return cache;
}

export function tokenRgb(name: string) {
  const rgb = parseColor(rootVariables()[name] ?? "");
  if (!rgb) throw new Error(`Token --${name} is not a parseable color`);
  return rgb;
}

export const tokenHex = (name: string) => toHex(tokenRgb(name));
