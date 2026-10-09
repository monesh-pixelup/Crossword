import { SiteShell } from "@/modules/marketing";

/** Product pages (Sell, …): the header floats over each page's full-bleed hero. */
export default function ProductLayout({ children }: LayoutProps<"/">) {
  return <SiteShell header="overlay">{children}</SiteShell>;
}
