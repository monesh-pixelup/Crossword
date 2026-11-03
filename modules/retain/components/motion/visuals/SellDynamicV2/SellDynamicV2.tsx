import { StorybookCardSkin, StorybookComposerDefault } from "../../components/ill/ProductCardSkin";

// Only the source's `Layer`: the Sell: Dynamic visuals this file also exports
// aren't on the Retain page. Its styles (SellDynamicV2.css) are in motion.css.
export function Layer({ children }: { children: React.ReactNode }) {
  return (
    <StorybookCardSkin.Provider value>
      <StorybookComposerDefault.Provider value>
        <div className="sbl">{children}</div>
      </StorybookComposerDefault.Provider>
    </StorybookCardSkin.Provider>
  );
}
