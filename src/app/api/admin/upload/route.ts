// app/api/admin/upload/route.ts
// POST → Upload image file (Cloudinary-backed)

import { NextResponse } from "next/server";
import crypto from "crypto";
import cloudinary from "@/lib/cloudinary";
import sharp from "sharp";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string) || null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only JPG, PNG and WEBP are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Buffer the file
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // Hash for dedup / stable public_id
    const hash = crypto.createHash("sha256").update(inputBuffer).digest("hex");

    // Optimize to webp via sharp (non-blocking if sharp fails)
    let optimizedBuffer = inputBuffer;
    try {
      optimizedBuffer = await sharp(inputBuffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
    } catch (e) {
      // If sharp fails, fall back to original buffer
      console.warn("sharp optimization failed (continuing with original file)", e);
    }

    // Upload to Cloudinary
    const dataUri = `data:image/webp;base64,${optimizedBuffer.toString("base64")}`;
    const folder = slug ? `blogs/${slug}` : `tmp`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      public_id: hash,
      overwrite: false,
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      message: "Uploaded to Cloudinary",
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ success: false, message: error.message || "Upload failed" }, { status: 500 });
  }
}
