import "../HumanMode/HumanModeTheme.css";
import "../HumanMode/HumanMode.css";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ComparisonRow } from "../../components/ill/ComparisonRow";
import { Button } from "../../components/ill/Button";
import { brand, knowsHowToGuide } from "../HumanMode/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Enter, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const { userMessage, assistantMessage, recommended, current } = knowsHowToGuide;

const beats: Beat[] = [
  { id: "ask", type: "compose", text: userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: assistantMessage },
  { id: "compare", type: "load", ms: 700 },
  { id: "actions", type: "appear" },
];

export function KnowsHowToGuideMotion() {
  return (
    <ChatMotionScene brand={brand} beats={beats} width={327} height={336} className="ill-theme-human-mode">
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ChatMessage role="user" text={userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={assistantMessage} />}
              {t.reached("compare") && (
                <LoadingFrame loading={t.loading("compare")} radius={9} className="ill-human-mode__comparison">
                  <div className="ill-human-mode__comparison-header">
                    <div className="ill-human-mode__comparison-header-cell" />
                    <div className="ill-human-mode__comparison-header-cell">
                      <Thumbnail src={recommended.image} alt={recommended.name} size={26} />
                      <p className="ill-human-mode__comparison-name ill-human-mode__comparison-name--favored">
                        {recommended.name}
                      </p>
                    </div>
                    <div className="ill-human-mode__comparison-header-cell">
                      <Thumbnail src={current.image} alt={current.name} size={26} />
                      <p className="ill-human-mode__comparison-name">{current.name}</p>
                    </div>
                  </div>
                  <ComparisonRow label="Price" valueA={recommended.price} valueB={current.price} />
                </LoadingFrame>
              )}
              {t.reached("actions") && (
                <Enter>
                  <div className="ill-human-mode__actions">
                    <Button appearance="secondary" label="View ingredients" />
                    <Button appearance="primary" label="Add to cart" />
                  </div>
                </Enter>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatMotionScene>
  );
}
