import { useEffect, useRef } from "react";
import { SkeletonBlock } from "../../components/ill/SkeletonBlock";

// `resolveDelayMs` staggers this frame's exit behind others in the same
// row (same contract as CommerceProductCard's) — unset by default.
export function LoadingFrame({
  loading,
  radius = 12,
  className,
  resolveDelayMs,
  children,
}: {
  loading: boolean;
  radius?: number;
  className?: string;
  resolveDelayMs?: number;
  children: React.ReactNode;
}) {
  // Keeps the overlay mounted through the render where `loading` flips
  // false so it can play its exit — then it just sits invisible.
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);

  return (
    <div className={["sdm-sell-loading-frame", className].filter(Boolean).join(" ")}>
      {children}
      {showOverlay && (
        <div
          className={`sdm-sell-loading-frame__overlay${loading ? "" : " sdm-sell-loading-frame__overlay--hidden"}`}
          style={{ borderRadius: radius, transitionDelay: resolveDelayMs ? `${resolveDelayMs}ms` : undefined }}
        >
          <SkeletonBlock width="100%" height="100%" radius={radius} />
        </div>
      )}
    </div>
  );
}
