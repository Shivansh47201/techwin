#!/usr/bin/env ts-node
/**
 * In-process scheduler that runs the scheduled publish job periodically.
 *
 * Usage:
 *  - Enable by running: `npm run start-scheduler`
 *  - Configure frequency and secret via env vars (see DEPLOYMENT.md)
 */
import cron from "node-cron";
import runPublishScheduled from "../lib/scheduler";

const SCHEDULER_SECRET = process.env.SCHEDULER_SECRET || null;
const CRON_SCHEDULE = process.env.SCHEDULER_CRON || "* * * * *"; // default: every minute

async function runOnce() {
  try {
    console.log(new Date().toISOString(), "Running scheduled publish job...");
    const res = await runPublishScheduled();
    console.log(new Date().toISOString(), "Scheduled job result:", res);
  } catch (err) {
    console.error(new Date().toISOString(), "Scheduled job failed:", err);
  }
}

function start() {
  console.log("Scheduler starting. CRON:", CRON_SCHEDULE);
  // Run once immediately on start
  runOnce();

  // Schedule periodic runs
  cron.schedule(CRON_SCHEDULE, () => {
    runOnce();
  });

  // Keep process alive
  process.stdin.resume();
}

if (require.main === module) {
  start();
}

export default start;
