import "../HumanMode/HumanModeTheme.css";
import "../HumanMode/HumanMode.css";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { Button } from "../../components/ill/Button";
import { brand, knowsWhenToHelp } from "../HumanMode/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const { proactiveMessage, userMessage, assistantMessage, product, ctaLabel } = knowsWhenToHelp;

// Crossword opens the thread itself, same no-ask precedent as the
// static — the proactive line plays as its own cascading "reply" beat
// before the shopper's own turn even exists.
const beats: Beat[] = [
  { id: "intro", type: "text", text: proactiveMessage },
  { id: "ask", type: "compose", text: userMessage, leadMs: 500 },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: assistantMessage },
  { id: "card", type: "load", ms: 600 },
];

export function KnowsWhenToHelpMotion() {
  return (
    <ChatMotionScene brand={brand} beats={beats} width={327} height={336} className="ill-theme-human-mode">
      {(t) =>
        t.reached("intro") && (
          <>
            <AssistantTurn animateIn>
              <AssistantText text={proactiveMessage} />
            </AssistantTurn>
            {t.passed("intro") && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  <Thinking t={t} id="think" />
                  {t.reached("reply") && <AssistantText text={assistantMessage} />}
                  {t.reached("card") && (
                    <LoadingFrame loading={t.loading("card")} radius={12} className="ill-human-mode__card">
                      <div className="ill-human-mode__card-top">
                        <Thumbnail src={product.image} alt={product.title} size={38} />
                        <ProductMeta brand={product.brand} title={product.title} price={product.price} />
                      </div>
                      <Button appearance="secondary" label={ctaLabel} />
                    </LoadingFrame>
                  )}
                </AssistantTurn>
              </>
            )}
          </>
        )
      }
    </ChatMotionScene>
  );
}
