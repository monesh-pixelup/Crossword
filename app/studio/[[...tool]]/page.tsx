/**
 * The Sanity Studio, where the blog is written: crossword.ai/studio. Editors sign in with their Sanity account.
 * It sits outside the marketing layout (no site header or footer) and is the same page for every /studio/… URL.
 */
import { NextStudio } from "next-sanity/studio";
import { Suspense } from "react";
import config from "../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // The Studio routes itself from the URL, which is only known at request time: it streams in inside this boundary.
  return (
    <Suspense fallback={null}>
      <NextStudio config={config} />
    </Suspense>
  );
}
