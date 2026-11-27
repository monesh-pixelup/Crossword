"use client";

import { tabTurn } from "@/lib/use-autoplay-tabs";
import { AccordionMedia } from "@/components/ui/accordion-media";
import { assistFeatures } from "../../config/assist";
import { ScenePanel } from "@/modules/shared/motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { assistMwebScenes, assistScenes } from "../motion-v2/scenes";

/** Each feature's turn: its visual's run plus the hold. */
const turns = assistFeatures.map((feature) => tabTurn(assistScenes[feature.scene].duration));

/** The Conversion assistance features as an accordion beside the panel playing the open feature's visual. */
export function AssistList() {
  return (
    <AccordionMedia
      items={assistFeatures}
      turns={turns}
      label="Conversion assistance features"
      // Figma 3257:36469: the panel ends 7px short of the content edge (586px across, 687px wide, in the 1280px row).
      panelClassName="bg-aubergine lg:mr-[7px]"
      spacedRules
      // Below 992px each feature's visual opens under it, accordion-style, and they change only when tapped.
      stackedAccordion
      // Below 768px that panel takes the 352 × 440 shape of the features' mobile-web visuals.
      stackedPanelClassName="max-md:aspect-[352/440]"
      // There, the FAQ's plus / minus opens and closes each feature.
      toggleIcon
      // Side by side, the open feature's maroon progress loader along its rule.
      progress
      renderPanel={(active) => (
        <>
          <ScenePanel
            scene={assistScenes[assistFeatures[active].scene]}
            root={SellMotionRoot}
            maxScale={Infinity}
            className="absolute inset-0 max-md:hidden"
          />
          {/*
            Below 768px: the feature's mobile-web layout (352 × 440, the same phone demo and camera with the phone sized
            to the frame), on the aubergine frame drawn for that size.
          */}
          <ScenePanel
            scene={assistMwebScenes[assistFeatures[active].scene]}
            root={SellMotionRoot}
            maxScale={Infinity}
            transform
            className="absolute inset-0 md:hidden"
          />
        </>
      )}
    />
  );
}
