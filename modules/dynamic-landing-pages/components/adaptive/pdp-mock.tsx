import { cn } from "@/lib/cn";
import { type AdaptiveId, pdp } from "../../config/adaptive";

const label = "font-sans text-[11px] leading-[1.3] font-medium tracking-[-0.2px] text-ink-muted uppercase";
const pill = "rounded-full border border-black/15 bg-white px-2.5 py-1 text-[12px] leading-[1.2] tracking-[-0.24px] text-black/75";
const text = "text-[13px] leading-[1.45] tracking-[-0.26px]";

/** The dynamic component Crossword drops into the product page for each feature. */
function Component({ id }: { id: AdaptiveId }) {
  switch (id) {
    case "ask":
      return (
        <div className="flex flex-col gap-3">
          <p className={label}>Ask about this product</p>
          <ul className="flex flex-wrap gap-1.5">
            {pdp.prompts.map((p) => (
              <li key={p} className={pill}>
                {p}
              </li>
            ))}
          </ul>
          <p className={cn(text, "ml-auto max-w-[85%] rounded-[12px] rounded-br-[4px] bg-wine px-3 py-2 text-white")}>{pdp.ask.question}</p>
          <p className={cn(text, "max-w-[92%] rounded-[12px] rounded-bl-[4px] bg-white px-3 py-2 text-black/80")}>{pdp.ask.answer}</p>
        </div>
      );
    case "gist":
      return (
        <div className="flex flex-col gap-2">
          <p className={label}>The gist</p>
          <p className={cn(text, "text-black/80")}>{pdp.gist}</p>
          <span className="w-fit border-b border-black/30 text-[12px] leading-[1.4] font-medium tracking-[-0.24px] text-black/70">Show more</span>
        </div>
      );
    case "direct":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex h-10 items-center gap-2 rounded-[8px] border border-black/15 bg-white px-3">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4 shrink-0 text-black/45">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" strokeLinecap="round" />
            </svg>
            <span className={cn(text, "truncate text-black/85")}>{pdp.direct.question}</span>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {pdp.prompts.slice(1).map((p) => (
              <li key={p} className={pill}>
                {p}
              </li>
            ))}
          </ul>
          <div className="rounded-[8px] bg-white px-3 py-2.5">
            <p className={cn(text, "text-black/80")}>{pdp.direct.answer}</p>
            <p className="mt-1.5 text-[11px] leading-[1.3] tracking-[-0.2px] text-ink-muted">{pdp.direct.source}</p>
          </div>
        </div>
      );
    case "upsell":
      return (
        <div className="flex flex-col gap-2.5">
          <p className={label}>Also consider</p>
          {pdp.alsoConsider.map((item) => (
            <div key={item.name} className="flex items-center gap-3 rounded-[8px] bg-white p-2">
              <span aria-hidden className="size-10 shrink-0 rounded-[6px] bg-bone" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[13px] leading-[1.3] font-medium tracking-[-0.26px] text-black/85">{item.name}</span>
                <span className="truncate text-[11px] leading-[1.3] tracking-[-0.2px] text-ink-muted">{item.note}</span>
              </span>
              <span className="text-[13px] font-medium tracking-[-0.26px] text-black/80">{item.price}</span>
              <span className="rounded-full border border-wine px-2 py-0.5 text-[11px] font-medium text-wine">Add</span>
            </div>
          ))}
        </div>
      );
  }
}

/** A capsule bottle drawn in the stage's palette, standing in for the product photo. */
function Bottle() {
  return (
    <svg aria-hidden viewBox="0 0 120 170" className="h-[78%] w-auto">
      <rect x="38" y="6" width="44" height="22" rx="3" fill="#6c2332" />
      <path d="M30 36c0-5 4-8 9-8h42c5 0 9 3 9 8v118c0 6-4 10-10 10H40c-6 0-10-4-10-10V36Z" fill="#f3e9d4" />
      <rect x="30" y="66" width="60" height="62" fill="#00331a" />
      <path d="M44 84h32M44 92h22" stroke="#e0be60" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 108h32M44 115h26" stroke="#dfe3d2" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A merchant's product page (third-party UI, so white and 12px radii are allowed) with the selected
 * dynamic component in place under the buy box. The component cross-fades as the tabs change.
 */
export function PdpMock({ active }: { active: AdaptiveId }) {
  return (
    <div className="grid w-full max-w-[860px] gap-5 rounded-[12px] bg-cream p-4 font-sans text-ink shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28),0_0_0_0.5px_rgba(0,0,0,0.12)] md:grid-cols-[0.85fr_1.15fr] md:gap-7 md:p-6">
      <div className="flex min-h-[200px] items-center justify-center rounded-[8px] bg-bone md:min-h-[360px]">
        <Bottle />
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className={label}>{pdp.brand}</p>
          <p className="font-serif text-[24px] leading-[1.1] font-light tracking-[-0.72px] md:text-[28px]">{pdp.name}</p>
          <p className="flex items-center gap-2 text-[13px] tracking-[-0.26px] text-black/60">
            <span className="text-[#8a5a14]" aria-hidden>
              ★★★★★
            </span>
            {pdp.rating} · {pdp.reviews}
          </p>
          <p className="text-[18px] font-medium tracking-[-0.36px]">{pdp.price}</p>
        </div>

        <div className="relative rounded-[10px] bg-[#f6efe0] p-3.5 shadow-[0_0_0_1px_var(--color-maroon)]">
          <span className="absolute -top-2 left-3 rounded-full bg-maroon px-2 py-0.5 text-[10px] leading-[1.4] font-medium text-cream">
            Crossword
          </span>
          <div key={active} className="animate-[dlp-fade_300ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none">
            <Component id={active} />
          </div>
        </div>

        <span className="mt-auto flex h-10 items-center justify-center rounded-[6px] bg-wine text-[13px] font-medium tracking-[-0.26px] text-white">
          Add to cart
        </span>
      </div>
    </div>
  );
}
