"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import type { InsightVisual } from "../../config/insights";
import type { LifecycleVisual } from "../../config/lifecycle";
import {
  AdJourneyMotion,
  AiAssistantsMotion,
  AiSearchMotion,
  AnonymousTrafficMotion,
  AskInsightMotion,
  GiftJourneyMotion,
  HomeMotion,
  PersonalAgentsMotion,
  RetentionGrowthMotion,
  RevenueAttributionMotion,
  ServiceResolutionMotion,
  SponsoredComparisonMotion,
} from "./home-v2";
import { HomeMobileMotion, SponsoredComparisonMobileMotion } from "./home-v2-mobile";
import frameTexture from "./home-v2/assets/background-texture.webp";
import frameBackground from "./home-v2/assets/icons/scene-frame-background.svg";

/**
 * Home v2's 40px chat window (the 11 November 2026 changes to 01, 04 and 05): the visual inside a `display: contents`
 * `.hv2-r40` wrapper, so layout is unchanged and only these visuals' `.gj2-win` corners go from the shared 28px to 40px
 * (home-motion.css).
 */
const r40 = (C: ComponentType) =>
  function R40() {
    return (
      <div className="hv2-r40">
        <C />
      </div>
    );
  };
const GiftJourneyR40 = r40(GiftJourneyMotion);
const ServiceResolutionR40 = r40(ServiceResolutionMotion);
const RetentionGrowthR40 = r40(RetentionGrowthMotion);

type Visual = {
  Component: ComponentType;
  /** What the mock-up shows, for assistive tech (the mock-up itself is decorative). */
  label: string;
};

type InsightVisualEntry = Visual & {
  /**
   * How long the script takes to play out, in ms (the source's own beatsDurationMs over each dashboard's beats). Tabs stay open
   * this long plus a hold.
   */
  duration: number;
};

export const lifecycleVisuals: Record<LifecycleVisual, Visual> = {
  "gift-journey": {
    Component: GiftJourneyR40,
    label:
      "The Aurelia assistant helping a shopper find a birthday gift under budget, then adding a rose gold pendant and matching chain to the cart",
  },
  "ad-journey": {
    Component: AdJourneyMotion,
    label:
      "A shopper taps a Goodwell gummies ad, the store opens with the Crossword guide, and two quick questions narrow it down to evening gummies to compare",
  },
  "ai-search": {
    Component: AiSearchMotion,
    label:
      "A shopper asks the Amber & Oak search bar for warm lighting for their living room; Crossword answers with lamps and opens the tripod lamp they pick",
  },
  "service-resolution": {
    Component: ServiceResolutionR40,
    label:
      "The assistant answering where an order is, then handing the conversation to a support agent who adds a matching bracelet before dispatch",
  },
  "retention-growth": {
    Component: RetentionGrowthR40,
    label:
      "The assistant greeting a returning customer, suggesting anniversary jewelry looks and showing them on a photo of the shopper’s wife",
  },
  "ai-assistants": {
    Component: AiAssistantsMotion,
    label:
      "A shopper asking ChatGPT for skincare gets the brand's own picks, a set with a promotion, and an order summary once they take it",
  },
  "personal-agents": {
    Component: PersonalAgentsMotion,
    label:
      "A shopper's personal agent asks Crossword about products and offers on their behalf, then answers the shopper with the picks",
  },
};

export const insightVisuals: Record<InsightVisual, InsightVisualEntry> = {
  "ask-insight": {
    Component: AskInsightMotion,
    label:
      "Crossword Insights finding the 3,284 people who reached checkout without buying in the last 7 days, most of them dropping off at shipping costs",
    duration: 9900,
  },
  "revenue-attribution": {
    Component: RevenueAttributionMotion,
    label:
      "A shopper conversation with a 20% off offer, followed through to checkout and traced by Crossword Insights to $186 of influenced revenue",
    duration: 6800,
  },
  "anonymous-traffic": {
    Component: AnonymousTrafficMotion,
    label:
      "Crossword Insights tracing 340 anonymous sessions to a Reddit thread comparing skincare brands, then offering returning visitors 10% off",
    duration: 11200,
  },
};

/**
 * Replays a mock-up's visual each time it comes back into view (at least 30% on screen) after being mostly scrolled
 * away: the visuals only restart themselves once fully off screen, which a sticky or tall mock-up rarely is. Returns
 * the ref for the mock-up and a count to key its visual with.
 */
function useReplayOnReturn() {
  const ref = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let away = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.3) away = true;
        else if (away) {
          away = false;
          setReplay((n) => n + 1);
        }
      },
      { threshold: [0, 0.3] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, replay] as const;
}

/**
 * The Lifecycle mock-up: the open feature's visual over one shared 738 × 680 frame (the visuals' own backdrops are
 * hidden, so only the illustration changes between features). Drawn at that size and zoomed to its column: filling the width when stacked, fitting beside the list from 1280px. `run` restarts the
 * script, as does coming back into view; each visual starts itself once it's on screen.
 */
