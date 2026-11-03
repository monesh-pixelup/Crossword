import { useContext, useLayoutEffect, useRef } from "react";
import { StorybookComposerDefault } from "../../components/ill/ProductCardSkin";
import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ChatComposer } from "../../components/ill/ChatComposer";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { StaggerText } from "../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AdJourneyProvider, InstagramAd, KnockBar, Storefront } from "../AdJourney/AdJourney";
import { Game, SceneImage, Sweep, jumpIcon, scene } from "../GamesRewards/GamesRewards";
import { journey, ad, brand, composer, hero, knockDoors, knockLine, invite, playAction, product, prompts, reward } from "../GamesRewards/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";

// 08 — Games & rewards (motion). The statics as one take. Ad → storefront
// (the ad opening into its page) and the compact widget's rise/expand are
// Ad journey's (its .adjm plate, layer and surface morph, reused as-is). On "Play game" the widget morphs to
// the panel's footprint and, as it lands, the Sweep layer (Figma
// 3188:3483 → 3564) plays as one continuous take on that box: the
// Figma frames are values each layer's single track passes through, not
// stops. The chat rises out of the final cream, the game cross-fades
// from its skeleton, the hurdles start coming and each Jump is a tap the
// bag answers with a jump over the next one (the counter rolls as it
// clears), 4/4 holds as the success state, and then the game card itself
// becomes the reward: cream floods the stage from below, the reward
// settles into the same box and Jump turns into Add to cart.
const beats: Beat[] = [
  { id: "ad", type: "pause", ms: 1400 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 750 },
  { id: "widget", type: "text", text: invite },
  { id: "prompts", type: "appear", ms: 1200 },
  { id: "pick-play", type: "appear", ms: 160 },
  // The pick's press is still settling when the widget starts to grow,
  // and the sweep starts while the morph is still landing — its green
  // slides in from above the panel, so tap → grow → flood is one gesture.
  { id: "expand", type: "appear", ms: 240 },
  // One continuous take (GamesRewardsMotion.css, done by ~1000ms): every layer
  // runs its own single track through Figma's six frames; nothing stops
  // at a frame. The reveal starts at 960ms, as the star's points leave
  // the panel, so the chat rises straight out of the cream.
  { id: "sweep", type: "appear", ms: 960 },
  { id: "reveal", type: "appear", ms: 650 },
  { id: "game-load", type: "load", ms: 800 },
  { id: "game", type: "appear", ms: 900 },
  // The run is one CSS track (GamesRewardsMotion.css, grm-hurdles/
  // grm-jump): these lengths are its tap times, so each Jump press lands
  // on the frame the bag starts its crouch. Hurdle 3 holds longer for
  // its toast; win starts on the last landing.
  { id: "run", type: "appear", ms: 546 },
  { id: "hurdle-1", type: "appear", ms: 933 },
  { id: "hurdle-2", type: "appear", ms: 933 },
  { id: "hurdle-3", type: "appear", ms: 1067 },
  { id: "hurdle-4", type: "appear", ms: 750 },
  { id: "win", type: "appear", ms: 900 },
  { id: "reward", type: "appear", ms: 700 },
  { id: "hold", type: "pause", ms: 1600 },
];

const HURDLE_BEATS = ["hurdle-1", "hurdle-2", "hurdle-3", "hurdle-4"];

// The reward, laid into the stage's own 132px box as a side-by-side
// Detailed Card: image tile left; the win, the product and its new price
// stacked right, so the saving reads first and the price confirms it.
function StageReward() {
  return (
    <div className="grm-prize">
      <div className="grm-prize__tile"><img src={product.image} alt={product.title} /></div>
      <div className="grm-prize__col">
        <p className="gr-reward grm-prize__headline">All four cleared. {reward}</p>
        <span className="grm-prize__title">{product.title}</span>
        <span className="grm-prize__price">{product.price}<s>{product.originalPrice}</s></span>
      </div>
    </div>
  );
}

