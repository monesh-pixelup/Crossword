"use client";

import { type ComponentType, type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/shared/motion/scene-panel";
import "./motion.css";
// After motion.css, as the source loads its mobile layouts after the visuals' own styles.
import "./dlp-mweb.css";
import {
  AdaptiveProductPagesV2bMotion,
  AdJourneyBaseMotion,
  AdJourneyV2Motion,
  AskAiInlineBaseMotion,
  AskAiInlineV2Motion,
  BuildBundleBaseMotion,
  BuildBundleV2Motion,
  ComparisonToolsBaseMotion,
  ComparisonToolsV2Motion,
  CrossSellBaseMotion,
  CrossSellV2bMotion,
  DedicatedLandingPagesV2Motion,
  DirectAskBaseMotion,
  DirectAskV2bMotion,
  GamesRewardsBaseMotion,
  GamesRewardsV2Motion,
  GistUpFrontBaseMotion,
  GistUpFrontV2bMotion,
  OffersComposerBaseMotion,
  OffersComposerV2Motion,
  PersonalizedContentBaseMotion,
  PersonalizedContentV2Motion,
  RoasGapMwebV2Motion,
  RoasGapV2Motion,
} from "./dlp-v2";

/*
 * The Dynamic landing pages motion visuals, built from the "Crossword — Sell: Dynamic v2 (motion)" source
 * (Crossword-Sell-Dynamic-V2-Motion/source): dlp-v2.js is its Vite build of the 13 live visuals, unminified with
 * React external, so markup, classes, copy and timings are the source's own. Mechanical changes only:
 *
 * - Anything that measures with getBoundingClientRect divides by the zoom (or scale) the site draws the visual at, so
 *   it stays in CSS px: the follow-scrolls in GiftJourneyV2Motion and ProductDiscoveryV2Motion, the jar flights in
 *   AdToPageMotion and AdaptivePagesMotion, the composer-to-panel morphs in AdJourneyMotion and GamesRewardsMotion,
 *   and the scrolls in GistUpFrontMotion and DirectAskMotion. (sellDynamicMotion.ts, TapRing, ProactiveV2Motion and
 *   useFrameCamera already did.) At the drawn size the factor is 1, so nothing changes.
 * - The two image paths the source builds from `public/assets` at runtime point at their WebP copies; brand fonts
 *   point at the next/font variables, and assets are served from public/images/dynamic-landing-pages/v2/assets
 *   (photos as WebP). motion.css is scoped under `.dlp-motion` (see its header).
 *
 * | Visuals | Size | Used in |
 * | --- | --- | --- |
 * | 01 `roas-gap-motion` | 1289 × 600 | gap/roas-gap.tsx (via dlp-scene-panel.tsx) |
 * | 02 `dedicated-landing-pages-motion`, 03 `adaptive-product-pages-v2-motion` | 687 × 586 | options/option-list.tsx |
 * | 04–09 `comparison-tools-motion` … `offers-composer-motion` | 788 × 579 | options/dedicated-tab-list.tsx |
 * | 10–13 `ask-ai-inline-motion` … `upsell-cross-sell-v2-motion` | 738 × 760 | adaptive/adaptive-tabs.tsx |
 * | 01m `roas-gap-mweb-motion` | 352 × 300 | gap/roas-gap.tsx, below 768px |
 *
 * The 15 November 2026 update: 04–09 are 788 × 579 on the damask with a 676 × 467 window, 10–13 get a new backdrop,
 * and 01's window corners change. Its stylesheet keys those on each visual's `data-slug` (the source page's figure), so
 * the build wraps 04–13 in a box-less `data-slug` element. The source now undoes zoom itself in AdJourneyMotion and
 * GamesRewardsMotion's composer-to-panel morphs, so the site's own patch there is gone; the other patches stay.
 *
 * The 11 November 2026 update (Crossword-Sell-Dynamic-V2-Motion-2026-11-11) adds 01m and the page's window standard
 * (24px corners and a gold edge, its sell-dynamic-v2-motion.css). That file is scoped under the source page's `.hv2`;
 * the root carries `hv2` too, so in motion.css it reads `.dlp-motion.hv2 …`.
 */


const subscribe = () => () => {};

/**
 * The `.dlp-motion` scope the Sell: Dynamic v2 visuals render in (motion.css is prefixed with it).
 * The visuals are drawn on the client only: they read `prefers-reduced-motion` and the window's
 * focus on their first render, which the server can't know.
 */
export function DlpMotionRoot({ children }: { children: ReactNode }) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <div className="dlp-motion hv2">{client && children}</div>;
}

