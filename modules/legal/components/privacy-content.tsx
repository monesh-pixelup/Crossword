import type { ReactNode } from "react";

/*
 * The Privacy Policy's text (the Crossword Privacy Policy, last updated October 26, 2026), set in the type and spacing
 * of Figma "Privacy" (1662:8194 → 1667:9218): Geist Light 16/24 copy, Crimson 22 caps sub-heads (h3), and each numbered
 * section (Tangerine numeral, Parisienne swash and Crimson Light 32, an h2) 40px from a black/20 rule. Each section
 * carries an id (section-01 … section-15) for the sidebar's contents (PrivacyBody lists the same titles). Underlined
 * maroon text is a link.
 */

const copy = "[word-break:break-word] font-sans font-light leading-[24px] relative shrink-0 text-[16px] text-black tracking-[-0.32px] w-full";

/** A paragraph of copy. */
function P({ children }: { children: ReactNode }) {
  return <p className={copy}>{children}</p>;
}

/** An underlined maroon link. */
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-sans font-normal leading-[24px] text-[#7d0034] underline hover:opacity-70"
    >
      {children}
    </a>
  );
}

/** A sub-head (Crimson 22 caps) 4px over its copy. */
function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <h3 className="[word-break:break-word] font-serif font-normal leading-[1.1] relative shrink-0 text-[#141414] text-[22px] tracking-[-1.1px] uppercase w-full">
        {title}
      </h3>
      {children}
    </div>
  );
}

/** A numbered section: the rule, then its numeral and title (the first letter a swash) 24px over its blocks, 24px apart. */
function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const number = String(n).padStart(2, "0");
  return (
    <>
      <hr className="h-0 w-full shrink-0 border-0 border-t border-black/20" />
      <div className="flex flex-col items-start relative shrink-0 w-full scroll-mt-[112px]" id={`section-${number}`}>
        <div className="flex flex-col items-start pb-[24px] relative shrink-0 w-full">
          <div className="[word-break:break-word] flex gap-[16px] items-center relative shrink-0 w-full md:whitespace-nowrap max-md:items-baseline">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-calligraphy leading-[1.1] not-italic relative shrink-0 text-[#353535] text-[48px] max-md:text-[40px] tracking-[-2.4px]">
              {number}
            </p>
            <h2 className="font-serif font-light leading-[0] relative min-w-0 md:shrink-0 text-[#040404] text-[0px] tracking-[-1.28px]">
              <span className="font-script leading-[1.18] not-italic text-[#141414] text-[53px] max-md:text-[42px]">{title[0]}</span>
              <span className="leading-[1.1] text-[32px] max-md:text-[26px]">{title.slice(1)}</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">{children}</div>
      </div>
    </>
  );
}

/** Section 1's lettered kinds of Personal Information: the letter, then what it covers. */
const collected: [string, string, string][] = [
  [
    "(a)",
    "Contact and account information",
    ", such as your name, email address, phone number, company, job title and login details, including where you sign in through a third-party service;",
  ],
  ["(b)", "Financial information", ", such as billing details collected through our payment providers;"],
  [
    "(c)",
    "Usage and device information",
    ", such as IP address, device and browser type, referring URLs, approximate location and information about your interactions with the Services;",
  ],
  [
    "(d)",
    "Communications",
    ", such as the content of your emails, chats, calls and video calls with us (which we may record), and any files you share;",
  ],
  [
    "(e)",
    "Customer and End User information",
    ", such as conversations between End Users and Crossword agents, End User activity on sites where Crossword is installed, and information made available through platforms our customers connect, such as product catalogs and inventory, orders and order history, purchase and checkout events, shipping addresses, and customer names and contact details;",
  ],
  ["(f)", "Employment information", ", if you apply for a role with us; and"],
  ["(g)", "Inferences", " drawn from any of the above."],
];

