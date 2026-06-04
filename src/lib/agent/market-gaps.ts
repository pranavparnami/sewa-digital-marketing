import gaps from "@/data/market-gaps.json";
import { addContent, addLog } from "./storage";

interface MarketGap {
  id: string;
  gap: string;
  strategy: string;
  tactics: string[];
  contentTemplates: string[];
  kpis: string[];
}

export function getAllGaps(): MarketGap[] {
  return gaps.gaps;
}

export function getPriorityGaps(): MarketGap[] {
  const priority = gaps.priorityRoadmap.now;
  return gaps.gaps.filter((g) => priority.includes(g.id));
}

export function getGapById(id: string): MarketGap | undefined {
  return gaps.gaps.find((g) => g.id === id);
}

export function getRoadmap() {
  return gaps.priorityRoadmap;
}

export function generateGapContent(gapId: string): void {
  const gap = getGapById(gapId);
  if (!gap || !gap.contentTemplates.length) return;

  const template = gap.contentTemplates[
    Math.floor(Math.random() * gap.contentTemplates.length)
  ];

  const match = template.match(/^(.+?)\s(POST|CAROUSEL|REEL|STORY|BLOG):\s(.+)$/);
  if (!match) return;

  const [, emoji, type, caption] = match;
  const typeMap: Record<string, "post" | "reel" | "story"> = {
    POST: "post", CAROUSEL: "post", REEL: "reel", STORY: "story", BLOG: "post",
  };

  const hashtags = ["#SEWA", "#CleanLuxury", "#MarketGap", "#GrowthStrategy"];

  addContent({
    platform: "instagram",
    type: typeMap[type] || "post",
    title: `${gap.gap.slice(0, 40)}`,
    caption,
    hashtags,
    mediaText: [
      `📸 ${emoji} ${type} for market gap: ${gap.gap}. Premium SEWA styled content. Size: ${type === "REEL" ? "1080x1920" : "1080x1080"}px.`,
    ],
    status: "pending",
    scheduledAt: null,
    postedAt: null,
    postUrl: null,
    error: null,
  });

  addLog("gap-content", `Generated content for gap: ${gap.gap.slice(0, 60)}`, "success");
}

export function generateGapBatch(): void {
  const priority = getPriorityGaps();
  for (const gap of priority) {
    generateGapContent(gap.id);
  }
}
