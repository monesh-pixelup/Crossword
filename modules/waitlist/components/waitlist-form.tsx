"use client";

import { useId, useState, type FormEvent } from "react";
import { StampAction } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { waitlist } from "../config/waitlist";

/** Open Sans SemiBold 12 caps, as the pricing calculator's field labels. */
const label =
  "font-open-sans text-[12px] leading-[1.1667] font-semibold tracking-[1.44px] max-md:text-[10px] max-md:leading-3 max-md:tracking-[1.2px] text-label-olive uppercase";
const input =
  "h-12 w-full min-w-0 bg-cream px-[17px] font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink shadow-[inset_0_0_0_1px_var(--color-engraved)] outline-none placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon";

function Field({ name, type, autoComplete }: { name: keyof typeof waitlist.fields; type: string; autoComplete: string }) {
  const id = useId();
  const field = waitlist.fields[name];
  return (
    <label htmlFor={id} className="flex min-w-0 flex-col gap-2">
      <span className={label}>{field.label}</span>
      <input
        id={id}
        name={name}
        type={type}
        required
        maxLength={200}
        autoComplete={autoComplete}
        placeholder={field.placeholder}
        className={input}
      />
    </label>
  );
}

type Status = "idle" | "sending" | "done" | "error";

/** The waitlist form: name, work email and store URL, sent to /api/waitlist, which emails them to the team. */
export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-label="Join the waitlist" className="relative bg-cream">
      <div className="content-width pt-10 pb-16 lg:pb-[86px]">
        <div className="flex max-w-[640px] flex-col gap-8 bg-sand px-7 py-[33px] shadow-[inset_0_0_0_1px_var(--color-engraved)] xs:px-[41px]">
          {status === "done" ? (
            <div role="status" className="flex flex-col gap-2">
              <h2 className="font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.04em] text-ink">{waitlist.thanks.title}</h2>
              <p className="font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] text-ink-muted">{waitlist.thanks.body}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-start gap-2">
                <p className={label}>{waitlist.eyebrow}</p>
                <p className="font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-pretty text-ink-muted">
                  {waitlist.intro}
                </p>
              </div>
              <form onSubmit={submit} className="flex flex-col gap-5">
                <Field name="name" type="text" autoComplete="name" />
                <Field name="email" type="email" autoComplete="email" />
                <Field name="storeUrl" type="text" autoComplete="url" />
                {/* Left empty by people; bots that fill every field are dropped by the API. */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                {status === "error" && (
                  <p role="alert" className="font-sans text-[14px] leading-[1.43] text-maroon">
                    {waitlist.error}
                  </p>
                )}
                <div>
                  <StampAction type="submit" variant="primary" disabled={status === "sending"} className={cn(status === "sending" && "opacity-60")}>
                    {status === "sending" ? waitlist.sending : waitlist.submit}
                  </StampAction>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
