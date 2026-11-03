// Not in the source package: its files import only this type from the kit's
// RecommendationProductCard.tsx (erased by Vite, so the build never needed the
// file). The type as the kit declares it, so the type check resolves it;
// nothing here runs.
export interface RecommendationProduct {
  id: string;
  name: string;
  image?: string;
  brand?: string;
  price?: string;
}
