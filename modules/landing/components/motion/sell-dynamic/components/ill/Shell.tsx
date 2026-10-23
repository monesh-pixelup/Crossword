import { ChatHeader } from "./ChatHeader";
import { ChatComposer } from "./ChatComposer";
import { ConversationViewport } from "./ConversationViewport";

// Outer shell chrome shared by every illustration in the series — pulled
// from ILL/Template/Chat-Conversation (node 1941:13814, fileKey
// TiAeD9ICNjjC8N3zoUJExk): background bound to Background/Page, border to
// Accent/Soft, shadow bound to the named effect style ILL/Effect/Shell/
// Glow. Padding/gap are exact literals from that node. Every illustration
// in the series uses this same shell; only what's composed inside varies.
//
// Fixed-size layered structure (header / scrolling viewport / composer)
// so the shell never grows with content — see ConversationViewport and
// ContentFade for the clipping/fade layers. `children` is still just the
// scenario's own <Thread>...</Thread>, unchanged by this — the viewport
// wraps it rather than replacing how scenarios call Shell.
export function Shell({
  brand,
  children,
  width,
  height,
  composerValue,
  composerTyping,
  viewportRef,
  rootRef,
  header,
  composer,
  className,
}: {
  brand: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  // Passthrough to Chat/Composer's own `value` data prop — optional so
  // every call site keeps that component's literal default ("Where's my
  // order?") when idle, matching the Figma reference where the composer
  // is never empty. Scenarios driving their own reveal pass a value.
  composerValue?: string;
  // Passthrough to ChatComposer's `typing` prop, for a scenario driving
  // composerValue through its own typewriter reveal.
  composerTyping?: boolean;
  // Lets a scenario sequencing its own reveal drive the conversation
  // viewport's scrollTop. Unused by default.
  viewportRef?: React.Ref<HTMLDivElement>;
  // Forwards a ref to the shell's own outer element — for a scenario
  // gating its reveal on `useLandedOnScreen` (is the shell actually in
  // view, is the tab focused), which needs an element to observe. Same
  // forwarding pattern as `viewportRef`; unused by default.
  rootRef?: React.Ref<HTMLDivElement>;
  // Overrides the default Chat/Header with a different header module
  // (e.g. HelpdeskHeader for the merchant-facing scenario) — unused by
  // default, so every existing call site keeps rendering Chat/Header.
  header?: React.ReactNode;
  // Overrides the default Chat/Composer with a different composer module
  // entirely — same escape hatch as `header`, for a scenario whose
  // composer isn't the standard customer-reply pill (e.g. a private
  // "Whisper to Crossword" composer). Unused by default, so every
  // existing call site keeps rendering the standard ChatComposer driven
  // by composerValue/composerTyping.
  composer?: React.ReactNode;
  // Extra class on the shell's own root — e.g. a scenario-scoped theme
  // override (CSS custom property re-pointed for just that subtree).
  // Unused by default.
  className?: string;
}) {
  return (
    <div
      className={["sdm-ill-shell", className].filter(Boolean).join(" ")}
      style={width && height ? { width, height } : undefined}
      ref={rootRef}
    >
      {header ?? <ChatHeader brand={brand} />}
      <ConversationViewport ref={viewportRef}>{children}</ConversationViewport>
      {composer ?? <ChatComposer value={composerValue} typing={composerTyping} />}
    </div>
  );
}
