import { schedule, ScheduledTask } from "node-cron";
import { getConfig, addLog } from "./storage";
import {
  generateDailyBatch,
  generateInstagramReel,
  generateInstagramStories,
  generateEcommerceListing,
} from "./content-generator";
import { postPendingContent } from "./instagram-poster";
import { generateCreativeBatch } from "./creative-generator";

let postTask: ScheduledTask | null = null;
let reelTask: ScheduledTask | null = null;
let listingTask: ScheduledTask | null = null;
let postingTask: ScheduledTask | null = null;
let creativeTask: ScheduledTask | null = null;

export function startAgent(): void {
  const config = getConfig();
  if (!config.schedule.enabled) {
    console.log("Agent is disabled in config. Set AGENT_ENABLED=true to start.");
    return;
  }

  if (postTask) postTask.stop();
  if (reelTask) reelTask.stop();
  if (listingTask) listingTask.stop();
  if (postingTask) postingTask.stop();
  if (creativeTask) creativeTask.stop();

  postTask = schedule(config.schedule.cronPost, () => {
    console.log(`[Agent] Generating daily batch at ${new Date().toISOString()}`);
    generateDailyBatch();
    addLog("generate-daily", "Generated daily Instagram content batch", "success");
  });

  reelTask = schedule(config.schedule.cronReel, () => {
    console.log(`[Agent] Generating reel at ${new Date().toISOString()}`);
    generateInstagramReel();
    generateInstagramStories(1);
    addLog("generate-reel", "Generated Instagram reel + story", "success");
  });

  listingTask = schedule(config.schedule.cronListing, () => {
    console.log(`[Agent] Generating listings at ${new Date().toISOString()}`);
    const platforms = ["amazon", "blinkit", "zepto", "ajio", "jiomart"] as const;
    for (const platform of platforms) {
      generateEcommerceListing(platform);
    }
    addLog("generate-listings", "Generated e-commerce listing copies for all platforms", "success");
  });

  creativeTask = schedule(config.schedule.cronCreative, () => {
    console.log(`[Agent] Generating creatives at ${new Date().toISOString()}`);
    generateCreativeBatch(2);
    addLog("generate-creatives", "Generated image/video creative prompts via Gemini", "success");
  });

  postingTask = schedule("0 */4 * * *", async () => {
    console.log(`[Agent] Posting pending content at ${new Date().toISOString()}`);
    await postPendingContent();
  });

  console.log("Agent started with schedule:");
  console.log(`  Posts:     ${config.schedule.cronPost}`);
  console.log(`  Reels:     ${config.schedule.cronReel}`);
  console.log(`  Listings:  ${config.schedule.cronListing}`);
  console.log(`  Creatives: ${config.schedule.cronCreative}`);
  console.log(`  Posting:   every 4 hours`);

  const now = new Date();
  generateDailyBatch();
  addLog("agent-started", `Agent started at ${now.toISOString()}`, "info");
}

export function stopAgent(): void {
  postTask?.stop();
  reelTask?.stop();
  listingTask?.stop();
  postingTask?.stop();
  creativeTask?.stop();
  postTask = null;
  reelTask = null;
  listingTask = null;
  postingTask = null;
  creativeTask = null;
  addLog("agent-stopped", "Agent stopped", "info");
  console.log("Agent stopped.");
}

export function getAgentStatus(): { running: boolean } {
  return { running: postTask !== null };
}
