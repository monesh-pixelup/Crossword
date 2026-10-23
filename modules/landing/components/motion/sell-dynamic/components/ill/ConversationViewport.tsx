import { forwardRef } from "react";
import { ContentFade } from "./ContentFade";

// New layer introduced so the shell can hold a fixed 450x500 size without
// growing with content. This is what clips/scrolls; conversation content
// (the Thread passed as children) keeps its own natural height inside it.
// ContentFade is pinned here, not inside the scrolling content, so it
// stays anchored to the viewport's bottom edge regardless of scroll
// position. Forwards a ref to the scrolling element so a scenario
// sequencing its own reveal can drive this element's scrollTop.
export const ConversationViewport = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function ConversationViewport({ children }, ref) {
    return (
      <div className="sdm-ill-conversation-viewport">
        <div className="sdm-ill-conversation-viewport__content" ref={ref}>
          {children}
        </div>
        <ContentFade />
      </div>
    );
  },
);
