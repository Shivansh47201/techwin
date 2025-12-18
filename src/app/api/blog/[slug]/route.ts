import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();

  // `params` may be a Promise (App Router). Resolve it before use.
  const resolvedParams = (await Promise.resolve(params)) as { slug?: string };

  // Normalize slug (trim trailing slash and lowercase)
  const slug = (resolvedParams?.slug || "").replace(/\/$/, "").toLowerCase();

  const post = await Post.findOne({
    slug,
    published: true,
  }).lean();

  if (!post) {
    // Development-only diagnostics: counts & sample docs for this slug
    if (process.env.NODE_ENV !== "production") {
      try {
        const countAll = await Post.countDocuments({ slug });
        const countPublished = await Post.countDocuments({ slug, published: true });
        const samples = await Post.find({ slug }).lean().limit(5);

        return NextResponse.json(
          {
            message: "Post not found",
            debug: {
              reqUrl: req.url,
              slugParam: resolvedParams?.slug,
              normalizedSlug: slug,
              countAll,
              countPublished,
              samples,
            },
          },
          { status: 404 }
        );
      } catch (err) {
        console.error("Debug diagnostics failed", err);
      }
    }

    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
