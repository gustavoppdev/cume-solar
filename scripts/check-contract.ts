import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { site } from "../src/config/site";
import { routing } from "../src/i18n/routing";

const root = process.cwd();
const release = process.argv.includes("--release");
const errors: string[] = [];
const warnings: string[] = [];

const read = (path: string) => readFileSync(join(root, path), "utf8");

const COLOR_SLOTS = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "success", "success-foreground",
  "border", "input", "ring", "selection", "selection-foreground",
];
const ROOT_EXTRA = ["radius", "duration-fast", "duration-base", "ease-interaction"];
const TEXT_ROLES = ["display", "h1", "h2", "h3", "lead", "body", "small", "stat"];
const THEME_SLOTS = [
  ...TEXT_ROLES.flatMap((r) => [`text-${r}`, `text-${r}--line-height`, `text-${r}--letter-spacing`, `text-${r}--font-weight`]),
  "radius-control", "radius-card", "radius-media", "shadow-card", "shadow-overlay",
  "spacing-section", "spacing-gutter", "container-page",
];
const INLINE_SLOTS = ["font-display", "font-body"];

const FIXED_KEYS: Record<string, string[]> = {
  Metadata: ["siteName", "title", "description", "ogImageAlt"],
  Nav: ["label", "skipToContent", "openMenu", "closeMenu"],
  Footer: ["label", "rights"],
  Demo: ["footerNotice", "conversionNotice"],
  NotFound: ["title", "description", "backHome"],
};

function block(css: string, selector: RegExp) {
  return [...css.matchAll(selector)].map((m) => m[1]).join("\n");
}

function vars(body: string) {
  return new Set([...body.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));
}

function checkCss() {
  const css = read("src/app/globals.css");
  const rootVars = vars(block(css, /:root\s*{([^}]*)}/g));
  const themeVars = vars(block(css, /@theme\s*{([^}]*)}/g));
  const inlineVars = vars(block(css, /@theme inline\s*{([^}]*)}/g));

  for (const slot of [...COLOR_SLOTS, ...ROOT_EXTRA]) {
    if (!rootVars.has(slot)) errors.push(`globals.css :root is missing --${slot}`);
  }
  for (const slot of THEME_SLOTS) {
    if (!themeVars.has(slot)) errors.push(`globals.css @theme is missing --${slot}`);
  }
  for (const slot of INLINE_SLOTS) {
    if (!inlineVars.has(slot)) errors.push(`globals.css @theme inline is missing --${slot}`);
  }
  for (const v of rootVars) {
    if (![...COLOR_SLOTS, ...ROOT_EXTRA].includes(v)) warnings.push(`extra :root slot --${v} (record it as a deviation)`);
  }

  const dark = block(css, /\.dark\s*{([^}]*)}/g);
  if (dark.trim()) {
    const darkVars = vars(dark);
    for (const slot of COLOR_SLOTS) {
      if (!darkVars.has(slot)) errors.push(`globals.css .dark is missing --${slot}`);
    }
  }
}

type Messages = { [key: string]: string | Messages };

function flatten(obj: Messages, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "string" ? [`${prefix}${k}`] : flatten(v, `${prefix}${k}.`),
  );
}

