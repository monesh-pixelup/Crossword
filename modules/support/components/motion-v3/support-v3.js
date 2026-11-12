"use client";

// Built from the "Crossword — Support V3 motion visuals" source (Crossword-Support-V3-Motion/source) with Vite,
// unminified, React external. See ./support-motion.tsx for the mechanical changes.

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRef, useState, useLayoutEffect, forwardRef, useEffect, Fragment as Fragment$1, useMemo, useCallback, createContext, useContext } from "react";
import { createPortal } from "react-dom";
const frameBackground = "/images/support/v3/assets/background-GiCSjLb9.svg";
const frameTexture = "/images/support/v3/assets/background-texture-C4nqYl4R.webp";
function SceneFrame({
  children,
  hideBackground,
  height
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "ill-scene-frame-scale",
      style: height ? { aspectRatio: `738 / ${height}` } : void 0,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: height ? "ill-scene-frame ill-scene-frame--sized" : "ill-scene-frame",
          style: height ? { height } : void 0,
          children: [
            !hideBackground && /* @__PURE__ */ jsxs(Fragment, { children: [
              height ? /* @__PURE__ */ jsx("svg", { className: "ill-scene-frame__background", viewBox: `0 0 738 ${height}`, "aria-hidden": "true", children: [
                [26, 24],
                [712, 24],
                [26, height - 24],
                [712, height - 24]
              ].map(([cx, cy]) => /* @__PURE__ */ jsx("circle", { cx, cy, r: 4.5, fill: "none", stroke: "#D2B75C" }, `${cx}-${cy}`)) }) : /* @__PURE__ */ jsx(
                "img",
                {
                  className: "ill-scene-frame__background",
                  src: frameBackground,
                  alt: "",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "ill-scene-frame__texture",
                  src: frameTexture,
                  alt: "",
                  "aria-hidden": "true"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ill-scene-frame__content", children })
          ]
        }
      )
    }
  );
}
const __vite_glob_0_0 = "/images/support/v3/assets/amber-and-oak-mark-fxg20Grc.svg";
const __vite_glob_0_1 = "/images/support/v3/assets/aura-mark-DpXI8V8Q.svg";
const __vite_glob_0_2 = "/images/support/v3/assets/aurelia-mark-Bh18_Lw6.svg";
const __vite_glob_0_3 = "/images/support/v3/assets/aurelle-mark-BUbtN7nf.svg";
const __vite_glob_0_4 = "/images/support/v3/assets/brewhaus-mark-C30bIvyV.svg";
const __vite_glob_0_5 = "/images/support/v3/assets/crestline-mark-BYdfHI0-.svg";
const __vite_glob_0_6 = "/images/support/v3/assets/dusklight-mark-e281Q9el.svg";
const __vite_glob_0_7 = "/images/support/v3/assets/goodwell-mark-B8uogM9l.svg";
const __vite_glob_0_8 = "/images/support/v3/assets/marais-mark-Dtz5V4-o.svg";
const __vite_glob_0_9 = "/images/support/v3/assets/moonrest-mark-CqubK1ze.svg";
const __vite_glob_0_10 = "/images/support/v3/assets/proteinmax-mark-CAjpFhM5.svg";
const __vite_glob_0_11 = "/images/support/v3/assets/sorelle-labs-mark-CQBfsdpQ.svg";
const __vite_glob_0_12 = "/images/support/v3/assets/stride-mark-BhAcSYrg.svg";
const __vite_glob_0_13 = "/images/support/v3/assets/trailwell-mark-DWHfUX1B.svg";
const __vite_glob_1_0 = "/images/support/v3/assets/amber-and-oak-mark-DyBTEnHG.svg";
const __vite_glob_1_1 = "/images/support/v3/assets/aurelia-mark-WAhMDRAF.svg";
const __vite_glob_1_2 = "/images/support/v3/assets/aurelle-mark-CkALuNbG.svg";
const __vite_glob_1_3 = "/images/support/v3/assets/brewhaus-mark-CPBhNKZi.svg";
const __vite_glob_1_4 = "/images/support/v3/assets/crestline-mark-x07nlP5x.svg";
const __vite_glob_1_5 = "/images/support/v3/assets/dusklight-mark-BxLi6ckI.svg";
const __vite_glob_1_6 = "/images/support/v3/assets/moonrest-mark-C1S3y54t.svg";
const __vite_glob_1_7 = "/images/support/v3/assets/sorelle-labs-mark-DwV8-BRm.svg";
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
const goodwellMark = "/images/support/v3/assets/goodwell-mark-D2M8-7dz.svg";
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
const history = "/images/support/v3/assets/history-BevL6311.svg";
const add = "/images/support/v3/assets/add-Cbob5SpL.svg";
const expand = "/images/support/v3/assets/expand-DCmbcy1L.svg";
const close = "/images/support/v3/assets/close-DsdKJYzC.svg";
const send = "/images/support/v3/assets/send-ciTszH9F.svg";
const favorite = "/images/support/v3/assets/favorite-CUi59LNH.svg";
const insight = "/images/support/v3/assets/insight-uAQ9aztG.svg";
const caretDown = "/images/support/v3/assets/caret-down-SLWfN0GR.svg";
const aiStatus = "/images/support/v3/assets/ai-status-BrMkXQfp.svg";
const historyGold = "/images/support/v3/assets/history-gold-BJyNNDvb.svg";
const addGold = "/images/support/v3/assets/add-gold-BsVrGX-2.svg";
const expandGold = "/images/support/v3/assets/expand-gold-DMlB4LYO.svg";
const closeGold = "/images/support/v3/assets/close-gold-C4NzsZzj.svg";
const sendGold = "/images/support/v3/assets/send-gold-Vhul_k2n.svg";
const addMuted = "/images/support/v3/assets/add-muted-BR3d4Eat.svg";
const sparkle = "/images/support/v3/assets/sparkle-DD7f07RS.svg";
const lock = "/images/support/v3/assets/lock-Ct-i8Zkt.svg";
const shieldCheck = "/images/support/v3/assets/shield-check-ButlZpGU.svg";
const checks = "/images/support/v3/assets/checks-Cn5ndNQt.svg";
const union = "/images/support/v3/assets/union-DvakWNG_.svg";
const sourceDot = "/images/support/v3/assets/source-dot-FmkgXLjm.svg";
const money = "/images/support/v3/assets/money-BRnIy4Hf.svg";
const userSound = "/images/support/v3/assets/user-sound-B1mWE2AQ.svg";
const warning = "/images/support/v3/assets/warning-B_MVWxpy.svg";
const caretRight = "/images/support/v3/assets/caret-right-N4DMqoC_.svg";
const search = "/images/support/v3/assets/search-6aT0QOjO.svg";
const address = "/images/support/v3/assets/address-QPOEXXur.svg";
const spark = "/images/support/v3/assets/spark-CL1SvstU.svg";
const usersThree = "/images/support/v3/assets/users-three-CNldQr4E.svg";
const shoppingCart = "/images/support/v3/assets/shopping-cart-9S1-ijDB.svg";
const funnel = "/images/support/v3/assets/funnel-DtM1xN-e.svg";
const bell = "/images/support/v3/assets/bell-hYUBIbcW.svg";
const glyphs = {
  history,
  add,
  expand,
  close,
  send,
  favorite,
  insight,
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
  address,
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
    const content = el == null ? void 0 : el.querySelector(".ill-grow-composer__content");
    if (!el || !content) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    setLines(Math.round(content.offsetHeight / lh));
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
function ContentFade() {
  return /* @__PURE__ */ jsx("div", { className: "ill-content-fade", "aria-hidden": "true" });
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
  composer,
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
        composer ?? (growComposer ? /* @__PURE__ */ jsx(GrowComposer, { value: composerValue, typing: composerTyping }) : /* @__PURE__ */ jsx(ChatComposer, { value: composerValue, typing: composerTyping }))
      ]
    }
  );
}
function Thread({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-thread", children });
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
function ChatMessage({ role, text, children }) {
  if (role === "user") {
    return /* @__PURE__ */ jsx("div", { className: "ill-chat-message ill-chat-message--user", children: /* @__PURE__ */ jsx("p", { children: children ?? text }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "ill-chat-message ill-chat-message--assistant", children: /* @__PURE__ */ jsx("p", { children: children ?? text }) });
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
function StaggerText({ text, boldText }) {
  const words = text.split(/\s+/).filter(Boolean);
  const boldWords = boldText ? boldText.split(/\s+/).filter(Boolean) : [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    words.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("span", { className: "ill-stagger-text__word", style: { animationDelay: `${i * 45}ms` }, children: word }),
      i < words.length - 1 || boldWords.length ? " " : ""
    ] }, `plain-${i}`)),
    boldWords.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        "strong",
        {
          className: "ill-stagger-text__word",
          style: { animationDelay: `${(words.length + i) * 45}ms` },
          children: word
        }
      ),
      i < boldWords.length - 1 ? " " : ""
    ] }, `bold-${i}`))
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
function Chip({
  children,
  kind = "label",
  size = "md",
  tone = "primary"
}) {
  const classes = [
    "ill-chip",
    kind === "discount" && "ill-chip--discount",
    kind === "action" && `ill-chip--action ill-chip--action-${tone}`,
    size === "sm" && "ill-chip--sm"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("span", { className: classes, children });
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
const BLOCK = ".ill-chip, .ill-button, .ill-thumbnail, .ill-support-step__marker, .ill-support-shade__swatch, svg, img";
function useMeasuredSkeleton(panel, overlayClass, enabled) {
  const [shapes, setShapes] = useState([]);
  useLayoutEffect(() => {
    var _a;
    const root = panel.current;
    if (!enabled || !root) return;
    const measure2 = () => {
      const o = root.getBoundingClientRect();
      const zoom = root.offsetWidth ? o.width / root.offsetWidth : 1;
      const ox = o.left / zoom + root.clientLeft;
      const oy = o.top / zoom + root.clientTop;
      const out = [];
      const rect = (z, kind, radius, inset = 0) => {
        const r = { left: z.left / zoom, top: z.top / zoom, width: z.width / zoom, height: z.height / zoom };
        out.push({ kind, x: r.left - ox, y: r.top - oy + inset, w: r.width, h: r.height - inset * 2, r: radius });
      };
      const walk = (el) => {
        if (el.classList.contains(overlayClass)) return;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return;
        const radius = parseFloat(cs.borderTopLeftRadius) || 0;
        if (el.matches(BLOCK)) {
          rect(el.getBoundingClientRect(), "block", radius);
          return;
        }
        const bg = cs.backgroundColor.match(/[\d.]+/g);
        const hasFill = !!bg && (bg.length < 4 || parseFloat(bg[3]) > 0);
        const isTile = (parseFloat(cs.borderTopWidth) > 0 || hasFill) && el.children.length > 0;
        if (isTile) rect(el.getBoundingClientRect(), "outline", radius);
        const ownText = [...el.childNodes].filter((n) => {
          var _a2;
          return n.nodeType === Node.TEXT_NODE && ((_a2 = n.textContent) == null ? void 0 : _a2.trim());
        });
        if (ownText.length) {
          const barH = Math.round(parseFloat(cs.fontSize) * 0.8);
          const lines = /* @__PURE__ */ new Map();
          for (const node of ownText) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const r of range.getClientRects()) {
              const key = Math.round(r.top);
              const prev = lines.get(key);
              lines.set(key, prev ? new DOMRect(Math.min(prev.left, r.left), prev.top, Math.max(prev.right, r.right) - Math.min(prev.left, r.left), prev.height) : r);
            }
          }
          for (const r of lines.values()) {
            const inset = Math.max((r.height / zoom - barH) / 2, 0);
            rect(r, "bar", 4, inset);
          }
        }
        for (const child of el.children) walk(child);
      };
      for (const child of root.children) walk(child);
      setShapes(out);
    };
    measure2();
    const observer = new ResizeObserver(measure2);
    observer.observe(root);
    (_a = document.fonts) == null ? void 0 : _a.ready.then(measure2);
    return () => observer.disconnect();
  }, [panel, overlayClass, enabled]);
  return shapes;
}
function SupportPanel({
  heading,
  status,
  children,
  className,
  loading = false
}) {
  const panelRef = useRef(null);
  const shapes = useMeasuredSkeleton(panelRef, "ill-support-panel__skeleton-overlay", loading);
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  const justRevealed = !loading && wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);
  const contentModifier = loading ? "ill-support-panel--content-hidden" : justRevealed ? "ill-support-panel--content-reveal" : "";
  return /* @__PURE__ */ jsxs("section", { ref: panelRef, className: ["ill-support-panel", contentModifier, className].filter(Boolean).join(" "), children: [
    (heading || status) && /* @__PURE__ */ jsxs("header", { className: "ill-support-panel__header", children: [
      heading && /* @__PURE__ */ jsx("div", { className: "ill-support-panel__heading", children: heading }),
      status && /* @__PURE__ */ jsx(Chip, { size: "sm", children: status })
    ] }),
    children,
    showOverlay && /* @__PURE__ */ jsx("div", { className: `ill-support-panel__skeleton-overlay${loading ? "" : " ill-support-panel__skeleton-overlay--hidden"}`, children: shapes.map((shape, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `ill-support-panel__skeleton-shape${shape.kind === "outline" ? " ill-support-panel__skeleton-shape--outline" : ""}`,
        style: { left: shape.x, top: shape.y, width: shape.w, height: shape.h, borderRadius: shape.r },
        children: shape.kind !== "outline" && /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: "100%", radius: shape.r })
      },
      i
    )) })
  ] });
}
function StatusSteps({
  steps,
  orientation = "horizontal"
}) {
  if (orientation === "boxed") {
    return /* @__PURE__ */ jsx("ol", { className: "ill-support-steps ill-support-steps--boxed", children: steps.map((step) => /* @__PURE__ */ jsxs("li", { className: `ill-support-step ill-support-step--${step.state}`, children: [
      /* @__PURE__ */ jsx("span", { className: "ill-support-step__label", children: step.label }),
      step.detail && /* @__PURE__ */ jsx("span", { className: "ill-support-step__detail", children: step.detail })
    ] }, step.label)) });
  }
  return /* @__PURE__ */ jsx("ol", { className: `ill-support-steps ill-support-steps--${orientation}`, children: steps.map((step) => /* @__PURE__ */ jsxs("li", { className: `ill-support-step ill-support-step--${step.state}`, children: [
    /* @__PURE__ */ jsx("span", { className: "ill-support-step__marker", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("span", { className: "ill-support-step__text", children: [
      /* @__PURE__ */ jsx("span", { className: "ill-support-step__label", children: step.label }),
      step.detail && /* @__PURE__ */ jsx("span", { className: "ill-support-step__detail", children: step.detail })
    ] })
  ] }, step.label)) });
}
const vitaminCSerum = "/images/support/v3/assets/vitamin-c-serum-vnf_1nLn.webp";
const foundation$1 = "/images/support/v3/assets/foundation-Cmt_XVU-.webp";
const brand = "Sorelle Labs";
const orderTracking = {
  userMessage: "Where is my order? It's been a week.",
  assistantMessage: "It shipped Tuesday and is currently in transit through Chicago, expected by Friday. I'll send you a message the moment it's out for delivery, so you don't have to check back.",
  status: "In transit",
  eta: "Expected by Friday",
  steps: [
    { label: "Shipped", detail: "Tuesday", state: "done" },
    { label: "In transit", detail: "Chicago", state: "current" },
    { label: "Out for delivery", detail: "We'll message you", state: "upcoming" }
  ]
};
const productUsage = {
  // The shopper is asking about "this" serum — a product they're already
  // looking at, so it rides on their turn as a Product/Reference.
  product: { image: vitaminCSerum, alt: "Sorelle Labs Vitamin C Serum", title: "Vitamin C Serum" },
  userMessage: "How much of this vitamin C serum should I use?",
  assistantMessage: "Start with 2–3 drops after cleansing, before moisturizer. If your skin is new to vitamin C, try it every other morning first. Want me to add it to a simple morning routine?",
  // Reuses the same StatusSteps timeline as 01/03 — "current" repurposed
  // to mean "the step being asked about," not "in progress now".
  // Every tab needs its own sub-head — Cleanse/Moisturizer have no dose of
  // their own, so their sub-heads restate the script's own ordering
  // language ("after cleansing, before moisturizer") rather than
  // inventing a new fact.
  steps: [
    { label: "Cleanse", detail: "Before serum", state: "done" },
    { label: "Vitamin C serum", detail: "2–3 drops", state: "current" },
    { label: "Moisturizer", detail: "After serum", state: "upcoming" }
  ],
  cta: "Add to cart"
};
const sizeExchange = {
  userMessage: "This doesn't fit. I want to exchange it for a size up.",
  assistantMessage: "No problem, I've started the exchange for the next size up. A prepaid return label is in your email, and the new one ships as soon as the return is scanned. Want me to notify you the moment it does?",
  heading: "Exchange",
  status: "Started",
  // No sizes are given in the script, so the swap is described
  // relatively ("current" / "next size up") instead of inventing values.
  swap: [
    { label: "Returning", value: "Current size" },
    { label: "Sending", value: "Next size up" }
  ],
  steps: [
    { label: "Prepaid return label", detail: "In your email", state: "done" },
    { label: "New size ships", detail: "As soon as the return is scanned", state: "upcoming" }
  ]
};
const shadeChange = {
  userMessage: "I ordered the wrong shade of foundation. Can I change it before it ships?",
  assistantMessage: "Yes. Your order hasn’t shipped yet, so I can switch it from Shade 3 Fair to Shade 4 Buff. Want me to make that change?",
  product: { image: foundation$1, alt: "Sorelle Labs Foundation in the shopper's order", title: "Foundation" },
  status: "Not shipped yet",
  // Swatch fills are product data (the shade itself), not system colors —
  // replace with the merchant's real shade swatches.
  from: { label: "In your order", shade: "Shade 3 Fair", swatch: "#efd3bd" },
  to: { label: "Switch to", shade: "Shade 4 Buff", swatch: "#e2bc9a" },
  confirm: "Make the change",
  decline: "Keep Shade 3 Fair"
};
const refundStatus = {
  userMessage: "I returned my serum last week. Where’s my refund?",
  assistantMessage: "Your return was received yesterday and the refund has been processed. You should see $48.25 back on your original payment method within 3–5 business days.",
  label: "Refund",
  amount: "$48.25",
  status: "Processed",
  facts: [
    { label: "Return", value: "Received yesterday" },
    { label: "Back to", value: "Original payment method" },
    { label: "Arrives in", value: "3–5 business days" }
  ]
};
const merchantHelpdesk = {
  // The speaker here is the brand's own team, not a shopper — Crossword's
  // merchant-facing helpdesk surface, so the embedded module is support
  // operations data (queue counts, assignable conversations), not a
  // product result.
  userMessage: "I need to see what’s happening with our customer conversations.",
  assistantMessage: "You can manage them all in Crossword. See active, waiting, and escalated conversations, assign them to your team, and pick up where the customer left off.",
  // "Operational Queue" layout — design feedback replacing the earlier
  // Figma-literal version (filled Assign/Open pills, a separate status
  // chip per row): flatter hierarchy, a named inbox + "view all" on top,
  // a "Needs attention" section for the list below it.
  inboxLabel: "Team inbox",
  allConversationsLabel: "All conversations",
  attentionLabel: "Needs attention",
  overview: [
    { label: "Active", value: "12" },
    { label: "Waiting", value: "4" },
    { label: "Escalated", value: "2" }
  ],
  // Issue + status now read as one line ("Delivery issue · Escalated")
  // instead of a separate status chip. `action` is only set where the row
  // has a real next step (Assign); its absence renders a subtle chevron
  // instead, per feedback.
  conversations: [
    { name: "Alex Chen", issue: "Delivery issue", status: "Escalated", action: "Assign" },
    { name: "Sophie Moore", issue: "Return request", status: "Waiting", action: void 0 }
  ]
};
const merchantInsight = {
  // Its own brand label (node 2725:29703 etc.) — distinct from the
  // shared `brand` above, which the other seven scenarios (including 07
  // Merchant helpdesk) use. This scene's reference instances all show
  // "Marais", not "Sorelle Labs", so it's kept as its own constant
  // rather than overwritten to match the rest of the set.
  brand: "Marais",
  userMessage: "I need to see what’s happening with our customer conversations.",
  context: "They’re a returning customer with 6 orders. They’re asking about a delayed refund for order #4821. They’ve visited the returns page twice and spent 3 minutes on the refund policy. Previous conversations show they prefer email updates.",
  followUpMessage: "Anything else I should know?",
  resolution: "The refund is approved but hasn’t reached the payment processor yet. I can draft the response for you."
};
const guardrails = {
  userMessage: "I need to see what’s happening with our customer conversations.",
  assistantMessage: "I can't override the return window, but I can flag this to a specialist who can review exceptions.",
  policyChip: "Policy Respected",
  heading: "Your guardrails",
  // Node 2743:33835 gives each row its own title and leading icon; the
  // per-row subcopy was dropped in review (31 Oct 2026).
  rules: [
    { title: "Refund policy", icon: "money" },
    { title: "Tone of voice", icon: "userSound" },
    { title: "Escalation", icon: "warning" }
  ]
};
const humanTakeover = {
  userMessage: "I’ve been going back and forth on this. Can someone help me?",
  assistantMessage: "Absolutely. I’m bringing in someone from the team now. I’ll pass along everything we’ve discussed so you don’t have to repeat yourself.",
  humanMessage: "Hi Maya, I’ve got the full context. Let’s sort this out."
};
const merchantApproval = {
  userMessage: "I love the set, but can you give me 20% off?",
  checkingMessage: "I can check that for you. One moment.",
  // Merchant-side only — Crossword's request to the human never reaches
  // the shopper's own thread on the right.
  requestMessage: "Customer is asking for a 20% discount. They’re a repeat customer with 4 previous orders. Approve?",
  decision: "Approve 15%",
  offerMessage: "I can offer you 15% off this order. Want me to apply it?"
};
const whisperToAgent = {
  whisperMessage: "This is a premium customer. Keep the response warm and personal.",
  userMessage: "I’m really disappointed. I expected better from you.",
  assistantMessage: "I completely understand why you’re disappointed. Let’s make this right. I’ve already looked into your order, and here’s what I can do…",
  // The whisper's named sender, for the floating card's Assistant/Insight
  // card (node 2742:33561) — that node's own example copy is literally
  // "Alex from Sorelle Labs", matching this set's own `brand` above.
  whisperSender: "Alex"
};
const returnEligibility = {
  userMessage: "I opened the protein powder but it’s not working for me. Can I still return it?",
  assistantMessage: "Yes. Our policy allows opened supplements to be returned within 30 days, as long as less than 25% of the product has been used. I can walk you through the return.",
  status: "Eligible for return",
  conditions: [
    { value: "30 days", label: "Return window" },
    { value: "Less than 25%", label: "Product used" }
  ],
  cta: "Start return"
};
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
const THINKING_STAGE_1_MS$2 = 300;
const THINKING_STAGE_2_MS$2 = 500;
const THINKING_EXIT_MS$2 = 150;
const CHAR_INTERVAL_MS$2 = 26;
const REPLY_STAGGER_MS$1 = 45;
const REPLY_WORD_ANIM_MS$1 = 220;
const REPLY_SETTLE_MS$2 = 150;
const RESULT_SKELETON_HOLD_MS = 550;
function prefersReducedMotion$2() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function replyRevealMs$1(text) {
  const wordCount2 = text.split(/\s+/).filter(Boolean).length;
  return wordCount2 * REPLY_STAGGER_MS$1 + REPLY_WORD_ANIM_MS$1 + REPLY_SETTLE_MS$2;
}
function useSupportMotionPlayback({
  userMessage,
  assistantMessage,
  thinkingLabel,
  active
}) {
  const reducedMotion = useRef(prefersReducedMotion$2()).current;
  const [phase, setPhase] = useState(reducedMotion ? "done" : "composing");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [resultLoading, setResultLoading] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setPhase("composing");
      setComposerValue("");
      setComposerTyping(false);
      setStatusLabel("Thinking");
      setResultLoading(false);
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);
  useEffect(() => {
    if (reducedMotion) return;
    if (!active) return;
    if (phase === "done") return;
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(userMessage, {
        msPerStep: CHAR_INTERVAL_MS$2,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          });
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (phase === "thinking") {
      after(THINKING_STAGE_1_MS$2, () => setStatusLabel(thinkingLabel));
      after(THINKING_STAGE_1_MS$2 + THINKING_STAGE_2_MS$2, () => setPhase("thinkingExit"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS$2, () => setPhase("replying"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying") {
      after(replyRevealMs$1(assistantMessage), () => {
        setResultLoading(true);
        setPhase("resultLoading");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "resultLoading") {
      after(RESULT_SKELETON_HOLD_MS, () => {
        setResultLoading(false);
        setPhase("done");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [phase, active, reducedMotion, userMessage, assistantMessage, thinkingLabel]);
  return {
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    resultLoading,
    reducedMotion,
    runKey,
    // The user turn is "sent" (and so enters the thread) once composing
    // has finished — mirrors GiftJourneyMotion's own isSent logic for a
    // single turn instead of an array.
    turnSent: phase !== "composing",
    showThinking: phase === "thinking" || phase === "thinkingExit",
    showReply: phase !== "composing" && phase !== "thinking" && phase !== "thinkingExit"
  };
}
function OrderTrackingMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } = useSupportMotionPlayback({
    userMessage: orderTracking.userMessage,
    assistantMessage: orderTracking.assistantMessage,
    thinkingLabel: "Checking your shipment",
    active
  });
  const showResult = phase === "resultLoading" || phase === "done";
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      className: "ill-shell--standard",
      brand,
      width: 550,
      height: 520,
      rootRef,
      composerValue: phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: phase === "composing" && composerTyping,
      children: /* @__PURE__ */ jsx(Thread, { children: turnSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: orderTracking.userMessage }) }),
        /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: orderTracking.assistantMessage }) }),
          showResult && /* @__PURE__ */ jsx(
            SupportPanel,
            {
              heading: /* @__PURE__ */ jsx("strong", { children: orderTracking.eta }),
              status: orderTracking.status,
              loading: phase === "resultLoading",
              children: /* @__PURE__ */ jsx(StatusSteps, { steps: orderTracking.steps })
            }
          )
        ] })
      ] }) })
    }
  ) });
}
const espressoMachine = "/images/support/v3/assets/01-brewhaus-pro-espresso-machine-CnXtbuBY.webp";
const accessoryBundle = "/images/support/v3/assets/02-brewhaus-coffee-accessory-bundle-C2tDu5VG.webp";
const leatherFrameCase = "/images/support/v3/assets/marais-eyewear-case-JN3ZsUf8.webp";
const silkScarf = "/images/support/v3/assets/04-marais-gold-tone-silk-scarf-CNixvkq3.webp";
const smartSpeaker = "/images/support/v3/assets/05-waveline-compact-smart-speaker-Bnwh8J7N.webp";
const wirelessEarbuds = "/images/support/v3/assets/06-aura-wireless-earbuds-D4tIAj5K.webp";
const leatherWallet = "/images/support/v3/assets/07-holt-and-co-leather-bifold-wallet-Djl5CNb1.webp";
const auden = "/images/support/v3/assets/08-auden-wave-pro-black-DBohKiBG.webp";
const audenIvory = "/images/support/v3/assets/09-auden-viewed-headphones-ivory-DJtMgVTi.webp";
const audenOlive = "/images/support/v3/assets/10-auden-viewed-headphones-olive-CXNlTcjR.webp";
const audenMustard = "/images/support/v3/assets/11-auden-viewed-headphones-mustard-gold-Bfg04pgZ.webp";
const familyAirFryer = "/images/support/v3/assets/12-family-air-fryer-CWIb1OmL.webp";
const compactAirFryer = "/images/support/v3/assets/13-compact-air-fryer-BxJsr6WI.webp";
const referenceLamp = "/images/support/v3/assets/14-shopper-reference-triple-dome-lamp-aevpNtcM.webp";
const tripodLamp = "/images/support/v3/assets/15-warm-tripod-table-lamp-DHLSJYdp.webp";
const domeLamp = "/images/support/v3/assets/16-mod-dome-table-lamp-EjQrNJOK.webp";
const bedsideLamp = "/images/support/v3/assets/17-copper-rim-bedside-lamp-CpO5i7WX.webp";
const foundation = "/images/support/v3/assets/lumen-second-skin-dewy-wWlLR3Lx.webp";
const cottonShirt = "/images/support/v3/assets/19-marais-relaxed-cotton-shirt-7PfMJYiW.webp";
const tailoredTrousers = "/images/support/v3/assets/20-straight-leg-tailored-trousers-hCDbFo78.webp";
const leatherSneakers = "/images/support/v3/assets/21-minimal-leather-sneakers-BEbJimwc.webp";
const aeriaCycloneProVacuum = "/images/support/v3/assets/22-aeria-cyclone-pro-vacuum-CinSe7Rh.webp";
const aeriaCycloneMaxVacuum = "/images/support/v3/assets/aeria-cyclone-max-CqZad4Xk.webp";
const oliveCottonShirt = "/images/support/v3/assets/marais-shirt-olive-Bh1w4gzh.webp";
const blackLeatherSneakers = "/images/support/v3/assets/stride-sneakers-black-CuBmUkDb.webp";
const skinVeilFoundation = "/images/support/v3/assets/lumen-skin-veil-p5bk1wp6.webp";
const trueMatchFoundation = "/images/support/v3/assets/lumen-true-match-BhSYv85P.webp";
const leatherCardholder = "/images/support/v3/assets/holt-cardholder-Cu4HiyUC.webp";
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
const amberChairImage = "/images/support/v3/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
const amberOpalLampImage = "/images/support/v3/assets/amber-oak-opal-glass-lamp-CSWTBSbc.webp";
const amberPleatedLampImage = "/images/support/v3/assets/amber-oak-pleated-linen-lamp-DU9AZH7n.webp";
const trailwellWeekenderImage = "/images/support/v3/assets/trailwell-weekender-FcXfEIMe.webp";
const trailwellRoamImage = "/images/support/v3/assets/trailwell-roam-E1xpy3ga.webp";
const trailwellOvernightImage = "/images/support/v3/assets/trailwell-overnight-Bh3WrqOg.webp";
const strideCourt = "/images/support/v3/assets/court-01-CdgB4UN7.webp";
const strideRunner = "/images/support/v3/assets/suede-runner-CgZl6zbH.webp";
const strideLoafer = "/images/support/v3/assets/penny-loafer-B2im49V5.webp";
const sorelleSetImage = "/images/support/v3/assets/sorelle-hydration-set-9Ig4QSA_.webp";
const sorelleGelImage = "/images/support/v3/assets/sorelle-cloud-gel-BMJMi5HN.webp";
const sorelleLotionImage = "/images/support/v3/assets/sorelle-barrier-lotion-ZlOVOOrp.webp";
const sorelleCreamImage = "/images/support/v3/assets/sorelle-hydration-cream-DnCPkHXM.webp";
const goodwell_sleep_60 = "/images/support/v3/assets/goodwell-sleep-60-CC2pkEiH.webp";
const goodwell_sleep_28 = "/images/support/v3/assets/goodwell-sleep-28-CDykoAsw.webp";
const goodwell_energy = "/images/support/v3/assets/goodwell-energy-DTBla5fb.webp";
const goodwell_focus = "/images/support/v3/assets/goodwell-focus-Bg4PysvQ.webp";
const goodwell_calm = "/images/support/v3/assets/goodwell-calm-BFGrK6_s.webp";
const goodwell_immunity = "/images/support/v3/assets/goodwell-immunity-MpMIo6Dd.webp";
const moonrest_sleep = "/images/support/v3/assets/moonrest-sleep-Cn_bYWCE.webp";
const dusklight_arc = "/images/support/v3/assets/dusklight-arc-BLtDyKob.svg";
const dusklight_linear = "/images/support/v3/assets/dusklight-linear-CNxIsC3B.svg";
const crestlineHelmet = "/images/support/v3/assets/crestline-helmet-ByadbiwR.webp";
const aurelleAnkletImage = "/images/support/v3/assets/beaded-gold-anklet-BD5cJanU.webp";
const aurellePendantImage = "/images/support/v3/assets/teardrop-pendant-necklace-D-dhIf6_.webp";
const aurelleBraceletImage = "/images/support/v3/assets/chain-link-bracelet-GsLwly7K.webp";
const aurelleRosePendantImage = "/images/support/v3/assets/rose-gold-teardrop-pendant-D6EiuVDi.webp";
const aurelleHaloImage = "/images/support/v3/assets/rose-gold-halo-pendant-D9hm3seh.webp";
const aurelleBarImage = "/images/support/v3/assets/rose-gold-bar-pendant-BLV_GvgY.webp";
const aurelleBoxChainImage = "/images/support/v3/assets/rose-gold-fine-box-chain-xCJee_59.webp";
const aurelleSnakeChainImage = "/images/support/v3/assets/rose-gold-snake-chain-CAeWdfsC.webp";
const aurelleCurbChainImage = "/images/support/v3/assets/rose-gold-curb-chain-JMoFIQPj.webp";
const hydratingSerum = "/images/support/v3/assets/hydrating-serum-DkP_er3F.webp";
const calmingSerum = "/images/support/v3/assets/calming-serum-mWPB8Rzq.webp";
const proteinTub = "/images/support/v3/assets/gallery-main-Ct7UQJr8.webp";
const officeChair = "/images/support/v3/assets/gallery-main-Cz-eqPt1.webp";
const linenMidiDress = "/images/support/v3/assets/linen-midi-dress-BF9Sk3Jd.webp";
const linenShirtDress = "/images/support/v3/assets/linen-shirt-dress-DbEpAh-k.webp";
const linenTrousers = "/images/support/v3/assets/linen-trousers-BOqijRPF.webp";
const balloonSleeveDress = "/images/support/v3/assets/dress-reference-OSo4OmDP.webp";
const wavelineLaptop = "/images/support/v3/assets/laptop-bHYKckDQ.webp";
const formworkTaskChair = "/images/support/v3/assets/also-viewed-1-B6DEocae.webp";
const formworkExecutiveChair = "/images/support/v3/assets/also-viewed-2-DWB9-93Z.webp";
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
const goldHoopSet = "/images/support/v3/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const pearlDropSet = "/images/support/v3/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const citrineStudSet = "/images/support/v3/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
}
function Media({ src, alt }) {
  if (src) {
    return /* @__PURE__ */ jsx("img", { className: `ill-media${cutoutSrcs.has(src) ? " ill-media--cutout" : ""}`, src, alt });
  }
  return /* @__PURE__ */ jsx("div", { className: "ill-media ill-media--placeholder", role: "img", "aria-label": alt });
}
function ProductReference({ image, alt, brand: brand2, title, price, size }) {
  return /* @__PURE__ */ jsxs("div", { className: "ill-product-reference", children: [
    /* @__PURE__ */ jsx("div", { className: "ill-product-reference__media", style: size ? { width: size, height: size } : void 0, children: image ? /* @__PURE__ */ jsx(ProductImage, { src: image, alt, className: `ill-media${cutoutSrcs.has(image) ? " ill-media--cutout" : ""}` }) : /* @__PURE__ */ jsx(Media, { alt }) }),
    /* @__PURE__ */ jsxs("div", { className: "ill-product-reference__text", children: [
      brand2 && /* @__PURE__ */ jsx("p", { className: "ill-product-reference__brand", children: brand2 }),
      /* @__PURE__ */ jsx("p", { className: "ill-product-reference__title", children: title }),
      price && /* @__PURE__ */ jsx("p", { className: "ill-product-reference__price", children: price })
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
function ProductUsageMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } = useSupportMotionPlayback({
    userMessage: productUsage.userMessage,
    assistantMessage: productUsage.assistantMessage,
    thinkingLabel: "Checking the routine",
    active
  });
  const { product } = productUsage;
  const showResult = phase === "resultLoading" || phase === "done";
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      className: "ill-shell--standard",
      brand,
      width: 550,
      height: 520,
      rootRef,
      composerValue: phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: phase === "composing" && composerTyping,
      children: /* @__PURE__ */ jsx("div", { className: "ill-support-thread--tight", children: /* @__PURE__ */ jsx(Thread, { children: turnSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(UserTurn, { animateIn: true, children: [
          /* @__PURE__ */ jsx(ProductReference, { image: product.image, alt: product.alt, title: product.title }),
          /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: productUsage.userMessage })
        ] }),
        /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: productUsage.assistantMessage }) }),
          showResult && /* @__PURE__ */ jsxs(SupportPanel, { loading: phase === "resultLoading", children: [
            /* @__PURE__ */ jsx(StatusSteps, { steps: productUsage.steps, orientation: "boxed" }),
            /* @__PURE__ */ jsx(Button, { appearance: "primary", label: productUsage.cta })
          ] })
        ] })
      ] }) }) })
    }
  ) });
}
function SizeExchangeMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } = useSupportMotionPlayback({
    userMessage: sizeExchange.userMessage,
    assistantMessage: sizeExchange.assistantMessage,
    thinkingLabel: "Starting your exchange",
    active
  });
  const showResult = phase === "resultLoading" || phase === "done";
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      className: "ill-shell--standard",
      brand,
      width: 550,
      height: 520,
      rootRef,
      composerValue: phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: phase === "composing" && composerTyping,
      children: /* @__PURE__ */ jsx("div", { className: "ill-support-thread--tight", children: /* @__PURE__ */ jsx(Thread, { children: turnSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: sizeExchange.userMessage }) }),
        /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: sizeExchange.assistantMessage }) }),
          showResult && /* @__PURE__ */ jsxs(
            SupportPanel,
            {
              heading: sizeExchange.heading,
              status: sizeExchange.status,
              loading: phase === "resultLoading",
              children: [
                /* @__PURE__ */ jsx("div", { className: "ill-support-swap", children: sizeExchange.swap.map((side, i) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `ill-support-swap__side${i === 1 ? " ill-support-swap__side--to" : ""}`,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "ill-support-swap__label", children: side.label }),
                      /* @__PURE__ */ jsx("span", { className: "ill-support-swap__value", children: side.value })
                    ]
                  },
                  side.label
                )) }),
                /* @__PURE__ */ jsx(StatusSteps, { steps: sizeExchange.steps, orientation: "vertical" })
              ]
            }
          )
        ] })
      ] }) }) })
    }
  ) });
}
function ShadeChangeMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } = useSupportMotionPlayback({
    userMessage: shadeChange.userMessage,
    assistantMessage: shadeChange.assistantMessage,
    thinkingLabel: "Checking your order",
    active
  });
  const { product, from, to } = shadeChange;
  const showResult = phase === "resultLoading" || phase === "done";
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      className: "ill-shell--standard",
      brand,
      width: 550,
      height: 520,
      rootRef,
      composerValue: phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: phase === "composing" && composerTyping,
      growComposer: true,
      children: /* @__PURE__ */ jsx("div", { className: "ill-support-thread--tight", children: /* @__PURE__ */ jsx(Thread, { children: turnSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: shadeChange.userMessage }) }),
        /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: shadeChange.assistantMessage }) }),
          showResult && /* @__PURE__ */ jsxs(
            SupportPanel,
            {
              heading: /* @__PURE__ */ jsx(ProductReference, { image: product.image, alt: product.alt, title: product.title }),
              status: shadeChange.status,
              loading: phase === "resultLoading",
              children: [
                /* @__PURE__ */ jsx("div", { className: "ill-support-shades", children: [
                  { ...from, key: "from" },
                  { ...to, key: "to" }
                ].map((s) => /* @__PURE__ */ jsxs("div", { className: `ill-support-shade ill-support-shade--${s.key}`, children: [
                  /* @__PURE__ */ jsx("span", { className: "ill-support-shade__swatch", style: { background: s.swatch } }),
                  /* @__PURE__ */ jsxs("span", { className: "ill-support-shade__text", children: [
                    /* @__PURE__ */ jsx("span", { className: "ill-support-shade__label", children: s.label }),
                    /* @__PURE__ */ jsx("span", { className: "ill-support-shade__name", children: s.shade })
                  ] })
                ] }, s.key)) }),
                /* @__PURE__ */ jsxs("div", { className: "ill-support-actions", children: [
                  /* @__PURE__ */ jsx(Button, { appearance: "secondary", label: shadeChange.decline }),
                  /* @__PURE__ */ jsx(Button, { appearance: "primary", label: shadeChange.confirm })
                ] })
              ]
            }
          )
        ] })
      ] }) }) })
    }
  ) });
}
function AttributeRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "ill-attribute-row", children: [
    /* @__PURE__ */ jsx("span", { className: "ill-attribute-row__label", children: label }),
    /* @__PURE__ */ jsx("span", { className: "ill-attribute-row__value", children: value })
  ] });
}
function RefundStatusMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } = useSupportMotionPlayback({
    userMessage: refundStatus.userMessage,
    assistantMessage: refundStatus.assistantMessage,
    thinkingLabel: "Checking your refund",
    active
  });
  const showResult = phase === "resultLoading" || phase === "done";
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      className: "ill-shell--standard",
      brand,
      width: 550,
      height: 520,
      rootRef,
      composerValue: phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: phase === "composing" && composerTyping,
      children: /* @__PURE__ */ jsx(Thread, { children: turnSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: refundStatus.userMessage }) }),
        /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: refundStatus.assistantMessage }) }),
          showResult && /* @__PURE__ */ jsx(SupportPanel, { loading: phase === "resultLoading", children: /* @__PURE__ */ jsxs("div", { className: "ill-support-refund", children: [
            /* @__PURE__ */ jsxs("div", { className: "ill-support-refund__amount", children: [
              /* @__PURE__ */ jsx("p", { className: "ill-support-refund__value", children: refundStatus.amount }),
              /* @__PURE__ */ jsxs("div", { className: "ill-support-refund__status-row", children: [
                /* @__PURE__ */ jsx("span", { className: "ill-support-refund__label", children: refundStatus.label }),
                /* @__PURE__ */ jsx(Chip, { size: "sm", children: refundStatus.status })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ill-support-refund__facts", children: refundStatus.facts.map((f) => /* @__PURE__ */ jsx(AttributeRow, { label: f.label, value: f.value }, f.label)) })
          ] }) })
        ] })
      ] }) })
    }
  ) });
}
function ReturnEligibilityMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } = useSupportMotionPlayback({
    userMessage: returnEligibility.userMessage,
    assistantMessage: returnEligibility.assistantMessage,
    thinkingLabel: "Checking the policy",
    active
  });
  const showResult = phase === "resultLoading" || phase === "done";
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      className: "ill-shell--standard",
      brand,
      width: 550,
      height: 520,
      rootRef,
      composerValue: phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: phase === "composing" && composerTyping,
      growComposer: true,
      children: /* @__PURE__ */ jsx("div", { className: "ill-support-thread--tight", children: /* @__PURE__ */ jsx(Thread, { children: turnSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: returnEligibility.userMessage }) }),
        /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: returnEligibility.assistantMessage }) }),
          showResult && /* @__PURE__ */ jsx(SupportPanel, { loading: phase === "resultLoading", children: /* @__PURE__ */ jsxs("div", { className: "ill-support-eligibility", children: [
            /* @__PURE__ */ jsx(Chip, { size: "sm", children: returnEligibility.status }),
            /* @__PURE__ */ jsx("div", { className: "ill-support-conditions", children: returnEligibility.conditions.map((c) => /* @__PURE__ */ jsxs("div", { className: "ill-support-condition", children: [
              /* @__PURE__ */ jsx("p", { className: "ill-support-condition__value", children: c.value }),
              /* @__PURE__ */ jsx("p", { className: "ill-support-condition__label", children: c.label })
            ] }, c.value)) }),
            /* @__PURE__ */ jsx(Button, { appearance: "primary", label: returnEligibility.cta })
          ] }) })
        ] })
      ] }) }) })
    }
  ) });
}
const audiencesBg = "/images/support/v3/assets/audiences_bg_3x-CeMPiv1g.webp";
const returnReductionBg = "/images/support/v3/assets/return_reduction_bg_3x-PTzwbPCJ.webp";
const backdrops = { green: audiencesBg, purple: returnReductionBg };
function LandscapeCanvas({
  scene,
  widget,
  backdrop,
  bleed = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: `ill-landscape-canvas${bleed ? " ill-landscape-canvas--bleed" : ""}`, style: { backgroundImage: `url(${backdrops[backdrop]})` }, children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-landscape-canvas__page", children: [
      /* @__PURE__ */ jsx("div", { className: "ill-landscape-canvas__scene", children: scene }),
      /* @__PURE__ */ jsx("div", { className: "ill-landscape-canvas__fade", children: /* @__PURE__ */ jsx(ContentFade, {}) })
    ] }),
    widget && /* @__PURE__ */ jsx("div", { className: "ill-landscape-canvas__widget", children: widget })
  ] });
}
const THINKING_STAGE_1_MS$1 = 300;
const THINKING_STAGE_2_MS$1 = 500;
const THINKING_SINGLE_MS = 600;
const THINKING_EXIT_MS$1 = 150;
const CHAR_INTERVAL_MS$1 = 26;
const REPLY_STAGGER_MS = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS$1 = 150;
const APPEAR_MS = 450;
const LOAD_MS = 650;
const FIRST_COMPOSE_LEAD_MS = 350;
const NEXT_COMPOSE_LEAD_MS = 900;
const SENT_SETTLE_MS = 220;
function prefersReducedMotion$1() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount(text) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}
function replyRevealMs(text) {
  return wordCount(text) * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS$1;
}
function useChatTimeline(beats2, active) {
  const reducedMotion = useRef(prefersReducedMotion$1()).current;
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
            msPerStep: beat.msPerChar ?? CHAR_INTERVAL_MS$1,
            onTick: (value) => setTyped({ index, value }),
            onDone: () => after(SENT_SETTLE_MS, next)
          });
        });
        break;
      }
      case "think": {
        let holdMs = THINKING_SINGLE_MS;
        if (beat.labels.length === 2) {
          after(THINKING_STAGE_1_MS$1, () => setThinkStage({ index, stage: 1 }));
          holdMs = THINKING_STAGE_1_MS$1 + THINKING_STAGE_2_MS$1;
        }
        after(holdMs, () => setExitingIndex(index));
        after(holdMs + THINKING_EXIT_MS$1, next);
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
    const at = (id) => {
      const i = beats2.findIndex((b) => b.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current = beats2[index];
    const typedValue = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= at(id),
      passed: (id) => index > at(id),
      loading: (id) => index === at(id),
      status: (id) => {
        const beat = beats2[index];
        if (index !== at(id) || beat.type !== "think") return null;
        const stage2 = thinkStage.index === index ? thinkStage.stage : 0;
        return { label: beat.labels[stage2] ?? beat.labels[0], visible: exitingIndex !== index };
      },
      composer: (current == null ? void 0 : current.type) === "compose" && current.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats2.length,
      reducedMotion,
      runKey
    };
  }, [beats2, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}
const priyaNair = "/images/support/v3/assets/priya-nair-BCkMHgBr.svg";
const omar = "/images/support/v3/assets/omar-haddad-DhZ90vGZ.svg";
const shopper = "/images/support/v3/assets/sofia-marino-DQ9d7XfE.svg";
const emma = "/images/support/v3/assets/emma-lindqvist-BfFwzYUz.svg";
const kenji = "/images/support/v3/assets/kenji-watanabe-DWnXW3nN.svg";
const crosswordMark = "/images/support/v3/assets/org-mark-Alk5D-x9.svg";
const me = "/images/support/v3/assets/priya-raman-CMwZrsBD.svg";
const ICONS = {
  house: "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z",
  cube: "M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z",
  headset: "M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88.12,88.12,0,0,1,190.54,65.93,87.39,87.39,0,0,1,215.65,120H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h24a24,24,0,0,1-24,24H136a8,8,0,0,0,0,16h56a40,40,0,0,0,40-40V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm128,56a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24v56Z",
  chartBar: "M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z",
  search: "M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z",
  bell: "M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z",
  gear: "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z",
  sidebar: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z",
  layout: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z",
  chartLine: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z",
  users: "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z",
  pencil: "M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z",
  bookmarkFill: "M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z",
  dots: "M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z",
  chat: "M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z",
  caretRight: "M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z",
  rocket: "M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.940,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z",
  chatQuote: "M216,48H40A16,16,0,0,0,24,64V224a15.85,15.85,0,0,0,9.24,14.5A16.13,16.13,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L83,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Zm0,144H80a8,8,0,0,0-5.23,1.95L40,224V64H216Z",
  plus: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z",
  send: "M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"
};
function Ph({ name, className }) {
  return /* @__PURE__ */ jsx("svg", { className: ["la-icon", className].filter(Boolean).join(" "), viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: ICONS[name] }) });
}
function InsightsFrame({
  saved,
  recent,
  active,
  activeEnter = false,
  stageRef,
  runKey,
  className,
  bare = false,
  compact = false,
  railActive = "chartBar",
  children
}) {
  const dash = /* @__PURE__ */ jsxs("div", { className: compact ? "la-dash la-dash--compact" : "la-dash", children: [
    /* @__PURE__ */ jsxs("nav", { className: "la-rail", children: [
      /* @__PURE__ */ jsx("img", { className: "la-rail__logo la-rail__logo--mark", src: crosswordMark, alt: "" }),
      /* @__PURE__ */ jsx("div", { className: "la-rail__group", children: ["house", "cube", "headset", "chartBar"].map((n) => /* @__PURE__ */ jsx("span", { className: n === railActive ? "la-rail__item la-rail__item--active" : "la-rail__item", children: /* @__PURE__ */ jsx(Ph, { name: n }) }, n)) }),
      /* @__PURE__ */ jsxs("div", { className: "la-rail__group la-rail__group--end", children: [
        ["search", "bell", "gear"].map((n) => /* @__PURE__ */ jsx("span", { className: "la-rail__item", children: /* @__PURE__ */ jsx(Ph, { name: n }) }, n)),
        /* @__PURE__ */ jsx("span", { className: "la-rail__rule" }),
        /* @__PURE__ */ jsx("span", { className: "la-rail__item", children: /* @__PURE__ */ jsx("span", { className: "la-rail__me", "aria-hidden": true, children: "A" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "la-main", children: [
      !compact && /* @__PURE__ */ jsxs("section", { className: "la-list", children: [
        /* @__PURE__ */ jsxs("div", { className: "la-list__head", children: [
          /* @__PURE__ */ jsx("h2", { className: "la-serif la-serif--24", children: "Insights" }),
          /* @__PURE__ */ jsx(Ph, { name: "sidebar", className: "la-muted" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "la-search", children: [
          /* @__PURE__ */ jsx(Ph, { name: "search" }),
          /* @__PURE__ */ jsx("span", { children: "Search chats..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "la-row la-row--new", children: [
          /* @__PURE__ */ jsx(Ph, { name: "pencil" }),
          "New chat"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "la-section--nav", children: "Saved" }),
        saved.map((text) => /* @__PURE__ */ jsxs("div", { className: "la-row", children: [
          /* @__PURE__ */ jsx(Ph, { name: "bookmarkFill", className: "la-primary" }),
          /* @__PURE__ */ jsx("span", { className: "la-row__text", children: text }),
          /* @__PURE__ */ jsx(Ph, { name: "dots" })
        ] }, text)),
        /* @__PURE__ */ jsx("div", { className: "la-section--nav", children: "Recent" }),
        active && /* @__PURE__ */ jsxs("div", { className: `la-row la-row--active${activeEnter ? " la-row--enter" : ""}`, children: [
          /* @__PURE__ */ jsx(Ph, { name: "chat", className: "la-muted" }),
          /* @__PURE__ */ jsx("span", { className: "la-row__text", children: active }),
          /* @__PURE__ */ jsx("span", { className: "la-row__age", children: "now" })
        ] }),
        recent.map((r) => /* @__PURE__ */ jsxs("div", { className: "la-row", children: [
          /* @__PURE__ */ jsx(Ph, { name: "chat", className: "la-muted" }),
          /* @__PURE__ */ jsx("span", { className: "la-row__text", children: r.text }),
          /* @__PURE__ */ jsx("span", { className: "la-row__age", children: r.age })
        ] }, r.text))
      ] }),
      children
    ] })
  ] }, runKey);
  return /* @__PURE__ */ jsx("div", { className: ["la-stage", className].filter(Boolean).join(" "), ref: stageRef, children: bare ? dash : /* @__PURE__ */ jsx(LandscapeCanvas, { backdrop: "green", bleed: true, scene: dash }) });
}
const insightsBackground = "/images/support/v3/assets/insights-background-XsNT8ufi.webp";
function InsightFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-insight-frame-scale", children: /* @__PURE__ */ jsxs("div", { className: "ill-insight-frame", children: [
    /* @__PURE__ */ jsx("img", { className: "ill-insight-frame__background", src: insightsBackground, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "ill-insight-frame__content", children })
  ] }) });
}
const script = {
  query: "Find people who reached checkout but didn't purchase in the last 7 days.",
  result: "3,284 people reached checkout. 2,140 are still deciding. Most dropped after seeing shipping costs."
};
const askDashboard = {
  greeting: "Good evening, Priya",
  headline: "What do you want to know about your visitors?",
  query: script.query,
  reply: script.result,
  thought: "Thought for 4s",
  suggestions: [
    { icon: "users", text: "Who's most likely to buy this week" },
    { icon: "cart", text: "Who keeps reaching cart but doesn't buy" },
    { icon: "rocket", text: "Who should hear first about a launch" }
  ],
  steps: [
    { live: "Thinking…", done: "Thinking done", chips: [] },
    {
      live: "Scanning checkout sessions…",
      done: "Searching done",
      chips: [script.query, "Last 7 days", "No purchase"]
    },
    {
      live: "Reading where they dropped off…",
      done: "People found",
      chips: ["3,284 people", "2,140 still deciding", "1,144 gone quiet"]
    }
  ],
  card: {
    title: "Checkout abandoners · last 7 days",
    count: "3,284",
    unit: "people",
    tags: ["Reached checkout", "No purchase", "2,140 still deciding"],
    label: "Where they dropped off",
    buckets: [
      { label: "Shipping costs", deciding: 1210, gone: 486 },
      { label: "Payment step", deciding: 420, gone: 262 },
      { label: "Account sign-in", deciding: 260, gone: 178 },
      { label: "Discount code", deciding: 150, gone: 128 },
      { label: "Other", deciding: 100, gone: 90 }
    ],
    legend: { deciding: "Still deciding", gone: "Gone quiet" },
    stats: [
      { icon: "cart", label: "Avg. cart", value: "$186" },
      { icon: "clock", label: "Median time at checkout", value: "2.6 min" },
      { icon: "repeat", label: "Returned 3+ times", value: "412" }
    ]
  },
  saved: [
    "Find visitors who keep reaching cart or checkout but don't buy.",
    "Create a segment of visitors who reach checkout on Subscribe & Save but never buy."
  ],
  recent: [
    { text: "Who's most likely to buy this week?", age: "1d" },
    { text: "Who should hear first about our new arrivals?", age: "3d" }
  ]
};
function beatsFor(sc) {
  return [
    { id: "ask", type: "compose", text: sc.query, leadMs: 1100 },
    { id: "step0", type: "appear", ms: 800 },
    { id: "step1", type: "appear", ms: 1300 },
    { id: "step2", type: "appear", ms: 1300 },
    { id: "fold", type: "pause", ms: 500 },
    { id: "reply", type: "text", text: sc.reply },
    { id: "card", type: "load", ms: 900 },
    { id: "bars", type: "appear", ms: 900 },
    ...sc.action ? [{ id: "action", type: "text", text: sc.action.text }, { id: "cta", type: "appear", ms: 400 }] : []
  ];
}
const EXTRA = {
  money: "M128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM240,56H16a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H240a8,8,0,0,0,8-8V64A8,8,0,0,0,240,56ZM193.65,184H62.35A56.78,56.78,0,0,0,24,145.65v-35.3A56.78,56.78,0,0,0,62.35,72h131.3A56.78,56.78,0,0,0,232,110.35v35.3A56.78,56.78,0,0,0,193.65,184ZM232,93.37A40.81,40.81,0,0,1,210.63,72H232ZM45.37,72A40.81,40.81,0,0,1,24,93.37V72ZM24,162.63A40.81,40.81,0,0,1,45.37,184H24ZM210.63,184A40.81,40.81,0,0,1,232,162.63V184Z",
  footprints: "M216.06,192v12A36,36,0,0,1,144,204V192a8,8,0,0,1,8-8h56A8,8,0,0,1,216.06,192ZM104,160h-56a8,8,0,0,0-8,8v12a36,36,0,0,0,72,0V168A8,8,0,0,0,104,160ZM76,16C64.36,16,53.07,26.31,44.2,45c-13.93,29.38-18.56,73,.29,96a8,8,0,0,0,6.2,2.93h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C98.85,26.31,87.57,16,76,16Zm135.8,53C202.93,50.31,191.64,40,180,40s-22.89,10.31-31.77,29c-13.93,29.38-18.56,73,.29,96a8,8,0,0,0,6.2,2.93h50.55a8,8,0,0,0,6.2-2.93C230.36,142,225.73,98.38,211.8,69Z",
  check: "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
  cart: "M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z",
  clock: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z",
  repeat: "M24,128A72.08,72.08,0,0,1,96,56H204.69L194.34,45.66a8,8,0,0,1,11.32-11.32l24,24a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L204.69,72H96a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0Zm200-8a8,8,0,0,0-8,8,56.06,56.06,0,0,1-56,56H51.31l10.35-10.34a8,8,0,0,0-11.32-11.32l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L51.31,200H160a72.08,72.08,0,0,0,72-72A8,8,0,0,0,224,120Z",
  funnel: "M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z",
  envelope: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z",
  bookmark: "M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"
};
function Glyph({ name, className }) {
  if (name in EXTRA) {
    return /* @__PURE__ */ jsx("svg", { className: ["la-icon", className].filter(Boolean).join(" "), viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: EXTRA[name] }) });
  }
  return /* @__PURE__ */ jsx(Ph, { name, className });
}
function Composer$1({ v, className }) {
  return /* @__PURE__ */ jsxs("div", { className: ["aid-composer", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("div", { className: "aid-composer__text", children: v.composer ? /* @__PURE__ */ jsxs(Fragment, { children: [
      v.composer,
      v.typing && /* @__PURE__ */ jsx("span", { className: "la-caret" })
    ] }) : /* @__PURE__ */ jsx("span", { className: "la-composer__placeholder", children: "Ask about your visitors..." }) }),
    /* @__PURE__ */ jsxs("div", { className: "aid-composer__foot", children: [
      /* @__PURE__ */ jsx(Ph, { name: "plus", className: "la-muted" }),
      /* @__PURE__ */ jsxs("span", { className: "aid-modes", children: [
        /* @__PURE__ */ jsxs("span", { className: "aid-mode aid-mode--on", children: [
          /* @__PURE__ */ jsx(Ph, { name: "chat" }),
          "Ask"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "aid-mode", children: [
          /* @__PURE__ */ jsx(Glyph, { name: "funnel" }),
          "Find a segment"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "aid-mode", children: [
          /* @__PURE__ */ jsx(Glyph, { name: "envelope" }),
          "Draft an email"
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: `la-send aid-send${v.composer ? " la-send--ready" : ""}`, children: /* @__PURE__ */ jsx(Ph, { name: "send" }) })
    ] })
  ] });
}
function Steps({ v, steps }) {
  return /* @__PURE__ */ jsx("div", { className: "aid-steps", children: steps.map((step, i) => {
    const state = v.steps[i];
    if (state === "off") return null;
    return /* @__PURE__ */ jsxs("div", { className: `aid-step${v.animate ? " la-enter" : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "aid-step__line", children: [
        state === "done" ? /* @__PURE__ */ jsx(Glyph, { name: "check", className: "la-primary" }) : /* @__PURE__ */ jsx("span", { className: "aid-spinner" }),
        state === "done" ? /* @__PURE__ */ jsx("span", { className: "la-fade", children: step.done }) : /* @__PURE__ */ jsx("span", { className: "la-thinking la-thinking--live", children: step.live })
      ] }),
      state === "done" && step.chips.length > 0 && /* @__PURE__ */ jsx("div", { className: "aid-chips", children: step.chips.map((c, ci) => /* @__PURE__ */ jsxs("span", { className: "aid-chip", style: { "--i": ci }, children: [
        /* @__PURE__ */ jsx(Glyph, { name: "search" }),
        c
      ] }, c)) })
    ] }, step.done);
  }) });
}
const MAX = Math.max(...askDashboard.card.buckets.map((b) => b.deciding + b.gone));
function CartCard({ v }) {
  const c = askDashboard.card;
  return /* @__PURE__ */ jsxs("div", { className: ["la-card", "aid-card", v.animate && "la-enter", !v.bars && "aid-card--pending"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs("header", { className: "la-card__head", children: [
      /* @__PURE__ */ jsx(Glyph, { name: "cart", className: "la-muted" }),
      /* @__PURE__ */ jsx("span", { className: "la-card__title", children: c.title }),
      /* @__PURE__ */ jsxs("span", { className: "aid-save", children: [
        /* @__PURE__ */ jsx(Glyph, { name: "bookmark" }),
        "Save insight"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "aid-hero", children: [
      /* @__PURE__ */ jsx("span", { className: "la-faces", children: [priyaNair, omar, shopper].map((src) => /* @__PURE__ */ jsx("img", { src, alt: "" }, src)) }),
      /* @__PURE__ */ jsx("span", { className: "aid-count", children: c.count }),
      /* @__PURE__ */ jsx("span", { className: "aid-unit", children: c.unit }),
      /* @__PURE__ */ jsx("span", { className: "aid-tags", children: c.tags.map((t) => /* @__PURE__ */ jsx("span", { className: "la-tag", children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "aid-chart", children: [
      /* @__PURE__ */ jsx("p", { className: "la-card__label", children: c.label }),
      c.buckets.map((b, i) => /* @__PURE__ */ jsxs("div", { className: "aid-bar", style: { "--i": i }, children: [
        /* @__PURE__ */ jsx("span", { className: "aid-bar__label", children: b.label }),
        /* @__PURE__ */ jsxs("span", { className: "aid-bar__track", children: [
          /* @__PURE__ */ jsx("span", { className: "aid-bar__fill aid-bar__fill--deciding", style: { width: `${b.deciding / MAX * 100}%` } }),
          /* @__PURE__ */ jsx("span", { className: "aid-bar__fill aid-bar__fill--gone", style: { width: `${b.gone / MAX * 100}%` } })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "aid-bar__value", children: (b.deciding + b.gone).toLocaleString("en-US") })
      ] }, b.label)),
      /* @__PURE__ */ jsxs("div", { className: "aid-legend", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { className: "aid-key aid-key--deciding" }),
          c.legend.deciding
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { className: "aid-key aid-key--gone" }),
          c.legend.gone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "aid-stats", children: c.stats.map((st) => /* @__PURE__ */ jsxs("div", { className: "aid-stat", children: [
      /* @__PURE__ */ jsxs("span", { className: "aid-stat__label", children: [
        /* @__PURE__ */ jsx(Glyph, { name: st.icon }),
        st.label
      ] }),
      /* @__PURE__ */ jsx("span", { className: "aid-stat__value", children: st.value })
    ] }, st.label)) }),
    v.animate && /* @__PURE__ */ jsxs("div", { className: `la-skeleton${v.cardLoading ? "" : " la-skeleton--hidden"}`, "aria-hidden": true, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 220, height: 14 } }),
      /* @__PURE__ */ jsx("span", { style: { width: 380, height: 32 } }),
      [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx("span", { style: { width: `${86 - i * 14}%`, height: 14 } }, i)),
      /* @__PURE__ */ jsx("span", { style: { width: "100%", height: 44 } })
    ] })
  ] });
}
function useFollowLatest$1(animate, mounted, settled, runKey) {
  const threadRef = useRef(null);
  const contentRef = useRef(null);
  useLayoutEffect(() => {
    const thread = threadRef.current;
    const content = contentRef.current;
    if (!thread || !content) return;
    const follow = () => thread.scrollTo({ top: thread.scrollHeight, behavior: animate ? "smooth" : "instant" });
    follow();
    const observer = new ResizeObserver(follow);
    observer.observe(content);
    return () => observer.disconnect();
  }, [animate, mounted, runKey]);
  useEffect(() => {
    var _a, _b;
    const thread = threadRef.current;
    if (!settled || !thread) return;
    const toEnd = () => thread.scrollTo({ top: thread.scrollHeight, behavior: animate ? "smooth" : "instant" });
    const pin = () => {
      thread.scrollTop = thread.scrollHeight;
    };
    const id = window.setTimeout(toEnd, animate ? 1200 : 0);
    const pinId = window.setTimeout(pin, animate ? 2e3 : 0);
    (_b = (_a = document.fonts) == null ? void 0 : _a.ready) == null ? void 0 : _b.then(animate ? toEnd : pin);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(pinId);
    };
  }, [settled, animate, runKey]);
  return { threadRef, contentRef };
}
function Dashboard$3({ sc, v, stageRef, runKey }) {
  const { threadRef, contentRef } = useFollowLatest$1(v.animate, v.sent, v.done, runKey);
  const Frame = sc.frame === "scene" ? SceneFrame : InsightFrame;
  return /* @__PURE__ */ jsx(Frame, { children: /* @__PURE__ */ jsx("div", { className: ["aid-viewport", sc.frame === "scene" && "aid-viewport--scene", sc.inset && "aid-viewport--inset"].filter(Boolean).join(" "), children: /* @__PURE__ */ jsx(
    InsightsFrame,
    {
      bare: true,
      compact: true,
      saved: askDashboard.saved,
      recent: askDashboard.recent,
      active: v.sent ? sc.query : void 0,
      activeEnter: v.animate,
      stageRef,
      runKey,
      children: /* @__PURE__ */ jsxs("section", { className: "la-chat aid-chat", children: [
        /* @__PURE__ */ jsxs("header", { className: "aid-chat__head", children: [
          /* @__PURE__ */ jsx("span", { className: "la-serif aid-chat__title", children: "Insights" }),
          v.sent && /* @__PURE__ */ jsx("span", { className: `aid-chat__crumb${v.animate ? " la-fade" : ""}`, children: sc.query })
        ] }),
        !v.sent ? /* @__PURE__ */ jsxs("div", { className: "aid-home", children: [
          /* @__PURE__ */ jsx("p", { className: "aid-home__greeting", children: askDashboard.greeting }),
          /* @__PURE__ */ jsx("h1", { className: "aid-home__headline la-serif", children: askDashboard.headline }),
          /* @__PURE__ */ jsx(Composer$1, { v, className: "aid-composer--home" }),
          /* @__PURE__ */ jsx("p", { className: "la-section--nav aid-home__suggested", children: "Suggested" }),
          /* @__PURE__ */ jsx("div", { className: "aid-suggestions", children: askDashboard.suggestions.map((g) => /* @__PURE__ */ jsxs("span", { className: "aid-suggestion", children: [
            /* @__PURE__ */ jsx(Glyph, { name: g.icon }),
            g.text
          ] }, g.text)) })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "la-thread", ref: threadRef, children: /* @__PURE__ */ jsxs("div", { className: "la-thread__content", ref: contentRef, children: [
            /* @__PURE__ */ jsx("div", { className: `la-user${v.animate ? " la-enter" : ""}`, children: /* @__PURE__ */ jsx("p", { children: sc.query }) }),
            v.folded ? /* @__PURE__ */ jsx("div", { className: "la-thought", children: /* @__PURE__ */ jsxs("span", { className: `la-thought__done${v.animate ? " la-fade" : ""}`, children: [
              askDashboard.thought,
              /* @__PURE__ */ jsx(Ph, { name: "caretRight" })
            ] }) }) : /* @__PURE__ */ jsx(Steps, { v, steps: sc.steps }),
            v.reply && /* @__PURE__ */ jsx("p", { className: "la-reply", children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: sc.reply }) : sc.reply }),
            v.card && sc.card(v),
            sc.action && v.action && /* @__PURE__ */ jsxs("div", { className: "aid-action", children: [
              /* @__PURE__ */ jsx("p", { children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: sc.action.text }) : sc.action.text }),
              v.cta && /* @__PURE__ */ jsx("span", { className: `aid-cta${v.animate ? " la-enter" : ""}`, children: sc.action.cta })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Composer$1, { v: { ...v, composer: "", typing: false }, className: ["aid-composer--slim", v.animate && "la-fade"].filter(Boolean).join(" ") })
        ] })
      ] })
    }
  ) }) });
}
function motionOf(sc) {
  const beats2 = beatsFor(sc);
  const last = beats2[beats2.length - 1].id;
  const has = new Set(beats2.map((b) => b.id));
  return function InsightsDashboardMotion() {
    var _a;
    const stageRef = useRef(null);
    const t = useChatTimeline(beats2, useLandedOnScreen(stageRef));
    const step = (id) => t.passed(id) ? "done" : t.reached(id) ? "live" : "off";
    const v = {
      sent: t.passed("ask"),
      composer: ((_a = t.composer) == null ? void 0 : _a.value) ?? "",
      typing: !!t.composer,
      steps: [step("step0"), step("step1"), step("step2")],
      folded: t.passed("fold"),
      reply: t.reached("reply"),
      card: t.reached("card"),
      cardLoading: t.loading("card"),
      bars: t.reached("bars"),
      action: has.has("action") && t.reached("action"),
      cta: has.has("cta") && t.reached("cta"),
      done: t.passed(last),
      animate: !t.reducedMotion
    };
    return /* @__PURE__ */ jsx(Dashboard$3, { sc, v, stageRef, runKey: t.runKey });
  };
}
const askScenario = {
  inset: true,
  query: askDashboard.query,
  steps: askDashboard.steps,
  reply: askDashboard.reply,
  card: (v) => /* @__PURE__ */ jsx(CartCard, { v })
};
motionOf(askScenario);
const initials = (name) => name.split(" ").map((w) => w[0]).join("");
function InboxCard({ v }) {
  return /* @__PURE__ */ jsxs("div", { className: ["la-card", "aid-card", v.animate && "la-enter", !v.bars && "aid-card--pending"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs("header", { className: "la-card__head", children: [
      /* @__PURE__ */ jsx(Glyph, { name: "chat", className: "la-muted" }),
      /* @__PURE__ */ jsxs("span", { className: "la-card__title", children: [
        merchantHelpdesk.inboxLabel,
        " · ",
        merchantHelpdesk.allConversationsLabel
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hi-stats", children: merchantHelpdesk.overview.map((o, i) => /* @__PURE__ */ jsxs("div", { className: `hi-stat hi-stat--${o.label.toLowerCase()} aid-reveal`, style: { "--i": i }, children: [
      /* @__PURE__ */ jsx("span", { className: "hi-stat__value", children: o.value }),
      /* @__PURE__ */ jsx("span", { className: "hi-stat__label", children: o.label })
    ] }, o.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "hi-attention", children: [
      /* @__PURE__ */ jsxs("p", { className: "la-card__label", children: [
        merchantHelpdesk.attentionLabel,
        " · ",
        merchantHelpdesk.conversations.length
      ] }),
      merchantHelpdesk.conversations.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "hi-row aid-reveal", style: { "--i": i + 3 }, children: [
        /* @__PURE__ */ jsx("span", { className: `hi-row__avatar hi-row__avatar--${c.status.toLowerCase()}`, children: initials(c.name) }),
        /* @__PURE__ */ jsxs("span", { className: "hi-row__text", children: [
          /* @__PURE__ */ jsx("span", { className: "hi-row__name", children: c.name }),
          /* @__PURE__ */ jsxs("span", { className: "hi-row__issue", children: [
            c.issue,
            " · ",
            /* @__PURE__ */ jsx("span", { className: `hi-status--${c.status.toLowerCase()}`, children: c.status })
          ] })
        ] }),
        c.action ? /* @__PURE__ */ jsx("span", { className: "hi-assign", children: c.action }) : /* @__PURE__ */ jsx(Ph, { name: "caretRight", className: "hi-go" })
      ] }, c.name))
    ] }),
    v.animate && /* @__PURE__ */ jsxs("div", { className: `la-skeleton${v.cardLoading ? "" : " la-skeleton--hidden"}`, "aria-hidden": true, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 200, height: 14 } }),
      /* @__PURE__ */ jsx("span", { style: { width: "100%", height: 64 } }),
      /* @__PURE__ */ jsx("span", { style: { width: 140, height: 12 } }),
      /* @__PURE__ */ jsx("span", { style: { width: "100%", height: 48 } }),
      /* @__PURE__ */ jsx("span", { style: { width: "100%", height: 48 } })
    ] })
  ] });
}
const helpdesk = {
  query: merchantHelpdesk.userMessage,
  steps: [
    { live: "Thinking…", done: "Thinking done", chips: [] },
    { live: "Reading the team inbox…", done: "Searching done", chips: [merchantHelpdesk.allConversationsLabel, "Today"] },
    { live: "Sorting what needs attention…", done: "Inbox ready", chips: merchantHelpdesk.overview.map((o) => `${o.value} ${o.label.toLowerCase()}`) }
  ],
  reply: merchantHelpdesk.assistantMessage,
  card: (v) => /* @__PURE__ */ jsx(InboxCard, { v }),
  frame: "scene"
};
const HelpdeskInsightsDashboardMotion = motionOf(helpdesk);
function HelpdeskHeader({ brand: brand2, tone = "default" }) {
  const gold = tone === "gold";
  const registered = Object.values(registry).some((entry) => entry.name.toLowerCase() === brand2.toLowerCase());
  return /* @__PURE__ */ jsxs("header", { className: "ill-chat-header", children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
      /* @__PURE__ */ jsx(IconButton, { icon: gold ? "historyGold" : "history", label: "History", variant: "outline" }),
      /* @__PURE__ */ jsx(IconButton, { icon: gold ? "addGold" : "add", label: "New conversation", variant: "outline" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ill-helpdesk-header__center", children: [
      /* @__PURE__ */ jsx("span", { className: "ill-helpdesk-header__brand", children: registered ? /* @__PURE__ */ jsx(BrandWordmark, { brand: brand2 }) : brand2 }),
      /* @__PURE__ */ jsx("span", { className: "ill-helpdesk-header__badge", children: /* @__PURE__ */ jsx("span", { className: "ill-helpdesk-header__badge-text", children: "Helpdesk" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ill-chat-header__group", children: [
      /* @__PURE__ */ jsx(IconButton, { icon: gold ? "expandGold" : "expand", label: "Expand", variant: "outline" }),
      /* @__PURE__ */ jsx(IconButton, { icon: gold ? "closeGold" : "close", label: "Close", variant: "outline" })
    ] })
  ] });
}
const cardBorder = "/images/support/v3/assets/card-border-D3kGqW05.webp";
const cornerDot = "/images/support/v3/assets/corner-dot-DlCU4kn-.svg";
function InsightCardFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-insight-frame-scale", children: /* @__PURE__ */ jsxs("div", { className: "ill-insight-card", children: [
    /* @__PURE__ */ jsx("img", { className: "ill-insight-card__border", src: cardBorder, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "ill-insight-card__hue", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "ill-insight-card__dots", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-insight-card__dots-row", children: [
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 }),
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-insight-card__dots-row", children: [
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 }),
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ill-insight-card__content", children })
  ] }) });
}
const LINE_STAGGER_MS = 80;
function LineStagger({ text, play }) {
  const rootRef = useRef(null);
  const measuredWidth = useRef(null);
  const [lines, setLines] = useState(null);
  const words = text.split(/\s+/).filter(Boolean);
  useEffect(() => setLines(null), [text]);
  useEffect(() => {
    var _a;
    let live = true;
    (_a = document.fonts) == null ? void 0 : _a.ready.then(() => live && setLines(null));
    return () => {
      live = false;
    };
  }, []);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (lines || !root) return;
    const grouped = [];
    let top = null;
    root.querySelectorAll("[data-word]").forEach((w) => {
      var _a;
      if (w.offsetTop !== top) {
        grouped.push([]);
        top = w.offsetTop;
      }
      grouped[grouped.length - 1].push(((_a = w.textContent) == null ? void 0 : _a.trim()) ?? "");
    });
    measuredWidth.current = root.clientWidth;
    setLines(grouped.map((g) => g.join(" ")));
  }, [lines]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => {
      if (measuredWidth.current !== null && root.clientWidth !== measuredWidth.current) setLines(null);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("span", { ref: rootRef, className: `ill-line-stagger${play ? " ill-line-stagger--play" : ""}`, children: lines ? lines.map((line, i) => /* @__PURE__ */ jsx("span", { className: "ill-line-stagger__line", style: { animationDelay: `${i * LINE_STAGGER_MS}ms` }, children: line }, i)) : words.map((w, i) => /* @__PURE__ */ jsxs("span", { "data-word": true, className: "ill-line-stagger__word", children: [
    w,
    i < words.length - 1 ? " " : ""
  ] }, i)) });
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
const CUSTOMER$3 = "Sofia Marino";
const DRAFT = "Hi Sofia, your refund for #4821 is approved and on its way. We’ll email you the moment it reaches your bank.";
const P$1 = {
  sparkle: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144Z",
  info: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z",
  check: "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z",
  caretDown: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z",
  person: "M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z",
  arrowUp: "M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z",
  list: "M224,128a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM104,72H216a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16ZM216,184H104a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM64,52H48a8,8,0,0,0,0,16H64a8,8,0,0,0,0-16Zm0,64H48a8,8,0,0,0,0,16H64a8,8,0,0,0,0-16Zm0,64H48a8,8,0,0,0,0,16H64a8,8,0,0,0,0-16Z"
};
function I$1({ d, className }) {
  return /* @__PURE__ */ jsx("svg", { className: ["dk-icon", className].filter(Boolean).join(" "), viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: P$1[d] }) });
}
const SUMMARY_MS = 2050;
const beats$4 = [
  { id: "rest", type: "pause", ms: 1200 },
  { id: "toSummary", type: "pause", ms: CAMERA_LEAD_MS },
  // The Summary lands line by line (LineStagger), then holds for reading.
  { id: "summary", type: "appear", ms: SUMMARY_MS },
  { id: "ask", type: "compose", text: merchantInsight.followUpMessage, leadMs: CAMERA_LEAD_MS, msPerChar: 42 },
  { id: "toNote", type: "pause", ms: CAMERA_LEAD_MS },
  { id: "note", type: "text", text: merchantInsight.resolution },
  { id: "draft", type: "appear", ms: 900 },
  { id: "press", type: "appear", ms: 300 },
  { id: "reply", type: "compose", text: DRAFT, leadMs: CAMERA_LEAD_MS, msPerChar: 22 },
  { id: "read", type: "pause", ms: 2600 }
];
const CAMERA = {
  w: 687,
  h: 586,
  focus: {
    wide: null,
    summary: { sel: [".dk-summary"] },
    composer: { sel: [".dk-composer"], above: 90 },
    note: { sel: [".dk-note"] }
  }
};
function Desk({ v }) {
  const enter = v.animate ? " ib-enter" : "";
  const instruct = v.mode === "instruct";
  return /* @__PURE__ */ jsxs("div", { className: "dk", children: [
    /* @__PURE__ */ jsxs("nav", { className: "dk-rail", children: [
      /* @__PURE__ */ jsx("img", { className: "dk-rail__logo", src: crosswordMark, alt: "" }),
      ["house", "cube", "headset", "chartBar"].map((n) => /* @__PURE__ */ jsx("span", { className: n === "headset" ? "dk-rail__item dk-rail__item--on" : "dk-rail__item", children: /* @__PURE__ */ jsx(Ph, { name: n }) }, n)),
      /* @__PURE__ */ jsx("span", { className: "dk-rail__item dk-rail__item--end", children: /* @__PURE__ */ jsx(Ph, { name: "gear" }) }),
      /* @__PURE__ */ jsx("span", { className: "dk-rail__me", "aria-hidden": true, children: "A" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dk-main", children: [
      /* @__PURE__ */ jsxs("header", { className: "dk-head", children: [
        /* @__PURE__ */ jsx("span", { className: "dk-head__name", children: CUSTOMER$3 }),
        /* @__PURE__ */ jsxs("span", { className: "dk-head__actions", children: [
          /* @__PURE__ */ jsx("span", { className: "dk-iconbtn", children: /* @__PURE__ */ jsx(I$1, { d: "check" }) }),
          /* @__PURE__ */ jsxs("span", { className: "dk-takeover", children: [
            /* @__PURE__ */ jsx(Ph, { name: "headset" }),
            " Take over"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "dk-banner", children: [
        /* @__PURE__ */ jsx(I$1, { d: "info" }),
        " Refund for order #4821"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dk-thread", children: [
        /* @__PURE__ */ jsxs("div", { className: "dk-msg dk-msg--customer", children: [
          /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: shopper, alt: "" }),
          /* @__PURE__ */ jsxs("div", { className: "dk-bubble", children: [
            /* @__PURE__ */ jsx("p", { children: "My refund for order #4821 still hasn’t come through." }),
            /* @__PURE__ */ jsx("span", { className: "dk-meta", children: "Web · 5:12 pm" })
          ] })
        ] }),
        v.note && /* @__PURE__ */ jsxs("div", { className: `dk-note${enter}`, children: [
          /* @__PURE__ */ jsxs("p", { className: "dk-note__head", children: [
            /* @__PURE__ */ jsx(I$1, { d: "sparkle" }),
            " AI · only you can see this"
          ] }),
          v.asked && /* @__PURE__ */ jsx("p", { className: "dk-note__ask", children: merchantInsight.followUpMessage }),
          v.answer && /* @__PURE__ */ jsx("p", { className: "dk-note__text", children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: merchantInsight.resolution }) : merchantInsight.resolution }),
          v.draft && /* @__PURE__ */ jsxs("span", { className: `dk-draft${enter}${v.pressed ? " ib-draft--pressed" : ""}`, children: [
            /* @__PURE__ */ jsx(Ph, { name: "pencil" }),
            " Draft the reply"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `dk-composer${instruct ? "" : " dk-composer--reply"}`, children: [
        /* @__PURE__ */ jsx("p", { className: "dk-composer__top", children: instruct ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(I$1, { d: "sparkle" }),
          " AI is replying"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(I$1, { d: "person" }),
          " You’re replying"
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: `dk-composer__text${v.text ? " dk-composer__text--filled" : ""}`, children: [
          v.text || (instruct ? "Tell the AI what to do in this chat…" : `Reply to ${CUSTOMER$3.split(" ")[0]}…`),
          v.typing && /* @__PURE__ */ jsx("span", { className: "ib-caret" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "dk-composer__foot", children: [
          /* @__PURE__ */ jsxs("span", { className: "dk-mode", children: [
            instruct ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(I$1, { d: "sparkle" }),
              " Instruct the AI"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Ph, { name: "send" }),
              " Public reply"
            ] }),
            /* @__PURE__ */ jsx(I$1, { d: "caretDown" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: `dk-send${v.text ? " dk-send--ready" : ""}`, children: [
            instruct ? "Add" : "Send",
            " ",
            /* @__PURE__ */ jsx(I$1, { d: "arrowUp" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "dk-details", children: [
      /* @__PURE__ */ jsxs("p", { className: "dk-details__head", children: [
        /* @__PURE__ */ jsx(I$1, { d: "list" }),
        " Details"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dk-section", children: [
        /* @__PURE__ */ jsxs("p", { className: "dk-section__title", children: [
          /* @__PURE__ */ jsx(I$1, { d: "person" }),
          " Contact"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "dk-contact", children: [
          /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: shopper, alt: "" }),
          CUSTOMER$3
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "dk-row", children: [
          /* @__PURE__ */ jsx("span", { children: "Channel" }),
          /* @__PURE__ */ jsx("span", { children: "Web" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dk-section dk-summary", children: [
        /* @__PURE__ */ jsxs("p", { className: "dk-section__title", children: [
          /* @__PURE__ */ jsx(I$1, { d: "sparkle" }),
          " Summary"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "dk-summary__box", children: [
          /* @__PURE__ */ jsx("span", { className: v.summary ? void 0 : "dk-summary__text--pending", children: v.animate ? /* @__PURE__ */ jsx(LineStagger, { text: merchantInsight.context, play: v.summary }) : merchantInsight.context }),
          /* @__PURE__ */ jsx("span", { className: `dk-summary__empty${v.summary ? " dk-summary__empty--out" : ""}`, "aria-hidden": v.summary, children: "Summarising this conversation…" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "dk-link", children: "Refresh summary" })
      ] })
    ] })
  ] });
}
function Stage({ v, camera, shot }) {
  return /* @__PURE__ */ jsx(InsightCardFrame, { children: /* @__PURE__ */ jsx("div", { className: "ib-stage", children: /* @__PURE__ */ jsx("div", { className: "ib-window", children: /* @__PURE__ */ jsx("div", { className: (camera == null ? void 0 : camera.className) ?? "ib-lens", ref: camera == null ? void 0 : camera.lensRef, style: camera == null ? void 0 : camera.style, onTransitionEnd: camera == null ? void 0 : camera.onTransitionEnd, "data-shot": shot, children: /* @__PURE__ */ jsx(Desk, { v }) }) }) }) });
}
function MerchantInsightDeskMotion() {
  var _a;
  const rootRef = useRef(null);
  const t = useChatTimeline(beats$4, useLandedOnScreen(rootRef));
  const replying = t.reached("press");
  const v = {
    summary: t.reached("summary"),
    text: ((_a = t.composer) == null ? void 0 : _a.value) ?? (t.passed("reply") ? DRAFT : ""),
    typing: !!t.composer,
    mode: replying ? "reply" : "instruct",
    asked: t.passed("ask"),
    note: t.passed("ask"),
    answer: t.reached("note"),
    draft: t.reached("draft"),
    pressed: replying,
    animate: !t.reducedMotion
  };
  const shot = t.reducedMotion || t.passed("read") || !t.reached("toSummary") ? "wide" : t.reached("press") ? "composer" : t.reached("toNote") ? "note" : t.reached("ask") ? "composer" : "summary";
  const camera = useFrameCamera(shot, !t.reducedMotion, t.runKey, CAMERA);
  return (
    // Full width: the frame sizes itself from its parent (container query).
    /* @__PURE__ */ jsx("div", { ref: rootRef, style: { width: "100%", maxWidth: 687 }, children: /* @__PURE__ */ jsx(Stage, { v, camera, shot }) })
  );
}
function cubicBezier(p1x, p1y, p2x, p2y) {
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
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
const COMPOSER_ENTER_MS = 200;
const CHAR_INTERVAL_MS = 14;
const SENDING_MS = 140;
const TURN_ENTER_MS = 60;
const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_EXIT_MS = 150;
const REPLY_FADE_MS = 180;
const REPLY_SETTLE_MS = 150;
const BETWEEN_TURNS_PAUSE_BASE_MS = 350;
const BETWEEN_TURNS_PAUSE_PER_CHAR_MS = 3;
const BETWEEN_TURNS_PAUSE_CAP_MS = 500;
const FINAL_HOLD_MS = 2e3;
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function pauseAfterReplyMs(text) {
  return BETWEEN_TURNS_PAUSE_BASE_MS + Math.min(text.length * BETWEEN_TURNS_PAUSE_PER_CHAR_MS, BETWEEN_TURNS_PAUSE_CAP_MS);
}
function useMerchantInsightPlayback(turns2, active) {
  const reducedMotion = useRef(prefersReducedMotion()).current;
  const [turnIndex, setTurnIndex] = useState(reducedMotion ? turns2.length : 0);
  const [phase, setPhase] = useState(reducedMotion ? "done" : "composerEnter");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [runKey, setRunKey] = useState(0);
  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setTurnIndex(0);
      setPhase("composerEnter");
      setComposerValue("");
      setComposerTyping(false);
      setStatusLabel("Thinking");
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);
  useEffect(() => {
    if (reducedMotion) return;
    if (!active) return;
    if (phase === "done") return;
    if (turnIndex >= turns2.length) return;
    const turn = turns2[turnIndex];
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    if (phase === "composerEnter") {
      if (turn.skipComposer) {
        setPhase("turnEnter");
        return void 0;
      }
      after(COMPOSER_ENTER_MS, () => setPhase("composing"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(turn.userMessage, {
        msPerStep: CHAR_INTERVAL_MS,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => setPhase("sending"));
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (phase === "sending") {
      after(SENDING_MS, () => {
        setComposerTyping(false);
        setComposerValue("");
        setPhase("turnEnter");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "turnEnter") {
      after(TURN_ENTER_MS, () => {
        setStatusLabel("Thinking");
        setPhase("thinking");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinking") {
      after(THINKING_STAGE_1_MS, () => setStatusLabel(turn.thinkingLabel));
      after(THINKING_STAGE_1_MS + THINKING_STAGE_2_MS, () => setPhase("thinkingExit"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS, () => setPhase("replying"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying") {
      after(REPLY_FADE_MS + REPLY_SETTLE_MS, () => setPhase("pausing"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "pausing") {
      const isLastTurn = turnIndex === turns2.length - 1;
      after(isLastTurn ? FINAL_HOLD_MS : pauseAfterReplyMs(turn.assistantMessage), () => {
        if (isLastTurn) {
          setPhase("done");
        } else {
          setTurnIndex((n) => n + 1);
          setPhase("composerEnter");
        }
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [turnIndex, phase, active, reducedMotion, turns2]);
  return {
    turnIndex,
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    reducedMotion,
    runKey
  };
}
const turns = [
  {
    userMessage: merchantInsight.userMessage,
    assistantMessage: merchantInsight.context,
    thinkingLabel: "Reading their history"
  },
  {
    userMessage: merchantInsight.followUpMessage,
    assistantMessage: merchantInsight.resolution,
    thinkingLabel: "Checking the refund",
    // Brief's 8d — the follow-up lands as a bubble directly; the
    // composer never reappears for it.
    skipComposer: true
  }
];
function MerchantInsightMotion() {
  const rootRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const { turnIndex, phase, composerValue, composerTyping, statusLabel, reducedMotion, runKey } = useMerchantInsightPlayback(turns, active);
  const showComposer = turnIndex === 0 && (phase === "composerEnter" || phase === "composing" || phase === "sending");
  const viewportRef = useRef(null);
  useEffect(() => {
    var _a;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = (_a = viewport.querySelector(".ill-thread")) == null ? void 0 : _a.lastElementChild;
    if (!target) return;
    const FADE_CLEARANCE2 = 40;
    const zoom = viewport.offsetHeight ? viewport.getBoundingClientRect().height / viewport.offsetHeight : 1;
    const unzoom = (r) => ({ top: r.top / zoom, bottom: r.bottom / zoom });
    const viewportRect = unzoom(viewport.getBoundingClientRect());
    const targetRect = unzoom(target.getBoundingClientRect());
    const isFullyVisible = targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE2 && targetRect.top >= viewportRect.top;
    if (isFullyVisible) return;
    const delta = targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE2;
    const targetTop = viewport.scrollTop + delta;
    if (reducedMotion) {
      viewport.scrollTop = targetTop;
    } else {
      animateScrollTo(viewport, targetTop);
    }
  }, [turnIndex, phase, reducedMotion]);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, className: "ill-insight-frame-scale", children: /* @__PURE__ */ jsxs("div", { className: "ill-insight-card", "data-phase": phase, "data-turn": turnIndex, children: [
    /* @__PURE__ */ jsx("img", { className: "ill-insight-card__border", src: cardBorder, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "ill-insight-card__hue", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "ill-insight-card__dots", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxs("div", { className: "ill-insight-card__dots-row", children: [
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 }),
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ill-insight-card__dots-row", children: [
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 }),
        /* @__PURE__ */ jsx("img", { src: cornerDot, alt: "", width: 10, height: 10 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ill-insight-card__content", children: /* @__PURE__ */ jsx(
      Shell,
      {
        brand: merchantInsight.brand,
        width: 550,
        height: 520,
        header: /* @__PURE__ */ jsx(HelpdeskHeader, { brand: merchantInsight.brand }),
        composerValue: showComposer ? composerValue : void 0,
        composerTyping: showComposer && composerTyping,
        viewportRef,
        className: "ill-theme-helpdesk",
        children: /* @__PURE__ */ jsx(Thread, { children: turns.map((turn, i) => {
          const isPast = i < turnIndex;
          const isCurrent = i === turnIndex;
          const isSent = isCurrent && phase !== "composerEnter" && phase !== "composing";
          if (!isPast && !isSent) return null;
          const showThinking = isCurrent && (phase === "thinking" || phase === "thinkingExit");
          const showReply = isPast || isCurrent && (phase === "replying" || phase === "pausing" || phase === "done");
          return /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx(
              UserTurn,
              {
                animateIn: isCurrent && isSent,
                className: i === 0 ? "ill-insight-first-turn" : void 0,
                children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: turn.userMessage })
              }
            ),
            /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: isCurrent && isSent, children: [
              showThinking && (i === 0 ? (
                // Only the first turn's AiStatus module gets the
                // negligible-bounce bloom override (see
                // MerchantInsightMotion.css) — turn 2's keeps
                // the shared, normal overshoot.
                /* @__PURE__ */ jsx("div", { className: "ill-insight-first-status", children: /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }) })
              ) : /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" })),
              showReply && /* @__PURE__ */ jsx("div", { className: isCurrent ? "ill-insight-reply-enter" : void 0, children: /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: turn.assistantMessage }) })
            ] })
          ] }, i);
        }) })
      }
    ) })
  ] }, runKey) });
}
function ExpandShell({ expanded, children }) {
  const ref = useRef(null);
  const [clip, setClip] = useState(null);
  useLayoutEffect(() => {
    var _a, _b;
    const shell = ref.current;
    const composer = shell == null ? void 0 : shell.querySelector(".ill-chat-composer");
    if (!shell || !composer) return;
    let cancelled = false;
    const measure2 = () => {
      if (cancelled) return;
      const s = shell.getBoundingClientRect();
      const c = composer.getBoundingClientRect();
      const zoom = shell.offsetWidth ? s.width / shell.offsetWidth : 1;
      setClip({
        top: (c.top - s.top) / zoom,
        right: (s.right - c.right) / zoom,
        bottom: (s.bottom - c.bottom) / zoom,
        left: (c.left - s.left) / zoom,
        radius: c.height / 2 / zoom
      });
    };
    measure2();
    (_b = (_a = document.fonts) == null ? void 0 : _a.ready) == null ? void 0 : _b.then(() => {
      measure2();
      requestAnimationFrame(measure2);
    });
    if (typeof ResizeObserver === "undefined") return () => {
      cancelled = true;
    };
    const observer = new ResizeObserver(measure2);
    observer.observe(shell);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);
  const className = ["sell-expand", expanded && "sell-expand--expanded", !clip && "sell-expand--unmeasured"].filter(Boolean).join(" ");
  const style = clip ? {
    "--sell-clip-top": `${clip.top}px`,
    "--sell-clip-right": `${clip.right}px`,
    "--sell-clip-bottom": `${clip.bottom}px`,
    "--sell-clip-left": `${clip.left}px`,
    "--sell-clip-radius": `${clip.radius}px`
  } : void 0;
  return /* @__PURE__ */ jsx("div", { ref, className, style, children });
}
const FADE_CLEARANCE = 40;
function ChatMotionScene({
  brand: brand2,
  beats: beats2,
  children,
  width,
  height,
  header,
  className,
  threadClassName,
  alignTallTurnTop = false,
  expandAfter,
  observeRef,
  growComposer = false
}) {
  const rootRef = useRef(null);
  const expandRef = useRef(null);
  const viewportRef = useRef(null);
  const active = useLandedOnScreen(observeRef ?? (expandAfter ? expandRef : rootRef));
  const timeline = useChatTimeline(beats2, active);
  const { index, runKey, reducedMotion, composer } = timeline;
  useEffect(() => {
    const viewport = viewportRef.current;
    const thread2 = viewport == null ? void 0 : viewport.querySelector(".ill-thread");
    if (!viewport || !thread2) return;
    let cancelScroll;
    const follow = () => {
      const target = thread2.lastElementChild;
      if (!target) {
        cancelScroll == null ? void 0 : cancelScroll();
        viewport.scrollTop = 0;
        return;
      }
      const zoom = viewport.offsetHeight ? viewport.getBoundingClientRect().height / viewport.offsetHeight : 1;
      const unzoom = (r) => ({ top: r.top / zoom, bottom: r.bottom / zoom, height: r.height / zoom });
      const viewportRect = unzoom(viewport.getBoundingClientRect());
      const targetRect = unzoom(target.getBoundingClientRect());
      const isFullyVisible = targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE && targetRect.top >= viewportRect.top;
      if (isFullyVisible) return;
      const available = viewportRect.height - FADE_CLEARANCE;
      const targetTop = alignTallTurnTop && targetRect.height > available ? viewport.scrollTop + targetRect.top - viewportRect.top : viewport.scrollTop + targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
      cancelScroll == null ? void 0 : cancelScroll();
      if (reducedMotion) {
        viewport.scrollTop = targetTop;
      } else {
        cancelScroll = animateScrollTo(viewport, targetTop);
      }
    };
    follow();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(follow);
    observer.observe(thread2);
    return () => {
      observer.disconnect();
      cancelScroll == null ? void 0 : cancelScroll();
    };
  }, [index, runKey, reducedMotion, alignTallTurnTop]);
  const thread = /* @__PURE__ */ jsx(Thread, { children: children(timeline) });
  const shell = /* @__PURE__ */ jsx(
    Shell,
    {
      brand: brand2,
      width,
      height,
      header,
      className: typeof className === "function" ? className(timeline) : className,
      rootRef,
      viewportRef,
      composerValue: composer && composer.value ? composer.value : void 0,
      composerTyping: (composer == null ? void 0 : composer.typing) ?? false,
      growComposer,
      children: threadClassName ? /* @__PURE__ */ jsx("div", { className: threadClassName, children: thread }) : thread
    }
  );
  if (!expandAfter) return shell;
  return /* @__PURE__ */ jsx("div", { ref: expandRef, children: /* @__PURE__ */ jsx("div", { className: "sell-widget-enter", children: /* @__PURE__ */ jsx(ExpandShell, { expanded: timeline.passed(expandAfter), children: shell }) }, runKey) });
}
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
    const Tag = piece.bold ? "strong" : "span";
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      piece.spaceBefore ? " " : "",
      /* @__PURE__ */ jsx(Tag, { className: "ill-stagger-text__word", style: { animationDelay: `${piece.wordIndex * 45}ms` }, children: piece.text })
    ] }, i);
  }) });
}
function Enter({ children, delayMs }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-assistant-turn--enter", style: delayMs ? { animationDelay: `${delayMs}ms` } : void 0, children });
}
function Thinking$1({ t, id }) {
  const status = t.status(id);
  return status ? /* @__PURE__ */ jsx(AiStatus, { label: status.label, visible: status.visible }) : null;
}
function AssistantText({ text }) {
  return /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(RichStagger, { text }) });
}
const frameBg = "/images/support/v3/assets/frame-bg-DlNDmdDr.webp";
const connector = "/images/support/v3/assets/guardrails-connector-mar6qdCu.svg";
const beats$3 = [
  { id: "panel", type: "appear", ms: 420 },
  { id: "line", type: "appear", ms: 320 },
  { id: "shell", type: "appear", ms: 280 },
  { id: "ask", type: "compose", text: guardrails.userMessage, leadMs: 400 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your guardrails"] },
  { id: "reply", type: "text", text: guardrails.assistantMessage },
  { id: "chip", type: "appear", ms: 500 }
];
const CHECKED_RULE = 0;
function stage(t, id, played) {
  return t.reached(id) ? played : "ill-guardrails-motion--pending";
}
function GuardrailsPanel({ t }) {
  const checking = t.reached("think") && !t.reached("chip");
  return /* @__PURE__ */ jsxs("div", { className: `ill-guardrails-panel ${stage(t, "panel", "ill-guardrails-motion--enter")}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-guardrails-panel__title", children: [
      /* @__PURE__ */ jsx(Icon, { name: "sparkle" }),
      /* @__PURE__ */ jsx("p", { children: guardrails.heading })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ill-guardrails-panel__rules", children: guardrails.rules.map((rule, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `ill-guardrails-rule${checking && i === CHECKED_RULE ? " ill-guardrails-rule--checking" : ""}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "ill-guardrails-rule__leading-icon", children: /* @__PURE__ */ jsx(Icon, { name: rule.icon }) }),
          /* @__PURE__ */ jsx("div", { className: "ill-guardrails-rule__text", children: /* @__PURE__ */ jsx("p", { className: "ill-guardrails-rule__title", children: rule.title }) }),
          /* @__PURE__ */ jsx("div", { className: "ill-guardrails-rule__icon", children: /* @__PURE__ */ jsx(Icon, { name: "caretRight" }) })
        ]
      },
      i
    )) })
  ] });
}
function FlowLayer({ t }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(GuardrailsPanel, { t }),
    /* @__PURE__ */ jsxs("div", { className: "ill-guardrails-connector-wrap", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: `ill-guardrails-frame__connector ${stage(t, "line", "ill-guardrails-motion--draw")}`,
          src: connector,
          alt: "",
          "aria-hidden": "true"
        }
      ),
      t.reached("think") && !t.passed("think") && /* @__PURE__ */ jsx("span", { className: "ill-guardrails-pulse", "aria-hidden": "true" })
    ] })
  ] });
}
function Conversation(t) {
  return t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: guardrails.userMessage }) }),
    /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: true, children: [
      /* @__PURE__ */ jsx(Thinking$1, { t, id: "think" }),
      t.reached("reply") && /* @__PURE__ */ jsxs("div", { className: "ill-guardrails-reply", children: [
        /* @__PURE__ */ jsx(AssistantText, { text: guardrails.assistantMessage }),
        t.reached("chip") && /* @__PURE__ */ jsx(Enter, { children: /* @__PURE__ */ jsx(Chip, { children: /* @__PURE__ */ jsxs("span", { className: "ill-guardrails-policy-chip", children: [
          guardrails.policyChip,
          /* @__PURE__ */ jsx(Icon, { name: "shieldCheck" })
        ] }) }) })
      ] })
    ] })
  ] });
}
// Site: Guardrails plays on a loop. Once its script has played out it holds this long, then replays from the top.
const GUARDRAILS_LOOP_HOLD_MS = 3000;
function LoopWhenDone({ t, onLoop }) {
  useEffect(() => {
    if (!t.done || t.reducedMotion) return;
    const id = window.setTimeout(onLoop, GUARDRAILS_LOOP_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [t.done, t.reducedMotion, onLoop]);
  return null;
}
function GuardrailsMotion({ mweb = false } = {}) {
  const [flowSlot, setFlowSlot] = useState(null);
  // Site: bumped to replay the scene (keys the row, so the panel, connector and chat all start again).
  const [loop, setLoop] = useState(0);
  const replay = useCallback(() => setLoop((n) => n + 1), []);
  return /* @__PURE__ */ jsx("div", { className: mweb ? "ill-guardrails-scale ill-guardrails--mweb" : "ill-guardrails-scale", children: /* @__PURE__ */ jsxs("div", { className: "ill-guardrails-frame", children: [
    /* @__PURE__ */ jsx("img", { className: "ill-guardrails-frame__bg", src: frameBg, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "ill-guardrails-row", children: [
      /* @__PURE__ */ jsx("div", { className: "ill-guardrails-panel-slot", ref: setFlowSlot }),
      /* @__PURE__ */ jsx("div", { className: "ill-guardrails-card-wrap", children: /* @__PURE__ */ jsx("div", { className: "ill-guardrails-shell-crop", children: /* @__PURE__ */ jsx("div", { className: "ill-guardrails-shell-inner", children: /* @__PURE__ */ jsx(
        ChatMotionScene,
        {
          brand,
          beats: beats$3,
          width: mweb ? 321 : 550,
          height: mweb ? 360 : 520,
          className: (t) => `ill-shell--standard ${stage(t, "shell", "ill-guardrails-motion--shell-enter")}`,
          children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
            flowSlot && createPortal(/* @__PURE__ */ jsx(FlowLayer, { t }), flowSlot),
            Conversation(t),
            /* @__PURE__ */ jsx(LoopWhenDone, { t, onLoop: replay })
          ] })
        },
        loop
      ) }) }) })
    ] })
  ] }) });
}
function GuardrailsMwebMotion() {
  return /* @__PURE__ */ jsx(GuardrailsMotion, { mweb: true });
}
const mwebBg = "/images/support/v3/assets/mweb-bg-green-C8jt4i4X.webp";
const ME = { name: "Priya Raman", face: me };
const P = {
  sparkle: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144Z",
  info: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z",
  check: "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z",
  checks: "M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z",
  x: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z",
  scales: "M239.43,133l-32-80h0a8,8,0,0,0-9.16-4.84L136,62V40a8,8,0,0,0-16,0V65.58L54.26,80.19A8,8,0,0,0,48.57,85h0v.06L16.57,165a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32a7.92,7.92,0,0,0-.57-3L66.92,93.77,120,82V208H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16H136V78.42L187,67.1,160.57,133a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32A7.92,7.92,0,0,0,239.43,133ZM56,184c-7.53,0-22.76-3.61-23.93-14.64L56,109.54l23.93,59.82C78.76,180.39,63.53,184,56,184Zm144-32c-7.53,0-22.76-3.61-23.93-14.64L200,77.54l23.93,59.82C222.76,148.39,207.53,152,200,152Z",
  list: "M224,128a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM104,72H216a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16ZM216,184H104a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM64,52H48a8,8,0,0,0,0,16H64a8,8,0,0,0,0-16Zm0,64H48a8,8,0,0,0,0,16H64a8,8,0,0,0,0-16Zm0,64H48a8,8,0,0,0,0,16H64a8,8,0,0,0,0-16Z",
  person: "M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z",
  globe: "M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.62,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z",
  sort: "M119.39,172.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,48,168H72V48a8,8,0,0,1,16,0V168h24A8,8,0,0,1,119.39,172.94Zm94.27-98.6-32-32a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,144,88h24V208a8,8,0,0,0,16,0V88h24a8,8,0,0,0,5.66-13.66Z",
  arrowUp: "M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z",
  caretDown: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z",
  caretUp: "M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z",
  checkCircle: "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
};
function I({ d }) {
  return /* @__PURE__ */ jsx("svg", { className: "dk-icon", viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: P[d] }) });
}
function useFollowLatest(animate, runKey) {
  const threadRef = useRef(null);
  const contentRef = useRef(null);
  useLayoutEffect(() => {
    const thread = threadRef.current;
    const content = contentRef.current;
    if (!thread || !content) return;
    const follow = () => thread.scrollTo({ top: thread.scrollHeight, behavior: animate ? "smooth" : "instant" });
    follow();
    const observer = new ResizeObserver(follow);
    observer.observe(content);
    return () => observer.disconnect();
  }, [animate, runKey]);
  return { threadRef, contentRef };
}
function Customer({ face, text, time, enter }) {
  return /* @__PURE__ */ jsxs("div", { className: `wd-msg wd-msg--customer${enter ?? ""}`, children: [
    /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: face, alt: "" }),
    /* @__PURE__ */ jsxs("div", { className: "wd-bubble", children: [
      /* @__PURE__ */ jsx("p", { className: "wd-bubble__text", children: text }),
      /* @__PURE__ */ jsxs("p", { className: "wd-bubble__foot", children: [
        /* @__PURE__ */ jsx(I, { d: "globe" }),
        " · ",
        time
      ] })
    ] })
  ] });
}
function Ai({
  children,
  agent = "Shopping Assistant",
  time,
  status,
  enter
}) {
  return /* @__PURE__ */ jsxs("div", { className: `wd-msg wd-msg--ai${enter ?? ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "wd-bubble", children: [
      /* @__PURE__ */ jsx("div", { className: "wd-bubble__text", children }),
      time && /* @__PURE__ */ jsxs("p", { className: "wd-bubble__foot", children: [
        agent,
        " · ",
        time,
        " · ",
        /* @__PURE__ */ jsx(I, { d: "checks" }),
        " ",
        status
      ] })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "wd-ai-mark", children: /* @__PURE__ */ jsx(I, { d: "sparkle" }) })
  ] });
}
function Human({ children, time, status, enter }) {
  return /* @__PURE__ */ jsxs("div", { className: `wd-msg wd-msg--ai${enter ?? ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "wd-bubble", children: [
      /* @__PURE__ */ jsx("div", { className: "wd-bubble__text", children }),
      time && /* @__PURE__ */ jsxs("p", { className: "wd-bubble__foot", children: [
        ME.name,
        " · Human agent · ",
        time,
        " · ",
        /* @__PURE__ */ jsx(I, { d: "checks" }),
        " ",
        status
      ] })
    ] }),
    /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: ME.face, alt: "" })
  ] });
}
function Event({ children, time, enter }) {
  return /* @__PURE__ */ jsxs("p", { className: `wd-event${enter ?? ""}`, children: [
    /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: ME.face, alt: "" }),
    /* @__PURE__ */ jsx("span", { children }),
    /* @__PURE__ */ jsx("span", { children: "·" }),
    /* @__PURE__ */ jsx("span", { children: time })
  ] });
}
function EventCard({
  icon,
  title,
  time,
  tone,
  children,
  enter
}) {
  return /* @__PURE__ */ jsxs("div", { className: `wd-card${tone === "note" ? " wd-card--note" : ""}${enter ?? ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "wd-card__text", children }),
    /* @__PURE__ */ jsxs("p", { className: "wd-card__foot", children: [
      /* @__PURE__ */ jsx(I, { d: icon }),
      " ",
      title,
      " · ",
      time
    ] })
  ] });
}
const InboxMweb = createContext(false);
function Inbox({
  title,
  count,
  rows,
  activeIndex = 0,
  ping,
  customer,
  topic,
  headAction,
  thread,
  foot,
  details,
  overlay,
  toast,
  threadRef,
  contentRef,
  stageRef,
  runKey,
  rowIcon = "sparkle"
}) {
  const mweb = useContext(InboxMweb);
  const dash = /* @__PURE__ */ jsxs("div", { className: mweb ? "dk wd dk--mweb" : "dk wd", children: [
    /* @__PURE__ */ jsxs("nav", { className: "dk-rail", children: [
      /* @__PURE__ */ jsx("img", { className: "dk-rail__logo", src: crosswordMark, alt: "" }),
      ["house", "cube", "headset", "chartBar"].map((n) => /* @__PURE__ */ jsx("span", { className: n === "headset" ? "dk-rail__item dk-rail__item--on" : "dk-rail__item", children: /* @__PURE__ */ jsx(Ph, { name: n }) }, n)),
      /* @__PURE__ */ jsx("span", { className: "dk-rail__item dk-rail__item--end", children: /* @__PURE__ */ jsx(Ph, { name: "gear" }) }),
      /* @__PURE__ */ jsx("span", { className: "dk-rail__me", "aria-hidden": true, children: "A" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "wd-list", children: [
      /* @__PURE__ */ jsxs("div", { className: "wd-list__head", children: [
        /* @__PURE__ */ jsx("h2", { className: "wd-serif", children: title }),
        /* @__PURE__ */ jsx("span", { className: "wd-count", children: count })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "wd-search", children: [
        /* @__PURE__ */ jsx(Ph, { name: "search" }),
        /* @__PURE__ */ jsx("span", { children: "Search name or message…" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "wd-sort", children: [
        /* @__PURE__ */ jsx(I, { d: "sort" }),
        " Last activity ",
        /* @__PURE__ */ jsx(I, { d: "caretDown" })
      ] }),
      rows.map((r, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: ["wd-row", i === activeIndex && "wd-row--on", i === activeIndex && ping && "wd-row--ping"].filter(Boolean).join(" "),
          children: [
            /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: r.face, alt: "" }),
            /* @__PURE__ */ jsxs("span", { className: "wd-row__body", children: [
              /* @__PURE__ */ jsxs("span", { className: "wd-row__top", children: [
                /* @__PURE__ */ jsx("span", { className: "wd-row__name", children: r.name }),
                rowIcon && /* @__PURE__ */ jsx(I, { d: rowIcon })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "wd-row__bottom", children: [
                /* @__PURE__ */ jsx("span", { className: "wd-row__text", children: r.text }),
                /* @__PURE__ */ jsxs("span", { className: "wd-row__age", children: [
                  r.age,
                  r.dot && /* @__PURE__ */ jsx("span", { className: "wd-dot" })
                ] })
              ] })
            ] })
          ]
        },
        r.name
      ))
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dk-main", children: [
      /* @__PURE__ */ jsxs("header", { className: "dk-head", children: [
        /* @__PURE__ */ jsx("span", { className: "dk-head__name", children: customer.name }),
        /* @__PURE__ */ jsx("span", { className: "dk-head__actions", children: headAction })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "dk-banner", children: [
        /* @__PURE__ */ jsx(I, { d: "info" }),
        " ",
        topic
      ] }),
      /* @__PURE__ */ jsx("div", { className: "wd-thread", ref: threadRef, children: /* @__PURE__ */ jsx("div", { className: "wd-thread__content", ref: contentRef, children: thread }) }),
      foot
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "dk-details wd-details", children: [
      /* @__PURE__ */ jsxs("p", { className: "dk-details__head", children: [
        /* @__PURE__ */ jsx(I, { d: "list" }),
        " Details"
      ] }),
      details
    ] }),
    overlay,
    toast
  ] }, runKey);
  if (mweb)
    return /* @__PURE__ */ jsx("div", { className: "dkm-frame", ref: stageRef, style: { backgroundImage: `url(${mwebBg})` }, children: dash });
  return /* @__PURE__ */ jsx("div", { className: "la-stage wd-stage", ref: stageRef, children: /* @__PURE__ */ jsx(LandscapeCanvas, { backdrop: "green", bleed: true, scene: dash }) });
}
function HeadActions({ mine = false, pressed = false }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "dk-iconbtn", children: /* @__PURE__ */ jsx(I, { d: "check" }) }),
    mine ? /* @__PURE__ */ jsxs("span", { className: "dk-takeover wd-enter-soft", children: [
      /* @__PURE__ */ jsx(I, { d: "sparkle" }),
      " Hand back to AI"
    ] }) : /* @__PURE__ */ jsxs("span", { className: `dk-takeover${pressed ? " wd-pressed" : ""}`, children: [
      /* @__PURE__ */ jsx(Ph, { name: "headset" }),
      " Take over"
    ] })
  ] });
}
function Contact({ name, face, email, extra }) {
  return /* @__PURE__ */ jsxs("div", { className: "dk-section", children: [
    /* @__PURE__ */ jsxs("p", { className: "dk-section__title", children: [
      /* @__PURE__ */ jsx(I, { d: "person" }),
      " Contact",
      " ",
      /* @__PURE__ */ jsx("span", { className: "wd-caret", children: /* @__PURE__ */ jsx(I, { d: "caretUp" }) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "dk-contact", children: [
      /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: face, alt: "" }),
      name
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "dk-row", children: [
      /* @__PURE__ */ jsx("span", { children: "Channel" }),
      /* @__PURE__ */ jsxs("span", { className: "wd-inline", children: [
        /* @__PURE__ */ jsx(I, { d: "globe" }),
        " Web"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "dk-row", children: [
      /* @__PURE__ */ jsx("span", { children: "Email" }),
      /* @__PURE__ */ jsx("span", { children: email })
    ] }),
    extra == null ? void 0 : extra.map(([k, val]) => /* @__PURE__ */ jsxs("p", { className: "dk-row", children: [
      /* @__PURE__ */ jsx("span", { children: k }),
      /* @__PURE__ */ jsx("span", { children: val })
    ] }, k)),
    /* @__PURE__ */ jsx("p", { className: "dk-link", children: "View contact" })
  ] });
}
function Summary({ text }) {
  return /* @__PURE__ */ jsxs("div", { className: "dk-section dk-summary", children: [
    /* @__PURE__ */ jsxs("p", { className: "dk-section__title", children: [
      /* @__PURE__ */ jsx(I, { d: "sparkle" }),
      " Summary",
      " ",
      /* @__PURE__ */ jsx("span", { className: "wd-caret", children: /* @__PURE__ */ jsx(I, { d: "caretUp" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "dk-summary__box", children: text }),
    /* @__PURE__ */ jsx("p", { className: "dk-link", children: "Refresh summary" })
  ] });
}
function Composer({
  mode,
  text,
  typing,
  placeholder,
  steers,
  bump,
  enter
}) {
  const instruct = mode === "instruct";
  return /* @__PURE__ */ jsxs("div", { className: `dk-composer wd-composer${instruct ? "" : " wd-composer--reply"}${enter ? " wd-enter-soft" : ""}`, children: [
    /* @__PURE__ */ jsxs("p", { className: "dk-composer__top", children: [
      instruct ? /* @__PURE__ */ jsx(I, { d: "sparkle" }) : /* @__PURE__ */ jsx(Ph, { name: "headset" }),
      " ",
      instruct ? "AI is replying" : "You’re replying",
      /* @__PURE__ */ jsxs("span", { className: `wd-steers${bump ? " wd-steers--bump" : ""}`, children: [
        /* @__PURE__ */ jsx(I, { d: "sparkle" }),
        " ",
        steers === 1 ? "1 instruction" : `${steers} instructions`
      ] }, steers)
    ] }),
    /* @__PURE__ */ jsxs("p", { className: `dk-composer__text${text ? " dk-composer__text--filled" : ""}`, children: [
      text || placeholder,
      typing && /* @__PURE__ */ jsx("span", { className: "ib-caret" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dk-composer__foot", children: [
      /* @__PURE__ */ jsxs("span", { className: "wd-pickers", children: [
        /* @__PURE__ */ jsxs("span", { className: "dk-mode", children: [
          instruct ? /* @__PURE__ */ jsx(I, { d: "sparkle" }) : /* @__PURE__ */ jsx(Ph, { name: "send" }),
          " ",
          instruct ? "Instruct the AI" : "Public reply",
          " ",
          /* @__PURE__ */ jsx(I, { d: "caretDown" })
        ] }),
        instruct && /* @__PURE__ */ jsxs("span", { className: "dk-mode wd-scope", children: [
          "This chat ",
          /* @__PURE__ */ jsx(I, { d: "caretDown" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: `dk-send${text ? " dk-send--ready" : ""}`, children: [
        instruct ? "Add" : "Send",
        " ",
        /* @__PURE__ */ jsx(I, { d: "arrowUp" })
      ] })
    ] })
  ] }, mode);
}
function Confirm({
  title,
  body,
  action,
  pressed,
  leaving
}) {
  return /* @__PURE__ */ jsx("div", { className: `wd-scrim${leaving ? " wd-scrim--out" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "wd-dialog", children: [
    /* @__PURE__ */ jsx("p", { className: "wd-dialog__title", children: title }),
    /* @__PURE__ */ jsx("p", { className: "wd-dialog__body", children: body }),
    /* @__PURE__ */ jsxs("div", { className: "wd-dialog__actions", children: [
      /* @__PURE__ */ jsx("span", { className: "wd-btn wd-btn--outline", children: "Cancel" }),
      /* @__PURE__ */ jsx("span", { className: `wd-btn wd-btn--primary${pressed ? " wd-pressed" : ""}`, children: action })
    ] })
  ] }) });
}
function Toast({ children }) {
  return /* @__PURE__ */ jsxs("p", { className: "wd-toast", children: [
    /* @__PURE__ */ jsx(I, { d: "checkCircle" }),
    " ",
    children
  ] });
}
const CUSTOMER$2 = { name: "Maya Collins", face: emma };
const OTHERS$1 = [
  { name: "Omar Haddad", face: omar, text: "Can I change the delivery address?", age: "4m" },
  { name: "Sofia Marino", face: shopper, text: "Thanks, that worked!", age: "12m" },
  { name: "Kenji Watanabe", face: kenji, text: "Great choice! It's in stock and ships today.", age: "26m" }
];
const beats$2 = [
  { id: "rest", type: "pause", ms: 900 },
  { id: "ask", type: "appear", ms: 1100 },
  { id: "think", type: "think", labels: ["Thinking", "Bringing in the team"] },
  { id: "reply", type: "text", text: humanTakeover.assistantMessage },
  { id: "handoff", type: "appear", ms: 1300 },
  { id: "press", type: "appear", ms: 450 },
  { id: "confirm", type: "appear", ms: 1500 },
  { id: "confirmPress", type: "appear", ms: 350 },
  { id: "joined", type: "appear", ms: 1100 },
  { id: "type", type: "compose", text: humanTakeover.humanMessage, msPerChar: 36 },
  { id: "sent", type: "appear", ms: 2800 }
];
function Dashboard$2({ v, stageRef, runKey }) {
  const enter = v.animate ? " ib-enter" : "";
  const { threadRef, contentRef } = useFollowLatest(v.animate, runKey);
  const first = CUSTOMER$2.name.split(" ")[0];
  const preview = v.sent ? humanTakeover.humanMessage : v.reply ? humanTakeover.assistantMessage : humanTakeover.userMessage;
  return /* @__PURE__ */ jsx(
    Inbox,
    {
      title: v.joined ? "My Chats" : "AI agents",
      count: v.joined ? 1 : 4,
      rows: [{ ...CUSTOMER$2, text: preview, age: v.asked ? "now" : "2m", dot: v.handoff && !v.joined }, ...v.joined ? [] : OTHERS$1],
      rowIcon: v.joined ? null : "sparkle",
      ping: v.asked && v.animate && !v.joined,
      customer: CUSTOMER$2,
      topic: "Wants a person to help her decide",
      headAction: /* @__PURE__ */ jsx(HeadActions, { mine: v.joined, pressed: v.pressed && !v.confirm }),
      threadRef,
      contentRef,
      stageRef,
      runKey,
      thread: /* @__PURE__ */ jsxs(Fragment, { children: [
        v.asked && /* @__PURE__ */ jsx(Customer, { face: CUSTOMER$2.face, text: humanTakeover.userMessage, time: "01:20", enter }),
        (v.thinking || v.reply) && /* @__PURE__ */ jsx(Ai, { enter, time: v.reply ? "01:20" : void 0, status: "Seen", children: v.thinking ? /* @__PURE__ */ jsx(
          "span",
          {
            className: ["la-thinking", v.animate && "la-thinking--live", !v.thinking.visible && "la-thinking--out"].filter(Boolean).join(" "),
            children: v.thinking.label
          },
          v.thinking.label
        ) : /* @__PURE__ */ jsx("p", { children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: humanTakeover.assistantMessage }) : humanTakeover.assistantMessage }) }),
        v.handoff && /* @__PURE__ */ jsxs(EventCard, { icon: "sparkle", title: "Handed to the team · Shopping Assistant", time: "01:20", enter, children: [
          /* @__PURE__ */ jsx("span", { className: "wd-card__label", children: "Question" }),
          humanTakeover.userMessage
        ] }),
        v.joined && /* @__PURE__ */ jsxs(Event, { time: "01:21", enter, children: [
          /* @__PURE__ */ jsx("b", { children: ME.name }),
          " has joined the chat"
        ] }),
        v.sent && /* @__PURE__ */ jsx(Human, { time: "01:21", status: "Delivered", enter, children: /* @__PURE__ */ jsx("p", { children: humanTakeover.humanMessage }) })
      ] }),
      foot: v.joined ? /* @__PURE__ */ jsx(Composer, { mode: "reply", text: v.composer, typing: v.typing, placeholder: `Reply to ${first}…`, steers: 0, enter: v.animate }) : /* @__PURE__ */ jsx(Composer, { mode: "instruct", text: "", typing: false, placeholder: "Tell the AI what to do in this chat…", steers: 0 }),
      details: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Contact, { ...CUSTOMER$2, email: "maya.c@example.net" }),
        /* @__PURE__ */ jsx(Summary, { text: "Maya has been going back and forth and asked for a person. The AI has handed the chat to the team with everything discussed so far." })
      ] }),
      overlay: v.confirm && /* @__PURE__ */ jsx(
        Confirm,
        {
          title: "Take over this conversation?",
          body: `The AI will stop replying — ${CUSTOMER$2.name}’s messages come to you until you hand it back.`,
          action: "Take over",
          pressed: v.confirmPressed
        }
      ),
      toast: v.toast && /* @__PURE__ */ jsx(Toast, { children: "You're now handling this conversation." })
    }
  );
}
function TakeoverDashboardMotion() {
  var _a;
  const stageRef = useRef(null);
  const t = useChatTimeline(beats$2, useLandedOnScreen(stageRef));
  const joined = t.reached("joined");
  const v = {
    asked: t.reached("ask"),
    thinking: t.status("think"),
    reply: t.reached("reply"),
    handoff: t.reached("handoff"),
    pressed: t.reached("press"),
    confirm: t.reached("confirm") && !joined,
    confirmPressed: t.reached("confirmPress"),
    joined,
    composer: ((_a = t.composer) == null ? void 0 : _a.value) ?? "",
    typing: !!t.composer,
    sent: t.reached("sent"),
    toast: joined && !t.passed("type"),
    animate: !t.reducedMotion
  };
  return /* @__PURE__ */ jsx(Dashboard$2, { v, stageRef, runKey: t.runKey });
}
function TakeoverDashboardMwebMotion() {
  return /* @__PURE__ */ jsx(InboxMweb.Provider, { value: true, children: /* @__PURE__ */ jsx(TakeoverDashboardMotion, {}) });
}
const CUSTOMER$1 = { name: "Omar Haddad", face: omar };
const OTHER = { name: "Kenji Watanabe", face: kenji, text: "Refund $78.00 on order SM-10429?", age: "2h", dot: true };
const beats$1 = [
  { id: "rest", type: "pause", ms: 900 },
  { id: "ask", type: "appear", ms: 1100 },
  { id: "think", type: "think", labels: ["Thinking", "Checking with the team"] },
  { id: "checking", type: "text", text: merchantApproval.checkingMessage },
  { id: "decision", type: "appear", ms: 2600 },
  { id: "press", type: "appear", ms: 450 },
  { id: "decided", type: "appear", ms: 1300 },
  { id: "think2", type: "think", labels: ["Thinking"] },
  { id: "offer", type: "text", text: merchantApproval.offerMessage },
  { id: "read", type: "pause", ms: 2600 }
];
function Thinking({ s, animate }) {
  return /* @__PURE__ */ jsx("span", { className: ["la-thinking", animate && "la-thinking--live", !s.visible && "la-thinking--out"].filter(Boolean).join(" "), children: s.label }, s.label);
}
function DecisionCard({ pressed, enter }) {
  return /* @__PURE__ */ jsxs("div", { className: `wd-decision${enter ? " ib-enter" : ""}`, children: [
    /* @__PURE__ */ jsxs("p", { className: "wd-decision__head", children: [
      /* @__PURE__ */ jsx(I, { d: "scales" }),
      " Decision needed"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "wd-decision__text", children: merchantApproval.requestMessage }),
    /* @__PURE__ */ jsxs("div", { className: "wd-decision__actions", children: [
      /* @__PURE__ */ jsx("span", { className: "wd-note-field", children: "Note (optional)" }),
      /* @__PURE__ */ jsxs("span", { className: "wd-btn wd-btn--deny", children: [
        /* @__PURE__ */ jsx(I, { d: "x" }),
        " Deny"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: `wd-btn wd-btn--primary${pressed ? " wd-pressed" : ""}`, children: [
        /* @__PURE__ */ jsx(I, { d: "check" }),
        " ",
        merchantApproval.decision
      ] })
    ] })
  ] });
}
function Dashboard$1({ v, stageRef, runKey }) {
  const enter = v.animate ? " ib-enter" : "";
  const { threadRef, contentRef } = useFollowLatest(v.animate, runKey);
  const awaiting = v.decision && !v.decided;
  const preview = v.offer ? merchantApproval.offerMessage : awaiting ? merchantApproval.requestMessage : v.checking ? merchantApproval.checkingMessage : merchantApproval.userMessage;
  return /* @__PURE__ */ jsx(
    Inbox,
    {
      title: "Decisions",
      count: awaiting ? 2 : 1,
      rows: [{ ...CUSTOMER$1, text: preview, age: "now", dot: awaiting }, OTHER],
      rowIcon: null,
      ping: v.decision && v.animate && !v.decided,
      customer: CUSTOMER$1,
      topic: "Asking for 20% off the set",
      headAction: /* @__PURE__ */ jsx(HeadActions, {}),
      threadRef,
      contentRef,
      stageRef,
      runKey,
      thread: /* @__PURE__ */ jsxs(Fragment, { children: [
        v.asked && /* @__PURE__ */ jsx(Customer, { face: CUSTOMER$1.face, text: merchantApproval.userMessage, time: "00:47", enter }),
        (v.thinking || v.checking) && /* @__PURE__ */ jsx(Ai, { enter, time: v.checking ? "00:47" : void 0, status: "Delivered", children: v.thinking ? /* @__PURE__ */ jsx(Thinking, { s: v.thinking, animate: v.animate }) : /* @__PURE__ */ jsx("p", { children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: merchantApproval.checkingMessage }) : merchantApproval.checkingMessage }) }),
        v.decided && /* @__PURE__ */ jsx(EventCard, { icon: "scales", title: `Decision · ${ME.name}`, time: "00:48", tone: "note", enter, children: merchantApproval.decision }),
        (v.thinking2 || v.offer) && /* @__PURE__ */ jsx(Ai, { enter, time: v.offer ? "00:48" : void 0, status: "Delivered", children: v.thinking2 ? /* @__PURE__ */ jsx(Thinking, { s: v.thinking2, animate: v.animate }) : /* @__PURE__ */ jsx("p", { children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: merchantApproval.offerMessage }) : merchantApproval.offerMessage }) })
      ] }),
      foot: awaiting ? /* @__PURE__ */ jsx(DecisionCard, { pressed: v.pressed, enter: v.animate }) : /* @__PURE__ */ jsx(Composer, { mode: "instruct", text: "", typing: false, placeholder: "Tell the AI what to do in this chat…", steers: 0, enter: v.decided && v.animate }),
      details: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Contact, { ...CUSTOMER$1, email: "omar.h@example.net", extra: [["Orders", "4"]] }),
        /* @__PURE__ */ jsx(Summary, { text: "Omar loves the set and asked for 20% off. He’s a repeat customer with 4 previous orders, so the AI asked the team to approve." })
      ] }),
      toast: v.toast && /* @__PURE__ */ jsx(Toast, { children: "Approved — the AI will tell the visitor." })
    }
  );
}
function DecisionDashboardMotion() {
  const stageRef = useRef(null);
  const t = useChatTimeline(beats$1, useLandedOnScreen(stageRef));
  const decided = t.reached("decided");
  const v = {
    asked: t.reached("ask"),
    thinking: t.status("think"),
    checking: t.reached("checking"),
    decision: t.reached("decision"),
    pressed: t.reached("press"),
    decided,
    thinking2: t.status("think2"),
    offer: t.reached("offer"),
    toast: decided && !t.passed("offer"),
    animate: !t.reducedMotion
  };
  return /* @__PURE__ */ jsx(Dashboard$1, { v, stageRef, runKey: t.runKey });
}
function DecisionDashboardMwebMotion() {
  return /* @__PURE__ */ jsx(InboxMweb.Provider, { value: true, children: /* @__PURE__ */ jsx(DecisionDashboardMotion, {}) });
}
const CUSTOMER = { name: "Sofia Marino", face: shopper };
const OTHERS = [
  { name: "Omar Haddad", face: omar, text: "Can I change the delivery address?", age: "4m" },
  { name: "Emma Lindqvist", face: emma, text: "Thanks, that worked!", age: "12m" },
  { name: "Kenji Watanabe", face: kenji, text: "Great choice! It's in stock and ships today.", age: "26m" }
];
const EARLIER = {
  customer: "Hi, my serum arrived with the pump broken.",
  ai: "I’m sorry to hear that, Sofia. Could you send a photo of the pump so I can sort it out?"
};
const beats = [
  { id: "rest", type: "pause", ms: 900 },
  { id: "arrive", type: "appear", ms: 1200 },
  { id: "whisper", type: "compose", text: whisperToAgent.whisperMessage, msPerChar: 34 },
  { id: "steer", type: "appear", ms: 900 },
  { id: "think", type: "think", labels: ["Thinking", "Keeping it warm"] },
  { id: "reply", type: "text", text: whisperToAgent.assistantMessage },
  { id: "read", type: "pause", ms: 2600 }
];
function Dashboard({ v, stageRef, runKey }) {
  const enter = v.animate ? " ib-enter" : "";
  const { threadRef, contentRef } = useFollowLatest(v.animate, runKey);
  const preview = v.reply ? whisperToAgent.assistantMessage : v.arrived ? whisperToAgent.userMessage : EARLIER.ai;
  return /* @__PURE__ */ jsx(
    Inbox,
    {
      title: "AI agents",
      count: 4,
      rows: [{ ...CUSTOMER, text: preview, age: v.arrived ? "now" : "6m" }, ...OTHERS],
      ping: v.arrived && v.animate,
      customer: CUSTOMER,
      topic: "Serum arrived with a broken pump",
      headAction: /* @__PURE__ */ jsx(HeadActions, {}),
      threadRef,
      contentRef,
      stageRef,
      runKey,
      thread: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Customer, { face: CUSTOMER.face, text: EARLIER.customer, time: "01:14" }),
        /* @__PURE__ */ jsx(Ai, { time: "01:14", status: "Seen", children: /* @__PURE__ */ jsx("p", { children: EARLIER.ai }) }),
        v.arrived && /* @__PURE__ */ jsx(Customer, { face: CUSTOMER.face, text: whisperToAgent.userMessage, time: "01:22", enter }),
        v.steer && /* @__PURE__ */ jsxs("div", { className: `wd-steer${enter}`, children: [
          /* @__PURE__ */ jsx("img", { className: "dk-avatar", src: ME.face, alt: "" }),
          /* @__PURE__ */ jsxs("div", { className: "wd-steer__body", children: [
            /* @__PURE__ */ jsxs("p", { className: "wd-steer__meta", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("b", { children: whisperToAgent.whisperSender }),
                " told the AI"
              ] }),
              /* @__PURE__ */ jsx("span", { children: "·" }),
              /* @__PURE__ */ jsx("span", { children: "This chat" }),
              /* @__PURE__ */ jsx("span", { children: "·" }),
              /* @__PURE__ */ jsx("span", { children: "01:22" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "wd-steer__text", children: whisperToAgent.whisperMessage })
          ] })
        ] }),
        (v.thinking || v.reply) && /* @__PURE__ */ jsx(Ai, { enter, time: v.reply ? "01:23" : void 0, status: "Delivered", children: v.thinking ? /* @__PURE__ */ jsx(
          "span",
          {
            className: ["la-thinking", v.animate && "la-thinking--live", !v.thinking.visible && "la-thinking--out"].filter(Boolean).join(" "),
            children: v.thinking.label
          },
          v.thinking.label
        ) : /* @__PURE__ */ jsx("p", { children: v.animate ? /* @__PURE__ */ jsx(StaggerText, { text: whisperToAgent.assistantMessage }) : whisperToAgent.assistantMessage }) })
      ] }),
      foot: /* @__PURE__ */ jsx(
        Composer,
        {
          mode: "instruct",
          text: v.composer,
          typing: v.typing,
          placeholder: "Tell the AI what to do in this chat…",
          steers: v.steer ? 1 : 0,
          bump: v.steer && v.animate
        }
      ),
      details: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Contact, { ...CUSTOMER, email: "sofia.m@example.net", extra: [["Orders", "14"]] }),
        /* @__PURE__ */ jsx(Summary, { text: "Sofia’s serum arrived with a broken pump. The AI asked for a photo; she’s now frustrated with the wait." })
      ] })
    }
  );
}
function WhisperDashboardMotion() {
  var _a;
  const stageRef = useRef(null);
  const t = useChatTimeline(beats, useLandedOnScreen(stageRef));
  const v = {
    arrived: t.reached("arrive"),
    composer: ((_a = t.composer) == null ? void 0 : _a.value) ?? "",
    typing: !!t.composer,
    steer: t.passed("whisper"),
    thinking: t.status("think"),
    reply: t.reached("reply"),
    animate: !t.reducedMotion
  };
  return /* @__PURE__ */ jsx(Dashboard, { v, stageRef, runKey: t.runKey });
}
function WhisperDashboardMwebMotion() {
  return /* @__PURE__ */ jsx(InboxMweb.Provider, { value: true, children: /* @__PURE__ */ jsx(WhisperDashboardMotion, {}) });
}
export {
  DecisionDashboardMotion,
  DecisionDashboardMwebMotion,
  GuardrailsMotion,
  GuardrailsMwebMotion,
  HelpdeskInsightsDashboardMotion,
  MerchantInsightDeskMotion,
  MerchantInsightMotion,
  OrderTrackingMotion,
  ProductUsageMotion,
  RefundStatusMotion,
  ReturnEligibilityMotion,
  ShadeChangeMotion,
  SizeExchangeMotion,
  TakeoverDashboardMotion,
  TakeoverDashboardMwebMotion,
  WhisperDashboardMotion,
  WhisperDashboardMwebMotion
};
