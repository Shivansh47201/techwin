export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {

  if (!process.env.MONGODB_URI) {
    return new Response("", { status: 204 });
  }

  await connectDB();

  const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    .replace(/\/$/, "");

  const posts = await Post.find({ published: true })
    .sort({ publishedAt: -1 })
    .lean();

  const urls = posts
    .map(
      (p: any) => `
  <url>
    <loc>${SITE}/blog/${p.slug}</loc>
    <lastmod>${(
      p.publishedAt ||
      p.updatedAt ||
      p.createdAt
    ).toISOString()}</lastmod>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600",
    },
  });
}
