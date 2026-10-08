import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import crosswordMark from "../../assets/blog/crossword-mark.svg";
import damaskTile from "../../assets/blog/damask-tile.webp";
import dot from "../../assets/blog/dot.svg";
import featureFrame from "../../assets/blog/feature-frame.webp";
import stamp from "../../assets/blog/stamp.webp";
import arrowRight from "../../assets/insights/arrow-right.svg";
import railAccent from "../../assets/shared/rail-accent.svg";
import { featuredPost, recentPosts } from "../../config/blog";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";

/** Maroon damask cover art of the featured post (761 × 296 in Figma; zoomed to the card width). */
function FeaturedCover() {
  const [initial, firstLine, secondLine] = featuredPost.coverTitle;

  return (
    <div aria-hidden className="relative h-[296px] w-[761px] shrink-0 overflow-clip select-none scale-to-container [--fit-width:761px]">
      <div className="absolute inset-0 bg-maroon" />
      <div
        className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left mix-blend-darken"
        style={{ backgroundImage: `url(${damaskTile.src})` }}
      />

      {/* Gilt-framed title box (3x export: its fill has its own texture). */}
      <Image
        src={featureFrame}
        alt=""
        sizes="393px"
        className="absolute top-[126.55px] left-[10.7px] h-[156.121px] w-[392.928px] max-w-none"
      />
      <p className="absolute top-[168.11px] left-8 w-[314.238px] font-serif text-[0px] leading-[0] font-extralight tracking-[-2.4552px] text-white">
        <span className="font-script text-[59.11px] leading-[0.9] font-normal tracking-[-2.9555px]">{initial}</span>
        <span className="text-[49.103px] leading-[0.9]">{firstLine}</span>
        <span className="text-[49.103px] leading-[0.9]">{secondLine}</span>
      </p>

      {/*
        Embossed stamp: its leather and guilloché looks are Figma WebGPU shaders,
        so it ships as a 3x export cut out along its rotated outline. The image
        box starts (-13.079, -8.985) from the stamp's own box (shadow bleed).
      */}
      <Image
        src={stamp}
        alt=""
        sizes="121px"
        className="absolute top-[178.118px] left-[611.924px] h-[118px] w-[120.333px] max-w-none"
      />

      <div className="absolute top-[26.1px] left-[31px] h-[15.167px] w-[107.721px]">
        <Image src={crosswordMark} alt="" className="absolute top-0 left-0" />
        <span className="absolute top-[14.47px] left-[26.63px] -translate-y-full font-serif text-[21.483px] leading-[1.3] font-extralight tracking-[-1.0741px] whitespace-nowrap text-white [text-box:trim-both_cap_alphabetic]">
          Crossword
        </span>
      </div>
      <Image src={dot} alt="" className="absolute top-[282.6px] left-[8.32px]" />
      <span className="absolute top-[111.1px] left-8 overflow-clip bg-gold px-1.5 py-1 font-open-sans text-[9.112px] leading-[0.9] font-semibold tracking-[0.0911px] whitespace-nowrap text-[#66012b]">
        {featuredPost.category}
      </span>
    </div>
  );
}

function FeaturedPost() {
  return (
    <article className="relative flex flex-col gap-5 overflow-clip border border-[#ddd] bg-sand pb-6 xs:pb-8 md:gap-6 lg:flex-[0_0_59.4531%] lg:gap-8">
      <div className="@container w-full">
        <FeaturedCover />
      </div>
      <div className="flex w-full items-end justify-between gap-4 px-5 xs:gap-6 xs:px-8">
        <div className="flex max-w-[503.059px] flex-col items-start gap-3 font-light">
          <h3 className="font-serif text-(length:--text-xl-size) leading-[1.1] tracking-[-0.04em] text-[#040404]">
            {featuredPost.title}
          </h3>
          <p className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/80">
            {featuredPost.excerpt}
          </p>
        </div>
        <Link
          href={featuredPost.href}
          aria-label={`Read: ${featuredPost.title}`}
          className="flex shrink-0 items-center border border-[rgba(40,40,40,0.3)] px-2 py-1 transition-colors hover:border-[rgba(40,40,40,0.6)]"
        >
          <Image src={arrowRight} alt="" className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function RecentPosts() {
  return (
    // From 992px the list fills the height beside the featured post, its rows sharing it equally.
    <ul className="flex w-full min-w-0 flex-col lg:flex-1 lg:pl-5">
      {recentPosts.map((post, i) => {
        const last = i === recentPosts.length - 1;
        return (
          <li key={post.href + i} className={cn("flex flex-col lg:flex-1", !last && "border-b border-[#ddd]")}>
            <Link
              href={post.href}
              className="group flex flex-auto flex-col items-start gap-3 px-5 py-6 xs:pt-8 xs:pr-8 xs:pb-8 xs:pl-8 lg:pr-0 lg:pb-2"
            >
              <h3 className="font-serif text-(length:--text-xl-size) leading-[1.1] font-light tracking-[-0.04em] text-[#040404] group-hover:underline">
                {post.title}
              </h3>
              <p className="font-sans text-[14px] leading-5 font-light tracking-[-0.28px] text-black/80">
                {post.excerptLines[0]}
                {/* Figma breaks the excerpt after "your" on desktop; it wraps naturally below. */}
                <br className="max-lg:hidden" />
                {post.excerptLines[1]}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Blog() {
  return (
    <section aria-labelledby="blog-title" className="relative section-pad-band">
      <DividerBand glyph="quill" />
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[122px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-[120px]">
          <div className="flex flex-col items-start gap-5 md:gap-6 lg:gap-8">
            <Eyebrow>Blog</Eyebrow>
            <SectionTitle
              id="blog-title"
              initial="N"
              firstLine={"otes from the "}
              secondLine={<span className="font-light">concierge desk</span>}
              width={370.008}
              variant="notes"
            />
          </div>
          <Link
            href="#blog"
            className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-colors hover:text-black"
          >
            VIEW ALL
            <Image src={arrowRight} alt="" className="size-4" />
          </Link>
        </div>

        <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
          <FeaturedPost />
          <RecentPosts />
        </div>
      </div>
    </section>
  );
}
