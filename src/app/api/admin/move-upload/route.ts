import { NextResponse } from "next/server";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { stat, mkdir, unlink, readFile } from "fs/promises";
import { existsSync } from "fs";

const MAX_WIDTH = 1600;
const QUALITY = 80;

export async function POST(req: Request) {
  try {
    const { filename, slug } = await req.json();

    if (!filename || !slug) {
      return NextResponse.json(
        { success: false, message: "filename and slug are required" },
        { status: 400 }
      );
    }

    // 🛡️ Prevent path traversal
    const safeFilename = path.basename(filename);

    // 🔍 Possible source locations
    const srcPaths = [
      path.join(process.cwd(), "public/uploads/tmp", safeFilename),
      path.join(process.cwd(), "public/uploads", safeFilename),
    ];

    let srcPath: string | null = null;

    for (const p of srcPaths) {
      try {
        await stat(p);
        srcPath = p;
        break;
      } catch {}
    }

    if (!srcPath) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }

    // 📥 Read original image
    const inputBuffer = await readFile(srcPath);

    // 🔐 Hash for duplicate detection
    const hash = crypto
      .createHash("sha256")
      .update(inputBuffer)
      .digest("hex");

    // 📁 Destination
    const destDir = path.join(
      process.cwd(),
      "public/uploads/blogs",
      slug
    );
    await mkdir(destDir, { recursive: true });

    // ✅ Optimized filename
    const outputFilename = `${hash}.webp`;
    const destPath = path.join(destDir, outputFilename);

    // ⚡ Optimize only if not exists
    if (!existsSync(destPath)) {
      await sharp(inputBuffer)
        .resize(MAX_WIDTH, MAX_WIDTH, { fit: "inside" })
        .webp({ quality: QUALITY })
        .toFile(destPath);
    }

    // 🧹 Remove temp file
    await unlink(srcPath).catch(() => {});

    const url = `/uploads/blogs/${slug}/${outputFilename}`;

    return NextResponse.json({
      success: true,
      url,
      optimized: true,
      deduplicated: true,
    });
  } catch (err: any) {
    console.error("move-upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Move failed" },
      { status: 500 }
    );
  }
}
