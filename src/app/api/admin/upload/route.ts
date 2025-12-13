// app/api/admin/upload/route.ts
// POST → Upload image file
// Note: For production, use cloud storage (Cloudinary, AWS S3, etc.)

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "No slug provided" },
        { status: 400 }
      );
    }

    // Validate file is an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "File must be an image" },
        { status: 400 }
      );
    }

    // Max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Create filename: slug + timestamp + original extension
    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${slug}-${timestamp}-${randomStr}.${ext}`;

    // TODO: For production, implement cloud storage upload:
    // Options:
    // 1. Cloudinary - https://cloudinary.com
    // 2. AWS S3 - https://aws.amazon.com/s3
    // 3. Firebase Storage - https://firebase.google.com/products/storage
    // 4. Vercel Blob - https://vercel.com/storage/blob
    // 5. Local file system with proper validation
    
    // Example Cloudinary implementation:
    // const formData2 = new FormData();
    // formData2.append("file", file);
    // formData2.append("upload_preset", process.env.CLOUDINARY_PRESET);
    // const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
    //   method: "POST",
    //   body: formData2,
    // });
    // const data = await res.json();
    // return NextResponse.json({
    //   success: true,
    //   url: data.secure_url,
    //   filename,
    // });

    // For now, return a placeholder URL
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      message: "Image prepared for upload (implement cloud storage for production)",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
