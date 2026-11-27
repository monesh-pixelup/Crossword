import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/components/ui/rail-accent";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/cn";
import { Rails } from "@/modules/marketing/components/rails";

/** A timeline node: a square turned 45°, in its fill on a gold (or olive) hairline, ringed by 5px of sand. */
const nodes = {
  /** 22px, the opening and the solution (31.1px across once turned). */
  large: { size: 22, center: 25 },
  /** 16px, the turn (22.6px across). */
  medium: { size: 16, center: 20 },
  /** 10px, the supporting beats (14.1px across). */
  small: { size: 10, center: 13 },
} as const;

const tones = {
  forest: "bg-forest border-gold",
  maroon: "bg-maroon border-gold",
  /** The turn: parchment on an olive hairline. */
  parchment: "bg-parchment border-label-olive",
} as const;

type Beat = { node: keyof typeof nodes; tone: keyof typeof tones; gap: number; children: ReactNode };

/**
 * The story's beats in order, each with its node and the space under it (Figma's 72px after the larger lines, 64px
 * after the smaller ones).
 */
const beats: Beat[] = [
  {
    node: "large",
    tone: "forest",
    gap: 72,
    children: (
      <p className="font-serif text-[40px] leading-[48px] font-light tracking-[-1.6px] text-forest max-lg:text-[34px] max-lg:leading-[42px] max-md:text-[28px] max-md:leading-[34px] max-md:tracking-[-1.1px]">
        The journey began with a website full of people who couldn&rsquo;t talk to each other. Years later, the team is
        building something that makes sure no brand is left out of the conversation.
      </p>
    ),
  },
  {
    node: "small",
    tone: "forest",
    gap: 64,
    children: (
      <p className="font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
        At inception, we realized that businesses had difficulty building and scaling the infrastructure for their users to
        interact with each other. Seeing the gap we built a user-to-user chat product called CometChat. Today it carries
        billions of messages a year across 160+ countries.
      </p>
    ),
  },
  {
    node: "medium",
    tone: "parchment",
    gap: 72,
    children: (
      <p className="font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
        Then AI changed what people expected from software. With the emergence of AI shopping, including growing use of
        personal agents and AI assistants, it became clear to us that brands were losing control in the changing AI
        landscape and that they need a brand agent in their corner. After years of providing chat infrastructure, we were
        uniquely positioned to build this agent.
      </p>
    ),
  },
  {
    node: "large",
    tone: "maroon",
    gap: 72,
    children: (
      // The 60px heading at its h2 size per breakpoint (--h2-scale), after its 82px swash: one line 97px tall, as Figma.
      <h3 className="font-serif text-[length:calc(60px*var(--h2-scale))] leading-[calc(54px*var(--h2-scale))] font-light tracking-[calc(-3px*var(--h2-scale))] text-balance text-maroon">
        <span className="font-script text-[length:calc(82px*var(--h2-scale))] leading-[calc(97px*var(--h2-scale))] font-normal tracking-normal">
          C
        </span>
        rossword AI is that solution.
      </h3>
    ),
  },
  {
    node: "small",
    tone: "maroon",
    gap: 64,
    children: (
      <p className="font-serif text-[22px] leading-[31px] font-light tracking-[-0.66px] text-ink-soft max-md:text-[20px] max-md:leading-[28px] max-md:tracking-[-0.6px]">
        It listens, answers, remembers your customers, and walks them to the right product the way the best person in the
        store would &mdash; on every screen your customers shop from, including their personal agents.
      </p>
    ),
  },
];

/**
 * Figma "Story section" (About us, 4454:31991): on the cream between the page rails (a 232px gold tick on the left one),
 * the Story eyebrow 24px over the one-line swash headline, then 64px under it the timeline: a gold rail (75%) run from
 * the first beat's node to the last's, 427px in, each beat's copy 64px right of it in a 697px column (760px at most),
 * its node centred on the rail beside the copy's first line.
 *
 * Narrower, the rail moves in with the column (a third of it, 427px at 1280px), and below 1024px it sits at the
 * column's left edge with the copy 40px right of it (28px below 768px).
 */
export function Story() {
  return (
    <section aria-labelledby="about-story-title" className="relative section-pad bg-cream">
      <Rails />
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="relative content-width">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Story</Eyebrow>
          <SectionTitle id="about-story-title" initial="H" firstLine="ow we got here" width={410} variant="compact" weight="light" />
        </div>

        <ol className="relative mt-16 flex flex-col lg:pl-[calc(100%*427/1280)]">
          {beats.map((beat, i) => {
            const node = nodes[beat.node];
            const next = beats[i + 1];
            // Turned 45°, the node's box is its size × √2 across; its centre sits on the rail, `center` down the beat.
            const across = node.size * Math.SQRT2;
            return (
              <li key={i} className="relative" style={{ paddingBottom: i < beats.length - 1 ? beat.gap : 0 }}>
                {/* The rail, from this node's centre to the next one's (75% gold, 1px). */}
                {next && (
                  <span
                    aria-hidden
                    className="absolute left-[11px] w-px -translate-x-1/2 bg-gold/75 lg:left-0"
                    style={{ top: node.center, bottom: -nodes[next.node].center }}
                  />
                )}
                <span
                  aria-hidden
                  className="absolute left-[11px] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:left-0"
                  style={{ top: node.center, width: across, height: across }}
                >
                  <span
                    className={cn("rotate-45 border-[0.625px] border-solid shadow-[0_0_0_5px_var(--color-sand)]", tones[beat.tone])}
                    style={{ width: node.size, height: node.size }}
                  />
                </span>
                <div className="max-w-[760px] pl-[52px] max-md:pl-10 lg:pl-16">{beat.children}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
