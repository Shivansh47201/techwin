// app/api/admin/upload/route.ts
// Accepts multipart/form-data
// Saves image to: /public/uploads/blogs/<slug>/filename
// Responds with full public URL

import { NextResponse, NextRequest } from "next/server";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB max

export async function POST(req: Request) {
  try {
    
    const { writeFile, mkdir } = await import("fs/promises");
    
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const slug = formData.get("slug") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Blog slug is required." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Allowed: JPG, PNG, WEBP.",
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "File too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    // Convert file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create folder: /public/uploads/blogs/<slug>
    const uploadDir = path.join(process.cwd(), "public/uploads/blogs", slug);

    await mkdir(uploadDir, { recursive: true });

    // Unique file name
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Save file
    await writeFile(filePath, buffer);

    // Create public URL
    const publicUrl = `/uploads/blogs/${slug}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Image uploaded successfully.",
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
