"use client";

import { useId, useState } from "react";
import { StampAction } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { calculatorDefaults } from "../../config/pricing";

const multiple = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 });

/** Figma's field and result labels: Open Sans SemiBold 12 caps, 1.3 leading, +1.44px. */
const label = "font-open-sans text-[12px] leading-[1.1667] font-semibold tracking-[1.44px] max-md:text-[10px] max-md:leading-3 max-md:tracking-[1.2px] whitespace-nowrap text-label-olive uppercase";

/**
 * A field: an Open Sans caps label (with its unit in brackets) over a 48px cream input on a 1px engraved line, with a
 * maroon focus ring (guidelines 11.13). The unit also sits in the input, muted: a `$` before the number, or a word or
 * `%` after it. Empty, it shows its placeholder (a default, where it has one).
 */
function Field({
  name,
  unit,
  value,
  onChange,
  placeholder,
  className,
}: {
  name: string;
  /** The value's unit: `{ prefix: "$" }` or `{ suffix: "%" }` and the like; `label` overrides the bracketed name. */
  unit: { prefix?: string; suffix?: string; label?: string };
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  const id = useId();
  const unitName = unit.label ?? unit.prefix ?? unit.suffix;
  const adornment = "pointer-events-none absolute top-1/2 -translate-y-1/2 font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted max-md:text-[15px]";
  return (
    <label htmlFor={id} className={cn("flex min-w-0 flex-col gap-2", className)}>
      {/* The unit can make a label long, so it may wrap here (on phones). */}
      <span className={cn(label, "whitespace-normal")}>
        {name}
        {unitName && <span className="normal-case"> ({unitName})</span>}
      </span>
      <span className="relative block">
        {unit.prefix && <span aria-hidden className={cn(adornment, "left-[17px]")}>{unit.prefix}</span>}
        {unit.suffix && <span aria-hidden className={cn(adornment, "right-[17px]")}>{unit.suffix}</span>}
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-12 w-full min-w-0 bg-cream px-[17px] font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink shadow-[inset_0_0_0_1px_var(--color-engraved)] outline-none placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          unit.prefix && "pl-[33px]",
          unit.suffix && (unit.suffix.length > 2 ? "pr-[88px]" : "pr-[40px]"),
        )}
      />
      </span>
    </label>
  );
}

function Result({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-clip">
      <p className={label}>{title}</p>
      <p className="font-serif text-[40px] leading-[1.1] font-extralight tracking-[-0.05em] max-md:text-[28px] max-md:leading-[31px] max-md:tracking-[-1.4px] whitespace-nowrap text-ink">{value}</p>
    </div>
  );
}

/** A positive number from a field, or `fallback` when it is empty or not one. */
const num = (v: string, fallback = 0) => {
  const n = Number(v);
  return v.trim() !== "" && Number.isFinite(n) && n > 0 ? n : fallback;
};

/**
 * The ROI form (Figma 3156:13836): a sand card on a 1px engraved line with studs 7px in, 48px
 * padding and 24px between rows: monthly site traffic and chat engagement rate, average replies per
 * conversation, AOV and conversion rate, then Calculate now and, over a 0.5px rule, the two
 * results (dashes until calculated), the wine ROI panel and a caption (Figma 3564:23117). The engagement rate and replies show the doc's
 * defaults (2% and 5) as placeholders and use them while empty. As the Crossword team gives them:
 *
 * - cost = monthly site traffic × engagement rate × replies per conversation (5) × $0.10
 * - revenue generated = monthly site traffic × AOV × conversion rate × the 3% lift
 * - return on investment = revenue generated ÷ cost
 */
export function RoiCalculator() {
  const [traffic, setTraffic] = useState("");
  const [rate, setRate] = useState("");
  const [replies, setReplies] = useState("");
  const [aov, setAov] = useState("");
  const [conversion, setConversion] = useState("");
  const [shown, setShown] = useState(false);

  const monthlyTraffic = num(traffic);
  const cost =
    monthlyTraffic *
    (num(rate, calculatorDefaults.engagementRate) / 100) *
    num(replies, calculatorDefaults.repliesPerConversation) *
    calculatorDefaults.replyPrice;
  const revenue = monthlyTraffic * num(aov) * (num(conversion) / 100) * calculatorDefaults.revenueLift;
  // Revenue over cost, once both are there to divide.
  const roi = cost > 0 && revenue > 0 ? `${multiple.format(revenue / cost)}x` : "—";

  return (
    <div className="relative flex w-full flex-col gap-6 bg-sand p-7 shadow-[inset_0_0_0_1px_var(--color-engraved)] xs:p-[49px]">
      <Studs inset={7} />

      <div className="relative grid gap-4 sm:grid-cols-2">
        <Field name="Monthly site traffic" unit={{ suffix: "visitors" }} value={traffic} onChange={setTraffic} placeholder="Add your monthly site traffic" />
        <Field name="Chat engagement rate" unit={{ suffix: "%" }} value={rate} onChange={setRate} placeholder={String(calculatorDefaults.engagementRate)} />
      </div>
      <Field
        name="Average replies per conversation"
        unit={{ suffix: "replies" }}
        value={replies}
        onChange={setReplies}
        placeholder={String(calculatorDefaults.repliesPerConversation)}
        className="relative"
      />
      <div className="relative grid gap-4 sm:grid-cols-2">
        <Field name="AOV" unit={{ prefix: "$", label: "USD" }} value={aov} onChange={setAov} placeholder="Add your AOV" />
        <Field name="Conversion rate" unit={{ suffix: "%" }} value={conversion} onChange={setConversion} placeholder="Add your conversion rate" />
      </div>

      <StampAction onClick={() => setShown(true)} className="gap-3 self-start">
        CALCULATE NOW
        <svg aria-hidden viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-[11px] w-[22px]">
          <path d="M0 6h21M15.5.5 21 6l-5.5 5.5" />
        </svg>
      </StampAction>

      <div aria-live="polite" className="relative flex flex-col gap-4 pt-6 shadow-[inset_0_0.5px_0_var(--color-engraved)] sm:flex-row">
        <Result title="Estimated monthly cost" value={shown ? money.format(cost) : "—"} />
        <Result title="Estimated revenue generated" value={shown ? money.format(revenue) : "—"} />
      </div>

      <div className="relative flex items-center justify-between gap-4 bg-[#7d0034] px-5 py-4">
        <div className="flex min-w-0 flex-col gap-1.5 text-[12px]">
          <p className="font-open-sans leading-[1.1667] font-semibold tracking-[1.44px] text-amber uppercase">Return on investment</p>
          <p className="font-sans leading-normal text-cream">Estimated revenue &divide; estimated monthly cost, e.g. 3x</p>
        </div>
        <p className="shrink-0 font-serif text-[40px] leading-[1.1] font-extralight tracking-[-0.05em] max-md:text-[28px] max-md:leading-[31px] max-md:tracking-[-1.4px] whitespace-nowrap text-gold">
          {shown ? roi : "—"}
        </p>
      </div>

      <p className="relative font-sans text-[12px] leading-[1.3] tracking-[-0.03em] text-ink-muted">
        AOV and conversion lift based on Crossword average
      </p>
    </div>
  );
}
