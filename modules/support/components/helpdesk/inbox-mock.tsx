import { cn } from "@/lib/cn";
import { type InboxStatus, inboxRows } from "../../config/helpdesk";

/** Square status tags on tinted grounds: forest, olive on sand and maroon (never as an error). */
const statusTone: Record<InboxStatus, string> = {
  Active: "bg-forest/10 text-forest",
  Waiting: "bg-sand text-label-olive",
  Escalated: "bg-maroon/10 text-maroon",
};

/**
 * The Crossword helpdesk inbox: the three queues as filters, then assigned conversations. Crossword’s
 * own product UI, so square (guidelines P4); on the damask panel it sits on parchment with a gold
 * hairline (10.4, rule 2).
 */
export function InboxMock() {
  const count = (s: InboxStatus) => inboxRows.filter((r) => r.status === s).length;

  return (
    <div
      aria-hidden
      className="w-full bg-parchment font-sans text-ink shadow-[0_0_0_0.6px_var(--color-gold),0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28)]"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] border-rail px-4 py-3">
        {(["Active", "Waiting", "Escalated"] as const).map((s, i) => (
          <span
            key={s}
            className={cn(
              "px-2.5 py-1.5 text-[12px] leading-none font-medium tracking-[-0.02em]",
              i === 0 ? "bg-wine text-white" : "text-ink-muted shadow-[inset_0_0_0_0.5px_var(--color-engraved)]",
            )}
          >
            {s} {count(s)}
          </span>
        ))}
      </div>
      <ul>
        {inboxRows.map((row) => (
          <li key={row.customer} className="flex items-center gap-3 border-b-[0.5px] border-rail px-4 py-3 last:border-b-0">
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-[14px] leading-none font-medium tracking-[-0.02em]">{row.customer}</span>
              <span className="truncate text-[12px] leading-[1.3] tracking-[-0.03em] text-ink-muted">{row.snippet}</span>
            </span>
            <span className={cn("px-2 py-1 text-[10px] leading-none font-medium tracking-[0.02em]", statusTone[row.status])}>{row.status}</span>
            <span className="flex size-6 shrink-0 items-center justify-center bg-linen text-[9px] font-semibold tracking-[0.04em] text-label-olive">
              {row.owner}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
