import {
  Caveat,
  Crimson_Pro,
  DM_Sans,
  Geist,
  Geist_Mono,
  Inter,
  Instrument_Serif,
  Noto_Serif,
  Playfair_Display,
  Quicksand,
  Space_Grotesk,
  Tangerine,
} from "next/font/google";
import localFont from "next/font/local";

/**
 * Every typeface in the design system, self-hosted via next/font.
 * Only fonts that paint above-the-fold text are preloaded; the rest load on
 * demand to keep the critical path lean.
 */

export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
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

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-face-dm-sans",
  display: "swap",
  preload: false,
});

/**
 * DM Sans with its optical-size axis, for the motion visuals only: they set
 * small sizes (9.7–14px) with optical sizing on, as their source build did.
 * Kept separate so the other sections' DM Sans renders unchanged.
 */
export const dmSansOpsz = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-face-dm-sans-opsz",
  display: "swap",
  preload: false,
});

export const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-face-inter",
  display: "swap",
  preload: false,
});

/**
 * Section eyebrow labels (600) and feature descriptions (400). Self-hosted: Google's latin variable file
 * (wght 400–600, fonts.googleapis.com/css2?family=Open+Sans:wght@400..600), because fetching Open Sans
 * through next/font/google broke the Turbopack build on Vercel ("next/font/google queries have exactly one entry").
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
export const tangerine = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-tangerine",
  display: "swap",
  preload: false,
});

/** The handwritten note on the home page's CTA letter (400). */
export const caveat = Caveat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

/** Step tags on the Retain timeline (400). */
export const geistMono = Geist_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

/*
 * The Sell motion visuals (modules/sell/components/motion) load the weights
 * their source build requested from Google Fonts. Inter and Geist Mono get
 * their own instances so the other sections keep their single weight.
 * The home page's motion visuals (modules/landing/components/motion/home-v2)
 * share the Inter instance and add 600.
 */
export const interMotion = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-face-inter-motion",
  display: "swap",
  preload: false,
});

export const geistMonoMotion = Geist_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-geist-mono-motion",
  display: "swap",
  preload: false,
});

/*
 * Playfair Display, Noto Serif, Quicksand, Space Grotesk and Instrument Serif also set the Sell motion visuals'
 * storefront brands (modules/sell/components/motion-v2), in the weights and styles their source build requested.
 */
export const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: false,
});

export const notoSerif = Noto_Serif({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
});

export const quicksand = Quicksand({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  preload: false,
});

export const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
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
