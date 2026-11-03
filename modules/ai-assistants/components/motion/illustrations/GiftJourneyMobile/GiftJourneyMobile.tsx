import { ProductImage } from "../../visuals/AiAssistantsV3/ProductImage";
import { SceneFrame } from "../../components/ill/SceneFrame";
import { ScaleToFit } from "../../components/ill/ScaleToFit";
import { ChatHead, ChatFoot, UserMsg, AiMsg, Rail, Followups, AureliaMark, AureliaIdentity } from "../GiftJourneyV2/GiftJourneyV2";
import { StarterChips } from "../../visuals/PlaceItWhereverV2/PlaceItWhereverV2";
import { brand, turn1, firstPicks, turn2, pendants } from "../GiftJourney/data";
import storefrontBannerImage from "@/modules/ai-assistants/assets/motion/scenarios/gift-journey-motion/mobile-store-banner.png";

const storefrontBanner = storefrontBannerImage.src;

const storefrontProducts = [firstPicks[0], firstPicks[2]];

// Each screen is laid out at a phone's native 375x812 and scaled into the
// frame; two sit side by side.
const PHONE_W = 375;
const PHONE_H = 812;
// Same frame (738x680) and shell height (520) as the desktop 01 visual.
export const SLOT_H = 520;
export const SLOT_W = (PHONE_W * SLOT_H) / PHONE_H;
export { PHONE_W, PHONE_H };

// 01 — Sell: Conversational interface, mobile. Same SceneFrame and copy as
// GiftJourneyV2; the widget takes the product's phone form (Storybook,
// ≤480px): a bottom sheet over the store, full width from 1rem below the
// top, top corners 1.25rem, a grab pill, the store dimmed by a 20% scrim,
// and no expand control. Two static states, left to right: idle (the
// launcher at rest with its suggestions stacked above, as in the repo's
// launcher) and the conversation, top of thread. No device bezel.
export function GiftJourneyMobile() {
  return (
    <SceneFrame>
      <div className="gjm-pair">
        <ScaleToFit contentWidth={PHONE_W} contentHeight={PHONE_H} maxWidth={SLOT_W} maxHeight={SLOT_H}>
          <div className="gjm-screen">
            <StorePage />
            <div className="gjm-launcher">
              <StarterChips />
              <span className="piw2-orb" aria-label="Open chat">
                <AureliaMark className="gjm-orb-mark" />
              </span>
            </div>
          </div>
        </ScaleToFit>
        <ScaleToFit contentWidth={PHONE_W} contentHeight={PHONE_H} maxWidth={SLOT_W} maxHeight={SLOT_H}>
          <div className="gjm-screen">
            <StorePage />
            <div className="gjm-scrim" />
            <div className="gj2-win gjm-sheet">
              <span className="gjm-grab" aria-hidden="true" />
              <ChatHead />
              <div className="gj2-transcript">
                <UserMsg text={turn1.userMessage} />
                <AiMsg text={turn1.assistantMessage} />
                <Rail products={firstPicks} />
                <Followups items={turn1.followups} />
                <UserMsg text={turn2.userMessage} />
                <AiMsg text={turn2.assistantMessage} />
                <Rail products={pendants} />
                <Followups items={turn2.followups} />
              </div>
              <ChatFoot />
            </div>
          </div>
        </ScaleToFit>
      </div>
    </SceneFrame>
  );
}

// The store behind the sheet: a wireframe laid out like the Storybook's
// mobile storefront backdrop (clients/greedy/site-mobile.html) —
// announcement bar, header, full-bleed hero, feature strip, product grid —
// with AURELLE copy and the conversation's catalogue photography,
// under a real iOS status bar.
export function StorePage() {
  return (
    <div className="gjm-store">
      <IosStatusBar />
      <div className="gjm-store__announce">The {brand} gift edit</div>
      <div className="gjm-store__bar">
        <span className="gjm-store__menu" aria-hidden="true"><i /><i /><i /></span>
        <AureliaIdentity />
        <span className="gjm-store__bag" aria-hidden="true" />
      </div>
      <div className="gjm-store__hero">
        <img className="gjm-store__hero-img" src={storefrontBanner} alt="Gold teardrop pendant on ivory silk and pale stone" />
        <div className="gjm-store__hero-copy">
          <h2 className="gjm-store__headline">For someone special.</h2>
          <p className="gjm-store__sub">Gold and rose-gold pieces under $150.</p>
          <span className="gjm-store__cta">Shop gifts</span>
        </div>
      </div>
      <div className="gjm-store__strip"><span>Necklaces</span><span>Bracelets</span><span>Anklets</span></div>
      <h3 className="gjm-store__title">The gift edit</h3>
      <div className="gjm-store__grid">
        {storefrontProducts.map((product) => (
          <div key={product.id} className="gjm-store__card">
            {product.image && <ProductImage className="gjm-store__img" src={product.image} alt={product.title} width={443} height={253} />}
            <span className="gjm-store__product-name">{product.title}</span>
            <span className="gjm-store__price">{product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// iOS status bar (iPhone 15 / Dynamic Island era): 54pt tall, the time in
// SF Pro 17pt semibold on the left, cellular, Wi-Fi and battery on the
// right, each drawn at the system glyphs' own proportions.
export function IosStatusBar() {
  return (
    <div className="gjm-status" aria-hidden="true">
      <span className="gjm-status__time">9:41</span>
      <span className="gjm-status__right">
        <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.8" />
          <rect x="5.1" y="5" width="3.2" height="7" rx="0.8" />
          <rect x="10.2" y="2.5" width="3.2" height="9.5" rx="0.8" />
          <rect x="15.3" y="0" width="3.2" height="12" rx="0.8" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <path d="M8.5 2.3c2.3 0 4.4.9 6 2.4.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4A11.1 11.1 0 0 0 8.5 0C5.6 0 2.9 1.1.9 3.1c-.1.1-.1.3 0 .4L2.1 4.7c.1.1.3.1.4 0a8.7 8.7 0 0 1 6-2.4Z" />
          <path d="M8.5 6c1.3 0 2.5.5 3.4 1.3.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4A7.2 7.2 0 0 0 8.5 3.7c-1.8 0-3.6.7-5 2-.1.1-.1.3 0 .4l1.2 1.2c.1.1.3.1.4 0C6 6.5 7.2 6 8.5 6Z" />
          <path d="M10.9 8.6c.1-.1.1-.3 0-.4a3.6 3.6 0 0 0-4.8 0c-.1.1-.1.3 0 .4l2.2 2.2c.1.1.3.1.4 0l2.2-2.2Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" stroke="currentColor" opacity="0.35" />
          <rect x="2" y="2" width="20" height="9" rx="2.5" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}
