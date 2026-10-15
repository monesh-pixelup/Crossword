import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import ring from "../../assets/gap/ring.svg";
import damaskAubergine from "../../assets/personalization/damask-aubergine.webp";
import { StrangerScroll } from "./stranger-scroll";

const title = "font-serif text-[24px] leading-[1.1] font-light tracking-[-0.96px] text-[#040404]";
const body = "max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60";

/** The panel's 10px gold rings, on the corners of a 649 × 551 box centred on it. */
const rings = ["top-[17.5px] left-[19.5px]", "top-[17.5px] right-[18.5px]", "bottom-[17.5px] left-[19.5px]", "right-[18.5px] bottom-[17.5px]"];

/**
 * Figma "Library · Accordion + media" (User-level personalization), scrolling like the home page's
 * Lifecycle section: on the left the eyebrow and a two-line headline (sticky from 992px), then a
 * 520px column of copy that scrolls under it (the problem, a 1px black/50 rule, then two titled
 * blocks split by a 0.5px black/20 rule, 64px apart); on the right a sticky 687 × 586 aubergine
 * panel holding the notched damask with its gold frame and a gold ring in each corner. A 209px gold
 * tick sits on the left rail beside the eyebrow.
 */
export function Personalization() {
  return (
    <section aria-labelledby="stranger-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="content-width">
        <StrangerScroll
          heading={
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>User-level personalization</Eyebrow>
              <SectionTitle id="stranger-title" initial="T" firstLine="he stranger" secondLine="problem" width={553.133} variant="displaySmall" />
            </div>
          }
          items={[
            {
              key: "problem",
              className: "pb-8",
              rule: "h-px bg-black/50",
              content: (
                <p className={body}>
                  A customer who&rsquo;s bought from you three times, has told you their size, and has told you their
                  color preference sees exactly the same product page as someone who arrived ten seconds ago.
                  That&rsquo;s because everything you know stays in a database instead of on the page.
                </p>
              ),
            },
            {
              key: "solution",
              className: "flex flex-col items-start gap-3 py-16",
              rule: "h-[0.5px] bg-black/20",
              content: (
                <>
                  <h3 className={title}>Now you have a solution</h3>
                  <p className={body}>
                    Crossword turns customer understanding into a more personal shopping experience. It brings together
                    what a shopper has told you, what they&rsquo;ve bought before, what they care about and what
                    they&rsquo;re looking for right now, and uses that context to change how your products are presented.
                  </p>
                </>
              ),
            },
            {
              key: "experience",
              className: "flex flex-col items-start gap-3 pt-16",
              content: (
                <>
                  <h3 className={title}>A shopping experience that feels like it was made for them</h3>
                  <p className={body}>
                    The headline speaks to their purpose and the most relevant benefits come first. Reviews focus on the
                    questions they care about, while comparisons reflect their priorities. Size, fit, color and budget
                    are carried through the experience. And recommendations take into account what customers already
                    own.
                  </p>
                </>
              ),
            },
          ]}
          panel={
            <div aria-hidden className="relative aspect-[687/586] w-full overflow-clip bg-aubergine">
              {/* Notched damask with its gold frame (646.64 × 548.28 in Figma), 20.68px in from the left and 18.75px from the top. */}
              <div className="absolute top-[18.75px] right-[19.68px] bottom-[18.97px] left-[20.68px]">
                <Image src={damaskAubergine} alt="" fill sizes="(min-width: 992px) 647px, 94vw" className="object-fill" />
              </div>
              {rings.map((place) => (
                <Image key={place} src={ring} alt="" className={`absolute size-2.5 ${place}`} />
              ))}
            </div>
          }
        />
      </div>
    </section>
  );
}
