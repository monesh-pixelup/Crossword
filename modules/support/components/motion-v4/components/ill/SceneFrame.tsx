import frameBackgroundImage from "@/modules/support/assets/motion-v4/ill-frame/background.svg";
import frameTextureImage from "@/modules/support/assets/motion-v4/ill-frame/background-texture.webp";

const frameBackground = frameBackgroundImage.src;
const frameTexture = frameTextureImage.src;

// Shared 738x680 decorative frame (Figma node 1941:613) behind every
// home-page scene — see SceneFrame.css for the layer breakdown. `children`
// is whatever fixed-size scene (a Shell-based illustration, or
// DynamicLandingPage's own shell) the frame centers.
//
// `hideBackground` drops the red/damask fill (not the frame's sizing or
// content centering) — for scenes that bring their own backdrop, such as
// the Human-in-the-loop set's photographic background (page-feedback
// request).
// `height` is opt-in: a shorter or taller frame at the same 738 width.
// background.svg is fixed at 738x680 and won't stretch, so the red fill is
// set directly and its four rivets are redrawn at the new corners; the
// texture keeps its 13.16 / 15.98 inset and is scaled to fit, keeping its
// notched outline's corners. Unset, the frame is unchanged.
export function SceneFrame({
  children,
  hideBackground,
  height,
}: {
  children: React.ReactNode;
  hideBackground?: boolean;
  height?: number;
}) {
  return (
    <div
      className="ill-scene-frame-scale"
      style={height ? { aspectRatio: `738 / ${height}` } : undefined}
    >
      <div
        className={height ? "ill-scene-frame ill-scene-frame--sized" : "ill-scene-frame"}
        style={height ? { height } : undefined}
      >
        {!hideBackground && (
          <>
            {height ? (
              <svg className="ill-scene-frame__background" viewBox={`0 0 738 ${height}`} aria-hidden="true">
                {[
                  [26, 24],
                  [712, 24],
                  [26, height - 24],
                  [712, height - 24],
                ].map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4.5} fill="none" stroke="#D2B75C" />
                ))}
              </svg>
            ) : (
              <img
                className="ill-scene-frame__background"
                src={frameBackground}
                alt=""
                aria-hidden="true"
              />
            )}
            <img
              className="ill-scene-frame__texture"
              src={frameTexture}
              alt=""
              aria-hidden="true"
            />
          </>
        )}
        <div className="ill-scene-frame__content">{children}</div>
      </div>
    </div>
  );
}
