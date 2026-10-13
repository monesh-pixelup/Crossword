import { Fragment } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { creditGroups } from "../../config/pricing";

const cell = "border-b border-engraved px-3 py-4 md:px-6 md:py-[22px]";

/**
 * What does a credit cover? Layout/Proof, Comparison table variant (Figma's “Not another chatbot”,
 * the kit's `.wk-cmp`), turned into the doc's rate table: Crimson 22 interactions down the left
 * (40%), the credits column featured (a wine head with a bright gold label over sand cells), and
 * what each covers in Geist beside it, 1px engraved rules between rows. The doc's three groups,
 * “Some things never cost a credit” last, are labelled in olive caps across the table. Below
 * 640px the table scrolls sideways, its first column pinned.
 */
export function Credits() {
  return (
    <section aria-labelledby="credits-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />

      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Credits</Eyebrow>
          <SectionTitle id="credits-title" initial="W" firstLine="hat does a" secondLine="credit cover?" width={380} variant="centered" />
          <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Credits are used to power engagement, whether it&rsquo;s a conversational reply, personalized message, or a
            dynamic landing page. The number of credits depends on the type of interaction.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-1 w-[40%] border-b border-engraved bg-cream">
                  <span className="sr-only">Interaction</span>
                </th>
                <th scope="col" className="w-[20%] border-b border-engraved bg-wine px-6 py-[18px] font-serif text-[14px] leading-none font-medium tracking-[-0.02em] text-gold-bright uppercase">
                  Credits
                </th>
                <th scope="col" className="border-b border-engraved px-6 py-[18px] text-left font-serif text-[14px] leading-none font-medium tracking-[-0.02em] text-ink-soft uppercase">
                  What it covers
                </th>
              </tr>
            </thead>
            <tbody>
              {creditGroups.map((group) => (
                <Fragment key={group.title}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={3}
                      className="border-b border-engraved px-3 pt-10 pb-4 text-left font-open-sans text-[12px] leading-[1.4] font-semibold whitespace-pre-line tracking-[1.44px] text-label-olive uppercase md:px-6"
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => {
                    const free = row.credits === "Free";
                    return (
                      <tr key={row.label}>
                        <th
                          scope="row"
                          className={cn(cell, "sticky left-0 z-1 bg-cream text-left font-serif text-[17px] leading-[1.2] font-normal tracking-[-0.03em] text-ink md:text-[22px]")}
                        >
                          {row.label}
                        </th>
                        <td className={cn(cell, "bg-sand text-center font-serif text-[20px] leading-none tracking-[-0.03em]", free ? "text-forest" : "text-wine")}>
                          {row.credits}
                        </td>
                        <td className={cn(cell, "font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted")}>{row.note}</td>
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <StampButton href={ctaLinks.bookDemo}>BOOK A DEMO</StampButton>
          <TextLink href={ctaLinks.bookDemo}>Talk to sales</TextLink>
        </div>
      </div>
    </section>
  );
}
