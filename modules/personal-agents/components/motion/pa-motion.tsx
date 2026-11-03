"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import { PersonalAgentInsightsMotion } from "./illustrations/PersonalAgentInsights/PersonalAgentInsights";
import {
  PaOfferMotion,
  PaSendBackMotion,
  PaSomethingILikeMotion,
  PaStoreCreditMotion,
  PaWhatsNewMotion,
  PaWhyThisMotion,
} from "./visuals/PersonalAgentsPossibilities/PersonalAgentsPossibilitiesMotion";
import { PaPriorities, PaPromotion, PaUpgrade } from "./visuals/PersonalAgentsPossibilities/Promotions";
import { PaTheCaseMotion } from "./visuals/PersonalAgentsPossibilities/TheCase";
import "./motion.css";

const subscribe = () => () => {};

/**
 * The `.pa-motion` scope the Personal Agents visuals render in (motion.css is prefixed with it).
 * The visuals are drawn on the client only: they read `prefers-reduced-motion` and the window's
 * focus on their first render, which the server can't know.
 */
export function PaMotionRoot({ children }: { children: ReactNode }) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <div className="pa-motion">{client && children}</div>;
}

/*
 * Personal Agents motion visuals 00–10, by the source's slugs with a `pa-` prefix (the AI
 * Assistants visuals, which share these sections, have an `insights-motion` of their own), each
 * at its drawn size without the gallery's tile label (see motion.css). Each plays itself, as in
 * the source: it starts once it is 30% on screen with the tab focused, 00–07 restart when the
 * viewer comes back, 08–10 land once and stay, and `prefers-reduced-motion` shows the final
 * state. The `play` prop ScenePanel passes is ignored. `duration` is about how long (ms) a visual
 * takes to settle, timed from the source build, for the tabs that time their turns by it.
 */
export const paScenes = {
  "pa-the-case-motion": {
    Component: PaTheCaseMotion,
    label:
      "A shopper's agent, Grok Bot, shops a brand's store on its own and finishes the purchase, while the brand's own story never reaches the shopper.",
    width: 1280,
    height: 599,
    duration: 9600,
  },
  "pa-whats-new-motion": {
    Component: PaWhatsNewMotion,
    label: "A shopper's agent, Muse, asks what's new, and the brand answers through Crossword with its latest products.",
    width: 789,
    height: 579,
    duration: 6400,
  },
  "pa-why-this-one-motion": {
    Component: PaWhyThisMotion,
    label: "A shopper's agent, Grok Bot, asks why this one, and the brand answers through Crossword with what sets it apart.",
    width: 789,
    height: 579,
    duration: 9700,
  },
  "pa-is-there-an-offer-motion": {
    Component: PaOfferMotion,
    label: "A shopper's agent, Muse, asks whether there's an offer, and the brand answers through Crossword with one that applies.",
    width: 789,
    height: 579,
    duration: 6000,
  },
  "pa-send-it-back-motion": {
    Component: PaSendBackMotion,
    label: "A shopper asks their agent, Muse, to send an order back; the brand confirms the return and refund through Crossword.",
    width: 679,
    height: 579,
    duration: 21200,
  },
  "pa-store-credit-motion": {
    Component: PaStoreCreditMotion,
    label: "A shopper asks their agent, Grok Bot, to find a sweater with their store credit, and the brand applies it through Crossword.",
    width: 679,
    height: 579,
    duration: 19100,
  },
  "pa-something-i-like-motion": {
    Component: PaSomethingILikeMotion,
    label: "A shopper asks their agent, Muse, for something they'd like, and the brand recommends from their history through Crossword.",
    width: 679,
    height: 579,
    duration: 17900,
  },
  "pa-insights-motion": {
    Component: PersonalAgentInsightsMotion,
    label: "The merchant's Insights dashboard: what personal agents requested, the actions they took, and the outcomes.",
    width: 1280,
    height: 599,
    duration: 5400,
  },
  "pa-upgrade-suggestion-motion": {
    Component: PaUpgrade,
    label: "A shopper's agent, Muse, gets the brand's upgrade suggestion through Crossword.",
    width: 355,
    height: 402,
    duration: 1000,
  },
  "pa-your-promotions-motion": {
    Component: PaPromotion,
    label: "A shopper's agent, Grok Bot, gets the brand's current promotion through Crossword.",
    width: 355,
    height: 402,
    duration: 1000,
  },
  "pa-merchandising-priorities-motion": {
    Component: PaPriorities,
    label: "A shopper's agent, Muse, is shown the brand's merchandising priorities through Crossword.",
    width: 355,
    height: 402,
    duration: 1000,
  },
} satisfies Record<string, SceneEntry>;

export type PaSceneSlug = keyof typeof paScenes;
