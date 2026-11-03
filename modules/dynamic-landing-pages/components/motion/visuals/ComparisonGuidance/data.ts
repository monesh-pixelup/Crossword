import { catalog } from "../../brands/catalog";

export interface FoundationProduct {
  brand: string;
  title: string;
  price: string;
  attributeLabel: string;
  attributeValue: string;
  image: string;
  widgetImage: string;
}

export const foundations = [
  { ...catalog.lumenSecondSkin, attributeLabel: "Finish", attributeValue: "Dewy · Fawn", widgetImage: catalog.lumenSecondSkin.image },
  { ...catalog.lumenSkinVeil, attributeLabel: "Finish", attributeValue: "Dewy · Warm Beige", widgetImage: catalog.lumenSkinVeil.image },
  { ...catalog.lumenTrueMatch, attributeLabel: "Finish", attributeValue: "Matte · Honey", widgetImage: catalog.lumenTrueMatch.image },
] satisfies FoundationProduct[];

export const marketplace = {
  url: "LUMEN.COM/FOUNDATION/SECOND-SKIN",
  retailer: catalog.lumenSecondSkin.brand,
  image: catalog.lumenSecondSkin.image,
  thumbnails: [catalog.lumenSecondSkin.image],
  title: foundations[0].title,
  subtitle: "Dewy Finish, Fawn",
  price: foundations[0].price,
  rating: 4.3,
  ratingCount: "286",
};

export const widget = {
  brand: marketplace.retailer,
  message: "Having trouble picking one? I can narrow these down based on your finish, coverage, undertone, and budget.",
  primaryAction: "Narrow it down",
};
