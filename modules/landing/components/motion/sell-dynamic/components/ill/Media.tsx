
// ILL/Primitive/Media (node 1954:334). "Layout variants represent
// recurring crop structures only; imagery remains data." Renders a real
// image when supplied, otherwise a neutral placeholder block — per the
// kit's instruction to use a clearly replaceable placeholder rather than
// inventing a permanent asset when product imagery is missing.
interface MediaProps {
  src?: string;
  alt: string;
}

export function Media({ src, alt }: MediaProps) {
  if (src) {
    // The source also letterboxes its square product cutouts (`sdm-ill-media--cutout`); none of these visuals show one.
    return <img className="sdm-ill-media" src={src} alt={alt} />;
  }

  return <div className="sdm-ill-media sdm-ill-media--placeholder" role="img" aria-label={alt} />;
}
