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
    // The home page's sections start 88px down (not 120px) from 992px: see `section-top-88` in globals.css.
    <main className="section-top-88">
      <Hero />
      <Lifecycle />
      <ShopperExperience />
      <CustomerIntelligence />
      <PlatformOverview />
      <Insights />
      <ManagedLaunch />
      <Trust />
      <Testimonials />
      <Blog />
      {/*
        The patterned divider band across the top of the envelope section, between the page rails. Raised over the
        sections (z-2; the hero curtain puts each on layer 1 with a cream ground), so its stamp, which overhangs the
        band, isn't cut off by the envelope section below it.
      */}
      <div className="relative z-2 h-6 max-md:h-[18px]">
        <DividerBand glyph="chat" />
      </div>
      <CtaEnvelope />
    </main>
  );
}
