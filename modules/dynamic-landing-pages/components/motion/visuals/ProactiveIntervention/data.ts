import { catalog } from "../../brands/catalog";

export const marketplace = {
  url: "CRESTLINE.COM/HELMETS/ENDURO-MTB",
  retailer: catalog.crestlineHelmet.brand,
  image: catalog.crestlineHelmet.image,
  thumbnails: [catalog.crestlineHelmet.image],
  title: catalog.crestlineHelmet.title,
  subtitle: "Graphite · Mountain biking",
  price: catalog.crestlineHelmet.price,
  rating: 4,
  ratingCount: "320",
  sizeLabel: "Size",
  sizes: ["Small", "Medium", "Large"],
};

export const widget = {
  brand: marketplace.retailer,
  productReference: catalog.crestlineHelmet,
  message:
    "Still deciding on the fit? I can help you check the sizing and see whether the smaller size is in stock.",
  knockLine: "Between sizes? Want me to check the smaller size?",
  primaryAction: "Check smaller size",
  secondaryAction: "Not now",
};
