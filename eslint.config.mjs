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
    // Decompiled as is from the "Crossword — Home page visuals (v2, motion)" build (a separate Vite project): it reads
    // refs during render on purpose (a slot remembers it was loading, so its cover stays for one more frame), resets
    // its timelines from effects, keeps the build's unused bindings and draws its images with plain <img>, as the
    // source does.
    files: ["modules/landing/components/motion/home-v2/**"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
