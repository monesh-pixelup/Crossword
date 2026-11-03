import { createContext } from "react";

// Opt-in for the Storybook rebuilds (SellDynamicV2): when true, a visual's
// product-card slots render 01's Storybook ProductCard rail (GiftJourneyV2's
// Rail) instead of the kit's older cards. Defaults to false, so every
// other call site keeps its original cards.
export const StorybookCardSkin = createContext(false);

// Opt-in for the Storybook rebuilds (SellDynamicV2): when the assistant
// opens the conversation, its compact entry widget rests on the default
// composer (with the prompt line) instead of going without one
// (STORYBOOK_MAPPING.md §15, proactive openers).
export const StorybookComposerDefault = createContext(false);
