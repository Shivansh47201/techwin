// app/api/admin/posts/[id]/route.ts
// GET    → Get single post by ID
// PUT    → Update post
// DELETE → Delete post

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

// Extract dynamic route param {id}
interface RouteParams {
  params: { id: string };
}

/* -----------------------------------------------------------
   GET: Get post by ID
------------------------------------------------------------ */
export async function GET(req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = params;

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("GET /posts/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   PUT: Update post by ID
------------------------------------------------------------ */
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();

    // Optional: validate slug pattern if provided
    if (body.slug && !/^[a-z0-9\-]+$/.test(body.slug)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid slug format. Allowed: lowercase, numbers, hyphens.",
        },
        { status: 400 }
      );
    }

    // If post is being published, set publishedAt automatically
    if (body.published === true) {
      body.publishedAt = new Date();
    }
    if (body.published === false) {
      body.publishedAt = null;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("PUT /posts/[id] error:", error);

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

/* -----------------------------------------------------------
   DELETE: Delete post by ID
------------------------------------------------------------ */
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error: any) {
    console.error("DELETE /posts/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
