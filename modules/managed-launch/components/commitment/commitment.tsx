import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import flourishBottom from "../../assets/commitment/flourish-bottom.webp";
import flourishTop from "../../assets/commitment/flourish-top.webp";
import paper from "../../assets/commitment/paper-note.webp";
import rule1 from "../../assets/commitment/rule-1.svg";
import rule2 from "../../assets/commitment/rule-2.svg";
import rule3 from "../../assets/commitment/rule-3.svg";
import ruleLeft from "../../assets/commitment/rule-left.svg";
import ruleRight from "../../assets/commitment/rule-right.svg";
import seal from "../../assets/commitment/seal.webp";
import stamp from "../../assets/commitment/stamp.webp";
import { commitments } from "../../config/launch";

/**
 * The two stats' tops on the note (Figma 3810:34381 and 3810:34390). On phones the values drop to 48px, so the second
 * stat moves up 40px to keep the gap between the two close to the desktop note's.
 */
const statTops = ["top-[88px]", "top-[291px] max-md:top-[251px]"];

/**
 * The note, its wax seal and its postage stamp, placed in Figma's composition coordinates (frame 3810:34271).
 * The seal and stamp are WebGPU shader art in Figma, so they ship as 4x exports at their rotated bounds, cut out of
 * the cream, served at twice their drawn size so they stay sharp on high-density screens and as the composition scales.
 */
