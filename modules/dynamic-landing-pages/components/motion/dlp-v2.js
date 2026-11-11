"use client";

// Built from the "Crossword — Sell: Dynamic v2 (motion)" source (Crossword-Sell-Dynamic-V2-Motion/source) with Vite,
// unminified, React external. See ./dlp-motion.tsx for the mechanical changes.

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createContext, useRef, useEffect, Fragment as Fragment$1, useState, useLayoutEffect, forwardRef, useMemo, useContext, useCallback } from "react";
const StorybookCardSkin = createContext(false);
const StorybookComposerDefault = createContext(false);
const __vite_glob_0_0 = "/images/dynamic-landing-pages/v2/assets/amber-and-oak-mark-fxg20Grc.svg";
const __vite_glob_0_1 = "/images/dynamic-landing-pages/v2/assets/aura-mark-DpXI8V8Q.svg";
const __vite_glob_0_2 = "/images/dynamic-landing-pages/v2/assets/aurelia-mark-Bh18_Lw6.svg";
const __vite_glob_0_3 = "/images/dynamic-landing-pages/v2/assets/aurelle-mark-BUbtN7nf.svg";
const __vite_glob_0_4 = "/images/dynamic-landing-pages/v2/assets/brewhaus-mark-C30bIvyV.svg";
const __vite_glob_0_5 = "/images/dynamic-landing-pages/v2/assets/crestline-mark-BYdfHI0-.svg";
const __vite_glob_0_6 = "/images/dynamic-landing-pages/v2/assets/dusklight-mark-e281Q9el.svg";
const __vite_glob_0_7 = "/images/dynamic-landing-pages/v2/assets/goodwell-mark-B8uogM9l.svg";
const __vite_glob_0_8 = "/images/dynamic-landing-pages/v2/assets/marais-mark-Dtz5V4-o.svg";
const __vite_glob_0_9 = "/images/dynamic-landing-pages/v2/assets/moonrest-mark-CqubK1ze.svg";
const __vite_glob_0_10 = "/images/dynamic-landing-pages/v2/assets/proteinmax-mark-CAjpFhM5.svg";
const __vite_glob_0_11 = "/images/dynamic-landing-pages/v2/assets/sorelle-labs-mark-CQBfsdpQ.svg";
const __vite_glob_0_12 = "/images/dynamic-landing-pages/v2/assets/stride-mark-BhAcSYrg.svg";
const __vite_glob_0_13 = "/images/dynamic-landing-pages/v2/assets/trailwell-mark-DWHfUX1B.svg";
const __vite_glob_1_0 = "/images/dynamic-landing-pages/v2/assets/amber-and-oak-mark-DyBTEnHG.svg";
const __vite_glob_1_1 = "/images/dynamic-landing-pages/v2/assets/aurelia-mark-WAhMDRAF.svg";
const __vite_glob_1_2 = "/images/dynamic-landing-pages/v2/assets/aurelle-mark-CkALuNbG.svg";
const __vite_glob_1_3 = "/images/dynamic-landing-pages/v2/assets/brewhaus-mark-CPBhNKZi.svg";
const __vite_glob_1_4 = "/images/dynamic-landing-pages/v2/assets/crestline-mark-x07nlP5x.svg";
const __vite_glob_1_5 = "/images/dynamic-landing-pages/v2/assets/dusklight-mark-BxLi6ckI.svg";
const __vite_glob_1_6 = "/images/dynamic-landing-pages/v2/assets/moonrest-mark-C1S3y54t.svg";
const __vite_glob_1_7 = "/images/dynamic-landing-pages/v2/assets/sorelle-labs-mark-DwV8-BRm.svg";
const aurelia = {
  name: "Aurelia",
  category: "Merchant workspace",
  ink: "oklch(0.372050 0.104087 11.375080)",
  paper: "oklch(0.949854 0.035765 83.776669)",
  plate: "oklch(0.949854 0.035765 83.776669)",
  font: '"Geist", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Merchant workflow modules; no retail product imagery.",
  logomarkPath: "src/assets/brands/supplied/aurelia-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/aurelia-badge.svg",
  wordmarkTreatment: "plain-text"
};
const marais = {
  name: "Marais",
  category: "Fashion and accessories",
  ink: "oklch(0.333797 0.017711 52.846973)",
  paper: "oklch(0.917788 0.014926 80.705576)",
  plate: "oklch(0.917788 0.014926 80.705576)",
  font: '"Playfair Display", Georgia, serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Natural fibres, neutral apparel and cognac leather. Preserve exact garment and colourway.",
  logomarkPath: "src/assets/brands/supplied/marais-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/marais-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const goodwell = {
  name: "Goodwell",
  category: "Functional gummies",
  ink: "#3D2A52",
  paper: "#ECE5F4",
  plate: "#ECE5F4",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Plum-labelled jars on soft lavender backgrounds.",
  logomarkPath: "src/assets/brands/supplied/goodwell-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/goodwell-badge.svg",
  wordmarkTreatment: "plain-text"
};
const moonrest = {
  name: "Moonrest",
  category: "Sleep wellness",
  ink: "oklch(0.322726 0.043440 265.959396)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Midnight blue sleep-wellness packaging.",
  logomarkPath: "src/assets/brands/supplied/moonrest-mark.svg",
  wordmarkPath: "src/assets/brands/placeholders/moonrest-wordmark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/moonrest-badge.svg",
  wordmarkTreatment: "plain-text"
};
const dusklight = {
  name: "Dusklight",
  category: "Lighting",
  ink: "oklch(0.407553 0.025289 297.472985)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Playfair Display", Georgia, serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Sculptural lighting in muted dusk neutrals.",
  logomarkPath: "src/assets/brands/supplied/dusklight-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/dusklight-badge.svg",
  wordmarkTreatment: "plain-text"
};
const crestline = {
  name: "Crestline",
  category: "Helmets and protection",
  ink: "oklch(0.387478 0.051296 162.242973)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Graphite and ivory outdoor equipment on neutral studio backgrounds.",
  logomarkPath: "src/assets/brands/supplied/crestline-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/crestline-badge.svg",
  wordmarkTreatment: "plain-text"
};
const brewhaus = {
  name: "Brewhaus",
  category: "Coffee equipment",
  ink: "oklch(0.362916 0.031371 68.517470)",
  paper: "oklch(0.900982 0.029332 82.592444)",
  plate: "oklch(0.900982 0.029332 82.592444)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Brushed steel machines and cream coffee packaging; warm studio light.",
  logomarkPath: "src/assets/brands/supplied/brewhaus-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/brewhaus-badge.svg",
  wordmarkTreatment: "plain-text"
};
const waveline = {
  name: "Waveline",
  category: "Electronics",
  ink: "oklch(0.393233 0.051477 222.864924)",
  paper: "oklch(0.937245 0.014436 213.099208)",
  plate: "oklch(0.937245 0.014436 213.099208)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Clean silver and charcoal electronics, restrained blue-green accents."
};
const aura = {
  name: "Aura",
  category: "Consumer electronics",
  ink: "oklch(0.383958 0.041934 259.291287)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Ivory earbud shells with small uppercase branding.",
  logomarkPath: "src/assets/brands/supplied/aura-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/aura-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const auden$1 = {
  name: "Auden",
  category: "Headphones",
  ink: "oklch(0.287317 0.010592 139.435369)",
  paper: "oklch(0.953751 0.006637 106.524690)",
  plate: "oklch(0.953751 0.006637 106.524690)",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Same headphone geometry across black, ivory, olive and mustard variants."
};
const lumen = {
  name: "Lumen",
  category: "Foundation and makeup",
  ink: "oklch(0.471130 0.054860 60.711055)",
  paper: "oklch(0.918283 0.023989 73.599537)",
  plate: "oklch(0.918283 0.023989 73.599537)",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Pale champagne caps, frosted glass and widely tracked uppercase LUMEN packaging."
};
const trailwell = {
  name: "Trailwell",
  category: "Backpacks and bottles",
  ink: "oklch(0.404438 0.043777 153.864096)",
  paper: "oklch(0.932657 0.021677 118.236881)",
  plate: "oklch(0.932657 0.021677 118.236881)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Outdoor utility, olive fabric and durable metal bottles.",
  logomarkPath: "src/assets/brands/supplied/trailwell-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/trailwell-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const stride = {
  name: "Stride",
  category: "Shoes",
  ink: "oklch(0.385568 0.040481 186.036186)",
  paper: "oklch(0.927348 0.013483 167.158983)",
  plate: "oklch(0.927348 0.013483 167.158983)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Minimal footwear; black, tan and white are separate image assets, never CSS colour filters.",
  logomarkPath: "src/assets/brands/supplied/stride-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/stride-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const vela = {
  name: "Vela",
  category: "Hair tools",
  ink: "oklch(0.400862 0.039974 357.323084)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Muted rose and charcoal styling tools."
};
const formwork = {
  name: "Formwork",
  category: "Office chairs",
  ink: "oklch(0.379113 0.017648 231.725316)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Graphite mesh seating; every gallery angle must be of the same chair."
};
const proteinmax = {
  name: "Proteinmax",
  category: "Protein supplements",
  ink: "oklch(0.397889 0.104174 19.963898)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Black protein tubs, red accents and consistent PROTEINMAX labels.",
  logomarkPath: "src/assets/brands/supplied/proteinmax-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/proteinmax-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const hearthware = {
  name: "Hearthware",
  category: "Kitchen appliances",
  ink: "oklch(0.443046 0.078484 38.521350)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Inter", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Matte charcoal kitchen appliances with warm neutral studio lighting."
};
const aeria = {
  name: "Aeria",
  category: "Vacuums",
  ink: "oklch(0.423822 0.051456 208.468768)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: '"Space Grotesk", system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Original charcoal or ivory vacuum designs with restrained teal details; no real brand marks."
};
const aurelle = {
  name: "Aurelle",
  category: "Jewellery",
  ink: "oklch(0.372050 0.104087 11.375080)",
  paper: "oklch(0.949854 0.035765 83.776669)",
  plate: "oklch(0.949854 0.035765 83.776669)",
  font: '"Playfair Display", Georgia, serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Gold and rose-gold jewellery; warm ivory silk and pale stone.",
  logomarkPath: "src/assets/brands/supplied/aurelle-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/aurelle-badge.svg",
  wordmarkTreatment: "plain-text"
};
const registry = {
  aurelia,
  marais,
  "sorelle-labs": {
    name: "Sorelle Labs",
    category: "Skincare",
    ink: "oklch(0.312021 0.017679 40.980349)",
    paper: "oklch(0.928960 0.013702 120.286628)",
    plate: "oklch(0.928960 0.013702 120.286628)",
    font: '"Playfair Display", Georgia, serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Ivory bottles, quiet botanical details, warm paper with sand and sage plates.",
    logomarkPath: "src/assets/brands/supplied/sorelle-labs-mark.svg",
    identityStatus: "Supplied logomark; plain-text wordmark",
    identitySourcePath: "src/assets/brands/supplied/sorelle-labs-badge.svg",
    wordmarkTreatment: "plain-text"
  },
  goodwell,
  moonrest,
  "amber-and-oak": {
    name: "Amber & Oak",
    category: "Home decor and furniture",
    ink: "oklch(0.452877 0.059042 53.979984)",
    paper: "oklch(0.968556 0.013078 82.401983)",
    plate: "oklch(0.968556 0.013078 82.401983)",
    font: '"Playfair Display", Georgia, serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Warm lighting, oak, linen and brass. Keep the supplied shopper reference distinct.",
    logomarkPath: "src/assets/brands/supplied/amber-and-oak-mark.svg",
    identityStatus: "Supplied logomark; plain-text wordmark",
    identitySourcePath: "src/assets/brands/supplied/amber-and-oak-badge.svg",
    wordmarkTreatment: "plain-text"
  },
  dusklight,
  crestline,
  brewhaus,
  waveline,
  aura,
  "holt-and-co": {
    name: "Holt & Co",
    category: "Leather goods",
    ink: "oklch(0.389321 0.051580 45.883998)",
    paper: "oklch(0.931264 0.021080 79.091606)",
    plate: "oklch(0.931264 0.021080 79.091606)",
    font: '"Playfair Display", Georgia, serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Cognac leather, subtle debossed wordmarks, warm sand surfaces."
  },
  auden: auden$1,
  lumen,
  trailwell,
  stride,
  vela,
  formwork,
  proteinmax,
  "echo-and-co": {
    name: "Echo & Co",
    category: "Multi-category gift retailer",
    ink: "oklch(0.377131 0.052841 265.419694)",
    paper: "oklch(0.968556 0.013078 82.401983)",
    plate: "oklch(0.968556 0.013078 82.401983)",
    font: '"Inter", system-ui, sans-serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Retailer identity stays in chrome; individual products retain Waveline, Aura and Holt & Co branding."
  },
  hearthware,
  aeria,
  aurelle
};
const goodwellMark = "/images/dynamic-landing-pages/v2/assets/goodwell-mark-D2M8-7dz.svg";
const normalise = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
function getBrand(name) {
  const entry = Object.entries(registry).find(
    ([id, brand2]) => id === name || normalise(brand2.name) === normalise(name)
  );
  if (!entry) throw new Error(`Unregistered demo brand: ${name}`);
  return { id: entry[0], ...entry[1] };
}
function brandStyle(name) {
  const brand2 = getBrand(name);
  return {
    "--brand-ink": brand2.ink,
    "--brand-paper": brand2.paper,
    "--brand-plate": brand2.plate,
    "--brand-font": brand2.font,
    "--brand-tracking": brand2.tracking,
    "--brand-case": brand2.wordmarkCase
  };
}
const marks = {
  aurelia: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  marais: "M5 19V5l7 9 7-9v14M8 19V12m8 7v-7",
  "sorelle-labs": "M12 20V9m0 7C5 16 4 10 4 7c6 0 8 3 8 7m0-3c0-5 4-7 8-7 0 5-2 9-8 9",
  moonrest: "M17 4a8.5 8.5 0 1 0 3 14A9 9 0 0 1 17 4Z",
  "amber-and-oak": "M4 12 8 5h8l4 7H4Zm8 0v7m-4 0h8",
  dusklight: "M5 17h14M7 14a5 5 0 0 1 10 0M12 3v3M4 7l2 2m14-2-2 2",
  crestline: "M3 19 10 5l4 8 3-5 5 11H3Zm5-9 2 3 2-3",
  brewhaus: "M5 9h12v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm12 1h1a3 3 0 0 1 0 6h-1M8 3v3m5-3v3",
  waveline: "M3 8c3-6 6 6 9 0s6 6 9 0M3 16c3-6 6 6 9 0s6 6 9 0",
  aura: "M7 5a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H5V8a3 3 0 0 1 2-3Zm10 0a3 3 0 0 1 2 3v6h-2a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3ZM7 14v5m10-5v5",
  "holt-and-co": "M5 5v14m8-14v14M5 12h8m7-5c-4-2-5 8 0 8",
  auden: "M4 15v-3a8 8 0 0 1 16 0v3M4 12h3v7H4v-7Zm13 0h3v7h-3v-7Z",
  lumen: "M12 3v3m0 12v3M3 12h3m12 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z",
  trailwell: "M3 19 9 7l4 8 3-6 5 10H3ZM12 3v4",
  stride: "m4 8 12-4-3 6 7 1-12 9 3-7-7-1Z",
  vela: "M5 5 12 20 19 5M9 5l3 7 3-7",
  formwork: "M7 4h10v9H7V4Zm-2 9h14v4H5v-4Zm3 4v4m8-4v4",
  proteinmax: "m12 3 8 5v8l-8 5-8-5V8l8-5ZM8 16V8h5a3 3 0 0 1 0 6H8",
  "echo-and-co": "M8 4a8 8 0 0 0 0 16m4-13a5 5 0 0 0 0 10m4-7a2 2 0 0 0 0 4m5-2h-1",
  hearthware: "M5 20V10l7-6 7 6v10H5Zm5-3c-3-3 3-4 2-7 5 4 4 7 0 8",
  aeria: "M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h5"
};
const suppliedMarks = /* @__PURE__ */ Object.assign({ "../assets/brands/supplied/amber-and-oak-mark.svg": __vite_glob_0_0, "../assets/brands/supplied/aura-mark.svg": __vite_glob_0_1, "../assets/brands/supplied/aurelia-mark.svg": __vite_glob_0_2, "../assets/brands/supplied/aurelle-mark.svg": __vite_glob_0_3, "../assets/brands/supplied/brewhaus-mark.svg": __vite_glob_0_4, "../assets/brands/supplied/crestline-mark.svg": __vite_glob_0_5, "../assets/brands/supplied/dusklight-mark.svg": __vite_glob_0_6, "../assets/brands/supplied/goodwell-mark.svg": __vite_glob_0_7, "../assets/brands/supplied/marais-mark.svg": __vite_glob_0_8, "../assets/brands/supplied/moonrest-mark.svg": __vite_glob_0_9, "../assets/brands/supplied/proteinmax-mark.svg": __vite_glob_0_10, "../assets/brands/supplied/sorelle-labs-mark.svg": __vite_glob_0_11, "../assets/brands/supplied/stride-mark.svg": __vite_glob_0_12, "../assets/brands/supplied/trailwell-mark.svg": __vite_glob_0_13 });
const placeholderMarks = /* @__PURE__ */ Object.assign({
  "../assets/brands/placeholders/amber-and-oak-mark.svg": __vite_glob_1_0,
  "../assets/brands/placeholders/aurelia-mark.svg": __vite_glob_1_1,
  "../assets/brands/placeholders/aurelle-mark.svg": __vite_glob_1_2,
  "../assets/brands/placeholders/brewhaus-mark.svg": __vite_glob_1_3,
  "../assets/brands/placeholders/crestline-mark.svg": __vite_glob_1_4,
  "../assets/brands/placeholders/dusklight-mark.svg": __vite_glob_1_5,
  "../assets/brands/placeholders/moonrest-mark.svg": __vite_glob_1_6,
  "../assets/brands/placeholders/sorelle-labs-mark.svg": __vite_glob_1_7
});
function BrandMark({
  brand: name,
  className = ""
}) {
  const brand2 = getBrand(name);
  const supplied = suppliedMarks[`../assets/brands/supplied/${brand2.id}-mark.svg`];
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `demo-brand-mark ${className}`,
      style: brandStyle(name),
      "data-brand-id": brand2.id,
      "data-identity-asset": supplied ? "supplied" : "placeholder",
      "aria-hidden": "true",
      children: supplied ? /* @__PURE__ */ jsx("img", { className: "demo-brand-mark__supplied", src: supplied, alt: "" }) : brand2.id === "aurelle" || brand2.id === "goodwell" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: brand2.id === "aurelle" ? placeholderMarks["../assets/brands/placeholders/aurelle-mark.svg"] : goodwellMark,
          alt: ""
        }
      ) : placeholderMarks[`../assets/brands/placeholders/${brand2.id}-mark.svg`] ? /* @__PURE__ */ jsx(
        "span",
        {
          className: "demo-brand-mark__asset",
          style: {
            maskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand2.id}-mark.svg`]}")`,
            WebkitMaskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand2.id}-mark.svg`]}")`
          }
        }
      ) : /* @__PURE__ */ jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx("path", { d: marks[brand2.id] })
        }
      )
    }
  );
}
function BrandName({
  brand: brand2,
  className = ""
}) {
  const identity = getBrand(brand2);
  const displayName = identity.name === identity.name.toUpperCase() ? identity.name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) : identity.name;
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `demo-brand-name ${className}`,
      style: brandStyle(brand2),
      "data-brand-id": identity.id,
      children: displayName
    }
  );
}
function BrandWordmark({
  brand: brand2,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("span", { className: `demo-brand-wordmark ${className}`, children: [
    /* @__PURE__ */ jsx(BrandMark, { brand: brand2 }),
    /* @__PURE__ */ jsx(BrandName, { brand: brand2 })
  ] });
}
const amberChairImage = "/images/dynamic-landing-pages/v2/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
const amberOpalLampImage = "/images/dynamic-landing-pages/v2/assets/amber-oak-opal-glass-lamp-CSWTBSbc.webp";
const amberPleatedLampImage = "/images/dynamic-landing-pages/v2/assets/amber-oak-pleated-linen-lamp-DU9AZH7n.webp";
const trailwellWeekenderImage = "/images/dynamic-landing-pages/v2/assets/trailwell-weekender-FcXfEIMe.webp";
const trailwellRoamImage = "/images/dynamic-landing-pages/v2/assets/trailwell-roam-E1xpy3ga.webp";
const trailwellOvernightImage = "/images/dynamic-landing-pages/v2/assets/trailwell-overnight-Bh3WrqOg.webp";
const strideCourt = "/images/dynamic-landing-pages/v2/assets/court-01-CdgB4UN7.webp";
const strideRunner = "/images/dynamic-landing-pages/v2/assets/suede-runner-CgZl6zbH.webp";
const strideLoafer = "/images/dynamic-landing-pages/v2/assets/penny-loafer-B2im49V5.webp";
const sorelleSetImage = "/images/dynamic-landing-pages/v2/assets/sorelle-hydration-set-9Ig4QSA_.webp";
const sorelleGelImage = "/images/dynamic-landing-pages/v2/assets/sorelle-cloud-gel-BMJMi5HN.webp";
const sorelleLotionImage = "/images/dynamic-landing-pages/v2/assets/sorelle-barrier-lotion-ZlOVOOrp.webp";
const sorelleCreamImage = "/images/dynamic-landing-pages/v2/assets/sorelle-hydration-cream-DnCPkHXM.webp";
const vitaminCSerum = "/images/dynamic-landing-pages/v2/assets/vitamin-c-serum-vnf_1nLn.webp";
const goodwell_sleep_60 = "/images/dynamic-landing-pages/v2/assets/goodwell-sleep-60-CC2pkEiH.webp";
const goodwell_sleep_28 = "/images/dynamic-landing-pages/v2/assets/goodwell-sleep-28-CDykoAsw.webp";
const goodwell_energy = "/images/dynamic-landing-pages/v2/assets/goodwell-energy-DTBla5fb.webp";
const goodwell_focus = "/images/dynamic-landing-pages/v2/assets/goodwell-focus-Bg4PysvQ.webp";
const goodwell_calm = "/images/dynamic-landing-pages/v2/assets/goodwell-calm-BFGrK6_s.webp";
const goodwell_immunity = "/images/dynamic-landing-pages/v2/assets/goodwell-immunity-MpMIo6Dd.webp";
const moonrest_sleep = "/images/dynamic-landing-pages/v2/assets/moonrest-sleep-Cn_bYWCE.webp";
const dusklight_arc = "/images/dynamic-landing-pages/v2/assets/dusklight-arc-BLtDyKob.svg";
const dusklight_linear = "/images/dynamic-landing-pages/v2/assets/dusklight-linear-CNxIsC3B.svg";
const crestlineHelmet = "/images/dynamic-landing-pages/v2/assets/crestline-helmet-ByadbiwR.webp";
const aurelleAnkletImage = "/images/dynamic-landing-pages/v2/assets/beaded-gold-anklet-BD5cJanU.webp";
const aurellePendantImage = "/images/dynamic-landing-pages/v2/assets/teardrop-pendant-necklace-D-dhIf6_.webp";
const aurelleBraceletImage = "/images/dynamic-landing-pages/v2/assets/chain-link-bracelet-GsLwly7K.webp";
const aurelleRosePendantImage = "/images/dynamic-landing-pages/v2/assets/rose-gold-teardrop-pendant-D6EiuVDi.webp";
const aurelleHaloImage = "/images/dynamic-landing-pages/v2/assets/rose-gold-halo-pendant-D9hm3seh.webp";
const aurelleBarImage = "/images/dynamic-landing-pages/v2/assets/rose-gold-bar-pendant-BLV_GvgY.webp";
const aurelleBoxChainImage = "/images/dynamic-landing-pages/v2/assets/rose-gold-fine-box-chain-xCJee_59.webp";
const aurelleSnakeChainImage = "/images/dynamic-landing-pages/v2/assets/rose-gold-snake-chain-CAeWdfsC.webp";
const aurelleCurbChainImage = "/images/dynamic-landing-pages/v2/assets/rose-gold-curb-chain-JMoFIQPj.webp";
const espressoMachine = "/images/dynamic-landing-pages/v2/assets/01-brewhaus-pro-espresso-machine-CnXtbuBY.webp";
const accessoryBundle = "/images/dynamic-landing-pages/v2/assets/02-brewhaus-coffee-accessory-bundle-C2tDu5VG.webp";
const leatherFrameCase = "/images/dynamic-landing-pages/v2/assets/marais-eyewear-case-JN3ZsUf8.webp";
const silkScarf = "/images/dynamic-landing-pages/v2/assets/04-marais-gold-tone-silk-scarf-CNixvkq3.webp";
const smartSpeaker = "/images/dynamic-landing-pages/v2/assets/05-waveline-compact-smart-speaker-Bnwh8J7N.webp";
const wirelessEarbuds = "/images/dynamic-landing-pages/v2/assets/06-aura-wireless-earbuds-D4tIAj5K.webp";
const leatherWallet = "/images/dynamic-landing-pages/v2/assets/07-holt-and-co-leather-bifold-wallet-Djl5CNb1.webp";
const auden = "/images/dynamic-landing-pages/v2/assets/08-auden-wave-pro-black-DBohKiBG.webp";
const audenIvory = "/images/dynamic-landing-pages/v2/assets/09-auden-viewed-headphones-ivory-DJtMgVTi.webp";
const audenOlive = "/images/dynamic-landing-pages/v2/assets/10-auden-viewed-headphones-olive-CXNlTcjR.webp";
const audenMustard = "/images/dynamic-landing-pages/v2/assets/11-auden-viewed-headphones-mustard-gold-Bfg04pgZ.webp";
const familyAirFryer = "/images/dynamic-landing-pages/v2/assets/12-family-air-fryer-CWIb1OmL.webp";
const compactAirFryer = "/images/dynamic-landing-pages/v2/assets/13-compact-air-fryer-BxJsr6WI.webp";
const referenceLamp = "/images/dynamic-landing-pages/v2/assets/14-shopper-reference-triple-dome-lamp-aevpNtcM.webp";
const tripodLamp = "/images/dynamic-landing-pages/v2/assets/15-warm-tripod-table-lamp-DHLSJYdp.webp";
const domeLamp = "/images/dynamic-landing-pages/v2/assets/16-mod-dome-table-lamp-EjQrNJOK.webp";
const bedsideLamp = "/images/dynamic-landing-pages/v2/assets/17-copper-rim-bedside-lamp-CpO5i7WX.webp";
const foundation = "/images/dynamic-landing-pages/v2/assets/lumen-second-skin-dewy-wWlLR3Lx.webp";
const cottonShirt = "/images/dynamic-landing-pages/v2/assets/19-marais-relaxed-cotton-shirt-7PfMJYiW.webp";
const tailoredTrousers = "/images/dynamic-landing-pages/v2/assets/20-straight-leg-tailored-trousers-hCDbFo78.webp";
const leatherSneakers = "/images/dynamic-landing-pages/v2/assets/21-minimal-leather-sneakers-BEbJimwc.webp";
const aeriaCycloneProVacuum = "/images/dynamic-landing-pages/v2/assets/22-aeria-cyclone-pro-vacuum-CinSe7Rh.webp";
const aeriaCycloneMaxVacuum = "/images/dynamic-landing-pages/v2/assets/aeria-cyclone-max-CqZad4Xk.webp";
const oliveCottonShirt = "/images/dynamic-landing-pages/v2/assets/marais-shirt-olive-Bh1w4gzh.webp";
const blackLeatherSneakers = "/images/dynamic-landing-pages/v2/assets/stride-sneakers-black-CuBmUkDb.webp";
const skinVeilFoundation = "/images/dynamic-landing-pages/v2/assets/lumen-skin-veil-p5bk1wp6.webp";
const trueMatchFoundation = "/images/dynamic-landing-pages/v2/assets/lumen-true-match-BhSYv85P.webp";
const leatherCardholder = "/images/dynamic-landing-pages/v2/assets/holt-cardholder-Cu4HiyUC.webp";
const cutouts = {
  espressoMachine,
  accessoryBundle,
  leatherFrameCase,
  silkScarf,
  smartSpeaker,
  wirelessEarbuds,
  leatherWallet,
  auden,
  audenIvory,
  audenOlive,
  audenMustard,
  familyAirFryer,
  compactAirFryer,
  referenceLamp,
  tripodLamp,
  domeLamp,
  bedsideLamp,
  foundation,
  cottonShirt,
  tailoredTrousers,
  leatherSneakers,
  aeriaCycloneProVacuum,
  aeriaCycloneMaxVacuum,
  oliveCottonShirt,
  blackLeatherSneakers,
  skinVeilFoundation,
  trueMatchFoundation,
  leatherCardholder
};
const cutoutSrcs = new Set(Object.values(cutouts));
const hydratingSerum = "/images/dynamic-landing-pages/v2/assets/hydrating-serum-DkP_er3F.webp";
const calmingSerum = "/images/dynamic-landing-pages/v2/assets/calming-serum-mWPB8Rzq.webp";
const proteinTub = "/images/dynamic-landing-pages/v2/assets/gallery-main-Ct7UQJr8.webp";
const officeChair = "/images/dynamic-landing-pages/v2/assets/gallery-main-Cz-eqPt1.webp";
const linenMidiDress = "/images/dynamic-landing-pages/v2/assets/linen-midi-dress-BF9Sk3Jd.webp";
const linenShirtDress = "/images/dynamic-landing-pages/v2/assets/linen-shirt-dress-DbEpAh-k.webp";
const linenTrousers = "/images/dynamic-landing-pages/v2/assets/linen-trousers-BOqijRPF.webp";
const balloonSleeveDress = "/images/dynamic-landing-pages/v2/assets/dress-reference-OSo4OmDP.webp";
const wavelineLaptop = "/images/dynamic-landing-pages/v2/assets/laptop-bHYKckDQ.webp";
const formworkTaskChair = "/images/dynamic-landing-pages/v2/assets/also-viewed-1-B6DEocae.webp";
const formworkExecutiveChair = "/images/dynamic-landing-pages/v2/assets/also-viewed-2-DWB9-93Z.webp";
const catalog = {
  amberLoungeChair: {
    id: "amber-oak-lounge-chair",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Oak & Linen Lounge Chair",
    image: amberChairImage,
    price: "$480",
    color: "Natural oak / Ivory linen"
  },
  trailwellWeekender: {
    id: "trailwell-weekender",
    brandId: "trailwell",
    brand: registry.trailwell.name,
    title: "Weekender",
    image: trailwellWeekenderImage,
    price: "$148",
    color: "Forest",
    size: "30L"
  },
  trailwellRoam: {
    id: "trailwell-roam",
    brandId: "trailwell",
    brand: registry.trailwell.name,
    title: "Roam",
    image: trailwellRoamImage,
    price: "$189",
    color: "Charcoal",
    size: "40L"
  },
  trailwellOvernight: {
    id: "trailwell-overnight",
    brandId: "trailwell",
    brand: registry.trailwell.name,
    title: "Overnight",
    image: trailwellOvernightImage,
    price: "$132",
    color: "Sand",
    size: "24L"
  },
  auraEarbuds: {
    id: "aura-wireless-earbuds",
    brandId: "aura",
    brand: registry.aura.name,
    title: "Wireless Earbuds",
    image: cutouts.wirelessEarbuds,
    price: "$89",
    color: "Ivory"
  },
  strideCourt01: {
    id: "stride-court-01",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Court 01 Leather Sneaker",
    image: strideCourt,
    price: "$245",
    color: "Chalk",
    size: "US 10"
  },
  strideSuedeRunner: {
    id: "stride-suede-runner",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Suede Runner",
    image: strideRunner,
    price: "$295",
    color: "Taupe",
    size: "US 10"
  },
  stridePennyLoafer: {
    id: "stride-penny-loafer",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Leather Penny Loafer",
    image: strideLoafer,
    price: "$325",
    color: "Espresso",
    size: "US 10"
  },
  maraisLinenDress: {
    id: "linen-mini-dress",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Relaxed-Fit Linen Mini Dress",
    image: linenMidiDress,
    price: "$125"
  },
  maraisShirtDress: {
    id: "linen-shirt-dress",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Oversized Linen Shirt Dress",
    image: linenShirtDress,
    price: "$135"
  },
  maraisLinenTrousers: {
    id: "linen-trousers",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Drawstring Linen Trousers",
    image: linenTrousers,
    price: "$95"
  },
  maraisBalloonDress: {
    id: "balloon-sleeve-dress",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Linen Balloon-Sleeve Dress",
    image: balloonSleeveDress,
    price: "$145"
  },
  maraisTailoredTrousers: {
    id: "straight-leg-trousers",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Straight-Leg Tailored Trousers",
    image: cutouts.tailoredTrousers,
    price: "$120"
  },
  maraisSneakers: {
    id: "minimal-sneakers",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Minimal Leather Sneakers",
    image: cutouts.leatherSneakers,
    price: "$145",
    color: "White"
  },
  wavelineLaptop: {
    id: "waveline-air-14",
    brandId: "waveline",
    brand: registry.waveline.name,
    title: "Waveline Air 14″",
    image: wavelineLaptop,
    price: "$1,099"
  },
  hearthwareCompact: {
    id: "hearthware-compact",
    brandId: "hearthware",
    brand: registry.hearthware.name,
    title: "Compact Air Fryer",
    image: cutouts.compactAirFryer,
    price: "$89",
    size: "4L"
  },
  hearthwareFamily: {
    id: "hearthware-family",
    brandId: "hearthware",
    brand: registry.hearthware.name,
    title: "Family Air Fryer",
    image: cutouts.familyAirFryer,
    price: "$99",
    size: "6L"
  },
  aeriaCyclonePro: {
    id: "aeria-cyclone-pro",
    brandId: "aeria",
    brand: registry.aeria.name,
    title: "Aeria Cyclone Pro",
    image: cutouts.aeriaCycloneProVacuum,
    price: "$249"
  },
  aeriaCycloneMax: {
    id: "aeria-cyclone-max",
    brandId: "aeria",
    brand: registry.aeria.name,
    title: "Aeria Cyclone Max",
    image: cutouts.aeriaCycloneMaxVacuum,
    price: "$749"
  },
  formworkTask: {
    id: "formwork-task-chair",
    brandId: "formwork",
    brand: registry.formwork.name,
    title: "ErgoFlex Task Chair",
    image: formworkTaskChair,
    price: "$329"
  },
  formworkExecutive: {
    id: "formwork-executive-chair",
    brandId: "formwork",
    brand: registry.formwork.name,
    title: "ContourPro Executive Chair",
    image: formworkExecutiveChair,
    price: "$415"
  },
  goodwellSleep60: {
    id: "sleep60",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Daily Sleep Gummies",
    image: goodwell_sleep_60,
    price: "$29.99",
    size: "60 Count"
  },
  goodwellSleep28: {
    id: "sleep28",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Daily Sleep Gummies",
    image: goodwell_sleep_28,
    price: "$17.99",
    size: "28 Count"
  },
  goodwellEnergy: {
    id: "energy",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Clean Energy Gummies",
    image: goodwell_energy,
    price: "$27.99",
    size: "60 Count"
  },
  goodwellFocus: {
    id: "focus",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Daily Focus Gummies",
    image: goodwell_focus,
    price: "$27.99",
    size: "60 Count"
  },
  goodwellCalm: {
    id: "calm",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Calm Mood Gummies",
    image: goodwell_calm,
    price: "$26.99",
    size: "60 Count"
  },
  goodwellImmunity: {
    id: "immunity",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Immunity Gummies",
    image: goodwell_immunity,
    price: "$24.99",
    size: "60 Count"
  },
  moonrestSleep: {
    id: "moonrest-sleep",
    brandId: "moonrest",
    brand: registry["moonrest"].name,
    title: "Moonrest Sleep",
    image: moonrest_sleep,
    price: "$19.99",
    size: "25 servings"
  },
  aurelleAnklet: {
    id: "anklet-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Beaded Gold Anklet",
    image: aurelleAnkletImage,
    price: "$89"
  },
  aurellePendant: {
    id: "pendant-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Teardrop Pendant Necklace",
    image: aurellePendantImage,
    price: "$129"
  },
  aurelleBracelet: {
    id: "bracelet-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Chain-Link Bracelet",
    image: aurelleBraceletImage,
    price: "$109"
  },
  aurelleRosePendant: {
    id: "pendant-2-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Teardrop Pendant",
    image: aurelleRosePendantImage,
    price: "$135"
  },
  aurelleHalo: {
    id: "pendant-2-2",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Halo Pendant",
    image: aurelleHaloImage,
    price: "$149"
  },
  aurelleBar: {
    id: "pendant-2-3",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Bar Pendant",
    image: aurelleBarImage,
    price: "$119"
  },
  aurelleBoxChain: {
    id: "chain-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Fine Box Chain",
    image: aurelleBoxChainImage,
    price: "$59"
  },
  aurelleSnakeChain: {
    id: "chain-2",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Snake Chain",
    image: aurelleSnakeChainImage,
    price: "$65"
  },
  aurelleCurbChain: {
    id: "chain-3",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Curb Chain",
    image: aurelleCurbChainImage,
    price: "$72"
  },
  amberTripod: {
    id: "tripod-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Warm Tripod Table Lamp",
    image: cutouts.tripodLamp,
    price: "$128"
  },
  amberDome: {
    id: "mushroom-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Mod Dome Table Lamp",
    image: cutouts.domeLamp,
    price: "$145"
  },
  amberBedside: {
    id: "bedside-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Copper-Rim Bedside Lamp",
    image: cutouts.bedsideLamp,
    price: "$98"
  },
  amberOpalGlass: {
    id: "amber-oak-opal-glass-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Opal Glass Table Lamp",
    image: amberOpalLampImage,
    price: "$138"
  },
  amberPleatedLinen: {
    id: "amber-oak-pleated-linen-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Pleated Linen Table Lamp",
    image: amberPleatedLampImage,
    price: "$118"
  },
  dusklightArc: {
    id: "dusklight-arc",
    brandId: "dusklight",
    brand: registry["dusklight"].name,
    title: "Arc Task Light",
    image: dusklight_arc,
    price: "$240"
  },
  dusklightLinear: {
    id: "dusklight-linear",
    brandId: "dusklight",
    brand: registry["dusklight"].name,
    title: "Linear Pendant",
    image: dusklight_linear,
    price: "$420"
  },
  crestlineHelmet: {
    id: "crestline-enduro",
    brandId: "crestline",
    brand: registry["crestline"].name,
    title: "Enduro MTB Helmet",
    image: crestlineHelmet,
    price: "$180",
    color: "Graphite"
  },
  brewhausMachine: {
    id: "brewhaus-machine",
    brandId: "brewhaus",
    brand: registry["brewhaus"].name,
    title: "Pro Espresso Machine",
    image: cutouts.espressoMachine,
    price: "$449"
  },
  brewhausKit: {
    id: "brewhaus-kit",
    brandId: "brewhaus",
    brand: registry["brewhaus"].name,
    title: "Milk Frother, Reusable Filter & Starter Pack",
    image: cutouts.accessoryBundle,
    price: "$65"
  },
  sorelleCream: {
    id: "sorelle-cream",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Deep Hydration Cream",
    image: sorelleCreamImage,
    price: "$42"
  },
  sorelleLotion: {
    id: "sorelle-lotion",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Barrier Repair Lotion",
    image: sorelleLotionImage,
    price: "$34"
  },
  sorelleGel: {
    id: "sorelle-gel",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Cloud Gel Moisturizer",
    image: sorelleGelImage,
    price: "$29"
  },
  sorelleSet: {
    id: "sorelle-set",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Deep Hydration Set",
    image: sorelleSetImage,
    price: "$55"
  },
  sorelleVitaminC: {
    id: "sorelle-vitamin-c",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Vitamin C Serum",
    image: vitaminCSerum,
    price: "$68"
  },
  sorelleHydrating: {
    id: "daily-hydrating-serum",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Daily Hydrating Serum",
    image: hydratingSerum,
    price: "$68"
  },
  sorelleCalming: {
    id: "calming-serum-30ml",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Calming Serum",
    image: calmingSerum,
    price: "$52",
    size: "30 ml"
  },
  audenIvory: {
    id: "ivory",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Studio — Ivory",
    image: cutouts.audenIvory,
    price: "$499",
    color: "Ivory"
  },
  audenOlive: {
    id: "olive",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Endurance — Olive",
    image: cutouts.audenOlive,
    price: "$549",
    color: "Olive"
  },
  audenMustard: {
    id: "mustard",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Air — Mustard",
    image: cutouts.audenMustard,
    price: "$599",
    color: "Mustard"
  },
  audenBlack: {
    id: "auden-wave-pro-black",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Wave Pro",
    image: cutouts.auden,
    price: "$699",
    color: "Black"
  },
  maraisShirtIvory: {
    id: "marais-shirt-ivory",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Relaxed Cotton Shirt",
    image: cutouts.cottonShirt,
    price: "$110",
    color: "Ivory"
  },
  maraisShirtOlive: {
    id: "marais-shirt-olive",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Relaxed Cotton Shirt",
    image: cutouts.oliveCottonShirt,
    price: "$110",
    color: "Olive",
    size: "M"
  },
  maraisEyewearCase: {
    id: "leather-case",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Leather Frame Case",
    image: cutouts.leatherFrameCase,
    price: "$45"
  },
  strideSneakersBlack: {
    id: "stride-sneakers-black",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Minimal Leather Sneakers",
    image: cutouts.blackLeatherSneakers,
    price: "$145",
    color: "Black",
    size: "US 9"
  },
  lumenSecondSkin: {
    id: "lumen-second-skin",
    brandId: "lumen",
    brand: registry.lumen.name,
    title: "Second Skin Foundation",
    image: cutouts.foundation,
    price: "$38"
  },
  lumenSkinVeil: {
    id: "lumen-skin-veil",
    brandId: "lumen",
    brand: registry.lumen.name,
    title: "Skin Veil Foundation SPF 25",
    image: cutouts.skinVeilFoundation,
    price: "$38"
  },
  lumenTrueMatch: {
    id: "lumen-true-match",
    brandId: "lumen",
    brand: registry.lumen.name,
    title: "True Match Fluid Foundation",
    image: cutouts.trueMatchFoundation,
    price: "$36"
  },
  proteinWhey: {
    id: "proteinmax-whey-2lb",
    brandId: "proteinmax",
    brand: registry.proteinmax.name,
    title: "Proteinmax 100% Whey Protein",
    image: proteinTub,
    price: "$63.32",
    size: "2.17 LB"
  },
  holtCardholder: {
    id: "holt-cardholder",
    brandId: "holt-and-co",
    brand: registry["holt-and-co"].name,
    title: "Leather Card Holder",
    image: cutouts.leatherCardholder,
    price: "$18"
  },
  formworkMesh: {
    id: "formwork-mesh-chair",
    brandId: "formwork",
    brand: registry.formwork.name,
    title: "Mesh Office Chair",
    image: officeChair,
    price: "$389",
    color: "Graphite"
  }
};
const goodwellSocialAd = "/images/dynamic-landing-pages/v2/assets/goodwell-social-ad-v1-DbWVCc2n.webp";
const addressIcon = "/images/dynamic-landing-pages/v2/assets/address-QPOEXXur.svg";
const igMore = "/images/dynamic-landing-pages/v2/assets/ig-more-DwYmQdK1.svg";
const igChevron = "/images/dynamic-landing-pages/v2/assets/ig-chevron-DsNho9PV.svg";
const adLine = "/images/dynamic-landing-pages/v2/assets/line-ad-store-CAVooD0N.svg";
const dropLine = "/images/dynamic-landing-pages/v2/assets/line-store-drop-Blt947kP.svg";
const contextLost = "/images/dynamic-landing-pages/v2/assets/tile-context-lost-BqZFEITe.svg";
const dropOff = "/images/dynamic-landing-pages/v2/assets/tile-drop-off-CvSRB7K-.svg";
const products$1 = [catalog.goodwellSleep60, catalog.goodwellEnergy, catalog.goodwellFocus, catalog.goodwellCalm];
const delay = (ms) => ({ "--d": `${ms}ms` });
function RoasGap({ motion = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!motion || !el || !("IntersectionObserver" in window)) return;
    el.classList.add("is-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-playing");
        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motion]);
  return /* @__PURE__ */ jsxs("div", { ref, className: "roas roas--wellness", children: [
    /* @__PURE__ */ jsx("section", { className: "stage stage--ad", children: /* @__PURE__ */ jsxs("article", { className: "shell ig fx fx--fade", style: delay(0), children: [
      /* @__PURE__ */ jsxs("header", { className: "ig__head fx", style: delay(100), children: [
        /* @__PURE__ */ jsxs("div", { className: "ig__profile", children: [
          /* @__PURE__ */ jsx(BrandMark, { brand: "Goodwell", className: "ig__avatar" }),
          /* @__PURE__ */ jsxs("div", { className: "ig__name", children: [
            /* @__PURE__ */ jsx(BrandName, { brand: "Goodwell" }),
            /* @__PURE__ */ jsx("small", { children: "Sponsored" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "ig__more", src: igMore, alt: "" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ig__media fx", style: delay(210), children: /* @__PURE__ */ jsx("img", { src: goodwellSocialAd, alt: "Goodwell Daily Sleep, Calm Mood and Daily Focus gummies" }) }),
      /* @__PURE__ */ jsxs("div", { className: "ig__cta fx", style: delay(320), children: [
        "Shop now ",
        /* @__PURE__ */ jsx("span", { className: "ig__cta-end", children: /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" }) })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "ig__caption fx", style: delay(430), children: [
        /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: "Goodwell" }) }),
        " Better sleep. No melatonin. Find your evening routine. ",
        /* @__PURE__ */ jsx("span", { className: "ig__tags", children: "#melatoninfree #sleep" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "stage stage--store", children: /* @__PURE__ */ jsxs("article", { className: "shell store fx fx--fade", style: delay(1800), children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome fx", style: delay(1880), children: [
        /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
          /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
          /* @__PURE__ */ jsx("span", { children: "goodwell.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "nav fx", style: delay(1960), children: [
        /* @__PURE__ */ jsx("span", { className: "nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: "Goodwell" }) }),
        /* @__PURE__ */ jsx("span", { className: "nav__links", children: [40, 52, 36, 46].map((width) => /* @__PURE__ */ jsx("i", { className: "bar", style: { width } }, width)) }),
        /* @__PURE__ */ jsxs("span", { className: "nav__icons", children: [
          /* @__PURE__ */ jsx("i", { className: "bar" }),
          /* @__PURE__ */ jsx("i", { className: "bar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hero fx", style: delay(2010), children: [
        /* @__PURE__ */ jsx("div", { className: "hero__img", children: products$1.slice(0, 3).map((p) => /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title }, p.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "hero__copy", children: [
          /* @__PURE__ */ jsx("h2", { children: "Everyday wellness" }),
          /* @__PURE__ */ jsx("span", { className: "btn", children: "Shop All" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shelf fx", style: delay(2120), children: [
        "Best sellers ",
        /* @__PURE__ */ jsx("i", { className: "bar" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid", children: products$1.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "card fx", style: delay(2230 + i * 110), children: [
        /* @__PURE__ */ jsx("div", { className: "media", children: /* @__PURE__ */ jsx("img", { src: p.image, alt: `${p.brand} ${p.title}, ${p.size}` }) }),
        /* @__PURE__ */ jsxs("div", { className: "card__meta", children: [
          /* @__PURE__ */ jsxs("div", { className: "card__top", children: [
            /* @__PURE__ */ jsx("h4", { children: p.title }),
            /* @__PURE__ */ jsx("span", { className: "card__price", children: p.price })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "card__sub", children: p.size })
        ] })
      ] }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("img", { className: "line line--ad fx-line", style: { "--d1": "640ms", "--d2": "1380ms" }, src: adLine, alt: "" }),
    /* @__PURE__ */ jsx("img", { className: "line line--drop fx-line fx-line--full", style: { "--d1": "2920ms" }, src: dropLine, alt: "" }),
    /* @__PURE__ */ jsxs("div", { className: "marker marker--lost", children: [
      /* @__PURE__ */ jsx("div", { className: "tile", children: /* @__PURE__ */ jsx("img", { className: "fx", style: delay(1030), src: contextLost, alt: "" }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "fx", style: delay(1140), children: "Context lost" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "marker marker--drop", children: [
      /* @__PURE__ */ jsx("div", { className: "tile", children: /* @__PURE__ */ jsx("img", { className: "fx", style: delay(3230), src: dropOff, alt: "" }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "fx", style: delay(3340), children: "Drop-off" }) })
    ] })
  ] });
}
function RoasGapMotion() {
  return /* @__PURE__ */ jsx(RoasGap, { motion: true });
}
function RoasGapMweb() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const roas = el.querySelector(".roas");
    el.classList.add("is-armed");
    roas == null ? void 0 : roas.classList.add("is-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-playing");
        roas == null ? void 0 : roas.classList.add("is-playing");
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("div", { ref, className: "rgc", children: /* @__PURE__ */ jsx("div", { className: "rgc-scale", children: /* @__PURE__ */ jsxs("div", { className: "rgc-strip", children: [
    /* @__PURE__ */ jsx(RoasGap, {}),
    /* @__PURE__ */ jsx("i", { className: "rgc-run" }),
    /* @__PURE__ */ jsx("img", { className: "rgc-drop-tile", src: dropOff, alt: "" }),
    /* @__PURE__ */ jsx("span", { className: "rgc-drop-label", children: "Drop-off" })
  ] }) }) });
}
const history = "/images/dynamic-landing-pages/v2/assets/history-BevL6311.svg";
const add = "/images/dynamic-landing-pages/v2/assets/add-Cbob5SpL.svg";
const expand = "/images/dynamic-landing-pages/v2/assets/expand-DCmbcy1L.svg";
const close = "/images/dynamic-landing-pages/v2/assets/close-DsdKJYzC.svg";
const send = "/images/dynamic-landing-pages/v2/assets/send-ciTszH9F.svg";
const favorite = "/images/dynamic-landing-pages/v2/assets/favorite-CUi59LNH.svg";
const insight$1 = "/images/dynamic-landing-pages/v2/assets/insight-uAQ9aztG.svg";
const caretDown = "/images/dynamic-landing-pages/v2/assets/caret-down-SLWfN0GR.svg";
const aiStatus = "/images/dynamic-landing-pages/v2/assets/ai-status-BrMkXQfp.svg";
const historyGold = "/images/dynamic-landing-pages/v2/assets/history-gold-BJyNNDvb.svg";
const addGold = "/images/dynamic-landing-pages/v2/assets/add-gold-BsVrGX-2.svg";
const expandGold = "/images/dynamic-landing-pages/v2/assets/expand-gold-DMlB4LYO.svg";
const closeGold = "/images/dynamic-landing-pages/v2/assets/close-gold-C4NzsZzj.svg";
const sendGold = "/images/dynamic-landing-pages/v2/assets/send-gold-Vhul_k2n.svg";
const addMuted = "/images/dynamic-landing-pages/v2/assets/add-muted-BR3d4Eat.svg";
const sparkle = "/images/dynamic-landing-pages/v2/assets/sparkle-DD7f07RS.svg";
const lock = "/images/dynamic-landing-pages/v2/assets/lock-Ct-i8Zkt.svg";
const shieldCheck = "/images/dynamic-landing-pages/v2/assets/shield-check-ButlZpGU.svg";
const checks = "/images/dynamic-landing-pages/v2/assets/checks-Cn5ndNQt.svg";
const union = "/images/dynamic-landing-pages/v2/assets/union-DvakWNG_.svg";
const sourceDot = "/images/dynamic-landing-pages/v2/assets/source-dot-FmkgXLjm.svg";
const money = "/images/dynamic-landing-pages/v2/assets/money-BRnIy4Hf.svg";
const userSound = "/images/dynamic-landing-pages/v2/assets/user-sound-B1mWE2AQ.svg";
const warning = "/images/dynamic-landing-pages/v2/assets/warning-B_MVWxpy.svg";
const caretRight = "/images/dynamic-landing-pages/v2/assets/caret-right-N4DMqoC_.svg";
const search = "/images/dynamic-landing-pages/v2/assets/search-6aT0QOjO.svg";
const spark = "/images/dynamic-landing-pages/v2/assets/spark-CL1SvstU.svg";
const usersThree = "/images/dynamic-landing-pages/v2/assets/users-three-CNldQr4E.svg";
const shoppingCart = "/images/dynamic-landing-pages/v2/assets/shopping-cart-9S1-ijDB.svg";
const funnel = "/images/dynamic-landing-pages/v2/assets/funnel-DtM1xN-e.svg";
const bell = "/images/dynamic-landing-pages/v2/assets/bell-hYUBIbcW.svg";
const glyphs = {
  history,
  add,
  expand,
  close,
  send,
  favorite,
  insight: insight$1,
  caretDown,
  aiStatus,
  historyGold,
  addGold,
  expandGold,
  closeGold,
  sendGold,
  addMuted,
  sparkle,
  lock,
  shieldCheck,
  checks,
  union,
  sourceDot,
  money,
  userSound,
  warning,
  caretRight,
  search,
  address: addressIcon,
  spark,
  usersThree,
  shoppingCart,
  funnel,
  bell
};
const naturalSize = {
  history: { width: 13.5696, height: 13.5696 },
  add: { width: 13.5696, height: 13.5696 },
  expand: { width: 13.5696, height: 13.5696 },
  close: { width: 13.5696, height: 13.5696 },
  send: { width: 20, height: 20 },
  favorite: { width: 10, height: 10 },
  insight: { width: 16.4468, height: 16.1409 },
  caretDown: { width: 12.1689, height: 12.1689 },
  aiStatus: { width: 10.0015, height: 10.0015 },
  historyGold: { width: 14, height: 14 },
  addGold: { width: 14, height: 14 },
  expandGold: { width: 14, height: 14 },
  closeGold: { width: 14, height: 14 },
  sendGold: { width: 20, height: 20 },
  addMuted: { width: 18, height: 18 },
  sparkle: { width: 22.6887, height: 22.6887 },
  lock: { width: 19.8527, height: 19.8527 },
  shieldCheck: { width: 12, height: 12 },
  checks: { width: 13.7578, height: 13.7578 },
  union: { width: 24, height: 16.7451 },
  sourceDot: { width: 4.4406, height: 4.4406 },
  money: { width: 24, height: 24 },
  userSound: { width: 24, height: 24 },
  warning: { width: 24, height: 24 },
  caretRight: { width: 24, height: 24 },
  search: { width: 10, height: 10 },
  address: { width: 10, height: 11 },
  spark: { width: 9.64762, height: 9.64762 },
  usersThree: { width: 16, height: 16 },
  shoppingCart: { width: 16, height: 16 },
  funnel: { width: 16, height: 16 },
  bell: { width: 16, height: 16 }
};
function Icon({ name, size }) {
  const { width, height } = naturalSize[name];
  const scale = size ? size / width : 1;
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: glyphs[name],
      alt: "",
      "aria-hidden": "true",
      width: width * scale,
      height: height * scale,
      style: { display: "block" }
    }
  );
}
function BrowserChrome({ url: url2, field = "address" }) {
  return /* @__PURE__ */ jsxs("div", { className: `ill-browser-chrome ill-browser-chrome--${field}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
      /* @__PURE__ */ jsx(Icon, { name: field === "search" ? "search" : "address" }),
      /* @__PURE__ */ jsx("span", { children: url2 })
    ] })
  ] });
}
function Media({ src, alt }) {
  if (src) {
    return /* @__PURE__ */ jsx("img", { className: `ill-media${cutoutSrcs.has(src) ? " ill-media--cutout" : ""}`, src, alt });
  }
  return /* @__PURE__ */ jsx("div", { className: "ill-media ill-media--placeholder", role: "img", "aria-label": alt });
}
const starFilled = "/images/dynamic-landing-pages/v2/assets/star-filled-H5Ymy-7D.svg";
const starEmpty = "/images/dynamic-landing-pages/v2/assets/star-empty-CaQMISUB.svg";
function Rating({ value, count }) {
  const filled = Math.round(value);
  return /* @__PURE__ */ jsxs("div", { className: "ill-rating", children: [
    /* @__PURE__ */ jsx("div", { className: "ill-rating__stars", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx("img", { src: i < filled ? starFilled : starEmpty, alt: "", width: 9, height: 9 }, i)) }),
    /* @__PURE__ */ jsxs("span", { className: "ill-rating__count", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
function Button({ appearance, label, onClick, iconLeading, iconTrailing, className }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: ["ill-button", `ill-button--${appearance}`, className].filter(Boolean).join(" "), onClick, children: [
    iconLeading,
    label,
    iconTrailing
  ] });
}
function StaggerText({ text, boldText }) {
  const words2 = text.split(/\s+/).filter(Boolean);
  const boldWords = boldText ? boldText.split(/\s+/).filter(Boolean) : [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    words2.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("span", { className: "ill-stagger-text__word", style: { animationDelay: `${i * 45}ms` }, children: word }),
      i < words2.length - 1 || boldWords.length ? " " : ""
    ] }, `plain-${i}`)),
    boldWords.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        "strong",
        {
          className: "ill-stagger-text__word",
          style: { animationDelay: `${(words2.length + i) * 45}ms` },
          children: word
        }
      ),
      i < boldWords.length - 1 ? " " : ""
    ] }, `bold-${i}`))
  ] });
}
// The images were converted to WebP in public/ (the .png names 404ed).
const asset = (name) => `${"/images/dynamic-landing-pages/v2/"}assets/${name}.webp`;
const sellDynamicProducts = {
  weekender: catalog.trailwellWeekender.image,
  roam: catalog.trailwellRoam.image,
  overnight: catalog.trailwellOvernight.image,
  sleep60: catalog.goodwellSleep60.image,
  sleep28: catalog.goodwellSleep28.image,
  energy: catalog.goodwellEnergy.image,
  focus: catalog.goodwellFocus.image,
  calm: catalog.goodwellCalm.image,
  moonrestSleep: catalog.moonrestSleep.image,
  cream: catalog.sorelleCream.image,
  set: catalog.sorelleSet.image,
  aeroPaceTrail: asset("stride-aero-pace-trail"),
  tempoGlide: asset("stride-tempo-glide")
};
const driftDaily2 = "/images/dynamic-landing-pages/v2/assets/drift-daily-2-stone-CivZqN3P.webp";
const mayaAvatar = "/images/dynamic-landing-pages/v2/assets/avatar-maya-lLPCp7lN.webp";
const leoAvatar = "/images/dynamic-landing-pages/v2/assets/avatar-leo-ByAgXtts.webp";
const supportAgentPortrait = "/images/dynamic-landing-pages/v2/assets/avatar-sara-DY1GK0X7.webp";
const { aeroPaceTrail, tempoGlide } = sellDynamicProducts;
const prefGroups = [["returning", "size", "colour", "comfort", "previous"]];
const shoppers = [
  {
    id: "maya",
    initials: "MR",
    avatar: mayaAvatar,
    name: "Maya R.",
    summary: "Returning · 3 orders",
    tone: "strong",
    prefs: [
      { key: "returning", label: "Purchase history", value: "3 orders" },
      { key: "size", label: "Usual size", value: "UK 9" },
      { key: "colour", label: "Prefers", value: "Black" },
      { key: "comfort", label: "Shops for", value: "Comfort" }
    ],
    owned: { image: driftDaily2, title: "Drift Daily 2", note: "Owns the previous model" },
    pdp: {
      title: "Cushioning for your everyday runs",
      colour: "black",
      size: "9",
      compare: {
        title: "Upgrade from your previous pair",
        model: "Drift Daily 2",
        image: driftDaily2,
        stats: [
          { value: "18%", label: "softer" },
          { value: "24 g", label: "lighter" }
        ]
      },
      reviewTags: ["Comfort", "Fit"],
      reviews: [
        { text: "Softest pair I've run in. No break-in at all.", by: "Verified · UK 9", stars: 5 },
        { text: "True to size, same fit as the Drift Daily 2.", by: "Verified · UK 9", stars: 5 }
      ]
    }
  },
  {
    id: "leo",
    initials: "LK",
    avatar: leoAvatar,
    name: "Leo K.",
    summary: "Returning · 5 orders",
    tone: "aubergine",
    prefs: [
      { key: "returning", label: "Purchase history", value: "5 orders" },
      { key: "size", label: "Usual size", value: "UK 11" },
      { key: "colour", label: "Prefers", value: "Navy" },
      { key: "comfort", label: "Shops for", value: "Long runs" }
    ],
    owned: { image: aeroPaceTrail, title: "Aero Pace Trail", note: "Runs trail on weekends" },
    pdp: {
      title: "Built for your long road miles",
      colour: "navy",
      size: "11",
      compare: {
        title: "Your road pair for the week",
        model: "Aero Pace Trail",
        image: aeroPaceTrail,
        stats: [
          { value: "90 g", label: "lighter" },
          { value: "+6 mm", label: "cushion" }
        ]
      },
      reviewTags: ["Durability", "Long runs"],
      reviews: [
        { text: "400 km in and the foam still feels fresh.", by: "Verified · UK 11", stars: 5 },
        { text: "Comfortable past the half-marathon mark.", by: "Verified · UK 11", stars: 5 }
      ]
    }
  },
  {
    id: "sara",
    initials: "SP",
    avatar: supportAgentPortrait,
    name: "Sara P.",
    summary: "Returning · 2 orders",
    tone: "gold",
    prefs: [
      { key: "returning", label: "Purchase history", value: "2 orders" },
      { key: "size", label: "Usual size", value: "UK 6" },
      { key: "colour", label: "Prefers", value: "Burgundy" },
      { key: "comfort", label: "Shops for", value: "Speed" }
    ],
    owned: { image: tempoGlide, title: "Tempo Glide", note: "Race-day pair" },
    pdp: {
      title: "A lighter trainer for your faster days",
      colour: "burgundy",
      size: "6",
      compare: {
        title: "Pairs with your race-day shoe",
        model: "Tempo Glide",
        image: tempoGlide,
        stats: [
          { value: "+20%", label: "cushion" },
          { value: "Same", label: "fit" }
        ]
      },
      reviewTags: ["Lightweight", "Speed"],
      reviews: [
        { text: "Light enough for tempo runs, soft enough for easy days.", by: "Verified · UK 6", stars: 5 },
        { text: "Snappy toe-off. Fits like my Tempo Glide.", by: "Verified · UK 6", stars: 5 }
      ]
    }
  }
];
const GENERIC_HOLD_MS = 2200;
const INTRO_MS = 900;
const REVEAL_MS = 560;
const UPDATING_MS = 450;
const LANDING_MS = 700;
const SETTLED_PAUSE_MS = 600;
const READ_PAUSE_MS = 2400;
const CARD_EXIT_MS = 420;
const CARD_SETTLE_MS = 560;
const first = shoppers[0].id;
const initial = { state: 1, shopper: first, sources: {}, revealed: [], active: [], loading: [] };
function buildTimeline() {
  const steps2 = [
    { frame: () => initial, ms: GENERIC_HOLD_MS },
    { frame: (f) => ({ ...f, state: 2 }), ms: INTRO_MS }
  ];
  shoppers.forEach((s, i) => {
    for (const group of prefGroups) {
      steps2.push({ frame: (f) => ({ ...f, revealed: [...f.revealed, ...group], active: group }), ms: REVEAL_MS });
      steps2.push({ frame: (f) => ({ ...f, loading: group }), ms: UPDATING_MS });
      steps2.push({
        frame: (f) => ({ ...f, loading: [], sources: { ...f.sources, ...Object.fromEntries(group.map((k) => [k, s.id])) } }),
        ms: LANDING_MS
      });
      steps2.push({ frame: (f) => ({ ...f, active: [] }), ms: SETTLED_PAUSE_MS });
    }
    steps2.push({ frame: (f) => f, ms: READ_PAUSE_MS });
    const next = shoppers[i + 1];
    if (next) {
      steps2.push({ frame: (f) => ({ ...f, exiting: s.id, shopper: next.id, revealed: [] }), ms: CARD_EXIT_MS });
      steps2.push({ frame: (f) => ({ ...f, exiting: void 0 }), ms: CARD_SETTLE_MS });
    }
  });
  return steps2;
}
buildTimeline();
function Tag({ prefix = "Powered by", brand: brand2 = "Crossword" }) {
  return /* @__PURE__ */ jsxs("span", { className: "ill-tag", children: [
    /* @__PURE__ */ jsx(Icon, { name: "spark", size: 10 }),
    /* @__PURE__ */ jsxs("span", { className: "ill-tag__label", children: [
      /* @__PURE__ */ jsx("span", { className: "ill-tag__prefix", children: prefix }),
      /* @__PURE__ */ jsx("span", { className: "ill-tag__brand", children: brand2 })
    ] })
  ] });
}
function ContentFade() {
  return /* @__PURE__ */ jsx("div", { className: "ill-content-fade", "aria-hidden": "true" });
}
const goldHoopSet = "/images/dynamic-landing-pages/v2/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const pearlDropSet = "/images/dynamic-landing-pages/v2/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const citrineStudSet = "/images/dynamic-landing-pages/v2/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
}
function IconButton({ icon, label, variant, onClick, className }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: ["ill-icon-button", `ill-icon-button--${variant}`, className].filter(Boolean).join(" "),
      "aria-label": label,
      onClick,
      children: /* @__PURE__ */ jsx("span", { className: icon === "send" || icon === "sendGold" ? "ill-icon-button__glyph--rotated" : void 0, children: /* @__PURE__ */ jsx(Icon, { name: icon, size: variant === "accent" ? 20 : void 0 }) })
    }
  );
}
function ChatHeader({
  brand: brand2,
  showHistory = true,
  showAdd = true,
  showExpand = true,
  showClose = true,
  onClose
}) {
  const showControlsLeft = showHistory || showAdd;
  const registered = Object.values(registry).some((entry) => entry.name.toLowerCase() === brand2.toLowerCase());
  return /* @__PURE__ */ jsxs("header", { className: "ill-chat-header", children: [
    showControlsLeft && /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
      showHistory && /* @__PURE__ */ jsx(IconButton, { icon: "history", label: "History", variant: "outline" }),
      showAdd && /* @__PURE__ */ jsx(IconButton, { icon: "add", label: "New conversation", variant: "outline" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ill-chat-header__brand", children: registered ? /* @__PURE__ */ jsx(BrandWordmark, { brand: brand2 }) : brand2 }),
    /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
      showExpand && /* @__PURE__ */ jsx(IconButton, { icon: "expand", label: "Expand", variant: "outline" }),
      showClose && /* @__PURE__ */ jsx(IconButton, { icon: "close", label: "Close", variant: "outline", onClick: onClose })
    ] })
  ] });
}
const MAX_LINES = 5;
function GrowComposer({ value = "Ask anything...", typing = false }) {
  const textRef = useRef(null);
  const [lines, setLines] = useState(1);
  useLayoutEffect(() => {
    const el = textRef.current;
    const content2 = el == null ? void 0 : el.querySelector(".ill-grow-composer__content");
    if (!el || !content2) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    setLines(Math.round(content2.offsetHeight / lh));
  }, [value, typing]);
  const className = [
    "ill-chat-composer ill-grow-composer",
    lines > 1 && "ill-grow-composer--multiline",
    lines > MAX_LINES && "ill-grow-composer--capped"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("span", { ref: textRef, className: "ill-chat-composer__text ill-grow-composer__text", children: /* @__PURE__ */ jsx("span", { className: "ill-grow-composer__clip", children: /* @__PURE__ */ jsxs("span", { className: "ill-grow-composer__content", children: [
      value,
      typing && /* @__PURE__ */ jsx("span", { className: "ill-chat-composer__caret" })
    ] }) }) }),
    /* @__PURE__ */ jsx(IconButton, { icon: "send", label: "Send", variant: "accent" })
  ] });
}
function ChatComposer({
  value = "Ask anything...",
  typing = false,
  variant = "default",
  visible = true,
  sending = false
}) {
  if (variant === "expanded") {
    return /* @__PURE__ */ jsxs("div", { className: `ill-chat-composer--expanded${visible ? "" : " ill-chat-composer--expanded--hidden"}`, children: [
      /* @__PURE__ */ jsxs("p", { className: "ill-chat-composer--expanded__text", children: [
        value,
        typing && /* @__PURE__ */ jsx("span", { className: "ill-chat-composer__caret" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-chat-composer--expanded__row", children: [
        /* @__PURE__ */ jsxs("span", { className: "ill-chat-composer--expanded__upload", children: [
          /* @__PURE__ */ jsx(Icon, { name: "addMuted", size: 18 }),
          "Upload file"
        ] }),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            icon: "sendGold",
            label: "Send",
            variant: "accent",
            className: sending ? "ill-icon-button--pressed" : void 0
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "ill-chat-composer", children: [
    /* @__PURE__ */ jsx("span", { className: `ill-chat-composer__text${typing ? " ill-chat-composer__text--typing" : ""}`, children: typing ? /* @__PURE__ */ jsxs("span", { className: "ill-chat-composer__line", children: [
      value,
      /* @__PURE__ */ jsx("span", { className: "ill-chat-composer__caret" })
    ] }) : value }),
    /* @__PURE__ */ jsx(IconButton, { icon: "send", label: "Send", variant: "accent" })
  ] });
}
const ConversationViewport = forwardRef(
  function ConversationViewport2({ children }, ref) {
    return /* @__PURE__ */ jsxs("div", { className: "ill-conversation-viewport", children: [
      /* @__PURE__ */ jsx("div", { className: "ill-conversation-viewport__content", ref, children }),
      /* @__PURE__ */ jsx(ContentFade, {})
    ] });
  }
);
function Shell({
  brand: brand2,
  children,
  width,
  height,
  composerValue,
  composerTyping,
  viewportRef,
  rootRef,
  header,
  composer: composer2,
  growComposer = false,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: ["ill-shell", className].filter(Boolean).join(" "),
      style: width && height ? { width, height } : void 0,
      ref: rootRef,
      children: [
        header ?? /* @__PURE__ */ jsx(ChatHeader, { brand: brand2 }),
        /* @__PURE__ */ jsx(ConversationViewport, { ref: viewportRef, children }),
        composer2 ?? (growComposer ? /* @__PURE__ */ jsx(GrowComposer, { value: composerValue, typing: composerTyping }) : /* @__PURE__ */ jsx(ChatComposer, { value: composerValue, typing: composerTyping }))
      ]
    }
  );
}
function ProductCollection({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-product-collection", children });
}
function ProductMeta({
  brand: brand2,
  title,
  subtitle,
  price,
  rating,
  ratingCount,
  density = "card"
}) {
  if (density === "pdp") {
    return /* @__PURE__ */ jsxs("div", { className: "ill-product-meta ill-product-meta--pdp", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-product-meta__pdp-top", children: [
        brand2 && /* @__PURE__ */ jsx("p", { className: "ill-product-meta__brand-pdp", children: brand2 }),
        /* @__PURE__ */ jsx(Icon, { name: "caretDown" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "ill-product-meta__title-pdp", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "ill-product-meta__subtitle", children: subtitle }),
      rating !== void 0 && ratingCount && /* @__PURE__ */ jsx(Rating, { value: rating, count: ratingCount }),
      price && /* @__PURE__ */ jsx("p", { className: "ill-product-meta__price-pdp", children: price })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "ill-product-meta", children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-product-meta__row", children: [
      brand2 && /* @__PURE__ */ jsx("p", { className: "ill-product-meta__brand", children: brand2 }),
      price && /* @__PURE__ */ jsx("p", { className: "ill-product-meta__price", children: price })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "ill-product-meta__title", children: title }),
    rating !== void 0 && ratingCount && /* @__PURE__ */ jsx(Rating, { value: rating, count: ratingCount })
  ] });
}
function SkeletonBlock({
  width,
  height,
  aspectRatio,
  radius
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "ill-skeleton-block",
      style: {
        width,
        height,
        aspectRatio,
        borderRadius: radius
      }
    }
  );
}
function useLineCount(root, selector, max = Infinity) {
  const [lines, setLines] = useState(1);
  useLayoutEffect(() => {
    var _a;
    const el = (_a = root.current) == null ? void 0 : _a.querySelector(selector);
    if (!el) return;
    const measure2 = () => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
      setLines(Math.min(Math.max(tops.size, 1), max));
    };
    measure2();
    const observer = new ResizeObserver(measure2);
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, selector, max]);
  return lines;
}
function ChatMessage({ role, text, children }) {
  if (role === "user") {
    return /* @__PURE__ */ jsx("div", { className: "ill-chat-message ill-chat-message--user", children: /* @__PURE__ */ jsx("p", { children: children ?? text }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "ill-chat-message ill-chat-message--assistant", children: /* @__PURE__ */ jsx("p", { children: children ?? text }) });
}
function UserTurn({
  children,
  animateIn = false,
  className
}) {
  const classes = ["ill-user-turn", animateIn && "ill-user-turn--enter", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: classes, children });
}
function AssistantTurn({
  children,
  animateIn = false,
  className
}) {
  const classes = ["ill-assistant-turn", animateIn && "ill-assistant-turn--enter", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: classes, children });
}
function AiPills({ options, selectedId }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-ai-pills", children: options.map((option) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: option.id === selectedId ? "ill-ai-pill ill-ai-pill--selected" : "ill-ai-pill",
      children: [
        /* @__PURE__ */ jsx(Icon, { name: "insight", size: 16 }),
        /* @__PURE__ */ jsx("span", { children: option.text })
      ]
    },
    option.id
  )) });
}
function RecommendationProductCard({
  product: product2,
  loading = false,
  resolveDelayMs,
  cta = false,
  ctaAppearance = "accent"
}) {
  const cardRef = useRef(null);
  const titleLines = useLineCount(cardRef, ".ill-rec-card__title");
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsxs("article", { className: `ill-rec-card${cta ? " ill-rec-card--cta" : ""}`, ref: cardRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-rec-card__media", children: [
      /* @__PURE__ */ jsx("div", { className: "ill-rec-card__media-bleed", children: /* @__PURE__ */ jsx(Media, { src: product2.image, alt: product2.name }) }),
      /* @__PURE__ */ jsx("div", { className: "ill-rec-card__favorite", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { name: "favorite" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ill-rec-card__text", children: product2.brand || product2.price ? /* @__PURE__ */ jsx(ProductMeta, { brand: product2.brand, title: product2.name, price: product2.price }) : /* @__PURE__ */ jsx("p", { className: "ill-rec-card__title", children: product2.name }) }),
    cta && /* @__PURE__ */ jsx(Button, { appearance: ctaAppearance, label: "Add to cart" }),
    showOverlay && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `ill-rec-card__skeleton-overlay${loading ? "" : " ill-rec-card__skeleton-overlay--hidden"}`,
        style: resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : void 0,
        children: [
          /* @__PURE__ */ jsx("div", { className: "ill-rec-card__media", children: /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: "100%", radius: 16 }) }),
          /* @__PURE__ */ jsx("div", { className: "ill-rec-card__text-skeleton", children: Array.from({ length: titleLines }, (_, i) => /* @__PURE__ */ jsx("div", { className: "ill-rec-card__text-skeleton-line", children: /* @__PURE__ */ jsx(SkeletonBlock, { width: i === titleLines - 1 ? "60%" : "100%", height: 11, radius: 4 }) }, i)) }),
          cta && /* @__PURE__ */ jsx(SkeletonBlock, { height: 30, radius: 112.792 })
        ]
      }
    )
  ] });
}
function StoreNavItems() {
  return /* @__PURE__ */ jsxs("div", { className: "store-nav-items", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {})
  ] });
}
const brand$a = "Aurelle";
function ChatHead({ brand: store } = {}) {
  return /* @__PURE__ */ jsxs("header", { className: "gj2-head", children: [
    /* @__PURE__ */ jsxs("div", { className: "gj2-head__group", children: [
      /* @__PURE__ */ jsx(Puck, { label: "Chat history", children: /* @__PURE__ */ jsx(HistoryGlyph, {}) }),
      /* @__PURE__ */ jsx(Puck, { label: "New chat", children: /* @__PURE__ */ jsx(PlusGlyph, {}) })
    ] }),
    store ? /* @__PURE__ */ jsx(StoreIdentity, { name: store }) : /* @__PURE__ */ jsx(AureliaIdentity, {}),
    /* @__PURE__ */ jsxs("div", { className: "gj2-head__group", children: [
      /* @__PURE__ */ jsx(Puck, { label: "More", children: /* @__PURE__ */ jsx(DotsGlyph, {}) }),
      /* @__PURE__ */ jsx(Puck, { label: "Close", children: /* @__PURE__ */ jsx(CloseGlyph, {}) })
    ] })
  ] });
}
function AureliaIdentity() {
  return /* @__PURE__ */ jsxs("div", { className: "gj2-head__identity", children: [
    /* @__PURE__ */ jsx(AureliaMark, { className: "gj2-head__logo" }),
    /* @__PURE__ */ jsx("span", { className: "gj2-head__name", children: brand$a })
  ] });
}
function StoreIdentity({ name }) {
  return /* @__PURE__ */ jsxs("div", { className: "gj2-head__identity", children: [
    /* @__PURE__ */ jsx(BrandMark, { brand: name, className: "gj2-head__logo" }),
    /* @__PURE__ */ jsx(BrandName, { brand: name, className: "gj2-head__name" })
  ] });
}
function ChatFoot({ value }) {
  const valueRef = useRef(null);
  const [height, setHeight] = useState(void 0);
  useLayoutEffect(() => {
    var _a;
    if (!value) {
      setHeight(void 0);
      return;
    }
    const content2 = ((_a = valueRef.current) == null ? void 0 : _a.offsetHeight) ?? 0;
    setHeight(Math.max(48, content2 + 12));
  }, [value]);
  return /* @__PURE__ */ jsxs("footer", { className: "gj2-foot", children: [
    /* @__PURE__ */ jsxs("div", { className: "gj2-composer", style: height ? { height } : void 0, children: [
      value ? /* @__PURE__ */ jsxs("span", { className: "gj2-composer__value", ref: valueRef, children: [
        value,
        /* @__PURE__ */ jsx("span", { className: "gj2-caret", "aria-hidden": "true" })
      ] }) : /* @__PURE__ */ jsx("span", { className: "gj2-composer__placeholder", children: "Ask anything" }),
      /* @__PURE__ */ jsx("span", { className: value ? "gj2-send gj2-send--ready" : "gj2-send", "aria-label": "Send", children: /* @__PURE__ */ jsx(ArrowUpGlyph, {}) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "gj2-note", children: [
      "AI can make mistakes. Powered by ",
      /* @__PURE__ */ jsx("u", { children: "Crossword" })
    ] })
  ] });
}
function AureliaMark({ className }) {
  return /* @__PURE__ */ jsx("span", { className: ["aurelia-mark", className].filter(Boolean).join(" "), "aria-hidden": "true", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Aurelle", className: "legacy-supplied-mark" }) });
}
function Followups({ items, picked, className }) {
  return /* @__PURE__ */ jsx("div", { className: ["gj2-followups", className].filter(Boolean).join(" "), children: items.map((text) => /* @__PURE__ */ jsx("span", { className: text === picked ? "gj2-followup gj2-followup--picked" : "gj2-followup", children: text }, text)) });
}
function Rail({ products: products2, loading = false, ctaLabel, className }) {
  return /* @__PURE__ */ jsx("div", { className: className ? `gj2-rail ${className}` : "gj2-rail", children: products2.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, loading, resolveDelayMs: i * 80, ctaLabel }, p.id)) });
}
function ProductCard({
  product: product2,
  added: added2 = false,
  lone = false,
  loading,
  resolveDelayMs = 0,
  adding = false,
  addingDelayMs = 0,
  ctaLabel = "Add"
}) {
  return /* @__PURE__ */ jsxs("article", { className: ["gj2-card", lone && "gj2-card--lone"].filter(Boolean).join(" "), "data-product-id": product2.id, "data-product-brand": product2.brand, children: [
    loading !== void 0 && /* @__PURE__ */ jsxs(
      "div",
      {
        className: loading ? "gj2-skel" : "gj2-skel gj2-skel--hidden",
        style: { transitionDelay: loading ? "0ms" : `${resolveDelayMs}ms` },
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsx("span", { className: "gj2-skel__media" }),
          /* @__PURE__ */ jsx("span", { className: "gj2-skel__line gj2-skel__line--brand" }),
          /* @__PURE__ */ jsx("span", { className: "gj2-skel__line gj2-skel__line--name" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__tile", children: [
      product2.image && /* @__PURE__ */ jsx(ProductImage, { src: product2.image, alt: product2.title, style: product2.imageFit ? { objectFit: product2.imageFit } : void 0 }),
      product2.tag && /* @__PURE__ */ jsx("span", { className: "gj2-badge", children: product2.tag }),
      /* @__PURE__ */ jsx("span", { className: "gj2-card__expand", "aria-label": "Expand", children: /* @__PURE__ */ jsx(CornersOutGlyph, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__col", children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-card__caption", children: product2.brand }),
      /* @__PURE__ */ jsx("span", { className: "gj2-card__title", children: product2.title }),
      product2.subtitle && /* @__PURE__ */ jsx("span", { className: "gj2-card__caption", children: product2.subtitle }),
      product2.rating !== void 0 && /* @__PURE__ */ jsx(Stars, { value: product2.rating, count: product2.ratingCount ?? "" }),
      product2.price && /* @__PURE__ */ jsx("span", { className: "gj2-card__price", children: product2.price })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__actions", children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-puck", "aria-label": "Save for later", children: /* @__PURE__ */ jsx(HeartGlyph, {}) }),
      /* @__PURE__ */ jsx("span", { className: "gj2-puck", "aria-label": "Chat about this", children: /* @__PURE__ */ jsx(ChatDoorGlyph, {}) }),
      added2 && adding ? /* @__PURE__ */ jsxs("span", { className: "gj2-cta gj2-cta--lifecycle", style: { "--gj2-cta-delay": `${addingDelayMs}ms` }, children: [
        /* @__PURE__ */ jsx("span", { className: "gj2-cta__fill" }),
        /* @__PURE__ */ jsx("span", { className: "gj2-cta__phase gj2-cta__phase--adding", children: "Adding…" }),
        /* @__PURE__ */ jsxs("span", { className: "gj2-cta__phase gj2-cta__phase--done", children: [
          /* @__PURE__ */ jsx(CheckCircleGlyph, {}),
          "Added"
        ] })
      ] }) : added2 ? /* @__PURE__ */ jsxs("span", { className: "gj2-cta gj2-cta--done", children: [
        /* @__PURE__ */ jsx(CheckCircleGlyph, {}),
        "Added"
      ] }) : /* @__PURE__ */ jsxs("span", { className: "gj2-cta", children: [
        /* @__PURE__ */ jsx(PlusGlyph, { size: 18, trim: true }),
        ctaLabel
      ] })
    ] })
  ] });
}
function Stars({ value, count }) {
  return /* @__PURE__ */ jsxs("span", { className: "gj2-rating", children: [
    /* @__PURE__ */ jsxs("span", { className: "gj2-rating__stars", "aria-label": `${value} out of 5`, children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-rating__empty", children: "★★★★★" }),
      /* @__PURE__ */ jsx("span", { className: "gj2-rating__fill", style: { width: `${value / 5 * 100}%` }, children: "★★★★★" })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "gj2-rating__count", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
function Puck({ label, children }) {
  return /* @__PURE__ */ jsx("span", { className: "gj2-head__puck", "aria-label": label, children });
}
const glyph = {
  viewBox: "0 0 256 256",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 16,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function HistoryGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 16, height: 16, children: [
    /* @__PURE__ */ jsx("polyline", { points: "128 80 128 128 168 152" }),
    /* @__PURE__ */ jsx("polyline", { points: "72 104 32 104 32 64" }),
    /* @__PURE__ */ jsx("path", { d: "M67.6,192A88,88,0,1,0,65.8,65.8C55.4,76.3,46.2,86.4,32,104" })
  ] });
}
function PlusGlyph({ size = 16, trim = false }) {
  const box = trim ? size * 192 / 256 : size;
  return /* @__PURE__ */ jsxs("svg", { ...glyph, viewBox: trim ? "32 32 192 192" : glyph.viewBox, width: box, height: box, children: [
    /* @__PURE__ */ jsx("line", { x1: "40", y1: "128", x2: "216", y2: "128" }),
    /* @__PURE__ */ jsx("line", { x1: "128", y1: "40", x2: "128", y2: "216" })
  ] });
}
function DotsGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 256 256", width: 16, height: 16, fill: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "128", cy: "128", r: "12" }),
    /* @__PURE__ */ jsx("circle", { cx: "196", cy: "128", r: "12" }),
    /* @__PURE__ */ jsx("circle", { cx: "60", cy: "128", r: "12" })
  ] });
}
function CloseGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 16, height: 16, children: [
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "56", x2: "56", y2: "200" }),
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "200", x2: "56", y2: "56" })
  ] });
}
function ArrowUpGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 16, height: 16, children: [
    /* @__PURE__ */ jsx("line", { x1: "128", y1: "216", x2: "128", y2: "40" }),
    /* @__PURE__ */ jsx("polyline", { points: "56 112 128 40 200 112" })
  ] });
}
function CornersOutGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 18, height: 18, children: [
    /* @__PURE__ */ jsx("polyline", { points: "168 48 208 48 208 88" }),
    /* @__PURE__ */ jsx("polyline", { points: "88 208 48 208 48 168" }),
    /* @__PURE__ */ jsx("polyline", { points: "208 168 208 208 168 208" }),
    /* @__PURE__ */ jsx("polyline", { points: "48 88 48 48 88 48" })
  ] });
}
function HeartGlyph() {
  return /* @__PURE__ */ jsx("svg", { ...glyph, width: 18, height: 18, children: /* @__PURE__ */ jsx("path", { d: "M128,216S24,160,24,94A54,54,0,0,1,128,73.19h0A54,54,0,0,1,232,94C232,160,128,216,128,216Z" }) });
}
function ChatDoorGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "2.5 3.758 25 25", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("path", { d: "M15 7.5H8.5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1.5v3.5l4.5-3.5h5a3 3 0 0 0 3-3V15" }),
    /* @__PURE__ */ jsx("path", { d: "M21 5.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" })
  ] });
}
function CheckCircleGlyph() {
  const box = 18 * 208 / 256;
  return /* @__PURE__ */ jsx("svg", { viewBox: "24 24 208 208", width: box, height: box, fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" }) });
}
const brand$9 = "Amber & Oak";
function Nav({ searching, merchant = brand$9 }) {
  return /* @__PURE__ */ jsxs("header", { className: "ill-chat-header ais-nav", children: [
    /* @__PURE__ */ jsx("span", { className: "ais-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: merchant }) }),
    /* @__PURE__ */ jsx(StoreNavItems, {}),
    /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
      /* @__PURE__ */ jsxs("span", { className: "ais-nav__ask", children: [
        /* @__PURE__ */ jsx(Icon, { name: "spark", size: 10 }),
        "Ask AI"
      ] }),
      /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline", className: searching ? "ais-nav__search--active" : void 0 }),
      /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Cart", variant: "outline" })
    ] })
  ] });
}
const sleepThreeQuarter = "/images/dynamic-landing-pages/v2/assets/goodwell-sleep-three-quarter-CwUI_ana.webp";
const sleepElevated = "/images/dynamic-landing-pages/v2/assets/goodwell-sleep-elevated-T1ADQ_Ns.webp";
const gummies = {
  sleep60: { ...catalog.goodwellSleep60, image: catalog.goodwellSleep60.image, name: "Daily Sleep Gummies", variant: "60 Count", price: "$29.99", rating: 4.8, reviews: "2,140" },
  sleep28: { ...catalog.goodwellSleep28, image: catalog.goodwellSleep28.image, name: "Daily Sleep Gummies", variant: "28 Count", price: "$17.99", rating: 4.7, reviews: "860" },
  energy: { ...catalog.goodwellEnergy, image: catalog.goodwellEnergy.image, name: "Clean Energy Gummies", variant: "60 Count", price: "$27.99", rating: 4.6, reviews: "1,310" },
  focus: { ...catalog.goodwellFocus, image: catalog.goodwellFocus.image, name: "Daily Focus Gummies", variant: "60 Count", price: "$27.99", rating: 4.7, reviews: "980" },
  calm: { ...catalog.goodwellCalm, image: catalog.goodwellCalm.image, name: "Calm Mood Gummies", variant: "60 Count", price: "$26.99", rating: 4.5, reviews: "720" }
};
({
  gallery: [
    { src: catalog.goodwellSleep60.image, alt: "Goodwell Daily Sleep Gummies, 60 count — front view" },
    { src: sleepThreeQuarter, alt: "Goodwell Daily Sleep Gummies — three-quarter view" },
    { src: sleepElevated, alt: "Goodwell Daily Sleep Gummies — elevated lid view" },
    { src: goodwellSocialAd, alt: "Daily Sleep with Calm Mood and Daily Focus in the Goodwell campaign" }
  ]
});
const brand$8 = "Goodwell";
const domain$4 = "goodwell.com";
const serp = {
  query: "goodwell vs moonrest",
  url: "google.com/search?q=goodwell+vs+moonrest",
  tabs: ["AI Mode", "All", "Shopping", "Images", "Videos", "Forums", "More", "Tools"],
  productsLabel: "Sponsored Products",
  products: [gummies.sleep60, gummies.sleep28, gummies.energy, gummies.focus, gummies.calm],
  resultsLabel: "Sponsored Results",
  ad: {
    title: "Goodwell or Moonrest Sleep?",
    // Shown truncated on the page; the full copy sits behind "See more".
    description: "Two brands. A clear look at the labels, pack sizes, and prices.",
    sitelinks: ["Daily Sleep Gummies", "Bundle & Save", "Shop All"]
  }
};
const landing$1 = {
  path: "goodwell.com/compare/moonrest",
  // Shown truncated on the page; the full copy sits behind "See more".
  description: "Nightly L‑Theanine and chamomile gummies",
  seeMore: "See more",
  cta: "Add to cart"
};
const pdpProduct = gummies.sleep60;
const comparisonTitle = "Goodwell vs Moonrest";
const products = [
  { id: "goodwell", brand: "Goodwell", name: "Goodwell", sub: "30 servings", image: sellDynamicProducts.sleep60 },
  { id: "moonrest", brand: "Moonrest", name: "Moonrest", sub: "25 servings", image: sellDynamicProducts.moonrestSleep }
];
const rows = [
  { id: "price", label: "Price", values: [catalog.goodwellSleep60.price, catalog.moonrestSleep.price] },
  { id: "gummies", label: "Gummies", values: ["60", "50"] },
  { id: "servings", label: "Servings", values: ["30", "25"] },
  { id: "per-serving", label: "Per serving", values: ["$1.00", "$0.80"] },
  { id: "melatonin", label: "Melatonin", values: ["Melatonin‑free", "Contains melatonin"], highlight: true },
  { id: "ingredients", label: "Ingredients", values: ["L-Theanine, Chamomile", "Melatonin, Chamomile"] }
];
const takeaway = {
  headline: "One has melatonin.",
  body: "Goodwell Sleep is melatonin-free. Moonrest Sleep contains melatonin."
};
const G_ICONS = {
  close: /* @__PURE__ */ jsx("path", { d: "M6 6l12 12M18 6L6 18", stroke: "#5f6368", strokeWidth: "2", strokeLinecap: "round" }),
  mic: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3", fill: "#4285f4" }),
    /* @__PURE__ */ jsx("path", { d: "M6 11a6 6 0 0012 0M12 17v4", stroke: "#34a853", strokeWidth: "2", fill: "none", strokeLinecap: "round" })
  ] }),
  lens: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", fill: "none", stroke: "#4285f4", strokeWidth: "2", strokeDasharray: "6 4" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3", fill: "#ea4335" })
  ] }),
  search: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "10.5", cy: "10.5", r: "6", fill: "none", stroke: "#4285f4", strokeWidth: "2.4" }),
    /* @__PURE__ */ jsx("path", { d: "M15 15l5 5", stroke: "#4285f4", strokeWidth: "2.4", strokeLinecap: "round" })
  ] }),
  next: /* @__PURE__ */ jsx("path", { d: "M10 6l6 6-6 6", stroke: "#1a73e8", strokeWidth: "2", fill: "none", strokeLinecap: "round" }),
  caret: /* @__PURE__ */ jsx("path", { d: "M7 10l5 5 5-5z", fill: "#5f6368" }),
  dots: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "5", r: "1.8", fill: "#5f6368" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1.8", fill: "#5f6368" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "19", r: "1.8", fill: "#5f6368" })
  ] }),
  up: /* @__PURE__ */ jsx("path", { d: "M6 15l6-6 6 6", stroke: "#5f6368", strokeWidth: "2", fill: "none", strokeLinecap: "round" })
};
function G({ name, size = 16 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, children: G_ICONS[name] });
}
const LOGO = [["G", "#4285f4"], ["o", "#ea4335"], ["o", "#fbbc05"], ["g", "#4285f4"], ["l", "#34a853"], ["e", "#ea4335"]];
function Serp({ picked }) {
  return /* @__PURE__ */ jsxs("div", { className: picked ? "gs gs--picked" : "gs", "data-name": "Serp", children: [
    /* @__PURE__ */ jsxs("header", { className: "gs-head", "data-name": "Search header", children: [
      /* @__PURE__ */ jsx("span", { className: "gs-logo", children: LOGO.map(([c, col], i) => /* @__PURE__ */ jsx("span", { style: { color: col }, children: c }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "gs-bar", children: [
        /* @__PURE__ */ jsx("span", { className: "gs-bar__q", children: serp.query }),
        /* @__PURE__ */ jsx(G, { name: "close", size: 14 }),
        /* @__PURE__ */ jsx("i", { className: "gs-bar__sep" }),
        /* @__PURE__ */ jsx(G, { name: "mic" }),
        /* @__PURE__ */ jsx(G, { name: "lens" }),
        /* @__PURE__ */ jsx(G, { name: "search" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "gs-tabs", children: serp.tabs.map((t) => /* @__PURE__ */ jsxs("span", { className: t === "All" ? "gs-tab gs-tab--active" : "gs-tab", children: [
      t,
      (t === "More" || t === "Tools") && /* @__PURE__ */ jsx(G, { name: "caret", size: 12 })
    ] }, t)) }),
    /* @__PURE__ */ jsxs("section", { className: "gs-products", "data-name": "Sponsored products", children: [
      /* @__PURE__ */ jsxs("p", { className: "gs-h", children: [
        serp.productsLabel,
        " ",
        /* @__PURE__ */ jsx(G, { name: "dots", size: 12 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "gs-carousel", children: [
        serp.products.map((g) => /* @__PURE__ */ jsxs("article", { className: "gs-card", "data-name": `Card / ${g.name} ${g.variant}`, children: [
          /* @__PURE__ */ jsx("div", { className: "gs-card__media", children: /* @__PURE__ */ jsx("img", { src: g.image, alt: "" }) }),
          /* @__PURE__ */ jsxs("p", { className: "gs-card__name", children: [
            /* @__PURE__ */ jsx("span", { children: g.name }),
            /* @__PURE__ */ jsx("span", { children: g.variant })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "gs-card__price", children: g.price }),
          /* @__PURE__ */ jsx("p", { className: "gs-card__seller", children: brand$8 })
        ] }, g.id)),
        /* @__PURE__ */ jsx("span", { className: "gs-next", children: /* @__PURE__ */ jsx(G, { name: "next", size: 14 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "gs-results", children: [
      /* @__PURE__ */ jsx("p", { className: "gs-h gs-h--rule", children: serp.resultsLabel }),
      /* @__PURE__ */ jsxs("article", { className: "gs-ad", "data-name": "Sponsored result", children: [
        /* @__PURE__ */ jsxs("div", { className: "gs-ad__source", children: [
          /* @__PURE__ */ jsx(BrandMark, { brand: brand$8, className: "gs-ad__logo" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("b", { children: brand$8 }),
            /* @__PURE__ */ jsxs("small", { children: [
              "https://www.",
              domain$4
            ] })
          ] }),
          /* @__PURE__ */ jsx(G, { name: "dots", size: 12 })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "gs-ad__title", children: serp.ad.title }),
        /* @__PURE__ */ jsx("p", { className: "gs-ad__desc", children: serp.ad.description }),
        /* @__PURE__ */ jsx("p", { className: "gs-ad__links", children: serp.ad.sitelinks.map((l, i) => /* @__PURE__ */ jsxs("span", { children: [
          i > 0 && " · ",
          /* @__PURE__ */ jsx("a", { children: l })
        ] }, l)) })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "gs-hide", children: [
        "Hide sponsored results ",
        /* @__PURE__ */ jsx(G, { name: "up", size: 12 })
      ] })
    ] })
  ] });
}
function Pdp$2() {
  const p = pdpProduct;
  return /* @__PURE__ */ jsxs("section", { className: "cmp-hero", "data-name": "Product", children: [
    /* @__PURE__ */ jsxs("div", { className: "cmp-hero__gallery", children: [
      /* @__PURE__ */ jsx("div", { className: "cmp-hero__media", children: /* @__PURE__ */ jsx("img", { src: p.image, alt: `${p.name}, ${p.variant}` }) }),
      /* @__PURE__ */ jsx("div", { className: "cmp-hero__thumbs", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: i === 0 ? "ais-gallery__thumb cmp-hero__thumb cmp-hero__thumb--active" : "ais-gallery__thumb cmp-hero__thumb", children: /* @__PURE__ */ jsx("img", { src: p.image, alt: "" }) }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ais-details", children: [
      /* @__PURE__ */ jsxs("div", { className: "ais-details__head", children: [
        /* @__PURE__ */ jsx("h2", { children: p.name }),
        /* @__PURE__ */ jsxs("div", { className: "ais-details__meta", children: [
          /* @__PURE__ */ jsxs("span", { className: "ais-details__price", children: [
            p.price,
            /* @__PURE__ */ jsxs("span", { className: "cmp-variant", children: [
              " · ",
              p.variant
            ] })
          ] }),
          /* @__PURE__ */ jsx(Rating, { value: p.rating, count: p.reviews })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "cmp-desc", children: [
        landing$1.description,
        /* @__PURE__ */ jsx("span", { className: "cmp-desc__more", children: landing$1.seeMore })
      ] }),
      /* @__PURE__ */ jsx(Button, { appearance: "primary", label: landing$1.cta, className: "ais-details__cta" })
    ] })
  ] });
}
function Words({ text, from = 0 }) {
  return /* @__PURE__ */ jsx(Fragment, { children: text.split(" ").map((w, i) => /* @__PURE__ */ jsxs("span", { className: "cmp-word", style: { "--w": from + i }, children: [
    i > 0 && " ",
    w
  ] }, i)) });
}
const CELLS = ["label", "value-a", "value-b"];
const cx$2 = (...n) => n.filter(Boolean).join(" ");
function Comparison({ step, stream = false }) {
  return /* @__PURE__ */ jsxs("section", { className: step === 5 ? "cmp-module cmp-module--focus" : "cmp-module", "data-name": "Comparison", children: [
    /* @__PURE__ */ jsx("span", { className: "cmp-module__tag", children: /* @__PURE__ */ jsx(Tag, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "cmp-module__title", "data-name": step === 5 ? "Insight" : "Title", children: [
      /* @__PURE__ */ jsx(Icon, { name: "insight" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { children: step === 5 ? stream ? /* @__PURE__ */ jsx(Words, { text: takeaway.headline }) : takeaway.headline : comparisonTitle }),
        step === 5 && /* @__PURE__ */ jsx("p", { className: "cmp-module__body", children: stream ? /* @__PURE__ */ jsx(Words, { text: takeaway.body, from: takeaway.headline.split(" ").length }) : takeaway.body })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "cmp-module__head", children: [
      /* @__PURE__ */ jsx("span", {}),
      products.map((p) => /* @__PURE__ */ jsx("span", { "data-name": `Product / ${p.name}`, children: p.name }, p.id))
    ] }),
    rows.map((r, i) => {
      const loading = step === 3 && i >= 2;
      return (
        // One markup for both states, so a loading row resolves in place
        // (the motion crossfades each cell's bone to its text). The real
        // text stays in the cell while loading, so the row keeps its 04
        // height; the bone is a rounded bar laid over it.
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cx$2("cmp-row", i >= 2 && "cmp-row--late", loading && "cmp-row--skeleton", r.highlight && step === 5 && "cmp-row--highlight"),
            "data-name": `Row / ${r.label}`,
            "aria-hidden": loading || void 0,
            children: /* @__PURE__ */ jsx("div", { className: "ill-comparison-row", children: [r.label, ...r.values].map((t, c) => /* @__PURE__ */ jsxs("div", { className: `ill-comparison-row__cell ill-comparison-row__${CELLS[c]}`, children: [
              /* @__PURE__ */ jsx("span", { className: "cmp-text", children: t }),
              /* @__PURE__ */ jsx("i", { className: "cmp-bone", style: { "--len": t.length } })
            ] }, c)) })
          },
          r.id
        )
      );
    })
  ] });
}
function Landing$2({ step, stream }) {
  return /* @__PURE__ */ jsxs("div", { className: "ais-page", children: [
    /* @__PURE__ */ jsx(Nav, { searching: false }),
    /* @__PURE__ */ jsxs("div", { className: "ais-body", children: [
      /* @__PURE__ */ jsxs("div", { className: "cmp-landing", children: [
        /* @__PURE__ */ jsx(Pdp$2, {}),
        /* @__PURE__ */ jsx(Comparison, { step, stream })
      ] }),
      /* @__PURE__ */ jsx(ContentFade, {})
    ] })
  ] });
}
function isWindowActive() {
  return typeof document !== "undefined" && document.visibilityState === "visible" && document.hasFocus();
}
function useLandedOnScreen(ref) {
  const [intersecting, setIntersecting] = useState(false);
  const [windowActive, setWindowActive] = useState(isWindowActive);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold: 0.3
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () => setWindowActive(isWindowActive());
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
    };
  }, []);
  return intersecting && windowActive;
}
function revealText(text, {
  msPerStep,
  jitterMs = msPerStep * 0.3,
  chunk = 1,
  onTick,
  onDone
}) {
  let cancelled = false;
  let i = 0;
  let timeoutId;
  const step = () => {
    if (cancelled) return;
    i = Math.min(text.length, i + chunk);
    onTick(text.slice(0, i));
    if (i >= text.length) {
      onDone();
      return;
    }
    const jitter = (Math.random() * 2 - 1) * jitterMs;
    timeoutId = window.setTimeout(step, Math.max(8, msPerStep + jitter));
  };
  timeoutId = window.setTimeout(step, msPerStep);
  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };
}
const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_SINGLE_MS = 600;
const THINKING_EXIT_MS = 150;
const CHAR_INTERVAL_MS = 26;
const REPLY_STAGGER_MS$1 = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
const APPEAR_MS = 450;
const LOAD_MS = 650;
const FIRST_COMPOSE_LEAD_MS = 350;
const NEXT_COMPOSE_LEAD_MS = 900;
const SENT_SETTLE_MS = 220;
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount(text) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}
function replyRevealMs(text) {
  return wordCount(text) * REPLY_STAGGER_MS$1 + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}
function useChatTimeline(beats2, active) {
  const reducedMotion = useRef(prefersReducedMotion()).current;
  const [index, setIndex] = useState(reducedMotion ? beats2.length : 0);
  const [typed, setTyped] = useState({ index: -1, value: "" });
  const [thinkStage, setThinkStage] = useState({ index: -1, stage: 0 });
  const [exitingIndex, setExitingIndex] = useState(-1);
  const [runKey, setRunKey] = useState(0);
  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setIndex(0);
      setTyped({ index: -1, value: "" });
      setThinkStage({ index: -1, stage: 0 });
      setExitingIndex(-1);
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);
  useEffect(() => {
    if (reducedMotion || !active || index >= beats2.length) return;
    const beat = beats2[index];
    const timeouts = [];
    let cancelReveal;
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    const next = () => setIndex((i) => i + 1);
    const cleanup = () => {
      cancelReveal == null ? void 0 : cancelReveal();
      timeouts.forEach(window.clearTimeout);
    };
    switch (beat.type) {
      case "compose": {
        if (!beat.text) {
          after(beat.holdMs ?? 700, next);
          break;
        }
        const text = beat.text;
        after(beat.leadMs ?? (index === 0 ? FIRST_COMPOSE_LEAD_MS : NEXT_COMPOSE_LEAD_MS), () => {
          cancelReveal = revealText(text, {
            msPerStep: beat.msPerChar ?? CHAR_INTERVAL_MS,
            onTick: (value) => setTyped({ index, value }),
            onDone: () => after(SENT_SETTLE_MS, next)
          });
        });
        break;
      }
      case "think": {
        let holdMs = THINKING_SINGLE_MS;
        if (beat.labels.length === 2) {
          after(THINKING_STAGE_1_MS, () => setThinkStage({ index, stage: 1 }));
          holdMs = THINKING_STAGE_1_MS + THINKING_STAGE_2_MS;
        }
        after(holdMs, () => setExitingIndex(index));
        after(holdMs + THINKING_EXIT_MS, next);
        break;
      }
      case "text":
        after(replyRevealMs(beat.text), next);
        break;
      case "appear":
        after(beat.ms ?? APPEAR_MS, next);
        break;
      case "load":
        after(beat.ms ?? LOAD_MS, next);
        break;
      case "pause":
        after(beat.ms, next);
        break;
    }
    return cleanup;
  }, [index, active, reducedMotion, beats2]);
  return useMemo(() => {
    const at2 = (id) => {
      const i = beats2.findIndex((b) => b.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current = beats2[index];
    const typedValue = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= at2(id),
      passed: (id) => index > at2(id),
      loading: (id) => index === at2(id),
      status: (id) => {
        const beat = beats2[index];
        if (index !== at2(id) || beat.type !== "think") return null;
        const stage = thinkStage.index === index ? thinkStage.stage : 0;
        return { label: beat.labels[stage] ?? beat.labels[0], visible: exitingIndex !== index };
      },
      composer: (current == null ? void 0 : current.type) === "compose" && current.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats2.length,
      reducedMotion,
      runKey
    };
  }, [beats2, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}
function cubicBezier(p1x, p1y, p2x, p2y) {
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx2 = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;
  const sampleX = (t) => ((ax * t + bx) * t + cx2) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx2;
  const solveT = (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleX(t) - x;
      const derivative = sampleDerivativeX(t);
      if (Math.abs(derivative) < 1e-6) break;
      t -= xEst / derivative;
    }
    return t;
  };
  return (x) => sampleY(solveT(x));
}
const drawerEase = cubicBezier(0.32, 0.72, 0, 1);
function animateScrollTo(el, to, durationMs = 320) {
  const from = el.scrollTop;
  const delta = to - from;
  if (Math.abs(delta) < 1) return () => {
  };
  let cancelled = false;
  const start = performance.now();
  const step = (now) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / durationMs);
    el.scrollTop = from + delta * drawerEase(t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return () => {
    cancelled = true;
  };
}
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    var _a;
    let cancelled = false;
    (((_a = document.fonts) == null ? void 0 : _a.ready) ?? Promise.resolve()).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}
function useFollowLatest$1(scrollerRef, {
  thread,
  pin,
  focus,
  clearance = 0,
  pinOffset = 0,
  shownOnly,
  index,
  reducedMotion
}) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    const threadEl = scroller == null ? void 0 : scroller.querySelector(thread);
    if (!scroller || !threadEl) return;
    let cancelScroll;
    const follow = () => {
      const box = scroller.getBoundingClientRect();
      const scale = scroller.offsetHeight ? box.height / scroller.offsetHeight : 1;
      const toContent = (y) => (y - box.top) / scale + scroller.scrollTop;
      let bottom = threadEl.getBoundingClientRect().bottom;
      if (shownOnly) {
        bottom = threadEl.getBoundingClientRect().top;
        threadEl.querySelectorAll("*").forEach((el) => {
          if (el.closest(shownOnly) || el.querySelector(shownOnly)) return;
          bottom = Math.max(bottom, el.getBoundingClientRect().bottom);
        });
        bottom += parseFloat(getComputedStyle(threadEl).paddingBottom) || 0;
      }
      let target = Math.max(0, toContent(bottom) - scroller.clientHeight + clearance);
      const pins = pin ? threadEl.querySelectorAll(pin) : null;
      const pinned = pins == null ? void 0 : pins[pins.length - 1];
      const pinTop = pinned ? Math.max(0, toContent(pinned.getBoundingClientRect().top) - pinOffset) : 0;
      target = Math.max(target, pinTop);
      const turns = [...threadEl.children].map((child) => {
        const r = child.getBoundingClientRect();
        return { top: toContent(r.top), bottom: toContent(r.bottom) };
      });
      const nearTop = turns.find((turn) => target > turn.top && target - turn.top <= clearance);
      if (nearTop) target = nearTop.top;
      if (target <= parseFloat(getComputedStyle(scroller).paddingTop) + 1) target = 0;
      const focused = focus ? threadEl.querySelector(focus) : null;
      if (focused) target = Math.max(0, toContent(focused.getBoundingClientRect().top) - 8);
      const cut = turns.some((turn) => turn.top < target - 1 && turn.bottom > target + 1);
      if (scroller.parentElement) scroller.parentElement.dataset.scrolled = String(cut);
      if (Math.abs(target - scroller.scrollTop) < 1) return;
      cancelScroll == null ? void 0 : cancelScroll();
      if (reducedMotion) scroller.scrollTop = target;
      else cancelScroll = animateScrollTo(scroller, target);
    };
    follow();
    const observer = new ResizeObserver(follow);
    observer.observe(threadEl);
    return () => {
      observer.disconnect();
      cancelScroll == null ? void 0 : cancelScroll();
    };
  }, [scrollerRef, thread, pin, focus, clearance, pinOffset, shownOnly, index, reducedMotion]);
}
function cx$1(...names) {
  return names.filter(Boolean).join(" ");
}
const cursorIcon = "/images/dynamic-landing-pages/v2/assets/cursor-Cjz6WH4f.svg";
function TapRing({ target, tap, point }) {
  const ringRef = useRef(null);
  const cursorRef = useRef(null);
  const placed = useRef(false);
  useLayoutEffect(() => {
    var _a, _b;
    const ring = ringRef.current;
    const host = ring == null ? void 0 : ring.offsetParent;
    const el = host == null ? void 0 : host.querySelector(target);
    if (!tap || !ring || !host || !el) return;
    const box = host.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const k = host.offsetWidth ? box.width / host.offsetWidth : 1;
    const at2 = `translate(${(r.left - box.left + r.width / 2) / k}px, ${(r.top - box.top + r.height / 2) / k}px) translate(-50%, -50%)`;
    const animation = ring.animate(
      [
        { transform: `${at2} scale(0.4)`, opacity: 0.6 },
        { transform: `${at2} scale(1)`, opacity: 0 }
      ],
      { duration: 420, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    );
    const press = (_b = (_a = cursorRef.current) == null ? void 0 : _a.firstElementChild) == null ? void 0 : _b.animate(
      [{ transform: "scale(1)" }, { transform: "scale(0.82)" }, { transform: "scale(1)" }],
      { duration: 260, easing: "ease-out" }
    );
    return () => {
      animation.cancel();
      press == null ? void 0 : press.cancel();
    };
  }, [tap, target]);
  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const host = cursor.offsetParent;
    if (!point || !host) {
      cursor.style.opacity = "0";
      placed.current = false;
      return;
    }
    let raf = 0;
    let last = "";
    const place = () => {
      const el = host.querySelector(point);
      if (el) {
        const box = host.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const k = host.offsetWidth ? box.width / host.offsetWidth : 1;
        const x = Math.round((r.left - box.left + r.width / 2) / k);
        const y = Math.round((r.top - box.top + r.height / 2) / k);
        if (!placed.current) {
          cursor.style.transition = "none";
          cursor.style.transform = `translate(${x + 28}px, ${y + 36}px)`;
          void cursor.offsetWidth;
          cursor.style.transition = "";
          placed.current = true;
        }
        const next = `translate(${x}px, ${y}px)`;
        if (next !== last) {
          cursor.style.transform = next;
          last = next;
        }
        cursor.style.opacity = "1";
      }
      raf = requestAnimationFrame(place);
    };
    place();
    return () => cancelAnimationFrame(raf);
  }, [point]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { ref: ringRef, className: "askm-tap", "aria-hidden": "true" }),
    point !== void 0 && /* @__PURE__ */ jsx("span", { ref: cursorRef, className: "tap-cursor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: cursorIcon, width: "26", height: "26", alt: "" }) })
  ] });
}
const beats$8 = [
  // The rest is split so the cursor glides onto the ad for its last 600ms.
  { id: "serp", type: "pause", ms: 1e3 },
  { id: "aim", type: "pause", ms: 600 },
  { id: "pick", type: "appear", ms: 700 },
  { id: "page", type: "appear", ms: 900 },
  { id: "load", type: "load", ms: 1600 },
  { id: "resolve", type: "appear", ms: 1100 },
  { id: "insight", type: "appear", ms: 1200 },
  { id: "hold", type: "pause", ms: 2200 }
];
function ComparisonToolsMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$8, landed && fontsReady);
  const onPage = t.reached("page");
  const step = t.reached("insight") ? 5 : t.reached("resolve") ? 4 : 3;
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$1(
        "ais cmp ctm",
        t.reached("pick") && "ctm--pick",
        onPage && "ctm--page",
        t.reached("resolve") && "ctm--resolved",
        t.reached("insight") && "ctm--insight"
      ),
      children: /* @__PURE__ */ jsxs("article", { className: "ais-store", children: [
        /* @__PURE__ */ jsx(BrowserChrome, { url: onPage ? landing$1.path : serp.url }),
        /* @__PURE__ */ jsxs("div", { className: "ais-viewport", children: [
          /* @__PURE__ */ jsx("div", { className: "ctm-layer ctm-serp", children: /* @__PURE__ */ jsx(Serp, { picked: t.reached("pick") }) }),
          onPage && /* @__PURE__ */ jsx("div", { className: "ctm-layer ctm-page", children: /* @__PURE__ */ jsx(Landing$2, { step, stream: true }) }),
          /* @__PURE__ */ jsx(TapRing, { target: ".gs-ad__title", tap: t.reached("pick") ? 1 : 0, point: t.reached("aim") && !onPage ? ".gs-ad__title" : null })
        ] })
      ] })
    },
    t.runKey
  ) });
}
const personalizedCreative = "/images/dynamic-landing-pages/v2/assets/personalized-content-ad-square-v5-GvDO_T0B.webp";
const brand$7 = "Goodwell";
const domain$3 = "goodwell.com/sleep";
const product$5 = {
  name: catalog.goodwellSleep60.title,
  image: catalog.goodwellSleep60.image,
  price: catalog.goodwellSleep60.price,
  size: "60 gummies"
};
const promise = "Better sleep. No melatonin.";
const ad$4 = {
  cta: "Shop now",
  caption: "Magnesium sleep gummies for calmer nights and clear mornings.",
  tags: "#melatoninfree #sleep"
};
const hero$3 = {
  eyebrow: "From your ad",
  headline: promise,
  sub: "Goodwell Daily Sleep Gummies, with the details you came for."
};
const details = {
  eyebrow: "The gummy from your ad",
  headline: "A closer look at Daily Sleep.",
  sub: "Here's the formula, the key ingredient and the routine in one place.",
  cards: [
    { id: "formula", index: "01 / The formula", title: "No melatonin.", body: "Wind down without the next-morning grogginess." },
    { id: "magnesium", index: "02 / The key ingredient", title: "Magnesium, for calm.", body: "Magnesium glycinate with L‑Theanine and chamomile." },
    { id: "routine", index: "03 / The routine", title: "Two gummies before bed.", body: "30 minutes before lights out. A 30-night supply." }
  ]
};
const purchase = { cta: "Add to cart" };
function Ad$2({ creative = personalizedCreative }) {
  return /* @__PURE__ */ jsxs("article", { className: "adj-shell adj-ig pcx-ad", "data-name": "Ad", children: [
    /* @__PURE__ */ jsxs("header", { className: "adj-ig__head", children: [
      /* @__PURE__ */ jsxs("div", { className: "adj-ig__profile", children: [
        /* @__PURE__ */ jsx("span", { className: "adj-ig__avatar pcx-ad__avatar", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Goodwell", className: "goodwell-supplied-avatar" }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-ig__name", children: [
          /* @__PURE__ */ jsx(BrandName, { brand: brand$7 }),
          /* @__PURE__ */ jsx("small", { children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adj-ig__more", src: igMore, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__media pcx-ad__media", children: [
      /* @__PURE__ */ jsx("img", { className: "pcx-ad__creative", src: creative, alt: `${promise} Goodwell campaign creative` }),
      /* @__PURE__ */ jsx("span", { className: "pcx-ad__jar-anchor", "data-flight-src": product$5.image, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__cta", children: [
      ad$4.cta,
      /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "adj-ig__caption", children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: brand$7 }) }),
      " ",
      ad$4.caption,
      " ",
      /* @__PURE__ */ jsx("span", { children: ad$4.tags })
    ] })
  ] });
}
function Page({ step }) {
  return /* @__PURE__ */ jsxs("div", { className: "ais-page", children: [
    /* @__PURE__ */ jsx(Nav, { searching: false }),
    /* @__PURE__ */ jsxs("div", { className: "ais-body", children: [
      /* @__PURE__ */ jsxs("div", { className: step === 3 ? "pcx-scroll pcx-scroll--details" : "pcx-scroll", children: [
        /* @__PURE__ */ jsxs("section", { className: "pcx-hero", "data-name": "Hero", children: [
          /* @__PURE__ */ jsx("p", { className: "pcx-eyebrow", children: hero$3.eyebrow }),
          /* @__PURE__ */ jsx("h2", { className: "pcx-hero__headline", children: hero$3.headline }),
          /* @__PURE__ */ jsx("p", { className: "pcx-hero__sub", children: hero$3.sub }),
          /* @__PURE__ */ jsx("div", { className: "pcx-hero__media", children: /* @__PURE__ */ jsx("img", { src: product$5.image, alt: `Goodwell ${product$5.name}` }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "pcx-details", "data-name": "Details", children: [
          /* @__PURE__ */ jsx("p", { className: "pcx-eyebrow", children: details.eyebrow }),
          /* @__PURE__ */ jsx("h2", { className: "pcx-details__headline", children: details.headline }),
          /* @__PURE__ */ jsx("p", { className: "pcx-details__sub", children: details.sub }),
          /* @__PURE__ */ jsx("div", { className: "pcx-cards", children: details.cards.map((c) => /* @__PURE__ */ jsxs("article", { className: "pcx-card", "data-name": `Card / ${c.id}`, children: [
            /* @__PURE__ */ jsx("p", { className: "pcx-card__index", children: c.index }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "pcx-card__title", children: c.title }),
              /* @__PURE__ */ jsx("p", { className: "pcx-card__body", children: c.body })
            ] })
          ] }, c.id)) })
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsx(ContentFade, {}),
      step === 3 && /* @__PURE__ */ jsxs("div", { className: "pcx-buy", "data-name": "Purchase", children: [
        /* @__PURE__ */ jsx("img", { src: product$5.image, alt: "" }),
        /* @__PURE__ */ jsxs("div", { className: "pcx-buy__text", children: [
          /* @__PURE__ */ jsx("p", { children: product$5.name }),
          /* @__PURE__ */ jsxs("small", { children: [
            product$5.price,
            " · ",
            product$5.size
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { appearance: "primary", label: purchase.cta })
      ] })
    ] })
  ] });
}
const offerCreative = "/images/dynamic-landing-pages/v2/assets/welcome-offer-ad-square-v5-BFS6ml9C.webp";
const brand$6 = "Goodwell";
const domain$2 = "goodwell.com/welcome";
const product$4 = {
  name: catalog.goodwellSleep60.title,
  size: "60 gummies",
  flavor: "Lavender Berry",
  image: catalog.goodwellSleep60.image,
  price: catalog.goodwellSleep60.price,
  rating: 4.8,
  reviews: "2,140"
};
const offer$1 = {
  percent: "10% off",
  code: "WELCOME10"
};
const ad$3 = {
  // Two lines, like 09's ad, so the tag and jar sit in the same place.
  headline: ["10% off", "your first jar."],
  tag: "Welcome offer · No code needed",
  cta: "Claim 10% off",
  caption: "Daily Sleep Gummies for calmer nights. Your welcome perk is waiting.",
  tags: "#goodwell #sleep"
};
const hero$2 = {
  eyebrow: "From your ad",
  headline: "Your welcome perk is ready."
};
const knock$1 = {
  line: "Welcome! Your 10% off is waiting. Want it on your first jar?",
  doors: [{ label: "No, thanks" }, { label: "Show coupon", primary: true }],
  greet: `Welcome from our ad! As a thank-you, enjoy ${offer$1.percent} your first jar of Daily Sleep Gummies. Here's your code, ready at checkout.`,
  followups: ["Trending now", "Best deals"]
};
function Ad$1() {
  return /* @__PURE__ */ jsxs("article", { className: "adj-shell adj-ig pcx-ad", "data-name": "Ad", children: [
    /* @__PURE__ */ jsxs("header", { className: "adj-ig__head", children: [
      /* @__PURE__ */ jsxs("div", { className: "adj-ig__profile", children: [
        /* @__PURE__ */ jsx("span", { className: "adj-ig__avatar pcx-ad__avatar", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Goodwell", className: "goodwell-supplied-avatar" }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-ig__name", children: [
          /* @__PURE__ */ jsx(BrandName, { brand: brand$6 }),
          /* @__PURE__ */ jsx("small", { children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adj-ig__more", src: igMore, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__media pcx-ad__media", children: [
      /* @__PURE__ */ jsx("img", { className: "pcx-ad__creative", src: offerCreative, alt: `${ad$3.headline.join(" ")} ${ad$3.tag}` }),
      /* @__PURE__ */ jsx("span", { className: "pcx-ad__jar-anchor", "data-flight-src": product$4.image, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__cta ofr-ad__cta", children: [
      ad$3.cta,
      /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "adj-ig__caption", children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: brand$6 }) }),
      " ",
      ad$3.caption,
      " ",
      /* @__PURE__ */ jsx("span", { children: ad$3.tags })
    ] })
  ] });
}
const handWaveUrl = "/images/dynamic-landing-pages/v2/assets/hand-wave-DV6aLLq6.webp";
const BUZZ_NOTE_CSS = `
/* The notification: seated a turn (16px) above the resting bar,
   arriving the way the study draws it — a POP from nothing, growing
   through 105%, easing back through 95% and seating at full, all
   about its own centre. The dismissal SINKS — down past the bar and
   off the floor of the screen, fading as it goes — and a finger can
   drag it the same way. Enter and exit are SEPARATE animations —
   is-out replaces the property, so the finished fill-both pop never
   holds the transform against the leave. */
.wm-bar-buzz-note {
  position: fixed;
  bottom: calc(1.5rem + var(--wm-bar-height, 56px) + 1rem);
  left: 50%;
  /* A settled seat: 360px even, phones excepted — long copy ellipsises
     inside it rather than growing the card. */
  width: min(22.5rem, calc(100vw - 2rem));
  z-index: 30;
  /* A snug (8px) inset on every side; the right adds the close's box
     (1.75rem) plus a step (12px) of air before the words — the words
     keep the same distance from the close as they do from the bell. */
  padding: var(--wm-space-snug, 0.5rem);
  padding-right: calc(
    var(--wm-space-snug, 0.5rem) + 1.75rem + var(--wm-space-step, 0.75rem)
  );
  border-radius: var(--wm-radius-pill, 62.5rem);
  /* The nudge's own ground — the store speaking first — not a white
     card of its own: the wash says whose knock this is. */
  background: var(--wm-surface-nudge, #eef4f0);
  /* The bar's own cast rather than a plate's: the notification floats
     over the page the way the capsule does, and a card's 6% pool read
     as printed on it. */
  box-shadow:
    0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08)),
    var(--wm-shadow-bar, 0 6px 16px rgba(18, 23, 20, 0.1), 0 18px 30px -6px rgba(18, 23, 20, 0.18));
  transform: translate(-50%, 0);
  animation: wm-buzz-in 883ms cubic-bezier(0.33, 0, 0.67, 1) both;
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  /* The card owns its touches — a downward swipe is a dismissal, not
     a scroll. */
  touch-action: none;
}
/* Under the finger the card follows LIVE — the spring-back transition
   waits until the finger lets go. */
.wm-bar-buzz-note.is-dragging {
  transition: none;
}
/* Landed, the arrival lets go — the finished fill-both fall would
   otherwise hold the transform against a later drag. A clock marks
   it, never animationend. */
.wm-bar-buzz-note.is-landed {
  animation: none;
}
/* A hand on the card deepens its cast a little (dictated: no lift,
   anywhere) — the card stands still and settles harder onto the page. */
.wm-bar-buzz-note.is-landed:not(.is-out):hover {
  box-shadow:
    0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08)),
    var(--wm-shadow-bar-hover, 0 8px 20px rgba(18, 23, 20, 0.12), 0 22px 36px -6px rgba(18, 23, 20, 0.22));
}
/* Ignored for five seconds, the card BUZZES — the study's shiver: a
   ±1° turn of the whole pill at four-frame steps, done in half a
   second. The class comes and goes on clocks; its fill releases with
   it, so the hover above gets the transform back the moment the
   shiver ends. */
.wm-bar-buzz-note.is-buzzing {
  animation: wm-buzz-shake 483ms cubic-bezier(0.33, 0, 0.67, 1) both;
}
@keyframes wm-buzz-shake {
  0%,
  100% {
    transform: translate(-50%, 0) rotate(0deg);
  }
  17.2%,
  44.8%,
  72.4% {
    transform: translate(-50%, 0) rotate(1deg);
  }
  31%,
  58.6%,
  86.2% {
    transform: translate(-50%, 0) rotate(-1deg);
  }
}
/* The study's pop, frame for frame: ten frames of nothing, the
   overshoot at 24, the under-swing at 39, seated at 53. */
@keyframes wm-buzz-in {
  0%,
  18.9% {
    transform: translate(-50%, 0) scale(0);
  }
  45.3% {
    transform: translate(-50%, 0) scale(1.05);
  }
  73% {
    transform: translate(-50%, 0) scale(0.95);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
.wm-bar-buzz-note.is-out {
  animation: wm-buzz-out 333ms cubic-bezier(0.55, 0, 1, 0.45) both;
  /* The shrink gathers toward the card's FOOT — the edge meeting the
     bar — so the narrowing reads as the bar taking it in. */
  transform-origin: 50% 100%;
}
/* The sink: from wherever the card stands — its seat, or the finger's
   last held offset (--wm-buzz-y) — down BEHIND the bar: the card drops
   a step in z (below) and ends centred on the bar's own line, the bar
   swallowing it. The card is WIDER than the bar, so it also shrinks as
   it goes — by the time it reaches the bar's line its overhang has
   pulled in and no ears poke past the capsule; the fade only finishes
   what the bar's edges leave. */
@keyframes wm-buzz-out {
  from {
    transform: translate(-50%, var(--wm-buzz-y, 0px)) scale(1);
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  to {
    transform: translate(
        -50%,
        max(calc(50% + (var(--wm-bar-height, 56px) / 2) + 1rem), var(--wm-buzz-y, 0px))
      )
      scale(0.4, 0.7);
    opacity: 0;
  }
}
/* Behind, not over: a dragged or leaving card gives up its raised z
   and falls back on tree order — after the backdrop, before the bar —
   so the acrylic capsule paints over it and swallows the sink. */
.wm-bar-buzz-note.is-dragging,
.wm-bar-buzz-note.is-out {
  z-index: auto;
}
/* One line of furniture: the bell leads, the header speaks, the tease
   whispers under it — a notification row, not a stack. */
.wm-bar-buzz-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* The whole card is the door to the thread it teases. */
  cursor: pointer;
}
/* The white disc, holding the greeting — the study's hand, said with
   the platform's own emoji: no bell, no count; the wave is the news. */
.wm-bar-buzz-note__bell {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--wm-surface-card, #ffffff);
  box-shadow: 0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08));
  color: var(--wm-primary, #004c27);
}
/* The greeting, exactly as the "Hand wave final" study plays it
   (60fps, 121 frames, a second after the knock lands): the study's
   own hand, standing at ONE size the whole time — no growing, no
   shrinking — waving ±30° about the study's null, a swing every 20
   frames: 0 → +30 → −30 → +30 → −30 → 0 across 100. */
.wm-bar-buzz-note__hand {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/* A stage's own mark in the disc — the cart's filled glyph — drawn at
   the hand's own visual size, in the disc's primary ink. */
.wm-bar-buzz-note__glyph {
  width: 1.375rem;
  height: 1.375rem;
}
/* A PRODUCT in the disc — the photograph takes the whole circle, the
   white ground and the mark both standing down; the disc's hairline
   stays on as the photo's frame. */
.wm-bar-buzz-note__product {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
/* The study's hand PNG and its motion-mark strokes share one
   300-unit square, drawn at one 4.75rem seat and both centred on the
   disc — so the marks land exactly where the study put them, and the
   drawn hand (112 of the 300 units) fills the disc the way an icon
   would. The wave turns about the study's own null — (181.8, 185) of
   300, the wrist. */
.wm-bar-buzz-note__hand-img,
.wm-bar-buzz-note__hand-lines {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3.75rem;
  height: 3.75rem;
  max-width: none;
  margin: -1.875rem;
}
.wm-bar-buzz-note__hand-img {
  transform-origin: 60.6% 61.7%;
  animation: wm-buzz-wave 1667ms cubic-bezier(0.33, 0, 0.67, 1) var(--wm-buzz-wave-delay, 1000ms)
    both;
}
@keyframes wm-buzz-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  60% {
    transform: rotate(30deg);
  }
  40%,
  80% {
    transform: rotate(-30deg);
  }
}
/* The study's motion marks: four swoosh strokes that flash beside
   the hand as it swings — the lower-left pair first and again
   mid-wave, the upper pair between and at the end — each drawing in
   from its head and erasing off its tail, the trim-path figure said
   in dash-offset (each path's own length normalised to 100). The
   snap from erased (−100) back to unstruck (100) happens while the
   stroke is invisible. */
.wm-bar-buzz-note__hand-lines {
  fill: none;
  stroke: var(--wm-nudge-wave-ink, #975500);
  stroke-width: 2;
  stroke-linecap: round;
  pointer-events: none;
}
.wm-bar-buzz-note__hand-lines path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
.wm-bar-buzz-note__hand-lines .is-low {
  animation: wm-buzz-swoosh-low 1667ms linear var(--wm-buzz-wave-delay, 1000ms) both;
}
.wm-bar-buzz-note__hand-lines .is-high {
  animation: wm-buzz-swoosh-high 1667ms linear var(--wm-buzz-wave-delay, 1000ms) both;
}
@keyframes wm-buzz-swoosh-low {
  0%,
  4% {
    stroke-dashoffset: 100;
  }
  18% {
    stroke-dashoffset: 0;
  }
  35%,
  46.9% {
    stroke-dashoffset: -100;
  }
  47% {
    stroke-dashoffset: 100;
  }
  62% {
    stroke-dashoffset: 0;
  }
  74%,
  100% {
    stroke-dashoffset: -100;
  }
}
@keyframes wm-buzz-swoosh-high {
  0%,
  30% {
    stroke-dashoffset: 100;
  }
  41.5% {
    stroke-dashoffset: 0;
  }
  53%,
  73.9% {
    stroke-dashoffset: -100;
  }
  74% {
    stroke-dashoffset: 100;
  }
  85% {
    stroke-dashoffset: 0;
  }
  97%,
  100% {
    stroke-dashoffset: -100;
  }
}
/* The words: one header, one whispered line, each on a single line. */
.wm-bar-buzz-note__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  /* Each line owns only its words — no stretched selection boxes. */
  align-items: flex-start;
  gap: var(--wm-space-nudge, 0.25rem);
}
.wm-bar-buzz-note__title,
.wm-bar-buzz-note__desc {
  max-width: 100%;
}
.wm-bar-buzz-note__title {
  /* A step under text-sm: the header should lead the 12px tease
     without shouting over a card this small — by ink, not by weight. */
  font-size: 0.8125rem;
  font-weight: var(--wm-weight-body, 400);
  line-height: 1.3;
  color: var(--wm-ink, #16171b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wm-bar-buzz-note__desc {
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-body, 400);
  line-height: 1.3;
  color: var(--wm-ink-muted, rgba(22, 23, 27, 0.55));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* A knock carrying its own door hugs its content — the fixed seat is
   the plain card's; a card with a Checkout makes exactly the room the
   button needs and no more. */
.wm-bar-buzz-note.has-cta {
  width: fit-content;
  /* The plain cards' own ceiling — a named product's longer line
     truncates rather than growing the card past it. */
  max-width: min(26rem, calc(100vw - 2rem));
  /* The pill sits closer to the close than words would — a snug (8px)
     rather than the text cards' step. */
  padding-right: calc(2 * var(--wm-space-snug, 0.5rem) + 1.75rem);
}
/* The door itself: a small primary pill on the card's midline, seated
   between the words and the close. */
.wm-bar-buzz-note__cta {
  flex: none;
  display: inline-grid;
  place-items: center;
  height: 2rem;
  border: 0;
  cursor: pointer;
  padding: 0 var(--wm-space-step, 0.75rem);
  border-radius: var(--wm-radius-pill, 62.5rem);
  background-color: var(--wm-primary, #004c27);
  color: var(--wm-primary-fg, #ffffff);
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-medium, 500);
  line-height: 1.3;
  white-space: nowrap;
  /* The shine's stage: the stripes are children clipped by the pill. */
  position: relative;
  overflow: hidden;
}
.wm-bar-buzz-note__cta:hover {
  background-color: var(
    --wm-primary-600,
    color-mix(in srgb, var(--wm-primary, #004c27) 85%, #000000)
  );
}
/* The coupon: the code on its own white ground with the copy mark —
   a chip to take, not a door to walk through. The mark speaks in the
   muted ink; the taken beat turns it a check. */
.wm-bar-buzz-note__code {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: var(--wm-space-hair, 0.375rem);
  height: 2rem;
  border: 0;
  cursor: pointer;
  padding: 0 var(--wm-space-step, 0.75rem);
  border-radius: var(--wm-radius-pill, 62.5rem);
  background: var(--wm-surface-card, #ffffff);
  box-shadow: 0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08));
  color: var(--wm-ink, #16171b);
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-medium, 500);
  line-height: 1.3;
  white-space: nowrap;
}
.wm-bar-buzz-note__code svg {
  color: var(--wm-ink-muted, rgba(22, 23, 27, 0.55));
}
/* The taken beat, said the window chip's way: the label re-keys on each
   swap, so code-to-Copied and the return both ride the confirm's glide;
   the check speaks in the store's colour. */
.wm-bar-buzz-note__code-label {
  display: inline-flex;
  align-items: center;
  gap: var(--wm-space-hair, 0.375rem);
  animation: wm-buzz-code-swap 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* The chip holds ONE width through the swap — both tellings stand in
   the stack as silent ghosts under the live label, so Copied never
   shrinks the button and the code's return never snaps it back. */
.wm-bar-buzz-note__code-stack {
  display: inline-grid;
  justify-items: center;
}
.wm-bar-buzz-note__code-stack > * {
  grid-area: 1 / 1;
}
.wm-bar-buzz-note__code-label.is-ghost {
  visibility: hidden;
  animation: none;
}
.wm-bar-buzz-note__code.is-copied svg {
  color: var(--wm-primary, #004c27);
}
@keyframes wm-buzz-code-swap {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
}
/* The island's checkout shine, said the island's own way — two SOLID
   tilted stripes of light crossing the button, a wide one led by a
   narrow one, the way a highlight sweeps a curved surface in two
   catches rather than one bar. The pair travel together on one clock,
   held apart by their resting offsets; most of the cycle is the button
   at rest (the sweep is over by 45%), because a sheen on repeat every
   second is an advert, not a glint. */
.wm-bar-buzz-note__cta::before,
.wm-bar-buzz-note__cta::after {
  content: "";
  position: absolute;
  top: -25%;
  height: 150%;
  left: 0;
  pointer-events: none;
  transform: skewX(-20deg) translateX(var(--wm-buzz-shine-x, -3rem));
  animation: wm-buzz-cta-shine 3.2s ease-in-out infinite;
}
.wm-bar-buzz-note__cta::before {
  width: 1rem;
  background: rgba(255, 255, 255, 0.32);
  --wm-buzz-shine-x: -3rem;
}
.wm-bar-buzz-note__cta::after {
  width: 0.375rem;
  background: rgba(255, 255, 255, 0.24);
  --wm-buzz-shine-x: -4.25rem;
}
@keyframes wm-buzz-cta-shine {
  0% {
    transform: skewX(-20deg) translateX(var(--wm-buzz-shine-x, -3rem));
  }
  45%,
  100% {
    transform: skewX(-20deg) translateX(calc(var(--wm-buzz-shine-x, -3rem) + 12rem));
  }
}
/* The close sits INSIDE the card, on its midline — furniture of the
   card now, not a handle on its corner — quiet until hovered. */
.wm-bar-buzz-note__close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--wm-space-snug, 0.5rem);
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--wm-ink-quiet, rgba(22, 23, 27, 0.35));
  cursor: pointer;
}
.wm-bar-buzz-note__close:hover {
  color: var(--wm-ink, #16171b);
}
@media (prefers-reduced-motion: reduce) {
  .wm-bar-buzz-note,
  .wm-bar-buzz-note__hand-img,
  .wm-bar-buzz-note__hand-lines path {
    animation: none;
  }
  .wm-bar-buzz-note__cta::before,
  .wm-bar-buzz-note__cta::after {
    animation: none;
    content: none;
  }
}
`;
const KNOCK_CSS = `
/* The KNOCK rises above the ORB, aligned to its wall the way the
   chips are — dictated. It stands where the chips stack stands (the
   orb's 1.5rem seat + its 4rem + a breath), and hugs the orb's own
   wall. The study's centring translate is baked into every keyframe
   (the pop, the shiver, the hover lift), so the seat moves the ANCHOR
   instead: left is computed so the −50% lands the card's edge 1.5rem
   off the wall. The middle seat keeps the study's own centre. */
.wm-as-knock .wm-bar-buzz-note {
  bottom: calc(1.5rem + 3.5rem + 0.75rem);
  /* This seat's own cut — dictated: the card caps at 320 (the study's
     360), and the words keep 24px of air before the close — the
     study's formula (the close's snug inset + its 1.75rem box) with
     the step grown to 24. The wall-anchor calcs below read the same
     20rem. */
  width: min(20rem, calc(100vw - 2rem));
  /* The card's insets stand at a STEP (12px) on every side —
     dictated (a 16 stood briefly, then called back); the right wall
     keeps the formula with the step in the close's seat: step + the
     close's 1.75rem box + 16px of air before the words (the ragged
     lines and the glyph's own box inset already read as more). */
  padding: var(--wm-space-md, 0.75rem);
  padding-right: calc(0.75rem + 1.75rem + 1rem);
  /* Long words WRAP now (below) — the wave rides the card's TOP edge
     beside the first line rather than centring against the grown
     height. */
  align-items: flex-start;
  /* Wrapped lines outgrow the capsule — dictated: a grown card trades
     the study's full pill for the 20px corner. (At this width and
     copy the title always wraps; a one-line knock would want the pill
     back.) */
  border-radius: var(--wm-radius-plate, 1.25rem);
}
/* The words-to-tail air — dictated to a snug (8px) over the study's
   own nudge. */
.wm-as-knock .wm-bar-buzz-note__text {
  gap: var(--wm-space-sm, 0.5rem);
}
/* Looser leading for the grown card — dictated: the study's 1.3 steps
   up to 1.4 on title and tail both. */
.wm-as-knock .wm-bar-buzz-note__title,
.wm-as-knock .wm-bar-buzz-note__desc {
  line-height: var(--wm-nudge-line-height, 1.4);
}
/* The 320 cut costs the title its one line — dictated: the words take
   a SECOND line instead of the ellipsis; the tail keeps its own
   one-line cut. */
.wm-as-knock .wm-bar-buzz-note__title {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}
/* The wave's white disc squares off — dictated: the 44px seat trades
   its circle for a rounded square, the 12px corner sitting a step
   inside the card's own 20. */
.wm-as-knock .wm-bar-buzz-note__bell {
  border-radius: var(--wm-radius-md-lg, 0.75rem);
}
/* The LEAVE just DISAPPEARS — dictated: no sink, no travel; the card
   fades where it stands (a gather-into-the-orb told once and called
   back). The drag's own offset (--wm-buzz-y) rides along, the
   study's way, so a swiped card fades from the hand's last hold. */
.wm-as-knock .wm-bar-buzz-note.is-out {
  animation: wm-as-knock-out 0.2s ease-out both;
}
@keyframes wm-as-knock-out {
  from {
    transform: translate(-50%, var(--wm-buzz-y, 0px));
    opacity: 1;
  }
  to {
    transform: translate(-50%, var(--wm-buzz-y, 0px));
    opacity: 0;
  }
}
/* The close rides the TOP with the wave — dictated: the study centres
   it against the capsule, but a card grown to two or three lines wants
   its close where a notification keeps it, on the head line. The
   card's own snug inset seats it. */
.wm-as-knock .wm-bar-buzz-note__close {
  top: var(--wm-space-md, 0.75rem);
  right: var(--wm-space-md, 0.75rem);
  transform: none;
}
.wm-as-knock.is-right .wm-bar-buzz-note {
  left: calc(100vw - 1.5rem - min(20rem, 100vw - 2rem) / 2);
}
.wm-as-knock.is-left .wm-bar-buzz-note {
  left: calc(1.5rem + min(20rem, 100vw - 2rem) / 2);
}
`;
const NUDGE_CARD_CSS = `
.wm-nudge .wm-bar-buzz-note {
  align-items: flex-start;
  /* A VERY SUBTLE cast — dictated, called back from none: the
     hairline edge plus the faintest settle, nothing that reads as a
     floating panel. */
  box-shadow:
    0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08)),
    var(--wm-nudge-shadow, 0 2px 8px rgba(22, 23, 27, 0.08), 0 10px 32px rgba(22, 23, 27, 0.1));
}
/* Under a resting pointer the cast deepens a little and nothing moves
   (dictated: the lift is gone, here and everywhere). */
.wm-nudge .wm-bar-buzz-note.is-landed:not(.is-out):hover {
  box-shadow:
    0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08)),
    var(--wm-nudge-shadow-hover, 0 3px 10px rgba(22, 23, 27, 0.1), 0 14px 36px rgba(22, 23, 27, 0.14));
}
.wm-nudge .wm-bar-buzz-note .wm-bar-buzz-note__text {
  min-height: 2.75rem;
  justify-content: center;
}
/* The words hold TWO lines (dictated: concise) — longer copy
   truncates on the second with an ellipsis. */
.wm-nudge .wm-bar-buzz-note__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* The disc is ONE seat in every telling (dictated): 44 on the tint,
   the disc's corners — whatever it holds, the wave, a glyph or the
   product's own shot, which fills it and takes its corners. */
.wm-nudge .wm-bar-buzz-note__product {
  border-radius: var(--wm-radius-md-lg, 0.75rem);
}
.wm-nudge .wm-bar-buzz-note .wm-bar-buzz-note__desc {
  display: none;
}
/* The disc's own COLOUR — an icon seated with currentColor reads the
   family colour on the white plate. */
.wm-nudge .wm-bar-buzz-note__bell {
  color: var(--wm-color-text, #16171b);
}
.wm-nudge .wm-bar-buzz-note.has-cta {
  display: grid;
  grid-template-columns: 2.75rem 1fr;
  column-gap: 0.75rem;
  row-gap: 0.75rem;
  align-items: start;
  max-width: none;
  padding-right: calc(0.75rem + 1.75rem + 1rem);
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__bell {
  grid-row: 1;
  grid-column: 1;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__text {
  grid-row: 1;
  grid-column: 2;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__cta {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: stretch;
  justify-content: center;
  margin-right: calc(-1.75rem - 1rem);
  min-width: 0;
  height: 2.5rem;
  font-size: var(--wm-font-size-sm, 0.875rem);
  font-weight: var(--wm-font-weight-body, 400);
}
/* A BODY in the card — the Product Row, the Rating Row — seats in
   the text column on the row under the words, the column's whole
   width (a row's badge ranges to its far end; an inline row keeps
   its own), and the doors step down one. */
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__body {
  grid-column: 2;
  grid-row: 2;
  justify-self: stretch;
  align-self: start;
  min-width: 0;
}
.wm-nudge .wm-bar-buzz-note.has-cta:has(.wm-bar-buzz-note__body) .wm-bar-buzz-note__ctas {
  grid-row: 3;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__ctas {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: stretch;
  min-width: 0;
  margin-right: calc(-1.75rem - 1rem);
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas {
  position: static;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas.is-stack {
  flex-direction: column;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas.is-stack .wm-pro-cta {
  flex: none;
  width: 100%;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-cta {
  /* EQUAL halves (dictated) — flex alone still floors each door at
     its label's width; min-width 0 lifts the floor so both take the
     same share of the row. */
  flex: 1 1 0;
  min-width: 0;
}
/* Icon-only doors keep their square — a mark stretched to half the
   row would float in a void — and the pair ranges RIGHT (dictated),
   to the doors' own 12 off the card's edge. Beside a LABELLED door
   the icon keeps its square on the left and the label takes the line
   that remains (the Search Top Picks pair). */
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-cta.is-icon,
.wm-nudge .wm-bar-buzz-note__ctas .nw-win__tooltip-anchor {
  flex: none;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas:has(.wm-pro-cta.is-icon) {
  justify-content: flex-end;
}
/* The door is the Button pair's primary — the study's shine stands
   down. */
.wm-nudge .wm-bar-buzz-note__cta::before,
.wm-nudge .wm-bar-buzz-note__cta::after {
  display: none;
  animation: none;
}
`;
const NUDGE_CTA_CSS = `
.wm-pro-ctas {
  position: fixed;
  display: flex;
  gap: 0.5rem;
  z-index: 30;
}
.wm-pro-cta {
  height: 2.25rem;
  padding: 0 0.875rem;
  border: 0;
  border-radius: var(--wm-radius-full, 62.5rem);
  background: var(--wm-color-surface, #ffffff);
  color: var(--wm-color-text, #16171b);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: var(--wm-font-weight-body, 400);
  white-space: nowrap;
  cursor: pointer;
  /* The hairline alone — dictated: no cast on the capsules; the edge
     is the only thing that parts them from the card. */
  box-shadow: 0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08));
  animation: wm-pro-cta-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}
.wm-pro-cta:hover {
  background: var(--wm-color-surface-muted, #f8f8f8);
}
.wm-pro-cta:active {
  transform: scale(0.96);
}
/* ICON-ONLY doors (dictated): the capsule squared to its own height,
   the mark alone at the door-mark size; the label lives on for the
   reader in aria-label, and for the eye in the Tooltip primitive's
   word (TIP_CSS below, its window tokens re-said in the store's). */
.wm-pro-cta.is-icon {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  padding: 0;
}
.wm-pro-cta.is-icon svg {
  width: var(--wm-icon-size-xl, 1.25rem);
  height: var(--wm-icon-size-xl, 1.25rem);
}
@keyframes wm-pro-cta-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* INSIDE the card the row speaks the Button primitive's own pair at
   the Button's own geometry — 2.5rem tall, text-sm. The unmarked
   capsule is the TRUE SECONDARY, dictated: no background, the inset
   hairline ring, the text colour's own word. Floating under the card (the
   seats' outside telling) the capsules keep the chips' white background —
   a transparent pill over a storefront says nothing. */
.wm-bar-buzz-note__ctas .wm-pro-cta {
  height: 2.5rem;
  font-size: var(--wm-font-size-sm, 0.875rem);
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08));
}
.wm-bar-buzz-note__ctas .wm-pro-cta:hover {
  background: color-mix(in srgb, var(--wm-color-text, #16171b) 4%, transparent);
}
.wm-bar-buzz-note__ctas .wm-pro-cta.is-icon {
  width: 2.5rem;
}
/* The PRIMARY telling of a door — dictated for the two-button row:
   the left stays the secondary (the plate ringed in the hairline),
   the right commits in the primary's colours. Said AFTER the in-card
   secondary so the primary's background wins its seats. */
.wm-pro-cta.is-primary {
  background: var(--wm-color-primary, #16171b);
  color: var(--wm-color-on-primary, #ffffff);
  box-shadow: none;
}
.wm-pro-cta.is-primary:hover {
  background: color-mix(in srgb, var(--wm-color-primary, #16171b) 85%, #ffffff);
}
@media (prefers-reduced-motion: reduce) {
  .wm-pro-cta {
    animation: none;
  }
}

.wm-pro-ctas .nw-win__tooltip-anchor {
  --nww-fg: var(--wm-color-text, #16171b);
  --nww-card-bg: var(--wm-color-surface, #ffffff);
  --nww-space-snug: var(--wm-space-sm, 0.5rem);
  --nww-space-nudge: var(--wm-space-2xs, 0.25rem);
  --nww-text-xs: var(--wm-font-size-xs, 0.75rem);
  --nww-weight-regular: var(--wm-font-weight-body, 400);
  --nww-ease: var(--wm-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}
/* No tooltip on the PHONE (dictated): a finger has no hover to
   arrive on, and the plate said above a door at the wall ran past
   the layout's edge. The door's label stays in its aria-label. */
@media (max-width: 480px) {
  .wm-pro-ctas .nw-win__tooltip-anchor .nw-win__tooltip {
    display: none;
  }
}
`;
const PRO_KNOCK_CSS = `
/* Dictated: the proactive knocks stand WHITE — the sage nudge tint
   stays the page's; the card goes paper, the content on its own colours
   (the bell keeps its hairline ring, the doors their own background). */
.wm-as-knock .wm-bar-buzz-note {
  background: var(--wm-color-surface, #ffffff);
  /* And the doors in the PRIMITIVE'S manner, not the store's green —
     the note re-says the primary token as the family colour, so the
     primary door's rest and its hover both follow the Nudge page's
     own background. */
  --wm-primary: var(--wm-color-text, #16171b);
  --wm-color-primary: var(--wm-primary);
}
.wm-as-knock .wm-bar-buzz-note {
  width: min(21.25rem, calc(100vw - 2 * var(--wm-space-lg, 1rem)));
  bottom: calc(var(--wm-space-xl, 1.5rem) + 3.5rem + var(--wm-space-md, 0.75rem));
}
/* The close puck at 24 (dictated, folder-wide) — the 14px glyph
   keeps its size; the smaller puck alone closes the visual gap. */
.wm-as-knock .wm-bar-buzz-note__close {
  width: var(--wm-close-button-size, 1.5rem);
  height: var(--wm-close-button-size, 1.5rem);
}
`;
const BUZZ_ENTER_MS = 883;
function StorybookKnock({
  title,
  product: product2,
  doors,
  pressed,
  hovered,
  out
}) {
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setLanded(true), BUZZ_ENTER_MS);
    return () => window.clearTimeout(id);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "wm-bar-message wm-as-knock wm-nudge", children: [
    /* @__PURE__ */ jsx("style", { children: BUZZ_NOTE_CSS }),
    /* @__PURE__ */ jsx("style", { children: KNOCK_CSS }),
    /* @__PURE__ */ jsx("style", { children: NUDGE_CARD_CSS }),
    /* @__PURE__ */ jsx("style", { children: NUDGE_CTA_CSS }),
    /* @__PURE__ */ jsx("style", { children: PRO_KNOCK_CSS }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: [
          "wm-bar-buzz-note has-cta",
          landed && "is-landed",
          out && "is-out",
          hovered && "pv2-is-hover"
        ].filter(Boolean).join(" "),
        role: "button",
        tabIndex: 0,
        "aria-label": `Open chat — ${title}`,
        children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "wm-bar-buzz-note__close", "aria-label": "Dismiss notification", children: /* @__PURE__ */ jsx(XMark, {}) }),
          /* @__PURE__ */ jsx("span", { className: "wm-bar-buzz-note__bell", "aria-hidden": true, children: product2 ? /* @__PURE__ */ jsx("img", { className: "wm-bar-buzz-note__product", src: product2, alt: "" }) : /* @__PURE__ */ jsxs("span", { className: "wm-bar-buzz-note__hand", children: [
            /* @__PURE__ */ jsxs("svg", { className: "wm-bar-buzz-note__hand-lines", viewBox: "0 0 300 300", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx("path", { className: "is-low", pathLength: "100", d: "M73.6 153.6C73.6 153.6 80.8 186.5 119 199" }),
              /* @__PURE__ */ jsx("path", { className: "is-low", pathLength: "100", d: "M86.7 157.9C86.7 157.9 92.2 176.7 113.5 185.5" }),
              /* @__PURE__ */ jsx("path", { className: "is-high", pathLength: "100", d: "M124.9 81.9C124.9 81.9 145.6 73.2 168.9 95.1" }),
              /* @__PURE__ */ jsx("path", { className: "is-high", pathLength: "100", d: "M127.3 90.3C127.3 90.3 140.8 86.7 151.9 97.6" })
            ] }),
            /* @__PURE__ */ jsx("img", { className: "wm-bar-buzz-note__hand-img", src: handWaveUrl, alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "wm-bar-buzz-note__text", children: /* @__PURE__ */ jsx("span", { className: "wm-bar-buzz-note__title", children: title }) }),
          /* @__PURE__ */ jsx("div", { className: "wm-bar-buzz-note__ctas", children: /* @__PURE__ */ jsx("div", { className: "wm-pro-ctas", children: doors.map((d, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: ["wm-pro-cta", d.primary && "is-primary", pressed === d.label && "pv2-is-active"].filter(Boolean).join(" "),
              style: { animationDelay: `${i * 90}ms` },
              children: d.label
            },
            d.label
          )) }) })
        ]
      }
    )
  ] });
}
function XMark() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 256 256", width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 16, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "56", x2: "56", y2: "200" }),
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "200", x2: "56", y2: "56" })
  ] });
}
function Landing$1() {
  return /* @__PURE__ */ jsxs("div", { className: "ais-page", children: [
    /* @__PURE__ */ jsx(Nav, { searching: false, merchant: brand$6 }),
    /* @__PURE__ */ jsxs("div", { className: "ais-body", children: [
      /* @__PURE__ */ jsxs("div", { className: "pcx-scroll ofr-scroll", children: [
        /* @__PURE__ */ jsxs("section", { className: "ofr-hero", "data-name": "Hero", children: [
          /* @__PURE__ */ jsx("p", { className: "pcx-eyebrow", children: hero$2.eyebrow }),
          /* @__PURE__ */ jsx("h2", { className: "pcx-hero__headline ofr-hero__headline", children: hero$2.headline }),
          /* @__PURE__ */ jsxs("p", { className: "pcx-hero__sub", children: [
            product$4.name,
            ", ",
            product$4.flavor
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ofr-hero__media", children: /* @__PURE__ */ jsx("img", { src: product$4.image, alt: `Goodwell ${product$4.name}` }) })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "ofr-product", "data-name": "Product", children: [
          /* @__PURE__ */ jsx("div", { className: "ofr-product__media", children: /* @__PURE__ */ jsx("img", { src: product$4.image, alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: "ofr-product__info", children: [
            /* @__PURE__ */ jsxs("div", { className: "ofr-product__head", children: [
              /* @__PURE__ */ jsx("p", { className: "ofr-product__name", children: product$4.name }),
              /* @__PURE__ */ jsxs("p", { className: "ofr-product__variant", children: [
                product$4.flavor,
                ", ",
                product$4.size
              ] })
            ] }),
            /* @__PURE__ */ jsx(Rating, { value: product$4.rating, count: product$4.reviews }),
            /* @__PURE__ */ jsx("p", { className: "ofr-product__price", children: /* @__PURE__ */ jsx("span", { className: "ofr-product__now", children: product$4.price }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ContentFade, {})
    ] })
  ] });
}
function CopyGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "32 32 192 192", width: 12, height: 12, fill: "none", stroke: "currentColor", strokeWidth: 16, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("polyline", { points: "168 168 216 168 216 40 88 40 88 88" }),
    /* @__PURE__ */ jsx("rect", { x: "40", y: "88", width: "128", height: "128" })
  ] });
}
const REPLY_STAGGER_MS = 45;
const WAIT_FIRST = "Thinking…";
const WAIT_CARDS = "Fetching the product…";
const WORD_STAGGER_MS = REPLY_STAGGER_MS;
const FADE_CLEARANCE$1 = 32;
function StreamedReply({ text, animate }) {
  if (!animate) return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: text });
  const words2 = text.split(" ");
  return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: words2.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("span", { className: "gj2-word", style: { animationDelay: `${i * WORD_STAGGER_MS}ms` }, children: word }),
    i < words2.length - 1 && " "
  ] }, i)) });
}
function SparkGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5z" }) });
}
[
  catalog.maraisTailoredTrousers,
  catalog.maraisSneakers
].map(({ id, title, image }) => ({ id, name: title, image }));
function useComposerClip(winRef, runKey) {
  const [clip, setClip] = useState(null);
  useLayoutEffect(() => {
    var _a, _b;
    const win = winRef.current;
    const composer2 = win == null ? void 0 : win.querySelector(".gj2-composer");
    if (!win || !composer2) return;
    const measure2 = () => {
      const w = win.getBoundingClientRect();
      const c = composer2.getBoundingClientRect();
      const k = win.offsetWidth / w.width || 1;
      setClip({
        top: (c.top - w.top) * k,
        right: (w.right - c.right) * k,
        bottom: (w.bottom - c.bottom) * k,
        left: (c.left - w.left) * k,
        radius: c.height * k / 2
      });
    };
    measure2();
    (_b = (_a = document.fonts) == null ? void 0 : _a.ready) == null ? void 0 : _b.then(measure2);
    const observer = new ResizeObserver(measure2);
    observer.observe(win);
    return () => observer.disconnect();
  }, [winRef, runKey]);
  return clip;
}
const beats$7 = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "idle", type: "pause", ms: 900 },
  { id: "knock", type: "appear", ms: 883 },
  { id: "read", type: "pause", ms: 3e3 },
  { id: "tap", type: "pause", ms: 320 },
  { id: "dismiss", type: "pause", ms: 360 },
  { id: "open", type: "appear", ms: 700 },
  { id: "greet", type: "text", text: knock$1.greet },
  { id: "trail", type: "appear", ms: 600 },
  { id: "finish", type: "pause", ms: 3e3 }
];
function OffersComposerMotion() {
  const rootRef = useRef(null);
  const winRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$7, landed && fontsReady);
  const clip = useComposerClip(winRef, t.runKey);
  const animate = !t.reducedMotion;
  const store = t.reached("store");
  const open = t.reached("open") || !animate;
  const knockUp = animate && t.reached("knock") && !t.reached("open");
  const style = clip ? {
    "--pv2-clip-top": `${clip.top}px`,
    "--pv2-clip-right": `${clip.right}px`,
    "--pv2-clip-bottom": `${clip.bottom}px`,
    "--pv2-clip-left": `${clip.left}px`,
    "--pv2-clip-radius": `${clip.radius}px`
  } : void 0;
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsxs("div", { className: cx$1("ofbm adjm", t.reached("tap-ad") && "adjm--tap", store && "ofbm--store adjm--store", open && "ofbm--open"), children: [
    /* @__PURE__ */ jsx("div", { className: "adjm-plate" }),
    /* @__PURE__ */ jsx("div", { className: "ofbm-layer ofbm-ad adj pcx-canvas", children: /* @__PURE__ */ jsx(Ad$1, {}) }),
    /* @__PURE__ */ jsx("div", { className: "ofbm-layer ofbm-page ais pcx ofr", children: /* @__PURE__ */ jsxs("article", { className: "ais-store", children: [
      /* @__PURE__ */ jsx(BrowserChrome, { url: domain$2 }),
      /* @__PURE__ */ jsxs("div", { className: "ais-viewport", children: [
        /* @__PURE__ */ jsx(Landing$1, {}),
        /* @__PURE__ */ jsx("div", { className: "ofb-scrim ofbm-scrim" }),
        /* @__PURE__ */ jsx("div", { className: "ofb-widget ofbm-widget", style, children: /* @__PURE__ */ jsxs("div", { ref: winRef, className: cx$1("gj2-win pv2-win ofb-win", open && "pv2-win--open", !clip && "pv2-win--unmeasured"), children: [
          /* @__PURE__ */ jsx("div", { className: "pv2-head", children: /* @__PURE__ */ jsx(ChatHead, { brand: brand$6 }) }),
          /* @__PURE__ */ jsxs("div", { className: "gj2-transcript ofb-transcript", children: [
            t.reached("greet") && /* @__PURE__ */ jsx(StreamedReply, { text: knock$1.greet, animate }),
            t.reached("trail") && /* @__PURE__ */ jsxs("div", { className: cx$1("gj2-followups ofb-trail", animate && "gj2-followups--in"), children: [
              knock$1.followups.map((text) => /* @__PURE__ */ jsx("span", { className: "gj2-followup", children: text }, text)),
              /* @__PURE__ */ jsxs("span", { className: "gj2-followup ofb-code", "aria-label": `Copy code ${offer$1.code}`, children: [
                offer$1.code,
                /* @__PURE__ */ jsx(CopyGlyph, {})
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(ChatFoot, {})
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: cx$1("ofb-widget ofb-widget--bar ofbm-bar", open && "ofbm-bar--off"), "data-name": "Composer", children: [
          /* @__PURE__ */ jsx("div", { className: "gj2-win ofb-bar", children: /* @__PURE__ */ jsx(ChatFoot, {}) }),
          knockUp && /* @__PURE__ */ jsx("div", { className: "pv2-knock-seat ofb-knock", children: /* @__PURE__ */ jsx(
            StorybookKnock,
            {
              title: knock$1.line,
              product: product$4.image,
              doors: knock$1.doors,
              hovered: t.reached("tap"),
              out: t.reached("dismiss")
            }
          ) })
        ] })
      ] })
    ] }) })
  ] }, t.runKey) });
}
const brand$5 = "Goodwell";
const domain$1 = "goodwell.com/my-routine";
const ad$2 = {
  headline: ["Your daily routine,", "matched to you."],
  tag: "Personalized wellness bundle",
  cta: "Find my match",
  caption: "Two questions, one routine. Let us match your gummies to your day.",
  tags: "#goodwell #dailyroutine"
};
const hero$1 = {
  eyebrow: "From your ad",
  headline: "Build your daily wellness bundle.",
  sub: "Answer two questions and we'll match the gummies to your day."
};
const bundle = [
  { ...catalog.goodwellEnergy, subtitle: "Mornings · 60 count" },
  { ...catalog.goodwellSleep60, subtitle: "Nights · 60 count" }
];
const knock = {
  line: "Two quick questions and I'll match your gummies to your day.",
  doors: [{ label: "Not now" }, { label: "Find my match", primary: true }]
};
const q1 = {
  picked: "Find my match",
  ai: "What are you looking to build a routine for?",
  chips: ["Energy & focus", "Better sleep", "Both"]
};
const q2 = {
  picked: "Both",
  ai: "Got it: steady energy by day and better sleep at night. Which Goodwell gummies do you already have?",
  chips: ["Energy", "Sleep", "Starting fresh"]
};
const result = {
  picked: "Starting fresh",
  loading: "Building your bundle…",
  ai: "Here's your match: Clean Energy for the morning, Daily Sleep for the night."
};
function Ad() {
  return /* @__PURE__ */ jsxs("article", { className: "adj-shell adj-ig pcx-ad", "data-name": "Ad", children: [
    /* @__PURE__ */ jsxs("header", { className: "adj-ig__head", children: [
      /* @__PURE__ */ jsxs("div", { className: "adj-ig__profile", children: [
        /* @__PURE__ */ jsx("span", { className: "adj-ig__avatar pcx-ad__avatar", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Goodwell", className: "goodwell-supplied-avatar" }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-ig__name", children: [
          /* @__PURE__ */ jsx(BrandName, { brand: brand$5 }),
          /* @__PURE__ */ jsx("small", { children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adj-ig__more", src: igMore, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__media pcx-ad__media", children: [
      /* @__PURE__ */ jsx(BrandName, { brand: brand$5, className: "pcx-ad__wordmark" }),
      /* @__PURE__ */ jsx("h2", { className: "pcx-ad__headline", children: ad$2.headline.map((line) => /* @__PURE__ */ jsx("span", { style: { display: "block" }, children: line }, line)) }),
      /* @__PURE__ */ jsx("span", { className: "pcx-ad__tag", children: ad$2.tag }),
      /* @__PURE__ */ jsx(Jars, { className: "byb-ad__jars" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__cta", children: [
      ad$2.cta,
      /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "adj-ig__caption", children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: brand$5 }) }),
      " ",
      ad$2.caption,
      " ",
      /* @__PURE__ */ jsx("span", { children: ad$2.tags })
    ] })
  ] });
}
function Jars({ className }) {
  return /* @__PURE__ */ jsx("div", { className: `byb-jars ${className}`, children: bundle.map((p) => /* @__PURE__ */ jsx("img", { src: p.image, alt: `Goodwell ${p.title}` }, p.id)) });
}
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "ais-page", children: [
    /* @__PURE__ */ jsx(Nav, { searching: false }),
    /* @__PURE__ */ jsxs("div", { className: "ais-body", children: [
      /* @__PURE__ */ jsx("div", { className: "pcx-scroll", children: /* @__PURE__ */ jsxs("section", { className: "pcx-hero byb-hero", "data-name": "Hero", children: [
        /* @__PURE__ */ jsx("p", { className: "pcx-eyebrow", children: hero$1.eyebrow }),
        /* @__PURE__ */ jsx("h2", { className: "pcx-hero__headline", children: hero$1.headline }),
        /* @__PURE__ */ jsx("p", { className: "pcx-hero__sub", children: hero$1.sub }),
        /* @__PURE__ */ jsx("div", { className: "pcx-hero__media byb-hero__media", children: /* @__PURE__ */ jsx(Jars, { className: "byb-hero__jars" }) })
      ] }) }),
      /* @__PURE__ */ jsx(ContentFade, {})
    ] })
  ] });
}
function useFollowLatest(transcriptRef, t) {
  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    let cancel;
    const follow = () => {
      const target = viewport.lastElementChild;
      if (!target) return;
      const zoom = viewport.offsetHeight ? viewport.getBoundingClientRect().height / viewport.offsetHeight : 1;
      const bottom = target.getBoundingClientRect().bottom / zoom;
      const edge = viewport.getBoundingClientRect().bottom / zoom - FADE_CLEARANCE$1;
      if (bottom <= edge) return;
      const top = viewport.scrollTop + bottom - edge;
      cancel == null ? void 0 : cancel();
      if (t.reducedMotion) viewport.scrollTop = top;
      else cancel = animateScrollTo(viewport, top);
    };
    follow();
    const observer = new ResizeObserver(follow);
    [...viewport.children].forEach((child) => observer.observe(child));
    return () => {
      observer.disconnect();
      cancel == null ? void 0 : cancel();
    };
  }, [t.index, t.runKey, t.reducedMotion]);
}
function User({ text, animate }) {
  return /* @__PURE__ */ jsx("p", { className: `gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`, children: text });
}
function Think({ t, id, cards = false }) {
  const status = t.status(id);
  if (!status) return null;
  return /* @__PURE__ */ jsxs("div", { className: status.visible ? "gj2-think gj2-in-ai" : "gj2-think gj2-think--out", children: [
    /* @__PURE__ */ jsx("span", { className: "gj2-think__mark", children: /* @__PURE__ */ jsx(SparkGlyph, {}) }),
    /* @__PURE__ */ jsx("span", { className: "gj2-think__window", children: /* @__PURE__ */ jsx("span", { className: "gj2-think__line", children: cards ? WAIT_CARDS : WAIT_FIRST }) })
  ] });
}
const beats$6 = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "idle", type: "pause", ms: 900 },
  { id: "knock", type: "appear", ms: 883 },
  { id: "read", type: "pause", ms: 2800 },
  { id: "press", type: "pause", ms: 320 },
  { id: "open", type: "appear", ms: 700 },
  { id: "match", type: "appear", ms: 420 },
  { id: "think-1", type: "think", labels: ["Thinking"] },
  { id: "q1", type: "text", text: q1.ai },
  { id: "chips-1", type: "appear", ms: 500 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "tap-1", type: "pause", ms: 320 },
  { id: "pick-1", type: "appear", ms: 420 },
  { id: "think-2", type: "think", labels: ["Thinking"] },
  { id: "q2", type: "text", text: q2.ai },
  { id: "chips-2", type: "appear", ms: 500 },
  { id: "read-2", type: "pause", ms: 1400 },
  { id: "tap-2", type: "pause", ms: 320 },
  { id: "pick-2", type: "appear", ms: 420 },
  { id: "build", type: "load", ms: 1400 },
  { id: "reply", type: "text", text: result.ai },
  { id: "finish", type: "pause", ms: 2600 }
];
function Question({ t, n, text, chips, picked, animate }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Think, { t, id: `think-${n}` }),
    t.reached(`q${n}`) && /* @__PURE__ */ jsx(StreamedReply, { text, animate }),
    t.reached(`chips-${n}`) && /* @__PURE__ */ jsx(
      Followups,
      {
        items: chips,
        picked: t.reached(`tap-${n}`) ? picked : void 0,
        className: cx$1(animate && "gj2-followups--in", animate && t.reached(`tap-${n}`) && "gj2-followups--tap")
      }
    ),
    t.reached(`pick-${n}`) && /* @__PURE__ */ jsx(User, { text: picked, animate })
  ] });
}
function Thread$1({ t, animate }) {
  const building = t.reached("build") && !t.reached("reply");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    t.reached("match") && /* @__PURE__ */ jsx(User, { text: q1.picked, animate }),
    /* @__PURE__ */ jsx(Question, { t, n: 1, text: q1.ai, chips: q1.chips, picked: q2.picked, animate }),
    /* @__PURE__ */ jsx(Question, { t, n: 2, text: q2.ai, chips: q2.chips, picked: result.picked, animate }),
    building && /* @__PURE__ */ jsx("p", { className: cx$1("gj2-msg gj2-msg--ai byb-wait", animate && "gj2-in-ai"), children: result.loading }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: result.ai, animate }),
    t.reached("build") && /* @__PURE__ */ jsx("div", { className: cx$1("byb-rail-seat", animate && "gj2-rise"), "data-name": "Bundle", children: /* @__PURE__ */ jsx(Rail, { products: bundle, loading: t.loading("build"), ctaLabel: "Add to bundle", className: "byb-rail" }) })
  ] });
}
function BuildBundleMotion() {
  const rootRef = useRef(null);
  const winRef = useRef(null);
  const transcriptRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$6, landed && fontsReady);
  useFollowLatest(transcriptRef, t);
  const clip = useComposerClip(winRef, t.runKey);
  const animate = !t.reducedMotion;
  const store = t.reached("store");
  const open = t.reached("open");
  const knockUp = animate && t.reached("knock") && !t.passed("open");
  const resting = animate && !open;
  const style = clip ? {
    "--pv2-clip-top": `${clip.top}px`,
    "--pv2-clip-right": `${clip.right}px`,
    "--pv2-clip-bottom": `${clip.bottom}px`,
    "--pv2-clip-left": `${clip.left}px`,
    "--pv2-clip-radius": `${clip.radius}px`
  } : void 0;
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsxs("div", { className: cx$1("bybm adjm", t.reached("tap-ad") && "adjm--tap", store && "bybm--store adjm--store"), children: [
    /* @__PURE__ */ jsx("div", { className: "adjm-plate" }),
    /* @__PURE__ */ jsx("div", { className: "bybm-layer bybm-ad adj pcx-canvas", children: /* @__PURE__ */ jsx(Ad, {}) }),
    /* @__PURE__ */ jsx("div", { className: "bybm-layer bybm-page ais pcx byb", children: /* @__PURE__ */ jsxs("article", { className: "ais-store", children: [
      /* @__PURE__ */ jsx(BrowserChrome, { url: domain$1 }),
      /* @__PURE__ */ jsxs("div", { className: "ais-viewport", children: [
        /* @__PURE__ */ jsx(Landing, {}),
        /* @__PURE__ */ jsx("div", { className: "byb-widget bybm-widget", style, children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref: winRef,
            className: cx$1("gj2-win pv2-win byb-win", (open || !animate) && "pv2-win--open", !clip && "pv2-win--unmeasured"),
            children: [
              /* @__PURE__ */ jsx("div", { className: "pv2-head", children: /* @__PURE__ */ jsx(ChatHead, { brand: brand$5 }) }),
              /* @__PURE__ */ jsx("div", { ref: transcriptRef, className: "gj2-transcript byb-transcript bybm-transcript", children: (open || !animate) && /* @__PURE__ */ jsx(Thread$1, { t, animate }) }),
              /* @__PURE__ */ jsx(ChatFoot, {})
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: cx$1("byb-widget byb-widget--bar bybm-bar", !resting && "bybm-bar--off"), "data-name": "Composer", children: [
          /* @__PURE__ */ jsx("div", { className: "gj2-win byb-bar", children: /* @__PURE__ */ jsx(ChatFoot, {}) }),
          knockUp && /* @__PURE__ */ jsx("div", { className: "pv2-knock-seat byb-knock", children: /* @__PURE__ */ jsx(
            StorybookKnock,
            {
              title: knock.line,
              product: bundle[0].image,
              doors: knock.doors,
              pressed: t.reached("press") ? "Find my match" : void 0,
              out: t.reached("open")
            }
          ) })
        ] })
      ] })
    ] }) })
  ] }, t.runKey) });
}
function Scene$6({
  t,
  variant,
  ad: ad2,
  page: page2,
  domain: domain2,
  heroImg
}) {
  const rootRef = useRef(null);
  const [flight, setFlight] = useState(null);
  const [moved, setMoved] = useState(false);
  const [landed, setLanded] = useState(t.reducedMotion);
  const store = t.reached("store");
  useLayoutEffect(() => {
    const root = rootRef.current;
    const adEl = root == null ? void 0 : root.querySelector(".adj-ig");
    if (!root || !adEl) return;
    const zoom = root.offsetWidth ? root.getBoundingClientRect().width / root.offsetWidth : 1;
    const r = adEl.getBoundingClientRect();
    root.style.setProperty("--atp-ad-w", `${r.width / zoom}px`);
    root.style.setProperty("--atp-ad-h", `${r.height / zoom}px`);
  }, []);
  useLayoutEffect(() => {
    if (!store || t.reducedMotion) return;
    const root = rootRef.current;
    const jar = root == null ? void 0 : root.querySelector(".pcx-ad__jar-anchor");
    const hero2 = root == null ? void 0 : root.querySelector(heroImg);
    if (!root || !jar || !hero2) return;
    const box = root.getBoundingClientRect();
    const zoom = root.offsetWidth ? box.width / root.offsetWidth : 1;
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / zoom, y: (r.top - box.top) / zoom, w: r.width / zoom, h: r.height / zoom };
    };
    setFlight({ from: rect(jar), to: rect(hero2), src: jar.dataset.flightSrc || "" });
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMoved(true)));
    return () => cancelAnimationFrame(raf);
  }, [store, heroImg, t.reducedMotion]);
  const pos = flight && (moved ? flight.to : flight.from);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      className: cx$1(
        "adj adjm atp",
        `atp--${variant}`,
        t.reached("tap-ad") && "adjm--tap",
        store && "adjm--store",
        store && !landed && "atp--flying",
        t.reached("scroll") && "atp--scrolled",
        t.reached("finish") && "atp--finish"
      ),
      children: [
        ad2,
        /* @__PURE__ */ jsx("div", { className: "adjm-plate" }),
        /* @__PURE__ */ jsx("div", { className: cx$1("ais pcx atp-store", variant === "ofr" && "ofr"), children: /* @__PURE__ */ jsxs("article", { className: "ais-store", children: [
          /* @__PURE__ */ jsx(BrowserChrome, { url: domain2 }),
          /* @__PURE__ */ jsx("div", { className: "ais-viewport", children: page2 })
        ] }) }),
        pos && !landed && /* @__PURE__ */ jsx(
          "img",
          {
            className: "atp-flight",
            src: flight.src,
            alt: "",
            style: { left: pos.x, top: pos.y, width: pos.w, height: pos.h },
            onTransitionEnd: (e) => e.propertyName === "top" && setLanded(true)
          }
        )
      ]
    }
  );
}
function useAdTimeline(beats2) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats2, landed && fontsReady);
  return { rootRef, t };
}
const pcBeats = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "read", type: "pause", ms: 1500 },
  { id: "scroll", type: "appear", ms: 1100 },
  { id: "finish", type: "pause", ms: 1600 }
];
function PersonalizedContentMotion() {
  const { rootRef, t } = useAdTimeline(pcBeats);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(
    Scene$6,
    {
      t,
      variant: "pcx",
      ad: /* @__PURE__ */ jsx(Ad$2, {}),
      page: /* @__PURE__ */ jsx(Page, { step: t.reached("scroll") ? 3 : 2 }),
      domain: domain$3,
      heroImg: ".pcx-hero__media img"
    },
    t.runKey
  ) });
}
const sunGlow = "/images/dynamic-landing-pages/v2/assets/sun-glow-DNCP-oG3.svg";
const sun = "/images/dynamic-landing-pages/v2/assets/sun-oMUrxuNc.svg";
const ridge = "/images/dynamic-landing-pages/v2/assets/ridge-BAegtK3H.svg";
const pines = "/images/dynamic-landing-pages/v2/assets/pines-ZxpVqoct.svg";
const ground = "/images/dynamic-landing-pages/v2/assets/ground-Bo11esur.svg";
const trail = "/images/dynamic-landing-pages/v2/assets/trail-A_MkgnaT.svg";
const hurdleArt = "/images/dynamic-landing-pages/v2/assets/hurdle-BJo5Q_cX.svg";
const runner = "/images/dynamic-landing-pages/v2/assets/runner-BzNhM1qm.svg";
const content = {
  brand: "Goodwell",
  domain: "goodwell.com/gummies",
  campaignProducts: [catalog.goodwellSleep60, catalog.goodwellCalm, catalog.goodwellFocus],
  campaignCreative: { image: goodwellSocialAd, alt: "Goodwell Sleep, Calm and Focus gummies on lilac and blush podiums in warm sunlight" },
  knockLine: "Tell us your routine. We'll help you find your gummies.",
  ad: {
    handle: "goodwell",
    headline: "Feel good.",
    cta: "Find my gummies",
    caption: "Sleep, calm and focus. Find the gummies that fit your daily routine.",
    tags: "#dailyroutine #goodwell"
  },
  page: { eyebrow: "Your daily routine", headline: "Feel good, one gummy at a time.", sub: "Functional gummies for sleep, calm and focus." },
  picks: [catalog.goodwellSleep60, catalog.goodwellSleep28, catalog.goodwellCalm].map((p) => ({
    id: p.id,
    name: p.title,
    meta: p.size,
    price: p.price,
    image: p.image
  })),
  widget: {
    start: "Find My Match",
    q1Answer: "B",
    q2Answer: "A",
    thinking: "Thinking…",
    composer: "Or tell us in your own words…",
    welcome: "Hi! I'm your Goodwell guide. Tell us about your routine, and we'll help you choose your gummies.",
    prompts: [{ id: "sleep", text: "Sleep gummies" }, { id: "calm", text: "Calm gummies" }, { id: "match", text: "Find My Match" }],
    intro: "Let's find gummies that fit your daily routine.",
    q1: { label: "Q1. What would you like to focus on?", options: [{ key: "A", text: "Energy and focus" }, { key: "B", text: "An evening wind-down routine" }, { key: "C", text: "Everyday wellness" }] },
    q2: { label: "Q2. What matters most for your evening routine?", options: [{ key: "A", text: "Sleep and feeling calm" }, { key: "B", text: "A smaller jar to try first" }, { key: "C", text: "A simple daily habit" }] },
    result: "For your evening routine, compare Daily Sleep in two jar sizes and Calm Mood:"
  }
};
const { brand: brand$4, domain, campaignProducts, campaignCreative, knockLine: knockLine$2, ad: ad$1, page, picks: picks$2, widget } = content;
const steps = [
  "Instagram ad",
  "Landing page",
  "Guided shopping · Q1",
  "Customer selection",
  "Q2",
  "Processing",
  "Recommendations"
];
const adDefaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ad: ad$1,
  brand: brand$4,
  campaignCreative,
  campaignProducts,
  domain,
  knockLine: knockLine$2,
  page,
  picks: picks$2,
  steps,
  widget
}, Symbol.toStringTag, { value: "Module" }));
const AdJourneyContext = createContext(adDefaults);
const AdJourneyProvider = AdJourneyContext.Provider;
function CampaignProducts({ products: products2, className }) {
  return /* @__PURE__ */ jsx("div", { className: `${className} adj-campaign-products`, children: products2.map((p) => /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title }, p.id)) });
}
function AnswerRows({ question, selected }) {
  return /* @__PURE__ */ jsxs("div", { className: "adj-quiz", children: [
    /* @__PURE__ */ jsx("p", { className: "adj-quiz__label", children: question.label }),
    /* @__PURE__ */ jsx("div", { className: "adj-quiz__rows", children: question.options.map((o) => /* @__PURE__ */ jsx(
      Button,
      {
        appearance: "secondary",
        label: o.text,
        className: o.key === selected ? "adj-answer adj-answer--selected" : "adj-answer",
        iconLeading: /* @__PURE__ */ jsx("span", { className: "adj-answer__key", children: o.key })
      },
      o.key
    )) })
  ] });
}
function Picks({ loading = false, staggerResolve = false }) {
  const { picks: picks2 } = useContext(AdJourneyContext);
  const storybook = useContext(StorybookCardSkin);
  if (storybook) {
    return /* @__PURE__ */ jsx("div", { className: "adj-picks", children: /* @__PURE__ */ jsx(Rail, { products: picks2.map((b) => ({ id: b.id, title: b.name, brand: b.meta, price: b.price, image: b.image })), loading }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "adj-picks", children: /* @__PURE__ */ jsx(ProductCollection, { children: picks2.map((b, i) => /* @__PURE__ */ jsx(
    RecommendationProductCard,
    {
      product: { id: b.id, name: b.name, brand: b.meta, price: b.price, image: b.image },
      cta: true,
      ctaAppearance: "primary",
      loading,
      resolveDelayMs: staggerResolve ? i * 90 : void 0
    },
    b.id
  )) }) });
}
const answerText = (q, key) => q.options.find((o) => o.key === key).text;
function Thread({ step }) {
  const { widget: widget2 } = useContext(AdJourneyContext);
  if (step === 3 || step === 4) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: widget2.start }) }),
      /* @__PURE__ */ jsxs(AssistantTurn, { children: [
        /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: widget2.intro }),
        /* @__PURE__ */ jsx(AnswerRows, { question: widget2.q1, selected: step === 4 ? widget2.q1Answer : void 0 })
      ] })
    ] });
  }
  if (step === 5) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText(widget2.q1, widget2.q1Answer) }) }),
      /* @__PURE__ */ jsx(AssistantTurn, { children: /* @__PURE__ */ jsx(AnswerRows, { question: widget2.q2 }) })
    ] });
  }
  if (step === 6) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText(widget2.q2, widget2.q2Answer) }) }),
      /* @__PURE__ */ jsxs(AssistantTurn, { children: [
        /* @__PURE__ */ jsxs("div", { className: "adj-thinking", children: [
          /* @__PURE__ */ jsx(Icon, { name: "insight", size: 14 }),
          /* @__PURE__ */ jsx("span", { children: widget2.thinking })
        ] }),
        /* @__PURE__ */ jsx(Picks, { loading: true })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(AssistantTurn, { children: [
    /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: widget2.result }),
    /* @__PURE__ */ jsx(Picks, {})
  ] });
}
const knockLine$1 = knockLine$2;
const knockDoors$1 = [
  { label: "Ask me anything" },
  { label: "Find My Match", primary: true }
];
function KnockBar({ barRef, className, knock: knock2 = true, pressed, out, line, doors = knockDoors$1, value }) {
  const { widget: widget2, knockLine: contextLine = knockLine$1 } = useContext(AdJourneyContext);
  return /* @__PURE__ */ jsxs("div", { ref: barRef, className: ["adj-bar", className].filter(Boolean).join(" "), children: [
    knock2 && /* @__PURE__ */ jsx("div", { className: "pv2-knock-seat adj-bar__knock", children: /* @__PURE__ */ jsx(StorybookKnock, { title: line ?? contextLine, doors, pressed, hovered: !!pressed, out }) }),
    /* @__PURE__ */ jsx(ChatComposer, { value: value ?? widget2.composer })
  ] });
}
function Widget({ step }) {
  const { brand: brand2, widget: widget2 } = useContext(AdJourneyContext);
  const composerDefault = useContext(StorybookComposerDefault);
  if (step === 2 && composerDefault) return /* @__PURE__ */ jsx(KnockBar, {});
  if (step === 2) {
    return /* @__PURE__ */ jsx(Shell, { brand: brand2, className: "adj-widget adj-widget--compact", composer: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsxs(AssistantTurn, { children: [
      /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: widget2.welcome }),
      /* @__PURE__ */ jsx(AiPills, { options: widget2.prompts, selectedId: "" })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Shell, { brand: brand2, className: step === 6 ? "adj-widget adj-widget--expanded adj-widget--end" : "adj-widget adj-widget--expanded", composer: /* @__PURE__ */ jsx(ChatComposer, { value: widget2.composer }), children: /* @__PURE__ */ jsx("div", { className: "adj-thread", children: /* @__PURE__ */ jsx(Thread, { step }) }) });
}
function InstagramAd({ copy: override } = {}) {
  const { brand: brand2, ad: ad2, campaignCreative: campaignCreative2 } = useContext(AdJourneyContext);
  const copy = override ?? ad2;
  return /* @__PURE__ */ jsxs("article", { className: "adj-shell adj-ig", children: [
    /* @__PURE__ */ jsxs("header", { className: "adj-ig__head", children: [
      /* @__PURE__ */ jsxs("div", { className: "adj-ig__profile", children: [
        /* @__PURE__ */ jsx("span", { className: "adj-ig__avatar", children: /* @__PURE__ */ jsx(BrandMark, { brand: brand2 }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-ig__name", children: [
          /* @__PURE__ */ jsx(BrandName, { brand: brand2 }),
          /* @__PURE__ */ jsx("small", { children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adj-ig__more", src: igMore, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__media", children: [
      /* @__PURE__ */ jsx("img", { className: "adj-ig__creative", src: campaignCreative2.image, alt: campaignCreative2.alt }),
      campaignCreative2.headline && /* @__PURE__ */ jsxs("div", { className: "adj-ig__campaign-copy", children: [
        /* @__PURE__ */ jsx("h2", { children: campaignCreative2.headline }),
        campaignCreative2.detail && /* @__PURE__ */ jsx("p", { children: campaignCreative2.detail })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__cta", children: [
      copy.cta,
      /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "adj-ig__caption", children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: brand2 }) }),
      " ",
      copy.caption,
      " ",
      /* @__PURE__ */ jsx("span", { children: copy.tags })
    ] })
  ] });
}
function Storefront({ step = 2, widget: widgetSlot, hero: override }) {
  const { brand: brand2, domain: domain2, page: page2, campaignProducts: campaignProducts2, heroCreative } = useContext(AdJourneyContext);
  const hero2 = override ?? page2;
  return /* @__PURE__ */ jsxs("article", { className: `adj-shell adj-store${heroCreative ? " adj-store--campaign" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { children: domain2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "ill-chat-header adj-nav", children: [
      /* @__PURE__ */ jsx("span", { className: "adj-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: brand2 }) }),
      /* @__PURE__ */ jsx(StoreNavItems, {}),
      /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
        /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline" }),
        /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Cart", variant: "outline" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-store__body", children: [
      /* @__PURE__ */ jsx("section", { className: heroCreative ? "adj-hero adj-hero--campaign" : "adj-hero", children: heroCreative ? /* @__PURE__ */ jsx("img", { className: "adj-hero__img adj-hero__img--campaign", src: heroCreative.image, alt: heroCreative.alt }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "adj-hero__eyebrow", children: hero2.eyebrow }),
        /* @__PURE__ */ jsx("h2", { children: hero2.headline }),
        /* @__PURE__ */ jsx("p", { children: hero2.sub }),
        /* @__PURE__ */ jsx(CampaignProducts, { products: campaignProducts2, className: "adj-hero__img" })
      ] }) }),
      heroCreative && /* @__PURE__ */ jsx("div", { className: "adj-store-products", "aria-label": `More from ${brand2}`, children: campaignProducts2.map((p) => /* @__PURE__ */ jsxs("article", { className: "adj-store-product", children: [
        /* @__PURE__ */ jsx("div", { className: "adj-store-product__tile", children: /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-store-product__row", children: [
          /* @__PURE__ */ jsx("span", { className: "adj-store-product__title", children: p.title }),
          /* @__PURE__ */ jsx("span", { children: p.price })
        ] }),
        p.size && /* @__PURE__ */ jsx("span", { className: "adj-store-product__meta", children: p.size })
      ] }, p.id)) }),
      /* @__PURE__ */ jsx(ContentFade, {}),
      widgetSlot ?? /* @__PURE__ */ jsx(Widget, { step })
    ] })
  ] });
}
const weekenderLandscape = "/images/dynamic-landing-pages/v2/assets/weekender-split-hero-BpBSCFmo.webp";
const brand$3 = "Trailwell";
const ad = {
  handle: "trailwell",
  headline: "Jump. Save.",
  cta: "Play now",
  caption: "Clear 4 hurdles in our mini game to unlock $5 off your next order.",
  tags: "#trailwell #playtosave"
};
const hero = {
  eyebrow: "Unlock $5 off",
  headline: "Clear 4 hurdles, earn $5 off.",
  sub: "A quick game, then back to the backpacks."
};
const invite = "Want $5 off your next order? Clear 4 hurdles to unlock it.";
const playAction = "Play game";
const prompts = [
  { id: "laptop", text: "Laptop-friendly?" },
  { id: "carryon", text: "Carry-on size?" },
  { id: "play", text: playAction }
];
const gameScenes = {
  start: { scroll: 0, runnerX: 45.96, lift: 0, hurdles: [165.48, 275.08, 367.96] },
  progress: { scroll: -110, runnerX: 166.3, lift: 44, hurdles: [55.48, 165.48, 275.08, 367.96] }
};
const hurdles = 4;
const reward = "You earned $5 off.";
const product$3 = {
  id: catalog.trailwellWeekender.id,
  title: catalog.trailwellWeekender.title,
  image: catalog.trailwellWeekender.image,
  originalPrice: catalog.trailwellWeekender.price,
  price: "$143"
};
const knockLine = "Clear 4 hurdles to unlock $5 off your next order.";
const knockDoors = [{ label: "Ask me anything" }, { label: playAction, primary: true }];
const composer = "Ask Trailwell anything…";
const journey = {
  ...adDefaults,
  brand: brand$3,
  domain: "trailwell.com/backpacks",
  ad,
  page: hero,
  knockLine,
  campaignProducts: [catalog.trailwellWeekender, catalog.trailwellRoam, catalog.trailwellOvernight],
  heroCreative: {
    image: weekenderLandscape,
    alt: "Clear 4 hurdles. Earn $5 off. Play a quick game. Find your next backpack. Trailwell Weekender in a mountain landscape."
  },
  campaignCreative: {
    image: `${"/images/dynamic-landing-pages/v2/"}assets/trailwell-ad-creative-v2.webp`,
    alt: "Trailwell backpacks in cobalt, burnt orange and mustard",
    headline: ad.headline,
    detail: "Clear 4 hurdles. Unlock $5 off."
  }
};
const RAYS = [0, 90, 180, 270].map((a) => ({ a, kind: "straight" })).concat([45, 135, 225, 315].map((a) => ({ a, kind: "diagonal" })));
function Sweep({ state, className }) {
  return /* @__PURE__ */ jsxs("div", { className: ["adj-widget adj-widget--expanded gr-sweep", `gr-sweep--s${state}`, className].filter(Boolean).join(" "), "data-name": "Sweep", children: [
    /* @__PURE__ */ jsx("span", { className: "gr-sweep__glow" }),
    /* @__PURE__ */ jsx("span", { className: "gr-sweep__wash" }),
    /* @__PURE__ */ jsx("span", { className: "gr-sweep__band gr-sweep__band--a" }),
    /* @__PURE__ */ jsx("span", { className: "gr-sweep__band gr-sweep__band--b" }),
    /* @__PURE__ */ jsxs("div", { className: "gr-sweep__mark", "data-name": "Spark", children: [
      RAYS.map((r) => /* @__PURE__ */ jsx("span", { className: `gr-sweep__ray gr-sweep__ray--${r.kind}`, style: { "--a": `${r.a}deg` } }, r.a)),
      /* @__PURE__ */ jsx("svg", { className: "gr-sweep__core", viewBox: "0 0 100 100", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M53.7 25.2L8.8 0L26.3 45.9L0.8 92.1L45 75.2L91.2 100L76.9 48.2L99.2 7.9Z", fill: "currentColor" }) })
    ] })
  ] });
}
const pauseIcon = /* @__PURE__ */ jsxs("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx("rect", { x: "1.5", y: "1", width: "2.4", height: "8", rx: "1", fill: "currentColor" }),
  /* @__PURE__ */ jsx("rect", { x: "6.1", y: "1", width: "2.4", height: "8", rx: "1", fill: "currentColor" })
] });
const GROUND = 108.35;
const scene = { sunGlow, sun, ridge, pines, ground, trail, hurdle: hurdleArt, runner };
function SceneImage({ src, x, y, w, h, ...rest }) {
  return /* @__PURE__ */ jsx("image", { href: src, x, y, width: w, height: h, preserveAspectRatio: "none", ...rest });
}
function GameScene({ phase }) {
  const s = gameScenes[phase];
  const airborne = s.lift > 0;
  return /* @__PURE__ */ jsxs("svg", { className: "gr-scene", viewBox: "0 0 425.5 132", preserveAspectRatio: "xMidYMax slice", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "gr-runner-body", children: /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "28.42", height: "40" }) }) }),
    /* @__PURE__ */ jsx(SceneImage, { src: scene.sunGlow, x: 267.55, y: 8.42, w: 40.83, h: 40.83 }),
    /* @__PURE__ */ jsx(SceneImage, { src: scene.sun, x: 276.15, y: 17.02, w: 23.64, h: 23.64 }),
    /* @__PURE__ */ jsx(SceneImage, { src: scene.ridge, x: -42.98 + s.scroll / 4, y: 13.2, w: 548, h: 95.15 }),
    /* @__PURE__ */ jsx(SceneImage, { src: scene.pines, x: 21.49 + s.scroll / 2, y: 80.42, w: 444.85, h: 27.94 }),
    /* @__PURE__ */ jsx(SceneImage, { src: scene.ground, x: 0, y: GROUND, w: 425.5, h: 23.64 }),
    /* @__PURE__ */ jsx(SceneImage, { src: scene.trail, x: -1.07 + s.scroll % 24, y: 119.1, w: 453.44, h: 2.15 }),
    airborne && /* @__PURE__ */ jsx(
      "path",
      {
        d: `M${s.runnerX - 48} ${GROUND - 2}Q${s.runnerX + 2} ${GROUND - 78} ${s.runnerX + 14} ${GROUND - s.lift - 4}`,
        fill: "none",
        stroke: "#fff9e9",
        strokeOpacity: ".5",
        strokeWidth: "1.5",
        strokeDasharray: "1 5",
        strokeLinecap: "round"
      }
    ),
    s.hurdles.map((x) => /* @__PURE__ */ jsx(SceneImage, { src: scene.hurdle, x, y: 80.42, w: 30.09, h: 27.94 }, x)),
    airborne ? /* @__PURE__ */ jsxs("g", { "data-name": "Runner", children: [
      /* @__PURE__ */ jsx("ellipse", { cx: s.runnerX + 14.2, cy: GROUND + 2.5, rx: 7, ry: 1.6, fill: "#002d17", opacity: ".35" }),
      /* @__PURE__ */ jsx("g", { transform: `translate(${s.runnerX} ${67.33 - s.lift}) rotate(-8 14.2 20)`, children: /* @__PURE__ */ jsx(SceneImage, { src: scene.runner, preserveAspectRatio: "xMidYMid meet", x: 0, y: 0, w: 28.42, h: 45.86, clipPath: "url(#gr-runner-body)" }) })
    ] }) : /* @__PURE__ */ jsx(SceneImage, { src: scene.runner, preserveAspectRatio: "xMidYMid meet", x: s.runnerX, y: 67.33, w: 28.42, h: 45.86, "data-name": "Runner" })
  ] });
}
const jumpIcon = /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M6 10V2M2.5 5.5L6 2l3.5 3.5" }) });
function Game({ cleared, loading, previous, scene: sceneOverride, action }) {
  if (loading) {
    return /* @__PURE__ */ jsxs("section", { className: "gr-game gr-game--loading", "data-name": "Game", children: [
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: 132, radius: 12 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: 40, radius: 999 })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { className: "gr-game", "data-name": "Game", children: [
    /* @__PURE__ */ jsxs("div", { className: "gr-game__stage", "data-name": "Stage", children: [
      /* @__PURE__ */ jsxs("span", { className: "gr-game__count", children: [
        /* @__PURE__ */ jsxs("span", { className: "gr-game__num", children: [
          previous !== void 0 && previous !== cleared && /* @__PURE__ */ jsx("span", { className: "gr-game__digit gr-game__digit--out", children: previous }, `out-${previous}`),
          /* @__PURE__ */ jsx("span", { className: "gr-game__digit", children: cleared }, cleared)
        ] }),
        " / ",
        hurdles,
        " hurdles"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "gr-game__pause", "aria-label": "Pause", children: pauseIcon }),
      sceneOverride ?? /* @__PURE__ */ jsx(GameScene, { phase: cleared ? "progress" : "start" })
    ] }),
    action ?? /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Jump", className: "gr-game__jump", iconTrailing: jumpIcon })
  ] });
}
const beats$5 = [
  { id: "ad", type: "pause", ms: 1400 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 750 },
  { id: "widget", type: "text", text: invite },
  { id: "prompts", type: "appear", ms: 1200 },
  { id: "pick-play", type: "appear", ms: 160 },
  // The pick's press is still settling when the widget starts to grow,
  // and the sweep starts while the morph is still landing — its green
  // slides in from above the panel, so tap → grow → flood is one gesture.
  { id: "expand", type: "appear", ms: 240 },
  // One continuous take (GamesRewardsMotion.css, done by ~1000ms): every layer
  // runs its own single track through Figma's six frames; nothing stops
  // at a frame. The reveal starts at 960ms, as the star's points leave
  // the panel, so the chat rises straight out of the cream.
  { id: "sweep", type: "appear", ms: 960 },
  { id: "reveal", type: "appear", ms: 650 },
  { id: "game-load", type: "load", ms: 800 },
  { id: "game", type: "appear", ms: 900 },
  // The run is one CSS track (GamesRewardsMotion.css, grm-hurdles/
  // grm-jump): these lengths are its tap times, so each Jump press lands
  // on the frame the bag starts its crouch. Hurdle 3 holds longer for
  // its toast; win starts on the last landing.
  { id: "run", type: "appear", ms: 546 },
  { id: "hurdle-1", type: "appear", ms: 933 },
  { id: "hurdle-2", type: "appear", ms: 933 },
  { id: "hurdle-3", type: "appear", ms: 1067 },
  { id: "hurdle-4", type: "appear", ms: 750 },
  { id: "win", type: "appear", ms: 900 },
  { id: "reward", type: "appear", ms: 700 },
  { id: "hold", type: "pause", ms: 1600 }
];
const HURDLE_BEATS = ["hurdle-1", "hurdle-2", "hurdle-3", "hurdle-4"];
function StageReward() {
  return /* @__PURE__ */ jsxs("div", { className: "grm-prize", children: [
    /* @__PURE__ */ jsx("div", { className: "grm-prize__tile", children: /* @__PURE__ */ jsx("img", { src: product$3.image, alt: product$3.title }) }),
    /* @__PURE__ */ jsxs("div", { className: "grm-prize__col", children: [
      /* @__PURE__ */ jsxs("p", { className: "gr-reward grm-prize__headline", children: [
        "All four cleared. ",
        reward
      ] }),
      /* @__PURE__ */ jsx("span", { className: "grm-prize__title", children: product$3.title }),
      /* @__PURE__ */ jsxs("span", { className: "grm-prize__price", children: [
        product$3.price,
        /* @__PURE__ */ jsx("s", { children: product$3.originalPrice })
      ] })
    ] })
  ] });
}
function GameAction({ claimed }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: cx$1("ill-button ill-button--primary gr-game__jump grm-action", claimed && "grm-action--cart"), children: [
    /* @__PURE__ */ jsxs("span", { className: "grm-action__label grm-action__label--jump", children: [
      "Jump ",
      jumpIcon
    ] }),
    /* @__PURE__ */ jsx("span", { className: "grm-action__label grm-action__label--cart", children: "Add to cart" })
  ] });
}
const RUN_HURDLES = [230, 370, 510, 670];
const RUNNER = { x: 110, y: 67.33 };
function SceneLayer({ className, children }) {
  return /* @__PURE__ */ jsx("svg", { className: cx$1("gr-scene", className), viewBox: "0 0 425.5 132", preserveAspectRatio: "xMidYMax slice", "aria-hidden": "true", children });
}
function RunScene() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(SceneLayer, { className: "grm-run__scenery", children: [
      /* @__PURE__ */ jsx(SceneImage, { src: scene.sunGlow, x: 267.55, y: 8.42, w: 40.83, h: 40.83 }),
      /* @__PURE__ */ jsx(SceneImage, { src: scene.sun, x: 276.15, y: 17.02, w: 23.64, h: 23.64 }),
      /* @__PURE__ */ jsx(SceneImage, { src: scene.ridge, x: -42.98, y: 13.2, w: 548, h: 95.15 }),
      /* @__PURE__ */ jsx(SceneImage, { src: scene.pines, x: 21.49, y: 80.42, w: 444.85, h: 27.94 }),
      /* @__PURE__ */ jsx(SceneImage, { src: scene.ground, x: 0, y: 108.35, w: 425.5, h: 23.64 }),
      /* @__PURE__ */ jsx(SceneImage, { src: scene.trail, x: -1.07, y: 119.1, w: 453.44, h: 2.15 })
    ] }),
    /* @__PURE__ */ jsx(SceneLayer, { className: "grm-run__hurdles", children: RUN_HURDLES.map((x) => /* @__PURE__ */ jsx(SceneImage, { src: scene.hurdle, x, y: 80.42, w: 30.09, h: 27.94 }, x)) }),
    /* @__PURE__ */ jsx(SceneLayer, { className: "grm-run__shadow", children: /* @__PURE__ */ jsx("ellipse", { cx: RUNNER.x + 14.21, cy: RUNNER.y + 43.17, rx: 11.82, ry: 1.34, fill: "#002d17" }) }),
    /* @__PURE__ */ jsx("div", { className: "grm-run__runner", children: /* @__PURE__ */ jsxs(SceneLayer, { className: "grm-run__body", children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "grm-runner-body", children: /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "28.42", height: "40" }) }) }),
      /* @__PURE__ */ jsx("g", { transform: `translate(${RUNNER.x} ${RUNNER.y})`, children: /* @__PURE__ */ jsx(SceneImage, { src: scene.runner, preserveAspectRatio: "xMidYMid meet", x: 0, y: 0, w: 28.42, h: 45.86, clipPath: "url(#grm-runner-body)" }) })
    ] }) })
  ] });
}
function Widgets$1({ t }) {
  const layerRef = useRef(null);
  const surfaceRef = useRef(null);
  const compactRef = useRef(null);
  const expandedRef = useRef(null);
  const viewportRef = useRef(null);
  const showCompact = t.reached("widget");
  const expanding = t.reached("expand");
  const revealed = t.reached("reveal");
  const sweeping = t.reached("sweep");
  const gameReady = t.reached("game");
  const cleared = HURDLE_BEATS.filter((id) => t.reached(id)).length;
  const rewarded = t.reached("reward");
  const composerDefault = useContext(StorybookComposerDefault);
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const compact = compactRef.current;
    const expanded = expandedRef.current;
    if (!showCompact || !layer || !surface || !compact || !expanded) return;
    const box = layer.getBoundingClientRect();
    const zoom = layer.offsetWidth ? box.width / layer.offsetWidth : 1;
    const place = (name, el) => {
      const r = el.getBoundingClientRect();
      const insets = {
        t: (r.top - box.top) / zoom,
        r: (box.right - r.right) / zoom,
        b: (box.bottom - r.bottom) / zoom,
        l: (r.left - box.left) / zoom
      };
      for (const [side, value] of Object.entries(insets)) surface.style.setProperty(`--adjm-${name}-${side}`, `${value}px`);
    };
    place("from", compact);
    place("to", expanded);
  }, [showCompact]);
  useFollowLatest$1(viewportRef, { thread: ".gr-thread", index: t.index, reducedMotion: t.reducedMotion });
  return /* @__PURE__ */ jsxs("div", { className: cx$1("adjm-layer", showCompact && "adjm-layer--in"), ref: layerRef, children: [
    /* @__PURE__ */ jsx("div", { className: cx$1("adjm-surface", expanding && "adjm-surface--open"), ref: surfaceRef }),
    showCompact && composerDefault && /* @__PURE__ */ jsx(
      KnockBar,
      {
        barRef: compactRef,
        className: cx$1("adjm-compact", expanding && "adjm-compact--out"),
        line: knockLine,
        doors: knockDoors,
        value: composer,
        knock: t.reached("prompts"),
        pressed: t.reached("pick-play") ? playAction : void 0,
        out: expanding
      }
    ),
    showCompact && !composerDefault && /* @__PURE__ */ jsx(
      Shell,
      {
        brand: brand$3,
        rootRef: compactRef,
        className: cx$1(
          "adj-widget adj-widget--compact adjm-compact gr gr-compact",
          t.reached("prompts") && "adjm-compact--prompts",
          expanding && "adjm-compact--out"
        ),
        composer: /* @__PURE__ */ jsx(Fragment, {}),
        children: /* @__PURE__ */ jsxs(AssistantTurn, { children: [
          /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: invite }) }),
          /* @__PURE__ */ jsx(AiPills, { options: prompts, selectedId: t.reached("pick-play") ? "play" : "" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Shell,
      {
        brand: brand$3,
        rootRef: expandedRef,
        viewportRef,
        className: cx$1("adj-widget adj-widget--expanded adjm-expanded gr", revealed && "adjm-expanded--open"),
        header: /* @__PURE__ */ jsx(ChatHeader, { brand: brand$3, showExpand: false }),
        composer: /* @__PURE__ */ jsx(ChatComposer, { value: composer }),
        children: /* @__PURE__ */ jsx("div", { className: "gr-thread", children: revealed && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: playAction }) }),
          /* @__PURE__ */ jsx(AssistantTurn, { className: "gr-turn", children: /* @__PURE__ */ jsxs("div", { className: cx$1(
            "grm-game",
            `grm-game--${cleared}`,
            gameReady && "grm-game--ready",
            t.reached("run") && "grm-game--running",
            t.reached("win") && "grm-game--win"
          ), children: [
            /* @__PURE__ */ jsx(
              Game,
              {
                cleared,
                previous: cleared > 0 ? cleared - 1 : void 0,
                scene: /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(RunScene, {}),
                  rewarded && /* @__PURE__ */ jsx(StageReward, {})
                ] }),
                action: /* @__PURE__ */ jsx(GameAction, { claimed: rewarded })
              }
            ),
            !t.reached("run") && /* @__PURE__ */ jsx("div", { className: "grm-game__skeleton", children: /* @__PURE__ */ jsx(Game, { loading: true }) })
          ] }) })
        ] }) })
      }
    ),
    sweeping && /* @__PURE__ */ jsx(Sweep, { state: 1, className: cx$1("grm-sweep", revealed && "grm-sweep--done") })
  ] });
}
const knockBeats$1 = beats$5.map(
  (b) => b.id === "widget" ? { id: "widget", type: "pause", ms: 1200 } : b.id === "prompts" ? { ...b, ms: 883 + 3600 } : b.id === "pick-play" ? { ...b, ms: 450 } : b
);
function Scene$5({ t }) {
  return /* @__PURE__ */ jsxs("div", { className: cx$1("adj adjm grm", t.reached("tap-ad") && "adjm--tap", t.reached("store") && "adjm--store"), children: [
    /* @__PURE__ */ jsx(InstagramAd, { copy: ad }),
    /* @__PURE__ */ jsx("div", { className: "adjm-plate" }),
    /* @__PURE__ */ jsx(Storefront, { hero, widget: /* @__PURE__ */ jsx(Widgets$1, { t }) })
  ] });
}
function GamesRewardsMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const composerDefault = useContext(StorybookComposerDefault);
  const t = useChatTimeline(composerDefault ? knockBeats$1 : beats$5, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(AdJourneyProvider, { value: journey, children: /* @__PURE__ */ jsx(Scene$5, { t }, t.runKey) }) });
}
function AiStatusIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "ill-ai-status-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 10.0015 10.0015",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsxs("g", { className: "ill-ai-status-icon__shape", children: [
        /* @__PURE__ */ jsxs("g", { className: "ill-ai-status-icon__spokes", children: [
          /* @__PURE__ */ jsx("path", { d: "M5.16982 1.36618e-08L5.16982 3.58808", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M5.16982 6.41338L5.16982 10.0015", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M10.0015 4.87603L6.48029 4.87603", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M3.52148 4.87603L0.000305653 4.87603", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" })
        ] }),
        /* @__PURE__ */ jsxs("g", { className: "ill-ai-status-icon__ticks", children: [
          /* @__PURE__ */ jsx("path", { d: "M3.76818 3.63487L2.62108 2.48778", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M7.56878 7.45211L6.42169 6.30502", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M6.41942 3.6349L7.56651 2.48781", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M2.62359 7.4521L3.77069 6.30501", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" })
        ] }),
        /* @__PURE__ */ jsx("rect", { className: "ill-ai-status-icon__center", x: "4.40987", y: "4.27743", width: "1.40034", height: "1.40034", fill: "#462160" })
      ] })
    }
  );
}
function AiStatus({
  label,
  visible = true,
  icon
}) {
  const [current, setCurrent] = useState(label);
  const [previous, setPrevious] = useState(null);
  const currentRef = useRef(current);
  useEffect(() => {
    if (label !== currentRef.current) {
      setPrevious(currentRef.current);
      setCurrent(label);
      currentRef.current = label;
    }
  }, [label]);
  return /* @__PURE__ */ jsxs("div", { className: `ill-ai-status${visible ? "" : " ill-ai-status--hidden"}`, children: [
    icon ?? /* @__PURE__ */ jsx(AiStatusIcon, {}),
    /* @__PURE__ */ jsxs("span", { className: "ill-ai-status__label-stack", children: [
      previous && previous !== current && /* @__PURE__ */ jsx("span", { className: "ill-ai-status__label ill-ai-status__label--exiting", "aria-hidden": "true", children: previous }),
      /* @__PURE__ */ jsx("span", { className: "ill-ai-status__label", children: current }, current)
    ] })
  ] });
}
const brand$2 = catalog.sorelleHydrating.brand;
const url$2 = "sorellelabs.com/serums/daily-hydrating";
const product$2 = {
  name: catalog.sorelleHydrating.title,
  eyebrow: "Sorelle Labs · Daily hydration",
  price: catalog.sorelleHydrating.price,
  image: catalog.sorelleHydrating.image,
  size: "30 ml",
  description: "A lightweight, fragrance-free serum for everyday hydration. Layer it under moisturiser morning and night to keep skin soft, comfortable and supported."
};
const insight = {
  label: "Is it right for sensitive skin?",
  text: "Fragrance-free daily hydration that supports your skin barrier.",
  more: "See more"
};
const summary = {
  label: "AI summary",
  text: "Sorelle Labs Daily Hydrating Serum is fragrance-free and formulated to support sensitive skin. Lightweight daily hydration helps support your skin barrier.",
  more: "Show more",
  less: "Show less",
  details: [
    { id: "formula", title: "Fragrance-free", body: "Formulated without added fragrance." },
    { id: "hydration", title: "Daily hydration", body: "A lightweight serum for your daily routine." },
    { id: "barrier", title: "Skin barrier support", body: "Supports your skin barrier." },
    { id: "size", title: "Bottle size", body: "30 ml per bottle." }
  ]
};
const specificInfo = {
  label: "Looking for specific info?",
  placeholder: "Ask AI about this serum",
  chips: [
    { id: "fragrance", text: "Is it fragrance-free?" },
    { id: "routine", text: "How do I use it?" },
    { id: "size", text: "What size is the bottle?" }
  ]
};
const lookingChips = [
  { id: "fragrance", text: "Safe for sensitive skin?" },
  { id: "drops", text: "How many drops?" },
  { id: "retinol", text: "Use with retinol?" }
];
const askAiChips$1 = [
  { id: "fragrance", text: "Fragrance-free?" },
  { id: "routine", text: "How to use it?" },
  { id: "size", text: "Bottle size?" }
];
const detailAnswer = "Yes, Sorelle Labs Daily Hydrating Serum is fragrance-free and formulated to support sensitive skin. It helps hydrate and support your skin barrier.";
const detailFollowUps = [
  { id: "ingredients", text: "Full ingredients" },
  { id: "pairing", text: "Pair with a moisturiser" }
];
const directAsk = {
  chipId: "fragrance",
  answer: detailAnswer,
  followUps: detailFollowUps
};
function Pdp$1({
  step,
  summary: summarySlot,
  specificSelected = "",
  specific
}) {
  return /* @__PURE__ */ jsxs("div", { className: "ask-page", children: [
    /* @__PURE__ */ jsxs("header", { className: "ill-chat-header ask-nav", children: [
      /* @__PURE__ */ jsx("span", { className: "ask-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: brand$2 }) }),
      /* @__PURE__ */ jsx(StoreNavItems, {}),
      /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
        /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline" }),
        /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Cart", variant: "outline" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-pdp", children: [
      /* @__PURE__ */ jsxs("div", { className: "ask-gallery", children: [
        /* @__PURE__ */ jsx("div", { className: "ask-gallery__main", children: /* @__PURE__ */ jsx("img", { src: product$2.image, alt: `${brand$2} ${product$2.name}, ${product$2.size}` }) }),
        /* @__PURE__ */ jsx("div", { className: "ask-gallery__thumbs", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: i === 0 ? "ask-gallery__thumb ask-gallery__thumb--active" : "ask-gallery__thumb", children: /* @__PURE__ */ jsx("img", { src: product$2.image, alt: "" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ask-details", children: [
        /* @__PURE__ */ jsxs("div", { className: "ask-details__head", children: [
          /* @__PURE__ */ jsx("p", { className: "ask-details__eyebrow", children: product$2.eyebrow }),
          /* @__PURE__ */ jsx("h2", { children: product$2.name }),
          /* @__PURE__ */ jsx("div", { className: "ask-details__meta", children: /* @__PURE__ */ jsx("span", { className: "ask-details__price", children: product$2.price }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: step >= 2 ? "ask-insight ask-insight--active" : "ask-insight", "data-name": "Insight", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            insight.label
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ask-insight__text", children: insight.text }),
          /* @__PURE__ */ jsxs("span", { className: "ask-insight__more", children: [
            insight.more,
            " →"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ask-colour", children: /* @__PURE__ */ jsxs("p", { className: "ask-colour__label", children: [
          "Size: ",
          /* @__PURE__ */ jsx("b", { children: product$2.size })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Add to cart", className: "ask-details__cta" }),
        summarySlot ?? /* @__PURE__ */ jsxs("section", { className: "ask-summary", "data-name": "AI summary", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            summary.label
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "ask-summary__text", children: [
            summary.text,
            " ",
            /* @__PURE__ */ jsx("span", { className: "ask-link", children: summary.more })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "ask-specific", "data-name": "Specific info", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            specificInfo.label
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ask-field", children: [
            /* @__PURE__ */ jsx(Icon, { name: "search", size: 12 }),
            /* @__PURE__ */ jsx("span", { children: specificInfo.placeholder })
          ] }),
          specific ?? /* @__PURE__ */ jsx(AiPills, { options: specificInfo.chips, selectedId: specificSelected })
        ] })
      ] })
    ] })
  ] });
}
const badges$1 = [
  { id: "ff", mark: "FF", label: "Fragrance-free" },
  { id: "vg", mark: "VG", label: "Vegan" },
  { id: "dt", mark: "DT", label: "Derm tested" },
  { id: "cf", mark: "CF", label: "Cruelty-free" }
];
const accordion = ["How to use", "Ingredients", "What to expect"];
function AskChips({ options, selected, grid = false, other = "Ask something else" }) {
  return /* @__PURE__ */ jsxs("div", { className: grid ? "aski-chips aski-chips--grid" : "aski-chips", children: [
    options.map((o) => /* @__PURE__ */ jsx("span", { className: o.id === selected ? "aski-chip aski-chip--on" : "aski-chip", children: o.text }, o.id)),
    /* @__PURE__ */ jsx("span", { className: "aski-chip aski-chip--solid", children: other })
  ] });
}
function AskAiSection({ children, chips = askAiChips$1, other }) {
  return /* @__PURE__ */ jsxs("section", { className: "aski-block", "data-name": "Ask AI", children: [
    /* @__PURE__ */ jsxs("p", { className: "aski-title", children: [
      /* @__PURE__ */ jsx(Icon, { name: "insight", size: 14 }),
      "Ask AI"
    ] }),
    children ?? /* @__PURE__ */ jsx(AskChips, { options: chips, grid: true, other })
  ] });
}
function PdpFrameV2({
  brand: brandName,
  cart,
  image,
  alt,
  thumbs,
  badges: badgeList,
  askAi,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "ask-page aski-page", children: [
    /* @__PURE__ */ jsxs("header", { className: "ill-chat-header ask-nav", children: [
      /* @__PURE__ */ jsx("span", { className: "ask-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: brandName }) }),
      /* @__PURE__ */ jsx(StoreNavItems, {}),
      /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
        /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline" }),
        cart ?? /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Cart", variant: "outline" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-pdp aski-pdp", children: [
      /* @__PURE__ */ jsxs("div", { className: "ask-gallery aski-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "aski-media", children: [
          /* @__PURE__ */ jsx("div", { className: "aski-thumbs", children: thumbs.map((thumb, i) => /* @__PURE__ */ jsx("div", { className: i === 0 ? "ask-gallery__thumb ask-gallery__thumb--active" : "ask-gallery__thumb", children: thumb }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "ask-gallery__main aski-main", "aria-label": alt, children: image })
        ] }),
        badgeList && /* @__PURE__ */ jsx("ul", { className: "aski-badges", children: badgeList.map((b) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { className: "aski-badge__mark", children: b.mark }),
          b.label
        ] }, b.id)) }),
        askAi
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ask-details aski-right", children })
    ] })
  ] });
}
function RatingRow({ rating = "4.8", count = "212 reviews" }) {
  return /* @__PURE__ */ jsxs("div", { className: "aski-rating", children: [
    /* @__PURE__ */ jsx("span", { className: "aski-stars", "aria-label": `${rating} out of 5`, children: "★★★★★" }),
    rating,
    " ",
    /* @__PURE__ */ jsx("span", { className: "aski-rating__count", children: count })
  ] });
}
function PdpV2$1({
  step,
  summary: summarySlot,
  specificSelected = "",
  specific,
  askAi
}) {
  return /* @__PURE__ */ jsxs(
    PdpFrameV2,
    {
      brand: brand$2,
      image: /* @__PURE__ */ jsx("img", { src: product$2.image, alt: `${brand$2} ${product$2.name}, ${product$2.size}` }),
      thumbs: [0, 1, 2, 3].map(() => /* @__PURE__ */ jsx("img", { src: product$2.image, alt: "" })),
      badges: badges$1,
      askAi: askAi ?? /* @__PURE__ */ jsx(AskAiSection, {}),
      children: [
        /* @__PURE__ */ jsx(RatingRow, {}),
        /* @__PURE__ */ jsxs("p", { className: step >= 2 ? "ask-insight aski-insight ask-insight--active" : "ask-insight aski-insight", "data-name": "Insight", children: [
          /* @__PURE__ */ jsx(Icon, { name: "insight", size: 11 }),
          /* @__PURE__ */ jsx("span", { className: "aski-insight__text", children: insight.label }),
          /* @__PURE__ */ jsx("span", { className: "ask-insight__more", children: insight.more })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "aski-head", children: [
          /* @__PURE__ */ jsx("h2", { className: "aski-name", children: product$2.name }),
          /* @__PURE__ */ jsx("p", { className: "aski-subline", children: "30 ml · Daily hydration · All skin types" }),
          /* @__PURE__ */ jsx("p", { className: "aski-price", children: product$2.price })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "aski-desc", children: product$2.description }),
        summarySlot ?? /* @__PURE__ */ jsxs("section", { className: "ask-summary ask-summary--clamp", "data-name": "AI summary", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            summary.label
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ask-summary__text", children: summary.text }),
          /* @__PURE__ */ jsx("span", { className: "ask-link ask-summary__more", children: summary.more })
        ] }),
        /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Add to cart", className: "ask-details__cta" }),
        /* @__PURE__ */ jsxs("div", { className: "aski-secondary", children: [
          "Subscribe & save 15% · ",
          product$2.price
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "aski-acc", children: [
          /* @__PURE__ */ jsxs("div", { className: "aski-acc__row", children: [
            /* @__PURE__ */ jsx("span", { children: "Why it works" }),
            /* @__PURE__ */ jsxs("span", { className: "aski-acc__ai", children: [
              /* @__PURE__ */ jsx(Icon, { name: "insight", size: 11 }),
              "Summarize this"
            ] }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⌃" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "aski-acc__body", children: [
            insight.text,
            " A lightweight serum that layers under moisturiser, morning and night."
          ] }),
          accordion.map((r) => /* @__PURE__ */ jsxs("div", { className: "aski-acc__row", children: [
            /* @__PURE__ */ jsx("span", { children: r }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⌄" })
          ] }, r))
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "ask-specific", "data-name": "Specific info", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            specificInfo.label
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ask-field", children: [
            /* @__PURE__ */ jsx(Icon, { name: "search", size: 12 }),
            /* @__PURE__ */ jsx("span", { children: specificInfo.placeholder })
          ] }),
          specific ?? /* @__PURE__ */ jsx(AiPills, { options: lookingChips, selectedId: specificSelected })
        ] })
      ]
    }
  );
}
const chipId = "fragrance";
askAiChips$1.find((c) => c.id === chipId);
function toPieces(text) {
  const pieces = [];
  let wordIndex = -1;
  let endedWithSpace = true;
  text.split("**").forEach((segment, i) => {
    segment.split(/(\s+)/).forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        endedWithSpace = true;
        return;
      }
      if (endedWithSpace) wordIndex += 1;
      pieces.push({ text: token, bold: i % 2 === 1, wordIndex, spaceBefore: endedWithSpace && pieces.length > 0 });
      endedWithSpace = false;
    });
  });
  return pieces;
}
function RichStagger({ text }) {
  if (!text.includes("**")) return /* @__PURE__ */ jsx(StaggerText, { text });
  return /* @__PURE__ */ jsx(Fragment, { children: toPieces(text).map((piece, i) => {
    const Tag2 = piece.bold ? "strong" : "span";
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      piece.spaceBefore ? " " : "",
      /* @__PURE__ */ jsx(Tag2, { className: "ill-stagger-text__word", style: { animationDelay: `${piece.wordIndex * 45}ms` }, children: piece.text })
    ] }, i);
  }) });
}
function Thinking({ t, id }) {
  const status = t.status(id);
  return status ? /* @__PURE__ */ jsx(AiStatus, { label: status.label, visible: status.visible }) : null;
}
function AssistantText({ text }) {
  return /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(RichStagger, { text }) });
}
const CAMERA_MS = 900;
const CAMERA_LEAD_MS = CAMERA_MS + 150;
const PULLBACK_MS = 760;
const EASE_MOVE = "cubic-bezier(0.76, 0, 0.24, 1)";
const LENS = [1.45, 1.25, 1];
const PAD = 28;
const INSIGHT_INBOX_CAMERA = {
  w: 687,
  h: 586,
  focus: {
    wide: null,
    // The input, with room above for the exchange it adds to.
    ask: { sel: [".ib-panel__input"], above: 150 },
    // The newest question and answer (and the button once it's there).
    copilot: { sel: [".ib-copilot > :nth-last-child(-n+2)"] },
    // The customer's message and the reply the draft types into.
    reply: { sel: [".ib-msg--customer", ".ib-reply"] }
  }
};
const FULL = { k: 1, tx: 0, ty: 0 };
function measure(lens, sel, W, H) {
  const base = lens.getBoundingClientRect();
  const scale = base.width / W;
  if (!scale) return null;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const s of sel) {
    lens.querySelectorAll(s).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 1) return;
      x0 = Math.min(x0, (r.left - base.left) / scale);
      y0 = Math.min(y0, (r.top - base.top) / scale);
      x1 = Math.max(x1, (r.right - base.left) / scale);
      y1 = Math.max(y1, (r.bottom - base.top) / scale);
    });
  }
  if (x0 === Infinity) return null;
  x0 = Math.max(0, x0);
  y0 = Math.max(0, y0);
  x1 = Math.min(W, x1);
  y1 = Math.min(H, y1);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
const clamp = (t, k, size, inset = 24) => {
  const a = inset, b = size - inset;
  return Math.min(a - a * k, Math.max(b - b * k, t));
};
function fit(r, W, H, above = 0, inset = 24) {
  const y = Math.max(0, r.y - above);
  const h = r.y + r.h - y;
  const k = LENS.find((z) => (r.w + 2 * PAD) * z <= W && (h + 2 * PAD) * z <= H) ?? 1;
  if (k === 1) return FULL;
  return {
    k,
    tx: clamp(W / 2 - (r.x + r.w / 2) * k, k, W, inset),
    ty: clamp(H / 2 - (y + h / 2) * k, k, H, inset)
  };
}
function inView(r, v, W, H) {
  const left = r.x * v.k + v.tx, top = r.y * v.k + v.ty;
  return left >= -1 && top >= -1 && left + r.w * v.k <= W + 1 && top + r.h * v.k <= H + 1;
}
function useFrameCamera(shot, animate, runKey, config = INSIGHT_INBOX_CAMERA) {
  const { w: W, h: H, focus: FOCUS, inset: INSET = 24 } = config;
  const stageRef = useRef(null);
  const lensRef = useRef(null);
  const [view, setView] = useState(FULL);
  const [moving, setMoving] = useState(false);
  const [pullback, setPullback] = useState(false);
  const viewRef = useRef(view);
  const movingRef = useRef(false);
  useEffect(() => {
    viewRef.current = FULL;
    setView(FULL);
  }, [runKey]);
  const go = useCallback(
    (next, isPullback = false) => {
      const cur = viewRef.current;
      if (Math.abs(cur.k - next.k) < 1e-3 && Math.abs(cur.tx - next.tx) < 1 && Math.abs(cur.ty - next.ty) < 1) return;
      viewRef.current = next;
      setPullback(isPullback);
      if (animate) {
        movingRef.current = true;
        setMoving(true);
      }
      setView(next);
    },
    [animate]
  );
  const frame = useCallback(() => {
    const lens = lensRef.current;
    const f = FOCUS[shot] ?? null;
    if (!lens) return;
    if (!f) return go(FULL, true);
    const r = measure(lens, f.sel, W, H);
    if (r) go(fit(r, W, H, f.above, INSET));
  }, [shot, go]);
  useLayoutEffect(() => {
    if (!animate) return;
    frame();
  }, [shot, animate, frame]);
  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      const lens = lensRef.current;
      const f = FOCUS[shot] ?? null;
      if (!lens || !f || movingRef.current) return;
      const r = measure(lens, f.sel, W, H);
      if (r && !inView(r, viewRef.current, W, H)) go(fit(r, W, H, f.above, INSET));
    }, 250);
    return () => window.clearInterval(id);
  }, [shot, animate, go]);
  const onTransitionEnd = (e) => {
    if (e.target !== lensRef.current || e.propertyName !== "transform") return;
    movingRef.current = false;
    setMoving(false);
  };
  return {
    stageRef,
    lensRef,
    onTransitionEnd,
    stageClassName: "ib-stage",
    stageStyle: void 0,
    className: ["ib-lens", moving && "ib-lens--moving"].filter(Boolean).join(" "),
    style: {
      transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.k})`,
      transition: animate ? `transform ${pullback ? PULLBACK_MS : CAMERA_MS}ms ${EASE_MOVE}` : "none"
    }
  };
}
const beats$4 = [
  { id: "pdp", type: "pause", ms: 1400 },
  { id: "focus", type: "pause", ms: CAMERA_LEAD_MS },
  { id: "pick", type: "appear", ms: 650 },
  { id: "ask", type: "appear", ms: 450 },
  { id: "think", type: "think", labels: ["Checking the formula…"] },
  // Skeleton holds the answer's shape so the text lands without a jump.
  { id: "skeleton", type: "load", ms: 1200 },
  { id: "answer", type: "text", text: detailAnswer },
  { id: "follow-ups", type: "appear", ms: 700 },
  { id: "read", type: "pause", ms: 2600 },
  { id: "release", type: "pause", ms: 1200 }
];
const CAMERA = {
  w: 554,
  h: 575,
  inset: 0,
  focus: {
    wide: null,
    // The Ask AI section, with the badges above as context.
    ask: { sel: [".aski-block"], above: 40 }
  }
};
const chip = askAiChips$1.find((c) => c.id === "fragrance");
function AskBlock({ t }) {
  return /* @__PURE__ */ jsx(AskAiSection, { children: !t.reached("ask") ? /* @__PURE__ */ jsx("div", { className: cx$1("askim-chips", t.reached("pick") && "askim-chips--picked"), children: /* @__PURE__ */ jsx(AskChips, { grid: true, options: askAiChips$1, selected: t.reached("pick") ? chip.id : "" }) }) : /* @__PURE__ */ jsxs("div", { className: "aski-thread askim-thread", children: [
    /* @__PURE__ */ jsx("p", { className: "aski-q", children: chip.text }),
    /* @__PURE__ */ jsx(Thinking, { t, id: "think" }),
    t.loading("skeleton") && /* @__PURE__ */ jsxs("div", { className: "askim-skeleton", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: 10, radius: 4 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "94%", height: 10, radius: 4 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "88%", height: 10, radius: 4 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "52%", height: 10, radius: 4 })
    ] }),
    t.reached("answer") && /* @__PURE__ */ jsx(AssistantText, { text: detailAnswer }),
    t.reached("follow-ups") && /* @__PURE__ */ jsx("div", { className: "askim-in", children: /* @__PURE__ */ jsx(AskChips, { options: detailFollowUps }) })
  ] }) });
}
function Scene$4({ t }) {
  const shot = t.reached("focus") && !t.reached("release") ? "ask" : "wide";
  const camera = useFrameCamera(shot, !t.reducedMotion, t.runKey, CAMERA);
  const pageRef = useRef(null);
  useEffect(() => {
    var _a;
    pageRef.current = ((_a = camera.lensRef.current) == null ? void 0 : _a.querySelector(".aski-pdp")) ?? null;
  }, []);
  useFollowLatest$1(pageRef, { thread: ".askim-thread", clearance: 48, index: t.index, reducedMotion: t.reducedMotion });
  return /* @__PURE__ */ jsx("div", { className: "ask askim", children: /* @__PURE__ */ jsx("article", { className: "ask-store", children: /* @__PURE__ */ jsxs("div", { ref: camera.lensRef, className: cx$1(camera.className, "askim-lens"), style: camera.style, onTransitionEnd: camera.onTransitionEnd, children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { children: url$2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-viewport", children: [
      /* @__PURE__ */ jsx(PdpV2$1, { step: 1, askAi: /* @__PURE__ */ jsx(AskBlock, { t }) }),
      /* @__PURE__ */ jsx(ContentFade, {}),
      /* @__PURE__ */ jsx(
        TapRing,
        {
          target: ".askim-chips .aski-chip--on",
          tap: t.reached("pick") ? 1 : 0,
          point: t.reached("focus") && !t.reached("think") ? t.reached("ask") ? ".aski-q" : `.askim-chips .aski-chip:nth-child(${askAiChips$1.indexOf(chip) + 1})` : null
        }
      )
    ] })
  ] }) }) });
}
function AskAiInlineMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$4, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$4, { t }, t.runKey) });
}
const courtProfile = "/images/dynamic-landing-pages/v2/assets/court-01-profile-DERNvCRo.webp";
const courtOverhead = "/images/dynamic-landing-pages/v2/assets/court-01-overhead-Cq5u_wrK.webp";
const brand$1 = catalog.strideCourt01.brand;
const url$1 = "stride.com/products/court-01";
const product$1 = {
  ...catalog.strideCourt01,
  name: catalog.strideCourt01.title,
  eyebrow: "Stride · Leather collection",
  sizes: ["US 9", "US 9.5", "US 10", "US 10.5", "US 11"]
};
const gallery = [
  { image: product$1.image, alt: "Court 01 Leather Sneaker in chalk, three-quarter view" },
  { image: courtProfile, alt: "Court 01 Leather Sneaker, side profile" },
  { image: courtOverhead, alt: "Court 01 Leather Sneaker, overhead view" }
];
const askAiChips = [
  { id: "fit", text: "True to size?" },
  { id: "care", text: "How to clean?" },
  { id: "wear", text: "Wide feet?" }
];
const v2 = {
  badges: [
    { id: "lt", mark: "FG", label: "Full-grain" },
    { id: "cu", mark: "CU", label: "Cushioned" },
    { id: "rb", mark: "RB", label: "Rubber sole" },
    { id: "fr", mark: "FR", label: "Free returns" }
  ],
  insight: { label: "Does it run true to size?", more: "See more" },
  subline: "Leather collection · Unisex · Everyday",
  summary: { label: "AI summary", text: "Reviewers say Court 01 runs true to size, breaks in within a week and stays comfortable on long days. The leather softens and creases lightly with wear.", more: "Show more" },
  why: { label: "Why it works", body: "Full-grain leather upper on a cushioned insole and a stitched rubber cupsole, built for everyday wear." },
  accordion: ["Fit & sizing", "Materials & care", "Shipping & returns"],
  looking: { label: "Looking for specific info?", placeholder: "Ask AI about this sneaker", chips: [
    { id: "rain", text: "OK in the rain?" },
    { id: "break", text: "Break-in time?" },
    { id: "socks", text: "Best with no-show socks?" }
  ] }
};
const description = "A clean, low-profile court sneaker in full-grain leather, with a cushioned insole for all-day wear.";
const added = { label: "Added to bag", detail: `${product$1.size} · ${product$1.color} · ${product$1.price}` };
const thinking = "Building your footwear rotation…";
const intro = "Your everyday pair is sorted. Add a suede runner for casual days or an espresso loafer for smarter plans.";
const recs = [
  { ...catalog.strideSuedeRunner, tag: "Taupe · US 10", reason: "Soft suede and tonal mesh for a more relaxed look." },
  { ...catalog.stridePennyLoafer, tag: "Espresso · US 10", reason: "Polished leather for days that call for a smarter shoe." }
];
const picks$1 = recs.map((r) => r.id);
const total = [product$1, ...recs].reduce((sum, p) => sum + Number(p.price.slice(1)), 0);
const bag = {
  title: "Your bag",
  meta: `3 items · $${total}`,
  note: "Free shipping unlocked on orders over $200.",
  cta: "Checkout"
};
const followUps = [
  { id: "care", text: "Leather & suede care" },
  { id: "gift", text: "Compare these styles" }
];
const cx = (...c) => c.filter(Boolean).join(" ");
function bagCount(addedIds, inBag) {
  return (inBag ? 1 : 0) + addedIds.length;
}
function Pdp({ inBag, count }) {
  return /* @__PURE__ */ jsxs("div", { className: "ask-page", children: [
    /* @__PURE__ */ jsxs("header", { className: "ill-chat-header ask-nav", children: [
      /* @__PURE__ */ jsx("span", { className: "ask-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: brand$1 }) }),
      /* @__PURE__ */ jsx(StoreNavItems, {}),
      /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
        /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline" }),
        /* @__PURE__ */ jsxs("span", { className: "xs-cart", children: [
          /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Bag", variant: "outline" }),
          count > 0 && /* @__PURE__ */ jsx("span", { className: "xs-cart__badge", children: count }, count)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-pdp", children: [
      /* @__PURE__ */ jsxs("div", { className: "ask-gallery", children: [
        /* @__PURE__ */ jsx("div", { className: "ask-gallery__main xs-media", children: /* @__PURE__ */ jsx(Media, { src: product$1.image, alt: `${product$1.name}, ${product$1.color}` }) }),
        /* @__PURE__ */ jsx("div", { className: "ask-gallery__thumbs", children: gallery.map((view, i) => /* @__PURE__ */ jsx("div", { className: cx("ask-gallery__thumb xs-media", i === 0 && "ask-gallery__thumb--active"), children: /* @__PURE__ */ jsx(Media, { src: view.image, alt: view.alt }) }, view.image)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ask-details", children: [
        /* @__PURE__ */ jsxs("div", { className: "ask-details__head", children: [
          /* @__PURE__ */ jsx("p", { className: "ask-details__eyebrow", children: product$1.eyebrow }),
          /* @__PURE__ */ jsx("h2", { children: product$1.name }),
          /* @__PURE__ */ jsx("span", { className: "ask-details__price", children: product$1.price })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ask-colour", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-colour__label", children: [
            "Colour: ",
            /* @__PURE__ */ jsx("b", { children: product$1.color }),
            " · Size: ",
            /* @__PURE__ */ jsx("b", { children: product$1.size })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "xs-sizes", children: product$1.sizes.map((size) => /* @__PURE__ */ jsx("span", { className: cx("xs-size", size === product$1.size && "xs-size--selected"), children: size.replace("US ", "") }, size)) })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            appearance: "primary",
            label: inBag ? added.label : "Add to bag",
            iconLeading: inBag ? /* @__PURE__ */ jsx(Icon, { name: "checks", size: 14 }) : void 0,
            className: cx("ask-details__cta xs-cta", inBag && "xs-cta--done")
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "xs-ship", children: "Free shipping over $200 · Free returns" })
      ] })
    ] })
  ] });
}
function PdpV2({ inBag, count }) {
  return /* @__PURE__ */ jsxs(
    PdpFrameV2,
    {
      brand: brand$1,
      cart: /* @__PURE__ */ jsxs("span", { className: "xs-cart", children: [
        /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Bag", variant: "outline" }),
        count > 0 && /* @__PURE__ */ jsx("span", { className: "xs-cart__badge", children: count }, count)
      ] }),
      image: /* @__PURE__ */ jsx(Media, { src: product$1.image, alt: `${product$1.name}, ${product$1.color}` }),
      thumbs: gallery.map((view) => /* @__PURE__ */ jsx(Media, { src: view.image, alt: view.alt })),
      badges: v2.badges,
      askAi: /* @__PURE__ */ jsx(AskAiSection, { chips: askAiChips }),
      children: [
        /* @__PURE__ */ jsx(RatingRow, { rating: "4.7", count: "318 reviews" }),
        /* @__PURE__ */ jsxs("p", { className: "ask-insight aski-insight", "data-name": "Insight", children: [
          /* @__PURE__ */ jsx(Icon, { name: "insight", size: 11 }),
          /* @__PURE__ */ jsx("span", { className: "aski-insight__text", children: v2.insight.label }),
          /* @__PURE__ */ jsx("span", { className: "ask-insight__more", children: v2.insight.more })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "aski-head", children: [
          /* @__PURE__ */ jsx("h2", { className: "aski-name", children: product$1.name }),
          /* @__PURE__ */ jsx("p", { className: "aski-subline", children: v2.subline }),
          /* @__PURE__ */ jsx("p", { className: "aski-price", children: product$1.price })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "aski-desc", children: description }),
        /* @__PURE__ */ jsxs("div", { className: "ask-colour xsv2-colour", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-colour__label", children: [
            "Colour: ",
            /* @__PURE__ */ jsx("b", { children: product$1.color }),
            " · Size: ",
            /* @__PURE__ */ jsx("b", { children: product$1.size })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "xs-sizes", children: product$1.sizes.map((size) => /* @__PURE__ */ jsx("span", { className: cx("xs-size", size === product$1.size && "xs-size--selected"), children: size.replace("US ", "") }, size)) })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            appearance: "primary",
            label: inBag ? added.label : "Add to bag",
            iconLeading: inBag ? /* @__PURE__ */ jsx(Icon, { name: "checks", size: 14 }) : void 0,
            className: cx("ask-details__cta xs-cta", inBag && "xs-cta--done")
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "xs-ship", children: "Free shipping over $200 · Free returns" }),
        /* @__PURE__ */ jsxs("section", { className: "ask-summary ask-summary--clamp", "data-name": "AI summary", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            v2.summary.label
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ask-summary__text", children: v2.summary.text }),
          /* @__PURE__ */ jsx("span", { className: "ask-link ask-summary__more", children: v2.summary.more })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "aski-acc", children: [
          /* @__PURE__ */ jsxs("div", { className: "aski-acc__row", children: [
            /* @__PURE__ */ jsx("span", { children: v2.why.label }),
            /* @__PURE__ */ jsxs("span", { className: "aski-acc__ai", children: [
              /* @__PURE__ */ jsx(Icon, { name: "insight", size: 11 }),
              "Summarize this"
            ] }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⌃" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "aski-acc__body", children: v2.why.body }),
          v2.accordion.map((r) => /* @__PURE__ */ jsxs("div", { className: "aski-acc__row", children: [
            /* @__PURE__ */ jsx("span", { children: r }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⌄" })
          ] }, r))
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "ask-specific", "data-name": "Specific info", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            v2.looking.label
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ask-field", children: [
            /* @__PURE__ */ jsx(Icon, { name: "search", size: 12 }),
            /* @__PURE__ */ jsx("span", { children: v2.looking.placeholder })
          ] }),
          /* @__PURE__ */ jsx(AiPills, { options: v2.looking.chips, selectedId: "" })
        ] })
      ]
    }
  );
}
function AddedStrip() {
  return /* @__PURE__ */ jsxs("div", { className: "xs-added", "data-name": "Added to bag", children: [
    /* @__PURE__ */ jsx("div", { className: "xs-added__thumb xs-media", children: /* @__PURE__ */ jsx(Media, { src: product$1.image, alt: product$1.name }) }),
    /* @__PURE__ */ jsxs("div", { className: "xs-added__text", children: [
      /* @__PURE__ */ jsxs("p", { className: "xs-added__label", children: [
        /* @__PURE__ */ jsx(Icon, { name: "checks", size: 12 }),
        added.label
      ] }),
      /* @__PURE__ */ jsx("p", { className: "xs-added__title", children: product$1.name }),
      /* @__PURE__ */ jsx("p", { className: "xs-added__meta", children: added.detail })
    ] })
  ] });
}
function Recs({ addedIds }) {
  return /* @__PURE__ */ jsx("ul", { className: "xs-recs", "data-name": "Recommendations", children: recs.map((r) => {
    const done = addedIds.includes(r.id);
    return /* @__PURE__ */ jsxs("li", { className: cx("xs-rec", done && "xs-rec--added"), children: [
      /* @__PURE__ */ jsx("div", { className: "xs-rec__thumb xs-media", children: /* @__PURE__ */ jsx(Media, { src: r.image, alt: r.title }) }),
      /* @__PURE__ */ jsxs("div", { className: "xs-rec__body", children: [
        /* @__PURE__ */ jsxs("div", { className: "xs-rec__head", children: [
          /* @__PURE__ */ jsx("p", { className: "xs-rec__title", children: r.title }),
          /* @__PURE__ */ jsx("p", { className: "xs-rec__price", children: r.price })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "xs-rec__tag", children: r.tag }),
        /* @__PURE__ */ jsxs("p", { className: "xs-rec__why", children: [
          /* @__PURE__ */ jsx(Icon, { name: "insight", size: 11 }),
          /* @__PURE__ */ jsx("span", { children: r.reason })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: cx("xs-add", done && "xs-add--done"), children: done ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Icon, { name: "checks", size: 12 }),
        "Added"
      ] }) : "Add" })
    ] }, r.id);
  }) });
}
function BagSummary() {
  return /* @__PURE__ */ jsxs("div", { className: "xs-bag", "data-name": "Bag summary", children: [
    /* @__PURE__ */ jsxs("div", { className: "xs-bag__head", children: [
      /* @__PURE__ */ jsx("p", { className: "xs-bag__title", children: bag.title }),
      /* @__PURE__ */ jsx("p", { className: "xs-bag__meta", children: bag.meta })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "xs-bag__note", children: [
      /* @__PURE__ */ jsx(Icon, { name: "shieldCheck", size: 12 }),
      bag.note
    ] }),
    /* @__PURE__ */ jsx("span", { className: "xs-bag__cta", children: bag.cta })
  ] });
}
const beats$3 = [
  { id: "pdp", type: "pause", ms: 1400 },
  { id: "hover-cta", type: "pause", ms: 400 },
  { id: "press", type: "appear", ms: 700 },
  { id: "open", type: "appear", ms: 560 },
  { id: "context", type: "appear", ms: 380 },
  { id: "think", type: "think", labels: ["Thinking", thinking] },
  { id: "intro", type: "text", text: intro },
  // Rows finish their cascade at ~700ms; the reasons get reading time.
  { id: "recs", type: "appear", ms: 3200 },
  { id: "hover-add", type: "pause", ms: 360 },
  { id: "add", type: "appear", ms: 1100 },
  { id: "hover-add2", type: "pause", ms: 360 },
  { id: "add2", type: "appear", ms: 700 },
  { id: "bag", type: "appear", ms: 600 }
];
function Crossword({ t }) {
  const viewportRef = useRef(null);
  useFollowLatest$1(viewportRef, {
    // The turn's blocks, not the single turn, so a card that would lose
    // only its top few px snaps to the top edge instead of being sliced.
    thread: ".ask-thread .ill-assistant-turn",
    focus: t.reached("bag") ? ".xs-bag" : void 0,
    clearance: 40,
    index: t.index,
    reducedMotion: t.reducedMotion
  });
  const addedIds = t.reached("add2") ? picks$1 : t.reached("add") ? picks$1.slice(0, 1) : [];
  return /* @__PURE__ */ jsx(
    Shell,
    {
      brand: brand$1,
      width: 432,
      height: 523,
      className: "ask-drawer askm-drawer xs-drawer",
      header: /* @__PURE__ */ jsx(ChatHeader, { brand: brand$1, showHistory: false, showExpand: false }),
      viewportRef,
      children: /* @__PURE__ */ jsx("div", { className: "ask-thread", children: t.reached("context") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
        /* @__PURE__ */ jsx(AddedStrip, {}),
        /* @__PURE__ */ jsx(Thinking, { t, id: "think" }),
        t.reached("intro") && /* @__PURE__ */ jsx(AssistantText, { text: intro }),
        t.reached("recs") && /* @__PURE__ */ jsx(Recs, { addedIds }),
        t.reached("bag") && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(BagSummary, {}),
          /* @__PURE__ */ jsx(AiPills, { options: followUps, selectedId: "" })
        ] })
      ] }) })
    }
  );
}
function Scene$3({ t, v2: v22 = false }) {
  const Page2 = v22 ? PdpV2 : Pdp;
  const pressed = t.reached("press");
  const addedIds = t.reached("add2") ? picks$1 : t.reached("add") ? picks$1.slice(0, 1) : [];
  const tap = t.reached("add2") ? 3 : t.reached("add") ? 2 : pressed ? 1 : 0;
  const target = t.reached("add2") ? ".xs-rec:nth-child(2) .xs-add" : t.reached("add") ? ".xs-rec:nth-child(1) .xs-add" : ".xs-cta";
  const point = t.reached("hover-add2") ? ".xs-rec:nth-child(2) .xs-add" : t.reached("hover-add") ? ".xs-rec:nth-child(1) .xs-add" : t.reached("hover-cta") ? ".xs-cta" : null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$1(
        "ask askm xs xsm",
        t.reached("hover-cta") && !pressed && "xsm--hover-cta",
        t.reached("hover-add") && !t.reached("add") && "xsm--hover-1",
        t.reached("hover-add2") && !t.reached("add2") && "xsm--hover-2"
      ),
      children: /* @__PURE__ */ jsxs("article", { className: "ask-store", children: [
        /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
          /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
            /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
            /* @__PURE__ */ jsx("span", { children: url$1 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ask-viewport", children: [
          /* @__PURE__ */ jsx(Page2, { inBag: pressed, count: bagCount(addedIds, pressed) }),
          /* @__PURE__ */ jsx(ContentFade, {}),
          /* @__PURE__ */ jsx("div", { className: cx$1("ask-scrim askm-scrim", t.reached("open") && "askm-scrim--on") }),
          t.reached("open") && /* @__PURE__ */ jsx(Crossword, { t }),
          /* @__PURE__ */ jsx(TapRing, { target, tap, point: v22 ? point : void 0 })
        ] })
      ] })
    }
  );
}
function CrossSellMotion({ v2: v22 = false } = {}) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$3, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$3, { t, v2: v22 }, t.runKey) });
}
const phases = [
  { id: "intro", ms: 1e3 },
  { id: "scroll", ms: 800 },
  { id: "hover-more", ms: 500 },
  { id: "open", ms: 320 },
  { id: "read", ms: 3e3 },
  { id: "hover-less", ms: 500 },
  { id: "close", ms: 320 }
];
const at = (id) => phases.findIndex((p) => p.id === id);
const FADE_CLEARANCE = 56;
function useGistPlayback(active) {
  const [state, setState] = useState({ index: 0, runKey: 0 });
  const wasActive = useRef(active);
  useEffect(() => {
    if (active && !wasActive.current) setState((s) => ({ index: 0, runKey: s.runKey + 1 }));
    wasActive.current = active;
  }, [active]);
  useEffect(() => {
    if (!active || state.index + 1 >= phases.length) return;
    const id = window.setTimeout(() => setState((s) => ({ ...s, index: s.index + 1 })), phases[state.index].ms);
    return () => window.clearTimeout(id);
  }, [active, state.index]);
  return state;
}
function GistCard({ open }) {
  return /* @__PURE__ */ jsxs("section", { className: cx$1("ask-summary gist-card", open && "gist-card--open"), "data-name": "AI summary", children: [
    /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
      /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
      summary.label
    ] }),
    /* @__PURE__ */ jsx("p", { className: "ask-summary__text gist-text", children: summary.text }),
    /* @__PURE__ */ jsx("div", { className: "gist-more", "aria-hidden": !open, children: /* @__PURE__ */ jsx("ul", { className: "gist-details", children: summary.details.map((d) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: d.title }),
      /* @__PURE__ */ jsx("span", { children: d.body })
    ] }, d.id)) }) }),
    /* @__PURE__ */ jsx("span", { className: "ask-link gist-toggle", children: open ? summary.less : summary.more })
  ] });
}
function Scene$2({ index, v2: v22 = false }) {
  const Page2 = v22 ? PdpV2$1 : Pdp$1;
  const viewportRef = useRef(null);
  const reached = (id) => index >= at(id);
  const open = reached("open") && !reached("close");
  const hovering = index === at("hover-more") || index === at("hover-less");
  const taps = (reached("open") ? 1 : 0) + (reached("close") ? 1 : 0);
  const restTop = useRef(0);
  useEffect(() => {
    var _a;
    const column = (_a = viewportRef.current) == null ? void 0 : _a.querySelector(".ask-details");
    if (!column) return;
    if (index === at("scroll")) {
      const card = column.querySelector(v22 ? ".ask-details__cta" : ".gist-card");
      const zoom = column.offsetHeight ? column.getBoundingClientRect().height / column.offsetHeight : 1;
      const cardBottom = (card.getBoundingClientRect().bottom - column.getBoundingClientRect().top) / zoom + column.scrollTop;
      const max = column.scrollHeight - column.clientHeight;
      restTop.current = Math.max(0, Math.min(max, cardBottom - (column.clientHeight - FADE_CLEARANCE)));
      return restTop.current > column.scrollTop ? animateScrollTo(column, restTop.current, 640) : void 0;
    }
    if (index === at("open")) {
      const text = column.querySelector(".gist-text");
      const details2 = column.querySelector(".gist-details");
      const toggle = column.querySelector(".gist-toggle");
      const growth = details2.scrollHeight + (text.scrollHeight - text.clientHeight);
      const zoom = column.offsetHeight ? column.getBoundingClientRect().height / column.offsetHeight : 1;
      const box = column.getBoundingClientRect();
      const toggleBottom = (toggle.getBoundingClientRect().bottom - box.top) / zoom + growth;
      const overflow = toggleBottom - (column.clientHeight - FADE_CLEARANCE);
      return overflow > 0 ? animateScrollTo(column, column.scrollTop + overflow, 300) : void 0;
    }
    if (index === at("close")) return animateScrollTo(column, restTop.current, 300);
  }, [index, v22]);
  return /* @__PURE__ */ jsx("div", { className: cx$1("ask gist", hovering && "gist--hover"), children: /* @__PURE__ */ jsxs("article", { className: "ask-store", children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { children: url$2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-viewport", ref: viewportRef, children: [
      /* @__PURE__ */ jsx(Page2, { step: 1, summary: /* @__PURE__ */ jsx(GistCard, { open }) }),
      /* @__PURE__ */ jsx(ContentFade, {}),
      /* @__PURE__ */ jsx(TapRing, { target: ".gist-toggle", tap: taps, point: v22 ? reached("hover-more") ? ".gist-toggle" : null : void 0 })
    ] })
  ] }) });
}
function GistUpFrontMotion({ v2: v22 = false } = {}) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const { index, runKey } = useGistPlayback(landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$2, { index, v2: v22 }, runKey) });
}
const beats$2 = [
  { id: "pdp", type: "pause", ms: 1200 },
  { id: "scroll", type: "appear", ms: 800 },
  { id: "activate", type: "appear", ms: 650 },
  { id: "open", type: "appear", ms: 450 },
  { id: "ask", type: "appear", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "answer", type: "text", text: directAsk.answer },
  { id: "follow-ups", type: "appear", ms: 450 }
];
const beatsV2 = [
  ...beats$2.slice(0, beats$2.findIndex((b) => b.id === "answer")).map((b) => b.id === "think" ? { ...b, labels: ["Checking the formula…"] } : b),
  { id: "skeleton", type: "load", ms: 1200 },
  { id: "answer", type: "text", text: directAsk.answer },
  { id: "follow-ups", type: "appear", ms: 450 }
];
const chipIn = (list) => list.find((c) => c.id === directAsk.chipId);
function InlineThread({ t, chip: chip2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "dam-thread", children: [
    /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: chip2.text }) }),
    t.reached("think") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
      /* @__PURE__ */ jsx(Thinking, { t, id: "think" }),
      t.reached("answer") && /* @__PURE__ */ jsx(AssistantText, { text: directAsk.answer }),
      t.reached("follow-ups") && /* @__PURE__ */ jsx(AiPills, { options: directAsk.followUps, selectedId: "" })
    ] })
  ] });
}
function SmoothHeight({ columnSel, reducedMotion, children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [h, setH] = useState(void 0);
  const last = useRef(void 0);
  useLayoutEffect(() => {
    const inner = innerRef.current;
    let cancel;
    const ro = new ResizeObserver(() => {
      var _a;
      const prev = last.current;
      const next = inner.offsetHeight;
      last.current = next;
      setH(next);
      if (prev === void 0 || next <= prev || reducedMotion) return;
      const column = (_a = outerRef.current) == null ? void 0 : _a.closest(columnSel);
      if (!column) return;
      cancel == null ? void 0 : cancel();
      cancel = animateScrollTo(column, column.scrollTop + (next - prev), 300);
    });
    ro.observe(inner);
    return () => {
      ro.disconnect();
      cancel == null ? void 0 : cancel();
    };
  }, [columnSel, reducedMotion]);
  return /* @__PURE__ */ jsx("div", { ref: outerRef, className: "damv2-grow", style: { height: h, transition: h !== void 0 && !reducedMotion ? "height 300ms cubic-bezier(0.23, 1, 0.32, 1)" : void 0 }, children: /* @__PURE__ */ jsx("div", { ref: innerRef, children }) });
}
function SpecificV2({ t, chip: chip2 }) {
  return /* @__PURE__ */ jsx(SmoothHeight, { columnSel: ".ask-details", reducedMotion: t.reducedMotion, children: !t.reached("open") ? /* @__PURE__ */ jsx("div", { className: cx$1("askim-chips", t.reached("activate") && "askim-chips--picked"), children: /* @__PURE__ */ jsx(AskChips, { options: lookingChips, selected: t.reached("activate") ? chip2.id : "" }) }) : /* @__PURE__ */ jsxs("div", { className: "aski-thread askim-thread", children: [
    /* @__PURE__ */ jsx("p", { className: "aski-q", children: chip2.text }),
    /* @__PURE__ */ jsx(Thinking, { t, id: "think" }),
    t.loading("skeleton") && /* @__PURE__ */ jsxs("div", { className: "askim-skeleton", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: 10, radius: 4 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "94%", height: 10, radius: 4 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "88%", height: 10, radius: 4 }),
      /* @__PURE__ */ jsx(SkeletonBlock, { width: "52%", height: 10, radius: 4 })
    ] }),
    t.reached("answer") && /* @__PURE__ */ jsx(AssistantText, { text: directAsk.answer }),
    t.reached("follow-ups") && /* @__PURE__ */ jsx("div", { className: "askim-in", children: /* @__PURE__ */ jsx(AskChips, { options: directAsk.followUps }) })
  ] }) });
}
function Scene$1({ t, v2: v22 = false }) {
  const chip2 = chipIn(v22 ? lookingChips : specificInfo.chips);
  const Page2 = v22 ? PdpV2$1 : Pdp$1;
  const viewportRef = useRef(null);
  const active = t.reached("activate");
  const open = t.reached("open");
  const columnRef = useRef(null);
  useEffect(() => {
    var _a;
    columnRef.current = ((_a = viewportRef.current) == null ? void 0 : _a.querySelector(".ask-details")) ?? null;
  }, [v22]);
  useFollowLatest$1(columnRef, {
    thread: v22 ? ".damv2-none" : ".ask-specific",
    clearance: 48,
    index: t.index,
    reducedMotion: t.reducedMotion
  });
  useEffect(() => {
    var _a;
    const column = (_a = viewportRef.current) == null ? void 0 : _a.querySelector(".ask-details");
    if (!column || t.index !== 1) return;
    if (!v22) return animateScrollTo(column, column.scrollHeight - column.clientHeight, 640);
    const card = column.querySelector(".ask-specific");
    const zoom = column.offsetHeight ? column.getBoundingClientRect().height / column.offsetHeight : 1;
    const cardBottom = (card.getBoundingClientRect().bottom - column.getBoundingClientRect().top) / zoom + column.scrollTop;
    return animateScrollTo(column, Math.max(0, cardBottom - (column.clientHeight - 56)), 640);
  }, [t.index, v22]);
  return /* @__PURE__ */ jsx("div", { className: cx$1("ask dam", active && "dam--active"), children: /* @__PURE__ */ jsxs("article", { className: "ask-store", children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { children: url$2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-viewport", ref: viewportRef, children: [
      /* @__PURE__ */ jsx(
        Page2,
        {
          step: 1,
          specificSelected: active ? chip2.id : "",
          specific: v22 ? /* @__PURE__ */ jsx(SpecificV2, { t, chip: chip2 }) : open ? /* @__PURE__ */ jsx(InlineThread, { t, chip: chip2 }) : void 0
        }
      ),
      /* @__PURE__ */ jsx(ContentFade, {}),
      v22 && /* @__PURE__ */ jsx(
        TapRing,
        {
          target: ".ask-specific .aski-chip--on",
          tap: active ? 1 : 0,
          point: t.reached("scroll") && !t.reached("think") ? open ? ".ask-specific .aski-q" : `.ask-specific .aski-chip:nth-child(${lookingChips.indexOf(chip2) + 1})` : null
        }
      )
    ] })
  ] }) });
}
function DirectAskMotion({ v2: v22 = false } = {}) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(v22 ? beatsV2 : beats$2, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$1, { t, v2: v22 }, t.runKey) });
}
const brand = "Sorelle Labs";
const states = [
  { state: 1, label: "Request received" },
  { state: 2, label: "Consulting Crossword" },
  { state: 3, label: "Recommendations received" },
  { state: 4, label: "Checking offers" },
  { state: 5, label: "Task completed" }
];
const agent = {
  label: "Personal agent",
  status: "Working",
  ask: "My user wants a daily moisturiser for dry skin, under $50.",
  followUp: "Any current offers?",
  close: "Noted. I'll show both options and the free gift offer to my user."
};
const picks = [catalog.sorelleCream, catalog.sorelleSet].map((p) => ({
  id: p.id,
  name: p.title,
  price: p.price,
  image: p.image
}));
const calls = {
  products: {
    state: 2,
    returned: 3,
    topic: "Products",
    reply: [
      "The ",
      { b: "Deep Hydration Cream" },
      " is $42 and fits the budget. For $13 more, the ",
      { b: "Deep Hydration Set" },
      " adds a night mask and travel-size cleanser."
    ]
  },
  offers: {
    state: 4,
    returned: 4,
    topic: "Offers",
    reply: [
      "The ",
      { b: "Winter Glow Special" },
      " includes a free gift on orders over $50. It's valid until November 30, once per customer."
    ]
  }
};
const offer = {
  title: "Winter Glow Special",
  detail: "Free gift on orders over $50",
  terms: "Until Nov 30 · 1 per customer"
};
const defaultScenario = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  agent,
  brand,
  calls,
  offer,
  picks,
  states
}, Symbol.toStringTag, { value: "Module" }));
const PersonalAgentContext = createContext(defaultScenario);
PersonalAgentContext.Provider;
const answer = [
  `Here are two options from ${brand}. The `,
  { b: "Deep Hydration Cream" },
  " is $42. For $13 more, the ",
  { b: "Deep Hydration Set" },
  " adds a night mask and travel-size cleanser. The $55 set also qualifies for the ",
  { b: "Winter Glow Special" },
  " free gift."
];
[
  { id: "cream", name: catalog.sorelleCream.title, price: catalog.sorelleCream.price, note: "Rich moisture that never feels sticky", image: catalog.sorelleCream.image },
  { id: "lotion", name: catalog.sorelleLotion.title, price: catalog.sorelleLotion.price, note: "Lightweight daily lotion with ceramides", image: catalog.sorelleLotion.image },
  { id: "gel", name: catalog.sorelleGel.title, price: catalog.sorelleGel.price, note: "Water-gel texture for normal to dry skin", image: catalog.sorelleGel.image }
];
({
  name: catalog.sorelleSet.title,
  price: catalog.sorelleSet.price,
  image: catalog.sorelleSet.image
});
const transcript = [
  { role: "user", text: "I'm looking for a moisturizer for dry skin, under $50." },
  {
    role: "assistant",
    text: ["Here are three options in your range. The ", { b: "Deep Hydration Cream" }, " at $42 is especially moisturizing without feeling sticky, according to reviewers."],
    result: "picks"
  },
  { role: "user", text: "I'll go with the Deep Hydration Cream." },
  {
    role: "assistant",
    text: ["For $13 more, the ", { b: "Deep Hydration Set" }, " adds a night mask and a travel-size cleanser. Our ", { b: "Winter Glow Special" }, " also includes a free gift on orders over $50."],
    result: "bundle"
  },
  { role: "user", text: "I'll take the set." },
  { role: "assistant", text: ["Done. Your free gift is added too."], result: "order" }
];
const beats$1 = [
  { id: "ad", type: "pause", ms: 1400 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 750 },
  { id: "widget", type: "text", text: widget.welcome },
  { id: "prompts", type: "appear", ms: 1300 },
  { id: "pick-match", type: "appear", ms: 450 },
  { id: "expand", type: "appear", ms: 720 },
  { id: "start", type: "appear", ms: 350 },
  { id: "think-1", type: "think", labels: ["Thinking"] },
  { id: "intro", type: "text", text: widget.intro },
  { id: "q1", type: "appear", ms: 1700 },
  { id: "pick-q1", type: "appear", ms: 650 },
  { id: "answer-1", type: "appear", ms: 450 },
  { id: "think-2", type: "think", labels: ["Thinking"] },
  { id: "q2", type: "appear", ms: 1700 },
  { id: "pick-q2", type: "appear", ms: 650 },
  { id: "answer-2", type: "appear", ms: 450 },
  { id: "think-3", type: "think", labels: ["Thinking", "Finding evening gummies"] },
  { id: "result", type: "text", text: widget.result },
  { id: "resolved", type: "pause", ms: 600 }
];
const knockBeats = beats$1.map(
  (b) => b.id === "widget" ? { id: "widget", type: "pause", ms: 1200 } : b.id === "prompts" ? { ...b, ms: 883 + 3600 } : b
);
function Quiz({ t, id, pickId, question, answer: answer2 }) {
  if (!t.reached(id)) return null;
  return /* @__PURE__ */ jsx("div", { className: "adjm-quiz", children: /* @__PURE__ */ jsx(AnswerRows, { question, selected: t.reached(pickId) ? answer2 : void 0 }) });
}
function Widgets({ t }) {
  const layerRef = useRef(null);
  const surfaceRef = useRef(null);
  const compactRef = useRef(null);
  const expandedRef = useRef(null);
  const viewportRef = useRef(null);
  const showCompact = t.reached("widget");
  const expanding = t.reached("expand");
  const composerDefault = useContext(StorybookComposerDefault);
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const compact = compactRef.current;
    const expanded = expandedRef.current;
    if (!showCompact || !layer || !surface || !compact || !expanded) return;
    const box = layer.getBoundingClientRect();
    const zoom = layer.offsetWidth ? box.width / layer.offsetWidth : 1;
    const place = (name, el) => {
      const r = el.getBoundingClientRect();
      const insets = {
        t: (r.top - box.top) / zoom,
        r: (box.right - r.right) / zoom,
        b: (box.bottom - r.bottom) / zoom,
        l: (r.left - box.left) / zoom
      };
      for (const [side, value] of Object.entries(insets)) surface.style.setProperty(`--adjm-${name}-${side}`, `${value}px`);
    };
    place("from", compact);
    place("to", expanded);
  }, [showCompact]);
  useFollowLatest$1(viewportRef, {
    thread: ".adj-thread",
    pin: ".ill-user-turn",
    clearance: 8,
    // v2: the pinned turn rests below the transcript's 12px top fade.
    pinOffset: composerDefault ? 16 : 0,
    index: t.index,
    reducedMotion: t.reducedMotion
  });
  return /* @__PURE__ */ jsxs("div", { className: cx$1("adjm-layer", showCompact && "adjm-layer--in"), ref: layerRef, children: [
    /* @__PURE__ */ jsx("div", { className: cx$1("adjm-surface", expanding && "adjm-surface--open"), ref: surfaceRef }),
    showCompact && composerDefault && /* @__PURE__ */ jsx(
      KnockBar,
      {
        barRef: compactRef,
        className: cx$1("adjm-compact", expanding && "adjm-compact--out"),
        knock: t.reached("prompts"),
        pressed: t.reached("pick-match") ? "Find My Match" : void 0,
        out: expanding
      }
    ),
    showCompact && !composerDefault && /* @__PURE__ */ jsx(
      Shell,
      {
        brand: brand$4,
        rootRef: compactRef,
        className: cx$1(
          "adj-widget adj-widget--compact adjm-compact",
          t.reached("prompts") && "adjm-compact--prompts",
          expanding && "adjm-compact--out"
        ),
        composer: composerDefault ? /* @__PURE__ */ jsx(ChatComposer, { value: widget.composer }) : /* @__PURE__ */ jsx(Fragment, {}),
        children: /* @__PURE__ */ jsxs(AssistantTurn, { children: [
          /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: widget.welcome }) }),
          /* @__PURE__ */ jsx(AiPills, { options: widget.prompts, selectedId: t.reached("pick-match") ? "match" : "" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      Shell,
      {
        brand: brand$4,
        rootRef: expandedRef,
        viewportRef,
        className: cx$1("adj-widget adj-widget--expanded adjm-expanded", expanding && "adjm-expanded--open"),
        composer: /* @__PURE__ */ jsx(ChatComposer, { value: widget.composer }),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "adj-thread", children: [
            t.reached("start") && /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: widget.start }) }),
            t.reached("think-1") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
              /* @__PURE__ */ jsx(Thinking, { t, id: "think-1" }),
              t.reached("intro") && /* @__PURE__ */ jsx(AssistantText, { text: widget.intro }),
              /* @__PURE__ */ jsx(Quiz, { t, id: "q1", pickId: "pick-q1", question: widget.q1, answer: widget.q1Answer })
            ] }),
            t.reached("answer-1") && /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText(widget.q1, widget.q1Answer) }) }),
            t.reached("think-2") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
              /* @__PURE__ */ jsx(Thinking, { t, id: "think-2" }),
              /* @__PURE__ */ jsx(Quiz, { t, id: "q2", pickId: "pick-q2", question: widget.q2, answer: widget.q2Answer })
            ] }),
            t.reached("answer-2") && /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText(widget.q2, widget.q2Answer) }) }),
            t.reached("think-3") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
              /* @__PURE__ */ jsx(Thinking, { t, id: "think-3" }),
              t.reached("result") && /* @__PURE__ */ jsx(AssistantText, { text: widget.result }),
              /* @__PURE__ */ jsx("div", { className: "adjm-enter", children: /* @__PURE__ */ jsx(Picks, { loading: !t.reached("resolved"), staggerResolve: true }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "adjm-spacer", "aria-hidden": "true" })
        ]
      }
    )
  ] });
}
function Scene({ t }) {
  return /* @__PURE__ */ jsxs("div", { className: cx$1("adj adjm", t.reached("tap-ad") && "adjm--tap", t.reached("store") && "adjm--store"), children: [
    /* @__PURE__ */ jsx(InstagramAd, {}),
    /* @__PURE__ */ jsx("div", { className: "adjm-plate" }),
    /* @__PURE__ */ jsx(Storefront, { widget: /* @__PURE__ */ jsx(Widgets, { t }) })
  ] });
}
function AdJourneyMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const composerDefault = useContext(StorybookComposerDefault);
  const t = useChatTimeline(composerDefault ? knockBeats : beats$1, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene, { t }, t.runKey) });
}
const markup = (runs) => runs.map((r) => typeof r === "string" ? r : `**${r.b}**`).join("");
const productsReply = markup(calls.products.reply);
const offersReply = markup(calls.offers.reply);
[
  { id: "ask", type: "text", text: agent.ask },
  { id: "call-1", type: "appear", ms: 380 },
  { id: "think-1", type: "think", labels: ["Checking products", "Matching under $50"] },
  { id: "reply-1", type: "text", text: productsReply },
  { id: "picks", type: "load", ms: 600 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "follow", type: "text", text: agent.followUp },
  { id: "call-2", type: "appear", ms: 380 },
  { id: "think-2", type: "think", labels: ["Checking offers"] },
  { id: "reply-2", type: "text", text: offersReply },
  { id: "offer", type: "load", ms: 600 },
  { id: "read-2", type: "pause", ms: 900 },
  { id: "close", type: "text", text: agent.close }
];
markup(answer);
const STREAM_MS_PER_WORD = 34;
const TOKEN_FADE_MS = 280;
const plain = (runs) => runs.map((r) => typeof r === "string" ? r : r.b).join("");
const words = (runs) => plain(runs).split(/\s+/).filter(Boolean).length;
const streamMs = (runs) => words(runs) * STREAM_MS_PER_WORD + TOKEN_FADE_MS;
const user = (i) => {
  const turn = transcript[i];
  return turn.role === "user" ? turn.text : "";
};
const reply = (i) => {
  const turn = transcript[i];
  return turn.role === "assistant" ? turn.text : [];
};
[
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: user(0), leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 2e3 },
  { id: "reply-1", type: "appear", ms: streamMs(reply(1)) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 1700 },
  { id: "choose", type: "compose", text: user(2), leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1e3 },
  { id: "reply-2", type: "appear", ms: streamMs(reply(3)) },
  { id: "set", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 1900 },
  { id: "take", type: "compose", text: user(4), leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "reply-3", type: "appear", ms: streamMs(reply(5)) },
  { id: "order", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function ConversionAssistanceFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-conversion-assistance-frame", children: /* @__PURE__ */ jsx("div", { className: "ill-conversion-assistance-frame__content", children }) });
}
const landing = {
  brand: catalog.brewhausMachine.brand,
  domain: "brewhaus.com/espresso",
  product: catalog.brewhausMachine,
  // Same voice as the ad (its eyebrow, headline and offer), so the page
  // reads as the ad's own continuation.
  eyebrow: "Brewhaus / At home",
  headline: "Bring the café home.",
  sub: `${catalog.brewhausMachine.title} · ${catalog.brewhausMachine.price}`,
  offerTag: "10% off",
  code: "WELCOME10",
  offerNote: "Welcome offer at checkout",
  cta: "Shop the machine"
};
const pdp = {
  brand: catalog.auraEarbuds.brand,
  domain: "aura.com/earbuds/wireless",
  product: { ...catalog.auraEarbuds, eyebrow: "Wireless · In-ear" },
  description: "Your everyday sound, in ivory. Earbuds and a matching charging case.",
  detailLabel: "Specifications",
  cta: "Add to bag"
};
function Window({ url: url2, children }) {
  return /* @__PURE__ */ jsxs("article", { className: "ais-store adp-shell", children: [
    /* @__PURE__ */ jsx(BrowserChrome, { url: url2 }),
    /* @__PURE__ */ jsx("div", { className: "ais-viewport", children })
  ] });
}
function DedicatedAd() {
  return /* @__PURE__ */ jsxs("article", { className: "adj-shell adj-ig pcx-ad adp-brewhaus-ad", "data-name": "Ad", children: [
    /* @__PURE__ */ jsxs("header", { className: "adj-ig__head", children: [
      /* @__PURE__ */ jsxs("div", { className: "adj-ig__profile", children: [
        /* @__PURE__ */ jsx("span", { className: "adj-ig__avatar pcx-ad__avatar", children: /* @__PURE__ */ jsx(BrandMark, { brand: landing.brand }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-ig__name", children: [
          /* @__PURE__ */ jsx(BrandName, { brand: landing.brand }),
          /* @__PURE__ */ jsx("small", { children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adj-ig__more", src: igMore, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__media pcx-ad__media adp-brewhaus-ad__media", children: [
      /* @__PURE__ */ jsxs("div", { className: "adp-brewhaus-ad__copy", children: [
        /* @__PURE__ */ jsx("span", { children: "Brewhaus / At home" }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "Bring the",
          /* @__PURE__ */ jsx("br", {}),
          "café home."
        ] }),
        /* @__PURE__ */ jsx("p", { children: landing.product.title })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adp-brewhaus-ad__product", src: landing.product.image, alt: landing.product.title, "data-flight-src": landing.product.image }),
      /* @__PURE__ */ jsx("span", { className: "adp-brewhaus-ad__offer", children: "10% off" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__cta", children: [
      "Explore the offer",
      /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "adj-ig__caption", children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: landing.brand }) }),
      " Meet the Pro Espresso Machine. Your welcome offer is waiting."
    ] })
  ] });
}
function DedicatedLandingFrame({ step }) {
  return /* @__PURE__ */ jsx(ConversionAssistanceFrame, { children: step === 1 ? /* @__PURE__ */ jsx("div", { className: "adj adp-ad", children: /* @__PURE__ */ jsx(DedicatedAd, {}) }) : /* @__PURE__ */ jsx("div", { className: "ais pcx adp adp-brewhaus-page", children: /* @__PURE__ */ jsx(Window, { url: landing.domain, children: /* @__PURE__ */ jsxs("div", { className: "ais-page", "data-name": "Page", children: [
    /* @__PURE__ */ jsx(Nav, { searching: false, merchant: landing.brand }),
    /* @__PURE__ */ jsxs("section", { className: "pcx-hero adp-hero", children: [
      /* @__PURE__ */ jsx("p", { className: "pcx-eyebrow", children: landing.eyebrow }),
      /* @__PURE__ */ jsx("h2", { className: "pcx-hero__headline", children: landing.headline }),
      /* @__PURE__ */ jsx("p", { className: "pcx-hero__sub", children: landing.sub }),
      /* @__PURE__ */ jsxs("div", { className: "pcx-hero__media adp-brewhaus-hero__media", children: [
        /* @__PURE__ */ jsx("img", { src: landing.product.image, alt: `${landing.brand} ${landing.product.title}` }),
        /* @__PURE__ */ jsx("span", { children: landing.offerTag })
      ] }),
      /* @__PURE__ */ jsx(Button, { appearance: "primary", label: landing.cta, className: "adp-hero__cta" }),
      /* @__PURE__ */ jsxs("p", { className: "adp-brewhaus-offer", children: [
        /* @__PURE__ */ jsx("span", { children: landing.code }),
        landing.offerNote
      ] })
    ] })
  ] }) }) }) });
}
function useTimeline(beats2) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats2, landed && fontsReady);
  return { rootRef, t };
}
const landingBeats = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "finish", type: "pause", ms: 2e3 }
];
function contained(r, aspect) {
  return r.w / r.h > aspect ? { w: r.h * aspect, h: r.h } : { w: r.w, h: r.w / aspect };
}
function flipFrom(from, to, aspect) {
  const s = contained(from, aspect).w / contained(to, aspect).w;
  const dx = from.x + from.w / 2 - (to.x + to.w / 2);
  const dy = from.y + from.h / 2 - (to.y + to.h / 2);
  return `translate(${dx}px, ${dy}px) scale(${s})`;
}
function LandingScene({ t }) {
  const rootRef = useRef(null);
  const [flight, setFlight] = useState(null);
  const [moved, setMoved] = useState(false);
  const [landed, setLanded] = useState(t.reducedMotion);
  const store = t.reached("store");
  useLayoutEffect(() => {
    if (!store || t.reducedMotion) return;
    const root = rootRef.current;
    const jar = root == null ? void 0 : root.querySelector(".adp-brewhaus-ad__product");
    const hero2 = root == null ? void 0 : root.querySelector(".pcx-hero__media img");
    if (!root || !jar || !hero2) return;
    const box = root.getBoundingClientRect();
    const zoom = root.offsetWidth ? box.width / root.offsetWidth : 1;
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / zoom, y: (r.top - box.top) / zoom, w: r.width / zoom, h: r.height / zoom };
    };
    const img = jar.tagName === "IMG" ? jar : hero2;
    setFlight({ from: rect(jar), to: rect(hero2), src: jar.dataset.flightSrc || "", aspect: img.naturalWidth / img.naturalHeight || 1 });
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMoved(true)));
    const done = window.setTimeout(() => setLanded(true), 800);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [store, t.reducedMotion]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      className: cx$1("adpm adpm--landing", t.reached("tap-ad") && "adpm--tap", store && "adpm--store", store && !landed && "adpm--flying"),
      children: [
        /* @__PURE__ */ jsx("div", { className: "adpm-layer adpm-ad", children: /* @__PURE__ */ jsx(DedicatedLandingFrame, { step: 1 }) }),
        /* @__PURE__ */ jsx("div", { className: "adpm-layer adpm-page", children: /* @__PURE__ */ jsx(DedicatedLandingFrame, { step: 2 }) }),
        flight && !landed && /* @__PURE__ */ jsx(
          "img",
          {
            className: "adpm-flight",
            src: flight.src,
            alt: "",
            style: {
              left: flight.to.x,
              top: flight.to.y,
              width: flight.to.w,
              height: flight.to.h,
              transform: moved ? "none" : flipFrom(flight.from, flight.to, flight.aspect)
            },
            onTransitionEnd: (e) => e.propertyName === "transform" && setLanded(true)
          }
        )
      ]
    }
  );
}
function DedicatedLandingPagesMotion() {
  const { rootRef, t } = useTimeline(landingBeats);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(LandingScene, { t }, t.runKey) });
}
const singleEarbud = "/images/dynamic-landing-pages/v2/assets/aura-earbud-single-C83EzLSM.webp";
const earbudPair = "/images/dynamic-landing-pages/v2/assets/aura-earbuds-pair-SXQD6iS6.webp";
const caseRear = "/images/dynamic-landing-pages/v2/assets/aura-case-rear-6cT3Iq-6.webp";
const beats = [
  { id: "loading", type: "pause", ms: 400 },
  { id: "resolve", type: "appear", ms: 700 },
  { id: "hold", type: "pause", ms: 3e3 }
];
const { product } = pdp;
const url = pdp.domain;
const badges = [
  { id: "wl", mark: "WL", label: "Wireless" },
  { id: "ie", mark: "IE", label: "In-ear" },
  { id: "cc", mark: "CC", label: "Charging case" },
  { id: "iv", mark: "IV", label: "Ivory" }
];
const askChips = [
  { id: "case", text: "In the box?" },
  { id: "finish", text: "Colours?" },
  { id: "specs", text: "Battery life?" }
];
function AuraPdp() {
  return /* @__PURE__ */ jsxs(
    PdpFrameV2,
    {
      brand: pdp.brand,
      image: /* @__PURE__ */ jsx("img", { src: product.image, alt: `${pdp.brand} ${product.title}, ${product.color}` }),
      thumbs: [product.image, singleEarbud, earbudPair, caseRear].map((src) => /* @__PURE__ */ jsx("img", { src, alt: "" })),
      badges,
      askAi: /* @__PURE__ */ jsx(AskAiSection, { chips: askChips, other: "Ask anything" }),
      children: [
        /* @__PURE__ */ jsx(RatingRow, { rating: "4.7", count: "186 reviews" }),
        /* @__PURE__ */ jsxs("p", { className: "ask-insight aski-insight", "data-name": "Insight", children: [
          /* @__PURE__ */ jsx(Icon, { name: "insight", size: 11 }),
          /* @__PURE__ */ jsx("span", { className: "aski-insight__text", children: "Case included?" }),
          /* @__PURE__ */ jsx("span", { className: "ask-insight__more", children: "See more" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "aski-head", children: [
          /* @__PURE__ */ jsx("h2", { className: "aski-name", children: product.title }),
          /* @__PURE__ */ jsxs("p", { className: "aski-subline", children: [
            product.eyebrow,
            " · ",
            product.color
          ] }),
          /* @__PURE__ */ jsx("p", { className: "aski-price", children: product.price })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "aski-desc", children: pdp.description }),
        /* @__PURE__ */ jsxs("section", { className: "ask-summary ask-summary--clamp", "data-name": "AI summary", children: [
          /* @__PURE__ */ jsxs("p", { className: "ask-insight__label", children: [
            /* @__PURE__ */ jsx(Icon, { name: "insight", size: 12 }),
            "AI summary"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "ask-summary__text", children: [
            "Aura Wireless Earbuds come in ivory with a matching charging case included. Everyday wireless sound in an in-ear fit, for ",
            product.price,
            "."
          ] }),
          /* @__PURE__ */ jsx("span", { className: "ask-link ask-summary__more", children: "Show more" })
        ] }),
        /* @__PURE__ */ jsx(Button, { appearance: "primary", label: pdp.cta, className: "ask-details__cta" }),
        /* @__PURE__ */ jsx("div", { className: "aski-acc", children: [pdp.detailLabel, "What's in the box", "Returns"].map((r) => /* @__PURE__ */ jsxs("div", { className: "aski-acc__row", children: [
          /* @__PURE__ */ jsx("span", { children: r }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⌄" })
        ] }, r)) })
      ]
    }
  );
}
function AdaptiveProductPagesV2Motion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  const loading = !t.reached("resolve") && !t.reducedMotion;
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(ConversionAssistanceFrame, { children: /* @__PURE__ */ jsx("div", { className: cx$1("ask adpb", loading ? "adpb--loading" : "adpb--resolved"), children: /* @__PURE__ */ jsxs("article", { className: "ask-store", children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { children: url })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ask-viewport", children: [
      /* @__PURE__ */ jsx(AuraPdp, {}),
      /* @__PURE__ */ jsx(ContentFade, {})
    ] })
  ] }) }, t.runKey) }) });
}
function Layer({ children }) {
  return /* @__PURE__ */ jsx(StorybookCardSkin.Provider, { value: true, children: /* @__PURE__ */ jsx(StorybookComposerDefault.Provider, { value: true, children: /* @__PURE__ */ jsx("div", { className: "sbl", children }) }) });
}
const AdJourneyV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AdJourneyMotion, {}) });
const OffersComposerV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(OffersComposerMotion, {}) });
const BuildBundleV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(BuildBundleMotion, {}) });
const RoasGapV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(RoasGapMotion, {}) });
const RoasGapMwebV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(RoasGapMweb, {}) });
const PersonalizedContentV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(PersonalizedContentMotion, {}) });
const ComparisonToolsV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(ComparisonToolsMotion, {}) });
const GamesRewardsV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(GamesRewardsMotion, {}) });
const AskAiInlineV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AskAiInlineMotion, {}) });
const GistUpFrontV2bMotion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(GistUpFrontMotion, { v2: true }) });
const DirectAskV2bMotion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(DirectAskMotion, { v2: true }) });
const CrossSellV2bMotion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(CrossSellMotion, { v2: true }) });
const DedicatedLandingPagesV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(DedicatedLandingPagesMotion, {}) });
const AdaptiveProductPagesV2bMotion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AdaptiveProductPagesV2Motion, {}) });
export {
  AdJourneyV2Motion,
  AdaptiveProductPagesV2bMotion,
  AskAiInlineV2Motion,
  BuildBundleV2Motion,
  ComparisonToolsV2Motion,
  CrossSellV2bMotion,
  DedicatedLandingPagesV2Motion,
  DirectAskV2bMotion,
  GamesRewardsV2Motion,
  GistUpFrontV2bMotion,
  OffersComposerV2Motion,
  PersonalizedContentV2Motion,
  RoasGapMwebV2Motion,
  RoasGapV2Motion
};
