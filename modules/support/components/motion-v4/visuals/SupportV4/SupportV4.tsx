import { useEffect, useRef } from "react";
import { Layer } from "../SellDynamicV2/SellDynamicV2";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { OrderTrackingMotion } from "../../illustrations/SupportV3/motion/OrderTrackingMotion";
import { ProductUsageMotion } from "../../illustrations/SupportV3/motion/ProductUsageMotion";
import { SizeExchangeMotion } from "../../illustrations/SupportV3/motion/SizeExchangeMotion";
import { ShadeChangeMotion } from "../../illustrations/SupportV3/motion/ShadeChangeMotion";
import { RefundStatusMotion } from "../../illustrations/SupportV3/motion/RefundStatusMotion";
import { ReturnEligibilityMotion } from "../../illustrations/SupportV3/motion/ReturnEligibilityMotion";
import { MerchantHelpdeskMotion } from "../../illustrations/SupportV3/motion/MerchantHelpdeskMotion";
import { MerchantInsightMotion } from "../../illustrations/SupportV3/motion/MerchantInsightMotion";
import { GuardrailsMotion } from "../../illustrations/SupportV3/motion/GuardrailsMotion";
import { HumanTakeoverMotion } from "../../illustrations/SupportV3/motion/HumanTakeoverMotion";
import { MerchantApprovalCardMotion } from "../../illustrations/SupportV3/motion/MerchantApprovalCardMotion";
import { WhisperToAgentFloatingMotion } from "../../illustrations/SupportV3/motion/WhisperToAgentFloatingMotion";

// GiftJourneyV2Motion's FADE_CLEARANCE.
const FADE_CLEARANCE = 32;

// Follow-the-latest (§15) for 01–06: the layer's type and footer make
// their turns outgrow the transcript, and these originals never scroll,
// so the card's foot ended under the composer. Keeps the last turn's
// edge above the bottom fade, as useFollowLatest does on 09–16.
function Follow({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancel: (() => void) | undefined;
    let viewport: HTMLElement | null = null;
    const resizes = new ResizeObserver(() => follow());
    const follow = () => {
      const target = viewport?.lastElementChild;
      if (!viewport || !target) return;
      // In the viewport's own CSS px: the site zooms each visual to fit its
      // panel, and getBoundingClientRect reports zoomed values while
      // scrollTop doesn't. 1 (a no-op) at the visual's drawn size.
      const vr = viewport.getBoundingClientRect();
      const zoom = viewport.offsetHeight ? vr.height / viewport.offsetHeight : 1;
      const bottom = target.getBoundingClientRect().bottom / zoom;
      const edge = vr.bottom / zoom - FADE_CLEARANCE;
      if (bottom <= edge) return;
      const top = viewport.scrollTop + bottom - edge;
      cancel?.();
      if (reduced) viewport.scrollTop = top;
      else cancel = animateScrollTo(viewport, top);
    };
    const watch = () => {
      viewport = root.querySelector<HTMLElement>(".ill-conversation-viewport__content");
      if (!viewport) return;
      [...viewport.children].forEach((child) => resizes.observe(child));
      follow();
    };
    const mutations = new MutationObserver(watch);
    mutations.observe(root, { childList: true, subtree: true });
    watch();
    return () => {
      mutations.disconnect();
      resizes.disconnect();
      cancel?.();
    };
  }, []);
  return <div ref={rootRef}>{children}</div>;
}

// Scopes SupportV4.css to this page: the layer itself is shared with
// Sell and Retain, and `display: contents` keeps the wrapper out of layout.
function V4({ children }: { children: React.ReactNode }) {
  return (
    <Layer>
      <div className="sv4">{children}</div>
    </Layer>
  );
}

// Support V3 motion against STORYBOOK_MAPPING.md, as Sell: Dynamic v2 and
// Retain v2: each original renders unchanged inside the .sbl layer, which
// restyles the Crossword surfaces to the Storybook and keeps the
// originals' colours (§11). Merchant-side UI (helpdesk, guardrails panel,
// insight card) is left to the originals.
export const OrderTrackingV4Motion = () => <V4><Follow><OrderTrackingMotion /></Follow></V4>;
export const ProductUsageV4Motion = () => <V4><Follow><ProductUsageMotion /></Follow></V4>;
export const SizeExchangeV4Motion = () => <V4><Follow><SizeExchangeMotion /></Follow></V4>;
export const ShadeChangeV4Motion = () => <V4><Follow><ShadeChangeMotion /></Follow></V4>;
export const RefundStatusV4Motion = () => <V4><Follow><RefundStatusMotion /></Follow></V4>;
export const ReturnEligibilityV4Motion = () => <V4><Follow><ReturnEligibilityMotion /></Follow></V4>;
export const MerchantHelpdeskV4Motion = () => <V4><MerchantHelpdeskMotion /></V4>;
export const MerchantInsightV4Motion = () => <V4><MerchantInsightMotion /></V4>;
export const GuardrailsV4Motion = () => <V4><GuardrailsMotion /></V4>;
export const HumanTakeoverV4Motion = () => <V4><HumanTakeoverMotion /></V4>;
export const MerchantApprovalCardV4Motion = () => <V4><MerchantApprovalCardMotion /></V4>;
export const WhisperToAgentFloatingV4Motion = () => <V4><WhisperToAgentFloatingMotion /></V4>;
