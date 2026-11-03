import { useEffect, useState } from "react";
import handWaveUrlImage from "@/modules/dynamic-landing-pages/assets/motion/storybook/hand-wave.png";
import { BUZZ_NOTE_CSS, KNOCK_CSS, NUDGE_CARD_CSS, NUDGE_CTA_CSS, PRO_KNOCK_CSS } from "./storybookKnockCss";


const handWaveUrl = handWaveUrlImage.src;

// The Storybook's web proactive knock, as BarProactiveWeb's KnockSeat seats
// it: `.wm-bar-message.wm-as-knock.wm-nudge` around BuzzNote
// (animation/BarProductBuzz.stories.tsx), its doors the NudgeCtaRow
// (dev-handoff/primitives/_stage.tsx), and the same five sheets in the same
// order (BUZZ_NOTE, KNOCK, NUDGE_CARD, NUDGE_CTA, PRO_KNOCK). The markup and
// class lifecycle are the Storybook's: the 883ms pop from mount, `is-landed`
// on its clock, `is-out` for the 333ms sink. Played rather than clicked,
// so the pointer, swipe, sound and shiver machinery stays out; `pressed`
// stands in for the door's :active (scale .96) and `hovered` for the card's
// landed hover, which a recording can't trigger.
const BUZZ_ENTER_MS = 883;

export function StorybookKnock({
  title,
  product,
  doors,
  pressed,
  hovered,
  out,
}: {
  title: string;
  /** The product's own shot in the disc; absent, the waving hand. */
  product?: string;
  /** Quiet door first, primary last. */
  doors: { label: string; primary?: boolean }[];
  pressed?: string;
  hovered?: boolean;
  out?: boolean;
}) {
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setLanded(true), BUZZ_ENTER_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="wm-bar-message wm-as-knock wm-nudge">
      <style>{BUZZ_NOTE_CSS}</style>
      <style>{KNOCK_CSS}</style>
      <style>{NUDGE_CARD_CSS}</style>
      <style>{NUDGE_CTA_CSS}</style>
      <style>{PRO_KNOCK_CSS}</style>
      <div
        className={[
          "wm-bar-buzz-note has-cta",
          landed && "is-landed",
          out && "is-out",
          hovered && "pv2-is-hover",
        ].filter(Boolean).join(" ")}
        role="button"
        tabIndex={0}
        aria-label={`Open chat — ${title}`}
      >
        <button type="button" className="wm-bar-buzz-note__close" aria-label="Dismiss notification">
          <XMark />
        </button>
        <span className="wm-bar-buzz-note__bell" aria-hidden>
          {product ? (
            <img className="wm-bar-buzz-note__product" src={product} alt="" />
          ) : (
            <span className="wm-bar-buzz-note__hand">
              <svg className="wm-bar-buzz-note__hand-lines" viewBox="0 0 300 300" aria-hidden>
                <path className="is-low" pathLength="100" d="M73.6 153.6C73.6 153.6 80.8 186.5 119 199" />
                <path className="is-low" pathLength="100" d="M86.7 157.9C86.7 157.9 92.2 176.7 113.5 185.5" />
                <path className="is-high" pathLength="100" d="M124.9 81.9C124.9 81.9 145.6 73.2 168.9 95.1" />
                <path className="is-high" pathLength="100" d="M127.3 90.3C127.3 90.3 140.8 86.7 151.9 97.6" />
              </svg>
              <img className="wm-bar-buzz-note__hand-img" src={handWaveUrl} alt="" />
            </span>
          )}
        </span>
        <span className="wm-bar-buzz-note__text">
          <span className="wm-bar-buzz-note__title">{title}</span>
        </span>
        <div className="wm-bar-buzz-note__ctas">
          <div className="wm-pro-ctas">
            {doors.map((d, i) => (
              <button
                key={d.label}
                type="button"
                className={["wm-pro-cta", d.primary && "is-primary", pressed === d.label && "pv2-is-active"].filter(Boolean).join(" ")}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Phosphor's X (regular), as the Storybook's CloseMark draws it at 14.
function XMark() {
  return (
    <svg viewBox="0 0 256 256" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="200" y1="56" x2="56" y2="200" />
      <line x1="200" y1="200" x2="56" y2="56" />
    </svg>
  );
}
