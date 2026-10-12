"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import faceWash from "../../assets/motion/face-wash.webp";
import routine from "../../assets/motion/face-wash-toner-moisturizer.webp";
import moisturizer from "../../assets/motion/moisturizer.webp";
import toner from "../../assets/motion/toner.webp";
import { phaseTimers, replyDuration, revealInViewport, usePrefersReducedMotion } from "./motion";
import {
  AiPills,
  AiStatus,
  Chip,
  CommerceStacked,
  Composer,
  ConversationViewport,
  Icon,
  ProductCollection,
  RecCard,
  type RecProduct,
  StaggerText,
} from "./primitives";

/*
 * 02b · Sell: dynamic landing page. A landing page written for the visitor
 * (sensitive skin); they tap "I'm also on a budget" and the page rewrites
 * itself around a routine under $75.
 */

type Phase =
  | "idle"
  | "arriving"
  | "selecting"
  | "thinking"
  | "thinkingExit"
  | "revealing"
  | "productsLoading"
  | "done";

const brandmark = "CROSSWORD";

const intro = {
  headline:
    "Looking for a routine that's gentle on sensitive skin? Start here. I've picked a few options based on that.",
  products: [
    { id: "face-wash", name: "Face wash", image: faceWash },
    { id: "toner", name: "Toner", image: toner },
    { id: "moisturizer", name: "Moisturizer", image: moisturizer },
  ] satisfies RecProduct[],
};

const askAi = {
  label: "Ask AI questions",
  options: [
    { id: "dry-skin", text: "Best for dry skin" },
    { id: "budget", text: "I'm also on a budget" },
    { id: "fragrance-free", text: "Fragrance-free only" },
  ],
  selectedId: "budget",
};

const update = {
  tag: "Updated for your budget",
  headline: "Got it. Here are three routines under $75, with the products that do the most work for the price.",
};

const routineCard = {
  brand: "ROUTINE 1 OF 3",
  title: "Face Wash, Toner, Moisturizer",
  price: "$68",
  image: routine,
};

function documentActive() {
  return document.visibilityState === "visible" && document.hasFocus();
}

/** True while the page is at least 30% on screen and the browser window is focused. */
function useOnScreenAndFocused(ref: RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const sync = () => setActive(documentActive());
    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("blur", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("blur", sync);
    };
  }, []);

  return onScreen && active;
}

/** Runs the page script each time it comes into view; replays from the top after it leaves. */
function useLandingScript(visible: boolean) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [pillSelected, setPillSelected] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [cardLoading, setCardLoading] = useState(false);
  const [landingKey, setLandingKey] = useState(0);
  const [wasVisible, setWasVisible] = useState(false);

  // Coming (back) into view starts a fresh landing.
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) {
      setPhase("idle");
      setPillSelected(false);
      setCardLoading(false);
      setStatusLabel("Thinking");
      setLandingKey((k) => k + 1);
    }
  }

  useEffect(() => {
    if (!visible) return;
    const timers = phaseTimers();
    if (phase === "idle") timers.after(650, () => setPhase("arriving"));
    else if (phase === "arriving")
      timers.after(360, () => {
        setPillSelected(true);
        setPhase("selecting");
      });
    else if (phase === "selecting") {
      timers.after(260, () => {
        setStatusLabel("Thinking");
        setPhase("thinking");
      });
    } else if (phase === "thinking") {
      timers.after(300, () => setStatusLabel("Finding routines under your budget"));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") {
      timers.after(150, () => {
        setCardLoading(true);
        setPhase("revealing");
      });
    } else if (phase === "revealing") {
      timers.after(replyDuration(update.headline), () => setPhase("productsLoading"));
    } else if (phase === "productsLoading") {
      timers.after(550, () => {
        setCardLoading(false);
        setPhase("done");
      });
    }
    return timers.clear;
  }, [phase, visible]);

  return { phase, pillSelected, statusLabel, cardLoading, hasLanded: landingKey > 0, landingKey };
}

export function DynamicLandingPage({ play }: { play: boolean }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const visible = useOnScreenAndFocused(pageRef) && play;
  const reduced = usePrefersReducedMotion();
  const { phase, pillSelected, statusLabel, cardLoading, hasLanded, landingKey } = useLandingScript(visible);
  const viewportRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<HTMLDivElement>(null);

  const thinking = phase === "thinking" || phase === "thinkingExit";
  const updated = phase === "revealing" || phase === "productsLoading" || phase === "done";

  // Keep the newest block in view: the follow-ups while choosing, then the rewritten section.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (phase === "idle") {
      viewport.scrollTop = 0;
      return;
    }
    const target = updated ? updateRef.current : phase === "arriving" || phase === "selecting" || thinking ? askRef.current : null;
    if (target) revealInViewport(viewport, target, { margin: 16, slack: 0, instant: reduced });
  }, [phase, updated, thinking, reduced]);

  return (
    <div className="ill-landing-page" ref={pageRef}>
      <div className="ill-landing-page__brandbar">
        <span className="ill-landing-page__brandmark">{brandmark}</span>
      </div>
      <ConversationViewport ref={viewportRef}>
        {hasLanded && (
          <div key={`initial-${landingKey}`} className="ill-landing-page__section">
            <div className="ill-landing-page__eyebrow ill-landing-page-motion__enter">
              <Icon name="insight" size={14} />
              <span>{brandmark}</span>
            </div>
            <p className="ill-landing-page__headline ill-landing-page-motion__enter">{intro.headline}</p>
            <ProductCollection>
              {intro.products.map((product, i) => (
                <div key={product.id} className="ill-landing-page-motion__enter" style={{ animationDelay: `${i * 80}ms` }}>
                  <RecCard product={product} />
                </div>
              ))}
            </ProductCollection>
          </div>
        )}
        {hasLanded && (
          <div key={`ask-ai-${landingKey}`} ref={askRef} className="ill-landing-page__ask-ai ill-landing-page-motion__enter">
            <div className="ill-landing-page__ask-ai-label">
              <Icon name="insight" size={13} />
              <span>{askAi.label}</span>
            </div>
            <AiPills options={askAi.options} selectedId={pillSelected ? askAi.selectedId : ""} />
            {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
          </div>
        )}
        {updated && (
          <div ref={updateRef} className="ill-landing-page__section ill-landing-page-motion__enter">
            <Chip>{update.tag}</Chip>
            <p className="ill-landing-page__headline">
              <StaggerText text={update.headline} />
            </p>
            <CommerceStacked {...routineCard} loading={cardLoading} />
          </div>
        )}
      </ConversationViewport>
      <div className="ill-landing-page__composer">
        <Composer />
      </div>
    </div>
  );
}
