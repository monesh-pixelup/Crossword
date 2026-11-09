"use client";

import { tabTurn } from "@/lib/use-autoplay-tabs";
import { AccordionMedia } from "@/modules/landing/components/shared/accordion-media";
import { recoveryItems } from "../../config/recovery";
import { RecoveryMotion } from "../motion/retain-motion";

/**
 * How long each recovery visual takes to play out, in ms. The Retain visuals don't publish their run lengths, so each
 * moment gets the same turn, long enough for a chat to play through before the next opens.
 */
const RUN = 6500;

const turns = recoveryItems.map(() => tabTurn(RUN));

/** The recovery moments as an accordion beside the panel playing the open moment's visual. */
export function RecoveryList() {
  return (
    <AccordionMedia
      items={recoveryItems}
      turns={turns}
      label="Proactive recovery moments"
      // Figma 3257:38266: the panel ends 7px short of the content edge (586px across, 687px wide, in the 1280px row).
      panelClassName="bg-aubergine lg:mr-[7px]"
      spacedRules
      renderPanel={(active) => <RecoveryMotion index={active} />}
    />
  );
}
