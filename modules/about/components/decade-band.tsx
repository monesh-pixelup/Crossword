import { Rails } from "@/modules/marketing/components/rails";

const stats = [
  { value: "Billions", label: "of messages a year" },
  { value: "160+", label: "countries served" },
  { value: "135,000", label: "apps enabled" },
];

/**
 * Figma "Decade + stats · band" (About us, 4454:33523): between the page rails, 80px down, the sand band edge to edge
 * of the rails (80px over and 53px under its content, 56px in): the 451px decade line (Crimson Light 34/40 at -1.36px,
 * forest then maroon) and, 72px right of it, three 203px stats (Crimson Light 56/60 at -2.8px over Geist 14/24 ink
 * muted, 6px apart) split by 0.625px engraved rules, 28px either side.
 *
 * Below 1280px the line sits over the stats (40px apart); below 768px the stats stack, each under a rule.
 */
export function DecadeBand() {
  return (
    <section aria-label="Crossword in numbers" className="relative bg-cream px-(--frame-inset) py-20 max-md:py-16">
      <Rails />
      <div className="flex flex-col items-start gap-10 bg-sand px-14 pt-20 pb-[53px] max-lg:px-12 max-lg:pt-16 max-lg:pb-14 max-md:px-6 max-md:py-12 xl:flex-row xl:items-center xl:gap-[72px]">
        <p className="max-w-[451px] font-serif text-[34px] leading-10 font-light tracking-[-1.36px] text-forest max-md:text-[28px] max-md:leading-[34px] max-md:tracking-[-1.1px] xl:w-[451px] xl:shrink-0">
          A decade of making conversations work at scale. <span className="text-maroon">Now pointed at ecommerce.</span>
        </p>

        <dl className="grid w-full grid-cols-3 max-md:grid-cols-1 xl:w-[608.379px] xl:shrink-0">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className={
                i === 0
                  ? "flex flex-col pr-7 max-md:pr-0 max-md:pb-6"
                  : "flex flex-col border-l-[0.625px] border-engraved px-7 max-md:border-t-[0.625px] max-md:border-l-0 max-md:px-0 max-md:py-6 max-md:last:pb-0"
              }
            >
              <dt className="order-2 pt-1.5 font-sans text-sm leading-6 tracking-[-0.32px] text-ink-muted">{stat.label}</dt>
              <dd className="order-1 font-serif text-[56px] leading-[60px] font-light tracking-[-2.8px] whitespace-nowrap text-ink max-lg:text-[48px] max-lg:leading-[52px] max-lg:tracking-[-2.4px] max-md:text-[44px] max-md:leading-[48px] max-md:tracking-[-2.2px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
