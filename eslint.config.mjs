import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design handoff source (a separate Vite project), ported into modules/sell.
    "crossword-motion-sell conversational interface/**",
  ]),
  {
    // A verbatim port of the "Crossword — Sell: Dynamic motion" handoff (a separate Vite project): it reads refs during
    // render on purpose (a slot remembers it was loading, so its cover stays for one more frame) and draws its images
    // with plain <img>, as the source does.
    files: ["modules/landing/components/motion/sell-dynamic/**"],
    rules: {
      "react-hooks/refs": "off",
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
