"use client";

import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { calculatorDefaults } from "../../config/pricing";

const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const label = "font-sans text-[10px] leading-none font-semibold tracking-[1px] text-label-olive uppercase";
const groupTitle = "font-serif text-[22px] leading-[1.15] tracking-[-0.03em] text-ink";

/** A number field, square on linen, 48px tall, with a maroon focus ring (guidelines 11.13). */
function Field({
  name,
  value,
  onChange,
  suffix,
  prefix,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  prefix?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-soft">{name}</span>
      <span className="flex h-12 items-center gap-2 bg-linen px-4 shadow-[inset_0_0_0_1px_rgba(20,20,20,0.14)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-maroon">
        {prefix && <span className="font-sans text-base text-ink-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent font-sans text-base tracking-[-0.02em] text-ink outline-none placeholder:text-ink-muted [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && <span className="font-sans text-base whitespace-nowrap text-ink-muted">{suffix}</span>}
      </span>
    </label>
  );
}

function Result({ title, value, note }: { title: string; value: ReactNode; note: string }) {
  return (
    <div className="flex flex-col gap-2 bg-cream p-5 shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
      <p className={label}>{title}</p>
      <p className="font-serif text-[40px] leading-none font-extralight tracking-[-0.05em] text-ink">{value}</p>
      <p className="font-sans text-[13px] leading-[1.45] tracking-[-0.02em] text-ink-muted">{note}</p>
    </div>
  );
}

const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * The ROI calculator (content doc). “What will Crossword cost?” works live: site traffic times the
 * chat engagement rate (2% by default) gives conversations, times the replies per conversation
 * (5 by default) gives credits, at the doc's 1 credit for most replies. “What will Crossword
 * generate?” reuses the traffic and, on Calculate now, shows the revenue those numbers imply today
 * and the share from shoppers who chat. TODO: the doc doesn't give the uplift Crossword should
 * project; add it here once the Crossword team supplies the model.
 */
export function RoiCalculator() {
  const [traffic, setTraffic] = useState("");
  const [rate, setRate] = useState(String(calculatorDefaults.engagementRate));
  const [replies, setReplies] = useState(String(calculatorDefaults.repliesPerConversation));
  const [conversion, setConversion] = useState("");
  const [aov, setAov] = useState("");
  const [shown, setShown] = useState(false);

  const conversations = num(traffic) * (num(rate) / 100);
  const credits = conversations * num(replies);
  const revenue = num(traffic) * (num(conversion) / 100) * num(aov);
  const chatRevenue = conversations * (num(conversion) / 100) * num(aov);

  return (
    <div className="flex w-full flex-col bg-stage font-sans text-ink shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28),0_0_0_0.5px_var(--color-rail)]">
      <section aria-labelledby="cost-title" className="flex flex-col gap-5 border-b-[0.5px] border-rail p-6 md:p-8">
        <h3 id="cost-title" className={groupTitle}>
          What will Crossword cost?
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Field name="Monthly site traffic" value={traffic} onChange={setTraffic} suffix="visits" placeholder="100000" />
          <Field name="Chat engagement rate" value={rate} onChange={setRate} suffix="%" />
          <Field name="Replies per conversation" value={replies} onChange={setReplies} />
        </div>
        <div aria-live="polite" className="grid gap-3 md:grid-cols-2">
          <Result title="Your result" value={`${count.format(credits)} credits`} note="A month, at 1 credit for most replies." />
          <Result title="Conversations" value={count.format(conversations)} note="Shoppers who chat with Crossword each month." />
        </div>
      </section>

      <section aria-labelledby="generate-title" className="flex flex-col gap-5 p-6 md:p-8">
        <h3 id="generate-title" className={groupTitle}>
          What will Crossword generate?
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Field name="Site traffic (from above)" value={traffic} onChange={setTraffic} suffix="visits" placeholder="100000" />
          <Field name="Conversion rate" value={conversion} onChange={setConversion} suffix="%" placeholder="2.5" />
          <Field name="Average order value" value={aov} onChange={setAov} prefix="$" placeholder="80" />
        </div>
        <button
          type="button"
          onClick={() => setShown(true)}
          className="relative self-start border border-dashed border-gold bg-maroon px-3 py-2 font-serif text-base leading-[22px] font-medium tracking-[-0.48px] text-gold-bright uppercase transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon active:translate-y-px active:brightness-95"
        >
          Calculate now
        </button>
        <div aria-live="polite" className={cn("grid gap-3 md:grid-cols-2", !shown && "hidden")}>
          <Result title="Online revenue today" value={money.format(revenue)} note="A month, from your traffic, conversion rate, and order value." />
          <Result title="From shoppers who chat" value={money.format(chatRevenue)} note="The share of it that runs through conversations." />
        </div>
      </section>
    </div>
  );
}
