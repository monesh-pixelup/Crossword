import { useRef, useState, type ReactNode } from "react";
import {
  BrandMark,
  BrandWordmark,
  brandStyle,
  getBrand,
} from "../brands/BrandIdentity";
import { ColorContext, type ColorVariant } from "../brands/ColorContext";
import { Button } from "../components/ill/Button";
import { storefronts, type StorefrontId, type StoreProduct } from "./data";
function Wordmark({ id }: { id: StorefrontId }) {
  return (
    <span className="sf-wordmark">
      <BrandMark brand={id} />
      <span className="sf-wordmark__text">{getBrand(id).name}</span>
    </span>
  );
}

function Plate({
  product,
  className = "",
}: {
  product: StoreProduct;
  className?: string;
}) {
  return (
    <div className={`sf-plate ${className}`} data-product-id={product.id}>
      <img
        src={product.image}
        alt={`${product.brand} ${product.title}${product.color ? `, ${product.color}` : ""}`}
        loading="lazy"
      />
    </div>
  );
}
function Label({ children }: { children: ReactNode }) {
  return <p className="sf-eyebrow">{children}</p>;
}
function Intro({ id, children }: { id: StorefrontId; children?: ReactNode }) {
  const data = storefronts[id];
  return (
    <div className="sf-intro">
      <Label>{data.eyebrow}</Label>
      <h1>{data.headline}</h1>
      <p>{data.description}</p>
      {children}
    </div>
  );
}
function ProductTile({
  product,
  onSelect,
}: {
  product: StoreProduct;
  onSelect: (product: StoreProduct) => void;
}) {
  return (
    <article className="sf-product">
      <button
        className="sf-product__image"
        onClick={() => onSelect(product)}
        aria-label={`View ${product.title}`}
      >
        <Plate product={product} />
      </button>
      <div className="sf-product__caption">
        <h3>
          <button onClick={() => onSelect(product)}>{product.title}</button>
        </h3>
        <span>{product.price}</span>
      </div>
      <p>{product.detail}</p>
    </article>
  );
}
function Bundle({
  products,
  title,
  onBundle,
}: {
  products: StoreProduct[];
  title: string;
  onBundle: (products: StoreProduct[]) => void;
}) {
  return (
    <section className="sf-bundle">
      <div className="sf-bundle__art">
        {products.map((p, index) => (
          <Plate key={`${p.id}-${index}`} product={p} />
        ))}
      </div>
      <div>
        <Label>Build your routine</Label>
        <h2>{title}</h2>
        <p>{products.map((p) => p.title).join(" · ")}</p>
        <Button
          appearance="secondary"
          label={`Add the routine · $${products.reduce((sum, p) => sum + Number(p.price.replace(/[$,]/g, "")), 0).toFixed(2)}`}
          onClick={() => onBundle(products)}
        />
      </div>
    </section>
  );
}
function Routine({ items }: { items: [string, string][] }) {
  return (
    <section className="sf-routine">
      {items.map(([title, text], i) => (
        <div key={title}>
          <Label>0{i + 1}</Label>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </section>
  );
}
type LayoutProps = {
  onSelect: (product: StoreProduct) => void;
  onBundle: (products: StoreProduct[]) => void;
};
function Goodwell({ onSelect, onBundle }: LayoutProps) {
  const p = storefronts.goodwell.products;
  return (
    <>
      <StoreHero id="goodwell" className="sf-hero">
        <Intro id="goodwell">
          <Button
            appearance="primary"
            label="Find your daily good"
            onClick={() => onSelect(p[0])}
          />
          <p className="sf-proof">
            Daily Sleep Gummies · ★ 4.8 · 2,140 reviews
          </p>
        </Intro>
        <div className="sf-goodwell__jars">
          <Plate product={p[0]} />
          <Plate product={p[2]} />
        </div>
      </StoreHero>
      <div className="sf-benefits">
        <span>Sleep & wind down</span>
        <span>Energy for your day</span>
        <span>Space to focus</span>
      </div>
      <Bundle
        products={[p[2], p[0]]}
        title="From good mornings to easier evenings."
        onBundle={onBundle}
      />
      <Routine
        items={[
          ["Find your focus", "Choose the benefit that fits your day."],
          ["Keep it simple", "One small habit in your everyday routine."],
          ["Make it yours", "Start with one jar or build a day-to-night pair."],
        ]}
      />
    </>
  );
}
function Sorelle({ onSelect }: LayoutProps) {
  const p = storefronts["sorelle-labs"].products;
  return (
    <>
      <StoreHero id="sorelle-labs">
        <Intro id="sorelle-labs">
          <button className="sf-text-link" onClick={() => onSelect(p[0])}>
            Discover your serum ↗
          </button>
        </Intro>
        <div className="sf-sorelle__diptych">
          <ProductTile product={p[0]} onSelect={onSelect} />
          <ProductTile product={p[1]} onSelect={onSelect} />
        </div>
      </StoreHero>
      <section className="sf-regimen">
        <Label>A considered regimen</Label>
        <h2>Start with what your skin needs.</h2>
        <Routine
          items={[
            ["Hydrate", "Daily Hydrating Serum for your everyday routine."],
            [
              "Keep it gentle",
              "Calming Serum for simple, fragrance-free care.",
            ],
            [
              "Know your formula",
              "Explore the product details before choosing your serum.",
            ],
          ]}
        />
      </section>
      <section className="sf-ingredients">
        <div>
          <Label>Formula notes</Label>
          <h2>Know what goes into your routine.</h2>
          <p>
            Start with the formula and the way you want to care for your skin.
          </p>
        </div>
        <div>
          <details>
            <summary>Vitamin C care</summary>
            <p>
              The Vitamin C Serum is part of the same Sorelle collection. Review
              its product label for the complete ingredient list.
            </p>
            <button className="sf-text-link" onClick={() => onSelect(p[2])}>
              Explore Vitamin C Serum ↗
            </button>
          </details>
          <details>
            <summary>Fragrance-free calming care</summary>
            <p>
              The Calming Serum is fragrance-free, with the simpler formula used
              in our sensitive-skin routine.
            </p>
            <button className="sf-text-link" onClick={() => onSelect(p[1])}>
              Explore Calming Serum ↗
            </button>
          </details>
          <details>
            <summary>Build a simple regimen</summary>
            <p>
              Compare your serum with the Deep Hydration Cream or the complete
              hydration set.
            </p>
            <button className="sf-text-link" onClick={() => onSelect(p[6])}>
              Explore the hydration set ↗
            </button>
          </details>
        </div>
      </section>
    </>
  );
}
function Aurelle({ onSelect }: LayoutProps) {
  const p = storefronts.aurelle.products;
  return (
    <>
      <StoreHero id="aurelle">
        <div className="sf-aurelle__hero">
          <Plate product={p[0]} />
          <span>The teardrop edit · {p[0].price}</span>
        </div>
        <Intro id="aurelle">
          <Button
            appearance="primary"
            label="Discover the collection"
            onClick={() => onSelect(p[0])}
          />
          <div className="sf-aurelle__detail">
            <Plate product={p[6]} />
            <p>
              Small details.
              <br />A lasting impression.
            </p>
          </div>
        </Intro>
      </StoreHero>
      <section className="sf-gift-edit">
        <div>
          <Label>Thoughtfully given</Label>
          <h2>A little something, just for them.</h2>
          <p>Pendants, bracelets and keepsakes under $150.</p>
        </div>
        <div className="sf-gift-edit__products">
          {p.slice(1, 3).map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </div>
      </section>
    </>
  );
}
function Amber({ onSelect }: LayoutProps) {
  const [room, setRoom] = useState("Living room");
  const products = storefronts["amber-and-oak"].products;
  const roomProducts = {
    "Living room": [products[0], products[1]],
    Bedroom: [products[3]],
    "Reading corner": [products[0], products[2]],
  };
  const selected = roomProducts[room as keyof typeof roomProducts];
  return (
    <>
      <StoreHero id="amber-and-oak">
        <div
          className="sf-room sf-room--furniture"
          aria-label="Illustrated living room with canonical furniture and lighting"
        >
          <div className="sf-room__window" />
          <div className="sf-room__frame" />
          <div className="sf-room__rug" />
          <img
            className="sf-room__chair"
            src={products[0].image}
            alt={products[0].title}
          />
          <img
            className="sf-room__lamp"
            src={products[1].image}
            alt={products[1].title}
          />
          <span className="sf-room__caption">
            Natural oak. Soft linen. A little warmth.
          </span>
        </div>
        <Intro id="amber-and-oak">
          <Button
            appearance="primary"
            label="Meet the lounge chair"
            onClick={() => onSelect(products[0])}
          />
          <p className="sf-proof">
            Furniture, lighting and the spaces in between.
          </p>
        </Intro>
      </StoreHero>
      <section id="sf-room-edits" className="sf-rooms">
        <div className="sf-section-heading">
          <div>
            <Label>Room by room</Label>
            <h2>Make space for living.</h2>
          </div>
          <div className="sf-tabs" aria-label="Browse by room">
            {Object.keys(roomProducts).map((name) => (
              <button
                key={name}
                aria-pressed={room === name}
                onClick={() => setRoom(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="sf-room-edit">
          <div className="sf-room-edit__products">
            {selected.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                onSelect={onSelect}
              />
            ))}
          </div>
          <div>
            <Label>{room}</Label>
            <h2>
              Considered pieces.
              <br />A familiar feeling.
            </h2>
            <p>
              Start with natural texture, add a softer light. A small edit can
              make a room your own.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
function Dusklight({ onSelect }: LayoutProps) {
  return (
    <>
      <section className="sf-dusk-intro">
        <Intro id="dusklight" />
        <p className="sf-dusk-index">
          LIGHTING SYSTEMS
          <br />
          COLLECTION 01—02
        </p>
      </section>
      <div className="sf-dusk-families">
        {storefronts.dusklight.products.map((product, index) => (
          <section className="sf-dusk-family" key={product.id}>
            <div>
              <Label>
                0{index + 1} / {product.collection}
              </Label>
              <h2>{product.title}</h2>
              <p>{product.detail}</p>
              <dl>
                <div>
                  <dt>Finish</dt>
                  <dd>Graphite</dd>
                </div>
                <div>
                  <dt>Installation</dt>
                  <dd>{index === 0 ? "Desktop" : "Ceiling mounted"}</dd>
                </div>
                <div>
                  <dt>Family</dt>
                  <dd>{index === 0 ? "Arc" : "Linear"}</dd>
                </div>
              </dl>
              <button
                className="sf-text-link"
                onClick={() => onSelect(product)}
              >
                View specifications · {product.price} ↗
              </button>
            </div>
            <Plate product={product} />
            <small>Product illustration · demo specifications</small>
          </section>
        ))}
      </div>
    </>
  );
}
function Crestline({ onSelect }: LayoutProps) {
  const p = storefronts.crestline.products[0];
  return (
    <>
      <StoreHero id="crestline">
        <Intro id="crestline">
          <Button
            appearance="primary"
            label="Explore the Enduro helmet"
            onClick={() => onSelect(p)}
          />
        </Intro>
        <Plate product={p} />
        <div className="sf-crestline__stamp">
          <strong>ENDURO</strong>
          <span>MTB / GRAPHITE</span>
        </div>
      </StoreHero>
      <section className="sf-equipment">
        <Label>Your ride. Your equipment.</Label>
        <div className="sf-equipment__entries">
          <button onClick={() => onSelect(p)}>
            <span>01</span>
            <h2>Helmets</h2>
            <p>Start with the Enduro MTB.</p>
            <span aria-hidden="true">↗</span>
          </button>
          <button onClick={() => onSelect(p)}>
            <span>02</span>
            <h2>Find your fit</h2>
            <p>Measure first. Choose your size.</p>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
      <Routine
        items={[
          ["Ride-ready", "A graphite finish for your everyday kit."],
          ["Fit matters", "Measure around your head before choosing a size."],
          [
            "The right details",
            "Review the manufacturer's fit and safety information before riding.",
          ],
        ]}
      />
    </>
  );
}
function Brewhaus({ onSelect }: LayoutProps) {
  const p = storefronts.brewhaus.products;
  return (
    <>
      <StoreHero id="brewhaus">
        <div className="sf-brewhaus__title">
          <Intro id="brewhaus" />
          <Label>Tools for the ritual</Label>
        </div>
        <div className="sf-brewhaus__machine">
          <Plate product={p[0]} />
          <div>
            <h2>{p[0].title}</h2>
            <span>{p[0].price}</span>
          </div>
          <Button
            appearance="primary"
            label="Meet your machine"
            onClick={() => onSelect(p[0])}
          />
        </div>
        <aside>
          <Label>Complete your setup</Label>
          <Plate product={p[1]} />
          <h2>The home barista kit</h2>
          <p>{p[1].detail}</p>
          <button className="sf-text-link" onClick={() => onSelect(p[1])}>
            Explore the kit · {p[1].price} ↗
          </button>
        </aside>
      </StoreHero>
      <section id="sf-brew-guides" className="sf-guides">
        <Label>The brew journal</Label>
        <h2>Good coffee is a practice.</h2>
        <div>
          {[
            [
              "01",
              "Start with the grind",
              "A consistent grind helps you repeat the cup you enjoy.",
            ],
            [
              "02",
              "Build your espresso routine",
              "Use fresh beans, weigh your dose and follow your machine's guide.",
            ],
            [
              "03",
              "Care for your equipment",
              "Clean after each brew and follow the manufacturer's maintenance schedule.",
            ],
          ].map(([n, title, text]) => (
            <details key={n}>
              <summary>
                <span>{n}</span>
                <h3>{title}</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{text}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
function Specifications({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="sf-specifications">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function StoreHero({
  id,
  children,
  className = "",
}: {
  id: StorefrontId;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`sf-composition sf-composition--${storefronts[id].archetype} sf-${id === "sorelle-labs" ? "sorelle" : id === "amber-and-oak" ? "amber" : id} ${className}`}
    >
      {children}
    </section>
  );
}
function Trailwell({ onSelect }: LayoutProps) {
  const packs = storefronts.trailwell.products;
  const [active, setActive] = useState(0);
  return (
    <>
      <StoreHero id="trailwell">
        <div className="sf-trailwell__story">
          <Intro id="trailwell" />
          <div className="sf-trailwell__selector" aria-label="Choose a pack">
            {packs.map((pack, i) => (
              <button
                key={pack.id}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                <strong>{pack.title}</strong>
                <small>{pack.size}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="sf-trailwell__pack">
          <Plate product={packs[active]} />
          <div className="sf-feature-caption">
            <div>
              <Label>
                {packs[active].color} / {packs[active].size}
              </Label>
              <h2>{packs[active].title}</h2>
            </div>
            <Button
              appearance="primary"
              label={`Explore pack · ${packs[active].price}`}
              onClick={() => onSelect(packs[active])}
            />
          </div>
        </div>
      </StoreHero>
      <section id="sf-pack-comparison" className="sf-comparison-section">
        <div className="sf-section-heading">
          <div>
            <Label>Carry what you need</Label>
            <h2>Find the pack for your plans.</h2>
          </div>
          <p>Compare the details that change the way you pack.</p>
        </div>
        <div className="sf-pack-comparison">
          {packs.map((pack) => (
            <article key={pack.id}>
              <Label>{pack.size}</Label>
              <h3>{pack.title}</h3>
              <Specifications rows={pack.specs!} />
              <button className="sf-text-link" onClick={() => onSelect(pack)}>
                View {pack.title} · {pack.price} ↗
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
function Aura({ onSelect }: LayoutProps) {
  const p = storefronts.aura.products[0];
  return (
    <>
      <StoreHero id="aura">
        <Intro id="aura">
          <Button
            appearance="primary"
            label={`Explore wireless earbuds · ${p.price}`}
            onClick={() => onSelect(p)}
          />
        </Intro>
        <div className="sf-aura__stage">
          <span className="sf-aura__ring" aria-hidden="true" />
          <Plate product={p} />
          <Label>Wireless earbuds / Ivory</Label>
        </div>
        <div className="sf-aura__details">
          <Label>The essentials</Label>
          <Specifications rows={p.specs!} />
        </div>
      </StoreHero>
      <section id="sf-aura-specifications" className="sf-aura-specs">
        <div>
          <Label>Know what you’re choosing</Label>
          <h2>
            Small format.
            <br />
            Everyday convenience.
          </h2>
        </div>
        <Routine
          items={[
            [
              "In your ears",
              "A compact in-ear format for your everyday listening.",
            ],
            [
              "In your pocket",
              "The matching charging case keeps the pair together.",
            ],
            ["In the details", "An ivory finish across the earbuds and case."],
          ]}
        />
      </section>
    </>
  );
}
function Stride({ onSelect }: LayoutProps) {
  const p = storefronts.stride.products;
  const [active, setActive] = useState(0);
  return (
    <>
      <StoreHero id="stride">
        <div className="sf-stride__top">
          <Intro id="stride" />
          <span className="sf-stride__index">
            EVERYDAY ROTATION
            <br />0{active + 1} / 03
          </span>
        </div>
        <div className="sf-stride__showcase">
          <div className="sf-stride__categories" aria-label="Footwear styles">
            {p.slice(0, 3).map((shoe, i) => (
              <button
                key={shoe.id}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                {shoe.collection}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <Plate product={p[active]} />
          <div className="sf-stride__product">
            <Label>{p[active].color}</Label>
            <h2>{p[active].title}</h2>
            <p>{p[active].detail}</p>
            <Button
              appearance="primary"
              label={`Choose your size · ${p[active].price}`}
              onClick={() => onSelect(p[active])}
            />
          </div>
        </div>
      </StoreHero>
      <section id="sf-fit-guide" className="sf-fit-guide">
        <div>
          <Label>A better starting point</Label>
          <h2>Your fit, considered.</h2>
          <p>
            Choose a size in the product details. Take a moment to measure
            before deciding.
          </p>
        </div>
        <Routine
          items={[
            [
              "Measure",
              "Stand on a sheet of paper and mark heel to longest toe.",
            ],
            [
              "Compare",
              "Use your usual size as a starting point and review the product’s size information.",
            ],
            [
              "Choose",
              "Select a US size for your pair. These demos do not determine a personalized fit.",
            ],
          ]}
        />
      </section>
    </>
  );
}
function Marais({ onSelect }: LayoutProps) {
  const p = storefronts.marais.products;
  const edits = [
    {
      name: "The linen edit",
      product: p[0],
      note: "Easy shapes for days without plans.",
    },
    {
      name: "The cotton edit",
      product: p[1],
      note: "A relaxed shirt. A new way to wear the everyday.",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <>
      <StoreHero id="marais">
        <div className="sf-marais__heading">
          <Label>COLLECTION / 01</Label>
          <Intro id="marais" />
        </div>
        <div className="sf-marais__spread">
          <div className="sf-marais__cover">
            <Plate product={edits[active].product} />
            <div>
              <Label>{edits[active].name}</Label>
              <h2>{edits[active].note}</h2>
              <button
                className="sf-text-link"
                onClick={() => onSelect(edits[active].product)}
              >
                Discover the piece ↗
              </button>
            </div>
          </div>
          <aside>
            <div
              className="sf-tabs"
              aria-label="Choose an editorial collection"
            >
              {edits.map((edit, i) => (
                <button
                  key={edit.name}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  {edit.name}
                </button>
              ))}
            </div>
            <ProductTile product={p[4]} onSelect={onSelect} />
            <p className="sf-editorial-note">
              Clothing to wear, rewear and make your own. Start with a fabric.
              Build from there.
            </p>
          </aside>
        </div>
      </StoreHero>
      <section className="sf-marais-pair">
        <div>
          <Label>Wear it together</Label>
          <h2>The everyday pairing.</h2>
          <p>
            A relaxed cotton shirt and straight-leg tailoring. Two familiar
            pieces, one considered outfit.
          </p>
        </div>
        <div className="sf-marais-pair__products">
          {[p[1], p[5]].map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </div>
      </section>
    </>
  );
}
function Proteinmax({ onSelect, onBundle }: LayoutProps) {
  const p = storefronts.proteinmax.products[0];
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <StoreHero id="proteinmax">
        <div className="sf-proteinmax__intro">
          <Intro id="proteinmax" />
          <Specifications rows={p.specs!} />
        </div>
        <div className="sf-proteinmax__tub">
          <Plate product={p} />
          <span className="sf-proteinmax__flavor">DOUBLE RICH CHOCOLATE</span>
        </div>
        <div className="sf-proteinmax__supply">
          <Label>Choose your supply</Label>
          <h2>Keep your cupboard ready.</h2>
          <div className="sf-supply-options" aria-label="Protein supply">
            {[1, 2].map((count) => (
              <button
                key={count}
                aria-pressed={quantity === count}
                onClick={() => setQuantity(count)}
              >
                <strong>{count === 1 ? "Single tub" : "Two-tub supply"}</strong>
                <span>
                  ${(Number(p.price.replace(/[$,]/g, "")) * count).toFixed(2)}
                </span>
                <small>
                  {count === 1
                    ? "Start with one"
                    : "The same protein, twice the supply"}
                </small>
              </button>
            ))}
          </div>
          <Button
            appearance="primary"
            label={`Add ${quantity === 1 ? "one tub" : "two tubs"} · $${(Number(p.price.replace(/[$,]/g, "")) * quantity).toFixed(2)}`}
            onClick={() => onBundle(Array.from({ length: quantity }, () => p))}
          />
          <button className="sf-text-link" onClick={() => onSelect(p)}>
            Read the product details ↗
          </button>
        </div>
      </StoreHero>
      <section id="sf-nutrition-bundle">
        <Bundle
          products={[p, p]}
          title="A simple restock. Two tubs, one order."
          onBundle={onBundle}
        />
      </section>
      <Routine
        items={[
          [
            "Know your product",
            "Double Rich Chocolate whey protein in the same canonical tub.",
          ],
          [
            "Build your routine",
            "Pick a single tub or restock with a two-tub supply.",
          ],
          [
            "Read the label",
            "Check the ingredient, allergen and serving information on the pack before use.",
          ],
        ]}
      />
    </>
  );
}

const layouts = {
  goodwell: Goodwell,
  "sorelle-labs": Sorelle,
  aurelle: Aurelle,
  "amber-and-oak": Amber,
  dusklight: Dusklight,
  crestline: Crestline,
  brewhaus: Brewhaus,
  trailwell: Trailwell,
  aura: Aura,
  stride: Stride,
  marais: Marais,
  proteinmax: Proteinmax,
};

const initialTasks = [
  {
    id: "catalog",
    title: "Review product information",
    text: "3 products need ingredient or sizing details.",
    module: "Catalog",
  },
  {
    id: "conversations",
    title: "Pick up a conversation",
    text: "2 shoppers are waiting for a merchant reply.",
    module: "Conversations",
  },
  {
    id: "workflows",
    title: "Check your welcome workflow",
    text: "Your draft is ready for a final review.",
    module: "Workflows",
  },
];
function Workspace() {
  const [tab, setTab] = useState("Overview");
  const [done, setDone] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="sf-workspace">
      <aside>
        <Label>Merchant tools</Label>
        {storefronts.aurelia.categories.map((name) => (
          <button
            key={name}
            aria-current={tab === name ? "page" : undefined}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
        <small>Demo workspace</small>
      </aside>
      <div className="sf-workspace__main">
        <Intro id="aurelia" />
        <div className="sf-metrics">
          {[
            ["Catalog", "24", "Products connected"],
            ["Conversations", "8", "Active today"],
            ["Workflows", "3", "Ready to review"],
          ].map(([label, count, text]) => (
            <button key={label} onClick={() => setTab(label)}>
              <Label>{label}</Label>
              <strong>{count}</strong>
              <span>{text}</span>
            </button>
          ))}
        </div>
        <div className="sf-section-heading">
          <h2>{tab === "Overview" ? "Next up" : tab}</h2>
          <span>Sample data</span>
        </div>
        <div className="sf-task-list">
          {initialTasks
            .filter((task) => tab === "Overview" || task.module === tab)
            .map((task) => (
              <article key={task.id}>
                <div>
                  <Label>{task.module}</Label>
                  <h3>{task.title}</h3>
                  <p>{task.text}</p>
                  {selected === task.id && (
                    <div className="sf-task-detail">
                      <p>
                        {task.id === "catalog"
                          ? "Add product descriptions, then review their preview before publishing."
                          : task.id === "conversations"
                            ? "Review the shopper’s question and product context before replying."
                            : "Welcome message draft: Help shoppers find the right product with a short introduction."}
                      </p>
                      <Button
                        appearance="secondary"
                        label={
                          done.includes(task.id) ? "Reviewed" : "Mark reviewed"
                        }
                        onClick={() =>
                          setDone([...new Set([...done, task.id])])
                        }
                      />
                    </div>
                  )}
                </div>
                <button
                  className="sf-text-link"
                  onClick={() =>
                    setSelected(selected === task.id ? null : task.id)
                  }
                >
                  {done.includes(task.id)
                    ? "Reviewed ✓"
                    : selected === task.id
                      ? "Close"
                      : "Review ↗"}
                </button>
              </article>
            ))}
        </div>
        <div className="sf-workspace__note">
          <BrandMark brand="Aurelia" />
          <p>
            Your catalog gives Crossword the context to answer product
            questions. Keep it up to date.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BrandStorefront({
  brandId,
  color,
}: {
  brandId: StorefrontId;
  color?: ColorVariant;
}) {
  const data = storefronts[brandId];
  const brand = getBrand(brandId);
  const [filter, setFilter] = useState(data.categories[0]);
  const [query, setQuery] = useState("");
  const [bag, setBag] = useState<StoreProduct[]>([]);
  const [selected, setSelected] = useState<StoreProduct | null>(null);
  const [size, setSize] = useState("");
  const [panel, setPanel] = useState<"product" | "bag" | "assistant" | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const collection = useRef<HTMLElement>(null);
  const show = (
    panel: "product" | "bag" | "assistant",
    product?: StoreProduct,
  ) => {
    setPanel(panel);
    if (product) {
      setSelected(product);
      setSize(product.size ?? product.sizes?.[0] ?? "M");
    }
    dialog.current?.showModal();
  };
  const jumpTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  const select = (product: StoreProduct) => show("product", product);
  const products = data.products.filter(
    (p) =>
      (filter === data.categories[0] ||
        p.collection === filter ||
        filter === "Fit guide") &&
      `${p.title} ${p.collection} ${p.detail}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const Layout = brandId === "aurelia" ? null : layouts[brandId];
  return (
    <ColorContext variant={color}>
      <div className="sf-viewport">
        <div
          className={`sf-store sf-store--${brandId}`}
          style={brandStyle(brand.name)}
          data-storefront={brandId}
          data-archetype={data.archetype}
        >
          <a className="sf-skip" href="#sf-content">
            Skip to content
          </a>
          <div className="sf-announcement">
            {brandId === "aurelia"
              ? "Aurelia merchant workspace · Sample data"
              : brandId === "aurelle"
                ? "A thoughtful gift starts with a little detail."
                : `${data.label} · The ${brand.name} collection`}
          </div>
          <header className="sf-header">
            <a
              className="sf-home"
              href={`?brand=${brandId}`}
              aria-label={`${brand.name} home`}
              onClick={(event) => {
                event.preventDefault();
                setFilter(data.categories[0]);
                setQuery("");
                window.scrollTo({ top: 0 });
              }}
            >
              <Wordmark id={brandId} />
            </a>
            {brandId !== "aurelia" && (
              <>
                <nav aria-label="Store navigation">
                  {data.categories.slice(0, 4).map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        if (name === "Room edits") {
                          jumpTo("sf-room-edits");
                        } else if (name === "Compare packs") {
                          jumpTo("sf-pack-comparison");
                        } else if (name === "Specifications") {
                          jumpTo("sf-aura-specifications");
                        } else if (name === "Bundles") {
                          jumpTo("sf-nutrition-bundle");
                        } else if (name === "Brew guides") {
                          document
                            .getElementById("sf-brew-guides")
                            ?.scrollIntoView({ block: "start" });
                        } else if (name === "Fit guide") {
                          if (brandId === "stride") jumpTo("sf-fit-guide");
                          else select(data.products[0]);
                        } else {
                          setFilter(name);
                          collection.current?.scrollIntoView({
                            block: "start",
                          });
                        }
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </nav>
                <button className="sf-bag-button" onClick={() => show("bag")}>
                  Bag <span>{bag.length}</span>
                </button>
              </>
            )}
          </header>
          <main id="sf-content">
            {brandId === "aurelia" ? (
              <Workspace />
            ) : (
              <>
                {Layout && (
                  <Layout
                    onSelect={select}
                    onBundle={(products) => {
                      setBag([...bag, ...products]);
                      show("bag");
                    }}
                  />
                )}
                <section className="sf-catalog" ref={collection}>
                  <div className="sf-section-heading">
                    <div>
                      <Label>
                        {brandId === "dusklight"
                          ? "The product index"
                          : "Find your everyday essential"}
                      </Label>
                      <h2>
                        {brandId === "aurelle"
                          ? "The jewellery edit"
                          : "Explore the collection"}
                      </h2>
                    </div>
                    <label className="sf-search">
                      <span>Search products</span>
                      <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={`Search ${brand.name}`}
                      />
                    </label>
                  </div>
                  <div className="sf-tabs" aria-label="Filter collection">
                    {data.categories
                      .filter(
                        (name) =>
                          ![
                            "Brew guides",
                            "Fit guide",
                            "Room edits",
                            "Compare packs",
                            "Specifications",
                            "Bundles",
                          ].includes(name),
                      )
                      .map((name) => (
                        <button
                          key={name}
                          aria-pressed={filter === name}
                          onClick={() => setFilter(name)}
                        >
                          {name}
                        </button>
                      ))}
                  </div>
                  <div className="sf-product-grid">
                    {products.map((product) => (
                      <ProductTile
                        key={product.id}
                        product={product}
                        onSelect={select}
                      />
                    ))}
                  </div>
                  {products.length === 0 && (
                    <div className="sf-empty">
                      <h3>No matching products</h3>
                      <p>
                        Try a different search or browse the whole collection.
                      </p>
                      <Button
                        appearance="secondary"
                        label="Show all products"
                        onClick={() => {
                          setQuery("");
                          setFilter(data.categories[0]);
                        }}
                      />
                    </div>
                  )}
                </section>
              </>
            )}
          </main>
          <footer className="sf-footer">
            <BrandWordmark brand={brand.name} />
            <p>
              {brandId === "aurelia"
                ? "Your business, considered."
                : data.description}
            </p>
            <span>Crossword demo collection</span>
          </footer>
          {brandId !== "aurelia" && (
            <button
              className="sf-assistant-launcher"
              onClick={() => show("assistant")}
            >
              <BrandMark brand={brand.name} />
              <span>Explore with Crossword</span>
            </button>
          )}
          <dialog
            ref={dialog}
            className={`sf-dialog sf-dialog--${brandId}`}
            aria-label={`${brand.name} ${panel ?? "product"}`}
            onClose={() => setPanel(null)}
            onClick={(event) => {
              if (event.target === dialog.current) dialog.current.close();
            }}
          >
            <div className="sf-dialog__header">
              <BrandWordmark brand={brand.name} />
              <button
                onClick={() => dialog.current?.close()}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            {panel === "product" && selected && (
              <div className="sf-pdp">
                <Plate product={selected} />
                <div>
                  <Label>{selected.collection}</Label>
                  <h2>{selected.title}</h2>
                  <p>{selected.detail}</p>
                  <strong className="sf-price">{selected.price}</strong>
                  {selected.specs && <Specifications rows={selected.specs} />}
                  {(selected.sizes || selected.brandId === "crestline") && (
                    <fieldset>
                      <legend>
                        {selected.brandId === "crestline"
                          ? "Helmet size"
                          : selected.brandId === "stride"
                            ? "US shoe size"
                            : "Size"}
                      </legend>
                      {(selected.sizes ?? ["S", "M", "L"]).map((s) => (
                        <label key={s}>
                          <input
                            type="radio"
                            name="product-size"
                            checked={size === s}
                            onChange={() => setSize(s)}
                          />
                          {s}
                        </label>
                      ))}
                    </fieldset>
                  )}
                  <Button
                    appearance="primary"
                    label={`Add to bag · ${selected.price}`}
                    onClick={() => {
                      setBag([
                        ...bag,
                        {
                          ...selected,
                          size:
                            selected.sizes || selected.brandId === "crestline"
                              ? size
                              : selected.size,
                        },
                      ]);
                      setPanel("bag");
                    }}
                  />
                  <details>
                    <summary>Product details</summary>
                    <p>
                      {selected.detail}.{" "}
                      {selected.size ? `Size: ${selected.size}.` : ""}{" "}
                      {selected.brandId === "dusklight"
                        ? "Illustrated product placeholder; specifications are demo data."
                        : ""}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {["crestline", "stride", "marais"].includes(
                        selected.brandId,
                      )
                        ? "Finding your fit"
                        : "Care & use"}
                    </summary>
                    <p>
                      {selected.brandId === "crestline"
                        ? "Measure around the widest part of your head. Check the manufacturer's size chart and safety instructions; letter sizes alone do not establish a safe fit."
                        : selected.fitNote
                          ? selected.fitNote
                          : ["goodwell", "proteinmax", "sorelle-labs"].includes(
                                selected.brandId,
                              )
                            ? "Read the product label, ingredients and directions before use."
                            : "Follow the care instructions supplied with your product."}
                    </p>
                  </details>
                </div>
              </div>
            )}
            {panel === "bag" && (
              <div className="sf-bag">
                <Label>Your selection</Label>
                <h2>Your bag ({bag.length})</h2>
                {bag.length ? (
                  <>
                    {bag.map((p, index) => (
                      <article key={`${p.id}-${index}`}>
                        <Plate product={p} />
                        <div>
                          <h3>{p.title}</h3>
                          <p>{p.size ?? p.detail}</p>
                          <span>{p.price}</span>
                        </div>
                        <button
                          onClick={() =>
                            setBag(bag.filter((_, i) => i !== index))
                          }
                          aria-label={`Remove ${p.title}`}
                        >
                          Remove
                        </button>
                      </article>
                    ))}
                    <div className="sf-bag__total">
                      <span>Subtotal</span>
                      <strong>
                        $
                        {bag
                          .reduce(
                            (sum, p) =>
                              sum + Number(p.price.replace(/[$,]/g, "")),
                            0,
                          )
                          .toFixed(2)}
                      </strong>
                    </div>
                    <p>Demo bag · No payment is collected.</p>
                  </>
                ) : (
                  <p>Your bag is ready for your first find.</p>
                )}
                <Button
                  appearance="secondary"
                  label="Continue exploring"
                  onClick={() => dialog.current?.close()}
                />
              </div>
            )}
            {panel === "assistant" && (
              <div className="sf-assistant">
                <Label>Crossword · Collection guide</Label>
                <h2>
                  Find your next{" "}
                  {brandId === "brewhaus"
                    ? "brew essential"
                    : "everyday favourite"}
                  .
                </h2>
                <p>
                  Explore the same {brand.name} products from the storefront.
                  Select one to see its details.
                </p>
                <div className="sf-assistant__products">
                  {data.products.slice(0, 3).map((p) => (
                    <ProductTile key={p.id} product={p} onSelect={select} />
                  ))}
                </div>
                <p className="sf-demo-note">
                  Interactive demo · Product suggestions from this collection
                </p>
              </div>
            )}
          </dialog>
        </div>
      </div>
    </ColorContext>
  );
}
