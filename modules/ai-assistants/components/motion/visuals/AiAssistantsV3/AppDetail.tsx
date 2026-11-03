import googleDriveLogoImage from "@/modules/ai-assistants/assets/motion/integrations/google-drive.svg";
import googleCalendarLogoImage from "@/modules/ai-assistants/assets/motion/integrations/google-calendar.svg";
import spotifyLogoImage from "@/modules/ai-assistants/assets/motion/integrations/spotify.svg";
import slackLogoImage from "@/modules/ai-assistants/assets/motion/integrations/slack.svg";
import gmailLogoImage from "@/modules/ai-assistants/assets/motion/integrations/gmail.svg";
import githubLogoImage from "@/modules/ai-assistants/assets/motion/integrations/github.svg";
import figmaLogoImage from "@/modules/ai-assistants/assets/motion/integrations/figma.svg";
import { BrowserBar } from "../AiAssistants/AiAssistants";
import { Mark } from "./MobileCommerce";


const googleDriveLogo = googleDriveLogoImage.src;
const googleCalendarLogo = googleCalendarLogoImage.src;
const spotifyLogo = spotifyLogoImage.src;
const slackLogo = slackLogoImage.src;
const gmailLogo = gmailLogoImage.src;
const githubLogo = githubLogoImage.src;
const figmaLogo = figmaLogoImage.src;

// 11 · Your brand, inside ChatGPT — ChatGPT's plugin detail page
// (Customize → Plugins → Sorelle Labs). The page is laid out at ChatGPT's own
// desktop sizes in a 1440px-wide viewport and scaled down into 05/06's
// window (as the phones in 07–10 are), so its spacing, type and
// proportions stay ChatGPT's rather than being shrunk by hand. The window
// runs off the frame's bottom edge, cropping the page between sections.
// Sorelle Labs shows only through its mark, its sand accent and the hero
// wash; installed services retain their original logo artwork.

const Svg = ({ size = 18, children }: { size?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
const chevron = <Svg size={14}><path d="M9 6l6 6-6 6" /></Svg>;
const plug = <><circle cx="12" cy="12" r="3.5" /><path d="M15.5 12v1.5a2.5 2.5 0 005 0V12a8.5 8.5 0 10-3.3 6.7" /></>;
const compose = <><path d="M12 4.5H7a2.5 2.5 0 00-2.5 2.5v10A2.5 2.5 0 007 19.5h10a2.5 2.5 0 002.5-2.5v-5" /><path d="M17.5 4.5l2 2-7 7H10.5v-2z" /></>;
const search = <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>;

const installed = [
  { name: "Google Drive", logo: googleDriveLogo },
  { name: "Google Calendar", logo: googleCalendarLogo },
  { name: "Spotify", logo: spotifyLogo },
  { name: "Slack", logo: slackLogo },
  { name: "Gmail", logo: gmailLogo },
  { name: "GitHub", logo: githubLogo },
  { name: "Figma", logo: figmaLogo },
];

const prompts = ["Help me choose a serum for my daily routine.", "Compare moisturisers under $55."];

// `className` (motion) scopes the reveal onto the window; unset on the static.
export function V3AppDetail({ className }: { className?: string } = {}) {
  const name = "11 · Your brand, inside ChatGPT";
  return (
    <section className="aiv3-section" data-name={name}>
      <figure className="aiv3-figure">
        <figcaption className="app-stage__tile-label">{name}</figcaption>
        <div className="aiv3w-canvas apd-canvas">
          <div className={className ? `aia aiv3 aiv3w apd ${className}` : "aia aiv3 aiv3w apd"} data-name={name}>
            <BrowserBar />
            <div className="aia-gpt apd-page" data-name="ChatGPT / Plugin detail">
              <div className="apd-vp">
                <nav className="apd-rail" data-name="Sidebar (collapsed)">
                  <span><Svg><rect x="3.5" y="4.5" width="17" height="15" rx="3" /><path d="M9.5 4.5v15" /></Svg></span>
                  <span><Svg>{compose}</Svg></span>
                  <span><Svg>{search}</Svg></span>
                  <span className="is-on"><Svg>{plug}</Svg></span>
                </nav>

                <nav className="apd-side" data-name="Customize">
                  <p className="apd-side__title">Customize<Svg>{search}</Svg></p>
                  <p className="apd-nav"><Svg>{plug}</Svg>Plugins</p>
                  <p className="apd-nav"><Svg><path d="M12 3.5l7.5 4.25v8.5L12 20.5l-7.5-4.25v-8.5z" /><path d="M12 12l7.5-4.25M12 12v8.5M12 12L4.5 7.75" /></Svg>Skills</p>
                  <p className="apd-side__group">Installed</p>
                  {installed.map(({ name, logo }) => (
                    <p key={name} className="apd-nav"><img className="apd-tile" src={logo} alt="" />{name}</p>
                  ))}
                  <p className="apd-nav is-on"><Mark brand="sorelle-labs" size={18} />Sorelle Labs</p>
                </nav>

                <main className="apd-main">
                  <p className="apd-crumbs">Plugins{chevron}Shopping{chevron}<b>Sorelle Labs</b></p>
                  <div className="apd-col">
                    <Mark brand="sorelle-labs" size={64} />
                    <div className="apd-id">
                      <b>Sorelle Labs</b>
                      <span className="apd-id__end">
                        <span className="apd-more"><Svg><circle cx="5.5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="18.5" cy="12" r="1" /></Svg></span>
                        <span className="apd-btn"><Svg size={16}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></Svg>Manage</span>
                        <span className="apd-btn apd-btn--primary"><Svg size={16}>{compose}</Svg>Try now</span>
                      </span>
                    </div>
                    <p className="apd-tagline">Shop serums, moisturisers and daily skincare.</p>

                    <div className="apd-hero" data-name="Suggested prompts">
                      {prompts.map((p) => (
                        <p key={p} className="apd-prompt">
                          <span><span className="apd-prompt__app"><Mark brand="sorelle-labs" size={16} />Sorelle Labs</span> {p}</span>
                          <span className="apd-prompt__go"><Svg size={16}><path d="M5 12h14M13 6l6 6-6 6" /></Svg></span>
                        </p>
                      ))}
                    </div>

                    <p className="apd-copy">Sorelle Labs makes serums, moisturisers and skincare regimens. Products, stock and prices come from Sorelle Labs's catalog; for warranty and return details, see each product page. Responses are powered by ChatGPT.</p>
                    <p className="apd-copy">By clicking "Connect", you agree to Sorelle Labs's Terms of Use and Privacy Policy.</p>

                    <p className="apd-h">Apps <span>1</span></p>
                    <div className="apd-app" data-name="Installed app">
                      <Mark brand="sorelle-labs" size={32} />
                      <span className="apd-app__text"><b>Sorelle Labs</b><small>Find, compare and buy Sorelle Labs skincare, and track your orders.</small></span>
                      <span className="apd-status"><i />Connected<Svg size={16}><path d="M7 10l5 5 5-5" /></Svg></span>
                    </div>

                    <p className="apd-h">Information</p>
                    <dl className="apd-info">
                      <div><dt>Developer</dt><dd>Sorelle Labs Inc.</dd></div>
                      <div><dt>Category</dt><dd>Shopping</dd></div>
                      <div><dt>Website</dt><dd>sorellelabs.com</dd></div>
                    </dl>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </section>
  );
}
