import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { Button } from "../../components/ill/Button";
import { RetainModule, RetainRow } from "../Retain/RetainParts";
import { priceDrop as s } from "../Retain/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Retain / 04. Proactive — Crossword speaks first, so
// there's no compose beat: thinking, the message, then the module
// resolving out of its skeleton (mounted already covered).
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking", "Finding offers"] },
  { id: "reply", type: "text", text: s.message },
  { id: "module", type: "load" },
];

export function PriceDropMotion() {
  return (
    <ConversionAssistanceFrame>
      <ChatMotionScene brand={s.brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={s.message} />}
              {t.reached("module") && (
                <LoadingFrame loading={t.loading("module")} radius={12}>
                  <RetainModule product={s.product} label={s.discount}>
                    <RetainRow
                      label={
                        <>
                          Code <span className="ill-retain-price__code">{s.coupon}</span>
                        </>
                      }
                    >
                      <span className="ill-retain-price__was">{s.was}</span>
                      <span className="ill-retain-price__now">{s.now}</span>
                    </RetainRow>
                    <Button appearance="primary" label={s.cta} />
                  </RetainModule>
                </LoadingFrame>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </ConversionAssistanceFrame>
  );
}