/*
 * Sell: Dynamic v2 motion visuals 01–13, by the source's slugs, each at its drawn size. Each
 * plays itself, as in the source: it waits for webfonts, starts once it is on screen with the tab
 * focused, restarts when the viewer comes back, and shows its final state with
 * `prefers-reduced-motion`. The `play` prop ScenePanel passes is ignored. `duration` is about how
 * long (ms) a visual takes to settle, for the tabs that time their turns by it: the unchanged visuals keep their
 * timings from the source build; 03 and 10–13 are the source's beat timings plus the ~1.3s their camera and
 * transitions take to settle.
 */
export const dlpScenes = {
  "roas-gap-motion": {
    Component: RoasGapV2Motion,
    label:
      "A Goodwell ad leads to a generic store page: the ad's context is lost along the way, and the shopper drops off.",
    // The canvas is 1289px wide (motion.css), not 1280: drawn as 1280 its last 9px, the right side of the framed
    // panel's inner border, were cropped, leaving that border closer to the right edge than the left.
    width: 1289,
    height: 600,
    // Its last beat (the store's last line, 3340ms in, over 700ms) settles at 4040ms.
    duration: 4100,
  },
  // 01m, for phones: 01 as a strip at half scale, a camera following each beat (ad, Context lost, store, Drop-off).
  "roas-gap-mweb-motion": {
    Component: RoasGapMwebV2Motion,
    label:
      "A Goodwell ad leads to a generic store page: the ad's context is lost along the way, and the shopper drops off.",
    width: 352,
    height: 300,
    // The camera's 6s pan, then the Drop-off line drawn from 6s over 900ms.
    duration: 6900,
  },
  "dedicated-landing-pages-motion": {
    Component: DedicatedLandingPagesV2Motion,
    label: "An Instagram ad for Goodwell sleep gummies becomes its own landing page, the jar flying into the hero.",
    width: 687,
    height: 586,
    duration: 3500,
  },
  "comparison-tools-motion": {
    Component: ComparisonToolsV2Motion,
    label:
      "A shopper searches Goodwell vs Moonrest and lands on a comparison page laying the two brands' labels, pack sizes and prices side by side.",
    width: 788,
    height: 579,
    duration: 6600,
  },
  "games-rewards-motion": {
    Component: GamesRewardsV2Motion,
    label: "A shopper taps an ad into a quick game on the landing page, collects stars and unlocks a reward to use at checkout.",
    width: 788,
    height: 579,
    duration: 21000,
  },
  "build-your-bundle-motion": {
    Component: BuildBundleV2Motion,
    label:
      "A Goodwell gummies ad leads to its landing page, where two quick questions match the shopper to a bundle of gummies to add.",
    width: 788,
    height: 579,
    duration: 20200,
  },
  "ad-journey-motion": {
    Component: AdJourneyV2Motion,
    label: "A shopper taps an ad into a short chat quiz that asks one question at a time and guides them to the right products.",
    width: 788,
    height: 579,
    duration: 21400,
  },
  "personalized-content-motion": {
    Component: PersonalizedContentV2Motion,
    label: "The exact product from the ad lands front and center on the page the shopper clicks through to.",
    width: 788,
    height: 579,
    duration: 6300,
  },
  "offers-composer-motion": {
    Component: OffersComposerV2Motion,
    label:
      "A welcome offer card pops in above the chat composer on the landing page; tapped, the chat opens with the offer and its WELCOME10 code.",
    width: 788,
    height: 579,
    duration: 11400,
  },
  "adaptive-product-pages-v2-motion": {
    Component: AdaptiveProductPagesV2bMotion,
    label:
      "An Aura Wireless Earbuds product page builds itself around the shopper: its header, then its sections fading up into place in reading order.",
    width: 687,
    height: 586,
    duration: 5400,
  },
  "ask-ai-inline-motion": {
    Component: AskAiInlineV2Motion,
    label:
      "On a Sorelle Labs product page, the view closes in on the Ask AI section: the shopper picks a question, Crossword checks the formula and answers right in the page.",
    width: 738,
    height: 760,
    duration: 12700,
  },
  "gist-up-front-v2-motion": {
    Component: GistUpFrontV2bMotion,
    label: "A product page's AI summary gives the gist in a few plain sentences, with Show more opening the full detail.",
    width: 738,
    height: 760,
    duration: 6400,
  },
  "direct-ask-v2-motion": {
    Component: DirectAskV2bMotion,
    label: "A shopper taps a suggested question in the product page's search bar and gets an answer from its details, reviews and Q&A.",
    width: 738,
    height: 760,
    duration: 8500,
  },
  "upsell-cross-sell-v2-motion": {
    Component: CrossSellV2bMotion,
    label: "On a product page, Crossword suggests a natural add-on to what the shopper is already considering.",
    width: 738,
    height: 760,
    duration: 13300,
  },
} satisfies Record<string, SceneEntry>;

