import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/components/ui/rail-accent/assets/rail-accent.svg";
import { SectionTitle } from "@/components/ui/section-title";
import { DiscoveryTabs } from "./discovery-tabs";

export function ProductDiscovery() {
  return (
    <section aria-labelledby="discovery-title" className="relative section-pad">
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute max-md:hidden top-[calc(98px+var(--section-shift,0px))] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Product discovery</Eyebrow>
          <SectionTitle
            id="discovery-title"
            initial="C"
            /*
              Below 768px the headline is one flowing sentence (all of it in the first line, the second line empty), so
              it wraps to the screen like running text rather than breaking again after each desktop line.
            */
            firstLine={
              <>
                rossword helps your customers<span className="md:hidden"> find it however they describe it.</span>
              </>
            }
            secondLine={<span className="max-md:hidden">find it however they describe it.</span>}
            width={707.715}
            variant="dynamic"
            weight="light"
          />
        </div>

        <DiscoveryTabs />
      </div>
    </section>
  );
}
