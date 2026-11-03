import { Shell } from "../../components/ill/Shell";
import { ChatComposer } from "../../components/ill/ChatComposer";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { Button } from "../../components/ill/Button";
import { SkeletonBlock } from "../../components/ill/SkeletonBlock";
import sunGlowImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/sun-glow.svg";
import sunImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/sun.svg";
import ridgeImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/ridge.svg";
import pinesImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/pines.svg";
import groundImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/ground.svg";
import trailImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/trail.svg";
import hurdleArtImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/hurdle.svg";
import runnerImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/games-rewards/runner.svg";
import { RetainModule, RetainRow } from "../../illustrations/Retain/RetainParts";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { AdJourneyProvider, InstagramAd, KnockBar, Storefront } from "../AdJourney/AdJourney";
import { useContext } from "react";
import { StorybookCardSkin, StorybookComposerDefault } from "../../components/ill/ProductCardSkin";
import { journey, ad, hero, brand, composer, knockDoors, knockLine, gameScenes, hurdles, invite, playAction, product, prompts, reward, steps, type Step } from "./data";


const sunGlow = sunGlowImage.src;
const sun = sunImage.src;
const ridge = ridgeImage.src;
const pines = pinesImage.src;
const ground = groundImage.src;
const trail = trailImage.src;
const hurdleArt = hurdleArtImage.src;
const runner = runnerImage.src;

// Sell: Games & rewards. Ten static frames on the 738x680 crimson canvas,
// following the SuperMush reference flow. All frames reuse Ad journey's
// Trailwell ad and storefront (550x520 window), with this sequence's copy.
//   00.1 → 00.2  shopper taps "Play now" on the ad; the landing page loads
//              with the compact Crossword widget: invite + "Play game" pill
//   00.2 → 01  shopper taps the pill (selected fill)
//   01 → 02.1  the widget expands in place to Ad journey's expanded panel;
//              its content gives way to the Sweep layer (same box): cream,
//              green glow sweeping down, the Insight spark turning in
//   02.1 → 02.2  the spark bursts: rays fly out, the centre becomes an
//              8-point star (Sweep state 4)
//   02.2 → 02.3  the star scales past the panel and the cream wash rises
//              (state 5); state 6 (all cream) exists only in the motion
//   02.3 → 03.0  cream becomes the panel itself; chat returns with "Play
//              game" as the shopper's turn and the game loading (skeleton
//              laid on the loaded geometry)
//   03.0 → 03  game widget lands, 0 / 4 hurdles; Jump below
//   03 → 04    counter 3 / 4
//   04 → 05    game turn is replaced by the reward reply + product module;
//              the game exchange (shopper's turn + game) leaves together
// Groups carry data-name (Wipe, Star, Game, Stage) for the motion pass.

// The Figma transition (ILL references, nodes 3188:3483 → 3188:3564): a
// cream panel where a green glow sweeps down and cream bands follow it,
// while the kit's Insight spark fades in, turns, then bursts — long rays
// fly out, the centre becomes an 8-point star — and the star scales past
// the panel until cream covers it. Six states; the statics show 2, 4 and
// 5, the motion plays all six through transitions on these same layers.
export type SweepState = 1 | 2 | 3 | 4 | 5 | 6;

const RAYS = [0, 90, 180, 270].map((a) => ({ a, kind: "straight" }))
  .concat([45, 135, 225, 315].map((a) => ({ a, kind: "diagonal" })));

