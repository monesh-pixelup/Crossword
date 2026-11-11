"use client";

// Built from the "Crossword — AI Assistants V3 motion" source (Crossword-AI-Assistants-V3-Motion/source) with Vite,
// unminified, React external. See ./aia-motion.tsx for the mechanical changes.

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo, Fragment as Fragment$1 } from "react";
const amberChairImage = "/images/ai-assistants/v3/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
const amberOpalLampImage = "/images/ai-assistants/v3/assets/amber-oak-opal-glass-lamp-CSWTBSbc.webp";
const amberPleatedLampImage = "/images/ai-assistants/v3/assets/amber-oak-pleated-linen-lamp-DU9AZH7n.webp";
const trailwellWeekenderImage = "/images/ai-assistants/v3/assets/trailwell-weekender-FcXfEIMe.webp";
const trailwellRoamImage = "/images/ai-assistants/v3/assets/trailwell-roam-E1xpy3ga.webp";
const trailwellOvernightImage = "/images/ai-assistants/v3/assets/trailwell-overnight-Bh3WrqOg.webp";
const strideCourt = "/images/ai-assistants/v3/assets/court-01-CdgB4UN7.webp";
const strideRunner = "/images/ai-assistants/v3/assets/suede-runner-CgZl6zbH.webp";
const strideLoafer = "/images/ai-assistants/v3/assets/penny-loafer-B2im49V5.webp";
const sorelleSetImage = "/images/ai-assistants/v3/assets/sorelle-hydration-set-9Ig4QSA_.webp";
const sorelleGelImage = "/images/ai-assistants/v3/assets/sorelle-cloud-gel-BMJMi5HN.webp";
const sorelleLotionImage = "/images/ai-assistants/v3/assets/sorelle-barrier-lotion-ZlOVOOrp.webp";
const sorelleCreamImage = "/images/ai-assistants/v3/assets/sorelle-hydration-cream-DnCPkHXM.webp";
const vitaminCSerum = "/images/ai-assistants/v3/assets/vitamin-c-serum-vnf_1nLn.webp";
const goodwell_sleep_60 = "/images/ai-assistants/v3/assets/goodwell-sleep-60-CC2pkEiH.webp";
const goodwell_sleep_28 = "/images/ai-assistants/v3/assets/goodwell-sleep-28-CDykoAsw.webp";
const goodwell_energy = "/images/ai-assistants/v3/assets/goodwell-energy-DTBla5fb.webp";
const goodwell_focus = "/images/ai-assistants/v3/assets/goodwell-focus-Bg4PysvQ.webp";
const goodwell_calm = "/images/ai-assistants/v3/assets/goodwell-calm-BFGrK6_s.webp";
const goodwell_immunity = "/images/ai-assistants/v3/assets/goodwell-immunity-MpMIo6Dd.webp";
const moonrest_sleep = "/images/ai-assistants/v3/assets/moonrest-sleep-Cn_bYWCE.webp";
const dusklight_arc = "/images/ai-assistants/v3/assets/dusklight-arc-BLtDyKob.svg";
const dusklight_linear = "/images/ai-assistants/v3/assets/dusklight-linear-CNxIsC3B.svg";
const crestlineHelmet = "/images/ai-assistants/v3/assets/crestline-helmet-ByadbiwR.webp";
const aurelleAnkletImage = "/images/ai-assistants/v3/assets/beaded-gold-anklet-BD5cJanU.webp";
const aurellePendantImage = "/images/ai-assistants/v3/assets/teardrop-pendant-necklace-D-dhIf6_.webp";
const aurelleBraceletImage = "/images/ai-assistants/v3/assets/chain-link-bracelet-GsLwly7K.webp";
const aurelleRosePendantImage = "/images/ai-assistants/v3/assets/rose-gold-teardrop-pendant-D6EiuVDi.webp";
const aurelleHaloImage = "/images/ai-assistants/v3/assets/rose-gold-halo-pendant-D9hm3seh.webp";
const aurelleBarImage = "/images/ai-assistants/v3/assets/rose-gold-bar-pendant-BLV_GvgY.webp";
const aurelleBoxChainImage = "/images/ai-assistants/v3/assets/rose-gold-fine-box-chain-xCJee_59.webp";
const aurelleSnakeChainImage = "/images/ai-assistants/v3/assets/rose-gold-snake-chain-CAeWdfsC.webp";
const aurelleCurbChainImage = "/images/ai-assistants/v3/assets/rose-gold-curb-chain-JMoFIQPj.webp";
const espressoMachine = "/images/ai-assistants/v3/assets/01-brewhaus-pro-espresso-machine-CnXtbuBY.webp";
const accessoryBundle = "/images/ai-assistants/v3/assets/02-brewhaus-coffee-accessory-bundle-C2tDu5VG.webp";
const leatherFrameCase = "/images/ai-assistants/v3/assets/marais-eyewear-case-JN3ZsUf8.webp";
const silkScarf = "/images/ai-assistants/v3/assets/04-marais-gold-tone-silk-scarf-CNixvkq3.webp";
const smartSpeaker = "/images/ai-assistants/v3/assets/05-waveline-compact-smart-speaker-Bnwh8J7N.webp";
const wirelessEarbuds = "/images/ai-assistants/v3/assets/06-aura-wireless-earbuds-D4tIAj5K.webp";
const leatherWallet = "/images/ai-assistants/v3/assets/07-holt-and-co-leather-bifold-wallet-Djl5CNb1.webp";
const auden$1 = "/images/ai-assistants/v3/assets/08-auden-wave-pro-black-DBohKiBG.webp";
const audenIvory = "/images/ai-assistants/v3/assets/09-auden-viewed-headphones-ivory-DJtMgVTi.webp";
const audenOlive = "/images/ai-assistants/v3/assets/10-auden-viewed-headphones-olive-CXNlTcjR.webp";
const audenMustard = "/images/ai-assistants/v3/assets/11-auden-viewed-headphones-mustard-gold-Bfg04pgZ.webp";
const familyAirFryer = "/images/ai-assistants/v3/assets/12-family-air-fryer-CWIb1OmL.webp";
const compactAirFryer = "/images/ai-assistants/v3/assets/13-compact-air-fryer-BxJsr6WI.webp";
const referenceLamp = "/images/ai-assistants/v3/assets/14-shopper-reference-triple-dome-lamp-aevpNtcM.webp";
const tripodLamp = "/images/ai-assistants/v3/assets/15-warm-tripod-table-lamp-DHLSJYdp.webp";
const domeLamp = "/images/ai-assistants/v3/assets/16-mod-dome-table-lamp-EjQrNJOK.webp";
const bedsideLamp = "/images/ai-assistants/v3/assets/17-copper-rim-bedside-lamp-CpO5i7WX.webp";
const foundation = "/images/ai-assistants/v3/assets/lumen-second-skin-dewy-wWlLR3Lx.webp";
const cottonShirt = "/images/ai-assistants/v3/assets/19-marais-relaxed-cotton-shirt-7PfMJYiW.webp";
const tailoredTrousers = "/images/ai-assistants/v3/assets/20-straight-leg-tailored-trousers-hCDbFo78.webp";
const leatherSneakers = "/images/ai-assistants/v3/assets/21-minimal-leather-sneakers-BEbJimwc.webp";
const aeriaCycloneProVacuum = "/images/ai-assistants/v3/assets/22-aeria-cyclone-pro-vacuum-CinSe7Rh.webp";
const aeriaCycloneMaxVacuum = "/images/ai-assistants/v3/assets/aeria-cyclone-max-CqZad4Xk.webp";
const oliveCottonShirt = "/images/ai-assistants/v3/assets/marais-shirt-olive-Bh1w4gzh.webp";
const blackLeatherSneakers = "/images/ai-assistants/v3/assets/stride-sneakers-black-CuBmUkDb.webp";
const skinVeilFoundation = "/images/ai-assistants/v3/assets/lumen-skin-veil-p5bk1wp6.webp";
const trueMatchFoundation = "/images/ai-assistants/v3/assets/lumen-true-match-BhSYv85P.webp";
const leatherCardholder = "/images/ai-assistants/v3/assets/holt-cardholder-Cu4HiyUC.webp";
const cutouts = {
  espressoMachine,
  accessoryBundle,
  leatherFrameCase,
  silkScarf,
  smartSpeaker,
  wirelessEarbuds,
  leatherWallet,
  auden: auden$1,
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
new Set(Object.values(cutouts));
const hydratingSerum = "/images/ai-assistants/v3/assets/hydrating-serum-DkP_er3F.webp";
const calmingSerum = "/images/ai-assistants/v3/assets/calming-serum-mWPB8Rzq.webp";
const proteinTub = "/images/ai-assistants/v3/assets/gallery-main-Ct7UQJr8.webp";
const officeChair = "/images/ai-assistants/v3/assets/gallery-main-Cz-eqPt1.webp";
const linenMidiDress = "/images/ai-assistants/v3/assets/linen-midi-dress-BF9Sk3Jd.webp";
const linenShirtDress = "/images/ai-assistants/v3/assets/linen-shirt-dress-DbEpAh-k.webp";
const linenTrousers = "/images/ai-assistants/v3/assets/linen-trousers-BOqijRPF.webp";
const balloonSleeveDress = "/images/ai-assistants/v3/assets/dress-reference-OSo4OmDP.webp";
const wavelineLaptop = "/images/ai-assistants/v3/assets/laptop-bHYKckDQ.webp";
const formworkTaskChair = "/images/ai-assistants/v3/assets/also-viewed-1-B6DEocae.webp";
const formworkExecutiveChair = "/images/ai-assistants/v3/assets/also-viewed-2-DWB9-93Z.webp";
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
const auden = {
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
  auden,
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
const audenViewedProducts = [
  catalog.audenIvory,
  catalog.audenOlive,
  catalog.audenMustard
];
const goldHoopSet = "/images/ai-assistants/v3/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const pearlDropSet = "/images/ai-assistants/v3/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const citrineStudSet = "/images/ai-assistants/v3/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
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
const REPLY_STAGGER_MS = 45;
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
  return wordCount(text) * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
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
    const at = (id) => {
      const i = beats2.findIndex((b) => b.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current2 = beats2[index];
    const typedValue = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= at(id),
      passed: (id) => index > at(id),
      loading: (id) => index === at(id),
      status: (id) => {
        const beat = beats2[index];
        if (index !== at(id) || beat.type !== "think") return null;
        const stage = thinkStage.index === index ? thinkStage.stage : 0;
        return { label: beat.labels[stage] ?? beat.labels[0], visible: exitingIndex !== index };
      },
      composer: (current2 == null ? void 0 : current2.type) === "compose" && current2.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats2.length,
      reducedMotion,
      runKey
    };
  }, [beats2, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}
function ScaleToFit({
  contentWidth,
  contentHeight,
  maxWidth,
  maxHeight,
  children
}) {
  const scale = Math.min(maxWidth / contentWidth, maxHeight / contentHeight);
  return /* @__PURE__ */ jsx("div", { style: { position: "relative", width: maxWidth, height: maxHeight }, children: /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: contentWidth,
        height: contentHeight,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center"
      },
      children
    }
  ) });
}
const ZOOM_MEDIUM = 1.45;
const ZOOM_CLOSE = 1.85;
const MAX_ZOOM = ZOOM_CLOSE;
const MIN_FOCUS_ZOOM = ZOOM_MEDIUM;
const PAD = 0.02;
const HEADROOM = 0.14;
const FRAME_MARGIN = 34;
const CAMERA_MS = 900;
const EASE_MOVE = "cubic-bezier(0.76, 0, 0.24, 1)";
const RIDE_MS = 600;
const EASE_RIDE = "cubic-bezier(0.22, 1, 0.36, 1)";
const CAMERA_LEAD_MS = CAMERA_MS + 150;
const READ_MS = 2600;
const PULLBACK_MS = 760;
const REST_MS = 700;
const DWELL_MS = 700;
const PRE_LOAD_MS = 400;
const LOAD_SETTLE_MS = 450;
const HOLD_MS = 1600;
const TYPE_MS_PER_CHAR = 42;
const FULL = { s: 1, ty: 0 };
function transformFor({ s, ty }) {
  return `translate(${(0.5 - 0.5 * s) * 100}%, ${ty * 100}%) scale(${s})`;
}
function useCameraBeats(beats2, enabled, nudge, release) {
  return useMemo(() => {
    const firstCompose = beats2.findIndex((b) => b.type === "compose");
    const out = beats2.flatMap((b, i) => {
      let beat = b;
      if (b.type === "compose" && b.text) {
        beat = { ...b, msPerChar: b.msPerChar ?? TYPE_MS_PER_CHAR, leadMs: i === firstCompose && !nudge ? Math.max(b.leadMs ?? 0, CAMERA_LEAD_MS) : b.leadMs };
      }
      const before = b.id === release ? [{ id: "camera-release", type: "pause", ms: PULLBACK_MS + 150 }] : [];
      const after = b.type === "compose" && b.text ? [{ id: `camera-dwell-${b.id}`, type: "pause", ms: DWELL_MS }] : [];
      if (b.type === "load" && b.id !== release) {
        beat = { ...b, ms: Math.max(b.ms ?? 0, CAMERA_MS + LOAD_SETTLE_MS) };
        return [...before, { id: `camera-pre-${b.id}`, type: "pause", ms: PRE_LOAD_MS }, beat, ...after];
      }
      return [...before, beat, ...after];
    });
    const rest = [{ id: "camera-rest", type: "pause", ms: REST_MS }];
    return [...rest, ...out, { id: "camera-read", type: "pause", ms: READ_MS }];
  }, [beats2, enabled, nudge, release]);
}
const GJ2 = { transcript: ".gj2-transcript", foot: ".gj2-foot", user: ".gj2-msg--user", attach: "sbp-row", followups: "gj2-followups" };
function useChatCamera(t, enabled, stage, nudge, approach, release, { selectors = GJ2, wide = false, fitOnly = false, lens } = {}) {
  var _a;
  let mode = "full";
  if (!wide && !t.reducedMotion && !t.done && !(release && t.reached("camera-release"))) {
    if (t.passed("camera-rest")) {
      mode = "focus";
    }
  }
  const ref = useRef(null);
  const [band, setBand] = useState(null);
  useEffect(() => {
    const cam = ref.current;
    if (!cam || !enabled) return;
    let clip = cam.parentElement;
    while (clip && getComputedStyle(clip).overflow === "visible") clip = clip.parentElement;
    if (!clip) return;
    const measure = () => {
      if (cam.style.transform && !cam.style.transform.includes("scale(1)")) return;
      const box = cam.getBoundingClientRect();
      const frame = clip.getBoundingClientRect();
      if (!box.height) return;
      setBand({ lo: (frame.top - box.top + FRAME_MARGIN) / box.height, hi: (frame.bottom - box.top - FRAME_MARGIN) / box.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(clip);
    return () => ro.disconnect();
  }, [enabled]);
  const fit = (a, b) => {
    if (!band) return FULL;
    const { lo, hi } = band;
    const h = hi - lo;
    if (lens && lens > h) {
      const span = h / lens;
      const cur2 = viewRef.current;
      const onBottom2 = cur2 !== FULL && Math.abs(cur2.ty - lo) >= 1e-3;
      const fitsTop = b + PAD <= span;
      const fitsBottom = a - PAD >= 1 - span;
      const top2 = fitsTop && !(onBottom2 && fitsBottom);
      return top2 ? { s: lens, ty: lo } : { s: lens, ty: hi - lens };
    }
    const sTop = Math.min(MAX_ZOOM, h / (b + PAD));
    const sBottom = Math.min(MAX_ZOOM, h / (1 - a + PAD));
    const cur = viewRef.current;
    const onTop = cur !== FULL && Math.abs(cur.ty - lo) < 1e-3;
    const onBottom = cur !== FULL && !onTop;
    const top = sTop >= sBottom * (onBottom ? 1.15 : 1) || onTop && sTop >= sBottom / 1.15;
    const allowed = top ? sTop : sBottom;
    const s = allowed >= ZOOM_CLOSE ? ZOOM_CLOSE : allowed >= ZOOM_MEDIUM ? ZOOM_MEDIUM : 1;
    if (s === 1 || s <= h) return FULL;
    return top ? { s, ty: lo } : { s, ty: hi - s };
  };
  const [view, setView] = useState(FULL);
  const viewRef = useRef(view);
  const movedAt = useRef(-Infinity);
  viewRef.current = view;
  useEffect(() => {
    if (mode === "full") return setView(FULL);
    if (mode === "nudge") return setView(fit(0.74, 0.9));
    const cam = ref.current;
    if (!cam || !band) return;
    const transcript2 = cam.querySelector(selectors.transcript);
    const foot = cam.querySelector(selectors.foot);
    if (!transcript2) return;
    const viewport = selectors.viewport && transcript2.closest(selectors.viewport) || transcript2;
    let raf = 0;
    const settle = () => {
      var _a2, _b;
      raf = 0;
      const camRect = cam.getBoundingClientRect();
      const f = (y) => (y - camRect.top) / camRect.height;
      const vp = viewport.getBoundingClientRect();
      const typing = !!foot && (!!((_a2 = t.composer) == null ? void 0 : _a2.value) || !transcript2.lastElementChild);
      const last = transcript2.lastElementChild;
      let a, b;
      if (typing) {
        const r = foot.getBoundingClientRect();
        a = f(r.top);
        b = f(r.bottom);
      } else if (last) {
        const users = transcript2.querySelectorAll(`:scope > ${selectors.user}`);
        let start = users.length ? users[users.length - 1] : transcript2.firstElementChild;
        while ((_b = start == null ? void 0 : start.previousElementSibling) == null ? void 0 : _b.classList.contains(selectors.attach)) start = start.previousElementSibling;
        b = Math.min(f(vp.bottom), f(last.getBoundingClientRect().bottom) + HEADROOM);
        a = f(Math.max(vp.top, start.getBoundingClientRect().top));
        if (!lens && fit(a, b).s < MIN_FOCUS_ZOOM) {
          let block = last;
          while ((block == null ? void 0 : block.classList.contains(selectors.followups)) && block.previousElementSibling) block = block.previousElementSibling;
          a = f(Math.max(vp.top, block.getBoundingClientRect().top));
        }
      } else {
        a = 0;
        b = 0.4;
      }
      const cur = viewRef.current;
      const shown = (y) => cur.ty + y * cur.s;
      const cropped = shown(a - PAD / 2) < band.lo || shown(b - HEADROOM / 2) > band.hi;
      const since = performance.now() - movedAt.current;
      if (since < CAMERA_MS) {
        later = window.setTimeout(schedule, CAMERA_MS - since + 20);
        return;
      }
      const next = fit(a, b);
      const same = Math.abs(next.s - cur.s) < 1e-3 && Math.abs(next.ty - cur.ty) < 1e-3;
      if (same) return;
      if (cropped || Math.abs(next.s - cur.s) > 0.15 && since > HOLD_MS && (!fitOnly || next.s > cur.s)) {
        movedAt.current = performance.now();
        setView(next);
      }
    };
    let later = 0;
    const schedule = () => {
      if (!raf) raf = window.setTimeout(settle, 16);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    [...transcript2.children].forEach((c) => ro.observe(c));
    if (foot) ro.observe(foot);
    return () => {
      ro.disconnect();
      window.clearTimeout(raf);
      window.clearTimeout(later);
    };
  }, [mode, band, t.index, t.runKey, !!((_a = t.composer) == null ? void 0 : _a.value), selectors, fitOnly, lens]);
  const [moving, setMoving] = useState(false);
  const prev = useRef(view);
  useEffect(() => {
    if (prev.current.s !== view.s || prev.current.ty !== view.ty) setMoving(true);
    prev.current = view;
  }, [view]);
  const sheetRide = nudge;
  return {
    className: `chat-cam${moving ? " chat-cam--moving" : ""}`,
    ref,
    style: {
      transform: transformFor(view),
      transition: sheetRide ? `transform ${RIDE_MS}ms ${EASE_RIDE}` : `transform ${view === FULL ? PULLBACK_MS : CAMERA_MS}ms ${EASE_MOVE}`
    },
    onTransitionEnd: (e) => {
      if (e.target === e.currentTarget) setMoving(false);
    }
  };
}
const OMEGA = 11;
const CLEARANCE = 32;
function useSmoothFollow(ref, t) {
  useEffect(() => {
    const vp = ref.current;
    if (!vp) return;
    let raf = 0;
    let last = 0;
    let pos = vp.scrollTop;
    let vel = 0;
    const target = () => {
      const lastChild = vp.lastElementChild;
      if (!lastChild) return pos;
      const edge = vp.getBoundingClientRect().bottom - CLEARANCE;
      const over = lastChild.getBoundingClientRect().bottom - edge;
      const max = vp.scrollHeight - vp.clientHeight;
      const scale = vp.getBoundingClientRect().height / vp.clientHeight || 1;
      return Math.min(max, Math.max(pos, vp.scrollTop + over / scale));
    };
    const tick = (now) => {
      const dt = Math.min(0.05, (last ? now - last : 16) / 1e3);
      last = now;
      const goal = target();
      const gap = goal - pos;
      if (Math.abs(gap) < 0.5 && Math.abs(vel) < 5) {
        pos = goal;
        vel = 0;
        vp.scrollTop = pos;
        raf = 0;
        last = 0;
        return;
      }
      vel += (OMEGA * OMEGA * gap - 2 * OMEGA * vel) * dt;
      pos = Math.min(pos + vel * dt, vp.scrollHeight - vp.clientHeight);
      vp.scrollTop = pos;
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (t.reducedMotion) {
        pos = target();
        vp.scrollTop = pos;
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    wake();
    const ro = new ResizeObserver(wake);
    [...vp.children].forEach((c) => ro.observe(c));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [t.index, t.runKey, t.reducedMotion]);
}
const __vite_glob_0_0 = "/images/ai-assistants/v3/assets/amber-and-oak-mark-fxg20Grc.svg";
const __vite_glob_0_1 = "/images/ai-assistants/v3/assets/aura-mark-DpXI8V8Q.svg";
const __vite_glob_0_2 = "/images/ai-assistants/v3/assets/aurelia-mark-Bh18_Lw6.svg";
const __vite_glob_0_3 = "/images/ai-assistants/v3/assets/aurelle-mark-BUbtN7nf.svg";
const __vite_glob_0_4 = "/images/ai-assistants/v3/assets/brewhaus-mark-C30bIvyV.svg";
const __vite_glob_0_5 = "/images/ai-assistants/v3/assets/crestline-mark-BYdfHI0-.svg";
const __vite_glob_0_6 = "/images/ai-assistants/v3/assets/dusklight-mark-e281Q9el.svg";
const __vite_glob_0_7 = "/images/ai-assistants/v3/assets/goodwell-mark-B8uogM9l.svg";
const __vite_glob_0_8 = "/images/ai-assistants/v3/assets/marais-mark-Dtz5V4-o.svg";
const __vite_glob_0_9 = "/images/ai-assistants/v3/assets/moonrest-mark-CqubK1ze.svg";
const __vite_glob_0_10 = "/images/ai-assistants/v3/assets/proteinmax-mark-CAjpFhM5.svg";
const __vite_glob_0_11 = "/images/ai-assistants/v3/assets/sorelle-labs-mark-CQBfsdpQ.svg";
const __vite_glob_0_12 = "/images/ai-assistants/v3/assets/stride-mark-BhAcSYrg.svg";
const __vite_glob_0_13 = "/images/ai-assistants/v3/assets/trailwell-mark-DWHfUX1B.svg";
const __vite_glob_1_0 = "/images/ai-assistants/v3/assets/amber-and-oak-mark-DyBTEnHG.svg";
const __vite_glob_1_1 = "/images/ai-assistants/v3/assets/aurelia-mark-WAhMDRAF.svg";
const __vite_glob_1_2 = "/images/ai-assistants/v3/assets/aurelle-mark-CkALuNbG.svg";
const __vite_glob_1_3 = "/images/ai-assistants/v3/assets/brewhaus-mark-CPBhNKZi.svg";
const __vite_glob_1_4 = "/images/ai-assistants/v3/assets/crestline-mark-x07nlP5x.svg";
const __vite_glob_1_5 = "/images/ai-assistants/v3/assets/dusklight-mark-BxLi6ckI.svg";
const __vite_glob_1_6 = "/images/ai-assistants/v3/assets/moonrest-mark-C1S3y54t.svg";
const __vite_glob_1_7 = "/images/ai-assistants/v3/assets/sorelle-labs-mark-DwV8-BRm.svg";
const goodwellMark = "/images/ai-assistants/v3/assets/goodwell-mark-D2M8-7dz.svg";
const normalise = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
function getBrand(name) {
  const entry = Object.entries(registry).find(
    ([id, brand]) => id === name || normalise(brand.name) === normalise(name)
  );
  if (!entry) throw new Error(`Unregistered demo brand: ${name}`);
  return { id: entry[0], ...entry[1] };
}
function brandStyle(name) {
  const brand = getBrand(name);
  return {
    "--brand-ink": brand.ink,
    "--brand-paper": brand.paper,
    "--brand-plate": brand.plate,
    "--brand-font": brand.font,
    "--brand-tracking": brand.tracking,
    "--brand-case": brand.wordmarkCase
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
  const brand = getBrand(name);
  const supplied = suppliedMarks[`../assets/brands/supplied/${brand.id}-mark.svg`];
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `demo-brand-mark ${className}`,
      style: brandStyle(name),
      "data-brand-id": brand.id,
      "data-identity-asset": supplied ? "supplied" : "placeholder",
      "aria-hidden": "true",
      children: supplied ? /* @__PURE__ */ jsx("img", { className: "demo-brand-mark__supplied", src: supplied, alt: "" }) : brand.id === "aurelle" || brand.id === "goodwell" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: brand.id === "aurelle" ? placeholderMarks["../assets/brands/placeholders/aurelle-mark.svg"] : goodwellMark,
          alt: ""
        }
      ) : placeholderMarks[`../assets/brands/placeholders/${brand.id}-mark.svg`] ? /* @__PURE__ */ jsx(
        "span",
        {
          className: "demo-brand-mark__asset",
          style: {
            maskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand.id}-mark.svg`]}")`,
            WebkitMaskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand.id}-mark.svg`]}")`
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
          children: /* @__PURE__ */ jsx("path", { d: marks[brand.id] })
        }
      )
    }
  );
}
function BrandName({
  brand,
  className = ""
}) {
  const identity = getBrand(brand);
  const displayName = identity.name === identity.name.toUpperCase() ? identity.name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) : identity.name;
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `demo-brand-name ${className}`,
      style: brandStyle(brand),
      "data-brand-id": identity.id,
      children: displayName
    }
  );
}
function BrandWordmark({
  brand,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("span", { className: `demo-brand-wordmark ${className}`, children: [
    /* @__PURE__ */ jsx(BrandMark, { brand }),
    /* @__PURE__ */ jsx(BrandName, { brand })
  ] });
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
const addressIcon = "/images/ai-assistants/v3/assets/address-QPOEXXur.svg";
function ContentFade() {
  return /* @__PURE__ */ jsx("div", { className: "ill-content-fade", "aria-hidden": "true" });
}
const SLOT_H = 520;
({
  items: audenViewedProducts.map((product2) => ({ ...product2, alt: product2.title }))
});
const differentiators = ["Balanced studio sound", "Longest battery life", "Lightest build"];
audenViewedProducts.map((product2, index) => ({
  ...product2,
  name: product2.title,
  differentiator: differentiators[index]
}));
[
  catalog.maraisTailoredTrousers,
  catalog.maraisSneakers
].map(({ id, title, image }) => ({ id, name: title, image }));
const storeName = (brand) => getBrand(brand).name;
const current = {
  ...catalog.hearthwareCompact,
  name: catalog.hearthwareCompact.title,
  capacity: catalog.hearthwareCompact.size
};
const recommended = {
  ...catalog.hearthwareFamily,
  name: catalog.hearthwareFamily.title,
  capacity: catalog.hearthwareFamily.size
};
const script = {
  brand: catalog.brewhausMachine.brand
};
function ComparisonCard({ columns, rows, loading }) {
  return /* @__PURE__ */ jsxs("div", { className: "um2-cmp-wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: loading ? "um2-cmp__skel" : "um2-cmp__skel um2-cmp__skel--hidden", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("span", { className: "um2-cmp__bone um2-cmp__bone--head" }),
      rows.map((_, i) => /* @__PURE__ */ jsx("span", { className: "um2-cmp__bone" }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "um2-cmp", role: "table", children: [
      /* @__PURE__ */ jsxs("div", { className: "um2-cmp__row um2-cmp__row--head", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "columnheader", children: "What matters" }),
        columns.map((c) => /* @__PURE__ */ jsxs("span", { role: "columnheader", className: "um2-cmp__product", children: [
          /* @__PURE__ */ jsx("span", { className: "um2-cmp__thumb", children: /* @__PURE__ */ jsx("img", { src: c.image, alt: "" }) }),
          c.name
        ] }, c.name))
      ] }),
      rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "um2-cmp__row", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "rowheader", children: row.label }),
        row.values.map((v, i) => /* @__PURE__ */ jsx("span", { role: "cell", children: v }, i))
      ] }, row.label)),
      /* @__PURE__ */ jsxs("div", { className: "um2-cmp__row um2-cmp__row--foot", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "rowheader", children: "Details" }),
        columns.map((c) => /* @__PURE__ */ jsxs("span", { role: "cell", className: "um2-cmp__view", children: [
          /* @__PURE__ */ jsx("span", { className: "um2-cmp__view-word", children: "View" }),
          " ",
          /* @__PURE__ */ jsx(ViewOutGlyph, {})
        ] }, c.name))
      ] })
    ] })
  ] });
}
function ViewOutGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", width: 10, height: 10, fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5l5-5M4.5 3.5h4v4" }) });
}
const upsellColumns = [recommended, current];
[
  { label: "Capacity", values: upsellColumns.map((c) => c.capacity) },
  { label: "Price", values: upsellColumns.map((c) => c.price) }
];
({
  brand: storeName(script.brand)
});
const domain = "chatgpt.com";
const promo$1 = { name: "Winter Glow Special", detail: "Free gift on orders over $50" };
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
const placeholder = "Ask anything";
const paths = {
  send: /* @__PURE__ */ jsx("path", { d: "M12 19V5M6.5 10.5L12 5l5.5 5.5" }),
  chevron: /* @__PURE__ */ jsx("path", { d: "M7 10l5 5 5-5" }),
  share: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M12 14V4M8 7.5L12 3.5l4 4" }),
    /* @__PURE__ */ jsx("path", { d: "M5 12.5V18a2 2 0 002 2h10a2 2 0 002-2v-5.5" })
  ] }),
  dots: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "5.5", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ jsx("circle", { cx: "18.5", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" })
  ] }),
  plus: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" }),
  mic: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "9", y: "3.5", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ jsx("path", { d: "M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5" })
  ] }),
  voice: /* @__PURE__ */ jsx("path", { d: "M7 10.5v3M10.33 7.5v9M13.67 9v6M17 10.5v3" }),
  stop: /* @__PURE__ */ jsx("rect", { x: "7.5", y: "7.5", width: "9", height: "9", rx: "1.5", fill: "currentColor", stroke: "none" }),
  copy: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "8.5", y: "8.5", width: "11", height: "11", rx: "2.5" }),
    /* @__PURE__ */ jsx("path", { d: "M15.5 8.5V7a2.5 2.5 0 00-2.5-2.5H7A2.5 2.5 0 004.5 7v6A2.5 2.5 0 007 15.5h1.5" })
  ] }),
  up: /* @__PURE__ */ jsx("path", { d: "M7.5 20.5h-2a1 1 0 01-1-1v-8a1 1 0 011-1h2m0 10V10.5l3.6-6.3a1.6 1.6 0 012.9 1.1l-.6 4.2h4.4a2 2 0 012 2.4l-1.3 6.6a2 2 0 01-2 1.5H7.5z" }),
  down: /* @__PURE__ */ jsx("path", { d: "M16.5 3.5h2a1 1 0 011 1v8a1 1 0 01-1 1h-2m0-10v10l-3.6 6.3a1.6 1.6 0 01-2.9-1.1l.6-4.2H5.2a2 2 0 01-2-2.4l1.3-6.6a2 2 0 012-1.5h10z" }),
  retry: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M19.5 12a7.5 7.5 0 11-2.2-5.3" }),
    /* @__PURE__ */ jsx("path", { d: "M19.5 4.5v3.5H16" })
  ] }),
  gift: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "4", y: "8.5", width: "16", height: "4", rx: "1" }),
    /* @__PURE__ */ jsx("path", { d: "M5.5 12.5V19a1 1 0 001 1h11a1 1 0 001-1v-6.5M12 8.5V20M12 8.5C10.8 5.5 7.5 4.6 7.5 6.6c0 1.6 2.8 1.9 4.5 1.9zm0 0c1.2-3 4.5-3.9 4.5-1.9 0 1.6-2.8 1.9-4.5 1.9z" })
  ] })
};
function Glyph({ name, size = 18 }) {
  return /* @__PURE__ */ jsx("svg", { className: "aia-glyph", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: paths[name] });
}
function Text({ runs }) {
  return /* @__PURE__ */ jsx("p", { className: "aia-reply", children: runs.map((r, i) => typeof r === "string" ? r : /* @__PURE__ */ jsx("strong", { children: r.b }, i)) });
}
function ProductTile({ product: product2, wide = false, media }) {
  return /* @__PURE__ */ jsxs("article", { className: wide ? "aia-tile aia-tile--wide" : "aia-tile", "data-name": `Product / ${product2.name}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "aia-tile__media", children: [
      media ?? /* @__PURE__ */ jsx(ProductImage, { src: product2.image, alt: product2.name }),
      !wide && /* @__PURE__ */ jsx("span", { className: "aia-tile__select" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "aia-tile__name", children: product2.name }),
    /* @__PURE__ */ jsxs("p", { className: "aia-tile__meta", children: [
      product2.price,
      " • ",
      product2.note
    ] }),
    wide && /* @__PURE__ */ jsxs("p", { className: "aia-tile__promo", children: [
      /* @__PURE__ */ jsx(Glyph, { name: "gift", size: 14 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: promo$1.name }),
        " • ",
        promo$1.detail
      ] })
    ] })
  ] });
}
function LoadingTile() {
  return /* @__PURE__ */ jsxs("div", { className: "aia-tile aia-tile--loading", "data-name": "Product / Loading", children: [
    /* @__PURE__ */ jsx("div", { className: "aia-tile__media" }),
    /* @__PURE__ */ jsx("span", { className: "aia-bar", style: { width: "72%" } }),
    /* @__PURE__ */ jsx("span", { className: "aia-bar", style: { width: "88%" } })
  ] });
}
function BrowserBar() {
  return /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome", children: [
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__dots", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ill-browser-chrome__address", children: [
      /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
      /* @__PURE__ */ jsx("span", { children: domain })
    ] })
  ] });
}
function GptHeader() {
  return /* @__PURE__ */ jsxs("header", { className: "aia-header", "data-name": "Header", children: [
    /* @__PURE__ */ jsxs("span", { className: "aia-model", children: [
      "ChatGPT",
      /* @__PURE__ */ jsx(Glyph, { name: "chevron", size: 16 })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "aia-header__end", children: [
      /* @__PURE__ */ jsxs("span", { className: "aia-share", children: [
        /* @__PURE__ */ jsx(Glyph, { name: "share", size: 16 }),
        "Share"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsx(Glyph, { name: "dots", size: 18 }) })
    ] })
  ] });
}
function Composer({ send, value }) {
  return /* @__PURE__ */ jsx("div", { className: "aia-composer", "data-name": "Composer", children: /* @__PURE__ */ jsxs("div", { className: "aia-composer__field", children: [
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsx(Glyph, { name: "plus", size: 20 }) }),
    value ? /* @__PURE__ */ jsx("span", { className: "aia-composer__placeholder aia-composer__value", children: value }) : /* @__PURE__ */ jsx("span", { className: "aia-composer__placeholder", children: placeholder }),
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsx(Glyph, { name: "mic", size: 18 }) }),
    /* @__PURE__ */ jsx("span", { className: "aia-send", children: /* @__PURE__ */ jsx(Glyph, { name: send, size: 18 }, send) })
  ] }) });
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
function useFollowLatest(scrollerRef, {
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
      {
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
function cx(...names) {
  return names.filter(Boolean).join(" ");
}
const STREAM_MS_PER_WORD$2 = 34;
const TOKEN_FADE_MS$2 = 280;
const plain = (runs) => runs.map((r) => typeof r === "string" ? r : r.b).join("");
const words$1 = (runs) => plain(runs).split(/\s+/).filter(Boolean).length;
const streamMs = (runs) => words$1(runs) * STREAM_MS_PER_WORD$2 + TOKEN_FADE_MS$2;
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
function StreamText({ runs, play, msPerWord = STREAM_MS_PER_WORD$2 }) {
  let index = 0;
  const tokens = (text) => text.split(/(\s+)/).map((piece, i) => {
    if (!piece) return null;
    if (/^\s+$/.test(piece)) return /* @__PURE__ */ jsx(Fragment$1, { children: piece }, i);
    const delay = index++ * msPerWord;
    return /* @__PURE__ */ jsx("span", { className: "aiam-token", style: { animationDelay: `${delay}ms` }, children: piece }, i);
  });
  return /* @__PURE__ */ jsx("p", { className: cx("aia-reply aiam-stream", play && "aiam-stream--play"), children: runs.map((r, i) => typeof r === "string" ? /* @__PURE__ */ jsx(Fragment$1, { children: tokens(r) }, i) : /* @__PURE__ */ jsx("strong", { children: tokens(r.b) }, i)) });
}
function TileSlot({ loading, delayMs = 0, children }) {
  const wasLoading = useRef(loading);
  const showCover = loading || wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsxs("div", { className: "aiam-tile-slot", children: [
    children,
    showCover && /* @__PURE__ */ jsx("div", { className: cx("aiam-tile-cover", !loading && "aiam-tile-cover--hidden"), style: { transitionDelay: `${delayMs}ms` }, children: /* @__PURE__ */ jsx(LoadingTile, {}) })
  ] });
}
function Reserved({ show, className, children }) {
  return /* @__PURE__ */ jsx("div", { className: show ? className : "aiam-reserve", "aria-hidden": !show, children });
}
const $$1 = (n) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
const price = (p) => Number(p.price.slice(1));
const product = (p, note, name = p.title) => ({
  id: p.id,
  brand: p.brand,
  name,
  price: price(p),
  note,
  image: p.image
});
const skincare = {
  hydrating: product(catalog.sorelleHydrating, "Daily hydration"),
  calming: product(catalog.sorelleCalming, "Fragrance-free · 30 ml"),
  vitaminC: product(catalog.sorelleVitaminC, "Vitamin C serum")
};
const gifts = [
  product(catalog.aurellePendant, "Gold · necklace"),
  product(catalog.aurelleAnklet, "Gold · anklet"),
  product(catalog.aurelleBracelet, "Gold · bracelet")
];
const machine = product(catalog.brewhausMachine, "Brushed steel");
const kit = product(catalog.brewhausKit, "Three-piece brewing kit");
const sleep = product(catalog.goodwellSleep60, "60 count", "Daily Sleep · 60 count");
const sleepSmall = product(catalog.goodwellSleep28, "28 count", "Daily Sleep · 28 count");
const copy = {
  which: {
    ask: "Which serum should I get for my daily routine?",
    picks: ["Three from Sorelle Labs. For everyday hydration, start with the ", { b: "Daily Hydrating Serum" }, "."],
    why: "Why is the hydrating serum $16 more?",
    because: ["They're different formulas. Choose by your ", { b: "routine" }, ", rather than price alone:"]
  },
  configure: {
    intro: ["The ", { b: "Pro Espresso Machine" }, " is $449. You can add the three-piece brewing kit:"],
    ask: "The espresso machine, with the starter kit.",
    done: ["Selected: the ", { b: "Pro Espresso Machine and brewing kit" }, ". Two items, $514 in total."]
  },
  shortlist: {
    ask: "Shortlist a few gold gifts under $150.",
    picks: ["Three from ", { b: "Aurelle" }, ", all within your budget:"],
    follow: "Which of these is a bracelet?",
    answer: ["The ", { b: "Chain-Link Bracelet" }, ". The others are a necklace and an anklet:"],
    choose: "Choose the Chain-Link Bracelet.",
    chosen: ["Selected: the ", { b: "Chain-Link Bracelet" }, " in Gold, $109."]
  },
  value: {
    ask: "Which Goodwell sleep jar is better value?",
    pick: [{ b: "The 60-count jar" }, " has the lowest price per gummy:"]
  }
};
const statusLine = { which: "Searching Sorelle Labs serums", shortlist: "Searching Aurelle gifts under $150", value: "Comparing Goodwell Daily Sleep jar sizes" };
const helmet$1 = product(catalog.crestlineHelmet, "Graphite · MTB");
const restock = {
  image: helmet$1.image,
  ask: "Tell me when the Graphite helmet in Medium is back.",
  sold: ["The ", { b: "Enduro MTB Helmet in Medium" }, " is out of stock right now:"],
  alternatives: "In stock: Small and Large in Graphite",
  confirm: ["Done. I'll message you here when the ", { b: "Graphite helmet in Medium" }, " is back in stock."],
  when: "Thursday, 9:14 AM",
  back: ["Your size is back at CRESTLINE. The ", { b: "Enduro MTB Helmet in Medium" }, " is still $180."],
  left: "Medium is available again"
};
const priceProduct = { ...product(catalog.aurellePendant, "Gold · teardrop necklace"), was: 149, now: price(catalog.aurellePendant), target: 135 };
const priceWatch = {
  ask: "Let me know when this drops below $135.",
  confirm: ["I'll watch Aurelle's ", { b: "Teardrop Pendant Necklace" }, " and message you below $135. It's $149 today."],
  when: "Monday, 8:02 AM",
  drop: ["The ", { b: "Teardrop Pendant Necklace" }, " is now $129, below your $135 limit. That's $20 off."]
};
const shopper = { name: "Alex Rivera", email: "alex.rivera@hey.com", card: "Visa ··4417" };
const orders = {
  helmet: { id: "CR-19876", item: helmet$1.name, variant: "Graphite · M", price: helmet$1.price, delivered: "Oct 22", returnBy: "Nov 21", image: helmet$1.image },
  pendant: {
    id: "AU-20418",
    item: catalog.aurellePendant.title,
    variant: "Gold",
    extra: "Qty 1",
    price: price(catalog.aurellePendant),
    eta: "Saturday, Oct 31",
    carrier: "UPS ··4821",
    image: catalog.aurellePendant.image,
    steps: [{ label: "Ordered", when: "Oct 26" }, { label: "Shipped", when: "Oct 28" }, { label: "In transit", when: "Today" }, { label: "Delivered", when: "Sat" }],
    at: 2
  }
};
const exchange = { id: "EX-5531", dropBy: "Nov 12", image: helmet$1.image };
const club = { name: "Aurelle Circle", tier: "Gold", since: "2023", benefit: "$25 off jewellery over $100", off: 25, orders: "2 orders · $238 this year" };
const loyaltyProduct = product(catalog.aurellePendant, "Gold");
const cart = {
  machine: { name: machine.name, variant: "Brushed steel", price: machine.price, image: machine.image },
  kit: { name: kit.name, variant: "Three-piece kit", price: kit.price, image: kit.image },
  get total() {
    return this.machine.price + this.kit.price;
  }
};
const mobileCopy = {
  orders: {
    ask: "Where's my order?",
    connect: ["I can check with ", { b: "Aurelle" }, ". Connect your account first. You'll sign in on Aurelle."],
    status: ["Your Teardrop Pendant Necklace is in transit and should arrive ", { b: "Saturday, Oct 31" }, "."]
  },
  exchange: {
    ask: "I'd like to exchange the helmet I bought last week.",
    found: ["Found it: your ", { b: "Enduro MTB Helmet, Graphite, Medium" }, ", delivered Oct 22."],
    eligible: ["It's eligible. Unused helmets can be exchanged or refunded within 30 days of delivery."],
    choose: "Exchange it for the Large one.",
    summary: ["Here's the exchange. Same price, so there's nothing to pay."],
    confirm: "Confirm the exchange.",
    done: ["Approved. Your Large Graphite helmet ships as soon as UPS scans the original."]
  },
  loyalty: {
    ask: "Does my Aurelle Circle benefit apply to this?",
    checking: ["I'll check your Aurelle Circle membership."],
    verified: ["You're a ", { b: "Gold" }, " member, and this necklace qualifies:"],
    applied: ["Your Gold benefit takes ", { b: "$25 off" }, ", so the Teardrop Pendant Necklace is $104."]
  },
  checkout: {
    ask: "Help me buy the espresso machine and brewing kit.",
    found: ["Here are both from ", { b: "BREWHAUS" }, ": the machine is $449 and the three-piece kit is $65."],
    cart: ["I've put them in a BREWHAUS cart:"],
    check: "Check they're both in stock and confirm the total.",
    verified: ["Both are in stock. Your total is ", { b: "$514" }, ", with free shipping. Tax is calculated at checkout."],
    go: "Looks good. Let's check out.",
    handoff: ["Your cart is ready. You'll choose payment on BREWHAUS's checkout; nothing has been charged."]
  }
};
const tile = (p, note = p.note) => ({ id: p.id, name: p.name, price: $$1(p.price), note, image: p.image });
function Row({ p, fact, state }) {
  return /* @__PURE__ */ jsxs("div", { className: state ? `aiv3-row aiv3-row--${state}` : "aiv3-row", "data-name": `Row / ${p.name}`, children: [
    /* @__PURE__ */ jsx(ProductImage, { className: "aiv3-row__thumb", src: p.image, alt: "" }),
    /* @__PURE__ */ jsxs("span", { className: "aiv3-row__text", children: [
      /* @__PURE__ */ jsx("b", { children: p.name }),
      /* @__PURE__ */ jsx("small", { children: fact })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "aiv3-row__price", children: $$1(p.price) }),
    state && /* @__PURE__ */ jsx("span", { className: "aiv3-row__check", children: state === "on" && /* @__PURE__ */ jsx(Check, {}) })
  ] });
}
const Check = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M2.5 6.2l2.3 2.3 4.7-5" }) });
const THREE = [skincare.hydrating, skincare.calming, skincare.vitaminC].map((p) => ({ p, note: p.note }));
const CMP_COLUMNS = [skincare.hydrating, skincare.calming].map((p) => ({ name: `${p === skincare.hydrating ? "Hydrating" : "Calming"} · ${$$1(p.price)}`, image: p.image }));
const CMP_ROWS = [
  { label: "Routine", values: ["Daily hydration", "Gentle care"] },
  { label: "Formula", values: ["Hydrating serum", "Fragrance-free serum"] }
];
function Configurator({ kitOn }) {
  const total = machine.price + (kitOn ? kit.price : 0);
  return /* @__PURE__ */ jsxs("section", { className: "aiv3-config", "data-name": `Configurator / BREWHAUS${kitOn ? " with brewing kit" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "aiv3-config__media", children: /* @__PURE__ */ jsx(ProductImage, { src: machine.image, alt: machine.name }) }),
    /* @__PURE__ */ jsxs("div", { className: "aiv3-config__body", children: [
      /* @__PURE__ */ jsxs("div", { className: "aiv3-config__head", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("b", { children: machine.name }),
          /* @__PURE__ */ jsx("small", { children: "Brushed steel · Qty 1" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "aiv3-config__price", children: $$1(total) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: kitOn ? "aiv3-bundle aiv3-bundle--on" : "aiv3-bundle", "data-name": "Bundle", children: [
        /* @__PURE__ */ jsx(ProductImage, { src: kit.image, alt: kit.name }),
        /* @__PURE__ */ jsxs("span", { className: "aiv3-bundle__text", children: [
          /* @__PURE__ */ jsx("b", { children: "Three-piece brewing kit" }),
          /* @__PURE__ */ jsxs("small", { children: [
            "Frother, reusable filter & starter pack · ",
            $$1(kit.price)
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "aiv3-bundle__box", children: kitOn && /* @__PURE__ */ jsx(Check, {}) })
      ] })
    ] })
  ] });
}
const shortlist = gifts.map((p) => ({ p, note: p.note }));
function ShortlistRows({ picked, selectable = !!picked }) {
  return /* @__PURE__ */ jsx("div", { className: selectable ? "aiv3-rows aiv3-rows--select" : "aiv3-rows", children: shortlist.map(({ p }) => /* @__PURE__ */ jsx(Row, { p, fact: p.note, state: !selectable ? void 0 : picked ? p.id === picked ? "on" : "off" : "idle" }, p.id)) });
}
const Spotlight = () => /* @__PURE__ */ jsxs("article", { className: "aiv3-spot", "data-name": "Recommended / Goodwell Daily Sleep 60 count", children: [
  /* @__PURE__ */ jsx("div", { className: "aiv3-spot__media", children: /* @__PURE__ */ jsx(ProductImage, { src: sleep.image, alt: sleep.name }) }),
  /* @__PURE__ */ jsxs("div", { className: "aiv3-spot__body", children: [
    /* @__PURE__ */ jsxs("p", { className: "aiv3-spot__name", children: [
      sleep.name,
      " ",
      /* @__PURE__ */ jsx("span", { children: $$1(sleep.price) })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "aiv3-spot__facts", children: [
      /* @__PURE__ */ jsx("li", { children: "$0.50 per gummy in the 60-count jar" }),
      /* @__PURE__ */ jsx("li", { children: "The 28-count jar is $0.64 per gummy" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "aiv3-value-note", children: "Same Goodwell formula, compared by jar size." })
  ] })
] });
const Alternatives = () => /* @__PURE__ */ jsx("div", { className: "aiv3-rows aiv3-rows--two", children: /* @__PURE__ */ jsx(Row, { p: sleepSmall, fact: "Goodwell · 28 count" }) });
const Svg$2 = ({ size = 18, children }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children });
const bell = /* @__PURE__ */ jsx("path", { d: "M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15zM10 20.5a2 2 0 004 0" });
const tag = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M3.5 12.5V5a1.5 1.5 0 011.5-1.5h7.5l8 8-9 9z" }),
  /* @__PURE__ */ jsx("circle", { cx: "8.5", cy: "8.5", r: "1.4" })
] });
function Rail() {
  return /* @__PURE__ */ jsxs("nav", { className: "aiv3w-rail", "data-name": "Sidebar (collapsed)", children: [
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsxs(Svg$2, { children: [
      /* @__PURE__ */ jsx("rect", { x: "3.5", y: "4.5", width: "17", height: "15", rx: "3" }),
      /* @__PURE__ */ jsx("path", { d: "M9.5 4.5v15" })
    ] }) }),
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsxs(Svg$2, { children: [
      /* @__PURE__ */ jsx("path", { d: "M12 4.5H7a2.5 2.5 0 00-2.5 2.5v10A2.5 2.5 0 007 19.5h10a2.5 2.5 0 002.5-2.5v-5" }),
      /* @__PURE__ */ jsx("path", { d: "M17.5 4.5l2 2-7 7H10.5v-2z" })
    ] }) }),
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsxs(Svg$2, { children: [
      /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "6" }),
      /* @__PURE__ */ jsx("path", { d: "M20 20l-4.5-4.5" })
    ] }) })
  ] });
}
function Watch({ icon, title, detail, thumb }) {
  return /* @__PURE__ */ jsxs("div", { className: "aiv3w-track", "data-name": "Alert", children: [
    /* @__PURE__ */ jsx("span", { className: "aiv3w-track__icon", children: /* @__PURE__ */ jsx(Svg$2, { size: 16, children: icon }) }),
    /* @__PURE__ */ jsx(ProductImage, { className: "aiv3w-track__thumb", src: thumb, alt: "" }),
    /* @__PURE__ */ jsxs("span", { className: "aiv3w-track__text", children: [
      /* @__PURE__ */ jsx("b", { children: title }),
      /* @__PURE__ */ jsx("small", { children: detail })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "aiv3w-track__status", children: [
      /* @__PURE__ */ jsx("i", {}),
      "Watching"
    ] })
  ] });
}
function Update({ when, icon, label, children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "aiv3w-later", "data-name": "Later", children: when }),
    /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant aiv3w-update", "data-name": "Turn / Assistant (update)", children: [
      /* @__PURE__ */ jsxs("p", { className: "aiv3w-update__label", children: [
        /* @__PURE__ */ jsx(Svg$2, { size: 14, children: icon }),
        label
      ] }),
      children
    ] })
  ] });
}
function StockCard({ inStock }) {
  return /* @__PURE__ */ jsxs("article", { className: inStock ? "aiv3w-card" : "aiv3w-card aiv3w-card--out", "data-name": `Product / CRESTLINE Enduro MTB Helmet Medium / ${inStock ? "In stock" : "Out of stock"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "aiv3w-card__media", children: [
      /* @__PURE__ */ jsx(ProductImage, { src: restock.image, alt: "" }),
      /* @__PURE__ */ jsx("span", { className: inStock ? "aiv3w-badge aiv3w-badge--in" : "aiv3w-badge", children: inStock ? "In stock" : "Out of stock" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "aiv3w-card__body", children: [
      /* @__PURE__ */ jsxs("div", { className: "aiv3w-card__head", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsxs("b", { className: "aiv3-product-name", children: [
            /* @__PURE__ */ jsx(BrandMark, { brand: "crestline" }),
            helmet$1.name
          ] }),
          /* @__PURE__ */ jsx("small", { children: "Graphite · Medium · MTB helmet" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "aiv3w-card__price", children: $$1(helmet$1.price) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cv2-choice__row", "aria-label": "Variant", children: [
        /* @__PURE__ */ jsxs("span", { className: "cv2-swatch cv2-swatch--picked", children: [
          /* @__PURE__ */ jsx("span", { className: "cv2-swatch__dot", style: { background: "#45484b" } }),
          "Graphite"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "aiv3w-card__sep" }),
        ["S", "M", "L"].map((size) => /* @__PURE__ */ jsx("span", { className: size === "M" ? "cv2-seat cv2-seat--picked" : "cv2-seat", children: size }, size))
      ] }),
      inStock ? /* @__PURE__ */ jsxs("div", { className: "aiv3w-card__foot", children: [
        /* @__PURE__ */ jsx("span", { className: "aiv3w-card__note", children: restock.left }),
        /* @__PURE__ */ jsxs("span", { className: "aiv3w-btn", children: [
          "Buy · ",
          $$1(helmet$1.price)
        ] })
      ] }) : /* @__PURE__ */ jsx("p", { className: "aiv3w-card__note", children: restock.alternatives })
    ] })
  ] });
}
const restockWatch = /* @__PURE__ */ jsx(Watch, { icon: bell, title: "Restock alert on", detail: `CRESTLINE · ${helmet$1.name} · Graphite · M · ${$$1(helmet$1.price)}`, thumb: restock.image });
function Viewing() {
  return /* @__PURE__ */ jsxs("div", { className: "aiv3w-ref", "data-name": "Viewing / Aurelle Teardrop Pendant", children: [
    /* @__PURE__ */ jsx(ProductImage, { src: priceProduct.image, alt: "" }),
    /* @__PURE__ */ jsxs("span", { className: "aiv3w-ref__text", children: [
      /* @__PURE__ */ jsx("b", { children: priceProduct.name }),
      /* @__PURE__ */ jsxs("small", { children: [
        "Aurelle · ",
        $$1(priceProduct.was)
      ] })
    ] })
  ] });
}
function PriceCard() {
  return /* @__PURE__ */ jsxs("article", { className: "aiv3w-card aiv3w-card--deal", "data-name": "Product / Aurelle Teardrop Pendant / Price drop", children: [
    /* @__PURE__ */ jsx("div", { className: "aiv3w-card__media", children: /* @__PURE__ */ jsx(ProductImage, { src: priceProduct.image, alt: "" }) }),
    /* @__PURE__ */ jsxs("div", { className: "aiv3w-card__body", children: [
      /* @__PURE__ */ jsx("div", { className: "aiv3w-card__head", children: /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsxs("b", { className: "aiv3-product-name", children: [
          /* @__PURE__ */ jsx(BrandMark, { brand: "aurelle" }),
          priceProduct.name
        ] }),
        /* @__PURE__ */ jsx("small", { children: priceProduct.note })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { className: "aiv3w-deal", children: [
        /* @__PURE__ */ jsx("span", { className: "aiv3w-deal__now", children: $$1(priceProduct.now) }),
        /* @__PURE__ */ jsx("s", { children: $$1(priceProduct.was) }),
        /* @__PURE__ */ jsxs("span", { className: "aiv3w-deal__save", children: [
          "You save ",
          $$1(priceProduct.was - priceProduct.now)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "aiv3w-card__foot", children: [
        /* @__PURE__ */ jsxs("span", { className: "aiv3w-card__note", children: [
          "Your limit was ",
          $$1(priceProduct.target)
        ] }),
        /* @__PURE__ */ jsx("span", { className: "aiv3w-btn", children: "View product" })
      ] })
    ] })
  ] });
}
const priceAlert = /* @__PURE__ */ jsx(Watch, { icon: tag, title: `Watching for price below ${$$1(priceProduct.target)}`, detail: `Aurelle · ${priceProduct.name} · now ${$$1(priceProduct.was)}`, thumb: priceProduct.image });
const SHOWN_ONLY = ".aiam-reserve, .aiam-stream:not(.aiam-stream--play)";
const STREAM_MS_PER_WORD$1 = 45;
const TOKEN_FADE_MS$1 = 220;
const words = (runs) => runs.map((r) => typeof r === "string" ? r : r.b).join("").split(/\s+/).filter(Boolean).length;
const stream$1 = (runs) => words(runs) * STREAM_MS_PER_WORD$1 + TOKEN_FADE_MS$1;
function Frame({ t, busy, name, children }) {
  var _a;
  const scrollRef = useRef(null);
  useFollowLatest(scrollRef, { thread: ".aia-thread", shownOnly: SHOWN_ONLY, index: t.index, reducedMotion: t.reducedMotion });
  const generating = busy.some(([from, to]) => t.passed(from) && !t.reached(to));
  const typed = (_a = t.composer) == null ? void 0 : _a.value;
  const send = generating ? "stop" : typed ? "send" : "voice";
  return /* @__PURE__ */ jsx("div", { className: "aiv3-canvas", children: /* @__PURE__ */ jsxs("div", { className: "aia aiv3 aiam", "data-name": `${name} / Motion`, children: [
    /* @__PURE__ */ jsx(BrowserBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "aia-gpt", "data-name": "ChatGPT", children: [
      /* @__PURE__ */ jsx(GptHeader, {}),
      /* @__PURE__ */ jsx("div", { className: "aia-scroll", "data-name": "Conversation", ref: scrollRef, children: /* @__PURE__ */ jsx("div", { className: "aia-thread", children }) }),
      /* @__PURE__ */ jsx(Composer, { send, value: typed ? /* @__PURE__ */ jsxs(Fragment, { children: [
        typed,
        /* @__PURE__ */ jsx("span", { className: "aiam-caret" })
      ] }) : void 0 })
    ] })
  ] }) });
}
function DesktopFrame({ t, busy, name, children }) {
  var _a;
  const scrollRef = useRef(null);
  useFollowLatest(scrollRef, { thread: ".aia-thread", shownOnly: SHOWN_ONLY, focus: ".aiv3wm-later .aiv3w-update", index: t.index, reducedMotion: t.reducedMotion });
  const generating = busy.some(([from, to]) => t.passed(from) && !t.reached(to));
  const typed = (_a = t.composer) == null ? void 0 : _a.value;
  const send = generating ? "stop" : typed ? "send" : "voice";
  return /* @__PURE__ */ jsx("div", { className: "aiv3w-canvas", children: /* @__PURE__ */ jsxs("div", { className: "aia aiv3 aiv3w aiam", "data-name": `${name} / Motion`, children: [
    /* @__PURE__ */ jsx(BrowserBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "aia-gpt", "data-name": "ChatGPT", children: [
      /* @__PURE__ */ jsx(Rail, {}),
      /* @__PURE__ */ jsx(GptHeader, {}),
      /* @__PURE__ */ jsx("div", { className: "aia-scroll", "data-name": "Conversation", ref: scrollRef, children: /* @__PURE__ */ jsx("div", { className: "aia-thread", children }) }),
      /* @__PURE__ */ jsx(Composer, { send, value: typed ? /* @__PURE__ */ jsxs(Fragment, { children: [
        typed,
        /* @__PURE__ */ jsx("span", { className: "aiam-caret" })
      ] }) : void 0 })
    ] })
  ] }) });
}
function Sent$1({ t, id, text, attach }) {
  if (!t.passed(id)) return null;
  return /* @__PURE__ */ jsxs("div", { className: attach ? "aia-turn aia-turn--user aiv3w-user aiam-send" : "aia-turn aia-turn--user aiam-send", "data-name": "Turn / User", children: [
    attach,
    /* @__PURE__ */ jsx("p", { className: "aia-bubble", children: text })
  ] });
}
function Answer$1({ t, runs, id, status, statusId }) {
  const streaming = t.reached(id);
  return /* @__PURE__ */ jsxs("div", { className: "aiam-slot", children: [
    /* @__PURE__ */ jsx(StreamText, { runs, play: streaming, msPerWord: STREAM_MS_PER_WORD$1 }),
    !streaming && (statusId && t.reached(statusId) ? /* @__PURE__ */ jsx("p", { className: "aia-status aiam-status", children: status }) : /* @__PURE__ */ jsx("span", { className: "aiam-dot" }))
  ] });
}
function Tiles({ t, items, loadId }) {
  return /* @__PURE__ */ jsx("div", { className: "aia-carousel aiv3-tiles", "data-name": "Products", children: items.map(({ p, note }, i) => /* @__PURE__ */ jsx(TileSlot, { loading: !t.reached(loadId), delayMs: i * 110, children: /* @__PURE__ */ jsx(ProductTile, { product: tile(p, note), media: /* @__PURE__ */ jsx(ProductImage, { src: p.image, alt: p.name }) }) }, p.id)) });
}
function Played$1({ beats: beats2, busy, name, children, desktop }) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats2, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: desktop ? /* @__PURE__ */ jsx(DesktopFrame, { t, busy, name, children: children(t) }, t.runKey) : /* @__PURE__ */ jsx(Frame, { t, busy, name, children: children(t) }, t.runKey) });
}
const whichBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.which.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 1800 },
  { id: "reply-1", type: "appear", ms: stream$1(copy.which.picks) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 2200 },
  { id: "why", type: "compose", text: copy.which.why, leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1e3 },
  { id: "reply-2", type: "appear", ms: stream$1(copy.which.because) },
  { id: "table", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3WhichMotion() {
  return /* @__PURE__ */ jsx(Played$1, { beats: whichBeats, busy: [["ask", "read-1"], ["why", "done"]], name: "01 Which one should I get?", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent$1, { t, id: "ask", text: copy.which.ask }),
    t.reached("wait-1") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.which.picks, id: "reply-1", status: statusLine.which, statusId: "search" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("search"), className: "aiam-fade", children: /* @__PURE__ */ jsx(Tiles, { t, items: THREE, loadId: "tiles" }) })
    ] }),
    /* @__PURE__ */ jsx(Sent$1, { t, id: "why", text: copy.which.why }),
    t.reached("wait-2") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.which.because, id: "reply-2" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("reply-2"), className: "aiam-fade", children: /* @__PURE__ */ jsx("div", { className: "aiv3-cmp", children: /* @__PURE__ */ jsx(ComparisonCard, { loading: !t.reached("table"), columns: CMP_COLUMNS, rows: CMP_ROWS }) }) })
    ] })
  ] }) });
}
const configureBeats = [
  { id: "idle", type: "pause", ms: 900 },
  { id: "ask", type: "compose", text: copy.configure.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "reply", type: "appear", ms: stream$1(copy.configure.done) },
  { id: "card", type: "appear", ms: 700 },
  { id: "colour", type: "appear", ms: 700 },
  { id: "kit", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3ConfigureMotion() {
  return /* @__PURE__ */ jsx(Played$1, { beats: configureBeats, busy: [["ask", "done"]], name: "02 The espresso machine, with the starter kit.", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Text, { runs: copy.configure.intro }),
      /* @__PURE__ */ jsx(Configurator, { kitOn: false })
    ] }),
    /* @__PURE__ */ jsx(Sent$1, { t, id: "ask", text: copy.configure.ask }),
    t.reached("wait") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.configure.done, id: "reply" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("card"), className: "aiam-rise", children: /* @__PURE__ */ jsx("div", { className: "aiv3-live", children: /* @__PURE__ */ jsx(Configurator, { kitOn: t.reached("kit") }) }) })
    ] })
  ] }) });
}
const shortlistBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.shortlist.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 1600 },
  { id: "reply-1", type: "appear", ms: stream$1(copy.shortlist.picks) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 1800 },
  { id: "follow", type: "compose", text: copy.shortlist.follow, leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1e3 },
  { id: "reply-2", type: "appear", ms: stream$1(copy.shortlist.answer) },
  { id: "rows-2", type: "appear", ms: 600 },
  { id: "read-2", type: "pause", ms: 2e3 },
  { id: "choose", type: "compose", text: copy.shortlist.choose, leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "rows-3", type: "appear", ms: 700 },
  { id: "pick", type: "appear", ms: 500 },
  { id: "reply-3", type: "appear", ms: stream$1(copy.shortlist.chosen) },
  { id: "done", type: "pause", ms: 300 }
];
function V3ShortlistMotion() {
  return /* @__PURE__ */ jsx(Played$1, { beats: shortlistBeats, busy: [["ask", "read-1"], ["follow", "read-2"], ["choose", "done"]], name: "03 Choose this one.", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent$1, { t, id: "ask", text: copy.shortlist.ask }),
    t.reached("wait-1") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.shortlist.picks, id: "reply-1", status: statusLine.shortlist, statusId: "search" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("search"), className: "aiam-fade", children: /* @__PURE__ */ jsx(Tiles, { t, items: shortlist, loadId: "tiles" }) })
    ] }),
    /* @__PURE__ */ jsx(Sent$1, { t, id: "follow", text: copy.shortlist.follow }),
    t.reached("wait-2") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.shortlist.answer, id: "reply-2" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("rows-2"), className: "aiam-rise", children: /* @__PURE__ */ jsx(ShortlistRows, {}) })
    ] }),
    /* @__PURE__ */ jsx(Sent$1, { t, id: "choose", text: copy.shortlist.choose }),
    t.reached("wait-3") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.shortlist.chosen, id: "reply-3" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("rows-3"), className: "aiam-rise", children: /* @__PURE__ */ jsx("div", { className: "aiv3-live", children: /* @__PURE__ */ jsx(ShortlistRows, { selectable: true, picked: t.reached("pick") ? "bracelet-1" : void 0 }) }) })
    ] })
  ] }) });
}
const valueBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.value.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 1800 },
  { id: "reply", type: "appear", ms: stream$1(copy.value.pick) },
  { id: "spot", type: "appear", ms: 600 },
  { id: "alts", type: "appear", ms: 600 },
  { id: "done", type: "pause", ms: 300 }
];
function V3ValueMotion() {
  return /* @__PURE__ */ jsx(Played$1, { beats: valueBeats, busy: [["ask", "done"]], name: "04 I'm looking for the best value.", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent$1, { t, id: "ask", text: copy.value.ask }),
    t.reached("wait") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: copy.value.pick, id: "reply", status: statusLine.value, statusId: "search" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("spot"), className: "aiam-rise", children: /* @__PURE__ */ jsx(Spotlight, {}) }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("alts"), className: "aiam-rise", children: /* @__PURE__ */ jsx(Alternatives, {}) })
    ] })
  ] }) });
}
const backInStockBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: restock.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "reply", type: "appear", ms: stream$1(restock.sold) },
  { id: "card", type: "appear", ms: 900 },
  { id: "confirm", type: "appear", ms: stream$1(restock.confirm) },
  { id: "watch", type: "appear", ms: 700 },
  { id: "read", type: "pause", ms: 1800 },
  { id: "later", type: "appear", ms: 700 },
  { id: "update", type: "appear", ms: 900 },
  { id: "back", type: "appear", ms: stream$1(restock.back) },
  { id: "in-stock", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3BackInStockMotion() {
  return /* @__PURE__ */ jsx(Played$1, { desktop: true, beats: backInStockBeats, busy: [["ask", "read"]], name: "05 Tell me when my size is back.", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent$1, { t, id: "ask", text: restock.ask }),
    t.reached("wait") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: restock.sold, id: "reply" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("card"), className: "aiam-rise", children: /* @__PURE__ */ jsx(StockCard, { inStock: false }) }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("card"), className: "aiam-fade", children: /* @__PURE__ */ jsx(StreamText, { runs: restock.confirm, play: t.reached("confirm"), msPerWord: STREAM_MS_PER_WORD$1 }) }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("watch"), className: "aiam-rise", children: restockWatch })
    ] }),
    t.reached("later") && /* @__PURE__ */ jsx("div", { className: "aiv3wm-later aiam-fade", children: /* @__PURE__ */ jsxs(Update, { when: restock.when, icon: bell, label: "Restock alert · Enduro MTB Helmet, Graphite, M", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: restock.back, id: "back" }),
      t.reached("back") && /* @__PURE__ */ jsx(Reserved, { show: t.reached("in-stock"), className: "aiam-rise", children: /* @__PURE__ */ jsx(StockCard, { inStock: true }) })
    ] }) })
  ] }) });
}
const priceDropBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: priceWatch.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "confirm", type: "appear", ms: stream$1(priceWatch.confirm) },
  { id: "watch", type: "appear", ms: 700 },
  { id: "read", type: "pause", ms: 1800 },
  { id: "later", type: "appear", ms: 700 },
  { id: "update", type: "appear", ms: 900 },
  { id: "drop", type: "appear", ms: stream$1(priceWatch.drop) },
  { id: "deal", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3PriceDropMotion() {
  return /* @__PURE__ */ jsx(Played$1, { desktop: true, beats: priceDropBeats, busy: [["ask", "read"]], name: "06 Let me know when it drops below my budget.", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent$1, { t, id: "ask", text: priceWatch.ask, attach: /* @__PURE__ */ jsx(Viewing, {}) }),
    t.reached("wait") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: priceWatch.confirm, id: "confirm" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("watch"), className: "aiam-rise", children: priceAlert })
    ] }),
    t.reached("later") && /* @__PURE__ */ jsx("div", { className: "aiv3wm-later aiam-fade", children: /* @__PURE__ */ jsxs(Update, { when: priceWatch.when, icon: tag, label: `Price alert · Teardrop Pendant under ${$$1(priceProduct.target)}`, children: [
      /* @__PURE__ */ jsx(Answer$1, { t, runs: priceWatch.drop, id: "drop" }),
      t.reached("drop") && /* @__PURE__ */ jsx(Reserved, { show: t.reached("deal"), className: "aiam-rise", children: /* @__PURE__ */ jsx(PriceCard, {}) })
    ] }) })
  ] }) });
}
function ConversionAssistanceFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "ill-conversion-assistance-frame", children: /* @__PURE__ */ jsx("div", { className: "ill-conversion-assistance-frame__content", children }) });
}
const { pendant, helmet } = orders;
const Svg$1 = ({ size = 22, sw = 1.8, children }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children });
const lock = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("rect", { x: "5.5", y: "10.5", width: "13", height: "10", rx: "2.5" }),
  /* @__PURE__ */ jsx("path", { d: "M8.5 10.5V8a3.5 3.5 0 017 0v2.5" })
] });
function StatusBar() {
  return /* @__PURE__ */ jsxs("div", { className: "mcp-status", "data-name": "Status bar", children: [
    /* @__PURE__ */ jsx("span", { children: "9:41" }),
    /* @__PURE__ */ jsxs("span", { className: "mcp-status__icons", children: [
      /* @__PURE__ */ jsxs("svg", { width: "18", height: "11", viewBox: "0 0 18 11", "aria-hidden": true, children: [
        /* @__PURE__ */ jsx("rect", { x: "0", y: "7", width: "3", height: "4", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { x: "5", y: "5", width: "3", height: "6", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { x: "10", y: "2.5", width: "3", height: "8.5", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { x: "15", y: "0", width: "3", height: "11", rx: "1" })
      ] }),
      /* @__PURE__ */ jsx("svg", { width: "16", height: "11", viewBox: "0 0 16 11", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 008 .4 10.3 10.3 0 00.8 3.3L2 4.6a8.5 8.5 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 008 4a6.6 6.6 0 00-4.6 1.8l1.2 1.3A4.8 4.8 0 018 5.8zm0 3.6c.4 0 .8.2 1.1.4L8 11 6.9 9.8c.3-.2.7-.4 1.1-.4z" }) }),
      /* @__PURE__ */ jsxs("svg", { width: "26", height: "12", viewBox: "0 0 26 12", "aria-hidden": true, children: [
        /* @__PURE__ */ jsx("rect", { x: ".5", y: ".5", width: "22", height: "11", rx: "3.5", fill: "none", stroke: "currentColor", opacity: ".4" }),
        /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "19", height: "8", rx: "2" }),
        /* @__PURE__ */ jsx("path", { d: "M24 4v4c.8-.3 1.3-1 1.3-2S24.8 4.3 24 4z", opacity: ".4" })
      ] })
    ] })
  ] });
}
function Header() {
  return /* @__PURE__ */ jsxs("header", { className: "mcp-header", "data-name": "Header", children: [
    /* @__PURE__ */ jsx("span", { className: "mcp-icon", children: /* @__PURE__ */ jsx(Svg$1, { children: /* @__PURE__ */ jsx("path", { d: "M4 8h16M4 16h11" }) }) }),
    /* @__PURE__ */ jsxs("span", { className: "mcp-title", children: [
      "ChatGPT",
      /* @__PURE__ */ jsx(Svg$1, { size: 16, sw: 2, children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" }) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "mcp-icon", children: /* @__PURE__ */ jsxs(Svg$1, { children: [
      /* @__PURE__ */ jsx("path", { d: "M12 4.5H7a2.5 2.5 0 00-2.5 2.5v10A2.5 2.5 0 007 19.5h10a2.5 2.5 0 002.5-2.5v-5" }),
      /* @__PURE__ */ jsx("path", { d: "M17.5 4.5l2 2-7 7H10.5v-2z" })
    ] }) })
  ] });
}
function ComposerBar({ value, send = "voice" }) {
  return /* @__PURE__ */ jsxs("div", { className: "mcp-composer", "data-name": "Composer", children: [
    /* @__PURE__ */ jsxs("div", { className: "mcp-composer__row", children: [
      /* @__PURE__ */ jsx("span", { className: "mcp-plus", children: /* @__PURE__ */ jsx(Svg$1, { size: 20, children: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" }) }) }),
      /* @__PURE__ */ jsxs("span", { className: "mcp-field", children: [
        value ? /* @__PURE__ */ jsx("span", { className: "mcp-field__value", children: value }) : /* @__PURE__ */ jsx("span", { className: "mcp-field__ph", children: "Ask anything" }),
        send === "voice" && /* @__PURE__ */ jsxs(Svg$1, { size: 20, children: [
          /* @__PURE__ */ jsx("rect", { x: "9", y: "3.5", width: "6", height: "11", rx: "3" }),
          /* @__PURE__ */ jsx("path", { d: "M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "mcp-voice", children: [
          send === "voice" && /* @__PURE__ */ jsx(Svg$1, { size: 18, sw: 2, children: /* @__PURE__ */ jsx("path", { d: "M7 10.5v3M10.33 7.5v9M13.67 9v6M17 10.5v3" }) }),
          send === "send" && /* @__PURE__ */ jsx(Svg$1, { size: 18, sw: 2.2, children: /* @__PURE__ */ jsx("path", { d: "M12 19V5M6.5 10.5L12 5l5.5 5.5" }) }),
          send === "stop" && /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", "aria-hidden": true, children: /* @__PURE__ */ jsx("rect", { width: "12", height: "12", rx: "2.5", fill: "currentColor" }) })
        ] }, send)
      ] })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "mcp-home" })
  ] });
}
function BrowserSheet({ url, className, children }) {
  return /* @__PURE__ */ jsx("div", { className: className ? `mcp-sheet-layer ${className}` : "mcp-sheet-layer", "data-name": "Browser sheet", children: /* @__PURE__ */ jsxs("div", { className: "mcp-sheet", children: [
    /* @__PURE__ */ jsxs("div", { className: "mcp-sheet__bar", children: [
      /* @__PURE__ */ jsx("span", { className: "mcp-sheet__done", children: "Done" }),
      /* @__PURE__ */ jsxs("span", { className: "mcp-sheet__url", children: [
        /* @__PURE__ */ jsx(Svg$1, { size: 12, sw: 2.2, children: lock }),
        url
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mcp-sheet__more", children: /* @__PURE__ */ jsxs(Svg$1, { size: 18, children: [
        /* @__PURE__ */ jsx("path", { d: "M12 14V4M8 7.5L12 3.5l4 4" }),
        /* @__PURE__ */ jsx("path", { d: "M5 12.5V18a2 2 0 002 2h10a2 2 0 002-2v-5.5" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mcp-sheet__page", children })
  ] }) });
}
const PHONE_W = 390;
const PHONE_H = 844;
const SLOT = Math.round(586 * SLOT_H / 680);
function Framed({ children }) {
  return /* @__PURE__ */ jsx(ConversionAssistanceFrame, { children: /* @__PURE__ */ jsx(ScaleToFit, { contentWidth: PHONE_W, contentHeight: PHONE_H, maxWidth: PHONE_W * SLOT / PHONE_H, maxHeight: SLOT, children }) });
}
function Screen({ name, sheet, composer, className, scrollRef, children }) {
  return /* @__PURE__ */ jsxs("div", { className: ["mcp", sheet && "mcp--sheet", className].filter(Boolean).join(" "), "data-name": name, children: [
    /* @__PURE__ */ jsx(StatusBar, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "aia-scroll mcp-scroll", "data-name": "Conversation", ref: scrollRef, children: /* @__PURE__ */ jsx("div", { className: "aia-thread mcp-thread", children }) }),
    composer ?? /* @__PURE__ */ jsx(ComposerBar, {}),
    sheet
  ] });
}
const User = ({ children, attach }) => /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--user mcp-user", "data-name": "Turn / User", children: [
  attach,
  /* @__PURE__ */ jsx("p", { className: "mcp-bubble", children })
] });
const Mark = ({ size = 18, brand = "aurelle" }) => /* @__PURE__ */ jsx("span", { className: "mcp-mark", style: { width: size, height: size }, children: /* @__PURE__ */ jsx(BrandMark, { brand }) });
function App({ children, name = "aurelle", via }) {
  return /* @__PURE__ */ jsxs("div", { className: "mcp-app", "data-name": `App / ${name}`, children: [
    /* @__PURE__ */ jsxs("p", { className: "mcp-app__label", children: [
      /* @__PURE__ */ jsx(BrandWordmark, { brand: name }),
      via && /* @__PURE__ */ jsx("span", { className: "mcp-app__via", children: "via Crossword" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mcp-card", children })
  ] });
}
const Btn = ({ children, kind = "primary", full, pressed }) => /* @__PURE__ */ jsx("span", { className: `mcp-btn mcp-btn--${kind}${full ? " mcp-btn--full" : ""}${pressed ? " is-pressed" : ""}`, children });
const Actions = ({ children }) => /* @__PURE__ */ jsx("div", { className: "mcp-actions", children });
function Line({ image, title, meta, end, size = 48 }) {
  return /* @__PURE__ */ jsxs("div", { className: "mcp-line", children: [
    /* @__PURE__ */ jsx(ProductImage, { className: "mcp-line__thumb", src: image, alt: "", style: { width: size, height: size } }),
    /* @__PURE__ */ jsxs("span", { className: "mcp-line__text", children: [
      /* @__PURE__ */ jsx("b", { children: title }),
      meta && /* @__PURE__ */ jsx("small", { children: meta })
    ] }),
    end && /* @__PURE__ */ jsx("span", { className: "mcp-line__end", children: end })
  ] });
}
const Badge = ({ tone = "neutral", children }) => /* @__PURE__ */ jsx("span", { className: `mcp-badge mcp-badge--${tone}`, children });
const Ok = ({ children }) => /* @__PURE__ */ jsxs("p", { className: "mcp-ok", children: [
  /* @__PURE__ */ jsx("span", { className: "mcp-ok__dot", children: /* @__PURE__ */ jsx(Check, {}) }),
  children
] });
const Rows = ({ rows }) => /* @__PURE__ */ jsx("dl", { className: "mcp-rows", children: rows.map(([k, v, tone], i) => /* @__PURE__ */ jsxs("div", { className: tone ? `mcp-rows__row mcp-rows__row--${tone}` : "mcp-rows__row", children: [
  /* @__PURE__ */ jsx("dt", { children: k }),
  /* @__PURE__ */ jsx("dd", { children: v })
] }, i)) });
const Connected = () => /* @__PURE__ */ jsxs("p", { className: "mcp-system", "data-name": "Connected", children: [
  /* @__PURE__ */ jsx(Mark, { size: 16 }),
  "Connected to Aurelle as ",
  shopper.email
] });
function ConnectCard({ pressed }) {
  return /* @__PURE__ */ jsxs(App, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mcp-connect", children: [
      /* @__PURE__ */ jsx(Mark, { size: 36 }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mcp-card__title", children: "Connect Aurelle" }),
        /* @__PURE__ */ jsx("p", { className: "mcp-card__meta", children: "Lets ChatGPT see your orders, returns and Aurelle Circle benefits. You'll sign in on aurelle.com." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Actions, { children: [
      /* @__PURE__ */ jsx(Btn, { kind: "secondary", children: "Not now" }),
      /* @__PURE__ */ jsx(Btn, { pressed, children: "Connect" })
    ] })
  ] });
}
function OrderCard() {
  return /* @__PURE__ */ jsxs(App, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mcp-card__head", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Order #",
        pendant.id
      ] }),
      /* @__PURE__ */ jsx(Badge, { tone: "blue", children: "In transit" })
    ] }),
    /* @__PURE__ */ jsx(Line, { image: pendant.image, title: `${pendant.item} · ${pendant.variant}`, meta: `${pendant.extra} · ${$$1(pendant.price)}` }),
    /* @__PURE__ */ jsxs("p", { className: "mcp-eta", children: [
      /* @__PURE__ */ jsx("small", { children: "Estimated delivery" }),
      /* @__PURE__ */ jsx("b", { children: pendant.eta })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "mcp-steps", "data-name": "Tracking progress", children: pendant.steps.map((s, i) => /* @__PURE__ */ jsxs("li", { className: i < pendant.at ? "is-done" : i === pendant.at ? "is-now" : "", children: [
      /* @__PURE__ */ jsx("i", {}),
      s.label,
      /* @__PURE__ */ jsx("small", { children: s.when })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("p", { className: "mcp-card__meta", children: [
      pendant.carrier,
      " · Last scan: Louisville, KY, 6:12 AM"
    ] }),
    /* @__PURE__ */ jsxs(Actions, { children: [
      /* @__PURE__ */ jsx(Btn, { kind: "secondary", children: "Get help" }),
      /* @__PURE__ */ jsx(Btn, { children: "Track package" })
    ] })
  ] });
}
function AuthPage({ pressed }) {
  return /* @__PURE__ */ jsxs("div", { className: "mcp-auth", children: [
    /* @__PURE__ */ jsx(Mark, { size: 44 }),
    /* @__PURE__ */ jsx("p", { className: "mcp-auth__title", children: "Connect to ChatGPT" }),
    /* @__PURE__ */ jsxs("p", { className: "mcp-auth__sub", children: [
      "Signed in as ",
      /* @__PURE__ */ jsx("b", { children: shopper.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mcp-auth__perms", children: [
      /* @__PURE__ */ jsx("p", { children: "ChatGPT will be able to:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "View your orders and tracking" }),
        /* @__PURE__ */ jsx("li", { children: "Start returns and exchanges" }),
        /* @__PURE__ */ jsx("li", { children: "See your Aurelle Circle status and benefits" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mcp-auth__fine", children: "ChatGPT can't see your password or saved payment methods. You can disconnect any time in Aurelle settings." })
    ] }),
    /* @__PURE__ */ jsx(Btn, { full: true, pressed, children: "Allow" }),
    /* @__PURE__ */ jsx(Btn, { kind: "secondary", full: true, children: "Cancel" })
  ] });
}
const helmetLine = /* @__PURE__ */ jsx(Line, { image: helmet.image, title: `${helmet.item} · ${helmet.variant}`, meta: `Order #${helmet.id} · Delivered ${helmet.delivered}`, end: $$1(helmet.price) });
function Plates({ picked }) {
  const plate = (id, title, meta) => /* @__PURE__ */ jsxs("div", { className: picked === id ? "mcp-plate is-picked" : picked ? "mcp-plate is-off" : "mcp-plate", children: [
    /* @__PURE__ */ jsx("span", { className: "mcp-plate__radio" }),
    /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx("b", { children: title }),
      /* @__PURE__ */ jsx("small", { children: meta })
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "mcp-plates", children: [
    plate("exchange", "Exchange", "Another size · free"),
    plate("refund", "Refund", `${$$1(helmet.price)} to ${shopper.card} · 5–7 days after we receive it`)
  ] });
}
function SizeRow() {
  return /* @__PURE__ */ jsx("div", { className: "cv2-choice__row mcp-swatches", "aria-label": "Helmet size", children: ["S", "M", "L"].map((size) => /* @__PURE__ */ jsx("span", { className: size === "L" ? "cv2-seat cv2-seat--picked" : "cv2-seat", children: size }, size)) });
}
function FoundCard() {
  return /* @__PURE__ */ jsx(App, { name: "crestline", children: helmetLine });
}
function EligibilityCard({ picked }) {
  return /* @__PURE__ */ jsxs(App, { name: "crestline", children: [
    helmetLine,
    /* @__PURE__ */ jsxs(Ok, { children: [
      "Eligible for exchange or refund until ",
      helmet.returnBy
    ] }),
    /* @__PURE__ */ jsx(Plates, { picked })
  ] });
}
function ExchangeCard({ pressed }) {
  return /* @__PURE__ */ jsxs(App, { name: "crestline", children: [
    /* @__PURE__ */ jsx("p", { className: "mcp-card__title", children: "Exchange" }),
    /* @__PURE__ */ jsx(SizeRow, {}),
    /* @__PURE__ */ jsx(Rows, { rows: [
      ["Send back", `Enduro MTB Helmet · Graphite · M`],
      ["You'll get", `Enduro MTB Helmet · Graphite · L`],
      ["Price difference", "$0.00"]
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mcp-note", children: "Needs: the original back, unused, within 14 days with the prepaid UPS label. The Large ships once it's scanned." }),
    /* @__PURE__ */ jsxs(Actions, { children: [
      /* @__PURE__ */ jsx(Btn, { kind: "secondary", children: "Change" }),
      /* @__PURE__ */ jsx(Btn, { pressed, children: "Confirm exchange" })
    ] })
  ] });
}
function ApprovedCard() {
  return /* @__PURE__ */ jsxs(App, { name: "crestline", children: [
    /* @__PURE__ */ jsxs("p", { className: "mcp-band", children: [
      /* @__PURE__ */ jsx("span", { className: "mcp-ok__dot", children: /* @__PURE__ */ jsx(Check, {}) }),
      "Exchange approved · #",
      exchange.id
    ] }),
    /* @__PURE__ */ jsx(Line, { size: 40, image: helmet.image, title: "Return: Enduro MTB Helmet · Graphite · M", meta: `Drop off at any UPS store by ${exchange.dropBy}` }),
    /* @__PURE__ */ jsx(Line, { size: 40, image: exchange.image, title: "Replacement: Enduro MTB Helmet · Graphite · L", meta: "Ships when the return is scanned", end: "$0.00" }),
    /* @__PURE__ */ jsxs("p", { className: "mcp-note", children: [
      "Order #",
      helmet.id,
      " · Confirmation sent to ",
      shopper.email
    ] }),
    /* @__PURE__ */ jsxs(Actions, { children: [
      /* @__PURE__ */ jsx(Btn, { kind: "secondary", children: "Get help" }),
      /* @__PURE__ */ jsx(Btn, { children: "Return label" })
    ] })
  ] });
}
const viewing = /* @__PURE__ */ jsxs("div", { className: "mcp-ref", "data-name": "Viewing / Aurelle Teardrop Pendant", children: [
  /* @__PURE__ */ jsx(ProductImage, { src: loyaltyProduct.image, alt: "" }),
  /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx("b", { children: loyaltyProduct.name }),
    /* @__PURE__ */ jsxs("small", { children: [
      loyaltyProduct.note,
      " · ",
      $$1(loyaltyProduct.price)
    ] })
  ] })
] });
function ClubCard() {
  return /* @__PURE__ */ jsxs(App, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mcp-club", children: [
      /* @__PURE__ */ jsx("span", { className: "mcp-club__tier", children: club.tier }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("b", { children: club.name }),
        /* @__PURE__ */ jsxs("small", { children: [
          shopper.name,
          " · member since ",
          club.since
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Rows, { rows: [
      ["Membership", "Active", "green"],
      ["Purchases", club.orders],
      ["Benefit", club.benefit],
      ["Teardrop Pendant · $129", "Qualifies", "green"]
    ] })
  ] });
}
const checkingLine = "Checking membership with Aurelle";
function BenefitCard() {
  return /* @__PURE__ */ jsxs(App, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mcp-hero", children: [
      /* @__PURE__ */ jsxs("div", { className: "mcp-hero__media", children: [
        /* @__PURE__ */ jsx(ProductImage, { src: loyaltyProduct.image, alt: "" }),
        /* @__PURE__ */ jsx(Badge, { tone: "green", children: "Aurelle Circle" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mcp-card__title", children: [
        loyaltyProduct.name,
        /* @__PURE__ */ jsxs("small", { children: [
          loyaltyProduct.note,
          " · In stock"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mcp-price", children: [
        /* @__PURE__ */ jsx("b", { children: $$1(loyaltyProduct.price - club.off) }),
        /* @__PURE__ */ jsx("s", { children: $$1(loyaltyProduct.price) }),
        /* @__PURE__ */ jsxs("span", { children: [
          "You save ",
          $$1(club.off)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Actions, { children: [
      /* @__PURE__ */ jsx(Btn, { kind: "secondary", children: "Details" }),
      /* @__PURE__ */ jsxs(Btn, { children: [
        "Add to cart · ",
        $$1(loyaltyProduct.price - club.off)
      ] })
    ] })
  ] });
}
function Duo() {
  return /* @__PURE__ */ jsx(App, { name: "brewhaus", children: /* @__PURE__ */ jsxs("div", { className: "mcp-duo", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mcp-duo__media", children: /* @__PURE__ */ jsx(ProductImage, { src: cart.machine.image, alt: "" }) }),
      /* @__PURE__ */ jsx("b", { children: cart.machine.name }),
      /* @__PURE__ */ jsxs("small", { children: [
        cart.machine.variant,
        " · ",
        $$1(cart.machine.price)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mcp-duo__media", children: /* @__PURE__ */ jsx(ProductImage, { src: cart.kit.image, alt: "" }) }),
      /* @__PURE__ */ jsx("b", { children: cart.kit.name }),
      /* @__PURE__ */ jsxs("small", { children: [
        $$1(cart.kit.price),
        " · Three-piece kit"
      ] })
    ] })
  ] }) });
}
function CartLines() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Line, { image: cart.machine.image, title: cart.machine.name, meta: `${cart.machine.variant} · Qty 1`, end: $$1(cart.machine.price) }),
    /* @__PURE__ */ jsx(Line, { image: cart.kit.image, title: cart.kit.name, meta: `${cart.kit.variant} · Qty 1`, end: $$1(cart.kit.price) })
  ] });
}
function CartCard() {
  return /* @__PURE__ */ jsxs(App, { name: "brewhaus", children: [
    /* @__PURE__ */ jsxs("p", { className: "mcp-card__head", children: [
      /* @__PURE__ */ jsx("span", { children: "Your BREWHAUS cart" }),
      /* @__PURE__ */ jsx(Badge, { children: "2 items" })
    ] }),
    /* @__PURE__ */ jsx(CartLines, {}),
    /* @__PURE__ */ jsx(Rows, { rows: [["Subtotal", $$1(cart.machine.price + cart.kit.price), "total"]] })
  ] });
}
function SummaryCard() {
  return /* @__PURE__ */ jsxs(App, { name: "brewhaus", children: [
    /* @__PURE__ */ jsx(CartLines, {}),
    /* @__PURE__ */ jsx(Ok, { children: "Both in stock · ships tomorrow" }),
    /* @__PURE__ */ jsx(Rows, { rows: [
      ["Machine", $$1(cart.machine.price)],
      ["Three-piece brewing kit", $$1(cart.kit.price)],
      ["Shipping", "Free"],
      ["Total", $$1(cart.total), "total"]
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mcp-note", children: "Tax is calculated at checkout." })
  ] });
}
function HandoffCard({ pressed }) {
  return /* @__PURE__ */ jsxs(App, { name: "brewhaus", children: [
    /* @__PURE__ */ jsxs("p", { className: "mcp-card__head", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "2 items · Total ",
        $$1(cart.total)
      ] }),
      /* @__PURE__ */ jsx(Badge, { tone: "green", children: "Ready to buy" })
    ] }),
    /* @__PURE__ */ jsx(Btn, { full: true, pressed, children: "Continue to checkout" }),
    /* @__PURE__ */ jsxs("p", { className: "mcp-note mcp-note--center", children: [
      /* @__PURE__ */ jsx(Svg$1, { size: 12, sw: 2.2, children: lock }),
      "Opens checkout.brewhaus.com"
    ] })
  ] });
}
function CheckoutPage() {
  return /* @__PURE__ */ jsxs("div", { className: "mcp-co", children: [
    /* @__PURE__ */ jsxs("p", { className: "mcp-co__brand", children: [
      /* @__PURE__ */ jsx(Mark, { size: 24, brand: "brewhaus" }),
      "BREWHAUS checkout"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mcp-co__block", children: [
      /* @__PURE__ */ jsx(CartLines, {}),
      /* @__PURE__ */ jsx(Rows, { rows: [["Total", $$1(cart.total), "total"]] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mcp-co__block", children: [
      /* @__PURE__ */ jsx("p", { className: "mcp-co__h", children: "Ship to" }),
      /* @__PURE__ */ jsxs("p", { className: "mcp-co__v", children: [
        shopper.name,
        " · 214 Alder St, Portland, OR"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mcp-co__block", children: [
      /* @__PURE__ */ jsx("p", { className: "mcp-co__h", children: "Payment" }),
      /* @__PURE__ */ jsx("p", { className: "mcp-co__empty", children: "Choose a payment method" })
    ] })
  ] });
}
const STREAM_MS_PER_WORD = 45;
const TOKEN_FADE_MS = 220;
const stream = (runs) => runs.map((r) => typeof r === "string" ? r : r.b).join("").split(/\s+/).filter(Boolean).length * STREAM_MS_PER_WORD + TOKEN_FADE_MS;
const TAP_MS = 450;
const SHEET_MS = 450;
const CAMERA_SELECTORS = {
  transcript: ".mcp-thread",
  viewport: ".mcp-scroll",
  foot: ".mcp-composer",
  user: ".aiam-send",
  attach: "mcp-ref",
  followups: "mcp-followups"
};
const cameraWide = (id) => ({ id: `camera-wide-${id}`, type: "pause", ms: PULLBACK_MS + 150 });
function Played({ beats: beats2, busy, name, sheet, release, wide, children }) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const played = useCameraBeats(beats2, true, false, release);
  const [finished, setFinished] = useState(false);
  const t = useChatTimeline(played, finished || landed && fontsReady);
  useEffect(() => {
    if (t.done && !t.reducedMotion) setFinished(true);
  }, [t.done, t.reducedMotion]);
  const cam = useChatCamera(t, true, "", false, false, release, { selectors: CAMERA_SELECTORS, wide: wide == null ? void 0 : wide(t), fitOnly: true, lens: ZOOM_CLOSE });
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Framed, { children: /* @__PURE__ */ jsx("div", { ref: cam.ref, className: cam.className, style: cam.style, onTransitionEnd: cam.onTransitionEnd, children: /* @__PURE__ */ jsx(Scene, { t, busy, name, sheet, children }, t.runKey) }) }) });
}
function Scene({ t, busy, name, sheet, children }) {
  var _a;
  const scrollRef = useRef(null);
  useSmoothFollow(scrollRef, t);
  const typed = (_a = t.composer) == null ? void 0 : _a.value;
  const working = busy.some(([from, to]) => t.passed(from) && !t.reached(to));
  return /* @__PURE__ */ jsx(
    Screen,
    {
      name: `${name} / Motion`,
      className: "aiam mcpm",
      scrollRef,
      sheet: sheet == null ? void 0 : sheet(t),
      composer: /* @__PURE__ */ jsx(ComposerBar, { send: working ? "stop" : typed ? "send" : "voice", value: typed ? /* @__PURE__ */ jsxs(Fragment, { children: [
        typed,
        /* @__PURE__ */ jsx("span", { className: "aiam-caret" })
      ] }) : void 0 }),
      children: children(t)
    }
  );
}
function Sent({ show, children, attach }) {
  if (!show) return null;
  return /* @__PURE__ */ jsx("div", { className: "aiam-send", children: /* @__PURE__ */ jsx(User, { attach, children }) });
}
function Answer({ t, runs, id, status, statusId }) {
  const streaming = t.reached(id);
  return /* @__PURE__ */ jsxs("div", { className: "aiam-slot", children: [
    /* @__PURE__ */ jsx(StreamText, { runs, play: streaming, msPerWord: STREAM_MS_PER_WORD }),
    !streaming && (statusId && t.reached(statusId) ? /* @__PURE__ */ jsx("p", { className: "aia-status aiam-status", children: status }) : /* @__PURE__ */ jsx("span", { className: "aiam-dot" }))
  ] });
}
const Turn = ({ children }) => /* @__PURE__ */ jsx("div", { className: "aia-turn aia-turn--assistant mcp-reply", "data-name": "Turn / Assistant", children });
function Sheet({ t, url, inId, outId, children }) {
  if (!t.reached(inId) || outId && t.passed(outId)) return null;
  return /* @__PURE__ */ jsx(BrowserSheet, { url, className: outId && t.reached(outId) ? "mcpm-sheet--out" : "mcpm-sheet--in", children });
}
const orderBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: mobileCopy.orders.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 800 },
  { id: "reply-1", type: "appear", ms: stream(mobileCopy.orders.connect) },
  { id: "connect", type: "appear", ms: 500 },
  { id: "read-1", type: "pause", ms: 1400 },
  { id: "tap-connect", type: "appear", ms: TAP_MS },
  cameraWide("sheet"),
  { id: "sheet", type: "appear", ms: SHEET_MS },
  { id: "read-auth", type: "pause", ms: 2e3 },
  { id: "tap-allow", type: "appear", ms: TAP_MS },
  { id: "sheet-out", type: "appear", ms: 380 },
  { id: "connected", type: "appear", ms: 500 },
  { id: "search", type: "appear", ms: 1400 },
  { id: "reply-2", type: "appear", ms: stream(mobileCopy.orders.status) },
  { id: "order", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3OrderStatusMotion() {
  return /* @__PURE__ */ jsx(
    Played,
    {
      beats: orderBeats,
      busy: [["ask", "read-1"], ["sheet-out", "done"]],
      name: "07 Where's my order?",
      wide: (t) => t.reached("camera-wide-sheet") && !t.reached("connected"),
      sheet: (t) => /* @__PURE__ */ jsx(Sheet, { t, url: "accounts.aurelle.com", inId: "sheet", outId: "sheet-out", children: /* @__PURE__ */ jsx(AuthPage, { pressed: t.reached("tap-allow") }) }),
      children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Sent, { show: t.passed("ask"), children: mobileCopy.orders.ask }),
        t.reached("wait-1") && /* @__PURE__ */ jsxs(Turn, { children: [
          /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.orders.connect, id: "reply-1" }),
          /* @__PURE__ */ jsx(Reserved, { show: t.reached("connect"), className: "aiam-rise", children: /* @__PURE__ */ jsx(ConnectCard, { pressed: t.reached("tap-connect") && !t.reached("connected") }) })
        ] }),
        t.reached("connected") && /* @__PURE__ */ jsx("div", { className: "aiam-fade", children: /* @__PURE__ */ jsx(Connected, {}) }),
        t.reached("search") && /* @__PURE__ */ jsxs(Turn, { children: [
          /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.orders.status, id: "reply-2", status: "Checking your Aurelle orders", statusId: "search" }),
          /* @__PURE__ */ jsx(Reserved, { show: t.reached("order"), className: "aiam-rise", children: /* @__PURE__ */ jsx(OrderCard, {}) })
        ] })
      ] })
    }
  );
}
const exchangeBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: mobileCopy.exchange.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 800 },
  { id: "search", type: "appear", ms: 1200 },
  { id: "reply-1", type: "appear", ms: stream(mobileCopy.exchange.found) },
  { id: "found", type: "appear", ms: 600 },
  { id: "reply-2", type: "appear", ms: stream(mobileCopy.exchange.eligible) },
  { id: "eligible", type: "appear", ms: 600 },
  { id: "read-2", type: "pause", ms: 1800 },
  { id: "choose", type: "compose", text: mobileCopy.exchange.choose, leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "reply-3", type: "appear", ms: stream(mobileCopy.exchange.summary) },
  { id: "exchange", type: "appear", ms: 600 },
  { id: "read-3", type: "pause", ms: 2e3 },
  { id: "tap-confirm", type: "appear", ms: TAP_MS },
  { id: "confirm", type: "appear", ms: 400 },
  { id: "wait-4", type: "appear", ms: 900 },
  { id: "reply-4", type: "appear", ms: stream(mobileCopy.exchange.done) },
  { id: "approved", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3ExchangeMotion() {
  return /* @__PURE__ */ jsx(Played, { beats: exchangeBeats, busy: [["ask", "read-2"], ["choose", "read-3"], ["confirm", "done"]], name: "08 I need an exchange or refund.", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent, { show: t.passed("ask"), children: mobileCopy.exchange.ask }),
    t.reached("wait-1") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.exchange.found, id: "reply-1", status: "Looking up your CRESTLINE orders", statusId: "search" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("found"), className: "aiam-rise", children: /* @__PURE__ */ jsx(FoundCard, {}) })
    ] }),
    t.reached("reply-2") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.exchange.eligible, id: "reply-2" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("eligible"), className: "aiam-rise", children: /* @__PURE__ */ jsx("div", { className: "mcpm-live", children: /* @__PURE__ */ jsx(EligibilityCard, { picked: t.passed("choose") ? "exchange" : void 0 }) }) })
    ] }),
    /* @__PURE__ */ jsx(Sent, { show: t.passed("choose"), children: mobileCopy.exchange.choose }),
    t.reached("wait-3") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.exchange.summary, id: "reply-3" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("exchange"), className: "aiam-rise", children: /* @__PURE__ */ jsx(ExchangeCard, { pressed: t.reached("tap-confirm") && !t.reached("wait-4") }) })
    ] }),
    /* @__PURE__ */ jsx(Sent, { show: t.reached("confirm"), children: mobileCopy.exchange.confirm }),
    t.reached("wait-4") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.exchange.done, id: "reply-4" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("approved"), className: "aiam-rise", children: /* @__PURE__ */ jsx(ApprovedCard, {}) })
    ] })
  ] }) });
}
const loyaltyBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: mobileCopy.loyalty.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 700 },
  { id: "reply-1", type: "appear", ms: stream(mobileCopy.loyalty.checking) },
  { id: "checking", type: "appear", ms: 1800 },
  { id: "connected", type: "appear", ms: 500 },
  { id: "reply-2", type: "appear", ms: stream(mobileCopy.loyalty.verified) },
  { id: "club", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 2e3 },
  { id: "reply-3", type: "appear", ms: stream(mobileCopy.loyalty.applied) },
  { id: "benefit", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function V3LoyaltyMotion() {
  return /* @__PURE__ */ jsx(Played, { beats: loyaltyBeats, busy: [["ask", "done"]], name: "09 Does my loyalty benefit apply?", children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Sent, { show: t.passed("ask"), attach: viewing, children: mobileCopy.loyalty.ask }),
    t.reached("wait-1") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.loyalty.checking, id: "reply-1" }),
      t.reached("checking") && !t.reached("connected") && /* @__PURE__ */ jsx("p", { className: "aia-status mcp-checking aiam-status-line", children: checkingLine })
    ] }),
    t.reached("connected") && /* @__PURE__ */ jsx("div", { className: "aiam-fade", children: /* @__PURE__ */ jsx(Connected, {}) }),
    t.reached("connected") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.loyalty.verified, id: "reply-2" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("club"), className: "aiam-rise", children: /* @__PURE__ */ jsx(ClubCard, {}) })
    ] }),
    t.reached("reply-3") && /* @__PURE__ */ jsxs(Turn, { children: [
      /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.loyalty.applied, id: "reply-3" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("benefit"), className: "aiam-rise", children: /* @__PURE__ */ jsx(BenefitCard, {}) })
    ] })
  ] }) });
}
const checkoutBeats = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: mobileCopy.checkout.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 800 },
  { id: "reply-1", type: "appear", ms: stream(mobileCopy.checkout.found) },
  { id: "duo", type: "appear", ms: 600 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "reply-2", type: "appear", ms: stream(mobileCopy.checkout.cart) },
  { id: "cart", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 1600 },
  { id: "check", type: "compose", text: mobileCopy.checkout.check, leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 700 },
  { id: "search", type: "appear", ms: 1300 },
  { id: "reply-3", type: "appear", ms: stream(mobileCopy.checkout.verified) },
  { id: "summary", type: "appear", ms: 700 },
  { id: "read-3", type: "pause", ms: 2e3 },
  { id: "go", type: "compose", text: mobileCopy.checkout.go, leadMs: 300 },
  { id: "wait-4", type: "appear", ms: 700 },
  { id: "reply-4", type: "appear", ms: stream(mobileCopy.checkout.handoff) },
  { id: "handoff", type: "appear", ms: 600 },
  { id: "read-4", type: "pause", ms: 1e3 },
  { id: "tap-continue", type: "appear", ms: TAP_MS },
  { id: "sheet", type: "appear", ms: SHEET_MS },
  { id: "done", type: "pause", ms: 300 }
];
function V3CheckoutMotion() {
  return /* @__PURE__ */ jsx(
    Played,
    {
      beats: checkoutBeats,
      busy: [["ask", "read-2"], ["check", "read-3"], ["go", "read-4"]],
      name: "10 Help me buy these.",
      release: "sheet",
      sheet: (t) => /* @__PURE__ */ jsx(Sheet, { t, url: "checkout.brewhaus.com", inId: "sheet", children: /* @__PURE__ */ jsx(CheckoutPage, {}) }),
      children: (t) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Sent, { show: t.passed("ask"), children: mobileCopy.checkout.ask }),
        t.reached("wait-1") && /* @__PURE__ */ jsxs(Turn, { children: [
          /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.checkout.found, id: "reply-1" }),
          /* @__PURE__ */ jsx(Reserved, { show: t.reached("duo"), className: "aiam-rise", children: /* @__PURE__ */ jsx(Duo, {}) })
        ] }),
        t.reached("reply-2") && /* @__PURE__ */ jsxs(Turn, { children: [
          /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.checkout.cart, id: "reply-2" }),
          /* @__PURE__ */ jsx(Reserved, { show: t.reached("cart"), className: "aiam-rise", children: /* @__PURE__ */ jsx(CartCard, {}) })
        ] }),
        /* @__PURE__ */ jsx(Sent, { show: t.passed("check"), children: mobileCopy.checkout.check }),
        t.reached("wait-3") && /* @__PURE__ */ jsxs(Turn, { children: [
          /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.checkout.verified, id: "reply-3", status: "Checking stock and offers with BREWHAUS", statusId: "search" }),
          /* @__PURE__ */ jsx(Reserved, { show: t.reached("summary"), className: "aiam-rise", children: /* @__PURE__ */ jsx(SummaryCard, {}) })
        ] }),
        /* @__PURE__ */ jsx(Sent, { show: t.passed("go"), children: mobileCopy.checkout.go }),
        t.reached("wait-4") && /* @__PURE__ */ jsxs(Turn, { children: [
          /* @__PURE__ */ jsx(Answer, { t, runs: mobileCopy.checkout.handoff, id: "reply-4" }),
          /* @__PURE__ */ jsx(Reserved, { show: t.reached("handoff"), className: "aiam-rise", children: /* @__PURE__ */ jsx(HandoffCard, { pressed: t.reached("tap-continue") }) })
        ] })
      ] })
    }
  );
}
const googleDriveLogo = "/images/ai-assistants/v3/assets/google-drive-uvUIXsl8.svg";
const googleCalendarLogo = "/images/ai-assistants/v3/assets/google-calendar-Bc_DHD3m.svg";
const spotifyLogo = "/images/ai-assistants/v3/assets/spotify-Bi4nWFff.svg";
const slackLogo = "/images/ai-assistants/v3/assets/slack-DXaIYxxr.svg";
const gmailLogo = "/images/ai-assistants/v3/assets/gmail-DlqByDbM.svg";
const githubLogo = "/images/ai-assistants/v3/assets/github-CNRpK5S6.svg";
const figmaLogo = "/images/ai-assistants/v3/assets/figma-DAzM0q7q.svg";
const Svg = ({ size = 18, children }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children });
const chevron = /* @__PURE__ */ jsx(Svg, { size: 14, children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" }) });
const plug = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3.5" }),
  /* @__PURE__ */ jsx("path", { d: "M15.5 12v1.5a2.5 2.5 0 005 0V12a8.5 8.5 0 10-3.3 6.7" })
] });
const compose = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M12 4.5H7a2.5 2.5 0 00-2.5 2.5v10A2.5 2.5 0 007 19.5h10a2.5 2.5 0 002.5-2.5v-5" }),
  /* @__PURE__ */ jsx("path", { d: "M17.5 4.5l2 2-7 7H10.5v-2z" })
] });
const search = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "6" }),
  /* @__PURE__ */ jsx("path", { d: "M20 20l-4.5-4.5" })
] });
const installed = [
  { name: "Google Drive", logo: googleDriveLogo },
  { name: "Google Calendar", logo: googleCalendarLogo },
  { name: "Spotify", logo: spotifyLogo },
  { name: "Slack", logo: slackLogo },
  { name: "Gmail", logo: gmailLogo },
  { name: "GitHub", logo: githubLogo },
  { name: "Figma", logo: figmaLogo }
];
const prompts = ["Help me choose a serum for my daily routine.", "Compare moisturisers under $55."];
function V3AppDetail({ className, mweb = false } = {}) {
  const name = mweb ? "11m · Your brand, inside ChatGPT (mweb)" : "11 · Your brand, inside ChatGPT";
  return /* @__PURE__ */ jsx("section", { className: "aiv3-section", "data-name": name, children: /* @__PURE__ */ jsxs("figure", { className: "aiv3-figure", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "app-stage__tile-label", children: name }),
    /* @__PURE__ */ jsx("div", { className: mweb ? "aiv3w-canvas apd-canvas apd-canvas--mweb" : "aiv3w-canvas apd-canvas", children: /* @__PURE__ */ jsxs("div", { className: className ? `aia aiv3 aiv3w apd ${className}` : "aia aiv3 aiv3w apd", "data-name": name, children: [
      /* @__PURE__ */ jsx(BrowserBar, {}),
      /* @__PURE__ */ jsx("div", { className: "aia-gpt apd-page", "data-name": "ChatGPT / Plugin detail", children: /* @__PURE__ */ jsxs("div", { className: "apd-vp", children: [
        /* @__PURE__ */ jsxs("nav", { className: "apd-rail", "data-name": "Sidebar (collapsed)", children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsxs(Svg, { children: [
            /* @__PURE__ */ jsx("rect", { x: "3.5", y: "4.5", width: "17", height: "15", rx: "3" }),
            /* @__PURE__ */ jsx("path", { d: "M9.5 4.5v15" })
          ] }) }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Svg, { children: compose }) }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Svg, { children: search }) }),
          /* @__PURE__ */ jsx("span", { className: "is-on", children: /* @__PURE__ */ jsx(Svg, { children: plug }) })
        ] }),
        /* @__PURE__ */ jsxs("nav", { className: "apd-side", "data-name": "Customize", children: [
          /* @__PURE__ */ jsxs("p", { className: "apd-side__title", children: [
            "Customize",
            /* @__PURE__ */ jsx(Svg, { children: search })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "apd-nav", children: [
            /* @__PURE__ */ jsx(Svg, { children: plug }),
            "Plugins"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "apd-nav", children: [
            /* @__PURE__ */ jsxs(Svg, { children: [
              /* @__PURE__ */ jsx("path", { d: "M12 3.5l7.5 4.25v8.5L12 20.5l-7.5-4.25v-8.5z" }),
              /* @__PURE__ */ jsx("path", { d: "M12 12l7.5-4.25M12 12v8.5M12 12L4.5 7.75" })
            ] }),
            "Skills"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "apd-side__group", children: "Installed" }),
          installed.map(({ name: name2, logo }) => /* @__PURE__ */ jsxs("p", { className: "apd-nav", children: [
            /* @__PURE__ */ jsx("img", { className: "apd-tile", src: logo, alt: "" }),
            name2
          ] }, name2)),
          /* @__PURE__ */ jsxs("p", { className: "apd-nav is-on", children: [
            /* @__PURE__ */ jsx(Mark, { brand: "sorelle-labs", size: 18 }),
            "Sorelle Labs"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("main", { className: "apd-main", children: [
          /* @__PURE__ */ jsxs("p", { className: "apd-crumbs", children: [
            "Plugins",
            chevron,
            "Shopping",
            chevron,
            /* @__PURE__ */ jsx("b", { children: "Sorelle Labs" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "apd-col", children: [
            /* @__PURE__ */ jsx(Mark, { brand: "sorelle-labs", size: 64 }),
            /* @__PURE__ */ jsxs("div", { className: "apd-id", children: [
              /* @__PURE__ */ jsx("b", { children: "Sorelle Labs" }),
              /* @__PURE__ */ jsxs("span", { className: "apd-id__end", children: [
                /* @__PURE__ */ jsx("span", { className: "apd-more", children: /* @__PURE__ */ jsxs(Svg, { children: [
                  /* @__PURE__ */ jsx("circle", { cx: "5.5", cy: "12", r: "1" }),
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1" }),
                  /* @__PURE__ */ jsx("circle", { cx: "18.5", cy: "12", r: "1" })
                ] }) }),
                /* @__PURE__ */ jsxs("span", { className: "apd-btn", children: [
                  /* @__PURE__ */ jsxs(Svg, { size: 16, children: [
                    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
                    /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" })
                  ] }),
                  "Manage"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "apd-btn apd-btn--primary", children: [
                  /* @__PURE__ */ jsx(Svg, { size: 16, children: compose }),
                  "Try now"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "apd-tagline", children: "Shop serums, moisturisers and daily skincare." }),
            /* @__PURE__ */ jsx("div", { className: "apd-hero", "data-name": "Suggested prompts", children: prompts.map((p) => /* @__PURE__ */ jsxs("p", { className: "apd-prompt", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsxs("span", { className: "apd-prompt__app", children: [
                  /* @__PURE__ */ jsx(Mark, { brand: "sorelle-labs", size: 16 }),
                  "Sorelle Labs"
                ] }),
                " ",
                p
              ] }),
              /* @__PURE__ */ jsx("span", { className: "apd-prompt__go", children: /* @__PURE__ */ jsx(Svg, { size: 16, children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" }) }) })
            ] }, p)) }),
            /* @__PURE__ */ jsx("p", { className: "apd-copy", children: "Sorelle Labs makes serums, moisturisers and skincare regimens. Products, stock and prices come from Sorelle Labs's catalog; for warranty and return details, see each product page. Responses are powered by ChatGPT." }),
            /* @__PURE__ */ jsx("p", { className: "apd-copy", children: `By clicking "Connect", you agree to Sorelle Labs's Terms of Use and Privacy Policy.` }),
            /* @__PURE__ */ jsxs("p", { className: "apd-h", children: [
              "Apps ",
              /* @__PURE__ */ jsx("span", { children: "1" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "apd-app", "data-name": "Installed app", children: [
              /* @__PURE__ */ jsx(Mark, { brand: "sorelle-labs", size: 32 }),
              /* @__PURE__ */ jsxs("span", { className: "apd-app__text", children: [
                /* @__PURE__ */ jsx("b", { children: "Sorelle Labs" }),
                /* @__PURE__ */ jsx("small", { children: "Find, compare and buy Sorelle Labs skincare, and track your orders." })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "apd-status", children: [
                /* @__PURE__ */ jsx("i", {}),
                "Connected",
                /* @__PURE__ */ jsx(Svg, { size: 16, children: /* @__PURE__ */ jsx("path", { d: "M7 10l5 5 5-5" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "apd-h", children: "Information" }),
            /* @__PURE__ */ jsxs("dl", { className: "apd-info", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Developer" }),
                /* @__PURE__ */ jsx("dd", { children: "Sorelle Labs Inc." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Category" }),
                /* @__PURE__ */ jsx("dd", { children: "Shopping" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Website" }),
                /* @__PURE__ */ jsx("dd", { children: "sorellelabs.com" })
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }) })
  ] }) });
}
function V3AppDetailMotion({ mweb = false } = {}) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const [run, setRun] = useState(0);
  const playing = landed && fontsReady;
  useEffect(() => {
    if (playing) setRun((r) => r + 1);
  }, [playing]);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(V3AppDetail, { mweb, className: playing ? "apdm apdm--play" : "apdm" }, run) });
}
function V3AppDetailMwebMotion() {
  return /* @__PURE__ */ jsx(V3AppDetailMotion, { mweb: true });
}
const audiencesBg = "/images/ai-assistants/v3/assets/audiences_bg_3x-CeMPiv1g.webp";
const returnReductionBg = "/images/ai-assistants/v3/assets/return_reduction_bg_3x-PTzwbPCJ.webp";
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
const orgMark = "/images/ai-assistants/v3/assets/org-mark-Alk5D-x9.svg";
const priyaRaman = "/images/ai-assistants/v3/assets/priya-raman-CMwZrsBD.svg";
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
      /* @__PURE__ */ jsx("img", { className: "la-rail__logo la-rail__logo--mark", src: orgMark, alt: "" }),
      /* @__PURE__ */ jsx("div", { className: "la-rail__group", children: ["house", "cube", "headset", "chartBar"].map((n) => /* @__PURE__ */ jsx("span", { className: n === railActive ? "la-rail__item la-rail__item--active" : "la-rail__item", children: /* @__PURE__ */ jsx(Ph, { name: n }) }, n)) }),
      /* @__PURE__ */ jsxs("div", { className: "la-rail__group la-rail__group--end", children: [
        ["search", "bell", "gear"].map((n) => /* @__PURE__ */ jsx("span", { className: "la-rail__item", children: /* @__PURE__ */ jsx(Ph, { name: n }) }, n)),
        /* @__PURE__ */ jsx("span", { className: "la-rail__rule" }),
        /* @__PURE__ */ jsx("span", { className: "la-rail__item", children: /* @__PURE__ */ jsx("img", { className: "la-rail__me", src: priyaRaman, alt: "" }) })
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
const chatGptInsights = {
  query: "What did shoppers do in ChatGPT this week?",
  thought: "Thought for 3s",
  card: {
    title: "Sorelle Labs · Last 7 days",
    metrics: [
      { label: "AI conversations", value: "1,284" },
      { label: "Carts created", value: "312" },
      { label: "Orders placed", value: "146" },
      { label: "Attributed revenue", value: "$8,920" }
    ],
    recentLabel: "Recent from ChatGPT",
    interactions: [
      { shopper: "Maya R.", request: "Moisturizer for dry skin under $50", outcome: "Ordered", amount: "$55", age: "12m" },
      { shopper: "Jordan K.", request: "Gentle cleanser for sensitive skin", outcome: "In cart", amount: "$28", age: "40m" },
      { shopper: "Aisha B.", request: "Is the Vitamin C serum fragrance-free?", outcome: "Answered", amount: "", age: "1h" },
      { shopper: "Leo T.", request: "An SPF that sits well under makeup", outcome: "Ordered", amount: "$34", age: "2h" }
    ]
  },
  journey: {
    shopper: "Maya R.",
    meta: "ChatGPT · Today, 2:14 pm",
    steps: [
      { kind: "asked", label: "Asked", text: "“Moisturizer for dry skin, under $50?”", link: "Conversation" },
      {
        kind: "recommended",
        label: "Recommended",
        product: { name: "Deep Hydration Cream", price: "$42", image: catalog.sorelleCream.image },
        link: "Product"
      },
      {
        kind: "chose",
        label: "Chose instead",
        product: { name: "Deep Hydration Set", price: "$55", image: catalog.sorelleSet.image },
        link: "Cart"
      },
      { kind: "ordered", label: "Order completed", text: "Free gift applied · $55", link: "Order #SL-20481" }
    ]
  },
  saved: [
    "Which products do shoppers ask ChatGPT about most?",
    "Show conversations that ended without a cart."
  ],
  recent: [
    { text: "Top requests for dry skin this month", age: "1d" },
    { text: "How did the Hydration Set launch perform?", age: "3d" }
  ]
};
const beats = [
  { id: "ask", type: "compose", text: chatGptInsights.query, leadMs: 900 },
  { id: "think", type: "think", labels: ["Thinking", "Reading ChatGPT conversations"] },
  { id: "card", type: "load", ms: 900 },
  { id: "metrics", type: "appear", ms: 600 },
  { id: "interactions", type: "appear", ms: 700 },
  { id: "step-1", type: "appear", ms: 450 },
  { id: "step-2", type: "appear", ms: 450 },
  { id: "step-3", type: "appear", ms: 450 },
  { id: "step-4", type: "appear", ms: 600 }
];
const PATHS = {
  openAi: "M224.32,114.24a56,56,0,0,0-60.07-76.57A56,56,0,0,0,67.93,51.44a56,56,0,0,0-36.25,90.32A56,56,0,0,0,69,217,56.39,56.39,0,0,0,83.59,219a55.75,55.75,0,0,0,8.17-.61,56,56,0,0,0,96.31-13.78,56,56,0,0,0,36.25-90.32ZM182.85,54.43a40,40,0,0,1,28.56,48c-.95-.63-1.91-1.24-2.91-1.81L164,74.88a8,8,0,0,0-8,0l-44,25.41V81.81l40.5-23.38A39.76,39.76,0,0,1,182.85,54.43ZM144,137.24l-16,9.24-16-9.24V118.76l16-9.24,16,9.24ZM80,72a40,40,0,0,1,67.53-29c-1,.51-2,1-3,1.62L100,70.27a8,8,0,0,0-4,6.92V128l-16-9.24ZM40.86,86.93A39.75,39.75,0,0,1,64.12,68.57C64.05,69.71,64,70.85,64,72v51.38a8,8,0,0,0,4,6.93l44,25.4L96,165,55.5,141.57A40,40,0,0,1,40.86,86.93ZM73.15,201.57a40,40,0,0,1-28.56-48c.95.63,1.91,1.24,2.91,1.81L92,181.12a8,8,0,0,0,8,0l44-25.41v18.48l-40.5,23.38A39.76,39.76,0,0,1,73.15,201.57ZM176,184a40,40,0,0,1-67.52,29.05c1-.51,2-1.05,3-1.63L156,185.73a8,8,0,0,0,4-6.92V128l16,9.24Zm39.14-14.93a39.75,39.75,0,0,1-23.26,18.36c.07-1.14.12-2.28.12-3.43V132.62a8,8,0,0,0-4-6.93l-44-25.4,16-9.24,40.5,23.38A40,40,0,0,1,215.14,169.07Z",
  chat: "M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z",
  sparkle: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z",
  cart: "M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z",
  gift: "M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z",
  arrowUpRight: "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
};
function Icon({ name, className }) {
  return /* @__PURE__ */ jsx("svg", { className: ["la-icon", className].filter(Boolean).join(" "), viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: PATHS[name] }) });
}
const STEP_ICONS = {
  asked: /* @__PURE__ */ jsx(Icon, { name: "chat" }),
  recommended: /* @__PURE__ */ jsx(Icon, { name: "sparkle" }),
  chose: /* @__PURE__ */ jsx(Icon, { name: "cart" }),
  ordered: /* @__PURE__ */ jsx(Icon, { name: "gift" })
};
const rise = (shown) => shown ? "cgi-rise" : "cgi-rise cgi-rise--pending";
function ChatGptChip() {
  return /* @__PURE__ */ jsxs("span", { className: "la-tag cgi-source", children: [
    /* @__PURE__ */ jsx(Icon, { name: "openAi" }),
    "ChatGPT"
  ] });
}
function ResultCard({ v }) {
  const c = chatGptInsights.card;
  const j = chatGptInsights.journey;
  return /* @__PURE__ */ jsxs("div", { className: ["la-card cgi-card", v.animate && "la-enter"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs("header", { className: "la-card__head", children: [
      /* @__PURE__ */ jsx(ChatGptChip, {}),
      /* @__PURE__ */ jsx("span", { className: "la-card__title", children: c.title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "cgi-metrics", "data-beat": "metrics", children: c.metrics.map((m, i) => /* @__PURE__ */ jsxs("div", { className: `cgi-metric ${rise(v.metrics)}`, style: { "--i": i }, children: [
      /* @__PURE__ */ jsx("span", { className: "cgi-metric__label", children: m.label }),
      /* @__PURE__ */ jsx("span", { className: "cgi-metric__value", children: m.value })
    ] }, m.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "cgi-body", children: [
      /* @__PURE__ */ jsxs("section", { className: "cgi-recent", "data-beat": "interactions", children: [
        /* @__PURE__ */ jsx("p", { className: "la-card__label", children: c.recentLabel }),
        c.interactions.map((r, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `cgi-int ${rise(v.interactions)}${i === 0 && v.steps > 0 ? " cgi-int--open" : ""}`,
            style: { "--i": i },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "cgi-int__top", children: [
                /* @__PURE__ */ jsx("span", { className: "cgi-int__who", children: r.shopper }),
                /* @__PURE__ */ jsx("span", { className: "cgi-int__age", children: r.age })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "cgi-int__request", children: r.request }),
              /* @__PURE__ */ jsxs("span", { className: `la-tag cgi-outcome cgi-outcome--${r.outcome === "Ordered" ? "won" : "open"}`, children: [
                r.outcome,
                r.amount && /* @__PURE__ */ jsx("span", { className: "cgi-outcome__amount", children: r.amount })
              ] })
            ]
          },
          r.shopper
        ))
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "cgi-journey", "data-beat": "journey", children: [
        /* @__PURE__ */ jsxs("div", { className: `cgi-journey__head ${rise(v.steps > 0)}`, children: [
          /* @__PURE__ */ jsx("span", { className: "cgi-int__who", children: j.shopper }),
          /* @__PURE__ */ jsx("span", { className: "la-muted", children: j.meta })
        ] }),
        /* @__PURE__ */ jsx("ol", { className: `cgi-steps${v.steps > 0 ? "" : " cgi-steps--pending"}`, children: j.steps.map((st, i) => /* @__PURE__ */ jsxs("li", { className: `cgi-step cgi-step--${st.kind} ${rise(v.steps > i)}`, "data-beat": `step-${i + 1}`, children: [
          /* @__PURE__ */ jsx("span", { className: "cgi-step__dot", children: STEP_ICONS[st.kind] }),
          /* @__PURE__ */ jsxs("div", { className: "cgi-step__body", children: [
            /* @__PURE__ */ jsx("span", { className: "cgi-step__label", children: st.label }),
            st.product ? /* @__PURE__ */ jsxs("span", { className: "cgi-step__product", children: [
              /* @__PURE__ */ jsx("img", { src: st.product.image, alt: "" }),
              /* @__PURE__ */ jsx("span", { className: "cgi-step__name", children: st.product.name }),
              /* @__PURE__ */ jsx("span", { className: "cgi-step__price", children: st.product.price })
            ] }) : /* @__PURE__ */ jsx("span", { className: "cgi-step__text", children: st.text })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "cgi-link", children: [
            st.link,
            /* @__PURE__ */ jsx(Icon, { name: "arrowUpRight" })
          ] })
        ] }, st.kind)) })
      ] })
    ] }),
    v.animate && /* @__PURE__ */ jsxs("div", { className: `la-skeleton${v.cardLoading ? "" : " la-skeleton--hidden"}`, "aria-hidden": true, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 280, height: 14 } }),
      /* @__PURE__ */ jsx("span", { style: { width: "100%", height: 48 } }),
      /* @__PURE__ */ jsx("span", { style: { width: 520, height: 20 } }),
      /* @__PURE__ */ jsx("span", { style: { width: 440, height: 20 } }),
      /* @__PURE__ */ jsx("span", { style: { width: 360, height: 20 } })
    ] })
  ] });
}
function Dashboard({ v, stageRef, runKey, mweb = false }) {
  const enter = v.animate ? " la-enter" : "";
  const frame = /* @__PURE__ */ jsx(
    InsightsFrame,
    {
      bare: mweb,
      compact: mweb,
      className: "cgi",
      saved: chatGptInsights.saved,
      recent: chatGptInsights.recent,
      active: v.sent ? chatGptInsights.query : void 0,
      activeEnter: v.animate,
      stageRef: mweb ? void 0 : stageRef,
      runKey,
      children: /* @__PURE__ */ jsxs("section", { className: "la-chat", children: [
        mweb && /* @__PURE__ */ jsxs("header", { className: "la-fit__head", children: [
          /* @__PURE__ */ jsx("span", { className: "la-serif la-fit__title", children: "Insights" }),
          v.sent && /* @__PURE__ */ jsx("span", { className: `la-fit__crumb${v.animate ? " la-fade" : ""}`, children: chatGptInsights.query })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "la-thread", children: [
          v.sent && /* @__PURE__ */ jsx("div", { className: `la-user${enter}`, children: /* @__PURE__ */ jsx("p", { children: chatGptInsights.query }) }),
          v.sent && /* @__PURE__ */ jsx("div", { className: "la-thought cgi-thought", children: v.thinking ? /* @__PURE__ */ jsx(
            "span",
            {
              className: ["la-thinking", v.animate && "la-thinking--live", !v.thinking.visible && "la-thinking--out"].filter(Boolean).join(" "),
              children: v.thinking.label
            },
            v.thinking.label
          ) : v.thought && /* @__PURE__ */ jsxs("span", { className: `la-thought__done${v.animate ? " la-fade" : ""}`, children: [
            chatGptInsights.thought,
            /* @__PURE__ */ jsx(Ph, { name: "caretRight" })
          ] }) }),
          v.card && /* @__PURE__ */ jsx(ResultCard, { v })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "la-composer", children: [
          /* @__PURE__ */ jsx("div", { className: "la-composer__text", children: v.composer ? /* @__PURE__ */ jsxs(Fragment, { children: [
            v.composer,
            v.typing && /* @__PURE__ */ jsx("span", { className: "la-caret" })
          ] }) : /* @__PURE__ */ jsx("span", { className: "la-composer__placeholder", children: "Ask about your visitors..." }) }),
          /* @__PURE__ */ jsxs("div", { className: "la-composer__foot", children: [
            /* @__PURE__ */ jsxs("span", { className: "la-upload", children: [
              /* @__PURE__ */ jsx(Ph, { name: "plus" }),
              "Upload file"
            ] }),
            /* @__PURE__ */ jsx("span", { className: `la-send${v.composer ? " la-send--ready" : ""}`, children: /* @__PURE__ */ jsx(Ph, { name: "send" }) })
          ] })
        ] })
      ] })
    }
  );
  return mweb ? /* @__PURE__ */ jsx("figure", { className: "la-fit-figure", ref: stageRef, children: /* @__PURE__ */ jsx("div", { className: "la-fit-canvas", children: /* @__PURE__ */ jsx("div", { className: "la-fit", children: frame }) }) }) : frame;
}
function ChatGptInsightsMotion({ mweb = false } = {}) {
  var _a;
  const stageRef = useRef(null);
  const t = useChatTimeline(beats, useLandedOnScreen(stageRef));
  const v = {
    sent: t.passed("ask"),
    composer: ((_a = t.composer) == null ? void 0 : _a.value) ?? "",
    typing: !!t.composer,
    thinking: t.status("think"),
    thought: t.passed("think"),
    card: t.reached("card"),
    cardLoading: t.loading("card"),
    metrics: t.reached("metrics"),
    interactions: t.reached("interactions"),
    steps: [1, 2, 3, 4].filter((n) => t.reached(`step-${n}`)).length,
    animate: !t.reducedMotion
  };
  return /* @__PURE__ */ jsx(Dashboard, { v, stageRef, runKey: t.runKey, mweb });
}
function ChatGptInsightsMwebMotion() {
  return /* @__PURE__ */ jsx(ChatGptInsightsMotion, { mweb: true });
}
const V3InsightsMotion = () => /* @__PURE__ */ jsx(ChatGptInsightsMotion, {});
const V3InsightsMwebMotion = () => /* @__PURE__ */ jsx(ChatGptInsightsMwebMotion, {});
const bag = (p) => ({
  id: p.id,
  name: p.title,
  size: p.size ?? "",
  color: p.color ?? "",
  price: Number(p.price.slice(1)),
  image: p.image
});
const bags = {
  overnight: bag(catalog.trailwellOvernight),
  weekender: bag(catalog.trailwellWeekender),
  roam: bag(catalog.trailwellRoam)
};
const $ = (n) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
const upgrade = {
  ask: "A Trailwell carry-on under $200?",
  reply: "For $30 more, the Roam Pro lasts longer:",
  from: { ...bags.roam, note: "In your budget" },
  to: { name: "Roam Pro", size: "40L", price: 219, image: bags.roam.image, note: "Upgrade pick" },
  benefits: ["A pound lighter, at 2.1 lb", "Lifetime warranty, up from 5 years"]
};
const promo = {
  ask: "Show me small Trailwell carry-ons.",
  reply: "The Overnight is in Trailwell’s Fall sale:",
  bag: bags.overnight,
  price: 112,
  was: 132,
  offer: "Fall Getaway · 15% off",
  why: "Store-only offer · applied at checkout",
  conditions: "Through Nov 30 · one per order · US orders only"
};
const launches = {
  ask: "Travel gear for a weekend trip?",
  reply: "Trailwell’s new arrival and best seller:",
  launch: { bag: bags.weekender, tag: "New" },
  bestSeller: { bag: bags.roam, tag: "Best seller" },
  conditions: "Free shipping on the Fall collection · US only"
};
const LAYOUT_W = 390;
const WINDOW_W = 292;
const WINDOW_H = 338;
const LAYOUT_H = Math.round(WINDOW_H * LAYOUT_W / WINDOW_W);
function Compact({ name, children }) {
  const ref = useRef(null);
  const onScreen = useLandedOnScreen(ref);
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    if (onScreen) setLanded(true);
  }, [onScreen]);
  return /* @__PURE__ */ jsxs("figure", { className: "aiv3-figure", "data-name": name, children: [
    /* @__PURE__ */ jsx("figcaption", { className: "app-stage__tile-label", children: name }),
    /* @__PURE__ */ jsx("div", { className: `apu-canvas${landed ? " is-landed" : ""}`, ref, children: /* @__PURE__ */ jsx("div", { className: "apu-window", children: /* @__PURE__ */ jsx(ScaleToFit, { contentWidth: LAYOUT_W, contentHeight: LAYOUT_H, maxWidth: WINDOW_W, maxHeight: WINDOW_H, children: /* @__PURE__ */ jsxs("div", { className: "mcp apu", style: { height: LAYOUT_H }, "data-name": `${name} / ChatGPT`, children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "aia-scroll mcp-scroll", "data-name": "Conversation", children: /* @__PURE__ */ jsx("div", { className: "aia-thread mcp-thread", children }) }),
      /* @__PURE__ */ jsx(ComposerBar, {})
    ] }) }) }) })
  ] });
}
const Reply = ({ children }) => /* @__PURE__ */ jsx("div", { className: "aia-turn aia-turn--assistant mcp-reply", "data-name": "Turn / Assistant", children });
const Price = ({ now, was }) => /* @__PURE__ */ jsxs("span", { className: "apu-price", children: [
  /* @__PURE__ */ jsx("b", { children: $(now) }),
  was && /* @__PURE__ */ jsx("s", { children: $(was) })
] });
function V3PromoUpgrade() {
  const u = upgrade;
  return /* @__PURE__ */ jsxs(Compact, { name: "12 — Promotions & Upselling: Upgrades that make sense", children: [
    /* @__PURE__ */ jsx(User, { children: u.ask }),
    /* @__PURE__ */ jsxs(Reply, { children: [
      /* @__PURE__ */ jsx("p", { className: "apu-text", children: u.reply }),
      /* @__PURE__ */ jsxs(App, { name: "trailwell", via: true, children: [
        /* @__PURE__ */ jsxs("div", { className: "apu-compare", "data-name": "Upgrade", children: [
          /* @__PURE__ */ jsxs("div", { className: "apu-opt", children: [
            /* @__PURE__ */ jsx(ProductImage, { className: "apu-thumb", src: u.from.image, alt: "" }),
            /* @__PURE__ */ jsxs("span", { className: "apu-opt__text", children: [
              /* @__PURE__ */ jsx("b", { children: u.from.name }),
              /* @__PURE__ */ jsxs("small", { children: [
                u.from.size,
                " · ",
                u.from.note
              ] })
            ] }),
            /* @__PURE__ */ jsx(Price, { now: u.from.price })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "apu-opt apu-opt--pick", children: [
            /* @__PURE__ */ jsx(ProductImage, { className: "apu-thumb", src: u.to.image, alt: "" }),
            /* @__PURE__ */ jsxs("span", { className: "apu-opt__text", children: [
              /* @__PURE__ */ jsx("b", { children: u.to.name }),
              /* @__PURE__ */ jsxs("small", { children: [
                u.to.size,
                " · ",
                u.to.note
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "apu-opt__end", children: [
              /* @__PURE__ */ jsx(Price, { now: u.to.price }),
              /* @__PURE__ */ jsxs(Badge, { tone: "green", children: [
                "+",
                $(u.to.price - u.from.price)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "apu-benefits", children: u.benefits.map((b) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(Check, {}),
          b
        ] }, b)) })
      ] })
    ] })
  ] });
}
function V3PromoOffer() {
  const p = promo;
  return /* @__PURE__ */ jsxs(Compact, { name: "13 — Promotions & Upselling: Offers shoppers would otherwise miss", children: [
    /* @__PURE__ */ jsx(User, { children: p.ask }),
    /* @__PURE__ */ jsxs(Reply, { children: [
      /* @__PURE__ */ jsx("p", { className: "apu-text", children: p.reply }),
      /* @__PURE__ */ jsx(App, { name: "trailwell", via: true, children: /* @__PURE__ */ jsxs("div", { className: "apu-deal", "data-name": `Promotion / ${p.bag.name}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "apu-deal__media", children: [
          /* @__PURE__ */ jsx(ProductImage, { src: p.bag.image, alt: p.bag.name }),
          /* @__PURE__ */ jsx(Badge, { tone: "green", children: p.offer })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "apu-deal__body", children: [
          /* @__PURE__ */ jsxs("span", { className: "apu-opt__text", children: [
            /* @__PURE__ */ jsx("b", { children: p.bag.name }),
            /* @__PURE__ */ jsxs("small", { children: [
              p.bag.size,
              " · ",
              p.bag.color
            ] })
          ] }),
          /* @__PURE__ */ jsx(Price, { now: p.price, was: p.was })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "apu-why", children: p.why }),
        /* @__PURE__ */ jsx("p", { className: "apu-terms", children: p.conditions })
      ] }) })
    ] })
  ] });
}
function V3PromoLaunches() {
  const m = launches;
  return /* @__PURE__ */ jsxs(Compact, { name: "14 — Promotions & Upselling: Launches and best sellers up front", children: [
    /* @__PURE__ */ jsx(User, { children: m.ask }),
    /* @__PURE__ */ jsxs(Reply, { children: [
      /* @__PURE__ */ jsx("p", { className: "apu-text", children: m.reply }),
      /* @__PURE__ */ jsxs(App, { name: "trailwell", via: true, children: [
        /* @__PURE__ */ jsx("div", { className: "apu-pair", "data-name": "Launch and best seller", children: [m.launch, m.bestSeller].map(({ bag: bag2, tag: tag2 }) => /* @__PURE__ */ jsxs("div", { className: "apu-tile", "data-name": `Product / ${bag2.name}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "apu-tile__media", children: [
            /* @__PURE__ */ jsx(ProductImage, { src: bag2.image, alt: bag2.name }),
            /* @__PURE__ */ jsx(Badge, { tone: tag2 === "New" ? "blue" : "neutral", children: tag2 })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "apu-opt__text", children: [
            /* @__PURE__ */ jsx("b", { children: bag2.name }),
            /* @__PURE__ */ jsxs("small", { children: [
              bag2.size,
              " · ",
              bag2.color
            ] })
          ] }),
          /* @__PURE__ */ jsx(Price, { now: bag2.price })
        ] }, bag2.id)) }),
        /* @__PURE__ */ jsx("p", { className: "apu-terms", children: m.conditions })
      ] })
    ] })
  ] });
}
export {
  V3AppDetailMotion,
  V3AppDetailMwebMotion,
  V3BackInStockMotion,
  V3CheckoutMotion,
  V3ConfigureMotion,
  V3ExchangeMotion,
  V3InsightsMotion,
  V3InsightsMwebMotion,
  V3LoyaltyMotion,
  V3OrderStatusMotion,
  V3PriceDropMotion,
  V3PromoLaunches,
  V3PromoOffer,
  V3PromoUpgrade,
  V3ShortlistMotion,
  V3ValueMotion,
  V3WhichMotion
};
