import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import accentH from "../../assets/platform/accent-h.svg";
import accentV from "../../assets/platform/accent-v.svg";
import nodeA from "../../assets/platform/node-a.webp";
import nodeB from "../../assets/platform/node-b.webp";
import nodeC from "../../assets/platform/node-c.webp";
import nodeD from "../../assets/platform/node-d.webp";
import nodeHub from "../../assets/platform/node-hub.webp";
import wire238 from "../../assets/platform/wire-238.svg";
import wire239 from "../../assets/platform/wire-239.svg";
import wire240 from "../../assets/platform/wire-240.svg";
import wire241 from "../../assets/platform/wire-241.svg";
import wire242 from "../../assets/platform/wire-242.svg";
import wire243 from "../../assets/platform/wire-243.svg";
import wire244 from "../../assets/platform/wire-244.svg";
import wire245 from "../../assets/platform/wire-245.svg";

type Placed = { src: StaticImageData; left: number; top: number };

/** Faint connector wires, at their Figma offsets (stroke bleed included). */
const wires: Placed[] = [
  { src: wire238, left: 586.595, top: -0.533 },
  { src: wire239, left: 0, top: 174.47 },
  { src: wire240, left: 482.21, top: 216.75 },
  { src: wire241, left: 216.752, top: 47.298 },
  { src: wire242, left: 260.128, top: 154.144 },
];

const wiresAfter: Placed[] = [
  { src: wire243, left: 37.76, top: 0.108 },
  { src: wire245, left: 135.75, top: 152.431 },
];

/** Short gold highlights along the wires. */
const accents: Placed[] = [
  { src: accentH, left: 481, top: 216.95 },
  { src: accentH, left: 249, top: 47.5 },
  { src: accentV, left: 113, top: 75 },
  { src: accentV, left: 481, top: 174.45 },
  { src: accentV, left: 586.5, top: 32 },
];

function PlacedImages({ items }: { items: Placed[] }) {
  return items.map(({ src, left, top }) => (
    <Image key={`${left}-${top}`} src={src} alt="" className="absolute max-w-none" style={{ left, top }} />
  ));
}

/*
 * Nodes are 3x PNG exports (as WebP): their gold rim is a spread drop-shadow
 * that browsers render thinner than Figma when the SVG is used as an image.
 * Exports come in on-canvas orientation, so they're flipped back once to
 * cancel the diagram's mirror.
 */
function Node({ src, size, bleed = 0.0495 }: { src: StaticImageData; size: number; bleed?: number }) {
  // The artwork (with its shadow) bleeds past the node box on every side.
  const art = size * (1 + 2 * bleed);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt=""
        sizes={`${Math.ceil(art)}px`}
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 -scale-x-100"
        style={{ width: art, height: art }}
      />
    </div>
  );
}

/**
 * Channel icons wired into the Crossword hub. Drawn in Figma's own
 * coordinates, then mirrored horizontally exactly as the Figma frame is.
 */
export function AgentDiagram({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("h-[285.33px] w-[699px] -scale-x-100", className)}>
      <div className="relative size-full">
        <div className="absolute top-[101.83px] left-[90.23px] flex items-center gap-[61.385px]">
          <Node src={nodeA} size={43.592} />
          <Node src={nodeB} size={43.592} />
          <Node src={nodeHub} size={98.216} bleed={0.05} />
          <Node src={nodeC} size={43.592} />
          <Node src={nodeD} size={43.592} />
        </div>
        <PlacedImages items={wires} />
        <div className="absolute top-[48.95px] left-[403.29px] h-[106.828px] w-[35.463px] rotate-180">
          <Image src={wire244} alt="" className="absolute -top-[0.502px] -left-[0.5px] max-w-none" />
        </div>
        <PlacedImages items={wiresAfter} />
        <PlacedImages items={accents} />
      </div>
    </div>
  );
}
