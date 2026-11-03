import supportAgentPortraitImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/stranger-problem/avatar-sara.png";

const supportAgentPortrait = supportAgentPortraitImage.src;

// Storybook pieces 01's thread doesn't use, built for 04 (human handoff)
// and 05 (photo upload) in the same window and palette as GiftJourneyV2.
// Sources: ChatWindow.stories.tsx — .nw-win__joinbar (handoff seam),
// .nw-win__human (a person's message plate), .nw-win__humantyping (their
// typing line) and .nw-win__image-tile (an image in the thread).

// The handoff's threshold: a dashed seam running edge to edge with one
// centred 32px pill. `connecting` is the pill's first phase (spark +
// shimmered words); unset, the joined phase (the person's face, then the
// line). The pill keeps one height through both.
export function HandoffSeam({ text, connecting, className }: { text: string; connecting?: boolean; className?: string }) {
  return (
    <div className={["sbp-seam", className].filter(Boolean).join(" ")} role="status">
      <span className="sbp-seam__pill">
        {connecting ? (
          <span key="connecting" className="sbp-seam__swap">
            <span className="sbp-seam__think" aria-hidden="true" />
            <span className="sbp-shimmer">{text}</span>
          </span>
        ) : (
          <span key="joined" className="sbp-seam__swap">
            <AgentFace size="sm" />
            <span>{text}</span>
          </span>
        )}
      </span>
    </div>
  );
}

// A person's message: one plate, the head (32px face, name, role) above
// the words, which keep the received-bubble cloth. Several lines from the
// same person stack inside one plate.
export function AgentPlate({ name, role, children, className }: { name: string; role: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={["sbp-human", className].filter(Boolean).join(" ")}>
      <div className="sbp-human__row">
        <span className="sbp-human__head">
          <AgentFace />
          <span className="sbp-human__id">
            <span className="sbp-human__name">{name}</span>
            <span className="sbp-human__title">{role}</span>
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

export function AgentLine({ children }: { children: React.ReactNode }) {
  return <p className="sbp-human__body">{children}</p>;
}

// The person's wait: their first name and "is typing…", in the quiet
// monochrome shimmer — a line, not dots.
export function AgentTyping({ name, className }: { name: string; className?: string }) {
  return <p className={["sbp-typing", className].filter(Boolean).join(" ")}><span className="sbp-shimmer">{name} is typing…</span></p>;
}

// An image the shopper sent: a tile on the media plate, radius 18, at the
// right edge with the user's turns.
// `from="ai"` seats a result image on the reply's side, portrait.
export function ImageTile({ src, alt, from = "user", className }: { src: string; alt: string; from?: "user" | "ai"; className?: string }) {
  return (
    <div className={["sbp-tile", from === "ai" && "sbp-tile--ai", className].filter(Boolean).join(" ")}>
      <img src={src} alt={alt} />
    </div>
  );
}

function AgentFace({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span className={`sbp-face sbp-face--${size}`} aria-hidden="true">
      <img src={supportAgentPortrait} alt="" />
    </span>
  );
}

// The product a shopper is asking about: a List View row (48px thumb on
// the media plate, title, muted meta line), at the right edge with their
// turn, just above the bubble.
export function ProductRow({ image, title, meta, className }: { image: string; title: string; meta: string; className?: string }) {
  return (
    <div className={["sbp-row", className].filter(Boolean).join(" ")}>
      <span className="sbp-row__thumb"><img src={image} alt="" /></span>
      <span className="sbp-row__col">
        <span className="sbp-row__title">{title}</span>
        <span className="sbp-row__meta">{meta}</span>
      </span>
    </div>
  );
}

// A guided finder's answered questions: each question in the muted line,
// its options as radio plates, the shopper's answer in the picked state.
export function QuizPlates({ questions, className }: { questions: { question: string; options: string[]; answer: string }[]; className?: string }) {
  return (
    <div className={["sbp-quiz", className].filter(Boolean).join(" ")}>
      {questions.map((q) => (
        <div key={q.question} className="sbp-quiz__q">
          <p className="sbp-quiz__label">{q.question}</p>
          <div className="sbp-quiz__plates">
            {q.options.map((o) => (
              <span key={o} className={o === q.answer ? "sbp-plate sbp-plate--picked" : "sbp-plate"}>{o}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
