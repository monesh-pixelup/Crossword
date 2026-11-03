import { BrowserScene } from "../PlaceItWherever/BrowserScene";
import { suggestions } from "../PlaceItWherever/data";
// Aurelia brand mark (Figma node 3359:3345). On each burgundy disc it spans
// 58.6% and sits 2.75% above centre, as in the Figma frame (.aurelia-glyph).
import { BrandMark } from "../../brands/BrandIdentity";

// The store this pilot sits on.
export const STORE_URL = "aurelle.com";
import { ChannelContainer } from "../../components/ill/ChannelContainer";
import { ScaleToFit } from "../../components/ill/ScaleToFit";

// Same framing as PlaceItWherever: the browser scene's native square,
// scaled into one 306px shell slot inside its own ChannelContainer.
export const SCENE_SIZE = 403.75;
export const SHELL_SLOT = 306;

type Placement = "left" | "right" | "bar" | "pinned" | "sidebar";

// The Storybook's Sidebar/Placement seats, one panel each (static rests).
// Colours are the original #25 visual's; structure and sizes are the
// Storybook's (STORYBOOK_MAPPING.md §12).
const placements: { id: Placement; title: string }[] = [
  { id: "left", title: "Left — chat view" },
  { id: "right", title: "Right — chat view" },
  { id: "bar", title: "Bottom — chat bar" },
  { id: "pinned", title: "Middle — pinned" },
  { id: "sidebar", title: "Right — sidebar view" },
];

// 25 — Place it where it works best, rebuilt against STORYBOOK_MAPPING.md
// and the Storybook's Sidebar/Placement stories. The aubergine
// ChannelContainer, the 306px browser slot and the placeholder store page
// are unchanged; each panel seats the launcher the way one Placement
// story does. PlaceItWhereverV2Motion focuses on drawer placements in one viewport.
export function PlaceItWhereverV2() {
  return (
    <div className="ill-place-it-wherever">
      {placements.map((p) => (
        <figure className="ill-place-it-wherever__panel" key={p.id}>
          <ChannelContainer>
            <ScaleToFit contentWidth={SCENE_SIZE} contentHeight={SCENE_SIZE} maxWidth={SHELL_SLOT} maxHeight={SHELL_SLOT}>
              <PlacementScene placement={p.id} />
            </ScaleToFit>
          </ChannelContainer>
          <figcaption>{p.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function PlacementScene({ placement }: { placement: Placement }) {
  if (placement === "sidebar") return <SidebarScene />;
  return (
    <BrowserScene url={STORE_URL}>
      {placement === "left" && <OrbSeat side="left" />}
      {placement === "right" && <OrbSeat side="right" />}
      {placement === "bar" && <RestingBar />}
      {placement === "pinned" && <PinnedPill />}
    </BrowserScene>
  );
}

// Chat view rest: the orb in the wall's corner, 1.5rem off both edges,
// the suggestion chips stacked above it on its own edge.
function OrbSeat({ side }: { side: "left" | "right" }) {
  return (
    <div className={`piw2-seat piw2-seat--${side}`}>
      <StarterChips />
      <span className="piw2-orb" aria-label="Open chat">
        <OrbMark />
      </span>
    </div>
  );
}

export function StarterChips({ className }: { className?: string }) {
  return (
    <div className={["piw2-chips", className].filter(Boolean).join(" ")}>
      {suggestions.map((s) => (
        <span key={s.id} className="piw2-chip">
          {s.text}
        </span>
      ))}
    </div>
  );
}

export function OrbMark() {
  return <BrandMark brand="Aurelle" className="aurelia-supplied-mark" />;
}

// The chat bar's resting variant: a centred 56px pill (20rem in the
// product, held to the scene's width here), the line asking, the send
// disc at rest. `placeholder` swaps the line (the motion rolls prompts).
function RestingBar() {
  return (
    <div className="piw2-bar">
      <BarContents />
    </div>
  );
}

export function BarContents({ placeholder }: { placeholder?: React.ReactNode }) {
  return (
    <>
      <span className="piw2-bar__mark" aria-hidden="true">
        <BrandMark brand="Aurelle" className="aurelia-supplied-mark" />
      </span>
      {placeholder ?? <span className="piw2-bar__placeholder">Ask anything</span>}
      <span className="piw2-bar__send" aria-hidden="true">
        <ArrowUpGlyph />
      </span>
    </>
  );
}

// Middle — pinned: the launcher as a pill on the wall's middle, speaking
// its line, with the six-dot drag hold.
function PinnedPill() {
  return (
    <div className="piw2-pin" aria-label="Open chat">
      <PillContents />
    </div>
  );
}

export function PillContents() {
  return (
    <>
      <span className="piw2-pin__disc">
        <BrandMark brand="Aurelle" className="aurelia-supplied-mark" />
      </span>
      <span className="piw2-pin__line">Ask anything</span>
      <DotsHoldGlyph />
    </>
  );
}

// Sidebar view, push mode: the chat opens as the wall's full-height
// column and the store page steps aside as a scaled card, rounded only on
// the corners facing the panel, on the desk behind.
function SidebarScene() {
  return (
    <div className="piw2-desk">
      <div className="piw2-desk__page">
        <BrowserScene url={STORE_URL} />
      </div>
      <aside className="piw2-sidebar">
        <Room />
      </aside>
    </div>
  );
}

// The open room's chrome: header pucks and brand disc, the room's own
// follow-up chips, the composer. Shared by the static sidebar column
// and the motion's left and right drawers.
export function Room() {
  return (
    <>
      <header className="piw2-sidebar__head">
        <span className="piw2-puck"><HistoryGlyph /></span>
        <span className="piw2-sidebar__identity">
          <span className="piw2-sidebar__logo"><BrandMark brand="Aurelle" className="aurelia-supplied-mark" /></span>
        </span>
        <span className="piw2-puck"><CloseGlyph /></span>
      </header>
      <div className="piw2-sidebar__body">
        {suggestions.map((s) => (
          <span key={s.id} className="piw2-chip piw2-chip--room">
            {s.text}
          </span>
        ))}
      </div>
      <div className="piw2-sidebar__composer">
        <span>Ask anything</span>
        <span className="piw2-sidebar__send"><ArrowUpGlyph /></span>
      </div>
    </>
  );
}

// Phosphor isn't a dependency of this kit: redrawn Phosphor regular
// glyphs at their 256 viewBox, plus the product's six-dot hold.
const glyph = {
  viewBox: "0 0 256 256",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 16,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ArrowUpGlyph() {
  return (
    <svg {...glyph} width={14} height={14}>
      <line x1="128" y1="216" x2="128" y2="40" />
      <polyline points="56 112 128 40 200 112" />
    </svg>
  );
}

function HistoryGlyph() {
  return (
    <svg {...glyph} width={10} height={10}>
      <polyline points="128 80 128 128 168 152" />
      <polyline points="72 104 32 104 32 64" />
      <path d="M67.6,192A88,88,0,1,0,65.8,65.8C55.4,76.3,46.2,86.4,32,104" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg {...glyph} width={10} height={10}>
      <line x1="200" y1="56" x2="56" y2="200" />
      <line x1="200" y1="200" x2="56" y2="56" />
    </svg>
  );
}

function DotsHoldGlyph() {
  return (
    <svg className="piw2-pin__dots" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true">
      {[3, 9].map((x) => [3, 9, 15].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.5} />))}
    </svg>
  );
}
