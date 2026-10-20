"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  EnterDelayed,
  InsightCard,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { productImages } from "../products";
import { type CommerceProduct, CommerceCard, QuizRow } from "./parts-b";

/*
 * 13 — Product discovery: Guided finder (source `q0`). The assistant runs a
 * three-question quiz with the answers already picked, then lands on one
 * foundation that matches the shopper's saved shade.
 */

const copy = {
  brand: "LUMEN",
  userMessage: "Help me find the right foundation.",
  framing: "Let's narrow it down in 3 quick questions.",
  resultMessage: "Based on your answers, and your saved shade preference, this is your best match.",
};

const questions = [
  { question: "Preferred finish?", options: ["Matte", "Dewy", "Satin"], answer: "Dewy" },
  {
    question: "What are you looking to cover?",
    options: ["Dark circles", "Some redness & spots", "Uneven tone"],
    answer: "Some redness & spots",
  },
  { question: "Skin type?", options: ["Dry", "Combination", "Oily"], answer: "Combination" },
];

const insightLines = ["Matched to your saved shade — Warm 3.", "You've repurchased dewy finishes twice before."];

const match: CommerceProduct = {
  id: "match",
  image: productImages.foundation,
  brand: "LUMEN",
  title: "Second Skin Foundation",
  price: "$38",
  rating: 5,
  ratingCount: "1.4k",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "framing", type: "text", text: copy.framing },
  ...questions.map((_, i): Beat => ({ id: `q${i}`, type: "appear", ms: 500 })),
  { id: "think-match", type: "think", labels: ["Finding your match"] },
  { id: "result", type: "text", text: copy.resultMessage },
  { id: "insight", type: "appear" },
  { id: "card", type: "load", ms: 700 },
];

export function GuidedFinder({ play = true }: { play?: boolean }) {
  return (
    <ChatScene brand={copy.brand} beats={beats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ChatMessage role="user" text={copy.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("framing") && <AssistantReply text={copy.framing} />}
              {t.reached("q0") && (
                <EnterDelayed>
                  <div className="ill-quiz-module">
                    {questions.map(
                      (q, i) =>
                        t.reached(`q${i}`) &&
                        // The module itself enters with the first question; later ones enter on their own.
                        (i === 0 ? (
                          <QuizRow key={q.question} question={q.question} options={q.options} answer={q.answer} />
                        ) : (
                          <EnterDelayed key={q.question}>
                            <QuizRow question={q.question} options={q.options} answer={q.answer} />
                          </EnterDelayed>
                        )),
                    )}
                  </div>
                </EnterDelayed>
              )}
              <ThinkingStatus t={t} id="think-match" />
              {t.reached("result") && <AssistantReply text={copy.resultMessage} />}
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={insightLines} />
                </EnterDelayed>
              )}
              {t.reached("card") && <CommerceCard product={match} loading={t.loading("card")} />}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}