function Note() {
  return (
    <>
      {/* The paper note: 474 × 484, turned 1.18°, its box 483.9 × 493.692. */}
      <div className="absolute top-[75px] left-[448.73px] flex h-[493.692px] w-[483.9px] items-center justify-center">
        <div className="relative h-[484px] w-[474px] flex-none rotate-[1.18deg] overflow-clip shadow-[0px_5px_7.7px_0px_rgba(0,0,0,0.08)]">
          {/*
            The paper: Figma stacks white/30, the paper texture (multiply, 49%) and a cream colour-blend layer, blending
            through to the page. A browser isolates the turned note and loses that grain, so this is the result baked
            into one image: the cream paper (#faf4e5) with the texture's grain at Figma's measured strength.
          */}
          <Image
            src={paper}
            alt=""
            aria-hidden
            sizes="474px"
            unoptimized
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-bottom"
          />

          <div
            aria-hidden
            className="absolute top-[13.76px] left-1/2 flex w-[435.348px] -translate-x-1/2 items-center justify-between font-hand tracking-[-0.7115px] whitespace-nowrap text-[rgba(18,18,18,0.61)]"
          >
            <p className="rotate-[0.14deg] text-[23.718px] leading-[1.13]">Crossword</p>
            <p className="rotate-[0.14deg] leading-[1.13]">
              <span className="text-[19.72px]">EST </span>
              <span className="text-[23.718px]">.2026</span>
            </p>
          </div>

          <dl>
            {commitments.map((c, i) => (
              <div key={c.label} className={`absolute left-[59px] flex w-[358px] flex-col items-start gap-1 ${statTops[i]}`}>
                <dt>
                  <Eyebrow surface="paper">{c.label}</Eyebrow>
                </dt>
                <dd className="flex items-baseline gap-2 pt-3 whitespace-nowrap">
                  <span className="font-serif text-[70px] leading-[1.1] font-light tracking-[-3.5px] max-md:text-[48px] max-md:leading-[53px] max-md:tracking-[-2.4px] text-ink">{c.value}</span>
                  <span className="font-sans text-[18px] max-md:text-base leading-6 font-medium tracking-[-0.54px] text-ink-muted">{c.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Wax seal (120.387px, turned -14.23°) over the note's left edge. */}
      <Image src={seal} alt="" sizes="241px" className="absolute top-[347px] left-[366px] size-[120.387px] max-w-none" />
      {/* Postage stamp (turned 20.85°) over the note's right edge. */}
      <Image src={stamp} alt="" sizes="195px" className="absolute top-[175.9px] left-[873.66px] h-[95.068px] w-[97.367px] max-w-none" />
    </>
  );
}

/** A 1px hand-drawn hairline (black 7%), as Figma's vectors. */
function Rule({ src, className, vertical }: { src: typeof rule1; className: string; vertical?: boolean }) {
  return vertical ? (
    <div className={`absolute flex w-0 items-center justify-center ${className}`}>
      <Image src={src} alt="" className="h-px max-w-none flex-none rotate-90" style={{ width: src.width }} />
    </div>
  ) : (
    <Image src={src} alt="" className={`absolute h-px max-w-none -translate-y-1/2 ${className}`} />
  );
}

/**
 * Figma "Library · Wide panel" (3810:34213), Managed launch and progress: on the cream page, between its rails, a
 * paper note (turned 1.18°) holding the two commitments, each an engraved eyebrow over a Crimson Light 70 value and its
 * Geist Medium 18 unit, with "Crossword" and "EST .2026" handwritten across its top. A wax seal and a postage stamp
 * overlap its edges; faint hand-drawn hairlines cross behind it and two scroll flourishes sit in the top-right and
 * bottom-left corners. The gold rail accent runs 232px down the left rail from 98px.
 *
 * From 992px the whole 1440 × 619 composition scales to the column; below, the note with its seal and stamp alone
 * (606 × 494) scales to the content width.
 */
export function Commitment() {
  return (
    <section aria-label="Managed launch and progress" className="relative">
      <RailAccent className="absolute top-[98px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      {/* Desktop: the full composition. */}
      <div className="@container w-full max-lg:hidden">
        <div className="relative h-[619px] w-[1440px] overflow-clip scale-to-container [--fit-width:1440px]">
          <div className="absolute top-[-1px] left-9 h-[644px] w-[1368px]">
            <div aria-hidden>
              <Rule src={rule1} className="top-[168.18px] left-[187.2px] w-[936.484px]" />
              <Rule src={rule2} className="top-[328.48px] left-[217.57px] w-[1048.43px]" />
              <Rule src={rule3} className="top-[488.79px] left-[75.54px] w-[920.141px]" />
              <Rule src={ruleLeft} vertical className="top-px left-[306.4px] h-[532.441px]" />
              <Rule src={ruleRight} vertical className="top-[120.81px] left-[1036.97px] h-[494.359px]" />

              {/* Top-right flourish (Figma 3810:34398): a 96.371 × 165.638 window turned 90°, at 80%. */}
              <div className="absolute top-0 left-[1202.69px] flex h-[96.371px] w-[165.638px] items-center justify-center">
                <div className="relative h-[165.638px] w-[96.371px] flex-none rotate-90 overflow-clip opacity-80">
                  <div className="absolute top-[-105.23px] left-[calc(50%-125.49px)] flex h-[571.808px] w-[422.115px] -translate-x-1/2 items-center justify-center mix-blend-luminosity">
                    <Image
                      src={flourishTop}
                      alt=""
                      sizes="535px"
                      className="h-[364.335px] w-[534.216px] max-w-none flex-none rotate-[96.46deg] opacity-52"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom-left flourish (Figma 3810:34400): a 77.97 × 177.599 window, flipped, at 80%. */}
              <div className="absolute top-[470px] left-[9.73px] flex h-[177.599px] w-[77.97px] items-center justify-center">
                <div className="relative h-[177.599px] w-[77.97px] flex-none -scale-y-100 rotate-180 overflow-clip opacity-80">
                  <div className="absolute top-[-60.67px] left-[calc(50%-34.45px)] flex h-[507.965px] w-[426.579px] -translate-x-1/2 items-center justify-center mix-blend-luminosity">
                    <div className="relative h-[323.977px] w-[439.075px] flex-none rotate-75 opacity-52">
                      <Image
                        src={flourishBottom}
                        alt=""
                        sizes="434px"
                        className="absolute top-[5.67%] left-[1.34%] h-[94.33%] w-[98.66%] max-w-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Note />
          </div>
        </div>
      </div>

      {/* Below 992px: the note with its seal and stamp (x 366–972, y 75–569 of the composition). */}
      <div className="py-16 md:py-24 lg:hidden">
        <div className="content-width">
          <div className="mx-auto @container w-full max-w-[606px]">
            <div className="relative h-[494px] w-[606px] scale-to-container [--fit-width:606px]">
              <div className="absolute top-[-75px] left-[-366px]">
                <Note />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
