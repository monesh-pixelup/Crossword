import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { LandscapeCanvas } from "../WidgetLandscape/LandscapeCanvas";
import { JacketPdpScene, SizedProductCard } from "../WidgetLandscape/SizeConfidence";
import { sizeConfidence as s } from "../WidgetLandscape/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// The static bolds "Medium" inline; RichStagger carries that through the
// word cascade.
const recommendation = s.recommendation.replace("a Medium.", "a **Medium**.");

// Motion sibling of Landscape 12. Two exchanges: the size question and
// its confident answer, then the shopper's choice and the card landing
// in its resolved "Added to cart" state.
const beats: Beat[] = [
  { id: "ask", type: "compose", text: s.userQuestion },
  { id: "think", type: "think", labels: ["Thinking", "Checking the fit"] },
  { id: "reply", type: "text", text: recommendation },
  { id: "choose", type: "compose", text: s.userChoice },
  { id: "think2", type: "think", labels: ["Adding to cart"] },
  { id: "confirm", type: "text", text: s.confirmation },
  { id: "card", type: "load" },
];

export function SizeConfidenceMotion() {
  return (
    <LandscapeCanvas
      backdrop="purple"
      bleed
      scene={<JacketPdpScene />}
      widget={
        <ChatMotionScene
          brand={s.brand}
          beats={beats}
          expandAfter="ask"
          width={600}
          height={370}
          className="ill-landscape-shell ill-landscape-shell--compact ill-landscape-shell--aubergine"
        >
          {(t) =>
            t.passed("ask") && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={s.userQuestion} />
                </UserTurn>
                <AssistantTurn animateIn>
                  <Thinking t={t} id="think" />
                  {t.reached("reply") && <AssistantText text={recommendation} />}
                </AssistantTurn>
                {t.passed("choose") && (
                  <>
                    <UserTurn animateIn>
                      <ChatMessage role="user" text={s.userChoice} />
                    </UserTurn>
                    <AssistantTurn animateIn>
                      <Thinking t={t} id="think2" />
                      {t.reached("confirm") && <AssistantText text={s.confirmation} />}
                      {t.reached("card") && (
                        <LoadingFrame loading={t.loading("card")} radius={12}>
                          <SizedProductCard />
                        </LoadingFrame>
                      )}
                    </AssistantTurn>
                  </>
                )}
              </>
            )
          }
        </ChatMotionScene>
      }
    />
  );
}
