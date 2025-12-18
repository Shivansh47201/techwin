import { NextResponse } from "next/server";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const slug = formData.get("slug") as string | null;

    if (!file || !slug) {
      return NextResponse.json(
        { success: false, message: "File and slug are required." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only JPG, PNG, WEBP allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "Max file size is 5MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 🔐 Generate hash for duplicate detection
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");

    // 📁 Upload directory
    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/blogs",
      slug
    );
    await mkdir(uploadDir, { recursive: true });

    // ✅ Optimized filename (hash-based)
    const fileName = `${hash}.webp`;
    const filePath = path.join(uploadDir, fileName);

    // 🔁 If already exists, do not re-save
    if (!existsSync(filePath)) {
      await sharp(buffer)
        .resize(1600, 1600, { fit: "inside" }) // max width/height
        .webp({ quality: 80 }) // compression
        .toFile(filePath);
    }

    const publicUrl = `/uploads/blogs/${slug}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Image uploaded & optimized successfully.",
      cached: existsSync(filePath),
    });
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed." },
      { status: 500 }
    );
  }
}