export function LifecyclePanel({ visual, run }: { visual?: LifecycleVisual; run: number }) {
  // A feature without a visual yet shows nothing (decorative).
  const entry = visual ? lifecycleVisuals[visual] : null;
  const [ref, replay] = useReplayOnReturn();
  return (
    <div
      ref={ref}
      {...(entry ? { role: "img", "aria-label": entry.label } : { "aria-hidden": true })}
      className={[
        "relative h-[680px] w-[738px] shrink-0 overflow-clip [--fit-gutter:0px] [--fit-width:738px] scale-to-container xl:ml-auto xl:fit-to-container",
        // Every backdrop a visual can draw (the chat scenes' frame and its sized variant, the sponsored and insight frames,
        // the others' crimson and stage photos) is stripped: only the one card below (the first tab's) ever shows, and
        // switching tabs changes the visual alone. Both are `!important`: home-motion.css is outside any @layer, so it
        // beats a plain utility, and the visuals' own backdrops (a crimson picture with its gold rule baked in about 1px
        // off this frame's, on the visuals without a chat scene) drew over the card, its inner border jumping between tabs.
        "[&_:is(.adj,.ais,.pa,.aia-canvas,.ask,.hm-ill-scene-frame--sized,.hm-ill-sponsored-frame)]:[background:none]!",
        "[&_:is(.hm-ill-scene-frame\\_\\_background,.hm-ill-scene-frame\\_\\_texture,.hm-ill-sponsored-frame\\_\\_texture,.hm-ill-sponsored-frame\\_\\_outline,.hm-ill-sponsored-frame\\_\\_dot,.hm-ill-insight-frame\\_\\_background)]:hidden!",
      ].join(" ")}
    >
      {/*
        One frame for every feature, outside the keyed visual so it never redraws as the tabs change: Figma's 738 × 680
        maroon with a gold ring in each corner, and the damask texture with its notched gold rule 13.16px / 15.98px in.
      */}
      <div aria-hidden className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed 738 × 680 frame art */}
        <img src={frameBackground.src} alt="" className="absolute inset-0 size-full" />
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed 738 × 680 frame art */}
        <img src={frameTexture.src} alt="" className="absolute top-[15.98px] left-[13.16px] h-[648.036px] w-[711.68px]" />
      </div>
      <div inert className="contents">
        {entry && (
          // Keyed by the feature (not by replays), so changing tabs fades the new mock-up in over the frame.
          <div key={visual} className="lifecycle-visual-enter relative">
            <HomeMotion>
              <entry.Component key={`${visual}-${run}-${replay}`} />
            </HomeMotion>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The Insights mock-up: the open tab's visual, which draws its own 738 × 640 arched-hallway frame. Zoomed to cover
 * its panel (the panel keeps 738:640 but stretches to the tabs' height beside them). `run` restarts the script, as does coming back into view.
 */
export function InsightPanel({ visual, run }: { visual: InsightVisual; run: number }) {
  const { Component, label } = insightVisuals[visual];
  const [ref, replay] = useReplayOnReturn();
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="absolute top-1/2 left-1/2 h-[640px] w-[738px] -translate-x-1/2 -translate-y-1/2 overflow-clip [zoom:max(tan(atan2(100cqw,738px)),tan(atan2(100cqh,640px)))]"
    >
      <div inert className="contents">
        <HomeMotion>
          <Component key={`${visual}-${run}-${replay}`} />
        </HomeMotion>
      </div>
    </div>
  );
}

/**
 * The Shopper experience mock-up: a shopper searches for Gillette, taps Harry's sponsored comparison and lands on
 * its product page, where Crossword makes the case. The visual draws its own 1280 × 599 aubergine frame; drawn at
 * that size and zoomed as a whole to the column width. Replays when it comes back into view.
 *
 * Below 768px it's 08m instead, the same story laid out for a phone (353 × 440 at 1:1, its own gold-edged browser
 * window), zoomed to the column the same way. Each only plays once on screen, so the hidden one never runs.
 */
export function ShopperPanel() {
  const [ref, replay] = useReplayOnReturn();
  const label =
    "A shopper searches for Gillette, clicks Harry's sponsored comparison, and lands on a Harry's product page where Crossword compares the razor with Gillette's to win the sale";
  return (
    <div ref={ref} className="w-full">
      <div
        role="img"
        aria-label={label}
        className="relative h-[599px] w-[1280px] shrink-0 overflow-clip select-none scale-to-container [--fit-width:1280px] max-md:hidden"
      >
        <div inert className="contents">
          <HomeMotion>
            <SponsoredComparisonMotion key={replay} />
          </HomeMotion>
        </div>
      </div>
      <div
        role="img"
        aria-label={label}
        className="relative h-[440px] w-[353px] shrink-0 overflow-clip select-none scale-to-container [--fit-width:353px] md:hidden"
      >
        <div inert className="contents">
          <HomeMobileMotion>
            <SponsoredComparisonMobileMotion key={replay} />
          </HomeMobileMotion>
        </div>
      </div>
    </div>
  );
}
