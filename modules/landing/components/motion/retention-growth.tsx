"use client";

import { useEffect, useRef, useState } from "react";
import look1 from "../../assets/motion/look-1-gold-hoop-set.webp";
import look2 from "../../assets/motion/look-2-pearl-drop-set.webp";
import look3 from "../../assets/motion/look-3-citrine-stud-set.webp";
import shopperPhoto from "../../assets/motion/photo-uploaded-by-the-shopper.webp";
import wifeLook1 from "../../assets/motion/wife-look-1-gold-hoop-set.webp";
import wifeLook2 from "../../assets/motion/wife-look-2-pearl-drop-set.webp";
import wifeLook3 from "../../assets/motion/wife-look-3-citrine-stud-set.webp";
import { phaseTimers, replyDuration, typeText, useFollowLatest, usePrefersReducedMotion } from "./motion";
import {
  AiStatus,
  AssistantTurn,
  ChatMessage,
  ChatShell,
  ProductCollection,
  RecCard,
  type RecProduct,
  StaggerText,
  Thread,
  UploadAttachment,
  UserTurn,
} from "./primitives";

/*
 * 05b · Retain: retention & growth. The assistant remembers last month's
 * pendant, then styles anniversary looks and shows them on the wife's photo.
 */

type Beat =
  | { kind: "assistant"; message: string; thinkingLabel: string; products?: RecProduct[] }
  | { kind: "user-text"; message: string }
  | { kind: "user-upload"; src: RecProduct["image"] };

type Phase = "composing" | "revealing" | "thinking" | "thinkingExit" | "replying" | "productsLoading" | "pausing";

const brand = "AURELIA";

const beats: Beat[] = [
  {
    kind: "assistant",
    message: "Good to see you again. Did your wife like her rose gold pendant?",
    thinkingLabel: "Checking your order history",
  },
  {
    kind: "user-text",
    message: "Oh yes, now I need something special for our vacation in Miami. It's our anniversary.",
  },
  {
    kind: "assistant",
    message: "Let me share a few earrings and bracelet options, and build a look for her.",
    thinkingLabel: "Finding the right options",
    products: [
      { id: "look-1", name: "Look 1 · Gold Hoop Set", image: look1 },
      { id: "look-2", name: "Look 2 · Pearl Drop Set", image: look2 },
      { id: "look-3", name: "Look 3 · Citrine Stud Set", image: look3 },
    ],
  },
  { kind: "user-text", message: "I wonder how this would look on her…" },
  {
    kind: "assistant",
    message: "Simply upload her picture, and I will show you.",
    thinkingLabel: "Setting that up",
  },
  { kind: "user-upload", src: shopperPhoto },
  {
    kind: "assistant",
    message: "Here are the same looks, but for her!",
    thinkingLabel: "Personalizing these looks for her",
    products: [
      { id: "wife-look-1", name: "Wife's Look 1 · Gold Hoop Set", image: wifeLook1 },
      { id: "wife-look-2", name: "Wife's Look 2 · Pearl Drop Set", image: wifeLook2 },
      { id: "wife-look-3", name: "Wife's Look 3 · Citrine Stud Set", image: wifeLook3 },
    ],
  },
];

/** The phase a beat opens with: typing, an upload landing, or the assistant thinking. */
function openingPhase(beat: Beat): Phase {
  return beat.kind === "user-text" ? "composing" : beat.kind === "user-upload" ? "revealing" : "thinking";
}

/** Reading time before the next beat; replies with products hold longer. */
function pauseDuration(beat: Beat) {
  if (beat.kind !== "assistant") return 350;
  const base = 350 + Math.min(beat.message.length * 3, 500);
  return beat.products?.length ? base + 500 : base;
}

function useConversation(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [beatIndex, setBeatIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>(openingPhase(beats[0]));
  const [composerValue, setComposerValue] = useState("");
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    if (!play || reduced || beatIndex >= beats.length) return;
    const beat = beats[beatIndex];
    const timers = phaseTimers();
    const advance = () => {
      const next = beatIndex + 1;
      setBeatIndex(next);
      setPhase(next < beats.length ? openingPhase(beats[next]) : "pausing");
    };

    if (phase === "composing" && beat.kind === "user-text") {
      const cancel = typeText(beat.message, {
        msPerStep: 26,
        onTick: setComposerValue,
        onDone: () =>
          timers.after(220, () => {
            setComposerValue("");
            advance();
          }),
      });
      return () => {
        cancel();
        timers.clear();
      };
    }
    if (phase === "revealing") {
      timers.after(650, advance);
    } else if (phase === "thinking" && beat.kind === "assistant") {
      timers.after(300, () => setStatusLabel(beat.thinkingLabel));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") {
      timers.after(150, () => {
        // The status is gone once the reply lands; the next beat thinks from the top.
        setStatusLabel("Thinking");
        setPhase("replying");
      });
    } else if (phase === "replying" && beat.kind === "assistant") {
      timers.after(replyDuration(beat.message), () => {
        if (beat.products?.length) {
          setProductsLoading(true);
          setPhase("productsLoading");
        } else setPhase("pausing");
      });
    } else if (phase === "productsLoading") {
      timers.after(550, () => {
        setProductsLoading(false);
        setPhase("pausing");
      });
    } else if (phase === "pausing") {
      timers.after(pauseDuration(beat), advance);
    }
    return timers.clear;
  }, [play, reduced, beatIndex, phase]);

  return {
    beatIndex: reduced ? beats.length : beatIndex,
    phase,
    composerValue,
    composerTyping: play && phase === "composing",
    statusLabel,
    productsLoading,
    reduced,
  };
}

export function RetentionGrowth({ play }: { play: boolean }) {
  const { beatIndex, phase, composerValue, composerTyping, statusLabel, productsLoading, reduced } =
    useConversation(play);
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(viewportRef, `${beatIndex}-${phase}-${productsLoading}`, reduced);

  const typing = beats[beatIndex]?.kind === "user-text" && phase === "composing";

  return (
    <ChatShell
      brand={brand}
      width={550}
      height={520}
      composerValue={typing && composerValue ? composerValue : undefined}
      composerTyping={typing && composerTyping}
      viewportRef={viewportRef}
    >
      <Thread>
        {beats.map((beat, i) => {
          const past = i < beatIndex;
          const current = i === beatIndex;

          if (beat.kind === "user-text") {
            const entering = current && phase !== "composing";
            if (!past && !entering) return null;
            return (
              <UserTurn key={i} animateIn={entering && !past}>
                <ChatMessage role="user">{beat.message}</ChatMessage>
              </UserTurn>
            );
          }
          if (!past && !current) return null;
          if (beat.kind === "user-upload") {
            return (
              <UserTurn key={i} animateIn={current && !past}>
                <UploadAttachment src={beat.src} />
              </UserTurn>
            );
          }

          const thinking = current && (phase === "thinking" || phase === "thinkingExit");
          const showCards = past || (current && (phase === "productsLoading" || phase === "pausing"));
          return (
            <AssistantTurn key={i} animateIn={current}>
              {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
              {(past || (current && !thinking)) && (
                <ChatMessage role="assistant">
                  <StaggerText text={beat.message} />
                </ChatMessage>
              )}
              {showCards && beat.products && (
                <ProductCollection>
                  {beat.products.map((product, p) => (
                    <RecCard
                      key={product.id}
                      product={product}
                      loading={current && phase === "productsLoading"}
                      resolveDelayMs={p * 80}
                    />
                  ))}
                </ProductCollection>
              )}
            </AssistantTurn>
          );
        })}
      </Thread>
    </ChatShell>
  );
}
