import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.tsx"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either", controlComponents: ["RadioGroupItem", "Checkbox", "Input", "Textarea"], depth: 3 }],
      "react/jsx-no-literals": ["error", { noStrings: true, ignoreProps: true, allowedStrings: ["&ldquo;", "&rdquo;", "✓", "✗", "/", ":1"] }],
    },
  },
  {
    files: ["src/components/ui/**"],
    rules: { "react/jsx-no-literals": "off", "jsx-a11y/label-has-associated-control": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
