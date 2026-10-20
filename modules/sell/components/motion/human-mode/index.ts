import type { SceneEntry } from "../scene-panel";
import { HumanModeScene } from "./human-mode-scene";

/* Human mode (scenario 34): three chat shells on the 1280 × 599 art, rendered at native size inside <MotionRoot>. */
export const humanModeScene = {
  Component: HumanModeScene,
  label:
    "Three moments in one skincare chat. The assistant asks if a serum suits sensitive skin and confirms the fragrance-free one; recommends the Calming Serum over the Daily Hydrating Serum as $16 cheaper; then adds the 30 ml Calming Serum to the cart.",
  width: 1280,
  height: 599,
  duration: 4750,
} satisfies SceneEntry;
