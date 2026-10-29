import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/shared/rail-accent.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { DiscoveryTabs } from "./discovery-tabs";

export function ProductDiscovery() {
  return (
    <section aria-labelledby="discovery-title" className="relative section-pad">
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[98px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Product discovery</Eyebrow>
          <SectionTitle
            id="discovery-title"
            initial="C"
            firstLine="rossword helps your customers"
            secondLine="find it however they describe it."
            width={707.715}
            weight="light"
          />
        </div>

        <DiscoveryTabs />
      </div>
    </section>
  );
}
