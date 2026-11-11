import { useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";

// Matches .ill-grow-composer__clip's max-height in GrowComposer.css.
const MAX_LINES = 5;

// ChatComposer's pill, growing the way a chat composer should when a
// message wraps: upward from a fixed bottom edge, one whole line at a
// time, with no height animation (typing is too frequent to animate).
// Padding never changes; the send button stays aligned with the last
// line; past one line the pill's full radius gives way to a fixed one so
// a tall box doesn't turn into a lozenge. Capped at five lines, after
// which earlier lines scroll off the top as the caret moves on. Resets to
// one line in the same frame the message is sent (value/typing cleared).
export function GrowComposer({ value = "Ask anything...", typing = false }: { value?: string; typing?: boolean }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState(1);

  useLayoutEffect(() => {
    const el = textRef.current;
    const content = el?.querySelector<HTMLElement>(".ill-grow-composer__content");
    if (!el || !content) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    setLines(Math.round(content.offsetHeight / lh));
  }, [value, typing]);

  const className = [
    "ill-chat-composer ill-grow-composer",
    lines > 1 && "ill-grow-composer--multiline",
    lines > MAX_LINES && "ill-grow-composer--capped",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <span ref={textRef} className="ill-chat-composer__text ill-grow-composer__text">
        <span className="ill-grow-composer__clip">
          <span className="ill-grow-composer__content">
            {value}
            {typing && <span className="ill-chat-composer__caret" />}
          </span>
        </span>
      </span>
      <IconButton icon="send" label="Send" variant="accent" />
    </div>
  );
}