export function PrivacyContent() {
  return (
    <div className="flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
        <P>
          CometChat Inc., doing business as Crossword (“Crossword”, “we”, “us” or “our”), provides Crossword, an artificial
          intelligence platform that helps businesses engage, support and sell to their customers. This Privacy Policy
          describes how we collect, use and share Personal Information through the Crossword websites, dashboard, widgets,
          agents, APIs and any other sites or services that link to this Privacy Policy (together, the “Services”), and the
          choices available to you.
        </P>
        <P>
          Crossword is the controller of Personal Information that we collect for our own purposes, for example from
          visitors to our websites, prospective customers and users of the Crossword dashboard. When a business uses the
          Services, for example by deploying a Crossword agent or widget on its online store or connecting a platform such
          as Shopify, we process Personal Information about that business’s customers and visitors (“End Users”) on that
          business’s behalf, and that business’s own privacy policy applies to it, except where this Privacy Policy
          describes our own use of that information (see Section 3). If you are an End User, please direct questions and
          requests to the business you interacted with.
        </P>
      </div>

      <Section n={1} title="Personal Information We Collect">
        <P>
          “Personal Information” means information that identifies, relates to, describes, or is reasonably capable of
          being associated with or linked to you or your household. Depending on how you interact with us, we may collect:
        </P>
        <ul className="[word-break:break-word] flex flex-col gap-[8px] font-sans font-light leading-[24px] list-none relative shrink-0 text-[16px] text-black tracking-[-0.32px] w-full">
          {collected.map(([letter, name, rest]) => (
            <li key={letter} className="flex gap-[8px]">
              <span className="w-[24px] shrink-0">{letter}</span>
              <span className="min-w-0">
                <span className="font-medium">{name}</span>
                {rest}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section n={2} title="How We Collect Personal Information">
        <P>
          We collect Personal Information directly from you; automatically, through cookies and similar technologies (see
          Section 5); from our customers and the platforms and systems they connect to the Services; and from third parties
          such as business partners, analytics and advertising providers, data enrichment and website visitor
          identification providers, and publicly available sources.
        </P>
      </Section>

      <Section n={3} title="How We Use Personal Information">
        <P>
          To the extent permitted by applicable law, we may use Personal Information to: provide, operate, maintain and
          secure the Services; create and manage accounts and fulfil requests and purchases; provide customer support;
          communicate with you, including about our products, services and promotions; personalize the Services and our
          marketing; analyze usage, benchmark and conduct research; protect against fraud, abuse, security incidents,
          claims and other liabilities; meet our contractual obligations; comply with law and enforce our terms and
          policies; evaluate job applicants; and for any other purpose disclosed at the time of collection or otherwise
          permitted by law.
        </P>
        <Sub title="Developing and training our AI">
          <P>
            We may de-identify Personal Information, including conversation content and other information processed
            through the Services on behalf of our customers, and use the de-identified information to develop, improve and
            train our products, services and artificial intelligence models, as permitted by our agreements with our
            customers and applicable law. We remove information that identifies individuals before using it to train our
            models, and our customers can opt out of this use.
          </P>
        </Sub>
        <P>
          We may also create de-identified or aggregated information from Personal Information and use it for any lawful
          purpose. We maintain and use de-identified information in de-identified form and do not attempt to re-identify
          it, except as permitted by law.
        </P>
      </Section>

      <Section n={4} title="How We Share Personal Information">
        <P>
          We do not sell Personal Information. We may share Personal Information with: (a) service providers that help us
          operate our business and the Services, such as hosting, AI model, payment, communications and analytics
          providers; (b) the customer whose Services you use, if you are an End User; (c) our affiliates; (d) advertising,
          analytics and visitor identification partners, with your consent where required by law; (e) other parties where
          we believe it is reasonably necessary to comply with law or legal process, enforce our terms, or protect the
          rights, property or safety of Crossword, our customers or others; (f) another party in connection with a merger,
          acquisition, financing, reorganization, spin-off or sale of all or part of our business; and (g) other parties
          with your consent or at your direction.
        </P>
      </Section>

      <Section n={5} title="Cookies and Similar Technologies">
        <P>
          We and our service providers use cookies, pixels, local storage and similar technologies to operate the
          Services, keep you signed in, remember your preferences, understand how the Services are used and, where
          permitted, support our marketing. Where required by law, we ask for your consent before placing non-essential
          cookies, and you can change your choices through the cookie settings on our websites or your browser settings. We
          honor Global Privacy Control signals where required by law.
        </P>
        <P>
          When a customer installs Crossword on its site, our widget may use cookies or local storage on that site to
          operate the Services and remember conversations, and may collect End User activity on that site. The customer is
          responsible for obtaining any consent required from its End Users.
        </P>
      </Section>

      <Section n={6} title="How Long We Keep Personal Information">
        <P>
          We keep Personal Information for as long as necessary for the purposes described in this Privacy Policy, or
          longer where required or permitted by law. In deciding how long to keep it, we consider its nature and
          sensitivity, the purposes for which we hold it, our legal obligations, and the potential risk of harm from
          unauthorized use or disclosure. Personal Information we process on behalf of a customer is kept in accordance
          with our agreement with that customer. De-identified or aggregated information, and AI models trained using
          de-identified information, may be kept after the underlying Personal Information is deleted.
        </P>
      </Section>

      <Section n={7} title="How We Protect Personal Information">
        <P>
          We use technical and organizational measures designed to protect Personal Information, including encryption and
          access controls. Crossword is covered by CometChat’s information security program, which is independently
          audited against recognized industry standards. No method of transmission or storage is completely secure, and we
          cannot guarantee the security of Personal Information.
        </P>
      </Section>

      <Section n={8} title="International Transfers">
        <P>
          We are based in the United States, and we, our affiliates and our service providers process Personal Information
          in the United States, India and other countries, which may have data protection laws different from those where
          you live. Where required, we protect transfers with appropriate safeguards, such as the European Commission’s
          Standard Contractual Clauses and the UK International Data Transfer Agreement or Addendum.
        </P>
      </Section>

      <Section n={9} title="Your Rights and Choices">
        <P>
          Depending on where you live, you may have the right to access, correct, delete or receive a copy of your
          Personal Information; to restrict or object to certain processing; to withdraw consent; to opt out of targeted
          advertising or the “sharing” of your Personal Information; to opt out of certain automated decision-making; and
          to limit the use of sensitive personal information. You may opt out of marketing emails using the unsubscribe
          link in them; we may still send you service-related messages.
        </P>
        <P>
          To make a request, email us at the address in Section 15. We will verify your identity before fulfilling most
          requests, and an authorized agent must provide proof of authority. We may deny or partly fulfil a request where
          permitted or required by law. Requests to opt out of sharing do not require verification. If you disagree with
          our response, you may appeal by emailing us with the subject line “Privacy Request Appeal”, and then contact your
          local regulator. We will not discriminate against you for exercising your rights.
        </P>
        <P>
          If you are an End User, please make requests to the business you interacted with. We will assist that business
          as required by our agreement with it and applicable law.
        </P>
      </Section>

      <Section n={10} title="Additional Information for Certain Regions">
        <Sub title="California">
          <P>
            In the past 12 months, we have collected the following categories of Personal Information under the California
            Consumer Privacy Act: identifiers; customer records; commercial information; internet or other network
            activity; approximate geolocation; audio and electronic information; professional or employment information;
            inferences; and sensitive personal information (account login credentials). The sources, purposes and
            recipients of this information are described in Sections 2, 3 and 4. We may “share” identifiers, internet or
            other network activity, and professional information with advertising and visitor identification partners; you
            can opt out as described in Sections 5 and 9. We use sensitive personal information only as permitted by law.
            We have no actual knowledge of selling or sharing the Personal Information of consumers under 16. You may also
            contact the California Privacy Protection Agency or the California Attorney General.
          </P>
        </Sub>
        <Sub title="EU and UK">
          <P>
            We rely on the following legal bases: performance of a contract with you; our legitimate interests, including
            operating, securing, improving and developing our Services and AI models and business-to-business marketing,
            where those interests are not overridden by your rights; compliance with legal obligations; and your consent,
            which you may withdraw at any time. You may lodge a complaint with your data protection supervisory authority.
            Our EU and UK representatives are listed in Section 15.
          </P>
        </Sub>
        <Sub title="Canada">
          <P>
            By providing Personal Information to us, you consent to its collection, use and disclosure as described in this
            Privacy Policy, subject to applicable law. Personal Information processed outside Canada may be accessible to
            courts, law enforcement and regulators in those countries.
          </P>
        </Sub>
      </Section>

      <Section n={11} title="AI Features and Automated Decision-Making">
        <P>
          Crossword uses AI models to generate responses, recommend products and carry out tasks configured by our
          customers. AI-generated output may be inaccurate or incomplete. We do not make decisions that produce legal or
          similarly significant effects about individuals based solely on automated processing. Our customers are
          responsible for providing their End Users with any notices required by law, including that they are interacting
          with AI.
        </P>
      </Section>

      <Section n={12} title="Children’s Privacy">
        <P>
          The Services are intended for businesses. We do not knowingly collect Personal Information from children under
          16, and if we learn that we have, we will take steps to delete it. Our customers are responsible for complying
          with laws that protect children, and we may require remediation or suspend the Services if a customer fails to do
          so.
        </P>
      </Section>

      <Section n={13} title="Third-Party Sites and Services">
        <P>
          The Services may link to or integrate with sites and services operated by others, including our customers’
          stores. We are not responsible for their practices, and their own privacy policies apply.
        </P>
      </Section>

      <Section n={14} title="Changes to This Privacy Policy">
        <P>
          We may update this Privacy Policy from time to time. We will post material changes in advance of their effective
          date and provide additional notice where required by law. Other changes take effect when posted.
        </P>
      </Section>

      <Section n={15} title="Contact Us">
        <P>
          CometChat Inc., doing business as Crossword, 1580 North Logan Street, Ste 660 PMB 43373, Denver, Colorado 80203,
          United States. Email: <A href="mailto:legal@crossword.ai">legal@crossword.ai</A>
        </P>
        <P>
          <span className="font-medium">EU representative:</span> Rickert Rechtsanwaltsgesellschaft mbH, Colmantstraße 15,
          53115 Bonn, Germany (<A href="mailto:datenschutz@rickert.net">datenschutz@rickert.net</A>).
        </P>
        <P>
          <span className="font-medium">UK representative:</span> Rickert Services Ltd UK, PO Box 1487, Peterborough, PE1
          9XX, United Kingdom (<A href="mailto:datenschutz@rickert.net">datenschutz@rickert.net</A>).
        </P>
        <P>
          <span className="font-medium">Data Protection Officer:</span> Lyn Glaxco (
          <A href="mailto:lyn.glaxco@cometchat.com">lyn.glaxco@cometchat.com</A>)
        </P>
      </Section>
    </div>
  );
}
