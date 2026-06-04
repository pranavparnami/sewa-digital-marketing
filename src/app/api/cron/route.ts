import { generateDailyBatch } from "@/lib/agent/content-generator";
import { generateCreativeBatch } from "@/lib/agent/creative-generator";
import { addLog } from "@/lib/agent/storage";

export async function GET() {
  const results: string[] = [];
  
  try {
    generateDailyBatch();
    results.push("posts:ok");
  } catch (err) {
    results.push(`posts:${String(err).slice(0, 50)}`);
  }
  
  try {
    generateCreativeBatch(2);
    results.push("creatives:ok");
  } catch (err) {
    results.push(`creatives:${String(err).slice(0, 50)}`);
  }
  
  try {
    addLog("cron-daily", "Daily cron executed", "success");
  } catch { /* fs may not exist on Vercel */ }
  
  return Response.json({ success: true, results, time: new Date().toISOString() });
}
