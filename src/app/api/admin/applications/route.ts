import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

// CREATE
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const exists = await (Application as any).findOne({ slug: data.slug } as any);
  if (exists) {
    return NextResponse.json(
      { success: false, message: "Slug already exists" },
      { status: 400 }
    );
  }

  const app = await (Application as any).create(data as any);
  return NextResponse.json({ success: true, data: app });
}

// LIST
export async function GET() {
  await connectDB();
  const apps = await (Application as any).find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: apps });
}
