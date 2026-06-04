import { generateDailyBatch } from "@/lib/agent/content-generator";
import { generateCreativeBatch } from "@/lib/agent/creative-generator";
import { addLog } from "@/lib/agent/storage";

export async function GET() {
  try {
    generateDailyBatch();
    generateCreativeBatch(2);
    addLog("cron-daily", "Daily cron executed — posts + creatives generated", "success");
    return Response.json({ success: true, time: new Date().toISOString() });
  } catch (err) {
    addLog("cron-error", `Cron failed: ${String(err)}`, "error");
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
