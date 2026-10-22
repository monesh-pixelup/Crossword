import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { Button } from "../../components/ill/Button";
import { RetainModule, RetainRow } from "../Retain/RetainParts";
import { replenishment as s } from "../Retain/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Retain / 05. Proactive — Crossword speaks first, so
// there's no compose beat: thinking, the message, then the module
// resolving out of its skeleton (mounted already covered).
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking", "Checking past orders"] },
  { id: "reply", type: "text", text: s.message },
  { id: "module", type: "load" },
];

export function ReplenishmentMotion() {
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
                  <RetainModule product={s.product} label={s.label}>
                    <RetainRow label="Last order">{s.lastOrder}</RetainRow>
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
