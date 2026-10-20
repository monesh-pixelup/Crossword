import { ComparisonGuidance } from "./comparison-guidance";
import { framedCanvasSize } from "./parts";
import { ProactiveIntervention } from "./proactive-intervention";
import { ReturnVisitComparison } from "./return-visit-comparison";

/*
 * Proactive-message scenes: a product page in a 1280 × 509 frame with the
 * widget opening from its composer pill. Render inside <MotionRoot>.
 * `duration` is when the script settles (last beat done, everything landed);
 * the scenes don't loop.
 */
export const proactiveScenes = {
  "proactive-intervention": {
    Component: ProactiveIntervention,
    label:
      "A whey protein product page. The shopping assistant's message bar opens into a chat on its own, notes the product runs large, and offers to check the smaller size.",
    ...framedCanvasSize,
    duration: 4940,
  },
  "comparison-guidance": {
    Component: ComparisonGuidance,
    label:
      "A foundation product page. The shopping assistant opens on its own with the three foundations the shopper has viewed and offers to narrow them down by finish, coverage, undertone and budget.",
    ...framedCanvasSize,
    duration: 4535,
  },
  "return-visit-comparison": {
    Component: ReturnVisitComparison,
    label:
      "An office chair page viewed three times. The shopping assistant opens on its own with that chair and two others the shopper viewed, and offers to compare them.",
    ...framedCanvasSize,
    duration: 4715,
  },
};
