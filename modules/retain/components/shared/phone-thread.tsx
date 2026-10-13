import { cn } from "@/lib/cn";
import type { OutboundMessage } from "../../config/messages";

const text = "font-sans text-[14px] leading-5 tracking-[-0.02em]";

/** The guidelines' soft, warm shadow (site.css `--shadow`), deepened for an object on a dark panel. */
const shadow = "shadow-[0_1px_1px_rgba(0,0,0,0.08),0_18px_40px_-14px_rgba(24,8,36,0.55)]";

/**
 * A message from the brand as the shopper receives it, on their phone. This depicts a third-party
 * messaging app, so it may be rounded (guidelines P4); it keeps Geist and the brand's paper
 * colours: a cream screen, the brand's message on linen, and an attached product on a bone
 * thumbnail. The message settles in each time the card is keyed to a new one.
 */
export function PhoneThread({ message, brand = "Velmora", className }: { message: OutboundMessage; brand?: string; className?: string }) {
  return (
    <div aria-hidden className={cn("w-full max-w-[320px] rounded-[44px] bg-ink p-2.5", shadow, className)}>
      <div className="flex min-h-[400px] flex-col overflow-hidden rounded-[36px] bg-cream font-sans text-ink">
        <div className="flex items-center justify-between px-7 pt-4 text-[12px] leading-none font-semibold tracking-[-0.01em]">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-ink" />
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] bg-ink/80" />
            <span className="h-2 w-4 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(20,20,20,0.8)]" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 border-b-[0.5px] border-rail px-5 pt-5 pb-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-wine font-serif text-[20px] text-cream">
            {brand[0]}
          </span>
          <span className="text-[12px] leading-none font-medium tracking-[-0.02em]">{brand}</span>
        </div>

        <div key={message.text} className="flex flex-1 flex-col gap-2 px-4 pt-5 pb-6">
          <p className="text-center text-[11px] leading-[1.3] tracking-[-0.02em] text-ink-muted">{message.when}</p>
          <div className="flex animate-[dlp-fade_420ms_cubic-bezier(0.22,1,0.36,1)_both] flex-col items-start gap-2 pr-8 motion-reduce:animate-none">
            <p className={cn(text, "rounded-[18px] rounded-bl-[6px] bg-linen px-3.5 py-2.5")}>{message.text}</p>
            {message.attachment && (
              <div className="flex w-full items-center gap-3 rounded-[16px] bg-card p-2 shadow-[inset_0_0_0_0.5px_var(--color-rail)]">
                <span className="size-12 shrink-0 rounded-[10px] bg-bone" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-[13px] leading-[1.2] font-medium tracking-[-0.02em]">{message.attachment.name}</span>
                  <span className="truncate text-[11px] leading-[1.3] tracking-[-0.02em] text-ink-muted">{message.attachment.meta}</span>
                </span>
                {message.attachment.price && (
                  <span className="pr-1 text-[13px] leading-none font-medium tracking-[-0.02em]">{message.attachment.price}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mx-3 mb-4 flex items-center gap-2 rounded-full bg-linen py-1 pr-1 pl-4 shadow-[inset_0_0_0_0.565px_var(--color-rose-line)]">
          <span className="flex-1 text-[13px] text-ink-muted">Message</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-wine">
            <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
