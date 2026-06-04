import { getConfig, updateContent, addLog } from "./storage";
import type { ContentItem } from "./types";

interface InstagramMediaResponse {
  id?: string;
  error?: { message: string };
}

export async function postToInstagram(item: ContentItem): Promise<boolean> {
  const config = getConfig();
  const { accessToken, accountId, isConfigured } = config.instagram;

  if (!isConfigured || !accessToken || !accountId) {
    addLog("instagram-post-skipped", `No Instagram credentials configured for item ${item.id}`, "info");
    return false;
  }

  try {
    const baseUrl = `https://graph.instagram.com/v22.0/${accountId}`;
    const isReel = item.type === "reel";

    let mediaResponse: InstagramMediaResponse;

    if (isReel) {
      const res = await fetch(`${baseUrl}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "REELS",
          video_url: "", // Placeholder — real video URL needed
          caption: `${item.caption}\n\n${item.hashtags.join(" ")}`,
          access_token: accessToken,
        }),
      });
      mediaResponse = (await res.json()) as InstagramMediaResponse;
    } else if (item.type === "carousel") {
      const children: Array<{ media_type: string; image_url?: string; video_url?: string }> =
        item.mediaText.slice(0, 10).map(() => ({
          media_type: "IMAGE",
          image_url: "", // Placeholder — real image URL needed
        }));

      const createRes = await fetch(`${baseUrl}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "CAROUSEL",
          children,
          caption: `${item.caption}\n\n${item.hashtags.join(" ")}`,
          access_token: accessToken,
        }),
      });
      const createJson = (await createRes.json()) as InstagramMediaResponse;
      if (createJson.error) {
        throw new Error(createJson.error.message);
      }

      const publishRes = await fetch(`${baseUrl}/media_publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: createJson.id,
          access_token: accessToken,
        }),
      });
      mediaResponse = (await publishRes.json()) as InstagramMediaResponse;
    } else {
      const payload: Record<string, unknown> = {
        image_url: "", // Placeholder — real image URL needed
        caption: `${item.caption}\n\n${item.hashtags.join(" ")}`,
        access_token: accessToken,
      };

      const res = await fetch(`${baseUrl}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const createJson = (await res.json()) as InstagramMediaResponse;
      if (createJson.error) {
        throw new Error(createJson.error.message);
      }

      const publishRes = await fetch(`${baseUrl}/media_publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: createJson.id,
          access_token: accessToken,
        }),
      });
      mediaResponse = (await publishRes.json()) as InstagramMediaResponse;
    }

    if (mediaResponse.error) {
      throw new Error(mediaResponse.error.message);
    }

    updateContent(item.id, {
      status: "posted",
      postedAt: new Date().toISOString(),
      postUrl: `https://www.instagram.com/p/${mediaResponse.id}/`,
    });

    addLog("instagram-posted", `Posted ${item.type}: ${item.title}`, "success");
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    updateContent(item.id, { status: "failed", error: message });
    addLog("instagram-failed", `${item.type} "${item.title}" — ${message}`, "error");
    return false;
  }
}

export async function postPendingContent(): Promise<{ posted: number; failed: number }> {
  const { getContentQueue } = await import("./storage");
  const approved = getContentQueue().filter(
    (i) => i.platform === "instagram" && i.status === "approved"
  );

  let posted = 0;
  let failed = 0;

  for (const item of approved) {
    const ok = await postToInstagram(item);
    if (ok) posted++;
    else failed++;
  }

  if (posted > 0 || failed > 0) {
    addLog("batch-post-complete", `Posted ${posted}, failed ${failed}`, posted > 0 ? "success" : "error");
  }

  return { posted, failed };
}
