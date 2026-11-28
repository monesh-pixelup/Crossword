import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/cn";
import frameInnerAnant from "../assets/people/frame-inner-anant.svg";
import frameInnerMelissa from "../assets/people/frame-inner-melissa.svg";
import frameOuterAnant from "../assets/people/frame-outer-anant.svg";
import frameOuterMelissa from "../assets/people/frame-outer-melissa.svg";
import photoAnant from "../assets/people/photo-anant.png";
import photoMelissa from "../assets/people/photo-melissa.png";
import studAnantA from "../assets/people/stud-anant-a.svg";
import studAnantB from "../assets/people/stud-anant-b.svg";
import studAnantC from "../assets/people/stud-anant-c.svg";
import studMelissa from "../assets/people/stud-melissa.svg";
import textureAnant from "../assets/people/figure-texture-anant.png";
import textureMelissa from "../assets/people/figure-texture-melissa.png";
// The two stamps are Managed Launch's journey stamps (3x exports, tilted -6.78° with their shadow), turned to the tilt
// the About us figures give them.
import stampAnant from "@/modules/managed-launch/assets/library/stamps/9-brand-faq.png";
import stampMelissa from "@/modules/managed-launch/assets/library/stamps/7-product-deep-dive.png";

/** A stud: its centre, from the figure's centre, in px, and its artwork. */
type Stud = { x: number; y: number; src: StaticImageData };

type Portrait = {
  name: string;
  /** The figure's ground and its texture (darkened over it, at `textureOpacity`). */
  ground: string;
  texture: StaticImageData;
  textureOpacity?: number;
  /** The gold frame 12.22px / 15.28px in (195.56 × 244.46). */
  frameOuter: StaticImageData;
  /** The turned photo: its centre from the figure's centre, its box, rotation, hairline and how the photo fills it. */
  photo: {
    src: StaticImageData;
    x: number;
    y: number;
    box: number;
    rotate: number;
    border: string;
    imageClassName: string;
  };
  /** The notched gold rule inside the photo, turned with it. */
  frameInner: { src: StaticImageData; size: number };
  studs: Stud[];
  studSize: number;
  /**
   * The postage stamp (Figma's WebGPU leather-emboss and guilloché shaders, shipped as their render with its rotation
   * and shadow): its render's top left from the figure's, and its size. `inside`: clipped by the figure (Melissa's),
   * otherwise drawn over its edge (Anant's sits on the section, past the figure's foot).
   */
  stamp: {
    src: StaticImageData;
    left: number;
    top: number;
    width: number;
    height: number;
    inside: boolean;
    /** Turned about the stamp's centre (`origin`, from its top left) to Figma's tilt, in degrees. */
    rotate: number;
    origin: string;
  };
  copy: ReactNode;
};

const portraits: Portrait[] = [
  {
    name: "Anant Garg",
    ground: "bg-forest",
    texture: textureAnant,
    frameOuter: frameOuterAnant,
    photo: {
      src: photoAnant,
      x: 10.93,
      y: -2.49,
      box: 206.342,
      rotate: -5.98,
      border: "border-[#011f10]",
      imageClassName: "top-[-9.06%] left-[-11.41%] size-[128%]",
    },
    frameInner: { src: frameInnerAnant, size: 193.866 },
    studs: [
      { x: 114.6, y: 81.53, src: studAnantA },
      { x: -73.09, y: 101.18, src: studAnantA },
      { x: 94.95, y: -106.16, src: studAnantB },
      { x: -92.74, y: -86.51, src: studAnantC },
    ],
    studSize: 5.144,
    // Figma 4481:6595: the stamp's box at (107.35, 178.79) from the figure. The 3x export (Brand FAQ, -6.78°) at the
    // render's scale (its body 71.15px across), its centre on the render's, turned +12° to the render's 5.2°.
    stamp: { src: stampAnant, left: 92.35, top: 167.79, width: 116.86, height: 113.25, inside: false, rotate: 12, origin: "57.98px 51.89px" },
    copy: (
      <>
        <div className="flex flex-col gap-6">
          <Name>Anant Garg</Name>
          <Body>
            Anant founded CometChat and has spent years building technology around conversations. With Crossword, he&apos;s
            taking that experience into a new kind of interaction. Helping people figure out what they need, not just giving
            them a place to ask.
          </Body>
        </div>
        <Aside>He knows a thing or two about getting the message across.</Aside>
      </>
    ),
  },
  {
    name: "Melissa Ordway",
    ground: "bg-maroon",
    texture: textureMelissa,
    textureOpacity: 0.4,
    frameOuter: frameOuterMelissa,
    photo: {
      src: photoMelissa,
      x: 3.75,
      y: -6.16,
      box: 201.041,
      rotate: 3.58,
      border: "border-[#5d0429]",
      imageClassName: "top-[0.01%] left-[-4.97%] size-[111%]",
    },
    frameInner: { src: frameInnerMelissa, size: 188.886 },
    studs: [
      { x: 89.78, y: 91.32, src: studMelissa },
      { x: -93.74, y: 79.86, src: studMelissa },
      { x: 101.25, y: -92.19, src: studMelissa },
      { x: -82.27, y: -103.66, src: studMelissa },
    ],
    studSize: 5.012,
    // Figma 4480:6691: the stamp's box at (133.93, 176.5) in the figure. The 3x export (Product deep dive, -6.78°) at
    // the render's scale (its body 66.27px across), its centre on the render's, turned +1.29° to the render's -5.49°.
    stamp: { src: stampMelissa, left: 119.43, top: 166.2, width: 108.83, height: 105.47, inside: true, rotate: 1.29, origin: "53.99px 48.32px" },
    copy: (
      <>
        {/* 24px under the name, as Anant's; the two lines of copy 14px apart. */}
        <div className="flex flex-col gap-6">
          <Name>Melissa Ordway</Name>
          <div className="flex flex-col gap-3.5">
            <Body>Good conversations are one thing. Making sure everything behind them works is another.</Body>
            <Body>Melissa keeps the moving parts moving, the details in check and the plans grounded in reality.</Body>
          </div>
        </div>
        <Aside>Because somebody has to make sure we practice what we preach.</Aside>
      </>
    ),
  },
];

