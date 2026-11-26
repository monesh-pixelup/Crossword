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
    // OpenNext build output and local wrangler state.
    ".open-next/**",
    ".wrangler/**",
    // The frozen Sanity schema (the blog left Sanity on 2026-11-26; see sanity/README.md). Its packages are no longer
    // installed, so it is neither linted nor type-checked.
    "sanity/**",
  ]),
  {
    // Dropping fields by destructuring (`const { body: _body, ...post } = raw`) is how we omit them, so the named
    // siblings of a rest element don't count as unused.
    rules: { "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }] },
  },
  {
    // The motion visuals built as is from the design team's sources (separate Vite projects, unminified, React
    // external): Home v2, Sell v2, AI Assistants v3, Dynamic v2 and Support v3. They read refs during render on purpose
    // (a slot remembers it was loading, so its cover stays for one more frame), reset their timelines from effects, keep
    // the build's unused bindings and anonymous components, and draw their images with plain <img>, as the sources do.
    // They are regenerated from those sources rather than edited, so their lint findings aren't ours to fix.
    files: [
      "modules/landing/components/motion/home-v2/**",
      "modules/sell/components/motion-v2/**",
      "modules/ai-assistants/components/motion/aia-v3.js",
      "modules/dynamic-landing-pages/components/motion/dlp-v2.js",
      "modules/support/components/motion-v3/support-v3.js",
    ],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@next/next/no-img-element": "off",
      "react/display-name": "off",
      "react/no-children-prop": "off",
    },
  },
  {
    // The illustration kit's source, copied in as is for Managed launch, Personal agents and Retain (see each folder's
    // README-port.md): the same patterns as the builds above, as TSX. Only the pages' own wrappers (ml-motion.tsx,
    // pa-motion.tsx, retain-motion.tsx, motion.css) are site code, so they stay linted.
    files: [
      "modules/{managed-launch,personal-agents,retain}/components/motion/{assets,brands,components,illustrations,storefronts,visuals}/**",
    ],
    // The source's own eslint-disable comments are for rules turned off here.
    linterOptions: { reportUnusedDisableDirectives: "off" },
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
