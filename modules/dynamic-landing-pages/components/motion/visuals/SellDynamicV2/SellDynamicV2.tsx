import { StorybookCardSkin, StorybookComposerDefault } from "../../components/ill/ProductCardSkin";
import { RoasGapMotion } from "../RoasGap/RoasGapMotion";
import { ComparisonToolsMotion } from "../ComparisonToolsMotion/ComparisonToolsMotion";
import { OffersComposerMotion } from "../Offers/OffersComposerMotion";
import { BuildBundleMotion } from "../BuildBundle/BuildBundleMotion";
import { PersonalizedContentMotion } from "../AdToPageMotion/AdToPageMotion";
import { GamesRewardsMotion } from "../GamesRewardsMotion/GamesRewardsMotion";
import { AskAiRightOnPageMotion } from "../AskAiRightOnPageMotion/AskAiRightOnPageMotion";
import { CrossSellMotion } from "../CrossSellMotion/CrossSellMotion";
import { GistUpFrontMotion } from "../GistUpFrontMotion/GistUpFrontMotion";
import { DirectAskMotion } from "../DirectAskMotion/DirectAskMotion";
import { AdJourneyMotion } from "../AdJourneyMotion/AdJourneyMotion";
import { DedicatedLandingPagesMotion, AdaptiveProductPagesMotion } from "../AdaptivePages/AdaptivePagesMotion";

// Sell: Dynamic 03–06 against STORYBOOK_MAPPING.md. The original visuals
// and their motion render unchanged inside the .sbl layer
// (SellDynamicV2.css) with StorybookCardSkin on, which swaps their
// product cards for 01's ProductCard rail and restyles the Crossword surfaces to the
// Storybook while keeping each original's colours (§11). 06 is ChatGPT's
// own UI with no Crossword surface, so the layer leaves it as is.
export function Layer({ children }: { children: React.ReactNode }) {
  return (
    <StorybookCardSkin.Provider value>
      <StorybookComposerDefault.Provider value>
        <div className="sbl">{children}</div>
      </StorybookComposerDefault.Provider>
    </StorybookCardSkin.Provider>
  );
}

// Only the source's `Layer` and the 13 motion visuals on the Dynamic landing pages page (01–13, in
// the page's order): the other visuals this file also exports aren't on this page.
export const RoasGapV2Motion = () => <Layer><RoasGapMotion /></Layer>;
export const DedicatedLandingPagesV2Motion = () => <Layer><DedicatedLandingPagesMotion /></Layer>;
export const ComparisonToolsV2Motion = () => <Layer><ComparisonToolsMotion /></Layer>;
export const GamesRewardsV2Motion = () => <Layer><GamesRewardsMotion /></Layer>;
export const BuildBundleV2Motion = () => <Layer><BuildBundleMotion /></Layer>;
export const AdJourneyV2Motion = () => <Layer><AdJourneyMotion /></Layer>;
export const PersonalizedContentV2Motion = () => <Layer><PersonalizedContentMotion /></Layer>;
export const OffersComposerV2Motion = () => <Layer><OffersComposerMotion /></Layer>;
export const AdaptiveProductPagesV2Motion = () => <Layer><AdaptiveProductPagesMotion /></Layer>;
export const AskAiRightOnPageV2Motion = () => <Layer><AskAiRightOnPageMotion /></Layer>;
export const GistUpFrontV2Motion = () => <Layer><GistUpFrontMotion /></Layer>;
export const DirectAskV2Motion = () => <Layer><DirectAskMotion /></Layer>;
export const CrossSellV2Motion = () => <Layer><CrossSellMotion /></Layer>;
