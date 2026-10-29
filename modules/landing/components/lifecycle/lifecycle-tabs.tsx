"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { lifecycleStages } from "../../config/lifecycle";
import { LifecyclePanel } from "../motion/panels";

// Trims the line box to cap height → baseline, as Figma lays these out.
const trimToCaps = "[text-box:trim-both_cap_alphabetic]";

/** How long each feature stays open before the next one opens (the last of a stage hands on to the next stage). */
const TURN = 9000;

type Position = { stage: number; feature: number };

/** Each stage's glyph, from Figma's tab badges (3495:23536): shopping bag, headset, arrows, sparkles and robot. */
const glyphs: Record<string, ReactNode> = {
  Sell: (
    <g fill="currentColor" transform="translate(-1.1 -1.1)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.50288 9.1921H16.7596C16.9311 9.19155 17.0964 9.25574 17.2226 9.37184C17.3488 9.48793 17.4265 9.64737 17.4403 9.81829L18.1209 17.986C18.1284 18.0799 18.1164 18.1742 18.0856 18.2632C18.0548 18.3522 18.0058 18.4338 17.9419 18.5029C17.8779 18.572 17.8003 18.627 17.7139 18.6646C17.6276 18.7022 17.5344 18.7214 17.4403 18.7211H6.82224C6.72809 18.7214 6.63489 18.7022 6.54855 18.6646C6.46221 18.627 6.3846 18.572 6.32063 18.5029C6.25666 18.4338 6.20772 18.3522 6.1769 18.2632C6.14609 18.1742 6.13407 18.0799 6.1416 17.986L6.82224 9.81829C6.83596 9.64737 6.91368 9.48793 7.03987 9.37184C7.16606 9.25574 7.33142 9.19155 7.50288 9.1921Z"
      />
      <path d="M13.7651 9.1921V8.85178C13.7651 8.41854 13.5928 8.0029 13.2865 7.69655C12.9801 7.3902 12.5645 7.21797 12.1313 7.21797C11.698 7.21797 11.2824 7.3902 10.976 7.69655C10.6697 8.0029 10.4974 8.41854 10.4974 8.85178V9.1921C10.4974 9.6056 10.1625 9.94054 9.749 9.94054C9.3355 9.94054 9.00056 9.6056 9.00056 9.1921V8.85178C9.00056 8.0214 9.33 7.22487 9.91717 6.6377C10.5043 6.05053 11.3009 5.72109 12.1313 5.72109C12.9616 5.72109 13.7582 6.05053 14.3453 6.6377C14.9325 7.22487 15.2619 8.0214 15.2619 8.85178V9.1921C15.2619 9.6056 14.927 9.94054 14.5135 9.94054C14.1 9.94054 13.7651 9.6056 13.7651 9.1921Z" />
    </g>
  ),
  Support: (
    <g fill="currentColor" transform="translate(-1.1 -1.1)">
      <path d="M8.26546 11.9145H7.40694C6.79732 11.9145 6.30313 12.4087 6.30313 13.0183V15.1033C6.30313 15.7129 6.79732 16.2071 7.40694 16.2071H8.26546C8.87508 16.2071 9.36928 15.7129 9.36928 15.1033V13.0183C9.36928 12.4087 8.87508 11.9145 8.26546 11.9145Z" />
      <path d="M16.8507 11.9145H15.9922C15.3825 11.9145 14.8883 12.4087 14.8883 13.0183V15.1033C14.8883 15.7129 15.3825 16.2071 15.9922 16.2071H16.8507C17.4603 16.2071 17.9545 15.7129 17.9545 15.1033V13.0183C17.9545 12.4087 17.4603 11.9145 16.8507 11.9145Z" />
      <path d="M16.3603 12.5277V11.3012C16.3603 10.179 15.9142 9.10288 15.1207 8.30936C14.3272 7.51584 13.251 7.06972 12.1288 7.06972C11.0066 7.06972 9.93044 7.51584 9.13692 8.30936C8.3434 9.10288 7.89728 10.179 7.89728 11.3012V12.5277C7.89728 12.9003 7.59552 13.202 7.22297 13.202C6.85042 13.202 6.54866 12.9003 6.54866 12.5277V11.3012C6.54866 9.82124 7.13641 8.4019 8.18294 7.35538C9.22947 6.30885 10.6488 5.72109 12.1288 5.72109C13.6088 5.72109 15.0282 6.30885 16.0747 7.35538C17.1212 8.4019 17.709 9.82124 17.709 11.3012V12.5277C17.709 12.9003 17.4072 13.202 17.0347 13.202C16.6621 13.202 16.3603 12.9003 16.3603 12.5277Z" />
      <path d="M15.7471 16.5137V16.2071C15.7471 15.8345 16.0489 15.5328 16.4214 15.5328C16.794 15.5328 17.0957 15.8345 17.0957 16.2071V16.5137C17.0957 17.0992 16.8636 17.6609 16.4496 18.0749C16.0356 18.4889 15.4738 18.7211 14.8883 18.7211H12.742C12.3695 18.7211 12.0677 18.4193 12.0677 18.0468C12.0677 17.6742 12.3695 17.3725 12.742 17.3725H14.8883C15.116 17.3725 15.3346 17.282 15.4956 17.1209C15.6566 16.9599 15.7471 16.7414 15.7471 16.5137Z" />
    </g>
  ),
  Retain: (
    <g fill="currentColor" transform="translate(-1.1 -1.1)">
      <path d="M6.81818 13.5458C7.20858 13.4162 7.63016 13.6275 7.75979 14.0179C8.02623 14.8203 8.50557 15.5355 9.14641 16.0869C9.78719 16.6383 10.5656 17.0057 11.3986 17.1496C12.2318 17.2934 13.0889 17.2083 13.8776 16.9036C14.6662 16.5989 15.3571 16.0857 15.8772 15.4191C15.8959 15.3951 15.9165 15.3725 15.938 15.351L17.0218 14.2672C17.3126 13.9767 17.7837 13.9767 18.0745 14.2672C18.3654 14.5581 18.3654 15.0297 18.0745 15.3206L17.0185 16.3766C16.3364 17.2355 15.4382 17.898 14.4145 18.2935C13.3743 18.6953 12.2442 18.8072 11.1453 18.6175C10.0465 18.4278 9.01958 17.943 8.17438 17.2157C7.32936 16.4884 6.69741 15.5455 6.34605 14.4874C6.21644 14.097 6.42785 13.6755 6.81818 13.5458ZM9.84798 6.14915C10.8882 5.74731 12.0183 5.63475 13.1172 5.82448C14.216 6.01422 15.2429 6.49895 16.0881 7.22631C16.9333 7.95367 17.5651 8.89702 17.9164 9.95525C18.046 10.3456 17.8347 10.7673 17.4443 10.8969C17.054 11.0264 16.6324 10.815 16.5027 10.4247C16.2363 9.62228 15.757 8.90658 15.1161 8.35505C14.4753 7.80369 13.6969 7.43631 12.8639 7.29244C12.0307 7.14857 11.1736 7.23373 10.3849 7.53842C9.59628 7.84309 8.90538 8.35634 8.38532 9.0229C8.36655 9.04696 8.34606 9.07009 8.32449 9.09167L7.24071 10.1748C6.94989 10.4654 6.47884 10.4654 6.18801 10.1748C5.89714 9.88392 5.89714 9.4123 6.18801 9.12143L7.24137 8.06741C7.9236 7.20736 8.82342 6.54501 9.84798 6.14915Z" />
      <path d="M5.63125 6.46565C5.63125 6.0543 5.96445 5.72109 6.37581 5.72109C6.78716 5.72109 7.12037 6.0543 7.12037 6.46565V9.10665H9.76136C10.1727 9.10665 10.5059 9.43985 10.5059 9.85121C10.5059 10.2626 10.1727 10.5958 9.76136 10.5958H6.37581C5.96445 10.5958 5.63125 10.2626 5.63125 9.85121V6.46565Z" />
      <path d="M17.1421 17.9765V15.3355H14.5011C14.0898 15.3355 13.7566 15.0023 13.7566 14.591C13.7566 14.1796 14.0898 13.8464 14.5011 13.8464H17.8867C18.298 13.8464 18.6313 14.1796 18.6313 14.591V17.9765C18.6313 18.3879 18.298 18.7211 17.8867 18.7211C17.4753 18.7211 17.1421 18.3879 17.1421 17.9765Z" />
    </g>
  ),
  "AI Assistants": (
    <g fill="currentColor" transform="translate(-1.1 -1.1)">
      <path d="M11.0215 6.1967L12.3532 10.2552L16.4117 11.5869L12.3532 12.9187L11.0215 16.9772L9.68979 12.9187L5.63125 11.5869L9.68979 10.2552L11.0215 6.1967Z" />
      <path d="M16.4117 13.8065L17.0459 15.3918L18.6313 16.026L17.0459 16.6601L16.4117 18.2455L15.7776 16.6601L14.1922 16.026L15.7776 15.3918L16.4117 13.8065Z" />
      <path d="M16.0947 6.1967L16.5386 7.33817L17.68 7.78207L16.5386 8.22597L16.0947 9.36744L15.6508 8.22597L14.5093 7.78207L15.6508 7.33817L16.0947 6.1967Z" />
    </g>
  ),
  "Personal Agents": (
    <g fill="currentColor" transform="translate(-1.1 -1.1)">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.72876 9.87293H15.535C16.2571 9.87293 16.9496 10.1598 17.4602 10.6703C17.9707 11.1809 18.2576 11.8734 18.2576 12.5954V15.9986C18.2576 16.7206 17.9707 17.4131 17.4602 17.9237C16.9496 18.4343 16.2571 18.7211 15.535 18.7211H8.72876C8.00671 18.7211 7.31423 18.4343 6.80366 17.9237C6.29309 17.4131 6.00625 16.7206 6.00625 15.9986V12.5954C6.00625 11.8734 6.29309 11.1809 6.80366 10.6703C7.31423 10.1598 8.00671 9.87293 8.72876 9.87293ZM10.09 12.7996C9.93807 12.7996 9.78761 12.8296 9.64723 12.8877C9.50685 12.9459 9.37929 13.0311 9.27185 13.1385C9.1644 13.246 9.07918 13.3735 9.02103 13.5139C8.96288 13.6543 8.93295 13.8047 8.93295 13.9567C8.93295 14.1086 8.96288 14.2591 9.02103 14.3995C9.07918 14.5399 9.1644 14.6674 9.27185 14.7749C9.37929 14.8823 9.50685 14.9675 9.64723 15.0257C9.78761 15.0838 9.93807 15.1138 10.09 15.1138C10.3969 15.1138 10.6912 14.9919 10.9082 14.7749C11.1252 14.5579 11.2471 14.2636 11.2471 13.9567C11.2471 13.6498 11.1252 13.3555 10.9082 13.1385C10.6912 12.9215 10.3969 12.7996 10.09 12.7996ZM14.1738 12.7996C14.0218 12.7996 13.8714 12.8296 13.731 12.8877C13.5906 12.9459 13.4631 13.0311 13.3556 13.1385C13.2482 13.246 13.1629 13.3735 13.1048 13.5139C13.0466 13.6543 13.0167 13.8047 13.0167 13.9567C13.0167 14.1086 13.0466 14.2591 13.1048 14.3995C13.1629 14.5399 13.2482 14.6674 13.3556 14.7749C13.4631 14.8823 13.5906 14.9675 13.731 15.0257C13.8714 15.0838 14.0218 15.1138 14.1738 15.1138C14.4807 15.1138 14.775 14.9919 14.992 14.7749C15.209 14.5579 15.3309 14.2636 15.3309 13.9567C15.3309 13.6498 15.209 13.3555 14.992 13.1385C14.775 12.9215 14.4807 12.7996 14.1738 12.7996Z" />
      <path d="M12.1319 7.8991C12.7333 7.8991 13.2209 7.41154 13.2209 6.8101C13.2209 6.20866 12.7333 5.72109 12.1319 5.72109C11.5305 5.72109 11.0429 6.20866 11.0429 6.8101C11.0429 7.41154 11.5305 7.8991 12.1319 7.8991Z" />
      <path d="M11.3835 9.87293V7.49073C11.3835 7.07724 11.7184 6.7423 12.1319 6.7423C12.5454 6.7423 12.8803 7.07724 12.8803 7.49073V9.87293C12.8803 10.2864 12.5454 10.6214 12.1319 10.6214C11.7184 10.6214 11.3835 10.2864 11.3835 9.87293Z" />
    </g>
  ),
};

