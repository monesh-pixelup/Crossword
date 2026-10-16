import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import medallion from "../../assets/shared/medallion.svg";
import { type BentoTile, dedicatedTiles } from "../../config/dedicated";
import grainTile from "@/modules/landing/assets/trust/grain-tile.webp";
import { Studs } from "../shared/livery";
import { TextLink } from "../shared/text-link";

/**
 * Figma's livery grounds for these tiles: the colour under its denim grain tile at 172.82px (not the
 * shared 23.35px damask tile), soft-light on aubergine, soft-light at 40% on forest, darken on maroon.
 */
const grounds = {
  aubergine: { fill: "bg-aubergine", blend: "mix-blend-soft-light" },
  forest: { fill: "bg-forest", blend: "mix-blend-soft-light opacity-40" },
  maroon: { fill: "bg-maroon", blend: "mix-blend-darken" },
} as const;

/** The livery tiles: 40px in, copy pinned to the bottom, 16px apart. */
const tileBase = "flex flex-col items-start justify-end gap-4 p-10";
const body = "font-sans text-base leading-[1.5] tracking-[-0.32px]";

function Tile({ tile }: { tile: BentoTile }) {
  if (tile.tone === "cream" || tile.tone === "sand") {
    // The light tiles size to their copy, top-aligned: the medallion, a Geist 16 title, then the line of copy.
    return (
      <li
        className={cn(
          "relative flex flex-col items-start gap-4 border border-engraved p-10",
          tile.tone === "cream" ? "bg-cream" : "bg-sand",
        )}
      >
        <Studs inset={7} />
        <Image src={medallion} alt="" className="size-7" />
        <h3 className={cn(body, "text-ink")}>{tile.title}</h3>
        <p className={cn(body, "text-ink-muted")}>{tile.body}</p>
      </li>
    );
  }

  return (
    <li className="flex">
      <div className={cn(tileBase, "relative isolate min-h-[360px] w-full lg:h-[420px]")}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className={cn("absolute inset-0", grounds[tile.tone].fill)} />
          <div
            className={cn("absolute inset-0 bg-size-[172.82px_172.82px] bg-top-left", grounds[tile.tone].blend)}
            style={{ backgroundImage: `url(${grainTile.src})` }}
          />
        </div>
        {/* 0.75px gilt frame 12px in, with a stud 6px into each corner. */}
        <div aria-hidden className="pointer-events-none absolute inset-3 shadow-[inset_0_0_0_0.75px_var(--color-gold)]" />
        <Studs inset={6} />
        {tile.eyebrow && (
          <Eyebrow surface="green" className="relative">
            {tile.eyebrow}
          </Eyebrow>
        )}
        <h3 className="relative font-serif text-[40px] leading-[1.1] font-light tracking-[-1.6px] text-cream">{tile.title}</h3>
        <p className={cn(body, "relative text-on-dark")}>{tile.body}</p>
      </div>
    </li>
  );
}

/**
 * Figma "ALT · Dedicated landing pages (reordered)": the headline with a text link bottom-aligned
 * on the right, then 64px below the tiles, 16px apart: two equal 420px livery tiles (aubergine,
 * then forest: Dark eyebrow, Crimson 40 title, in a 0.75px gilt frame 12px in with a stud in each
 * corner), then four cream tiles that size to their copy (the medallion and corner studs, a Geist
 * 16 title over a line of copy).
 */
export function DedicatedPages() {
  const large = dedicatedTiles.filter((t) => t.large);
  const small = dedicatedTiles.filter((t) => !t.large);

  return (
    <section id="dedicated-landing-pages" aria-labelledby="dedicated-title" className="relative scroll-mt-24 section-pad">
      <div className="flex content-width flex-col gap-16">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Dedicated landing pages</Eyebrow>
            <SectionTitle id="dedicated-title" initial="D" firstLine="edicated" secondLine="landing pages" width={300} variant="display" />
          </div>
          <TextLink href={ctaLinks.bookDemo} className="max-md:whitespace-normal">Think of something else? It is one conversation away.</TextLink>
        </div>

        <div className="flex w-full flex-col gap-4">
          <ul className="grid gap-4 md:grid-cols-2">
            {large.map((tile) => (
              <Tile key={tile.title} tile={tile} />
            ))}
          </ul>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {small.map((tile) => (
              <Tile key={tile.title} tile={tile} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
