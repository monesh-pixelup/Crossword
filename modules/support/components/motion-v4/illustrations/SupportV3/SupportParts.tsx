import { useEffect, useRef } from "react";
import { Chip } from "../../components/ill/Chip";
import { SkeletonBlock } from "../../components/ill/SkeletonBlock";
import { useMeasuredSkeleton } from "./useMeasuredSkeleton";

// Support V3's two recurring pieces. No ILL/* module covers a support
// status surface or a progress sequence (confirmed gap — the library is
// commerce-first), so both are composed from what the kit already has:
// the panel borrows Card-Commerce's own container literals, its status
// uses Primitive/Chip as-is, and step labels reuse Attribute-Row's /
// Product/Reference's type scale. Kept local to this series rather than
// promoted into components/ill until the pattern exists in Figma.

export function SupportPanel({
  heading,
  status,
  children,
  className,
  loading = false,
}: {
  heading?: React.ReactNode;
  status?: string;
  children: React.ReactNode;
  className?: string;
  // Opt-in, defaults false — every one of the six static illustrations
  // leaves this unset and renders exactly as before. Support V3 Motion's
  // scenarios pass it to cover the panel's real (always-rendered)
  // content with a skeleton overlay while the result "loads", following
  // the same contract CommerceProductCard's own `loading` prop already
  // uses: the overlay commits fully opaque the instant it mounts (never
  // fades in — the real content underneath would sneak through the
  // crossfade otherwise) and only its exit, once loading actually
  // finishes, crossfades away. One generic three-bar skeleton stands in
  // for all six panel layouts (a steps row, a shade comparison, a
  // refund figure, …) rather than six bespoke skeleton mockups — it
  // reads as "this card is loading" regardless of what it's about to
  // resolve into.
  loading?: boolean;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const shapes = useMeasuredSkeleton(panelRef, "ill-support-panel__skeleton-overlay", loading);
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  // One-shot: true for exactly the single render where `loading` has
  // just flipped from true to false — `wasLoadingRef` still holds the
  // previous (true) value here, since the effect below that updates it
  // hasn't run for this render yet. Design feedback on 01: the real
  // content (StatusSteps' dots, in that case) was always fully rendered
  // underneath the skeleton per the contract above, so it only ever read
  // as "uncovered" when the overlay melted away, never as its own
  // distinct arrival. This drives a one-shot entrance for the content
  // itself, timed to start once the overlay's own exit is mostly done
  // (see the CSS's own delay) rather than overlapping it — content
  // fades in *after* the skeleton finishes, not underneath it.
  const justRevealed = !loading && wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);

  // Only ever touches a panel that actually loads (every static
  // illustration's `loading` stays false the whole time, so this is
  // always `""` there — zero effect, byte-identical render).
  const contentModifier = loading
    ? "ill-support-panel--content-hidden"
    : justRevealed
      ? "ill-support-panel--content-reveal"
      : "";

  return (
    <section ref={panelRef} className={["ill-support-panel", contentModifier, className].filter(Boolean).join(" ")}>
      {(heading || status) && (
        <header className="ill-support-panel__header">
          {heading && <div className="ill-support-panel__heading">{heading}</div>}
          {status && <Chip size="sm">{status}</Chip>}
        </header>
      )}
      {children}
      {showOverlay && (
        <div className={`ill-support-panel__skeleton-overlay${loading ? "" : " ill-support-panel__skeleton-overlay--hidden"}`}>
          {shapes.map((shape, i) => (
            <div
              key={i}
              className={`ill-support-panel__skeleton-shape${shape.kind === "outline" ? " ill-support-panel__skeleton-shape--outline" : ""}`}
              style={{ left: shape.x, top: shape.y, width: shape.w, height: shape.h, borderRadius: shape.r }}
            >
              {shape.kind !== "outline" && <SkeletonBlock width="100%" height="100%" radius={shape.r} />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export type StepState = "done" | "current" | "upcoming";

export interface SupportStep {
  label: string;
  detail?: string;
  state: StepState;
}

// Three orientations now, after two rounds of design feedback:
// - "horizontal" (01's shipment route) — reverted back to the original
//   connected-dot timeline (the tab-bar treatment tried in between was
//   asked back out, for this scenario specifically).
// - "vertical" (03's "what happens next") — a checklist, unchanged
//   throughout; marker + stacked label/detail.
// - "boxed" (02's routine) — each step its own bordered tile, no
//   marker/connector; the current one highlighted on Background/Subtle,
//   the same "this one" surface InsightHighlight/the shade/swap tiles
//   already use, rather than a new highlight color.
export function StatusSteps({
  steps,
  orientation = "horizontal",
}: {
  steps: readonly SupportStep[];
  orientation?: "horizontal" | "vertical" | "boxed";
}) {
  if (orientation === "boxed") {
    return (
      <ol className="ill-support-steps ill-support-steps--boxed">
        {steps.map((step) => (
          <li key={step.label} className={`ill-support-step ill-support-step--${step.state}`}>
            <span className="ill-support-step__label">{step.label}</span>
            {step.detail && <span className="ill-support-step__detail">{step.detail}</span>}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={`ill-support-steps ill-support-steps--${orientation}`}>
      {steps.map((step) => (
        <li key={step.label} className={`ill-support-step ill-support-step--${step.state}`}>
          <span className="ill-support-step__marker" aria-hidden="true" />
          <span className="ill-support-step__text">
            <span className="ill-support-step__label">{step.label}</span>
            {step.detail && <span className="ill-support-step__detail">{step.detail}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
