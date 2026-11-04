// Not in the source package: its files import only these types from the kit's
// CommerceProductCard.tsx (erased by Vite, so the build never needed the file).
// The types as the kit declares them (ProductMetaData's fields inlined), so the
// type check resolves them; nothing here runs.
export interface CommerceProduct {
  id: string;
  brand?: string;
  title: string;
  subtitle?: string;
  price?: string;
  rating?: number;
  ratingCount?: string;
  image?: string;
  imageFit?: "contain" | "cover";
  tag?: string;
}
