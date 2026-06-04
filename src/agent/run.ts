import { startAgent } from "../lib/agent/scheduler";
import { addLog } from "../lib/agent/storage";

console.log("=== SEWA AI Marketing Agent ===");
console.log("Starting 24x7 agent...");
console.log("");

startAgent();

addLog("runner-start", "Agent runner script started", "info");

const shutdown = () => {
  console.log("Shutting down agent...");
  addLog("runner-shutdown", "Agent runner script shutting down", "info");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err.message);
  addLog("runner-error", `Uncaught exception: ${err.message}`, "error");
});
