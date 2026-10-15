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

/** 40px in, copy pinned to the bottom, 16px apart. */
const tileBase = "flex flex-col items-start justify-end gap-4 p-10";
const body = "font-sans text-base leading-[1.5] tracking-[-0.32px]";

function Tile({ tile }: { tile: BentoTile }) {
  const title = tile.large
    ? "font-serif text-[40px] leading-[1.1] font-light tracking-[-1.6px]"
    : "font-serif text-[32px] leading-[1.2] font-light tracking-[-1.28px]";

  if (tile.tone === "cream" || tile.tone === "sand") {
    return (
      <li
        className={cn(
          tileBase,
          "relative min-h-[320px] border border-engraved lg:h-[380px]",
          tile.tone === "cream" ? "bg-cream" : "bg-sand",
        )}
      >
        <Studs inset={7} />
        <Image src={medallion} alt="" className="size-7" />
        <h3 className={cn(title, "text-ink")}>{tile.title}</h3>
        <p className={cn(body, "text-ink-muted")}>{tile.body}</p>
      </li>
    );
  }

  return (
    <li className={cn("flex", tile.tone === "aubergine" && "md:col-span-2")}>
      <div className={cn(tileBase, "relative isolate w-full", tile.large ? "min-h-[360px] lg:h-[420px]" : "min-h-[320px] lg:h-[380px]")}>
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
        <h3 className={cn(title, "relative text-cream")}>{tile.title}</h3>
        <p className={cn(body, "relative text-on-dark")}>{tile.body}</p>
      </div>
    </li>
  );
}

/**
 * Figma "Library · Bento grid" (Dedicated landing pages): the headline with a text link
 * bottom-aligned on the right, then 64px below the tiles, 24px apart: a 2:1 row of 420px livery
 * tiles (aubergine, then forest: Dark eyebrow, Crimson 40 title) and a row of four 380px tiles
 * (cream and sand with the medallion and corner studs, then two maroon), every livery tile in a
 * 0.75px gilt frame 12px in with a stud in each corner.
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

        <div className="flex w-full flex-col gap-6">
          <ul className="grid gap-6 md:grid-cols-3">
            {large.map((tile) => (
              <Tile key={tile.title} tile={tile} />
            ))}
          </ul>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {small.map((tile) => (
              <Tile key={tile.title} tile={tile} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
