import "../HumanMode/HumanModeTheme.css";
import "../HumanMode/HumanMode.css";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { Button } from "../../components/ill/Button";
import { Icon } from "../../components/ill/Icon";
import { brand, knowsWhenYoureReady } from "../HumanMode/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const { userMessage, assistantMessage, product } = knowsWhenYoureReady;

const beats: Beat[] = [
  { id: "ask", type: "compose", text: userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: assistantMessage },
  { id: "card", type: "load", ms: 600 },
];

export function KnowsWhenYoureReadyMotion() {
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
              {t.reached("card") && (
                <LoadingFrame loading={t.loading("card")} radius={12} className="ill-human-mode__card">
                  <div className="ill-human-mode__card-top">
                    <Thumbnail src={product.image} alt={product.title} size={38} />
                    <ProductMeta brand={product.brand} title={product.title} price={product.price} />
                  </div>
                  <Button appearance="secondary" label="Added to your cart" iconLeading={<Icon name="checks" size={11} />} />
                </LoadingFrame>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatMotionScene>
  );
}
