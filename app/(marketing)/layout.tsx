import { SiteShell } from "@/modules/marketing";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
