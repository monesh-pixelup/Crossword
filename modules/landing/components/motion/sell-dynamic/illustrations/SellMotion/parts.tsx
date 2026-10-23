import { AiStatus } from "../../components/ill/AiStatus";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { RichStagger } from "./RichStagger";
import type { Timeline } from "./useChatTimeline";

// One-shot enter for a piece of an assistant turn that arrives after the
// turn itself mounted (an insight, a quiz row, a context strip). Reuses
// the turn-enter keyframe — fade + rise + blur — on a thin wrapper, so no
// shared component needs a stagger prop of its own.
export function Enter({ children, delayMs }: { children: React.ReactNode; delayMs?: number }) {
  return (
    <div className="sdm-ill-assistant-turn--enter" style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}>
      {children}
    </div>
  );
}

export function Thinking({ t, id }: { t: Timeline; id: string }) {
  const status = t.status(id);
  return status ? <AiStatus label={status.label} visible={status.visible} /> : null;
}

export function AssistantText({ text }: { text: string }) {
  return (
    <ChatMessage role="assistant">
      <RichStagger text={text} />
    </ChatMessage>
  );
}

// The reply slot of a proactive widget: a hidden ghost of the final text
// holds the layout; the thinking row and then the cascading reply play in
// an overlay on top of it.
export function ReservedReply({
  t,
  text,
  thinkId,
  replyId,
}: {
  t: Timeline;
  text: string;
  thinkId: string;
  replyId: string;
}) {
  return (
    <div className="sdm-sell-reserve">
      <div className="sdm-sell-hidden" aria-hidden="true">
        <ChatMessage role="assistant" text={text} />
      </div>
      <div className="sdm-sell-reserve__live">
        <Thinking t={t} id={thinkId} />
        {t.reached(replyId) && <AssistantText text={text} />}
      </div>
    </div>
  );
}

// Content whose space is held from the start but which only appears (with
// the turn-enter) once `show` flips.
export function ReservedReveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div className={show ? "sdm-ill-assistant-turn--enter" : "sdm-sell-hidden"} aria-hidden={!show}>
      {children}
    </div>
  );
}

// One section of a proactive widget (header, product context, the reply
// slot) that fades in, staggered by `index`, as the widget expands.
export function ExpandItem({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div className="sdm-sell-expand-item" style={{ "--sell-i": index } as React.CSSProperties}>
      {children}
    </div>
  );
}

