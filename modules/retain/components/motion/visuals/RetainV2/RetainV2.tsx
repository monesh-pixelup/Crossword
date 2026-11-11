import { Layer } from "../SellDynamicV2/SellDynamicV2";
import { CartRecoveryMotion } from "../../illustrations/RetainMotion/CartRecoveryMotion";
import { BrowseRecoveryMotion } from "../../illustrations/RetainMotion/BrowseRecoveryMotion";
import { BackInStockMotion } from "../../illustrations/RetainMotion/BackInStockMotion";
import { PriceDropMotion } from "../../illustrations/RetainMotion/PriceDropMotion";
import { ReplenishmentMotion } from "../../illustrations/RetainMotion/ReplenishmentMotion";
import { OutboundCampaignMotion } from "../../illustrations/CampaignsMotion/OutboundCampaignMotion";
import { SegmentedCampaignMotion } from "../../illustrations/CampaignsMotion/SegmentedCampaignMotion";
import { PostPurchaseFollowUpMotion } from "../../illustrations/CampaignsMotion/PostPurchaseFollowUpMotion";
import { WinBackCampaignMotion } from "../../illustrations/CampaignsMotion/WinBackCampaignMotion";
import { ReviewSolicitationMotion } from "../../illustrations/CampaignsMotion/ReviewSolicitationMotion";
import { DemandDiscoveryMotion } from "../../illustrations/WidgetLandscapeMotion/DemandDiscoveryMotion";
import { SizeConfidenceMotion } from "../../illustrations/WidgetLandscapeMotion/SizeConfidenceMotion";
import { SizeConfidenceDrawerMotion } from "../../illustrations/WidgetLandscapeMotion/SizeConfidenceDrawerMotion";
import { SizeConfidenceMwebMotion } from "../../illustrations/WidgetLandscapeMotion/SizeConfidenceMwebMotion";
import { LaunchAudience, LaunchAudienceMotion } from "../../illustrations/LaunchAudience/LaunchAudience";

// Retain motion against STORYBOOK_MAPPING.md, as Sell: Dynamic v2: each
// original renders unchanged inside the .sbl layer, which restyles the
// Crossword surfaces to the Storybook and keeps the originals' colours
// (§11). RetainV2.css adds the Retain-only surfaces (the module, its rows).
// 01 and 06 are iMessage — third-party chrome, so the layer leaves them be.
export const CartRecoveryV2Motion = () => <Layer><CartRecoveryMotion /></Layer>;
export const BrowseRecoveryV2Motion = () => <Layer><BrowseRecoveryMotion /></Layer>;
export const BackInStockV2Motion = () => <Layer><BackInStockMotion /></Layer>;
export const PriceDropV2Motion = () => <Layer><PriceDropMotion /></Layer>;
export const ReplenishmentV2Motion = () => <Layer><ReplenishmentMotion /></Layer>;
export const OutboundCampaignV2Motion = () => <Layer><OutboundCampaignMotion /></Layer>;
export const SegmentedCampaignV2Motion = () => <Layer><SegmentedCampaignMotion /></Layer>;
export const PostPurchaseFollowUpV2Motion = () => <Layer><PostPurchaseFollowUpMotion /></Layer>;
export const WinBackCampaignV2Motion = () => <Layer><WinBackCampaignMotion /></Layer>;
export const ReviewSolicitationV2Motion = () => <Layer><ReviewSolicitationMotion /></Layer>;
export const DemandDiscoveryV2Motion = () => <Layer><DemandDiscoveryMotion /></Layer>;
export const SizeConfidenceV2Motion = () => <Layer><SizeConfidenceMotion /></Layer>;
// 12b: 12 opened from the header's "Ask AI" into a left drawer.
export const SizeConfidenceDrawerV2Motion = () => <Layer><SizeConfidenceDrawerMotion /></Layer>;
// 12m: 12 as mobile web (353x440), in the same Storybook layer.
export const SizeConfidenceMwebV2Motion = () => <Layer><SizeConfidenceMwebMotion /></Layer>;
// 11 (formerly 13; the original 11, DemandDiscovery, is archived) is the
// Storybook Insights dashboard itself, so it needs no layer.
// Statics on retain-v2.html; the motion on retain-v2-motion.html.
export const LaunchAudienceStep1 = () => <LaunchAudience step={1} />;
export const LaunchAudienceStep2 = () => <LaunchAudience step={2} />;
export const LaunchAudienceStep3 = () => <LaunchAudience step={3} />;
export const LaunchAudienceStep4 = () => <LaunchAudience step={4} />;
export const LaunchAudienceV2Motion = () => <LaunchAudienceMotion />;
