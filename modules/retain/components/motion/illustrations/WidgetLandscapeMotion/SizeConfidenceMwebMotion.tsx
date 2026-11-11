import { useRef } from "react";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Icon } from "../../components/ill/Icon";
import { Rating } from "../../components/ill/Rating";
import { SizedProductCard } from "../WidgetLandscape/SizeConfidence";
import { sizeConfidence as s } from "../WidgetLandscape/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat, Timeline } from "../SellMotion/useChatTimeline";
import cartIconImage from "../../../../assets/motion/ill-icons/cart.svg";

const cartIcon = cartIconImage.src;

const recommendation = s.recommendation.replace("a Medium.", "a **Medium**.");
const p = s.product;

// 12m — Retain 12 (the Ask AI drawer) as mobile web at 353x440. The
// Marais PDP at phone width: "Ask AI" in the header presses, a scrim
// fades in and the chat rises as a sheet over the page (on a phone the
// drawer's left edge becomes the bottom edge), then 12's two exchanges
// play unchanged. Plays once.
const beats: Beat[] = [
  { id: "store", type: "pause", ms: 1400 },
  { id: "tap-ask", type: "appear", ms: 300 },
  { id: "open", type: "appear", ms: 600 },
  { id: "ask", type: "compose", text: s.userQuestion, leadMs: 300 },
  { id: "think", type: "think", labels: ["Thinking", "Checking the fit"] },
  { id: "reply", type: "text", text: recommendation },
  { id: "choose", type: "compose", text: s.userChoice },
  { id: "think2", type: "think", labels: ["Adding to cart"] },
  { id: "confirm", type: "text", text: s.confirmation },
  { id: "card", type: "load" },
];

const shellState = (t: Timeline) =>
  [
    "ill-landscape-shell ill-landscape-shell--compact ill-landscape-shell--aubergine ill-shell--standard scm2-sheet",
    t.reached("tap-ask") && "scm2-sheet--tap",
    t.reached("open") && "scm2-sheet--open",
  ].filter(Boolean).join(" ");

function MobilePdp() {
  return (
    <div className="scm2-page" aria-hidden>
      <div className="scm2-url"><Icon name="lock" size={10} />{s.url.toLowerCase()}</div>
      <header className="scm2-nav">
        <span className="scm2-logo">{s.brand}</span>
        <span className="scm2-ask"><Icon name="spark" size={11} />Ask AI</span>
        <img className="scm2-cart" src={cartIcon} alt="" width={18} height={18} />
      </header>
      <div className="scm2-media"><img src={p.image} alt="" /></div>
      <div className="scm2-info">
        <span className="scm2-brand">{p.brand}</span>
        <p className="scm2-title">{p.title}</p>
        <div className="scm2-price"><b>{p.price}</b><Rating value={p.rating} count={p.ratingCount} /></div>
        <div className="scm2-sizes">{p.sizes.map((z) => <span key={z}>{z}</span>)}</div>
        <span className="scm2-cta">Add to Cart</span>
      </div>
    </div>
  );
}

export function SizeConfidenceMwebMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <figure className="scm2-figure" ref={rootRef}>
      <div className="scm2-canvas">
        <div className="scm2-window">
          <MobilePdp />
          <div className="scm2-scrim" />
          <ChatMotionScene brand={s.brand} beats={beats} observeRef={rootRef} width={313} height={348} className={shellState} growComposer>
            {(t) =>
              t.passed("ask") && (
                <>
                  <UserTurn animateIn><ChatMessage role="user" text={s.userQuestion} /></UserTurn>
                  <AssistantTurn animateIn>
                    <Thinking t={t} id="think" />
                    {t.reached("reply") && <AssistantText text={recommendation} />}
                  </AssistantTurn>
                  {t.passed("choose") && (
                    <>
                      <UserTurn animateIn><ChatMessage role="user" text={s.userChoice} /></UserTurn>
                      <AssistantTurn animateIn>
                        <Thinking t={t} id="think2" />
                        {t.reached("confirm") && <AssistantText text={s.confirmation} />}
                        {t.reached("card") && (
                          <LoadingFrame loading={t.loading("card")} radius={12}><SizedProductCard /></LoadingFrame>
                        )}
                      </AssistantTurn>
                    </>
                  )}
                </>
              )
            }
          </ChatMotionScene>
        </div>
      </div>
    </figure>
  );
}
