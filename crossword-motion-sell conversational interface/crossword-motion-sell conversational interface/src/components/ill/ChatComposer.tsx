import "./ChatComposer.css";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";

// ILL/Module/Chat/Composer (node 1954:366). "Use as the bottom input bar
// in chat illustrations." Default placeholder text ("Ask anything...")
// is this component's own default copy, reused rather than authoring new
// placeholder text per illustration. `typing` is an opt-in
// caret for a scenario driving `value` through its own typewriter reveal
// — every existing call site leaves it unset and renders exactly as
// before.
//
// `variant="expanded"` is opt-in for the Support V3 "Merchant insight"
// scene's composing beat (node 2725:28975) — a taller card (literal
// #fff9e9 canvas fill, 2px Accent/Soft border, the same inset glow Shell
// itself uses) with the message on its own line and an "Upload file"
// affordance beside the send button, instead of the single-line pill.
// Every existing call site leaves `variant` unset and keeps the pill.
//
// `visible`/`sending` are opt-in for Support V3 Motion / 08's own
// composer beat: `visible=false` plays a 250ms fade-and-settle exit (the
// brief's "composer clears and fades out" on send) instead of the
// component just unmounting with nothing to animate from; `sending`
// toggles a one-shot scale-down on the send button at the instant of
// send (the brief's "subtle scale-down interaction"). Every existing
// call site leaves both unset, stays mounted and renders unchanged.
export function ChatComposer({
  value = "Ask anything...",
  typing = false,
  variant = "default",
  visible = true,
  sending = false,
}: {
  value?: string;
  typing?: boolean;
  variant?: "default" | "expanded";
  visible?: boolean;
  sending?: boolean;
}) {
  if (variant === "expanded") {
    return (
      <div className={`ill-chat-composer--expanded${visible ? "" : " ill-chat-composer--expanded--hidden"}`}>
        <p className="ill-chat-composer--expanded__text">
          {value}
          {typing && <span className="ill-chat-composer__caret" />}
        </p>
        <div className="ill-chat-composer--expanded__row">
          <span className="ill-chat-composer--expanded__upload">
            <Icon name="addMuted" size={18} />
            Upload file
          </span>
          <IconButton
            icon="sendGold"
            label="Send"
            variant="accent"
            className={sending ? "ill-icon-button--pressed" : undefined}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="ill-chat-composer">
      <span className="ill-chat-composer__text">
        {value}
        {typing && <span className="ill-chat-composer__caret" />}
      </span>
      <IconButton icon="send" label="Send" variant="accent" />
    </div>
  );
}
