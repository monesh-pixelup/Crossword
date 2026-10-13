import { cn } from "@/lib/cn";
import type { ChatMessage, ChatRole } from "../../config/chat";

const text = "font-sans text-[14px] leading-[1.45] tracking-[-0.02em]";
const tag = "font-sans text-[10px] leading-none font-semibold tracking-[1px] uppercase";

/** Sender labels, shown when a thread has more than the shopper and the agent in it. */
const labels: Record<Exclude<ChatRole, "user">, string> = {
  crossword: "Crossword",
  human: "Your team",
  toHuman: "Crossword · to your team",
  fromHuman: "Your team · to Crossword",
  brand: "Your team",
};

/** A small padlock: private notes the shopper never sees. */
function Lock() {
  return (
    <svg aria-hidden viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" className="size-2.5">
      <rect x="2.5" y="5.25" width="7" height="5.25" rx="0.75" />
      <path d="M4 5.25V3.75a2 2 0 0 1 4 0v1.5" />
    </svg>
  );
}

function Bubble({ message, labelled }: { message: ChatMessage; labelled: boolean }) {
  const { from } = message;

  if (from === "user" || from === "brand") {
    return (
      <div className="flex flex-col items-end gap-1.5 pl-8 md:pl-12">
        {from === "brand" && <span className={cn(tag, "text-label-olive")}>{labels.brand}</span>}
        <p className={cn(text, "rounded-[13.57px] rounded-br-[4px] bg-wine px-3 py-2.5 text-white")}>{message.text}</p>
      </div>
    );
  }

  const isPrivate = from === "toHuman" || from === "fromHuman";
  return (
    <div className={cn("flex flex-col gap-1.5", from === "fromHuman" ? "items-end pl-8 md:pl-12" : "items-start pr-8 md:pr-12")}>
      {(labelled || isPrivate) && (
        <span className={cn(tag, "flex items-center gap-1", from === "human" ? "text-forest" : "text-label-olive")}>
          {isPrivate && <Lock />}
          {labels[from]}
        </span>
      )}
      <p
        className={cn(
          text,
          "rounded-[13.57px] px-3 py-2.5",
          from === "crossword" && "rounded-bl-[4px] bg-sand text-ink",
          from === "human" && "rounded-bl-[4px] bg-forest text-cream",
          // Private notes: dashed gold, so they read as off the record.
          isPrivate && "border border-dashed border-gold bg-parchment text-ink-soft",
          from === "toHuman" && "rounded-bl-[4px]",
          from === "fromHuman" && "rounded-br-[4px]",
        )}
      >
        {message.text}
      </p>
    </div>
  );
}

type ChatThreadProps = {
  messages: ChatMessage[];
  /** Header pill; the store the shopper is talking to. */
  title?: string;
  /** Header status on the right (e.g. “Team joined”). */
  status?: string;
  /** Label every non-shopper message with its sender. */
  labelled?: boolean;
  /** Keeps the card a steady height while threads of different lengths swap in. */
  minHeight?: string;
  className?: string;
};

/**
 * A conversation in the shopper assistant (ivory card, gold hairline, as in the landing chat
 * window). Messages fade in one after another whenever the card is keyed to a new thread.
 */
export function ChatThread({ messages, title = "Velmora", status, labelled = false, minHeight, className }: ChatThreadProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-5 rounded-[12.701px] bg-cream p-4 shadow-[0px_0px_18.989px_0px_rgba(224,190,96,0.4),0px_4.234px_8.679px_0px_rgba(0,0,0,0.25)] md:p-[22.616px]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-rose-line" />
          <span className="size-2 rounded-full bg-rose-line" />
        </span>
        <p className="rounded-full bg-cream px-3 py-1 font-sans text-[12px] leading-[normal] tracking-[0.12px] whitespace-nowrap text-ink uppercase shadow-[inset_0_0_0_0.565px_rgba(0,0,0,0.08)]">
          {title}
        </p>
        <span className="flex min-w-4 items-center justify-end gap-1.5 font-sans text-[11px] leading-none tracking-[-0.1px] whitespace-nowrap text-forest">
          {status && (
            <>
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              {status}
            </>
          )}
        </span>
      </div>

      <ol className="flex flex-col gap-4" style={{ minHeight }}>
        {messages.map((message, i) => (
          <li
            key={i}
            className="animate-[dlp-fade_420ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <Bubble message={message} labelled={labelled} />
          </li>
        ))}
      </ol>

      <div aria-hidden className="flex items-center gap-2 rounded-full bg-linen py-1 pr-1 pl-4 shadow-[inset_0_0_0_0.565px_var(--color-rose-line)]">
        <span className={cn(text, "flex-1 truncate text-ink-muted")}>Type a message</span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-wine shadow-[inset_0_0_0_0.737px_#ffb657]">
          <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="size-4">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
        </span>
      </div>

      <div aria-hidden className="pointer-events-none absolute -inset-[2px] rounded-[14.701px] border-2 border-gold" />
    </div>
  );
}
