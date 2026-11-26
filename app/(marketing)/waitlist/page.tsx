import type { Metadata } from "next";
import { WaitlistForm, WaitlistHero } from "@/modules/waitlist";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description: "Early-stage ecommerce brands doing under $1M in annual online revenue can join the waitlist for free access to Crossword.",
};

/** Page · Waitlist: the hero, then the signup form (name, work email, store URL), emailed to the team on submit. */
export default function WaitlistPage() {
  return (
    <main data-no-curtain>
      <WaitlistHero />
      <WaitlistForm />
    </main>
  );
}
