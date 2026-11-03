import { getBrand } from "../../brands/BrandIdentity";
import { SceneFrame } from "../../components/ill/SceneFrame";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";
import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";
import { ChatHead, ChatFoot, UserMsg, AiMsg, Rail, ProductCard, Followups } from "../GiftJourneyV2/GiftJourneyV2";
import { ImageTile, ProductRow, QuizPlates } from "../GiftJourneyV2/StorybookParts";
import * as discovery from "../ConversationalDiscovery/data";
import * as tryOn from "../TryItOn/data";
import * as qa from "../ProductQA/data";
import * as outfit from "../OutfitBuilding/data";
import * as finder from "../GuidedFinder/data";
import * as visual from "../VisualDiscovery/data";
import * as sizeFit from "../SizeFit/data";
import * as gift from "../GiftFinder/data";

// Sell: Conversational interface 09–16 (product discovery), rebuilt
// against STORYBOOK_MAPPING.md in 01's window (GiftJourneyV2), as 04 and
// 05 were: the originals' bare Shell moves into the same SceneFrame and
// 550x520 window. Per the mapping:
// - the boxed AssistantInsight is dropped (§4.10): each reply already
//   speaks its remembered context;
// - a referenced product is a List View row on the shopper's turn;
// - recommendation and commerce cards both become 01's ProductCard rail;
// - quiz answers are radio plates, the answer picked;
// - brands use the registered identity and supplied marks where available;
// - every AI reply ends on follow-ups that don't predict the next line.
// Copy is the originals' (each scenario's data.ts).

// Follow-ups under each last reply; none predicts a next line (§15).
export const followups = {
  discovery: ["Show me in white", "Under $150", "What shoes go with these?"],
  tryOn: ["Try a different colour", "Find my size", "Add to cart"],
  qa: ["How long does the battery last?", "Compare with the Pro", "Add to cart"],
  outfit: ["Add the whole look", "Something dressier", "Show other shoes"],
  finder: ["Show me a lighter shade", "Is it buildable?", "Add a primer"],
  visual: ["Which bulbs come with it?", "Show floor lamps", "Under $100"],
  sizeFit: ["Add Medium to cart", "How do I measure?", "What if it doesn't fit?"],
  gift: ["Gift wrap it", "Something under $100", "Will it arrive by Friday?"],
};

export const storeName = (brand: string) => getBrand(brand).name;

// Recommendation cards carry a name and image only; in 01's card they
// take the store as the caption and no price or rating.
export const asCards = (items: RecommendationProduct[], brand: string): CommerceProduct[] =>
  items.map(({ id, name, image }) => ({ id, title: name, brand, image, imageFit: "contain" }));

export const contain = (items: CommerceProduct[]): CommerceProduct[] =>
  items.map((p) => ({ ...p, brand: p.brand && storeName(p.brand), imageFit: "contain" }));

function Window({ brand, children }: { brand: string; children: React.ReactNode }) {
  return (
    <SceneFrame>
      <div className="gj2-win">
        <ChatHead brand={storeName(brand)} />
        <div className="gj2-transcript">{children}</div>
        <ChatFoot />
      </div>
    </SceneFrame>
  );
}

export function ConversationalDiscoveryV2() {
  const { script, products } = discovery;
  return (
    <Window brand={script.brand}>
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.assistantMessage} />
      <Rail products={asCards(products, storeName(script.brand))} />
      <Followups items={followups.discovery} />
    </Window>
  );
}

export function TryItOnV2() {
  const { script, media, referencedProduct } = tryOn;
  return (
    <Window brand={script.brand}>
      <ProductRow image={media.dressReference} title={referencedProduct.title} meta={storeName(referencedProduct.brand)} />
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.assistantOffer} />
      <ImageTile src={media.shopperUpload} alt="Photo uploaded by the shopper" className="pd2-upload" />
      <AiMsg text={script.assistantResult} />
      <ImageTile src={media.tryonResult} alt="Personalised try-on result" from="ai" />
      <Followups items={followups.tryOn} />
    </Window>
  );
}

export function ProductQAV2() {
  const { script, product } = qa;
  return (
    <Window brand={script.brand}>
      <ProductRow image={product.image} title={product.title} meta={`${storeName(product.brand)} · ${product.price} · ★${product.rating}`} />
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.assistantMessage} />
      <Followups items={followups.qa} />
    </Window>
  );
}

export function OutfitBuildingV2() {
  const { script, anchor, coordinates } = outfit;
  return (
    <Window brand={script.brand}>
      <ProductRow image={anchor.image} title={anchor.title} meta={storeName(anchor.brand)} />
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.assistantMessage} />
      <Rail products={asCards(coordinates, storeName(script.brand))} />
      <Followups items={followups.outfit} />
    </Window>
  );
}

export function GuidedFinderV2() {
  const { script, answers, product } = finder;
  return (
    <Window brand={script.brand}>
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.framing} />
      <QuizPlates questions={answers} className="pd2-quiz" />
      <AiMsg text={script.resultMessage} />
      <div className="gj2-rail pd2-single">
        <ProductCard product={contain([product])[0]} />
      </div>
      <Followups items={followups.finder} />
    </Window>
  );
}

export function VisualDiscoveryV2() {
  const { script, uploadedImage, matches } = visual;
  return (
    <Window brand={script.brand}>
      <ImageTile src={uploadedImage.src} alt={uploadedImage.alt} className="pd2-upload" />
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.assistantMessage} />
      <Rail products={asCards(matches, storeName(script.brand))} />
      <Followups items={followups.visual} />
    </Window>
  );
}

export function SizeFitV2() {
  const { script, product } = sizeFit;
  return (
    <Window brand={script.brand}>
      <ProductRow image={product.image} title={product.title} meta={`${storeName(product.brand)} · ${product.price} · ★${product.rating}`} />
      <UserMsg text={script.userMessage} />
      <p className="gj2-msg gj2-msg--ai">
        You&apos;re between sizes, but based on the head measurement you provided, I&apos;d
        recommend <strong>Medium</strong>. It&apos;s also the better choice if you prefer a
        snug fit, which you&apos;ve selected before.
      </p>
      <Followups items={followups.sizeFit} />
    </Window>
  );
}

export function GiftFinderV2() {
  const { script, gifts } = gift;
  return (
    <Window brand={script.brand}>
      <UserMsg text={script.userMessage} />
      <AiMsg text={script.assistantMessage} />
      <Rail products={contain(gifts)} />
      <Followups items={followups.gift} />
    </Window>
  );
}