export function Sweep({ state, className }: { state: SweepState; className?: string }) {
  return (
    <div className={["adj-widget adj-widget--expanded gr-sweep", `gr-sweep--s${state}`, className].filter(Boolean).join(" ")} data-name="Sweep">
      <span className="gr-sweep__glow" />
      <span className="gr-sweep__wash" />
      <span className="gr-sweep__band gr-sweep__band--a" />
      <span className="gr-sweep__band gr-sweep__band--b" />
      <div className="gr-sweep__mark" data-name="Spark">
        {RAYS.map((r) => (
          <span key={r.a} className={`gr-sweep__ray gr-sweep__ray--${r.kind}`} style={{ "--a": `${r.a}deg` } as React.CSSProperties} />
        ))}
        <svg className="gr-sweep__core" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M53.7 25.2L8.8 0L26.3 45.9L0.8 92.1L45 75.2L91.2 100L76.9 48.2L99.2 7.9Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

const pauseIcon = (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <rect x="1.5" y="1" width="2.4" height="8" rx="1" fill="currentColor" />
    <rect x="6.1" y="1" width="2.4" height="8" rx="1" fill="currentColor" />
  </svg>
);

// The game itself: the Figma scene (ILL references, node 3200:3683),
// its exported parts placed at their Figma positions in one 425.5x132
// viewBox, anchored to the ground so the stage can be any width. Layers
// are separate so the motion can scroll them at different speeds.
export const GROUND = 108.35;
export const scene = { sunGlow, sun, ridge, pines, ground, trail, hurdle: hurdleArt, runner };

export function SceneImage({ src, x, y, w, h, ...rest }: { src: string; x: number; y: number; w: number; h: number } & React.SVGProps<SVGImageElement>) {
  return <image href={src} x={x} y={y} width={w} height={h} preserveAspectRatio="none" {...rest} />;
}

export function GameScene({ phase }: { phase: keyof typeof gameScenes }) {
  const s = gameScenes[phase];
  const airborne = s.lift > 0;
  return (
    <svg className="gr-scene" viewBox="0 0 425.5 132" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        {/* Airborne, the runner leaves its baked-in shadow on the ground. */}
        <clipPath id="gr-runner-body"><rect x="0" y="0" width="28.42" height="40" /></clipPath>
      </defs>
      <SceneImage src={scene.sunGlow} x={267.55} y={8.42} w={40.83} h={40.83} />
      <SceneImage src={scene.sun} x={276.15} y={17.02} w={23.64} h={23.64} />
      <SceneImage src={scene.ridge} x={-42.98 + s.scroll / 4} y={13.2} w={548} h={95.15} />
      <SceneImage src={scene.pines} x={21.49 + s.scroll / 2} y={80.42} w={444.85} h={27.94} />
      <SceneImage src={scene.ground} x={0} y={GROUND} w={425.5} h={23.64} />
      <SceneImage src={scene.trail} x={-1.07 + (s.scroll % 24)} y={119.1} w={453.44} h={2.15} />
      {airborne && (
        <path d={`M${s.runnerX - 48} ${GROUND - 2}Q${s.runnerX + 2} ${GROUND - 78} ${s.runnerX + 14} ${GROUND - s.lift - 4}`} fill="none"
          stroke="#fff9e9" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
      )}
      {s.hurdles.map((x) => <SceneImage key={x} src={scene.hurdle} x={x} y={80.42} w={30.09} h={27.94} />)}
      {airborne ? (
        <g data-name="Runner">
          <ellipse cx={s.runnerX + 14.2} cy={GROUND + 2.5} rx={7} ry={1.6} fill="#002d17" opacity=".35" />
          <g transform={`translate(${s.runnerX} ${67.33 - s.lift}) rotate(-8 14.2 20)`}>
            <SceneImage src={scene.runner} preserveAspectRatio="xMidYMid meet" x={0} y={0} w={28.42} h={45.86} clipPath="url(#gr-runner-body)" />
          </g>
        </g>
      ) : (
        <SceneImage src={scene.runner} preserveAspectRatio="xMidYMid meet" x={s.runnerX} y={67.33} w={28.42} h={45.86} data-name="Runner" />
      )}
    </svg>
  );
}

export const jumpIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" /></svg>
);

// Loading lays bars on the loaded geometry (132px stage, 40px Jump), so 03.0 → 03 doesn't shift.
// `previous` (motion only) keeps the outgoing count mounted so the new
// number rolls in while the old one rolls out, with no blank frame;
// `scene` and `action` (motion only) swap in the running scene and an
// action that can turn into the reward's.
export function Game({ cleared, loading, previous, scene: sceneOverride, action }: { cleared?: number; loading?: boolean; previous?: number; scene?: React.ReactNode; action?: React.ReactNode }) {
  if (loading) {
    return (
      <section className="gr-game gr-game--loading" data-name="Game">
        <SkeletonBlock width="100%" height={132} radius={12} />
        <SkeletonBlock width="100%" height={40} radius={999} />
      </section>
    );
  }
  return (
    <section className="gr-game" data-name="Game">
      <div className="gr-game__stage" data-name="Stage">
        <span className="gr-game__count">
          <span className="gr-game__num">
            {previous !== undefined && previous !== cleared && <span key={`out-${previous}`} className="gr-game__digit gr-game__digit--out">{previous}</span>}
            <span key={cleared} className="gr-game__digit">{cleared}</span>
          </span> / {hurdles} hurdles
        </span>
        <button type="button" className="gr-game__pause" aria-label="Pause">{pauseIcon}</button>
        {sceneOverride ?? <GameScene phase={cleared ? "progress" : "start"} />}
      </div>
      {action ?? <Button appearance="primary" label="Jump" className="gr-game__jump" iconTrailing={jumpIcon} />}
    </section>
  );
}

export function RewardModule() {
  // v2 (STORYBOOK_MAPPING §3): the invented module becomes the Storybook
  // Detailed Card, side-by-side: white, r20, hairline + soft cast, the
  // new price with the old one struck, one full-width pill CTA.
  if (useContext(StorybookCardSkin)) {
    return (
      <article className="gr-detail">
        <div className="gr-detail__row">
          <div className="gr-detail__tile"><img src={product.image} alt={product.title} /></div>
          <div className="gr-detail__col">
            <span className="gr-detail__caption">{brand}</span>
            <span className="gr-detail__title">{product.title}</span>
            <span className="gr-detail__meta">{product.applied}</span>
            <span className="gr-detail__price">{product.price}<s>{product.originalPrice}</s></span>
          </div>
        </div>
        <Button appearance="primary" label="Add to cart" className="gr-detail__cta" />
      </article>
    );
  }
  return (
    <RetainModule product={{ image: product.image, alt: product.title, brand, title: product.title, price: product.price, size: 44 }}>
      <RetainRow label="Original price"><s>{product.originalPrice}</s></RetainRow>
      <RetainRow label={product.applied}><span className="gr-saving">−$5</span></RetainRow>
      <Button appearance="primary" label="Add to cart" className="gr-cta" />
    </RetainModule>
  );
}

function CompactWidget({ selected }: { selected: boolean }) {
  // v2: the composer rests alone with the knock above it (Ad journey's opener).
  if (useContext(StorybookComposerDefault)) {
    return <KnockBar line={knockLine} doors={knockDoors} value={composer} pressed={selected ? playAction : undefined} />;
  }
  return (
    <Shell brand={brand} className="adj-widget adj-widget--compact gr gr-compact" composer={<></>}>
      <AssistantTurn>
        <ChatMessage role="assistant" text={invite} />
        <AiPills options={prompts} selectedId={selected ? "play" : ""} />
      </AssistantTurn>
    </Shell>
  );
}

export function GamesRewardsFrame({ step }: { step: Step }) {
  return <AdJourneyProvider value={journey}><GamesRewardsScene step={step} /></AdJourneyProvider>;
}

function GamesRewardsScene({ step }: { step: Step }) {
  if (step === 1) return <div className="adj"><InstagramAd copy={ad} /></div>;
  // 00.2 and 01 are the landing page's compact widget (01: pill tapped).
  if (step <= 3) return <div className="adj"><Storefront hero={hero} widget={<CompactWidget selected={step === 3} />} /></div>;
  // From 02.1 the same widget is expanded in place over the page (Ad
  // journey's expanded panel). The wipe takes that panel's exact box via
  // the same classes.
  const wiping = step >= 4 && step <= 6;
  return (
    <div className="adj">
      <Storefront hero={hero} widget={<>
        <Shell
          brand={brand}
          className={["adj-widget adj-widget--expanded gr", wiping && "gr--wiping"].filter(Boolean).join(" ")}
          header={<ChatHeader brand={brand} showExpand={false} />}
          composer={<ChatComposer value={composer} />}
        >
          <div className="gr-thread">
            {step >= 7 && step <= 9 && (
              <UserTurn>
                <ChatMessage role="user" text={playAction} />
              </UserTurn>
            )}
            {step >= 7 && step <= 9 && (
              <AssistantTurn className="gr-turn">
                <Game loading={step === 7} cleared={step === 9 ? 3 : 0} />
              </AssistantTurn>
            )}
            {step === 10 && (
              <AssistantTurn className="gr-turn">
                <p className="gr-reward">{reward}</p>
                <RewardModule />
              </AssistantTurn>
            )}
          </div>
        </Shell>
        {wiping && <Sweep state={({ 4: 2, 5: 4, 6: 5 } as const)[step as 4 | 5 | 6]} />}
      </>} />
    </div>
  );
}

export function GamesRewards() {
  return (
    <section className="gr-section">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as Step[]).map((s) => (
        <figure className="gr-figure" key={s} data-name={`Games & rewards / ${steps[s - 1].id}`}>
          <figcaption className="app-stage__tile-label">Games & rewards / {steps[s - 1].id} — {steps[s - 1].label}</figcaption>
          <GamesRewardsFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
