import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  // Debug endpoint only enabled in development to avoid exposing drafts in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Not available in production" }, { status: 403 });
  }

  try {
    await connectDB();

    const resolved = await context.params;
    const slug = (resolved.slug || "").replace(/\/$/, "").toLowerCase();

    const post = await Post.findOne({ slug }).lean();

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (err: any) {
    console.error("GET /api/blog/debug/[slug] error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
