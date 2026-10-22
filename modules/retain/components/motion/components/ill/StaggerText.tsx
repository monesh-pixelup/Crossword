import { Fragment } from "react";

// Reveals `text` as a cascade of words rather than a typed/streamed
// string — each word fades, drifts up slightly, and un-blurs in on its
// own staggered delay (emil-animations' "split, then stagger" entrance
// pattern). Purely CSS: the full text is in the DOM immediately, only
// opacity/transform/filter animate, so layout height is correct from the
// first frame.
//
// The space between words is a plain text node, a sibling of each word's
// span, not trailing content inside it — `display: inline-block` (needed
// so `transform`/`filter` apply) collapses whitespace at its own box
// edge, so a space baked into the span itself gets silently dropped.
//
// `boldText` is an optional trailing segment rendered with the same
// inline-emphasis styling ChatMessage's own `<strong>` convention uses
// (see ChatMessage.css's `.ill-chat-message--assistant strong`) — for a
// reply like ConversationToRevenue's, where the closing sentence is
// meant to read as the emphasized payoff. Its words continue the same
// stagger index/delay sequence as the plain words before it, so the
// cascade reads as one continuous reveal across the style boundary, not
// two separate animations.
export function StaggerText({ text, boldText }: { text: string; boldText?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  const boldWords = boldText ? boldText.split(/\s+/).filter(Boolean) : [];

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`plain-${i}`}>
          <span className="ill-stagger-text__word" style={{ animationDelay: `${i * 45}ms` }}>
            {word}
          </span>
          {i < words.length - 1 || boldWords.length ? " " : ""}
        </Fragment>
      ))}
      {boldWords.map((word, i) => (
        <Fragment key={`bold-${i}`}>
          <strong
            className="ill-stagger-text__word"
            style={{ animationDelay: `${(words.length + i) * 45}ms` }}
          >
            {word}
          </strong>
          {i < boldWords.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}
