"use client";

import type { ReactNode } from "react";
import "./sell-dynamic.css";

export { AdJourneyMotion, adJourneyMotionDuration } from "./visuals/AdJourneyMotion/AdJourneyMotion";
export { AiAssistantsMotion, aiAssistantsMotionDuration } from "./visuals/AiAssistantsMotion/AiAssistantsMotion";
export { AiSearchMotion, aiSearchMotionDuration } from "./visuals/AiSearchMotion/AiSearchMotion";
export {
  PersonalAgentsV2Motion,
  personalAgentsV2MotionDuration,
} from "./visuals/PersonalAgentsV2Motion/PersonalAgentsV2Motion";

/**
 * The scope the Sell: Dynamic visuals' CSS lives under (sell-dynamic.css). Each visual draws its own 738 × 680
 * crimson frame, so it renders here instead of in the Lifecycle panel's SceneFrame.
 */
export function SellDynamicVisual({ children }: { children: ReactNode }) {
  return <div className="sdm-motion">{children}</div>;
}
