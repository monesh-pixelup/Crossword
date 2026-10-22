import { useEffect, useRef } from "react";
import { SkeletonBlock } from "../../components/ill/SkeletonBlock";

export function LoadingFrame({
  loading,
  radius = 12,
  className,
  children,
}: {
  loading: boolean;
  radius?: number;
  className?: string;
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
    <div className={["sell-loading-frame", className].filter(Boolean).join(" ")}>
      {children}
      {showOverlay && (
        <div
          className={`sell-loading-frame__overlay${loading ? "" : " sell-loading-frame__overlay--hidden"}`}
          style={{ borderRadius: radius }}
        >
          <SkeletonBlock width="100%" height="100%" radius={radius} />
        </div>
      )}
    </div>
  );
}
