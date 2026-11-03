// Not in the source package: illustrations/BundleBuilding/data.ts imports only
// this type from the kit's CardFeatureStacked.tsx (erased by Vite, so the build
// never needed the file). The shape that data gives it, so the type check
// resolves it; nothing here runs.
export interface CardFeatureStackedData {
  image?: string;
  eyebrow?: string;
  title: string;
  price?: string;
}
