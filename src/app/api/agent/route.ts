import { startAgent, stopAgent, getAgentStatus } from "@/lib/agent/scheduler";
import { generateDailyBatch, generateInstagramReel, generateEcommerceListing } from "@/lib/agent/content-generator";
import { postPendingContent } from "@/lib/agent/instagram-poster";
import { generateCreative, generateCreativeBatch, generateFromPrompt, getCreatives } from "@/lib/agent/creative-generator";
import { getConfig, updateConfig, getContentQueue, getPendingContent, getLogs, getStats, addLog, updateContent } from "@/lib/agent/storage";
import { getUpcomingEvents, getNextBigEvent, getAllCompetitors, getMarketGaps, getCalendarSummary } from "@/lib/agent/marketing-intelligence";
import { getAllGaps, getPriorityGaps, getRoadmap, generateGapBatch } from "@/lib/agent/market-gaps";
import playbook from "@/data/growth-playbook.json";
import creativePlaybook from "@/data/creative-team-playbook.json";
import { runCreativeTeam, runAgent, getAgentProfiles } from "@/lib/agent/creative-agents";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  switch (action) {
    case "status":
      return Response.json({ status: getAgentStatus(), config: getConfig(), stats: getStats() });

    case "queue":
      return Response.json({ items: getContentQueue() });

    case "pending":
      return Response.json({ items: getPendingContent() });

    case "logs":
      const limit = Number(url.searchParams.get("limit")) || 50;
      return Response.json({ logs: getLogs(limit) });

    case "creatives":
      return Response.json({ creatives: getCreatives() });

    case "calendar":
      return Response.json({ events: getUpcomingEvents(60), nextBig: getNextBigEvent() });

    case "competitors":
      return Response.json({ competitors: getAllCompetitors(), gaps: getMarketGaps() });

    case "gaps":
      return Response.json({ gaps: getAllGaps(), priority: getPriorityGaps(), roadmap: getRoadmap() });

    case "playbook":
      return Response.json(playbook);

    case "creative-playbook":
      return Response.json(creativePlaybook);

    case "creative-agents":
      return Response.json({ agents: getAgentProfiles() });

    default:
      return Response.json({ error: "Unknown action. Use ?action=status|queue|pending|logs|creatives|calendar|competitors" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  switch (action) {
    case "start":
      startAgent();
      updateConfig({ schedule: { ...getConfig().schedule, enabled: true } });
      addLog("manual-start", "Agent started via API", "info");
      return Response.json({ success: true, status: getAgentStatus() });

    case "stop":
      stopAgent();
      updateConfig({ schedule: { ...getConfig().schedule, enabled: false } });
      addLog("manual-stop", "Agent stopped via API", "info");
      return Response.json({ success: true, status: getAgentStatus() });

    case "generate-posts":
      try {
        generateDailyBatch();
        return Response.json({ success: true, count: getPendingContent().length });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "generate-reel":
      try {
        generateInstagramReel();
        return Response.json({ success: true });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "generate-listing": {
      try {
        const body = await request.json().catch(() => ({}));
        const platform = (body.platform as string) || "amazon";
        generateEcommerceListing(platform as never);
        return Response.json({ success: true });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }
    }

    case "post-pending":
      try {
        const { posted, failed } = await postPendingContent();
        return Response.json({ ok: true, posted, failed });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "update-config":
      try {
        const body = await request.json();
        updateConfig(body);
        return Response.json({ success: true, config: getConfig() });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "generate-creative":
      try {
        const result = await generateCreative();
        return Response.json({ success: true, creative: result });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "generate-creative-batch":
      try {
        const body = await request.json().catch(() => ({}));
        const count = body.count || 2;
        generateCreativeBatch(count);
        return Response.json({ success: true, generated: count });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "generate-custom-creative":
      try {
        const body = await request.json();
        const result = await generateFromPrompt(
          body.prompt,
          body.title || "Custom Creative",
          body.type || "image",
          body.platform || "instagram"
        );
        return Response.json({ success: true, creative: result });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "approve":
      try {
        const { id } = await request.json();
        const updated = updateContent(id, { status: "approved" });
        if (!updated) return Response.json({ success: false, error: "Not found" }, { status: 404 });
        addLog("content-approved", `Approved: ${updated.title}`, "success");
        return Response.json({ success: true, item: updated });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "reject":
      try {
        const { id } = await request.json();
        const updated = updateContent(id, { status: "failed", error: "Rejected by user" });
        if (!updated) return Response.json({ success: false, error: "Not found" }, { status: 404 });
        addLog("content-rejected", `Rejected: ${updated.title}`, "info");
        return Response.json({ success: true, item: updated });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "approve-all":
      try {
        const queue = getContentQueue().filter(i => i.status === "pending");
        for (const item of queue) {
          updateContent(item.id, { status: "approved" });
        }
        addLog("bulk-approve", `Approved ${queue.length} items`, "success");
        return Response.json({ success: true, count: queue.length });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "generate-gaps":
      try {
        generateGapBatch();
        return Response.json({ success: true, count: getPriorityGaps().length });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "run-creative-team":
      try {
        await runCreativeTeam();
        return Response.json({ success: true, agents: 8 });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    case "run-agent":
      try {
        const body2 = await request.json();
        const agentId = body2.agent as string;
        await runAgent(agentId as never);
        return Response.json({ success: true, agent: agentId });
      } catch (err) {
        return Response.json({ success: false, error: String(err) }, { status: 500 });
      }

    default:
      return Response.json({ error: "Unknown action" }, { status: 400 });
  }
}
