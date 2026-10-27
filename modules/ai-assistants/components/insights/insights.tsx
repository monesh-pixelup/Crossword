import type { ReactNode } from "react";
import { WidePanelSection } from "../wide-panel/wide-panel-section";

/**
 * Figma "Section · Brand aesthetics" (the reporting one, node 3307:28488): the eyebrow and a one-line headline (82px
 * swash, 60px line, both 1.18) on the left, a 477px line of Geist Light 120px after it, centred on it, then 80px below
 * the 1280 × 599 aubergine panel (see WidePanelSection). Personal agents (3312:29867) passes its own headline and copy.
 */
export function Insights({
  id = "insights-title",
  initial = "Y",
  firstLine = "ou see what happened",
  copy = (
    <>
      You&rsquo;ll see what customers asked and what they picked plus the carts, orders and support cases associated.
    </>
  ),
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  copy?: ReactNode;
}) {
  return (
    <WidePanelSection
      id={id}
      eyebrow="Insights"
      initial={initial}
      firstLine={firstLine}
      variant="airy"
      layout="inline"
      copyWidth={477.244}
      copy={<p>{copy}</p>}
    />
  );
}
