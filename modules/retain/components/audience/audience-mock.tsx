import { cn } from "@/lib/cn";
import { audience } from "../../config/audience";

const label = "font-sans text-[10px] leading-none font-semibold tracking-[1px] text-label-olive uppercase";
const text = "font-sans text-[14px] leading-5 tracking-[-0.02em]";

/**
 * The brand's side of Crossword: a plain-language audience request, Crossword's reply with the
 * audience it built (its size and the criteria it read from the request), and the go-ahead.
 * Crossword's own product surface, so square (guidelines P4, 11.13) with the warm shadow, cream
 * and stage grounds, rail dividers and Geist throughout.
 */
export function AudienceMock() {
  return (
    <div className="flex w-full flex-col bg-stage font-sans text-ink shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28),0_0_0_0.5px_var(--color-rail)]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-[0.5px] border-rail bg-cream px-4 py-4 xs:px-6">
        <p className="text-[14px] leading-none font-medium tracking-[-0.02em]">New audience</p>
        <p className={label}>Built from conversations</p>
      </div>

      <ol className="flex flex-col gap-4 p-4 xs:p-6">
        <li className="flex flex-col items-end gap-1 pl-6 xs:pl-12">
          <span className={cn(label, "text-ink-muted")}>You</span>
          <p className={cn(text, "bg-forest px-3 py-2 text-cream")}>{audience.prompt}</p>
        </li>

        <li className="flex flex-col items-start gap-1 xs:pr-6">
          <span className={cn(label, "text-ink-muted")}>Crossword</span>
          <div className="flex w-full min-w-0 flex-col gap-4 bg-cream p-3 shadow-[inset_0_0_0_0.5px_var(--color-engraved)] xs:p-4">
            <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-serif text-[32px] leading-none font-extralight tracking-[-0.05em]">{audience.count.split(" ")[0]}</span>
              <span className="text-[14px] leading-none tracking-[-0.02em] text-ink-muted">{audience.count.split(" ").slice(1).join(" ")}</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {audience.criteria.map((c) => (
                <li
                  key={c.label}
                  className={cn(
                    "flex max-w-full items-start gap-1.5 px-2.5 py-1.5 text-[12px] leading-[1.2] tracking-[-0.02em]",
                    c.kind === "include" ? "bg-sand text-ink-soft" : "text-maroon shadow-[inset_0_0_0_0.5px_rgba(125,0,52,0.4)]",
                  )}
                >
                  <span aria-hidden className="font-medium">{c.kind === "include" ? "+" : "−"}</span>
                  {c.label}
                </li>
              ))}
            </ul>
            <p className={cn(text, "text-ink")}>{audience.reply}</p>
            <div className="flex flex-wrap gap-2">
              <span className="max-w-full bg-wine px-4 py-2.5 text-[12px] leading-[1.2] font-medium tracking-[-0.02em] text-white">Send personalized messages</span>
              <span className="max-w-full px-4 py-2.5 text-[12px] leading-[1.2] font-medium tracking-[-0.02em] text-ink-soft shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
                Edit audience
              </span>
            </div>
          </div>
        </li>

        <li className="flex flex-col items-end gap-1 pl-6 xs:pl-12">
          <span className={cn(label, "text-ink-muted")}>You</span>
          <p className={cn(text, "bg-forest px-3 py-2 text-cream")}>{audience.confirm}</p>
        </li>
      </ol>
    </div>
  );
}
