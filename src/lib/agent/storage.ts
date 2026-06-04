import fs from "fs";
import path from "path";
import type { ContentItem, AgentConfig, AgentLogEntry } from "./types";

const DATA_DIR = process.env.VERCEL ? "/tmp/.agent-data" : path.join(process.cwd(), ".agent-data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filename: string, defaultValue: T): T {
  ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    writeJson(filename, defaultValue);
    return defaultValue;
  }
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

function writeJson<T>(filename: string, data: T): void {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const defaultConfig: AgentConfig = {
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || "",
    accountId: process.env.INSTAGRAM_ACCOUNT_ID || "",
    isConfigured: false,
    lastSyncedAt: null,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "",
    isConfigured: !!(process.env.GEMINI_API_KEY),
  },
  platforms: {
    amazon: { apiKey: "", isActive: true, config: {} },
    blinkit: { apiKey: "", isActive: true, config: {} },
    zepto: { apiKey: "", isActive: true, config: {} },
    ajio: { apiKey: "", isActive: true, config: {} },
    jiomart: { apiKey: "", isActive: true, config: {} },
  },
  schedule: {
    postsPerDay: Number(process.env.AGENT_POSTS_PER_DAY) || 3,
    enabled: process.env.AGENT_ENABLED !== "false",
    cronPost: process.env.AGENT_CRON_POST || "0 9,14,20 * * *",
    cronReel: process.env.AGENT_CRON_REEL || "0 10 * * *",
    cronListing: process.env.AGENT_CRON_LISTING || "0 8 * * *",
    cronCreative: process.env.AGENT_CRON_CREATIVE || "0 11,17 * * *",
  },
};

export function getConfig(): AgentConfig {
  return readJson("config.json", defaultConfig);
}

export function updateConfig(updates: Partial<AgentConfig>): AgentConfig {
  const config = { ...getConfig(), ...updates };
  writeJson("config.json", config);
  return config;
}

export function getContentQueue(): ContentItem[] {
  return readJson("queue.json", [] as ContentItem[]);
}

export function addContent(item: Omit<ContentItem, "id" | "createdAt">): ContentItem {
  const queue = getContentQueue();
  const newItem: ContentItem = {
    ...item,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  queue.push(newItem);
  writeJson("queue.json", queue);
  return newItem;
}

export function updateContent(id: string, updates: Partial<ContentItem>): ContentItem | null {
  const queue = getContentQueue();
  const index = queue.findIndex((i) => i.id === id);
  if (index === -1) return null;
  queue[index] = { ...queue[index], ...updates };
  writeJson("queue.json", queue);
  return queue[index];
}

export function getPendingContent(): ContentItem[] {
  return getContentQueue().filter((i) => i.status === "pending");
}

export function getContentByPlatform(platform: string): ContentItem[] {
  return getContentQueue().filter((i) => i.platform === platform);
}

export function getLogs(limit = 50): AgentLogEntry[] {
  const logs = readJson("logs.json", [] as AgentLogEntry[]);
  return logs.slice(-limit).reverse();
}

export function addLog(action: string, details: string, status: AgentLogEntry["status"] = "info"): AgentLogEntry {
  const logs = readJson("logs.json", [] as AgentLogEntry[]);
  const entry: AgentLogEntry = {
    id: generateId(),
    action,
    details,
    status,
    createdAt: new Date().toISOString(),
  };
  logs.push(entry);
  writeJson("logs.json", logs.slice(-500));
  return entry;
}

export function getStats() {
  const queue = getContentQueue();
  const now = new Date();
  const today = queue.filter((i) => {
    const created = new Date(i.createdAt);
    return created.toDateString() === now.toDateString();
  });

  return {
    totalGenerated: queue.length,
    totalPosted: queue.filter((i) => i.status === "posted").length,
    totalFailed: queue.filter((i) => i.status === "failed").length,
    pending: queue.filter((i) => i.status === "pending").length,
    todayGenerated: today.length,
    todayPosted: today.filter((i) => i.status === "posted").length,
  };
}
