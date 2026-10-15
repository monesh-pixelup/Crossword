import { Crimson_Pro, DM_Sans, Geist, Geist_Mono, Inter, Open_Sans, Tangerine } from "next/font/google";
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
 * Current letters: A, C, D, E, F, G, H, M, N, O, P, R, S, T, W, Y, plus the digits 0-9 for numerals.
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

/** Section eyebrow labels (600) and feature descriptions (400). */
export const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-face-open-sans",
  display: "swap",
  preload: false,
});

/** Calligraphic numbers, swash capitals (400) and signatures (700). */
export const tangerine = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-tangerine",
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

export const fontVariables = [
  crimsonPro.variable,
  parisienne.variable,
  geist.variable,
  dmSans.variable,
  dmSansOpsz.variable,
  inter.variable,
  openSans.variable,
  tangerine.variable,
  geistMono.variable,
].join(" ");
