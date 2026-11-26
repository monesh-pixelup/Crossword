import { getCloudflareContext } from "@opennextjs/cloudflare";
import { waitlistEmail } from "@/modules/waitlist";

/** The parts of Cloudflare's bindings this route uses (the full types live in @cloudflare/workers-types). */
type Email = {
  send(message: {
    to: string;
    from: { email: string; name: string };
    replyTo?: string;
    subject: string;
    text: string;
  }): Promise<{ messageId: string }>;
};
type D1 = {
  prepare(sql: string): { bind(...values: unknown[]): { run(): Promise<unknown> }; run(): Promise<unknown> };
};

const clean = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, 200) : "");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/waitlist: a signup from the waitlist page (name, work email, store URL). Each one is saved first, in the
 * table waitlist_signups of the site's D1 database (with the host it came from, since previews share that database),
 * so a failed email loses nobody; then it is emailed to the team through Cloudflare Email Service (binding EMAIL).
 * The signup counts as received if either step works.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const storeUrl = clean(body.storeUrl);
  // The hidden "company" field is left empty by people; a bot that fills it gets a quiet success.
  if (clean(body.company)) return Response.json({ ok: true });
  if (!name || !storeUrl || !emailPattern.test(email)) {
    return Response.json({ error: "Name, a valid work email and a store URL are required" }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const host = new URL(request.url).host;
  const at = new Date().toISOString();

  let saved = false;
  const db = (env as { NEXT_TAG_CACHE_D1?: D1 }).NEXT_TAG_CACHE_D1;
  if (db) {
    try {
      await db
        .prepare(
          "CREATE TABLE IF NOT EXISTS waitlist_signups (id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, host TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, store_url TEXT NOT NULL)",
        )
        .run();
      await db
        .prepare("INSERT INTO waitlist_signups (created_at, host, name, email, store_url) VALUES (?, ?, ?, ?, ?)")
        .bind(at, host, name, email, storeUrl)
        .run();
      saved = true;
    } catch (error) {
      console.error("waitlist: saving the signup failed", error);
    }
  }

  let sent = false;
  const mailer = (env as { EMAIL?: Email }).EMAIL;
  if (mailer) {
    try {
      await mailer.send({
        to: waitlistEmail.to,
        from: waitlistEmail.from,
        replyTo: email,
        subject: `Waitlist signup: ${name} (${storeUrl})`,
        text: `New waitlist signup on ${host}\n\nName: ${name}\nWork email: ${email}\nStore URL: ${storeUrl}\nTime: ${at}\n`,
      });
      sent = true;
    } catch (error) {
      console.error("waitlist: sending the email failed", error);
    }
  } else {
    console.error("waitlist: no EMAIL binding, so no email was sent");
  }

  // Workers Logs keep this line too, so a signup is never lost even if both steps fail.
  console.log("waitlist signup", JSON.stringify({ at, host, name, email, storeUrl, saved, sent }));
  if (!saved && !sent) return Response.json({ error: "Could not record the signup" }, { status: 502 });
  // saved/sent say which step worked, so a test signup shows whether email is set up.
  return Response.json({ ok: true, saved, sent });
}
