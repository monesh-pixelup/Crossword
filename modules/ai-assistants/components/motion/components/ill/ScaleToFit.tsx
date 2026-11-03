// Scales `children` — rendered at its own natural, unscaled size — down
// to fit inside a `maxWidth`x`maxHeight` box, uniformly (never distorting
// aspect ratio) and centered. The child is laid out normally at
// `contentWidth`x`contentHeight` first, then visually scaled, so nothing
// about its own internal layout needs to change to live inside a smaller
// frame. Reused wherever a scenario's existing, fixed-size content needs
// to present inside `ChannelContainer`'s 413x402 box without being
// rebuilt at that scale.
export function ScaleToFit({
  contentWidth,
  contentHeight,
  maxWidth,
  maxHeight,
  children,
}: {
  contentWidth: number;
  contentHeight: number;
  maxWidth: number;
  maxHeight: number;
  children: React.ReactNode;
}) {
  const scale = Math.min(maxWidth / contentWidth, maxHeight / contentHeight);

  return (
    <div style={{ position: "relative", width: maxWidth, height: maxHeight }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: contentWidth,
          height: contentHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
