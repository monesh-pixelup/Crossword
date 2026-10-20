import { BrandAdaptability } from "./brand-adaptability";
import { CompleteChannelDeployment } from "./complete-channel-deployment";
import { channelContainerSize } from "./parts";
import { PlaceItWherever } from "./place-it-wherever";

/*
 * Storefront scenes: 413 × 402 aubergine panels (damask texture with a
 * straight gold frame). Render inside <MotionRoot>.
 *
 * Each takes `bare` to render only its content, without the panel, for hosts
 * that draw their own: `bare` is `bareSize`, placed at `bareOffset` within
 * the 413 × 402 panel.
 *
 * `duration`: when the script settles (ms after `play`). Complete channel
 * deployment never settles; it loops, and `duration` is one full cycle.
 */
export const storefrontScenes = {
  "brand-adaptability": {
    Component: BrandAdaptability,
    label:
      "One support chat restyling itself for four brands in turn: a luxury fashion house, a playful lifestyle brand, a modern tech brand and a clean default style.",
    ...channelContainerSize,
    bareSize: { width: 306, height: 306 },
    bareOffset: { left: 53.5, top: 48 },
    // Fonts ready (immediate once cached) + last retype at 3880ms + 650ms frame/type morph.
    duration: 4530,
  },
  "place-it-wherever": {
    Component: PlaceItWherever,
    label:
      "A storefront page where the chat launcher and its suggestion chips move from the bottom left to the top right, then open into a full-width message bar with the suggestions beneath it.",
    ...channelContainerSize,
    bareSize: { width: 306, height: 306 },
    bareOffset: { left: 53.5, top: 48 },
    // Two frames to unsnap, 1600ms at left, 2850ms to and at right, 1180ms to expand.
    duration: 5670,
  },
  "complete-channel-deployment": {
    Component: CompleteChannelDeployment,
    label:
      "The same short support conversation shown in turn on a website chat widget, iMessage, WhatsApp and Instagram, with a channel picker highlighting each one.",
    ...channelContainerSize,
    bareSize: { width: 327.5, height: 255 },
    bareOffset: { left: 35.5, top: 73.5 },
    duration: 13600,
  },
};