// The game's one action, with the reward's label already under it so the
// two can cross-fade on the same button.
function GameAction({ claimed }: { claimed: boolean }) {
  return (
    <button type="button" className={cx("ill-button ill-button--primary gr-game__jump grm-action", claimed && "grm-action--cart")}>
      <span className="grm-action__label grm-action__label--jump">Jump {jumpIcon}</span>
      <span className="grm-action__label grm-action__label--cart">Add to cart</span>
    </button>
  );
}

// GameScene's layers set up as a tap-to-jump runner: the scenery and the
// bag hold still and the hurdles come to it, so the four states are
// points on one take rather than four layouts. Every moving part is its
// own layer (see GamesRewardsMotion.css). Hurdles sit 140 apart — room
// for a jump and its landing between taps — with the fourth further out.
const RUN_HURDLES = [230, 370, 510, 670];
// The bag stands right of the counter so a full-height jump stays clear of it.
const RUNNER = { x: 110, y: 67.33 };

function SceneLayer({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg className={cx("gr-scene", className)} viewBox="0 0 425.5 132" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {children}
    </svg>
  );
}

function RunScene() {
  return (
    <>
      <SceneLayer className="grm-run__scenery">
        <SceneImage src={scene.sunGlow} x={267.55} y={8.42} w={40.83} h={40.83} />
        <SceneImage src={scene.sun} x={276.15} y={17.02} w={23.64} h={23.64} />
        <SceneImage src={scene.ridge} x={-42.98} y={13.2} w={548} h={95.15} />
        <SceneImage src={scene.pines} x={21.49} y={80.42} w={444.85} h={27.94} />
        <SceneImage src={scene.ground} x={0} y={108.35} w={425.5} h={23.64} />
        <SceneImage src={scene.trail} x={-1.07} y={119.1} w={453.44} h={2.15} />
      </SceneLayer>
      <SceneLayer className="grm-run__hurdles">
        {RUN_HURDLES.map((x) => <SceneImage key={x} src={scene.hurdle} x={x} y={80.42} w={30.09} h={27.94} />)}
      </SceneLayer>
      <SceneLayer className="grm-run__shadow">
        <ellipse cx={RUNNER.x + 14.21} cy={RUNNER.y + 43.17} rx={11.82} ry={1.34} fill="#002d17" />
      </SceneLayer>
      {/* Outer layer carries the jump, inner the crouch and squash. */}
      <div className="grm-run__runner">
        <SceneLayer className="grm-run__body">
          <defs>
            {/* The runner's baked-in shadow is clipped off; its own shadow stays on the ground. */}
            <clipPath id="grm-runner-body"><rect x="0" y="0" width="28.42" height="40" /></clipPath>
          </defs>
          <g transform={`translate(${RUNNER.x} ${RUNNER.y})`}>
            <SceneImage src={scene.runner} preserveAspectRatio="xMidYMid meet" x={0} y={0} w={28.42} h={45.86} clipPath="url(#grm-runner-body)" />
          </g>
        </SceneLayer>
      </div>
    </>
  );
}

