import {
  Blog,
  CtaEnvelope,
  CustomerIntelligence,
  Hero,
  Insights,
  Lifecycle,
  ManagedLaunch,
  PlatformOverview,
  ShopperExperience,
  Testimonials,
  Trust,
} from "@/modules/landing";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";

export default function HomePage() {
  return (
    <main data-no-curtain>
      <Hero />
      <Lifecycle />
      <ShopperExperience />
      <CustomerIntelligence />
      <PlatformOverview />
      <Insights />
      <ManagedLaunch />
      <Trust />
      {/* <Testimonials /> */}
      <Blog />
      {/* The patterned divider band across the top of the envelope section, between the page rails. */}
      <div className="relative h-6 max-md:h-[18px]">
        <DividerBand glyph="chat" />
      </div>
      <CtaEnvelope />
    </main>
  );
}
