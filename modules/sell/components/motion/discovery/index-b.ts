import type { ComponentType } from "react";
import { GiftFinder } from "./gift-finder";
import { GuidedFinder } from "./guided-finder";
import { SizeFit } from "./size-fit";
import { VisualDiscovery } from "./visual-discovery";

/*
 * Product discovery scenes 13–16. Each renders at its native size and must
 * be wrapped in <MotionRoot>. `duration` is how long after `play` turns true
 * the scene takes to settle (last beat, skeleton fade and scroll included),
 * from the beat timings (average typing speed) plus the final enter / skeleton
 * fade; typing jitter moves it by up to ±100ms.
 */

export type MotionScene = {
  Component: ComponentType<{ play?: boolean }>;
  label: string;
  width: number;
  height: number;
  duration: number;
};

export const discoveryScenesB = {
  "guided-finder": {
    Component: GuidedFinder,
    label:
      "A shopper asks a beauty assistant for the right foundation. It asks three quick questions about finish, coverage and skin type, then recommends one foundation matched to the shopper's saved shade.",
    width: 450,
    height: 500,
    duration: 7800,
  },
  "visual-discovery": {
    Component: VisualDiscovery,
    label:
      "A shopper uploads a photo of a lamp and asks for something similar. The assistant prioritises the warm, ambient glow they've saved before and shows three matching table lamps.",
    width: 450,
    height: 500,
    duration: 5100,
  },
  "size-fit": {
    Component: SizeFit,
    label:
      "A shopper asks whether a mountain-bike helmet will fit. The assistant recommends size Medium based on their saved head measurement and their preference for a snug fit.",
    width: 450,
    height: 500,
    duration: 4800,
  },
  "gift-finder": {
    Component: GiftFinder,
    label:
      "A shopper asks for a birthday gift for their dad around $150. Drawing on past gifts, the assistant suggests three practical options: a smart speaker, wireless earbuds and a leather wallet.",
    width: 450,
    height: 500,
    duration: 6600,
  },
} satisfies Record<string, MotionScene>;
