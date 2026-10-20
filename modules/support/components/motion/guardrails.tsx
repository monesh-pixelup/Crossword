"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ChatScene } from "@/modules/sell/components/motion/chat-scene";
import type { Beat, BeatState } from "@/modules/sell/components/motion/motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  Chip,
  EnterDelayed,
  Icon,
  ThinkingStatus,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import type { IconName } from "@/modules/sell/components/motion/artwork";
import frameBg from "../../assets/motion/frame-bg.webp";

/*
 * 09 — Support: Guardrails (source `vs`). A 1280 × 498 aubergine notched
 * panel: the merchant's "Your guardrails" card, a gold connector, and a chat
 * where the assistant declines to override the return window. While it
 * thinks, a pulse runs along the connector and the refund rule is ringed.
 * The guardrails card and connector are rendered from the chat's beat state
 * and portalled into the slot to the left of the chat.
 */

const brand = "Sorelle Labs";

const copy = {
  userMessage: "I need to see what’s happening with our customer conversations.",
  assistantMessage:
    "I can't override the return window, but I can flag this to a specialist who can review exceptions.",
  policyChip: "Policy Respected",
  heading: "Your guardrails",
};

const rules: { title: string; detail: string; icon: IconName }[] = [
  { title: "Refund policy", detail: "No exceptions without approval", icon: "money" },
  { title: "Tone of voice", detail: "No exceptions without approval", icon: "userSound" },
  { title: "Escalation", detail: "Route exceptions to specialist", icon: "warning" },
];

/** The connector: a 98px gold line fading out at both ends. */
const connector =
  "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='98.3691'%20height='2'%20viewBox='0%200%2098.3691%202'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector%201803448309'%20d='M0%201H98.3691'%20stroke-width='2'%20stroke='url(%23paint0_linear_0_58)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_0_58'%20x1='98.3691'%20y1='0.999997'%20x2='-5.72342'%20y2='1.67066'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.0894771'%20stop-color='%23E0BE60'%20stop-opacity='0'/%3e%3cstop%20offset='0.332037'%20stop-color='%23E0BE60'/%3e%3cstop%20offset='0.81944'%20stop-color='%23E0BE60'/%3e%3cstop%20offset='1'%20stop-color='%23E0BE60'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

const beats: Beat[] = [
  { id: "panel", type: "appear", ms: 420 },
  { id: "line", type: "appear", ms: 320 },
  { id: "shell", type: "appear", ms: 280 },
  { id: "ask", type: "compose", text: copy.userMessage, leadMs: 400 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your guardrails"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "chip", type: "appear", ms: 500 },
];

/** The rule ringed while the assistant checks (refund policy). */
const checkingRule = 0;

/** `className` once beat `id` is reached; hidden (pending) before. */
function motionClass(t: BeatState, id: string, className: string) {
  return t.reached(id) ? className : "ill-guardrails-motion--pending";
}

function GuardrailsPanel({ t }: { t: BeatState }) {
  const checking = t.reached("think") && !t.reached("chip");
  return (
    <div className={`ill-guardrails-panel ${motionClass(t, "panel", "ill-guardrails-motion--enter")}`}>
      <div className="ill-guardrails-panel__title">
        <Icon name="sparkle" />
        <p>{copy.heading}</p>
      </div>
      <div className="ill-guardrails-panel__rules">
        {rules.map((rule, i) => (
          <div
            key={i}
            className={`ill-guardrails-rule${checking && i === checkingRule ? " ill-guardrails-rule--checking" : ""}`}
          >
            <div className="ill-guardrails-rule__leading-icon">
              <Icon name={rule.icon} />
            </div>
            <div className="ill-guardrails-rule__text">
              <p className="ill-guardrails-rule__title">{rule.title}</p>
              <p className="ill-guardrails-rule__detail">{rule.detail}</p>
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

/** The guardrails card and the connector (with its pulse while thinking). */
function GuardrailsSide({ t }: { t: BeatState }) {
  return (
    <>
      <GuardrailsPanel t={t} />
      <div className="ill-guardrails-connector-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data */}
        <img
          className={`ill-guardrails-frame__connector ${motionClass(t, "line", "ill-guardrails-motion--draw")}`}
          src={connector}
          alt=""
          aria-hidden="true"
        />
        {t.reached("think") && !t.passed("think") && <span className="ill-guardrails-pulse" aria-hidden="true" />}
      </div>
    </>
  );
}

function conversation(t: BeatState) {
  return (
    t.passed("ask") && (
      <>
        <UserTurn animateIn>
          <ChatMessage role="user" text={copy.userMessage} />
        </UserTurn>
        <AssistantTurn animateIn>
          <ThinkingStatus t={t} id="think" />
          {t.reached("reply") && (
            <div className="ill-guardrails-reply">
              <AssistantReply text={copy.assistantMessage} />
              {t.reached("chip") && (
                <EnterDelayed>
                  <Chip>
                    <span className="ill-guardrails-policy-chip">
                      {copy.policyChip}
                      <Icon name="shieldCheck" />
                    </span>
                  </Chip>
                </EnterDelayed>
              )}
            </div>
          )}
        </AssistantTurn>
      </>
    )
  );
}

export function Guardrails({ play = true }: { play?: boolean }) {
  const [panelSlot, setPanelSlot] = useState<HTMLDivElement | null>(null);
  return (
    <div className="ill-guardrails-scale">
      <div className="ill-guardrails-frame">
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn as-is, like the source */}
        <img className="ill-guardrails-frame__bg" src={frameBg.src} alt="" aria-hidden="true" />
        <div className="ill-guardrails-row">
          <div className="ill-guardrails-panel-slot" ref={setPanelSlot} />
          <div className="ill-guardrails-card-wrap">
            <div className="ill-guardrails-shell-crop">
              <div className="ill-guardrails-shell-inner">
                <ChatScene
                  brand={brand}
                  beats={beats}
                  play={play}
                  width={550}
                  height={520}
                  className={(t) => motionClass(t, "shell", "ill-guardrails-motion--shell-enter")}
                >
                  {(t) => (
                    <>
                      {panelSlot && createPortal(<GuardrailsSide t={t} />, panelSlot)}
                      {conversation(t)}
                    </>
                  )}
                </ChatScene>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
