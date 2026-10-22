import { ContentFade } from "../../components/ill/ContentFade";
import audiencesBgImage from "../../../../assets/motion/ill-frame/retain/audiences_bg_3x.webp";
import returnReductionBgImage from "../../../../assets/motion/ill-frame/retain/return_reduction_bg_3x.webp";

const audiencesBg = audiencesBgImage.src;
const returnReductionBg = returnReductionBgImage.src;

// 1280x599 landscape frame: a decorative damask backdrop (green for 11,
// purple for 12 — each 3x of the frame), the website page inset inside
// its gold border as a clipped panel with a short bottom fade, and the
// Crossword widget centered on top. Omit `widget` for the scene-only
// version (same frame and page, no widget). `bleed` (motion 11/12) runs
// the page off the frame's bottom edge and anchors the widget to the
// bottom, Visual 21's placement, so its composer sits low on the page.
const backdrops = { green: audiencesBg, purple: returnReductionBg };

export function LandscapeCanvas({
  scene,
  widget,
  backdrop,
  bleed = false,
}: {
  scene: React.ReactNode;
  widget?: React.ReactNode;
  backdrop: keyof typeof backdrops;
  bleed?: boolean;
}) {
  return (
    <div className={`ill-landscape-canvas${bleed ? " ill-landscape-canvas--bleed" : ""}`} style={{ backgroundImage: `url(${backdrops[backdrop]})` }}>
      <div className="ill-landscape-canvas__page">
        <div className="ill-landscape-canvas__scene">{scene}</div>
        <div className="ill-landscape-canvas__fade">
          <ContentFade />
        </div>
      </div>
      {widget && <div className="ill-landscape-canvas__widget">{widget}</div>}
    </div>
  );
}
