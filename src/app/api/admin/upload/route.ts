import { NextResponse } from "next/server";
import crypto from "crypto";
import cloudinary from "@/lib/cloudinary";
import sharp from "sharp";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB for images
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB for videos
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    
    const type = (formData.get("type") as string) || "tmp"; // blog | product | pages | tmp
    const slug = (formData.get("slug") as string) || null;
    const category = (formData.get("category") as string) || null;
    const resourceType = (formData.get("resourceType") as string) || "image"; // image | video

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Check file type and size based on resource type
    if (resourceType === "video") {
      if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "Only MP4, WEBM, OGG videos are allowed." },
          { status: 400 }
        );
      }

      if (file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json(
          { success: false, message: "Video file size exceeds 50MB limit" },
          { status: 400 }
        );
      }
    } else {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "Only JPG, PNG and WEBP are allowed." },
          { status: 400 }
        );
      }

      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { success: false, message: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }
    }

    /* ---------------------------
       SAFE BUFFER FIX 
    ----------------------------*/
    const arrayBuffer = await file.arrayBuffer();
    // Ensure we create a Buffer<ArrayBuffer> (not ArrayBufferLike) so Node typings match
    const inputBuffer: Buffer = Buffer.from(arrayBuffer as ArrayBuffer);

    /* ---------------------------
       STABLE HASH 
    ----------------------------*/
    const hash = crypto
      .createHash("sha256")
      .update(inputBuffer)
      .digest("hex");

    /* ---------------------------
       OPTIMIZE IMAGE (Skip for videos)
    ----------------------------*/
    let optimizedBuffer: Buffer = inputBuffer;
    if (resourceType === "image") {
      try {
        optimizedBuffer = await sharp(inputBuffer)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
      } catch (e) {
        console.warn("Sharp failed, using original buffer", e);
      }
    }

    /* ---------------------------
       FOLDER LOGIC 
    ----------------------------*/
    let folder = "tmp";

    if (type === "blog" && slug) {
      folder = `blogs/${slug}`;
    }

    if (type === "product" && category && slug) {
      folder = `products/${category}/${slug}`;
    }
    
    if (type === "pages" && slug) {
      folder = `pages/${slug}`;
    }

    if (type === "category" && slug) {
      folder = `products/${slug}`;
    }

    if (type === "application" && slug) {
      folder = `applications/${slug}`;
    }

    if (type === "pages" && slug) {
      folder = `pages/${slug}`;
    }

    /* ---------------------------
       CLOUDINARY UPLOAD
    ----------------------------*/
    let result;
    
    if (resourceType === "video") {
      // For videos, upload directly without base64 encoding
      const dataUri = `data:${file.type};base64,${inputBuffer.toString("base64")}`;
      
      result = await cloudinary.uploader.upload(dataUri, {
        folder,
        public_id: hash,
        overwrite: false,
        resource_type: "video",
        eager: [
          { width: 1920, height: 1080, crop: "limit", format: "mp4" },
        ],
      });
    } else {
      // For images, use optimized buffer
      const dataUri = `data:image/webp;base64,${optimizedBuffer.toString("base64")}`;
      
      result = await cloudinary.uploader.upload(dataUri, {
        folder,
        public_id: hash,
        overwrite: false,
        resource_type: "image",
      });
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      folder,
      message: `${resourceType === "video" ? "Video" : "Image"} uploaded to Cloudinary`,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
