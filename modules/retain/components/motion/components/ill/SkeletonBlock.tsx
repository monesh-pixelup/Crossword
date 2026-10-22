
// Generic shimmering loading placeholder, sized by the caller to match
// whatever real content it stands in for (so swapping one for the other
// never shifts layout).
export function SkeletonBlock({
  width,
  height,
  aspectRatio,
  radius,
}: {
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  radius?: number;
}) {
  return (
    <div
      className="ill-skeleton-block"
      style={{
        width,
        height,
        aspectRatio,
        borderRadius: radius,
      }}
    />
  );
}
