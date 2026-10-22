import { HelpdeskHeader } from "../../components/ill/HelpdeskHeader";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { LandscapeCanvas } from "../WidgetLandscape/LandscapeCanvas";
import { AudienceCard, MerchantAdminScene } from "../WidgetLandscape/DemandDiscovery";
import { demandDiscovery as s } from "../WidgetLandscape/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Landscape 11. The merchant's request is typed and
// sent, Crossword works it out, the audience card resolves out of its
// skeleton, and the merchant's "Yes!" closes it — still no sending/sent
// state, since the script doesn't depict one.
const beats: Beat[] = [
  { id: "ask", type: "compose", text: s.brandRequest },
  { id: "think", type: "think", labels: ["Thinking", "Matching past conversations"] },
  { id: "reply", type: "text", text: s.reply },
  { id: "card", type: "load", ms: 750 },
  { id: "approve", type: "compose", text: s.approval },
];

export function DemandDiscoveryMotion() {
  return (
    <LandscapeCanvas
      backdrop="green"
      bleed
      scene={<MerchantAdminScene />}
      widget={
        <ChatMotionScene
          brand={s.brand}
          beats={beats}
          expandAfter="ask"
          header={<HelpdeskHeader brand={s.brand} />}
          width={600}
          height={370}
          className="ill-landscape-shell ill-landscape-shell--compact"
        >
          {(t) =>
            t.passed("ask") && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={s.brandRequest} />
                </UserTurn>
                <AssistantTurn animateIn>
                  <Thinking t={t} id="think" />
                  {t.reached("reply") && <AssistantText text={s.reply} />}
                  {t.reached("card") && (
                    <LoadingFrame loading={t.loading("card")} radius={12}>
                      <AudienceCard />
                    </LoadingFrame>
                  )}
                </AssistantTurn>
                {t.passed("approve") && (
                  <UserTurn animateIn>
                    <ChatMessage role="user" text={s.approval} />
                  </UserTurn>
                )}
              </>
            )
          }
        </ChatMotionScene>
      }
    />
  );
}
