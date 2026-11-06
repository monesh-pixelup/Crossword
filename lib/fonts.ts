import localFont from "next/font/local";

/**
 * Every typeface in the design system, self-hosted via next/font/local from lib/fonts.
 * Only fonts that paint above-the-fold text are preloaded; the rest load on
 * demand to keep the critical path lean.
 *
 * All of them used to come through next/font/google, but on Vercel's build machines Google sometimes answers with
 * font URLs Turbopack can't resolve ("next/font/google queries have exactly one entry"), failing the build (it hit
 * Open Sans, then Inter). So every face is the latin woff2 Google serves, downloaded once into lib/fonts: variable
 * files where the family is variable (covering the weights the site uses), static ones otherwise. To refresh one,
 * fetch fonts.googleapis.com/css2?family=<Family>:<axes> with a modern browser user agent and take its latin file.
 */

export const crimsonPro = localFont({
  src: "./fonts/crimson-pro-normal-200-900.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-crimson-pro",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Parisienne only renders the swash capitals that open each headline, so we
 * ship a ~6KB subset instead of the 24KB latin file. Add a letter by
 * re-downloading fonts.googleapis.com/css2?family=Parisienne&text=<LETTERS>.
 * Current letters: A, B, C, D, E, F, G, H, M, N, O, P, R, S, T, W, Y, plus the digits 0-9 for numerals.
 */
export const parisienne = localFont({
  src: "./fonts/parisienne-swash.woff2",
  weight: "400",
  variable: "--font-parisienne",
  display: "swap",
});

export const geist = localFont({
  src: "./fonts/geist-normal-100-900.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const dmSans = localFont({
  src: "./fonts/dm-sans-normal-100-1000.woff2",
  weight: "100 1000",
  style: "normal",
  variable: "--font-face-dm-sans",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/**
 * DM Sans with its optical-size axis, for the motion visuals only: they set
 * small sizes (9.7–14px) with optical sizing on, as their source build did.
 * Kept separate so the other sections' DM Sans renders unchanged.
 */
export const dmSansOpsz = localFont({
  src: "./fonts/dm-sans-opsz-normal-100-1000.woff2",
  weight: "100 1000",
  style: "normal",
  variable: "--font-face-dm-sans-opsz",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/** Inter's variable latin file (wght 400–600) serves both Inter instances: the single-weight one and the motion one. */
export const inter = localFont({
  src: "./fonts/inter-normal-400-600.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-face-inter",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/**
 * Section eyebrow labels (600) and feature descriptions (400). Google's latin variable file (wght 400–600).
 */
export const openSans = localFont({
  src: "./fonts/open-sans-latin.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-face-open-sans",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/** Calligraphic numbers, swash capitals (400) and signatures (700). */
export const tangerine = localFont({
  src: [
    { path: "./fonts/tangerine-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/tangerine-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-tangerine",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
});

/** The handwritten note on the home page's CTA letter (400). */
export const caveat = localFont({
  src: "./fonts/caveat-normal-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
});

/** Geist Mono's variable latin file (wght 400–500) serves both instances: step tags on the Retain timeline (400) and the motion visuals. */
/** Step tags on the Retain timeline (400). */
export const geistMono = localFont({
  src: "./fonts/geist-mono-normal-400-500.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

/*
 * The Sell motion visuals (modules/sell/components/motion) use the weights their source build requested from Google
 * Fonts. Inter and Geist Mono keep their own CSS variables for them, from the same variable files.
 * The home page's motion visuals (modules/landing/components/motion/home-v2) share the Inter instance and add 600.
 */
export const interMotion = localFont({
  src: "./fonts/inter-normal-400-600.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-face-inter-motion",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const geistMonoMotion = localFont({
  src: "./fonts/geist-mono-normal-400-500.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-geist-mono-motion",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

/*
 * Playfair Display, Noto Serif, Quicksand, Space Grotesk and Instrument Serif also set the Sell motion visuals'
 * storefront brands (modules/sell/components/motion-v2), in the weights and styles their source build requested.
 */
export const playfairDisplay = localFont({
  src: [
    { path: "./fonts/playfair-display-normal-400-600.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/playfair-display-italic-400-600.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-playfair-display",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const notoSerif = localFont({
  src: [
    { path: "./fonts/noto-serif-normal-400-500.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/noto-serif-italic-400-500.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const quicksand = localFont({
  src: "./fonts/quicksand-normal-500-700.woff2",
  weight: "500 700",
  style: "normal",
  variable: "--font-quicksand",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-normal-400-600.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic-400.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const fontVariables = [
  crimsonPro.variable,
  parisienne.variable,
  geist.variable,
  dmSans.variable,
  dmSansOpsz.variable,
  inter.variable,
  openSans.variable,
  tangerine.variable,
  caveat.variable,
  geistMono.variable,
  interMotion.variable,
  geistMonoMotion.variable,
  playfairDisplay.variable,
  notoSerif.variable,
  quicksand.variable,
  spaceGrotesk.variable,
  instrumentSerif.variable,
].join(" ");
