import { cn } from "@/lib/cn";
import { controlCustomer, controlThread } from "../../config/control";

const label = "font-sans text-[10px] leading-none font-semibold tracking-[1px] text-label-olive uppercase";
const text = "font-sans text-[14px] leading-5 tracking-[-0.02em]";

/** The guidelines' soft, warm shadow (site.css `--shadow`). */
const shadow = "shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28),0_0_0_0.5px_var(--color-rail)]";

/**
 * The team’s side of Crossword: the customer’s context on the left, and on the right the private
 * exchange where the person asks the agent for a briefing before they reply. This is Crossword’s
 * own product surface, not a merchant’s, so per the guidelines (P4, 11.13) it stays square: cream
 * and stage grounds, 0.5px rail dividers, Geist throughout and plain square buttons.
 */
export function ConsoleMock() {
  return (
    <div className={cn("grid w-full bg-cream font-sans text-ink md:grid-cols-[0.8fr_1.2fr]", shadow)}>
      <div className="flex flex-col gap-6 border-b-[0.5px] border-rail p-6 md:border-r-[0.5px] md:border-b-0">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center bg-wine font-sans text-[16px] font-medium text-cream">
            M
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[14px] leading-5 font-medium tracking-[-0.02em]">{controlCustomer.name}</p>
            <p className="truncate text-[12px] leading-[1.3] tracking-[-0.03em] text-ink-muted">{controlCustomer.meta}</p>
          </div>
        </div>

        <dl className="flex flex-col">
          {controlCustomer.context.map((row) => (
            <div key={row.label} className="flex flex-col gap-2 border-t-[0.5px] border-rail py-3">
              <dt className={label}>{row.label}</dt>
              <dd className={cn(text, "text-ink-soft")}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-4 bg-stage p-6">
        <p className={cn(label, "flex items-center gap-1.5")}>
          <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3">
            <rect x="3" y="7" width="10" height="7" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          Private to your team
        </p>

        <ol className="flex flex-col gap-3">
          {controlThread.map((m, i) => {
            const mine = m.from === "fromHuman";
            return (
              <li key={i} className={cn("flex flex-col gap-1", mine ? "items-end pl-12" : "items-start pr-6")}>
                <span className={cn(label, "text-ink-muted")}>{mine ? "You" : "Crossword"}</span>
                <p className={cn(text, "px-3 py-2", mine ? "bg-forest text-cream" : "bg-sand text-ink")}>{m.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="bg-wine px-4 py-2.5 text-[12px] leading-none font-medium tracking-[-0.02em] text-white">Draft the response</span>
          <span className="px-4 py-2.5 text-[12px] leading-none font-medium tracking-[-0.02em] text-ink-soft shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
            I&rsquo;ll reply myself
          </span>
        </div>
      </div>
    </div>
  );
}
