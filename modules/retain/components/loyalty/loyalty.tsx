import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { LiveryGround } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { loyaltyCards } from "../../config/loyalty";

const bubble = "font-sans text-[14px] leading-5 tracking-[-0.02em] px-3 py-2.5";

/**
 * Layout/Cards, three-card row variant, set to the web kit (`.wk-c3`, as Support channels): card
 * grounds on a 0.5px engraved hairline, each an aubergine damask face (a 1px gold/70 frame 10px
 * in) over a Crimson 24 title and a line of copy. The face carries the capability's conversation:
 * the shopper in wine, Crossword on cream, as in the chat widget.
 */
export function Loyalty() {
  return (
    <section aria-labelledby="loyalty-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Loyalty &amp; relationship</Eyebrow>
          <SectionTitle id="loyalty-title" initial="R" firstLine="emembered," secondLine="not just recorded" width={500} />
        </div>

        <ul className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loyaltyCards.map((card, i) => (
            <li
              key={card.title}
              className={cn(
                "flex flex-col bg-card shadow-[inset_0_0_0_0.5px_var(--color-engraved)]",
                // Two columns between 768 and 991px: the last card spans both.
                i === loyaltyCards.length - 1 && "md:col-span-2 lg:col-span-1",
              )}
            >
              <div aria-hidden className="relative isolate flex min-h-[300px] flex-col justify-center gap-3 px-6 py-10 md:min-h-[330px] md:px-8">
                <LiveryGround tone="aubergine" />
                <span className="pointer-events-none absolute inset-2.5 shadow-[inset_0_0_0_1px_rgba(224,190,96,0.7)]" />
                {card.thread.map((m, j) =>
                  m.from === "user" ? (
                    <p key={j} className={cn(bubble, "relative ml-auto max-w-[85%] rounded-[13.57px] rounded-br-[4px] bg-wine text-white shadow-[inset_0_0_0_0.5px_rgba(224,190,96,0.4)]")}>
                      {m.text}
                    </p>
                  ) : (
                    <p key={j} className={cn(bubble, "relative mr-auto max-w-[92%] rounded-[13.57px] rounded-bl-[4px] bg-cream text-ink shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.5)]")}>
                      {m.text}
                    </p>
                  ),
                )}
              </div>
              <div className="flex flex-col gap-2.5 px-5 pt-5 pb-7">
                <h3 className="font-serif text-[24px] leading-[1.15] tracking-[-0.04em] text-ink">{card.title}</h3>
                <p className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted">{card.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
