import { AiaScenePanel } from "../motion/aia-scene-panel";
import { WidePanelSection } from "../wide-panel/wide-panel-section";

/**
 * Figma "Section · Brand aesthetics" (node 3305:1012), as Human mode on Sell: the eyebrow and a two-line headline
 * (Crimson Light 60 at 1.1) on the left, a 723px line of Geist bottom-aligned on the right, then 80px below the 1280 × 599
 * panel (see WidePanelSection), playing AI Assistants V3 11: ChatGPT's plugin page for the brand, revealed once it lands.
 * On phones, 11m: the same page in ChatGPT's mobile web layout (353 × 440).
 */
export function BrandAesthetics() {
  return (
    <WidePanelSection
      id="brand-aesthetics-title"
      eyebrow="Brand aesthetics"
      initial="Y"
      firstLine="our brand,"
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
      mobilePanel={<AiaScenePanel slug="app-detail-mweb-motion" fill transform />}
    >
      {/* Fills the content width (past its drawn 1280px on wide screens); a transform, so it shrinks cleanly on phones. */}
      <AiaScenePanel slug="app-detail-motion" fill transform />
    </WidePanelSection>
  );
}
