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
import frameTexture from "./home-v2/assets/background-texture.webp";
import frameBackground from "./home-v2/assets/icons/scene-frame-background.svg";

type Visual = {
  Component: ComponentType;
  /** What the mock-up shows, for assistive tech (the mock-up itself is decorative). */
  label: string;
};

type InsightVisualEntry = Visual & {
  /**
   * How long the script takes to play out, in ms (summed from its timeline in the source build). Tabs stay open
   * this long plus a hold.
   */
  duration: number;
};

export const lifecycleVisuals: Record<LifecycleVisual, Visual> = {
  "gift-journey": {
    Component: GiftJourneyMotion,
    label:
      "The Aurelia assistant helping a shopper find a birthday gift under budget, then adding a rose gold pendant and matching chain to the cart",
  },
  "ad-journey": {
    Component: AdJourneyMotion,
    label:
      "A shopper taps a Trailwell backpack ad, the store opens with the Crossword guide, and two quick questions narrow it down to three backpacks",
  },
  "ai-search": {
    Component: AiSearchMotion,
    label:
      "A shopper asks a gummy store's search bar for something to help them sleep; Crossword answers with sleep gummies and opens the one they pick",
  },
  "service-resolution": {
    Component: ServiceResolutionMotion,
    label:
      "The assistant answering where an order is, then handing the conversation to a support agent who adds a matching bracelet before dispatch",
  },
  "retention-growth": {
    Component: RetentionGrowthMotion,
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
      "Crossword Insights finding the people who reached checkout without buying in the last 7 days, with a cohort of 412 high-intent shoppers",
    duration: 6700,
  },
  "revenue-attribution": {
    Component: RevenueAttributionMotion,
    label:
      "A shopper conversation with a 20% off offer, traced by Crossword Insights to $186 of influenced revenue",
    duration: 5500,
  },
  "anonymous-traffic": {
    Component: AnonymousTrafficMotion,
    label:
      "Crossword Insights tracing a spike of anonymous visitors to a Reddit thread and offering returning visitors 10% off",
    duration: 4900,
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
        // The visuals' own backdrops (the chat scenes' frame, the others' crimson-bg) give way to the one frame below.
        "[&_:is(.adj,.ais,.pa,.aia-canvas)]:[background:none] [&_:is(.hm-ill-scene-frame\\_\\_background,.hm-ill-scene-frame\\_\\_texture)]:hidden",
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
          <HomeMotion>
            <entry.Component key={`${visual}-${run}-${replay}`} />
          </HomeMotion>
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
 */
export function ShopperPanel() {
  const [ref, replay] = useReplayOnReturn();
  return (
    <div
      ref={ref}
      role="img"
      aria-label="A shopper searches for Gillette, clicks Harry's sponsored comparison, and lands on a Harry's product page where Crossword compares the razor with Gillette's to win the sale"
      className="relative h-[599px] w-[1280px] shrink-0 overflow-clip select-none scale-to-container [--fit-width:1280px]"
    >
      <div inert className="contents">
        <HomeMotion>
          <SponsoredComparisonMotion key={replay} />
        </HomeMotion>
      </div>
    </div>
  );
}
