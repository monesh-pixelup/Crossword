import Image from "next/image";
import medallion from "@/modules/dynamic-landing-pages/assets/shared/medallion.svg";

/**
 * The page's opening statement, straight under the hero: one centred serif paragraph under a gilt
 * medallion, its closing line picked out in maroon. No layout in Figma matches it; it follows
 * the type scale of the section intros (h5, light, -0.04em).
 */
export function SupportIntro() {
  return (
    <section aria-label="Introduction" className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-8 text-center">
        <Image src={medallion} alt="" className="size-9" />
        <p className="max-w-[920px] font-serif text-(length:--h5-size) leading-[1.25] font-light tracking-[-0.04em] text-ink">
          We&rsquo;re solving that moment when your customer wants to know where their order is, how to return it, or
          whether a policy applies to them, instead of sending them to a queue.{" "}
          <span className="text-maroon">So, say hello to reduced support tickets.</span>
        </p>
      </div>
    </section>
  );
}
