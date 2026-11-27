"use client";

import Image from "next/image";
import { tabTurn } from "@/lib/use-autoplay-tabs";
import { AccordionMedia } from "@/components/ui/accordion-media";
import { ScenePanel } from "@/modules/shared/motion/scene-panel";
import panelArt from "@/modules/sell/assets/upsell/panel-aubergine.webp";
import type { LoggedInQuote } from "../../config/logged-in";
import { mobileMotionScene, motionScene } from "../motion/motion-scenes";

/**
 * The customer quotes as an accordion beside the 687 × 586 aubergine damask panel (the Upsell art), in the new
 * "Library · Accordion + media" layout shared with Sell's Conversion assistance: each quote takes its turn (its motion
 * visual's run plus the hold), the panel playing the open quote's visual where it has one.
 */
export function QuoteAccordion({ quotes }: { quotes: LoggedInQuote[] }) {
  const turns = quotes.map((quote) => tabTurn(quote.scene ? motionScene(quote.scene).scene.duration : undefined));
  // Below 768px, the quotes' mobile-web layouts where they have them (AI Assistants 07m–10m).
  const phone = quotes.some((quote) => quote.scene && mobileMotionScene(quote.scene));
  return (
    <AccordionMedia
      items={quotes.map((quote) => ({ title: quote.quote, description: quote.description }))}
      turns={turns}
      label="What signed-in customers ask"
      // Figma 3305:957: the panel ends 7px short of the content edge; the open quote's rule 32px under it (3305:920), and one under the last too, as the other tabs.
      panelClassName="bg-aubergine lg:mr-[7px]"
      spacedRules
      // Below 992px each quote's visual opens under it, accordion-style, and they change only when tapped.
      stackedAccordion
      // Below 768px that panel takes the 353 × 440 shape of the mobile-web visuals, where there are some.
      stackedPanelClassName={phone ? "max-md:aspect-[353/440]" : undefined}
      // There, the FAQ's plus / minus opens and closes each quote.
      toggleIcon
      // Side by side, the open quote's maroon progress loader along its rule.
      progress
      panelBackground={<Image src={panelArt} alt="" fill sizes="(min-width: 1024px) 687px, 100vw" className="object-cover" />}
      renderPanel={(active) => {
        const slug = quotes[active].scene;
        if (!slug) return null;
        const mobile = mobileMotionScene(slug);
        if (!mobile) return <ScenePanel {...motionScene(slug)} maxScale={Infinity} />;
        return (
          <>
            <ScenePanel {...motionScene(slug)} maxScale={Infinity} className="absolute inset-0 max-md:hidden" />
            {/* Below 768px: the same phone demo and camera, the phone sized to the aubergine frame drawn for this size. */}
            <ScenePanel {...mobile} maxScale={Infinity} transform className="absolute inset-0 md:hidden" />
          </>
        );
      }}
    />
  );
}