/**
 * The open stage's badge (Figma 3495:23537): its glyph in gold on maroon, under a gold diamond clipped to the
 * square, with a gold dot in each corner, ringed 0.55px cream then 0.55px gold.
 */
function StageBadge({ glyph }: { glyph: ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 22"
      fill="none"
      className="size-[22px] bg-maroon text-[#ffb657] shadow-[0_0_0_0.55px_#efe9db,0_0_0_1.1px_#ffb657]"
    >
      {glyph}
      <path stroke="currentColor" strokeWidth="0.55" d="M11 -5.724L27.723 10.999L11 27.722L-5.723 10.999Z" />
      <circle fill="currentColor" r="0.55" cx="1.097" cy="1.101" />
      <circle fill="currentColor" r="0.55" cx="20.902" cy="1.101" />
      <circle fill="currentColor" r="0.55" cx="20.902" cy="20.9" />
      <circle fill="currentColor" r="0.55" cx="1.097" cy="20.9" />
    </svg>
  );
}

/** Opens (and closes) a feature's chip or copy: its rows grow from nothing, fading in. Closed, it's inert. */
function Reveal({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      inert={!open}
      className={cn(
        "grid w-full transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/**
 * Lifecycle stages as tabs (Figma 3073:20862): a row of stage tabs over a box holding the stage's features
 * on the left and the open feature's motion mock-up on the right. The open tab carries its badge and, along
 * its foot, a maroon bar filling through the stage. Within a stage the open feature shows its chip, copy and
 * LEARN MORE; the others are titles at 50%, between hairlines. Features play on their own: each stays open
 * for its turn while the section is on screen, then the next opens (the last of a stage moves on to the next
 * stage, and the last stage back to the first). Keyboard focus pauses the turn (hovering doesn't); with reduced
 * motion nothing advances on its own. Choosing a tab opens its first feature; choosing a title opens it.
 * Below 1280px the tabs scroll sideways and the mock-up sits above the features.
 */
export function LifecycleTabs() {
  const id = useId();
  const [position, setPosition] = useState<Position>({ stage: 0, feature: 0 });
  // Bumped on every change so the open feature's visual plays from the top.
  const [run, setRun] = useState(0);
  const positionRef = useRef(position);
  /** Time spent in the open feature's turn, in ms. */
  const elapsed = useRef(0);
  const inView = useRef(false);
  const focused = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // The open tab's maroon bar, scaled every frame.
  const fillRef = useRef<HTMLSpanElement>(null);

  const open = (next: Position) => {
    elapsed.current = 0;
    const current = positionRef.current;
    if (next.stage === current.stage && next.feature === current.feature) return;
    positionRef.current = next;
    setPosition(next);
    setRun((r) => r + 1);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(root);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let loop = 0;
    let last = 0;
    const tick = (time: number) => {
      loop = requestAnimationFrame(tick);
      // Capped, so a frame after the tab was hidden (or the main thread stalled) doesn't skip the turn.
      const delta = last ? Math.min(time - last, 100) : 0;
      last = time;

      const { stage, feature } = positionRef.current;
      const count = lifecycleStages[stage].features.length;
      if (!reduce.matches && inView.current && !focused.current) elapsed.current += delta;
      if (!reduce.matches && elapsed.current >= TURN) {
        const next =
          feature + 1 < count ? { stage, feature: feature + 1 } : { stage: (stage + 1) % lifecycleStages.length, feature: 0 };
        elapsed.current = 0;
        positionRef.current = next;
        setPosition(next);
        setRun((r) => r + 1);
        return;
      }
      // Through the stage: the features before the open one, plus how far its turn has run (all of it with reduced motion).
      const progress = (feature + (reduce.matches ? 1 : elapsed.current / TURN)) / count;
      if (fillRef.current) fillRef.current.style.scale = `${progress} 1`;
    };
    loop = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(loop);
    };
  }, []);

  // When the tabs scroll sideways (below 1280px), bring the open one into view.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabs.current[position.stage];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [position.stage]);

  // Arrow keys move between tabs (roving tabindex), as Insights does.
  const count = lifecycleStages.length;
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const current = position.stage;
    const target = e.key === "Home" ? 0 : e.key === "End" ? count - 1 : step ? (current + step + count) % count : null;
    if (target === null) return;
    e.preventDefault();
    open({ stage: target, feature: 0 });
    tabs.current[target]?.focus();
  };

  const stage = lifecycleStages[position.stage];
  const panelId = `${id}-panel`;

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col"
      onFocus={(e) => {
        focused.current = e.target.matches(":focus-visible");
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false;
      }}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label="Customer lifecycle stages"
        onKeyDown={onKeyDown}
        className="relative flex w-full overflow-x-auto [scrollbar-width:none] xl:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {lifecycleStages.map((s, i) => {
          const on = i === position.stage;
          return (
            <button
              key={s.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={panelId}
              tabIndex={on ? 0 : -1}
              onClick={() => open({ stage: i, feature: 0 })}
              className={cn(
                // Edges are inset shadows, as Figma's 0.5px inside strokes: neighbouring tabs share a 1px edge.
                // Below 1280px each tab is at least as wide as its name and they grow to fill the row, scrolling
                // sideways only once they no longer fit; from 1280px they share the row equally.
                "group relative flex h-[52px] flex-[1_0_auto] items-center px-5 text-left shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon md:h-[58.5px] md:px-8 xl:flex-1 xl:basis-0 xl:pr-0",
                on ? "cursor-default bg-[#f3e9d4]" : "cursor-pointer bg-[rgba(243,233,212,0.37)]",
              )}
            >
              {/* The badge opens out ahead of the name (19px gap) on the open tab. */}
              <span
                className={cn(
                  "relative h-[22px] shrink-0 transition-[width,margin-right,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  on ? "mr-[19px] w-[22px] opacity-100" : "mr-0 w-0 opacity-0",
                )}
              >
                <span className="absolute top-0 left-0">
                  <StageBadge glyph={glyphs[s.name]} />
                </span>
              </span>
              <span
                className={cn(
                  "font-serif text-[20px] leading-[1.1] tracking-[-0.05em] whitespace-nowrap text-ink transition-opacity duration-300 md:text-[24px]",
                  on ? "opacity-100" : "opacity-50 group-hover:opacity-75",
                )}
              >
                {s.name}
              </span>
              {/* Along the open tab's foot, 0.75px past each edge: the #b6af9f track, with the maroon fill through the stage. */}
              {on && (
                <span aria-hidden className="pointer-events-none absolute bottom-[0.75px] -left-[0.75px] h-px w-[calc(100%+0.8px)] bg-[#b6af9f]">
                  <span ref={fillRef} className="absolute inset-0 origin-left bg-maroon [scale:0_1]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${id}-tab-${position.stage}`}
        className="flex w-full flex-col bg-[#f3e7d3] px-[0.5px] pt-[0.5px] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] xl:flex-row xl:items-start xl:justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col px-6 pt-8 pb-10 max-xl:order-2 md:px-8 md:pt-10 md:pb-12 xl:pt-20">
          {/* 40px either side of each 0.5px hairline; the list is Figma's 462.87px wide beside the mock-up. */}
          <div key={position.stage} className="lifecycle-stage-enter flex w-full flex-col gap-10 xl:max-w-[462.865px]">
            {stage.features.map((feature, f) => {
              const on = f === position.feature;
              return (
                <Fragment key={feature.title}>
                  {f > 0 && <span aria-hidden className="h-0 w-full outline-[0.25px] outline-black/20 outline-solid" />}
                  <div className="flex flex-col items-start">
                    <Reveal open={on}>
                      <div className="flex pb-4">
                        <span className="flex h-[23px] items-center bg-[#ffeec2] p-[6.5px] outline-[0.5px] -outline-offset-[0.5px] outline-black/40 outline-solid">
                          <span
                            className={cn(
                              "font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] whitespace-nowrap text-[#66645e] uppercase",
                              trimToCaps,
                            )}
                          >
                            {feature.label}
                          </span>
                        </span>
                      </div>
                    </Reveal>
                    <button
                      type="button"
                      aria-expanded={on}
                      onClick={() => open({ stage: position.stage, feature: f })}
                      className={cn(
                        "text-left font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
                        on ? "cursor-default text-ink" : "cursor-pointer text-ink/50 hover:text-ink/75",
                      )}
                    >
                      {feature.title}
                    </button>
                    <Reveal open={on}>
                      <div className="flex flex-col items-start gap-6 pt-4">
                        <p className="w-full text-base leading-6 tracking-[-0.32px] text-black/60">{feature.body}</p>
                        <Link
                          href={feature.href}
                          className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-opacity duration-150 hover:opacity-50"
                        >
                          LEARN MORE
                          <Image src={arrowRight} alt="" className="size-3" />
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Figma's 738 × 680 mock-up, flush to the box's top right; it fills the box's width when stacked. */}
        <div className="@container w-full xl:w-[57.65625%] xl:flex-none">
          <LifecyclePanel visual={stage.features[position.feature].visual} run={run} />
        </div>
      </div>
    </div>
  );
}
