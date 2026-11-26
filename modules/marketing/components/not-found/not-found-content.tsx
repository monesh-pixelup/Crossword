import { StampButton } from "@/components/ui/stamp-button";
import { TextLink } from "@/components/ui/text-link";

/**
 * The "not found" page's content: a short headline in the waitlist hero's style (Crimson ExtraLight, its first letter
 * a Parisienne swash), one line, and two ways back. app/not-found.tsx wraps it in the site's header and footer;
 * app/(marketing)/not-found.tsx, which the marketing layout already wraps, uses it as it is.
 */
export function NotFoundContent() {
  return (
    <main data-no-curtain>
      <section
        aria-labelledby="not-found-title"
        className="relative overflow-hidden bg-cream"
      >
        <div className="relative content-width flex flex-col items-center gap-5 pt-[71.5px] pb-32 text-center max-md:gap-4 max-md:pt-12 max-md:pb-20">
          <p className="font-sans text-sm tracking-[0.2em] text-maroon uppercase">
            Error 404
          </p>
          <h1
            id="not-found-title"
            className="font-serif text-[clamp(44px,5.556vw,80px)] leading-none font-extralight text-balance text-ink max-md:text-[min(44px,11vw)]"
          >
            <span className="whitespace-nowrap">
              <span className="font-script text-[1.25em] leading-[1.18] font-normal tracking-[0.05em]">
                P
              </span>
              <span className="leading-[1.1] tracking-[-0.05em]">
                age not found
              </span>
            </span>
          </h1>
          <p className="max-w-[560px] font-sans text-lg leading-7 tracking-[-0.02em] text-pretty text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
            This page doesn&rsquo;t exist, or it has moved. The blog and the
            home page are good places to start again.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <StampButton href="/">BACK TO HOME</StampButton>
            <TextLink href="/blog">Read the blog</TextLink>
          </div>
        </div>
      </section>
    </main>
  );
}
