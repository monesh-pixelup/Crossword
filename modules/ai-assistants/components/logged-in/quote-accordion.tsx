"use client";

import Image from "next/image";
import { tabTurn } from "@/lib/use-autoplay-tabs";
import { AccordionMedia } from "@/modules/landing/components/shared/accordion-media";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import panelArt from "@/modules/sell/assets/upsell/panel-aubergine.webp";
import type { LoggedInQuote } from "../../config/logged-in";
import { motionScene } from "../motion/motion-scenes";

/**
 * The customer quotes as an accordion beside the 687 × 586 aubergine damask panel (the Upsell art), in the new
 * "Library · Accordion + media" layout shared with Sell's Conversion assistance: each quote takes its turn (its motion
 * visual's run plus the hold), the panel playing the open quote's visual where it has one.
 */
export function QuoteAccordion({ quotes }: { quotes: LoggedInQuote[] }) {
  const turns = quotes.map((quote) => tabTurn(quote.scene ? motionScene(quote.scene).scene.duration : undefined));
  return (
    <AccordionMedia
      items={quotes.map((quote) => ({ title: quote.quote, description: quote.description }))}
      turns={turns}
      label="What signed-in customers ask"
      // Figma 3305:957: the panel ends 7px short of the content edge; the open quote's rule 32px under it (3305:920), none under the last.
      panelClassName="bg-[#462160] lg:mr-[7px]"
      spacedRules
      lastRule={false}
      // Below 992px each quote's visual opens under it, accordion-style, and they change only when tapped.
      stackedAccordion
      panelBackground={<Image src={panelArt} alt="" fill sizes="(min-width: 1024px) 687px, 100vw" className="object-cover" />}
      renderPanel={(active) => {
        const slug = quotes[active].scene;
        return slug ? <ScenePanel {...motionScene(slug)} maxScale={Infinity} /> : null;
      }}
    />
  );
}
