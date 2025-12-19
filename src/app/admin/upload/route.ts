import { NextResponse } from "next/server";
import crypto from "crypto";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";

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

    // Buffer
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // 🔐 Hash (duplicate-safe)
    const hash = crypto.createHash("sha256").update(inputBuffer).digest("hex");

    // 🔧 Optimize via sharp (optional but recommended)
    const optimizedBuffer = await sharp(inputBuffer)
      .resize(1600, 1600, { fit: "inside" })
      .webp({ quality: 80 })
      .toBuffer();

    // ☁️ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/webp;base64,${optimizedBuffer.toString("base64")}`,
      {
        folder: `blogs/${slug}`,
        public_id: hash,       // same image → same public_id
        overwrite: false,      // prevents re-upload
        resource_type: "image",
      }
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      message: "Image uploaded to Cloudinary successfully.",
    });
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed." },
      { status: 500 }
    );
  }
}
