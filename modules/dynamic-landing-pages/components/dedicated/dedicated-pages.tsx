import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import medallion from "../../assets/shared/medallion.svg";
import { type BentoTile, dedicatedTiles } from "../../config/dedicated";
import { NotchedFrame, NotchedPanel } from "../shared/livery";
import { SectionTick } from "../shared/section-tick";
import { TextLink } from "../shared/text-link";

/** 48px in, so the copy clears the deep corner notches. */
const tileBase = "flex flex-col items-start justify-end gap-4 p-12";
const tileHeight = (tile: BentoTile) => (tile.tall ? "min-h-[320px] lg:h-[420px]" : "min-h-[260px] lg:h-[300px]");
const title = "font-serif text-(length:--h4-size) leading-[1.1] font-light tracking-[-0.05em]";
const body = "max-w-[520px] font-sans text-base leading-6 tracking-[-0.02em]";

/**
 * The cream and sand tiles' frame, matching the livery tiles': the home page's notched line 14px in
 * (in #b7ae9a, the hairline used on light grounds) with its deep 46px corners and a gold ring in each.
 */
function LightFrame() {
  return <NotchedFrame inset={14} radius={46} color="var(--color-engraved)" rings />;
}

function Tile({ tile }: { tile: BentoTile }) {
  const span = tile.wide ? "md:col-span-2" : "";

  if (tile.tone === "cream" || tile.tone === "sand") {
    return (
      <li
        className={cn(
          tileBase,
          tileHeight(tile),
          span,
          "relative shadow-[inset_0_0_0_1px_var(--color-engraved)]",
          tile.tone === "cream" ? "bg-cream" : "bg-sand",
        )}
      >
        <LightFrame />
        <Image src={medallion} alt="" className="size-7" />
        <h3 className={cn(title, "text-ink")}>{tile.title}</h3>
        <p className={cn(body, "text-ink-muted")}>{tile.body}</p>
      </li>
    );
  }

  return (
    <li className={cn("flex", tileHeight(tile), span)}>
      <NotchedPanel tone={tile.tone} inset={14} radius={46} rings className={cn(tileBase, "w-full")}>
        {tile.eyebrow && (
          <Eyebrow surface="green" className="relative">
            {tile.eyebrow}
          </Eyebrow>
        )}
        <h3 className={cn(title, "relative text-cream")}>{tile.title}</h3>
        <p className={cn(body, "relative text-on-dark")}>{tile.body}</p>
      </NotchedPanel>
    </li>
  );
}

/**
 * Layout/Feature, Bento grid variant: a split header, then the tiles on a three-column grid
 * (aubergine 2-col and forest tiles first, then cream, sand and maroon), closing with a sand tile
 * that invites anything not on the list.
 */
export function DedicatedPages() {
  return (
    <section id="dedicated-landing-pages" aria-labelledby="dedicated-title" className="relative scroll-mt-24 section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Dedicated landing pages</Eyebrow>
            <SectionTitle
              id="dedicated-title"
              initial="D"
              firstLine="edicated pages for"
              secondLine="every campaign"
              width={500}
            />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Full, ad-specific pages built for a single campaign or audience, with components like quizzes, games, and
            comparisons built in.
          </p>
        </div>

        <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dedicatedTiles.map((tile) => (
            <Tile key={tile.title} tile={tile} />
          ))}
          <li className={cn(tileBase, "relative min-h-[260px] bg-sand shadow-[inset_0_0_0_1px_var(--color-engraved)] md:col-span-2 lg:col-span-1 lg:h-[300px]")}>
            <LightFrame />
            <h3 className={cn(title, "text-ink")}>Think of something else?</h3>
            <p className={cn(body, "text-ink-muted")}>It is one conversation away.</p>
            <TextLink href={ctaLinks.bookDemo}>Talk to us</TextLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
