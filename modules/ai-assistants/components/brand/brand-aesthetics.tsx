import { WidePanelSection } from "../wide-panel/wide-panel-section";

/**
 * Figma "Section · Brand aesthetics" (node 3305:1012), as Human mode on Sell: the eyebrow and a two-line headline
 * (Crimson Light 60 at 1.1) on the left, a 723px line of Geist bottom-aligned on the right, then 80px below the 1280 × 599 aubergine
 * panel (see WidePanelSection).
 */
export function BrandAesthetics() {
  return (
    <WidePanelSection
      id="brand-aesthetics-title"
      eyebrow="Brand aesthetics"
      initial="Y"
      firstLine=" our brand,"
      secondLine="inside ChatGPT"
      variant="default"
      layout="split"
      copyWidth={723.103}
      copy={
        <p>
          Shoppers see your name, your look and your catalog, not a generic assistant. It works as your own app, running on
          ChatGPT.
        </p>
      }
    />
  );
}