export type DlpSceneSlug = keyof typeof dlpScenes;

/*
 * The mobile-web layouts (352 × 440) of 02–13, from the 27 November 2026 source (src/visuals/SellMweb/SellMweb.tsx):
 * each wraps the desktop visual, unchanged (04–13 without their desktop `data-slug` wrapper), in a `.smw` box that
 * dlp-mweb.css lays out for a phone. Same steps, copy and timing as desktop, so the same labels and durations. For
 * phones (below 768px); 01's phone version is `roas-gap-mweb-motion` above.
 */
type Tone = "maroon" | "aubergine";

const mweb = (C: ComponentType, tone: Tone) =>
  function Mweb() {
    return (
      <div className={`smw smw--${tone}`}>
        <C />
      </div>
    );
  };

const mwebScene = (slug: Exclude<DlpSceneSlug, "roas-gap-motion" | "roas-gap-mweb-motion">, C: ComponentType, tone: Tone): SceneEntry => ({
  ...dlpScenes[slug],
  Component: mweb(C, tone),
  width: 352,
  height: 440,
});

export const dlpMwebScenes = {
  // 02m, 03m: on their aubergine frame.
  "dedicated-landing-pages-motion": mwebScene("dedicated-landing-pages-motion", DedicatedLandingPagesV2Motion, "aubergine"),
  "adaptive-product-pages-v2-motion": mwebScene("adaptive-product-pages-v2-motion", AdaptiveProductPagesV2bMotion, "aubergine"),
  // 04m–09m: the ad opening into the store at phone width (on the page's lattice panel, see dedicated-tab-list.tsx).
  "comparison-tools-motion": mwebScene("comparison-tools-motion", ComparisonToolsBaseMotion, "maroon"),
  "games-rewards-motion": mwebScene("games-rewards-motion", GamesRewardsBaseMotion, "maroon"),
  "build-your-bundle-motion": mwebScene("build-your-bundle-motion", BuildBundleBaseMotion, "maroon"),
  "ad-journey-motion": mwebScene("ad-journey-motion", AdJourneyBaseMotion, "maroon"),
  "personalized-content-motion": mwebScene("personalized-content-motion", PersonalizedContentBaseMotion, "maroon"),
  "offers-composer-motion": mwebScene("offers-composer-motion", OffersComposerBaseMotion, "maroon"),
  // 10m–13m: the product page as one column, on their warm interior photo.
  "ask-ai-inline-motion": mwebScene("ask-ai-inline-motion", AskAiInlineBaseMotion, "maroon"),
  "gist-up-front-v2-motion": mwebScene("gist-up-front-v2-motion", GistUpFrontBaseMotion, "maroon"),
  "direct-ask-v2-motion": mwebScene("direct-ask-v2-motion", DirectAskBaseMotion, "maroon"),
  "upsell-cross-sell-v2-motion": mwebScene("upsell-cross-sell-v2-motion", CrossSellBaseMotion, "maroon"),
} satisfies Partial<Record<DlpSceneSlug, SceneEntry>>;

export type DlpMwebSceneSlug = keyof typeof dlpMwebScenes;

/** A visual's mobile-web layout by its desktop slug (undefined for 01, whose phone version is its own slug). */
export const dlpMwebSceneFor = (slug: DlpSceneSlug): SceneEntry | undefined =>
  (dlpMwebScenes as Partial<Record<DlpSceneSlug, SceneEntry>>)[slug];
