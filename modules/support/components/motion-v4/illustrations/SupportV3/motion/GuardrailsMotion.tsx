import { useState } from "react";
import { createPortal } from "react-dom";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { Chip } from "../../../components/ill/Chip";
import { Icon } from "../../../components/ill/Icon";
import { ChatMotionScene } from "../../SellMotion/ChatMotionScene";
import { AssistantText, Enter, Thinking } from "../../SellMotion/parts";
import type { Beat, Timeline } from "../../SellMotion/useChatTimeline";
import { brand, guardrails } from "../data";
import frameBgImage from "@/modules/support/assets/motion-v4/scenarios/guardrails/frame-bg.webp";
import connectorImage from "@/modules/support/assets/motion-v4/ill-frame/guardrails-connector.svg";

const frameBg = frameBgImage.src;
const connector = connectorImage.src;

// A flow, not just a chat: the guardrails panel fades in, the connector
// draws from it to the shell, the shell fades in at the line's end, and
// only then does the conversation play. The intro beats are ordinary
// `appear` beats, so the restart-on-landing and reduced-motion behavior
// of the timeline covers them too.
const beats: Beat[] = [
  { id: "panel", type: "appear", ms: 420 },
  { id: "line", type: "appear", ms: 320 },
  { id: "shell", type: "appear", ms: 280 },
  { id: "ask", type: "compose", text: guardrails.userMessage, leadMs: 400 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your guardrails"] },
  { id: "reply", type: "text", text: guardrails.assistantMessage },
  { id: "chip", type: "appear", ms: 500 },
];

// The rule the reply is answering to ("I can't override the return
// window") — lit once the line's pulse reaches it during the check,
// released once the "Policy Respected" chip lands.
const CHECKED_RULE = 0;

// `pending` holds a beat's element invisible (layout intact) until its
// beat; `enter`/`draw` stays applied after, so the one-shot keyframe
// plays exactly once per run.
function stage(t: Timeline, id: string, played: string) {
  return t.reached(id) ? played : "ill-guardrails-motion--pending";
}

function GuardrailsPanel({ t }: { t: Timeline }) {
  const checking = t.reached("think") && !t.reached("chip");
  return (
    <div className={`ill-guardrails-panel ${stage(t, "panel", "ill-guardrails-motion--enter")}`}>
      <div className="ill-guardrails-panel__title">
        <Icon name="sparkle" />
        <p>{guardrails.heading}</p>
      </div>
      <div className="ill-guardrails-panel__rules">
        {guardrails.rules.map((rule, i) => (
          <div
            className={`ill-guardrails-rule${checking && i === CHECKED_RULE ? " ill-guardrails-rule--checking" : ""}`}
            key={i}
          >
            <div className="ill-guardrails-rule__leading-icon">
              <Icon name={rule.icon} />
            </div>
            <div className="ill-guardrails-rule__text">
              <p className="ill-guardrails-rule__title">{rule.title}</p>
            </div>
            <div className="ill-guardrails-rule__icon">
              <Icon name="caretRight" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Everything on the frame that follows the shell's timeline: the panel,
// the connector (drawn left → right on its beat) and the check pulse
// (right → left along the same line while Crossword checks — "the chat
// asked the rules"; mounted only for the think beat so it plays once).
function FlowLayer({ t }: { t: Timeline }) {
  return (
    <>
      <GuardrailsPanel t={t} />
      <div className="ill-guardrails-connector-wrap">
        <img
          className={`ill-guardrails-frame__connector ${stage(t, "line", "ill-guardrails-motion--draw")}`}
          src={connector}
          alt=""
          aria-hidden="true"
        />
        {t.reached("think") && !t.passed("think") && <span className="ill-guardrails-pulse" aria-hidden="true" />}
      </div>
    </>
  );
}

function Conversation(t: Timeline) {
  return (
    t.passed("ask") && (
      <>
        <UserTurn animateIn>
          <ChatMessage role="user" text={guardrails.userMessage} />
        </UserTurn>
        <AssistantTurn animateIn>
          <Thinking t={t} id="think" />
          {t.reached("reply") && (
            <div className="ill-guardrails-reply">
              <AssistantText text={guardrails.assistantMessage} />
              {t.reached("chip") && (
                <Enter>
                  <Chip>
                    <span className="ill-guardrails-policy-chip">
                      {guardrails.policyChip}
                      <Icon name="shieldCheck" />
                    </span>
                  </Chip>
                </Enter>
              )}
            </div>
          )}
        </AssistantTurn>
      </>
    )
  );
}

// Support V3 Motion / 09 — Guardrails. Same 1280x498 frame, panel,
// connector, cropped 550x520 shell and copy as the static Guardrails
// (see its own comments for the ground image, row-centering, crop and
// fixed 214px viewport, all reused here via Guardrails.css). The frame's
// ground stays static (the same flattened background image as the
// static scene — see its page-feedback comment there); the panel,
// connector and pulse follow the shell's own timeline, so they're
// portaled from inside the scene into a slot in the frame. The slot is
// callback-ref state so they land in the same commit as the frame (a
// layout-phase update), never a painted frame late. `.ill-guardrails-row`
// centers the group (slot + card-wrap) exactly as the static scene does
// — the portal slot is `display: contents` (SupportV3Motion.css), so its
// portaled panel/connector-wrap render as the row's own flex items, not
// a separate absolutely-positioned layer. The static sibling is
// untouched.
export function GuardrailsMotion() {
  const [flowSlot, setFlowSlot] = useState<HTMLDivElement | null>(null);
  return (
    <div className="ill-guardrails-scale">
      <div className="ill-guardrails-frame">
        <img className="ill-guardrails-frame__bg" src={frameBg} alt="" aria-hidden="true" />

        <div className="ill-guardrails-row">
          <div className="ill-guardrails-panel-slot" ref={setFlowSlot} />

          <div className="ill-guardrails-card-wrap">
            <div className="ill-guardrails-shell-crop">
              <div className="ill-guardrails-shell-inner">
                <ChatMotionScene
                  brand={brand}
                  beats={beats}
                  width={550}
                  height={520}
                  className={(t) => stage(t, "shell", "ill-guardrails-motion--shell-enter")}
                >
                  {(t) => (
                    <>
                      {flowSlot && createPortal(<FlowLayer t={t} />, flowSlot)}
                      {Conversation(t)}
                    </>
                  )}
                </ChatMotionScene>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
