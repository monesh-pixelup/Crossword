import { Fragment, useEffect, useRef } from "react";
import { HelpdeskHeader } from "../../../components/ill/HelpdeskHeader";
import { Shell } from "../../../components/ill/Shell";
import { Thread } from "../../../components/ill/Thread";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { AiStatus } from "../../../components/ill/AiStatus";
import { useLandedOnScreen } from "../../../components/ill/useLandedOnScreen";
import { animateScrollTo } from "../../../components/ill/scrollEase";
import frameTextureImage from "@/modules/support/assets/motion-v4/scenarios/merchant-insight/frame-texture-green.webp";
import { merchantInsight } from "../data";
import { useMerchantInsightPlayback } from "./useMerchantInsightPlayback";


const frameTexture = frameTextureImage.src;

const turns = [
  {
    userMessage: merchantInsight.userMessage,
    assistantMessage: merchantInsight.context,
    thinkingLabel: "Reading their history",
  },
  {
    userMessage: merchantInsight.followUpMessage,
    assistantMessage: merchantInsight.resolution,
    thinkingLabel: "Checking the refund",
    // Brief's 8d — the follow-up lands as a bubble directly; the
    // composer never reappears for it.
    skipComposer: true,
  },
] as const;

// Support V3 Motion / 08 — Merchant insight. Same card, header, copy and
// dimensions as the static MerchantInsightComposing..Resolved set — only
// the beats between them (composer entrance/typing/send, the two
// thinking states, the reply reveals, the viewport scrolling the newest
// turn into view) are new. The static siblings are untouched. Like them,
// this now sits inside a real `Shell` (cream canvas, gold border, glow)
// centered in `ill-insight-card`'s decorative backdrop rather than a
// bespoke merged dark card — so growth is handled the same way every
// other multi-turn motion scenario handles it (GiftJourneyMotion,
// SleepSearchMotion): `ConversationViewport` scrolls the newest turn
// into view via `viewportRef`, instead of a FLIP reposition of the
// thread within a hand-rolled centering box.
export function MerchantInsightMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { turnIndex, phase, composerValue, composerTyping, statusLabel, reducedMotion, runKey } =
    useMerchantInsightPlayback(turns, active);

  const showComposer =
    turnIndex === 0 && (phase === "composerEnter" || phase === "composing" || phase === "sending");

  const viewportRef = useRef<HTMLDivElement>(null);

  // Scrolls the newest turn into view as it grows — same mechanism
  // GiftJourneyMotion/SleepSearchMotion use, not a scenario-specific
  // invention. The last rendered turn element is always the active one
  // (turns beyond the current one aren't in the DOM yet).
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = viewport.querySelector(".ill-thread")?.lastElementChild;
    if (!target) return;

    // ConversationViewport's ContentFade overlay is a 32px gradient
    // pinned to the viewport's bottom edge, solid for its bottom third —
    // "fully visible" has to mean clear of that band too, or a turn can
    // pass this check while its last line still sits under the fade,
    // visibly erasing it.
    const FADE_CLEARANCE = 40;
    // Rects in the viewport's own CSS px: the site zooms each visual to
    // fit its panel, and getBoundingClientRect reports zoomed values
    // while scrollTop doesn't. 1 (a no-op) at the visual's drawn size.
    const zoom = viewport.offsetHeight ? viewport.getBoundingClientRect().height / viewport.offsetHeight : 1;
    const unzoom = (r: DOMRect) => ({ top: r.top / zoom, bottom: r.bottom / zoom });
    const viewportRect = unzoom(viewport.getBoundingClientRect());
    const targetRect = unzoom(target.getBoundingClientRect());
    const isFullyVisible =
      targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE && targetRect.top >= viewportRect.top;
    if (isFullyVisible) return;

    const delta = targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
    const targetTop = viewport.scrollTop + delta;
    if (reducedMotion) {
      viewport.scrollTop = targetTop;
    } else {
      animateScrollTo(viewport, targetTop);
    }
  }, [turnIndex, phase, reducedMotion]);

  return (
    <div ref={rootRef} className="ill-insight-frame-scale">
      <div className="ill-insight-card" key={runKey} data-phase={phase} data-turn={turnIndex}>
        {/*
          The site's livery frame (as SceneFrame, the helpdesk's maroon one) in forest green: square corners, the damask
          with its notched gold outline 13.16 / 15.98px in, and a gold ring by each corner.
        */}
        <img className="ill-insight-card__texture" src={frameTexture} alt="" aria-hidden="true" />
        <svg className="ill-insight-card__rings" viewBox="0 0 687 586" aria-hidden="true">
          {[
            [26, 24],
            [661, 24],
            [26, 562],
            [661, 562],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4.5} fill="none" stroke="#D2B75C" />
          ))}
        </svg>
        <div className="ill-insight-card__content">
          <Shell
            brand={merchantInsight.brand}
            width={550}
            height={520}
            header={<HelpdeskHeader brand={merchantInsight.brand} />}
            composerValue={showComposer ? composerValue : undefined}
            composerTyping={showComposer && composerTyping}
            viewportRef={viewportRef}
            className="ill-theme-helpdesk"
          >
            <Thread>
              {turns.map((turn, i) => {
                const isPast = i < turnIndex;
                const isCurrent = i === turnIndex;
                // "sending" is included here (not waited out first) so
                // the bubble starts fading/rising in at the same moment
                // the composer starts clearing — a true overlapping
                // crossfade instead of a hard cut from "composer gone"
                // to "bubble appears" (see useMerchantInsightPlayback's
                // TURN_ENTER_MS comment).
                const isSent = isCurrent && phase !== "composerEnter" && phase !== "composing";
                if (!isPast && !isSent) return null;

                const showThinking = isCurrent && (phase === "thinking" || phase === "thinkingExit");
                const showReply =
                  isPast || (isCurrent && (phase === "replying" || phase === "pausing" || phase === "done"));

                return (
                  <Fragment key={i}>
                    <UserTurn
                      animateIn={isCurrent && isSent}
                      className={i === 0 ? "ill-insight-first-turn" : undefined}
                    >
                      <ChatMessage role="user" text={turn.userMessage} />
                    </UserTurn>
                    <AssistantTurn animateIn={isCurrent && isSent}>
                      {showThinking &&
                        (i === 0 ? (
                          // Only the first turn's AiStatus module gets the
                          // negligible-bounce bloom override (see
                          // MerchantInsightMotion.css) — turn 2's keeps
                          // the shared, normal overshoot.
                          <div className="ill-insight-first-status">
                            <AiStatus label={statusLabel} visible={phase === "thinking"} />
                          </div>
                        ) : (
                          <AiStatus label={statusLabel} visible={phase === "thinking"} />
                        ))}
                      {showReply && (
                        <div className={isCurrent ? "ill-insight-reply-enter" : undefined}>
                          <ChatMessage role="assistant" text={turn.assistantMessage} />
                        </div>
                      )}
                    </AssistantTurn>
                  </Fragment>
                );
              })}
            </Thread>
          </Shell>
        </div>
      </div>
    </div>
  );
}
