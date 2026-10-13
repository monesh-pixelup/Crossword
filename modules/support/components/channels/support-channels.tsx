import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { LiveryGround } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { type ChannelIcon, channels } from "../../config/channels";

/** Generic 24px line marks for each channel (not the platforms’ own logos). */
const icons: Record<ChannelIcon, string[]> = {
  web: ["M3.5 5h17v11.5h-17z", "M3.5 8.5h17", "M9 20h6M12 16.5V20"],
  imessage: ["M12 4.5c4.7 0 8.5 3 8.5 6.75S16.7 18 12 18c-.9 0-1.8-.1-2.6-.3L5 19.5l1.3-3.3C4.6 15 3.5 13.2 3.5 11.25 3.5 7.5 7.3 4.5 12 4.5Z"],
  email: ["M3.5 6h17v12h-17z", "m3.5 6.5 8.5 7 8.5-7"],
  whatsapp: ["M12 3.75a8.25 8.25 0 0 0-7.1 12.45L3.75 20.25l4.15-1.1A8.25 8.25 0 1 0 12 3.75Z", "M9.25 8.75c.2 2.7 3.3 5.8 6 6l.75-1.5-1.75-1-1 .75a4 4 0 0 1-2.25-2.25l.75-1-1-1.75Z"],
  instagram: ["M4.5 4.5h15v15h-15z", "M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z", "M16.75 7.25h.01"],
  tiktok: ["M13.5 4v10.5a3.25 3.25 0 1 1-3.25-3.25", "M13.5 4c.4 2.6 2.1 4.2 4.75 4.5"],
  sms: ["M4.5 5h15a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-9l-4.5 3.5v-3.5h-1.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z", "M8.5 11h.01M12 11h.01M15.5 11h.01"],
};

function Glyph({ icon }: { icon: ChannelIcon }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-gold">
      {icons[icon].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/**
 * Layout/Cards, three-card row variant (“Wherever they shop, it’s the same concierge”), set to the
 * web kit (`.wk-c3`): card-ground cards on a 0.5px engraved hairline, each an aubergine damask face
 * (a 1px gold/70 frame 10px in) over a Crimson 24 caption, here one per channel. The face carries the
 * channel’s mark and the question as it arrives there. Seven cards on a four-column grid, web chat
 * taking two columns.
 */
export function SupportChannels() {
  return (
    <section aria-labelledby="channels-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Support channels</Eyebrow>
          <SectionTitle
            id="channels-title"
            initial="W"
            firstLine="herever your customers"
            secondLine="reach out, someone answers"
            width={720}
          />
        </div>

        <ul className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <li key={channel.name} className={cn("flex flex-col bg-card shadow-[inset_0_0_0_0.5px_var(--color-engraved)]", channel.wide && "sm:col-span-2")}>
              <div className="relative isolate flex h-[200px] flex-col justify-between p-6 md:h-[220px]">
                <LiveryGround tone="aubergine" />
                <div aria-hidden className="pointer-events-none absolute inset-2.5 shadow-[inset_0_0_0_1px_rgba(224,190,96,0.7)]" />
                <span className="relative">
                  <Glyph icon={channel.icon} />
                </span>
                <p
                  aria-hidden
                  className="relative ml-auto max-w-[240px] rounded-[13.57px] rounded-br-[4px] bg-cream px-3 py-2 font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.5)]"
                >
                  {channel.message}
                </p>
              </div>
              <h3 className="px-5 pt-5 pb-7 font-serif text-[24px] leading-[1.15] tracking-[-0.04em] text-ink">{channel.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
