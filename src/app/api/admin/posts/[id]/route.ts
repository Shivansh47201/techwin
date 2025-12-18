// app/api/admin/posts/[id]/route.ts
// GET    → Get single post by ID
// PUT    → Update post
// DELETE → Delete post

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

interface RouteParams {
  params: { id: string };
}

/* -----------------------------------------------------------
   GET: Get single post by ID (EDIT PAGE)
------------------------------------------------------------ */
export async function GET(req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;
    console.log("GET /api/admin/posts/[id] - searching for ID:", id);

    const post = await Post.findById(id);

    console.log("GET /api/admin/posts/[id] - found post:", post ? post._id : "NOT FOUND");

    if (!post) {
      console.warn("Post not found for ID:", id);
      const allCount = await Post.countDocuments();
      console.warn("Total posts in DB:", allCount);
      return NextResponse.json(
        { success: false, message: "Post not found", debug: { id, totalPostsInDB: allCount } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error: any) {
    console.error("GET /api/admin/posts/[id]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch post", error: error.message },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   PUT: Update post by ID (EDIT SAVE)
------------------------------------------------------------ */
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    // Slug validation (if updating slug)
    if (body.slug && !/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid slug. Only lowercase letters, numbers and hyphens allowed.",
        },
        { status: 400 }
      );
    }

    // Normalize canonical if provided
    if (body.canonical && !body.canonical.startsWith("http") && !body.canonical.startsWith("/")) {
      body.canonical = `https://${body.canonical}`;
    }

    // Publishing / scheduling logic
    const now = new Date();
    if (body.publishedAt) {
      const d = new Date(body.publishedAt);
      if (!isNaN(d.getTime())) {
        // If scheduled for future, keep published=false; otherwise mark published true
        if (d > now) {
          body.published = false;
        } else {
          body.published = true;
        }
      }
    } else {
      if (body.published === true && !body.publishedAt) {
        body.publishedAt = new Date();
      }
      if (body.published === false) {
        body.publishedAt = null;
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: updatedPost,
    });
  } catch (error: any) {
    console.error("PUT /api/admin/posts/[id]", error);

    // Duplicate slug
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update post" },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   DELETE: Delete post by ID
------------------------------------------------------------ */
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/admin/posts/[id]", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
