import Image from "next/image";
import connectorLeft from "../../../assets/hero/decor/connector-left.svg";
import connectorRight from "../../../assets/hero/decor/connector-right.svg";
import maskInner from "../../../assets/hero/decor/mask-inner.png";
import maskOuter from "../../../assets/hero/decor/mask-outer.png";
import { ChatWindow } from "../../shared/chat-window";
import { ProductDetailCard } from "./product-detail-card";
import { ProductGalleryCard } from "./product-gallery-card";
import { backgroundCards, foregroundCards, SkeletonCards } from "./skeleton-cards";

/**
 * Decorative product mock-up under the hero copy: the chat window flanked by
 * a storefront gallery and product card, fading out into skeleton cards.
 * Built at the Figma size (1390×663 in a 1440 frame) and zoomed with the page width, like the
 * Webflow image: at 1440 / page width, then 1.8× that below 768px and 2.6× below 480px (cropped).
 */
export function HeroShowcase() {
  return (
    <div
      role="img"
      aria-label="The Crossword assistant recommending a bracelet to a shopper, next to the store's product page"
      className="fit-to-container relative h-[663px] w-[1390px] shrink-0 select-none [contain:strict] [--fit-gutter:0px] [--fit-width:1440px] max-md:[zoom:tan(atan2(1.8*100cqw,1440px))] max-xs:[zoom:tan(atan2(2.6*100cqw,1440px))]"
    >
      <div
        className="absolute top-[-24px] left-[-3px] h-[712px] w-[1397px] mask-alpha mask-no-repeat mask-position-[-101.292px_-63.292px] mask-size-[1598.584px_871.584px]"
        style={{ maskImage: `url(${maskOuter.src})` }}
      >
        <div
          className="absolute top-[-122px] left-[-229px] h-[956px] w-[1854px] mask-alpha mask-no-repeat mask-position-[185px_78px] mask-size-[1485px_800px]"
          style={{ maskImage: `url(${maskInner.src})` }}
        >
          <Image src={connectorRight} alt="" className="absolute top-[415.5px] left-[1180px] h-px w-[18px]" />
          <Image src={connectorLeft} alt="" className="absolute top-[552.5px] left-[657px] h-px w-[14px]" />
          <ProductGalleryCard />
          <ProductDetailCard />
          <SkeletonCards cards={backgroundCards} />
          <div className="absolute top-[calc(50%-5.3px)] left-[calc(50%-0.37px)] -translate-x-1/2 -translate-y-1/2">
            {/* Same window as the lifecycle section, at 0.92558× (Figma: 510.749 / 551.831). */}
            <ChatWindow tone="parchment" className="[zoom:0.92558]" />
          </div>
          <SkeletonCards cards={foregroundCards} />
        </div>
      </div>
    </div>
  );
}
