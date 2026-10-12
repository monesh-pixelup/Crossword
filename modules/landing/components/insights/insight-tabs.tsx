"use client";

import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { insightFeatures } from "../../config/insights";
import { InsightPanel, insightVisuals } from "../motion/panels";

/** How long a tab stays open once its visual has played out, before the tabs advance. */
const HOLD = 3000;

const corners = (
  <>
    <circle fill="currentColor" r="0.55" cy="1.1" cx="1.1" />
    <circle fill="currentColor" r="0.55" cy="1.1" cx="20.9" />
    <circle fill="currentColor" r="0.55" cy="20.9" cx="20.9" />
    <circle fill="currentColor" r="0.55" cy="20.9" cx="1.1" />
    <path strokeWidth="0.55" stroke="currentColor" d="M0 5.277L5.277 0M16.723 0L22 5.277M22 16.723L16.723 22M5.277 22L0 16.723" />
  </>
);

/** Tab glyphs (Phosphor binoculars, link, user-search) inside the octagon frame. */
const icons: ReactNode[] = [
  <path
    key="ask"
    fill="currentColor"
    transform="translate(-1.1 -1.1)"
    d="M18.4706 13.5782C18.4317 13.4695 18.3859 13.3633 18.3336 13.2604L15.9077 7.74148C15.8848 7.68832 15.8519 7.64003 15.8109 7.59916C15.6376 7.4258 15.4318 7.28828 15.2053 7.19445C14.9789 7.10063 14.7361 7.05234 14.491 7.05234C14.2458 7.05234 14.0031 7.10063 13.7766 7.19445C13.5502 7.28828 13.3444 7.4258 13.1711 7.59916C13.0839 7.68646 13.0348 7.80474 13.0346 7.92812V9.38629H11.1681V7.92812C11.1682 7.86683 11.1561 7.80613 11.1327 7.74948C11.1093 7.69284 11.0749 7.64136 11.0316 7.59799C10.8583 7.42463 10.6525 7.28711 10.4261 7.19329C10.1996 7.09946 9.95684 7.05117 9.7117 7.05117C9.46656 7.05117 9.22381 7.09946 8.99734 7.19329C8.77086 7.28711 8.56509 7.42463 8.39176 7.59799C8.35075 7.63886 8.31789 7.68716 8.29494 7.74031L5.86913 13.2592C5.81681 13.3622 5.77103 13.4683 5.73207 13.5771C5.59471 13.9614 5.54304 14.3711 5.58069 14.7775C5.61833 15.1839 5.74438 15.5772 5.95 15.9298C6.15562 16.2823 6.43584 16.5857 6.77103 16.8185C7.10622 17.0514 7.48827 17.2082 7.89042 17.2779C8.29257 17.3476 8.70509 17.3285 9.09909 17.2219C9.49309 17.1154 9.85904 16.9241 10.1713 16.6612C10.4836 16.3984 10.7346 16.0705 10.9068 15.7004C11.079 15.3304 11.1682 14.9272 11.1681 14.519V10.3195H13.0346V14.519C13.0344 14.9272 13.1234 15.3305 13.2955 15.7007C13.4676 16.0708 13.7185 16.3989 14.0307 16.6618C14.3429 16.9248 14.7089 17.1163 15.1029 17.2229C15.4969 17.3296 15.9095 17.3487 16.3117 17.2791C16.7139 17.2095 17.096 17.0528 17.4313 16.82C17.7666 16.5871 18.0469 16.2838 18.2525 15.9312C18.4582 15.5786 18.5843 15.1853 18.622 14.7788C18.6597 14.3724 18.608 13.9626 18.4706 13.5782ZM9.10977 8.20518C9.26533 8.07419 9.45943 7.9976 9.66253 7.98707C9.86563 7.97654 10.0666 8.03265 10.2349 8.14685V12.4344C9.87058 12.1073 9.4267 11.8817 8.94772 11.7801C8.46874 11.6786 7.97149 11.7047 7.50578 11.8558L9.10977 8.20518ZM8.36843 16.3855C7.99928 16.3855 7.63842 16.276 7.33149 16.0709C7.02455 15.8659 6.78532 15.5744 6.64405 15.2333C6.50279 14.8923 6.46582 14.517 6.53784 14.1549C6.60986 13.7929 6.78762 13.4603 7.04865 13.1993C7.30968 12.9382 7.64225 12.7605 8.00431 12.6885C8.36636 12.6164 8.74164 12.6534 9.08269 12.7947C9.42374 12.9359 9.71524 13.1752 9.92033 13.4821C10.1254 13.789 10.2349 14.1499 10.2349 14.519C10.2349 15.0141 10.0382 15.4888 9.68822 15.8388C9.33819 16.1889 8.86345 16.3855 8.36843 16.3855ZM13.9678 8.14627C14.1361 8.03207 14.3371 7.97596 14.5402 7.98649C14.7433 7.99702 14.9374 8.0736 15.0929 8.20459L16.6969 11.8547C16.2311 11.7036 15.7339 11.6776 15.2549 11.7792C14.7759 11.8809 14.332 12.1066 13.9678 12.4339V8.14627ZM15.8343 16.3855C15.4651 16.3855 15.1042 16.276 14.7973 16.0709C14.4904 15.8659 14.2511 15.5744 14.1099 15.2333C13.9686 14.8923 13.9316 14.517 14.0037 14.1549C14.0757 13.7929 14.2534 13.4603 14.5145 13.1993C14.7755 12.9382 15.1081 12.7605 15.4701 12.6885C15.8322 12.6164 16.2075 12.6534 16.5485 12.7947C16.8896 12.9359 17.1811 13.1752 17.3862 13.4821C17.5912 13.789 17.7007 14.1499 17.7007 14.519C17.7007 15.0141 17.5041 15.4888 17.154 15.8388C16.804 16.1889 16.3293 16.3855 15.8343 16.3855Z"
  />,
  <path
    key="links"
    fill="currentColor"
    transform="translate(0.6875 0.6875)"
    d="M13.6129 12.0451L12.788 11.2203L13.6129 10.3954C14.524 9.48431 14.524 8.00709 13.6129 7.09597C12.7017 6.18485 11.2245 6.18485 10.3134 7.09597L9.48853 7.92084L8.66367 7.09597L9.48853 6.27111C10.8552 4.90442 13.071 4.90442 14.4377 6.27111C15.8044 7.63779 15.8044 9.85363 14.4377 11.2203L13.6129 12.0451ZM11.9631 13.6949L11.1382 14.5198C9.77159 15.8864 7.55575 15.8864 6.18907 14.5198C4.82239 13.1531 4.82239 10.9372 6.18907 9.57057L7.01394 8.7457L7.8388 9.57057L7.01394 10.3954C6.10281 11.3066 6.10281 12.7838 7.01394 13.6949C7.92506 14.606 9.40226 14.606 10.3134 13.6949L11.1382 12.87L11.9631 13.6949ZM11.9631 7.92084L12.788 8.7457L8.66367 12.87L7.8388 12.0451L11.9631 7.92084Z"
  />,
  <path
    key="user"
    fill="currentColor"
    transform="translate(0.6875 0.6875)"
    d="M10.3068 11.561V16.2271H5.64062C5.64062 13.6501 7.72972 11.561 10.3068 11.561ZM10.3068 10.9777C8.37323 10.9777 6.80716 9.41165 6.80716 7.47812C6.80716 5.54459 8.37323 3.97852 10.3068 3.97852C12.2403 3.97852 13.8064 5.54459 13.8064 7.47812C13.8064 9.41165 12.2403 10.9777 10.3068 10.9777ZM10.3068 9.81119C11.5958 9.81119 12.6398 8.76714 12.6398 7.47812C12.6398 6.1891 11.5958 5.14505 10.3068 5.14505C9.01774 5.14505 7.97369 6.1891 7.97369 7.47812C7.97369 8.76714 9.01774 9.81119 10.3068 9.81119ZM15.8164 15.0793L16.6934 15.9562L15.8685 16.7811L14.9916 15.9041C14.6442 16.1094 14.239 16.2271 13.8064 16.2271C12.5179 16.2271 11.4733 15.1826 11.4733 13.8941C11.4733 12.6056 12.5179 11.561 13.8064 11.561C15.0949 11.561 16.1394 12.6056 16.1394 13.8941C16.1394 14.3267 16.0217 14.7319 15.8164 15.0793ZM13.8064 15.0606C14.4506 15.0606 14.9729 14.5383 14.9729 13.8941C14.9729 13.2498 14.4506 12.7275 13.8064 12.7275C13.1621 12.7275 12.6398 13.2498 12.6398 13.8941C12.6398 14.5383 13.1621 15.0606 13.8064 15.0606Z"
  />,
];