function checkMessages() {
  const [base, ...others] = routing.locales;
  const ptKeys = new Set(flatten(JSON.parse(read(`messages/${base}.json`)) as Messages));

  for (const locale of others) {
    const keys = new Set(flatten(JSON.parse(read(`messages/${locale}.json`)) as Messages));
    for (const k of ptKeys) if (!keys.has(k)) errors.push(`messages/${locale}.json is missing ${k}`);
    for (const k of keys) if (!ptKeys.has(k)) errors.push(`messages/${base}.json is missing ${k}`);
  }

  for (const [ns, keys] of Object.entries(FIXED_KEYS)) {
    for (const key of keys) {
      if (!ptKeys.has(`${ns}.${key}`)) errors.push(`fixed key ${ns}.${key} is missing`);
    }
  }
  for (const id of site.sections) {
    if (!ptKeys.has(`Nav.links.${id}`)) errors.push(`fixed key Nav.links.${id} is missing`);
  }
  if (![...ptKeys].some((k) => k.startsWith(`Conversion.${site.conversion}.`))) {
    errors.push(`Conversion.${site.conversion} is missing for conversion type "${site.conversion}"`);
  }
  if (site.conversion !== "whatsapp") {
    if (!ptKeys.has("Footer.privacy")) errors.push("fixed key Footer.privacy is missing");
    if (![...ptKeys].some((k) => k.startsWith("Privacy."))) errors.push("Privacy namespace is missing");
  }
  if (release) {
    if ([...ptKeys].some((k) => k.startsWith("StyleTile."))) errors.push("StyleTile messages must be removed before release");
    for (const type of ["whatsapp", "lead", "sale"]) {
      if (type !== site.conversion && [...ptKeys].some((k) => k.startsWith(`Conversion.${type}.`))) {
        errors.push(`Conversion.${type} is unused and must be removed before release`);
      }
    }
  }
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const RULES: Array<{ pattern: RegExp; message: string; skip?: RegExp }> = [
  {
    pattern: /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b|\btext-\[\d/,
    message: "raw font size (use a text-<role> utility)",
  },
  {
    pattern: /#[0-9a-fA-F]{3,8}\b(?![\w-])|\brgba?\(|\boklch\(|\bhsla?\(/,
    message: "raw color (use a color slot)",
    skip: /src\/lib\/color\.ts$|style-tile/,
  },
  {
    pattern: /\b(bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|shadow)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(-\d{2,3})?\b/,
    message: "palette color class (use a color slot)",
  },
  { pattern: /from ["']cn["']/, message: 'import cn from "@/lib/utils" (the "cn" default lacks the text-<role> merge config)' },
  { pattern: /\bimport\s*{[^}]*\bmotion\b[^}]*}\s*from\s*["']motion\/react["']/, message: "use m components under LazyMotion, not motion" },
  {
    pattern: /\b(aria-label|alt|title|placeholder)="(?!blur"|empty")[^"{]+"/,
    message: "hardcoded user-facing attribute (use messages)",
    skip: /src\/components\/ui\//,
  },
];

function checkSource() {
  const files = walk(join(root, "src")).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const file of files) {
    const rel = relative(root, file);
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        if (rule.skip?.test(rel)) continue;
        if (rule.pattern.test(line)) errors.push(`${rel}:${i + 1} ${rule.message}`);
      }
    });
  }
}

function checkRelease() {
  if (!release) return;
  const styleTile = ["src/app/[locale]/style-tile", "src/components/style-tile"];
  for (const path of styleTile) if (existsSync(join(root, path))) errors.push(`${path} must be removed before release`);
  if (read("eslint.config.mjs").includes("style-tile")) errors.push("eslint.config.mjs still names style-tile paths");
  const images = read("src/content/images.ts");
  const missing = [...images.matchAll(/"?([\w-]+)"?:\s*{[^}]*src:\s*null/g)].map((m) => m[1]);
  for (const name of missing) errors.push(`image "${name}" is still a placeholder`);
  const conversionDirs = { whatsapp: "whatsapp", lead: "lead", sale: "sale" } as const;
  for (const [type, dir] of Object.entries(conversionDirs)) {
    const path = `src/components/conversion/${dir}`;
    if (type !== site.conversion && existsSync(join(root, path))) errors.push(`${path} is unused and must be removed before release`);
  }
  if (site.conversion === "whatsapp" && existsSync(join(root, "src/app/[locale]/privacy"))) {
    errors.push("privacy route is unused for whatsapp landings and must be removed before release");
  }
}

checkCss();
checkMessages();
checkSource();
checkRelease();

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(
  errors.length
    ? `\ncontract: ${errors.length} error(s), ${warnings.length} warning(s)`
    : `contract: ok${release ? " (release)" : ""}, ${warnings.length} warning(s)`,
);
process.exit(errors.length ? 1 : 0);
