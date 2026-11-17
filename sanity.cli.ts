/** For the `npx sanity …` commands (e.g. importing sanity/seed/blog.ndjson). */
import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // The Studio hosted at crossword.sanity.studio (`npm run studio:deploy`).
  deployment: { appId: "b3ewxlg9xqveebdd7exd9p0w" },
});
