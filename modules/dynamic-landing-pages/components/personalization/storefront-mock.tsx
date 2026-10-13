import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { type SignalId, shopper } from "../../config/personalization";

/**
 * One part of the mock product page. The part matching the selected signal is lifted (a maroon
 * hairline and a "Personalized" tag); the rest recede, so the eye lands on what changed.
 */
function Slot({ id, active, className, children }: { id: SignalId; active: SignalId; className?: string; children: ReactNode }) {
  const on = id === active;
  return (
    <div
      className={cn(
        "relative rounded-[8px] p-2.5 transition-[opacity,background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none",
        on ? "bg-white shadow-[0_0_0_1px_var(--color-maroon),0_6px_18px_rgba(108,35,50,0.12)]" : "opacity-45",
        className,
      )}
    >
      {on && (
        <span className="absolute -top-2 right-2.5 rounded-full bg-maroon px-2 py-0.5 font-sans text-[10px] leading-[1.4] font-medium tracking-[-0.1px] text-cream">
          Personalized
        </span>
      )}
      {children}
    </div>
  );
}

const label = "font-sans text-[11px] leading-[1.3] font-medium tracking-[-0.2px] text-ink-muted uppercase";

/**
 * A merchant's product page as a returning shopper sees it: a parchment card (12px radius, inset
 * wine glow, as allowed for depictions of third-party UI) laid over the maroon livery.
 */
export function StorefrontMock({ active }: { active: SignalId }) {
  return (
    <div className="relative w-full rounded-[12px] bg-parchment p-4 font-sans text-ink shadow-[inset_0_0_20px_rgba(108,35,50,0.25),0_18px_40px_rgba(14,5,1,0.35)] md:p-5">
      {/* The shopper Crossword recognised. */}
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-rose-line pb-3">
        <span className="flex items-center gap-1.5 text-[13px] leading-[1.3] font-medium tracking-[-0.26px]">
          <span aria-hidden className="size-1.5 rounded-full bg-maroon" />
          Welcome back, {shopper.name}
        </span>
        <span className="text-[12px] leading-[1.3] tracking-[-0.24px] text-ink-muted">{shopper.facts.join(" · ")}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        {/* Product photo stand-in: bone ground with a folded-dress silhouette. */}
        <div aria-hidden className="relative flex min-h-[180px] items-end justify-center overflow-hidden rounded-[8px] bg-bone md:min-h-0">
          <svg viewBox="0 0 120 160" className="h-[85%] w-auto">
            <path d="M48 8h24l4 18 14 10-10 30 12 86H28l12-86-10-30 14-10 4-18Z" fill="#1f2a44" />
            <path d="M48 8c4 8 20 8 24 0M44 26c10 8 22 8 32 0" stroke="#e8dec1" strokeOpacity=".35" fill="none" />
          </svg>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <Slot id="headline" active={active}>
            <p className={label}>Linen wrap dress · $128</p>
            <p className="mt-1 font-serif text-[22px] leading-[1.1] font-light tracking-[-0.66px]">
              The wrap dress for your summer weddings
            </p>
          </Slot>

          <Slot id="benefits" active={active}>
            <ul className="flex flex-wrap gap-1.5">
              {["Breathable linen", "Travels without wrinkling", "Has pockets"].map((b) => (
                <li key={b} className="rounded-full bg-linen px-2.5 py-1 text-[12px] leading-[1.2] tracking-[-0.24px]">
                  {b}
                </li>
              ))}
            </ul>
          </Slot>

          <Slot id="fit" active={active}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] leading-[1.2] tracking-[-0.24px]">
              <span className="flex items-center gap-1">
                {["S", "M", "L"].map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "flex size-6 items-center justify-center rounded-[4px] border",
                      s === "M" ? "border-ink bg-ink text-cream" : "border-black/20",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-4 rounded-full bg-[#1f2a44] ring-1 ring-ink ring-offset-1 ring-offset-parchment" />
                <span className="size-4 rounded-full bg-[#c9a27e]" />
                Navy
              </span>
              <span className="text-success">Within your $150 budget</span>
            </div>
          </Slot>

          <Slot id="reviews" active={active}>
            <p className={label}>From shoppers your size</p>
            <p className="mt-1 text-[12px] leading-[1.4] tracking-[-0.24px] text-black/75">
              &ldquo;True to size in M, and it held up through a long reception.&rdquo;
            </p>
          </Slot>

          <div className="grid gap-2 sm:grid-cols-2">
            <Slot id="compare" active={active}>
              <p className={label}>vs. the slip dress you viewed</p>
              <p className="mt-1 text-[12px] leading-[1.4] tracking-[-0.24px] text-black/75">More breathable, machine washable and $20 less.</p>
            </Slot>
            <Slot id="recs" active={active}>
              <p className={label}>Pairs with what you own</p>
              <p className="mt-1 text-[12px] leading-[1.4] tracking-[-0.24px] text-black/75">The tan sandals you bought in May.</p>
            </Slot>
          </div>

          <span className="mt-1 flex h-9 items-center justify-center rounded-[6px] bg-wine text-[13px] font-medium tracking-[-0.26px] text-white">
            Add to cart · M · Navy
          </span>
        </div>
      </div>
    </div>
  );
}
