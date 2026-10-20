import "../PriceObjection/PriceObjection.css";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { ProductReference } from "../../components/ill/ProductReference";
import { Button } from "../../components/ill/Button";
import { script, product } from "../PriceObjection/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { AssistantText, Enter, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const beats: Beat[] = [
  { id: "ask", type: "compose", text: script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding alternatives"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "actions", type: "appear" },
];

export function PriceObjectionMotion() {
  return (
    <ConversionAssistanceFrame>
      <ChatMotionScene brand={script.brand} beats={beats}>
        {(t) =>
          t.passed("ask") && (
            <>
              <UserTurn animateIn>
                <ProductReference
                  image={product.image}
                  alt={product.alt}
                  brand={product.brand}
                  title={product.title}
                  price={product.price}
                />
                <ChatMessage role="user" text={script.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                <Thinking t={t} id="think" />
                {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
                {t.reached("actions") && (
                  <Enter>
                    <div className="ill-price-objection__actions">
                      <Button appearance="primary" label="Find alternatives" />
                      <Button appearance="secondary" label="Compare benefits" />
                    </div>
                  </Enter>
                )}
              </AssistantTurn>
            </>
          )
        }
      </ChatMotionScene>
    </ConversionAssistanceFrame>
  );
}
