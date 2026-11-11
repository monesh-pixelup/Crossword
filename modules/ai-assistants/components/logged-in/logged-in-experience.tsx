import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { type LoggedInQuote, loggedInQuotes } from "../../config/logged-in";
import { QuoteAccordion } from "./quote-accordion";
import { QuoteTabs } from "./quote-tabs";

/**
 * Figma "Section · Logged in experience" (node 3305:906): on the left the eyebrow, a two-line headline (82px swash at
 * 1.18, Crimson Light 60 at 1.1) and a 520px line of Geist, 18px apart, over the customer quotes; on the right the
 * aubergine damask panel (see QuoteTabs). A 209px gold tick sits on the left rail beside the eyebrow. Personal
 * agents (3308:447) passes its own eyebrow, headline, copy and quotes.
 *
 * `layout="accordion"` (AI Assistants) uses the new "Library · Accordion + media" layout, as Sell's Conversion
 * assistance: the eyebrow, headline and copy across the top, then 80px below them the quotes as an accordion in a
 * 520px column beside the 687 × 586 panel. The default keeps the scroll-driven list beside a sticky panel.
 */
export function LoggedInExperience({
  id = "logged-in-title",
  eyebrow = "Logged in experience",
  initial = "C",
  firstLine = "rossword knows",
  secondLine = "who’s asking",
  copy = (
    <>
      Customers sign in once and can interact directly with your brand and their account. It&rsquo;s secure and personal,
      in the space customers are most comfortable with today, AI platforms.
    </>
  ),
  quotes = loggedInQuotes,
  layout = "scroll",
  copyWidth,
}: {
  id?: string;
  eyebrow?: ReactNode;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  copy?: ReactNode;
  quotes?: LoggedInQuote[];
  layout?: "scroll" | "accordion";
  /** The copy's max width in px where Figma sets its own (Personal Agents: 539.027). */
  copyWidth?: number;
}) {
  const heading = (
    <div className="flex flex-col items-start gap-[18px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} width={553.133} variant="dynamic" weight="light" />
      {/* Figma 3305:909: the accordion layout's copy runs the heading's full 725px column. */}
      <p
        className={cn("font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted max-md:mt-2", layout === "accordion" ? "max-w-[725px]" : "max-w-[520px]")}
        style={copyWidth ? { maxWidth: copyWidth } : undefined}
      >
        {copy}
      </p>
    </div>
  );

  if (layout === "accordion") {
    return (
      <section aria-labelledby={id} className="relative section-pad">
        <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

        <div className="flex content-width flex-col items-start gap-section">
          {heading}
          <QuoteAccordion quotes={quotes} />
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="content-width">
        <QuoteTabs heading={heading} quotes={quotes} />
      </div>
    </section>
  );
}
