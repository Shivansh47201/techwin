import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  await connectDB();
  const resolved = await context.params;
  const id = resolved?.id;

  const Model: any = Application as unknown as any;
  let app = await Model.findById(id as any);
  // support slug-based ids when not an ObjectId -- try slug lookup
  if (!app) {
    app = await Model.findOne({ slug: id } as any);
  }
  if (!app) return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: app });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  await connectDB();
  const data = await req.json();
  const resolved = await context.params;
  const id = resolved?.id;

  const Model: any = Application as unknown as any;
  const updated = await Model.findByIdAndUpdate(
    id as any,
    data as any,
    { new: true } as any
  );

  return NextResponse.json({ success: true, data: updated });
}

// SOFT DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  await connectDB();
  const resolved = await context.params;
  const id = resolved?.id;

  const Model: any = Application as unknown as any;
  await Model.findByIdAndUpdate(id as any, {
    status: "draft",
  } as any, {} as any);

  return NextResponse.json({ success: true });
}
