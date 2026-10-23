"use client";

import type { ComponentType } from "react";
import type { InsightVisual } from "../../config/insights";
import type { LifecycleVisual } from "../../config/lifecycle";
import { AnonymousTraffic } from "./anonymous-traffic";
import { AskInsight } from "./ask-insight";
import { DynamicLandingPage } from "./dynamic-landing-page";
import { GiftJourney } from "./gift-journey";
import { InsightFrame, SceneFrame } from "./primitives";
import { RetentionGrowth } from "./retention-growth";
import { RevenueAttribution } from "./revenue-attribution";
import { ServiceResolution } from "./service-resolution";
import { SleepSearch } from "./sleep-search";

type Visual = {
  Component: ComponentType<{ play: boolean }>;
  /** What the mock-up shows, for assistive tech (the mock-up itself is decorative). */
  label: string;
  /**
   * How long the script takes to play out, in ms (measured on the source
   * build). Tabs stay open this long plus a hold.
   */
  duration: number;
};

export const lifecycleVisuals: Record<LifecycleVisual, Visual> = {
  "gift-journey": {
    Component: GiftJourney,
    label:
      "The Crossword assistant helping a shopper find a birthday gift under budget, then adding a rose gold pendant and matching chain to the cart",
    duration: 28500,
  },
  "dynamic-landing-page": {
    Component: DynamicLandingPage,
    label:
      "A landing page tailored to sensitive skin that rewrites itself around routines under $75 when the shopper says they're on a budget",
    duration: 4900,
  },
  "sleep-search": {
    Component: SleepSearch,
    label:
      "A store search answering a request for melatonin-free sleep aids, then comparing the two simplest options by ingredients",
    duration: 12600,
  },
  "service-resolution": {
    Component: ServiceResolution,
    label:
      "The Crossword assistant answering where an order is, then handing the conversation to a support agent who adds a matching bracelet before dispatch",
    duration: 19300,
  },
  "retention-growth": {
    Component: RetentionGrowth,
    label:
      "The Crossword assistant greeting a returning customer, suggesting anniversary jewelry looks and showing them on a photo of the shopper’s wife",
    duration: 16600,
  },
};

export const insightVisuals: Record<InsightVisual, Visual> = {
  "ask-insight": {
    Component: AskInsight,
    label:
      "Crossword Insights answering which shoppers reached checkout without buying, with a cohort of 412 high-intent shoppers",
    duration: 5500,
  },
  "revenue-attribution": {
    Component: RevenueAttribution,
    label:
      "A merchant asks Crossword Insights what one shopper conversation was worth; it shows the conversation and traces it to $186 of influenced revenue",
    duration: 8500,
  },
  "anonymous-traffic": {
    Component: AnonymousTraffic,
    label:
      "Crossword Insights tracing a spike of anonymous visitors to a Reddit thread and offering returning visitors 10% off",
    duration: 5500,
  },
};

/**
 * The Lifecycle mock-up: the maroon damask frame with the open feature's
 * visual. Drawn at 738 × 680 and zoomed to its column: filling the width when
 * stacked, fitting beside the list from 992px. `run` restarts the script.
 */
export function LifecyclePanel({ visual, run, play }: { visual?: LifecycleVisual; run: number; play: boolean }) {
  // A feature without a visual yet shows the empty frame (decorative).
  const entry = visual ? lifecycleVisuals[visual] : null;
  return (
    <div
      {...(entry ? { role: "img", "aria-label": entry.label } : { "aria-hidden": true })}
      className="relative h-[680px] w-[738px] shrink-0 overflow-clip [--fit-gutter:0px] [--fit-width:738px] scale-to-container lg:ml-auto lg:fit-to-container"
    >
      <div inert className="contents">
        <SceneFrame>{entry && <entry.Component key={`${visual}-${run}`} play={play} />}</SceneFrame>
      </div>
    </div>
  );
}

/**
 * The Insights mock-up: the arched-hallway photo with the open tab's visual.
 * Drawn at 738 × 640 and zoomed to cover its panel (the panel keeps 738:640
 * but stretches to the tabs' height beside them). When the panel is wider
 * than 738:640 (its height stops at 640px on wide screens) the visual shrinks
 * back to the panel's height, so it keeps its room above and below while the
 * photo still covers. `run` restarts the script.
 */
export function InsightPanel({ visual, run, play }: { visual: InsightVisual; run: number; play: boolean }) {
  const { Component, label } = insightVisuals[visual];
  return (
    <div
      role="img"
      aria-label={label}
      className="absolute top-1/2 left-1/2 h-[640px] w-[738px] -translate-x-1/2 -translate-y-1/2 overflow-clip [zoom:max(tan(atan2(100cqw,738px)),tan(atan2(100cqh,640px)))] [--insight-content-fit:min(1,tan(atan2(100cqh,100cqw*640/738)))]"
    >
      <div inert className="contents">
        <InsightFrame>
          <Component key={`${visual}-${run}`} play={play} />
        </InsightFrame>
      </div>
    </div>
  );
}
