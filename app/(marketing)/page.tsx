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

export default function HomePage() {
  return (
    <main>
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
      <CtaEnvelope />
    </main>
  );
}