/**
 * Insights tabs: the feature list beside the open tab's motion visual. The
 * active tab's top edge fills while its visual plays plus a hold, then the
 * next tab opens. Visuals start once the tabs are first on screen. Runs only
 * while in view, keeps running on hover, pauses on keyboard focus; no
 * auto-rotation with reduced motion.
 */
export function InsightTabs() {
  const id = useId();
  const [current, setCurrent] = useState(0);
  // Bumped on every switch so re-opening a tab replays its visual.
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = insightFeatures.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const open = (i: number) => {
    if (i === current) return;
    setCurrent(i);
    setRun((r) => r + 1);
  };

  // Arrow keys move between tabs (roving tabindex), as Webflow's tabs do.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    const target = e.key === "Home" ? 0 : e.key === "End" ? count - 1 : step ? (current + step + count) % count : null;
    if (target === null) return;
    e.preventDefault();
    open(target);
    tabs.current[target]?.focus();
  };

  const panelId = `${id}-panel`;

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col lg:flex-row lg:items-stretch"
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setFocusPaused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusPaused(false);
      }}
    >
      <div role="tabpanel" id={panelId} aria-labelledby={`${id}-tab-${current}`} className="relative aspect-[738/640] w-full overflow-hidden [container-type:size] lg:w-[57.6563%] lg:flex-none">
        <InsightPanel visual={insightFeatures[current].visual} run={run} play={seen} />
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Crossword Insights"
        onKeyDown={onKeyDown}
        className="flex w-full min-w-0 flex-col shadow-[inset_0_-1px_0_#ddd] lg:grid lg:flex-1 lg:grid-rows-3"
      >
        {insightFeatures.map((feature, i) => {
          const on = i === current;
          return (
            <button
              key={feature.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={panelId}
              tabIndex={on ? 0 : -1}
              onClick={() => open(i)}
              className={cn(
                // Edges are inset shadows: Figma strokes sit inside the box and take no space.
                // Tabs share edges; the list closes the bottom.
                "relative flex w-full cursor-pointer items-start gap-3 p-5 text-left shadow-[inset_1px_0_0_#ddd,inset_-1px_0_0_#ddd,inset_0_1px_0_#ddd] transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon min-[480px]:gap-4 min-[480px]:p-6 md:p-8 min-[992px]:p-10",
                on ? "bg-sand" : "bg-transparent",
              )}
            >
              {on && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 z-1 h-[2px] w-0 animate-[insights-progress_linear_forwards] bg-maroon motion-reduce:w-full motion-reduce:animate-none"
                  style={{
                    animationDuration: `${insightVisuals[feature.visual].duration + HOLD}ms`,
                    animationPlayState: inView && !focusPaused ? "running" : "paused",
                  }}
                  onAnimationEnd={() => open((i + 1) % count)}
                />
              )}
              <svg
                aria-hidden
                viewBox="0 0 22 22"
                fill="none"
                className={cn(
                  "size-[22px] flex-none transition-[background-color,color,box-shadow] duration-300",
                  on
                    ? "bg-maroon text-[#ffb657] shadow-[0_0_0_0.55px_#efe9db,0_0_0_1.1px_#ffb657]"
                    : "text-black/16 shadow-[0_0_0_0.6875px_#00000030]",
                )}
              >
                {corners}
                {icons[i]}
              </svg>
              <span
                className={cn(
                  "flex min-w-0 flex-auto flex-col items-start gap-2.5 transition-opacity duration-300",
                  !on && "opacity-50",
                )}
              >
                <span className="max-w-[403.95px] font-serif text-[20px] leading-[1.1] tracking-[-0.8px] text-[#040404]">
                  {feature.title}
                </span>
                <span
                  className={cn(
                    "font-open-sans text-[14px] leading-5 tracking-[-0.42px] text-black/60",
                    feature.narrow ? "max-w-[359.64px]" : "max-w-[391.67px]",
                  )}
                >
                  {feature.body}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
