import { Fragment } from "react";
import { StaggerText } from "../../components/ill/StaggerText";

interface Piece {
  text: string;
  bold: boolean;
  // Index in the stagger sequence — a piece glued to the previous one
  // (punctuation right after a bold word) shares its delay so the two
  // arrive together instead of the full stop trailing behind.
  wordIndex: number;
  spaceBefore: boolean;
}

function toPieces(text: string): Piece[] {
  const pieces: Piece[] = [];
  let wordIndex = -1;
  let endedWithSpace = true;
  text.split("**").forEach((segment, i) => {
    segment.split(/(\s+)/).forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        endedWithSpace = true;
        return;
      }
      if (endedWithSpace) wordIndex += 1;
      pieces.push({ text: token, bold: i % 2 === 1, wordIndex, spaceBefore: endedWithSpace && pieces.length > 0 });
      endedWithSpace = false;
    });
  });
  return pieces;
}

// StaggerText with `**bold**` inline emphasis anywhere in the sentence
// (StaggerText's own `boldText` only covers a trailing segment). Reuses
// its word class so the cascade is the identical animation — and defers to
// StaggerText itself whenever there's no emphasis to render. The space
// between words stays a sibling text node, never trailing content inside
// the inline-block span (which would collapse it).
export function RichStagger({ text }: { text: string }) {
  if (!text.includes("**")) return <StaggerText text={text} />;

  return (
    <>
      {toPieces(text).map((piece, i) => {
        const Tag = piece.bold ? "strong" : "span";
        return (
          <Fragment key={i}>
            {piece.spaceBefore ? " " : ""}
            <Tag className="sdm-ill-stagger-text__word" style={{ animationDelay: `${piece.wordIndex * 45}ms` }}>
              {piece.text}
            </Tag>
          </Fragment>
        );
      })}
    </>
  );
}
