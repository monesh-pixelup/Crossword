"use client";

import { tabTurn } from "@/lib/use-autoplay-tabs";
import { AccordionMedia } from "@/modules/landing/components/shared/accordion-media";
import { assistFeatures } from "../../config/assist";
import { ScenePanel } from "../motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { assistScenes } from "../motion-v2/scenes";

/** Each feature's turn: its visual's run plus the hold. */
const turns = assistFeatures.map((feature) => tabTurn(assistScenes[feature.scene].duration));

/** The Conversion assistance features as an accordion beside the panel playing the open feature's visual. */
export function AssistList() {
  return (
    <AccordionMedia
      items={assistFeatures}
      turns={turns}
      label="Conversion assistance features"
      panelClassName="bg-[#462160]"
      renderPanel={(active) => (
        <ScenePanel scene={assistScenes[assistFeatures[active].scene]} root={SellMotionRoot} maxScale={Infinity} />
      )}
    />
  );
}
