#!/usr/bin/env ts-node
import runPublishScheduled from "../src/lib/scheduler";

(async () => {
  try {
    console.log("Running scheduled publisher...");
    const res = await runPublishScheduled();
    console.log("Result:", res);
    process.exit(0);
  } catch (err: any) {
    console.error("Scheduler failed:", err);
    process.exit(1);
  }
})();
