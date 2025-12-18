// app/api/admin/upload/route.ts
// POST → Upload image file
// Note: For production, use cloud storage (Cloudinary, AWS S3, etc.)

import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const { writeFile, mkdir } = await import("fs/promises");

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string) || null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
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

    // Buffer the file
    const buffer = Buffer.from(await file.arrayBuffer());

    // Determine upload folder: per-slug, or temp
    const uploadDir = slug
      ? path.join(process.cwd(), "public/uploads/blogs", slug)
      : path.join(process.cwd(), "public/uploads/tmp");

    await mkdir(uploadDir, { recursive: true });

    // Safe filename
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-");
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    // Save original
    await writeFile(filePath, buffer);

    // Try to create a webp optimized variant if `sharp` is installed
    let webpUrl: string | undefined = undefined;
    try {
      const sharp = (await import("sharp")).default;
      const webpName = fileName.replace(/\.[^.]+$/, ".webp");
      const webpPath = path.join(uploadDir, webpName);
      await sharp(buffer).resize({ width: 1600, withoutEnlargement: true }).toFormat("webp", { quality: 80 }).toFile(webpPath);
      webpUrl = slug ? `/uploads/blogs/${slug}/${webpName}` : `/uploads/tmp/${webpName}`;
    } catch (e) {
      // sharp not available or conversion failed — ignore
    }

    const publicUrl = slug ? `/uploads/blogs/${slug}/${fileName}` : `/uploads/tmp/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      webp: webpUrl,
      filename: fileName,
      message: "Image uploaded successfully",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
