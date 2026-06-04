export interface AgentConfig {
  instagram: {
    accessToken: string;
    accountId: string;
    isConfigured: boolean;
    lastSyncedAt: string | null;
  };
  gemini: {
    apiKey: string;
    isConfigured: boolean;
  };
  platforms: Record<string, {
    apiKey: string;
    isActive: boolean;
    config: Record<string, unknown>;
  }>;
  schedule: {
    postsPerDay: number;
    enabled: boolean;
    cronPost: string;
    cronReel: string;
    cronListing: string;
    cronCreative: string;
  };
}

export interface CreativeItem {
  id: string;
  title: string;
  type: "image" | "video" | "carousel-visual";
  prompt: string;
  description: string;
  platform: "instagram" | "amazon" | "website";
  status: "pending" | "generated" | "used" | "archived";
  colorPalette: string[];
  mood: string;
  dimensions: string;
  generatedUrl: string | null;
  createdAt: string;
}

export interface ContentItem {
  id: string;
  platform: "instagram" | "amazon" | "blinkit" | "zepto" | "ajio" | "jiomart";
  type: "post" | "reel" | "story" | "carousel" | "listing";
  title: string;
  caption: string;
  hashtags: string[];
  mediaText: string[];
  status: "pending" | "approved" | "posted" | "failed";
  scheduledAt: string | null;
  postedAt: string | null;
  postUrl: string | null;
  error: string | null;
  createdAt: string;
}

export type ContentStatus = ContentItem["status"];
export type Platform = ContentItem["platform"];
export type ContentType = ContentItem["type"];

export interface AgentLogEntry {
  id: string;
  action: string;
  details: string;
  status: "success" | "error" | "info";
  createdAt: string;
}

export interface InstagramPost {
  caption: string;
  hashtags: string[];
  mediaText: string[];
  scheduledFor: string;
  type: ContentType;
}
