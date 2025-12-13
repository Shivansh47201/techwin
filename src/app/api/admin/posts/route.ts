// app/api/admin/posts/route.ts
// POST → Create Post
// GET  → List Posts (pagination + filters)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import {
  extractHeadings,
  getMainHeading,
  getH2Headings,
  getH3Headings,
  extractImages,
  extractInternalLinks,
  extractExternalLinks,
  calculateReadingTime,
  countWords,
  generateSEODescription,
} from "@/lib/postUtils";

/* -----------------------------------------------------------
   GET: List posts with pagination + filters
   Query params:
   - page      => page number (default 1)
   - limit     => items per page (default 10)
   - published => optional filter true/false
   - search    => optional search in title or slug
------------------------------------------------------------ */
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const published = searchParams.get("published");
    const search = searchParams.get("search");

    const filter: any = {};

    // filter by published
    if (published === "true") filter.published = true;
    if (published === "false") filter.published = false;

    // text search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      page,
      total,
      pageSize: limit,
      posts,
    });
  } catch (error: any) {
    console.error("GET /posts error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   POST: Create a new blog post
   Body JSON must include:
   - slug (required)
   - title (required)
   - content (required)
   Other optional fields allowed
------------------------------------------------------------ */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Basic validations
    if (!body.slug || !/^[a-z0-9\-]+$/.test(body.slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid slug. Slug is required and must match /^[a-z0-9-]+$/",
        },
        { status: 400 }
      );
    }

    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    if (!body.content) {
      return NextResponse.json(
        { success: false, message: "Content (HTML) is required." },
        { status: 400 }
      );
    }

    // Extract metadata from content
    const headings = extractHeadings(body.content);
    const images = extractImages(body.content);
    const wordCount = countWords(body.content);
    const readingTime = calculateReadingTime(body.content);
    const internalLinks = extractInternalLinks(body.content);
    const externalLinks = extractExternalLinks(body.content);

    // Create post with auto-extracted metadata
    const post = await Post.create({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt || generateSEODescription(body.content),
      content: body.content,
      tags: body.tags || [],
      coverImage: body.coverImage || "",
      coverImageAlt: body.coverImageAlt || "",
      
      // SEO
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || generateSEODescription(body.content),
      seoKeywords: body.seoKeywords || body.tags,
      metaImage: body.coverImage || (images.length > 0 ? images[0] : ""),
      
      // Content structure
      h1: getMainHeading(headings),
      h2: getH2Headings(headings),
      h3: getH3Headings(headings),
      headings: headings,
      
      // Links
      author: body.author || "",
      canonical: body.canonical || "",
      internalLinks: internalLinks,
      externalLinks: externalLinks,
      
      // Images
      images: images.map((url) => ({
        url,
        uploadedAt: new Date(),
      })),
      
      // Stats
      wordCount,
      readingTime,
      
      // Publishing
      published: body.published ?? false,
      publishedAt: body.published ? new Date() : null,
    });

    return NextResponse.json(
      { 
        success: true, 
        post,
        metadata: {
          headings,
          wordCount,
          readingTime,
          images,
          internalLinks,
          externalLinks,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /posts error:", error);

    // Handle duplicate slug errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Slug already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
