import { NextResponse } from "next/server";
import { runPublishScheduled } from "@/lib/scheduler";

export async function POST(req: Request) {
  try {
    // If SCHEDULER_SECRET is set, require it in header 'x-scheduler-secret'
    const secret = process.env.SCHEDULER_SECRET;
    if (secret) {
      const provided = req.headers.get('x-scheduler-secret');
      if (!provided || provided !== secret) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
    }

    const result = await runPublishScheduled();
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("POST /api/admin/run-scheduled", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // allow GET for easy manual testing via browser, but still respect secret if configured
  try {
    const secret = process.env.SCHEDULER_SECRET;
    if (secret) {
      const provided = req.headers.get('x-scheduler-secret');
      if (!provided || provided !== secret) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
    }

    const result = await runPublishScheduled();
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("GET /api/admin/run-scheduled", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