function Name({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-1 font-serif text-[34px] leading-10 font-light tracking-[-1.36px] text-ink max-md:text-[30px] max-md:leading-9 max-md:tracking-[-1.2px]">
      {children}
    </h3>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <p className="font-sans text-[15px] leading-[23px] tracking-[-0.32px] text-ink-muted">{children}</p>;
}

function Aside({ children }: { children: ReactNode }) {
  return <p className="font-serif text-[22px] leading-[1.2] font-light tracking-[-1.36px] text-ink max-md:text-[20px] max-md:tracking-[-1.1px]">{children}</p>;
}

/** Centred on the figure's centre, offset by (x, y). */
const fromCentre = (x: number, y: number, size: number): CSSProperties => ({
  left: `calc(50% + ${x}px - ${size / 2}px)`,
  top: `calc(50% + ${y}px - ${size / 2}px)`,
  width: size,
  height: size,
});

/**
 * Figma's "Figure" (220 × 275): the ground with its texture darkened over it, the outer gold frame, and the photo turned
 * a few degrees in its hairline with the notched rule and four studs turned with it, and the postage stamp.
 */
function Figure({ portrait: p }: { portrait: Portrait }) {
  const stamp = (
    <Image
      src={p.stamp.src}
      alt=""
      aria-hidden
      unoptimized
      className="pointer-events-none absolute max-w-none select-none"
      style={{
        left: p.stamp.left,
        top: p.stamp.top,
        width: p.stamp.width,
        height: p.stamp.height,
        transform: `rotate(${p.stamp.rotate}deg)`,
        transformOrigin: p.stamp.origin,
      }}
    />
  );
  return (
    <div className="relative h-[275.017px] w-[220px] shrink-0">
      <div className={cn("absolute inset-0 overflow-clip", p.ground)}>
        <Image
          src={p.texture}
          alt=""
          aria-hidden
          sizes="275px"
          className="absolute top-0 left-0 size-[275.017px] max-w-none mix-blend-darken"
          style={p.textureOpacity !== undefined ? { opacity: p.textureOpacity } : undefined}
        />
        <Image src={p.frameOuter} alt="" aria-hidden unoptimized className="absolute top-[15.28px] left-[12.22px] h-[244.464px] w-[195.559px] max-w-none" />

        <div className="absolute flex items-center justify-center" style={fromCentre(p.photo.x, p.photo.y, p.photo.box)}>
          <div className="absolute inset-0" style={{ transform: `rotate(${p.photo.rotate}deg)` }}>
            <div className={cn("absolute inset-0 overflow-hidden border border-solid", p.photo.border)}>
              <Image src={p.photo.src} alt={p.name} sizes="264px" className={cn("absolute max-w-none", p.photo.imageClassName)} />
            </div>
          </div>
        </div>
        <Image
          src={p.frameInner.src}
          alt=""
          aria-hidden
          unoptimized
          className="absolute max-w-none"
          style={{ ...fromCentre(p.photo.x, p.photo.y, p.frameInner.size), transform: `rotate(${p.photo.rotate}deg)` }}
        />
        {p.studs.map((stud, i) => (
          <Image key={i} src={stud.src} alt="" aria-hidden unoptimized className="absolute max-w-none" style={fromCentre(stud.x, stud.y, p.studSize)} />
        ))}
        {p.stamp.inside && stamp}
      </div>
      {!p.stamp.inside && stamp}
    </div>
  );
}

/**
 * Figma "Container (About us · 16 Arc)" (4464:37657): the People eyebrow 24px over the one-line swash headline, then
 * 72px under it the two people side by side (80px apart): each a 220 × 275 framed portrait, 36px left of their name
 * (Crimson Light 34/40), lines of Geist 15/23 in ink muted and a closing line in Crimson Light 22.
 *
 * Below 1280px the two stack (64px apart), each portrait beside its copy; below 640px the copy sits under the portrait.
 */
export function People() {
  return (
    <section aria-labelledby="about-people-title" className="relative section-pad bg-cream">
      <div className="flex content-width flex-col items-start">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>People</Eyebrow>
          <SectionTitle
            id="about-people-title"
            initial="M"
            firstLine="eet the people behind the replies"
            width={769}
            variant="people"
            weight="light"
          />
        </div>

        <div className="mt-[72px] grid w-full grid-cols-1 gap-16 max-md:mt-12 max-md:gap-14 xl:grid-cols-2 xl:gap-20">
          {portraits.map((portrait) => (
            <article key={portrait.name} className="flex items-start gap-9 max-sm:flex-col max-sm:gap-6">
              <Figure portrait={portrait} />
              <div className="flex min-w-0 flex-1 flex-col items-start gap-3.5 sm:max-w-[420px] xl:max-w-none">{portrait.copy}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