function Widgets({ t }: { t: Timeline }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const compactRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const showCompact = t.reached("widget");
  const expanding = t.reached("expand");
  const revealed = t.reached("reveal");
  const sweeping = t.reached("sweep");
  const gameReady = t.reached("game");
  const cleared = HURDLE_BEATS.filter((id) => t.reached(id)).length;
  const rewarded = t.reached("reward");
  const composerDefault = useContext(StorybookComposerDefault);

  // Same measurement as Ad journey: the shared surface's compact and
  // panel footprints, once both are laid out.
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const compact = compactRef.current;
    const expanded = expandedRef.current;
    if (!showCompact || !layer || !surface || !compact || !expanded) return;
    const box = layer.getBoundingClientRect();
    // Back to the layer's own CSS px: the site zooms each visual to fit its
    // panel, and getBoundingClientRect reports zoomed values. 1 (a no-op)
    // at the visual's drawn size.
    const zoom = layer.offsetWidth ? box.width / layer.offsetWidth : 1;
    const place = (name: string, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const insets = {
        t: (r.top - box.top) / zoom,
        r: (box.right - r.right) / zoom,
        b: (box.bottom - r.bottom) / zoom,
        l: (r.left - box.left) / zoom,
      };
      for (const [side, value] of Object.entries(insets)) surface.style.setProperty(`--adjm-${name}-${side}`, `${value}px`);
    };
    place("from", compact);
    place("to", expanded);
  }, [showCompact]);

  useFollowLatest(viewportRef, { thread: ".gr-thread", index: t.index, reducedMotion: t.reducedMotion });

  return (
    <div className={cx("adjm-layer", showCompact && "adjm-layer--in")} ref={layerRef}>
      <div className={cx("adjm-surface", expanding && "adjm-surface--open")} ref={surfaceRef} />
      {showCompact && composerDefault && (
        <KnockBar
          barRef={compactRef}
          className={cx("adjm-compact", expanding && "adjm-compact--out")}
          line={knockLine}
          doors={knockDoors}
          value={composer}
          knock={t.reached("prompts")}
          pressed={t.reached("pick-play") ? playAction : undefined}
          out={expanding}
        />
      )}
      {showCompact && !composerDefault && (
        <Shell
          brand={brand}
          rootRef={compactRef}
          className={cx(
            "adj-widget adj-widget--compact adjm-compact gr gr-compact",
            t.reached("prompts") && "adjm-compact--prompts",
            expanding && "adjm-compact--out",
          )}
          composer={<></>}
        >
          <AssistantTurn>
            <ChatMessage role="assistant">
              <StaggerText text={invite} />
            </ChatMessage>
            <AiPills options={prompts} selectedId={t.reached("pick-play") ? "play" : ""} />
          </AssistantTurn>
        </Shell>
      )}
      <Shell
        brand={brand}
        rootRef={expandedRef}
        viewportRef={viewportRef}
        className={cx("adj-widget adj-widget--expanded adjm-expanded gr", revealed && "adjm-expanded--open")}
        header={<ChatHeader brand={brand} showExpand={false} />}
        composer={<ChatComposer value={composer} />}
      >
        <div className="gr-thread">
          {revealed && (
            <>
              <UserTurn>
                <ChatMessage role="user" text={playAction} />
              </UserTurn>
              <AssistantTurn className="gr-turn">
                {/* The loaded game sits under its own skeleton and the two
                    cross-fade in the same box. */}
                <div className={cx("grm-game", `grm-game--${cleared}`, gameReady && "grm-game--ready",
                  t.reached("run") && "grm-game--running", t.reached("win") && "grm-game--win")}>
                  <Game cleared={cleared} previous={cleared > 0 ? cleared - 1 : undefined}
                    scene={<><RunScene />{rewarded && <StageReward />}</>} action={<GameAction claimed={rewarded} />} />
                  {!t.reached("run") && <div className="grm-game__skeleton"><Game loading /></div>}
                </div>
              </AssistantTurn>
            </>
          )}
        </div>
      </Shell>
      {sweeping && <Sweep state={1} className={cx("grm-sweep", revealed && "grm-sweep--done")} />}
    </div>
  );
}

// The v2 opener, as Ad journey's: the bar rests 1.2s, the knock pops
// (883ms) and holds 3.6s; the door's press (320ms) lands before the grow.
const knockBeats: Beat[] = beats.map((b) =>
  b.id === "widget" ? { id: "widget", type: "pause", ms: 1200 }
  : b.id === "prompts" ? { ...b, ms: 883 + 3600 }
  : b.id === "pick-play" ? { ...b, ms: 450 }
  : b,
);

function Scene({ t }: { t: Timeline }) {
  return (
    <div className={cx("adj adjm grm", t.reached("tap-ad") && "adjm--tap", t.reached("store") && "adjm--store")}>
      <InstagramAd copy={ad} />
      <div className="adjm-plate" />
      <Storefront hero={hero} widget={<Widgets t={t} />} />
    </div>
  );
}

export function GamesRewardsMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const composerDefault = useContext(StorybookComposerDefault);
  const t = useChatTimeline(composerDefault ? knockBeats : beats, landed && fontsReady);
  return (
    <div ref={rootRef}>
      <AdJourneyProvider value={journey}><Scene t={t} key={t.runKey} /></AdJourneyProvider>
    </div>
  );
}
