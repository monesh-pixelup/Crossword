import { catalog, type CatalogProduct } from "../brands/catalog";

export const storefrontIds = [
  "goodwell",
  "sorelle-labs",
  "aurelle",
  "aurelia",
  "amber-and-oak",
  "dusklight",
  "crestline",
  "brewhaus",
  "trailwell",
  "aura",
  "stride",
  "marais",
  "proteinmax",
] as const;
export type StorefrontId = (typeof storefrontIds)[number];
export type StoreProduct = CatalogProduct & {
  collection: string;
  detail: string;
  specs?: [string, string][];
  sizes?: string[];
  fitNote?: string;
  ingredients?: string;
};
const product = (
  sku: CatalogProduct,
  collection: string,
  detail: string,
): StoreProduct => ({ ...sku, collection, detail });
export const storefronts: Record<
  StorefrontId,
  {
    archetype: "benefit" | "editorial" | "technical" | "workspace";
    label: string;
    eyebrow: string;
    headline: string;
    description: string;
    categories: string[];
    products: StoreProduct[];
  }
> = {
  goodwell: {
    archetype: "benefit",
    label: "Functional wellness",
    eyebrow: "Small habits. Good days.",
    headline: "Feel good, one gummy at a time.",
    description:
      "Find a little support for your everyday routine. Sleep, energy and focus, made simple.",
    categories: ["All gummies", "Sleep", "Energy", "Focus", "Calm"],
    products: [
      product(
        catalog.goodwellSleep60,
        "Sleep",
        "60 gummies · magnesium and calming botanicals",
      ),
      product(catalog.goodwellSleep28, "Sleep", "28 gummies · a smaller start"),
      product(
        catalog.goodwellEnergy,
        "Energy",
        "60 gummies · your daytime routine",
      ),
      product(
        catalog.goodwellFocus,
        "Focus",
        "60 gummies · make room for focus",
      ),
      product(catalog.goodwellCalm, "Calm", "60 gummies · a moment to unwind"),
      product(
        catalog.goodwellImmunity,
        "Daily care",
        "60 gummies · everyday wellness",
      ),
    ],
  },
  "sorelle-labs": {
    archetype: "editorial",
    label: "Skincare",
    eyebrow: "Considered care",
    headline: "A little care. The right fit.",
    description:
      "A simple serum routine, chosen around what your skin needs today.",
    categories: [
      "All skincare",
      "Hydration",
      "Gentle care",
      "Vitamin C",
      "Moisturisers",
      "Regimens",
    ],
    products: [
      product(
        catalog.sorelleHydrating,
        "Hydration",
        "Daily hydration · ivory bottle",
      ),
      product(
        catalog.sorelleCalming,
        "Gentle care",
        "30 ml · simple, fragrance-free care",
      ),
      product(catalog.sorelleVitaminC, "Vitamin C", "Vitamin C · serum"),
      product(catalog.sorelleCream, "Moisturisers", "Rich daily moisture"),
      product(
        catalog.sorelleLotion,
        "Moisturisers",
        "Lightweight daily lotion with ceramides",
      ),
      product(catalog.sorelleGel, "Moisturisers", "Water-gel texture"),
      product(
        catalog.sorelleSet,
        "Regimens",
        "Cream, night mask and travel-size cleanser",
      ),
    ],
  },
  aurelle: {
    archetype: "editorial",
    label: "Jewellery",
    eyebrow: "The considered collection",
    headline: "For all the days you’ll remember.",
    description:
      "Quiet statements in gold and rose gold. A personal piece, a thoughtful gift.",
    categories: [
      "All jewellery",
      "Necklaces",
      "Bracelets",
      "Chains",
      "Anklets",
    ],
    products: [
      product(
        catalog.aurellePendant,
        "Necklaces",
        "Gold · teardrop silhouette",
      ),
      product(catalog.aurelleBracelet, "Bracelets", "Gold · chain-link design"),
      product(catalog.aurelleAnklet, "Anklets", "Gold · beaded detail"),
      product(
        catalog.aurelleRosePendant,
        "Necklaces",
        "Rose gold · teardrop silhouette",
      ),
      product(catalog.aurelleHalo, "Necklaces", "Rose gold · halo design"),
      product(catalog.aurelleBar, "Necklaces", "Rose gold · bar design"),
      product(catalog.aurelleBoxChain, "Chains", "Rose gold · fine box chain"),
      product(catalog.aurelleSnakeChain, "Chains", "Rose gold · snake chain"),
      product(catalog.aurelleCurbChain, "Chains", "Rose gold · curb chain"),
    ],
  },
  aurelia: {
    archetype: "workspace",
    label: "Merchant workspace",
    eyebrow: "Your workspace",
    headline: "A clear view of your day.",
    description: "Products, conversations and workflows in one place.",
    categories: ["Overview", "Catalog", "Conversations", "Workflows"],
    products: [],
  },
  "amber-and-oak": {
    archetype: "editorial",
    label: "Home decor & furniture",
    eyebrow: "Objects for everyday living",
    headline: "A warmer way to come home.",
    description:
      "Natural textures, considered furniture and a softer light. Make a room that feels like you.",
    categories: ["Every room", "Furniture", "Lighting", "Room edits"],
    products: [
      product(
        catalog.amberLoungeChair,
        "Furniture",
        "Natural oak frame · ivory linen cushions",
      ),
      product(catalog.amberTripod, "Lighting", "Warm wood · fabric shade"),
      product(catalog.amberDome, "Lighting", "Sculptural dome · ambient light"),
      product(
        catalog.amberBedside,
        "Lighting",
        "Copper-rim detail · bedside scale",
      ),
    ],
  },
  dusklight: {
    archetype: "technical",
    label: "Architectural lighting",
    eyebrow: "Form follows light",
    headline: "Light, precisely placed.",
    description:
      "Two lighting families. Clear specifications. Find the right form for your space.",
    categories: ["All families", "Task", "Pendant"],
    products: [
      product(
        catalog.dusklightArc,
        "Task",
        "Arc family · graphite · adjustable arm",
      ),
      product(
        catalog.dusklightLinear,
        "Pendant",
        "Linear family · graphite · suspended",
      ),
    ],
  },
  crestline: {
    archetype: "technical",
    label: "Helmets & protection",
    eyebrow: "Made for the next ride",
    headline: "Get out. Go further.",
    description:
      "Protection starts with the right fit. Meet the Enduro MTB helmet and build your riding kit around it.",
    categories: ["All equipment", "Helmets", "Fit guide"],
    products: [
      product(
        catalog.crestlineHelmet,
        "Helmets",
        "Graphite · Enduro MTB · fit options S / M / L",
      ),
    ],
  },
  brewhaus: {
    archetype: "technical",
    label: "Coffee equipment",
    eyebrow: "The everyday brew, elevated",
    headline: "A better morning starts here.",
    description:
      "Your machine. Your ritual. The tools to make every cup your own.",
    categories: ["Shop all", "Machines", "Accessories", "Brew guides"],
    products: [
      product(
        catalog.brewhausMachine,
        "Machines",
        "Brushed steel · home espresso",
      ),
      product(
        catalog.brewhausKit,
        "Accessories",
        "Milk frother, reusable filter and coffee starter pack",
      ),
    ],
  },
  trailwell: {
    archetype: "technical",
    label: "Backpacks & travel",
    eyebrow: "Pack for the way you go",
    headline: "One trip. Everything in its place.",
    description:
      "From a night away to a long weekend. Compare capacity, access and the details that make travel easier.",
    categories: [
      "All packs",
      "Weekend",
      "Travel",
      "Overnight",
      "Compare packs",
    ],
    products: [
      {
        ...product(
          catalog.trailwellWeekender,
          "Weekend",
          "30L · opens flat · forest nylon",
        ),
        specs: [
          ["Capacity", "30L"],
          ["Access", "Opens flat"],
          ["Color", "Forest"],
        ],
      },
      {
        ...product(
          catalog.trailwellRoam,
          "Travel",
          "40L · lockable zips · charcoal nylon",
        ),
        specs: [
          ["Capacity", "40L"],
          ["Closure", "Lockable zips"],
          ["Color", "Charcoal"],
        ],
      },
      {
        ...product(
          catalog.trailwellOvernight,
          "Overnight",
          "24L · shoe pocket · sand nylon",
        ),
        specs: [
          ["Capacity", "24L"],
          ["Storage", "Shoe pocket"],
          ["Color", "Sand"],
        ],
      },
    ],
  },
  aura: {
    archetype: "technical",
    label: "Consumer electronics",
    eyebrow: "Everyday, in tune",
    headline: "Your sound. A little closer.",
    description:
      "Wireless earbuds, an ivory finish and a case that goes with you. Get to know the details before you choose.",
    categories: ["The collection", "Earbuds", "Specifications"],
    products: [
      {
        ...product(
          catalog.auraEarbuds,
          "Earbuds",
          "Wireless · in-ear · ivory charging case",
        ),
        specs: [
          ["Connection", "Wireless"],
          ["Format", "In-ear earbuds"],
          ["Finish", "Ivory"],
          ["Included", "Earbuds & charging case"],
        ],
      },
    ],
  },
  stride: {
    archetype: "technical",
    label: "Footwear & fit",
    eyebrow: "Move through your day",
    headline: "Find your everyday stride.",
    description:
      "Court classics, relaxed runners and leather essentials. Start with your style, then find your fit.",
    categories: ["All footwear", "Sneakers", "Runners", "Loafers", "Fit guide"],
    products: [
      {
        ...product(
          catalog.strideCourt01,
          "Sneakers",
          "Chalk leather · low-profile court silhouette",
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
        fitNote:
          "Measure heel to toe and compare with your usual footwear. Demo sizes are selectable, not a fit guarantee.",
      },
      {
        ...product(
          catalog.strideSuedeRunner,
          "Runners",
          "Taupe suede · everyday runner",
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      },
      {
        ...product(
          catalog.stridePennyLoafer,
          "Loafers",
          "Espresso leather · slip-on shape",
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      },
      {
        ...product(
          catalog.strideSneakersBlack,
          "Sneakers",
          "Black leather · minimal everyday sneaker",
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      },
    ],
  },
  marais: {
    archetype: "editorial",
    label: "Clothing & collections",
    eyebrow: "The everyday edit",
    headline: "Less occasion. More possibility.",
    description:
      "Linen, cotton and considered shapes. Build a wardrobe that works beyond a single day.",
    categories: [
      "All clothing",
      "Dresses",
      "Shirts",
      "Trousers",
      "Accessories",
    ],
    products: [
      {
        ...product(
          catalog.maraisLinenDress,
          "Dresses",
          "Relaxed linen · easy summer shape",
        ),
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        ...product(
          catalog.maraisShirtIvory,
          "Shirts",
          "Ivory cotton · relaxed fit",
        ),
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        ...product(
          catalog.maraisShirtOlive,
          "Shirts",
          "Olive cotton · relaxed fit",
        ),
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        ...product(
          catalog.maraisShirtDress,
          "Dresses",
          "Oversized linen · shirt-dress silhouette",
        ),
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        ...product(
          catalog.maraisLinenTrousers,
          "Trousers",
          "Linen · drawstring waist",
        ),
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        ...product(
          catalog.maraisTailoredTrousers,
          "Trousers",
          "Straight-leg · tailored finish",
        ),
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      product(
        catalog.maraisEyewearCase,
        "Accessories",
        "Cognac leather · eyewear case",
      ),
    ],
  },
  proteinmax: {
    archetype: "benefit",
    label: "Sports nutrition",
    eyebrow: "Keep showing up",
    headline: "A routine built on the basics.",
    description:
      "One familiar protein. A simple way to restock. Choose a tub or build your two-tub training supply.",
    categories: ["All nutrition", "Protein", "Bundles"],
    products: [
      {
        ...product(
          catalog.proteinWhey,
          "Protein",
          "100% whey protein · 2.17 LB tub",
        ),
        specs: [
          ["Product", "Whey protein"],
          ["Pack weight", "2.17 LB / 984 g"],
          ["Format", "Powder"],
        ],
      },
    ],
  },
};

// Four layout families share composition primitives; variants are merchant-specific.
export const storefrontArchetypes = [
  "benefit",
  "editorial",
  "technical",
  "workspace",
] as const;
