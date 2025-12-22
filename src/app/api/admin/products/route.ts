export const runtime = "nodejs";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

/* ---------------------------
   DB CONNECT (SAFE)
----------------------------*/
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

/* ===========================
   GET → LIST PRODUCTS (ADMIN)
   supports:
   ?status=draft|published
   ?category=high-power
=========================== */
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error("ADMIN PRODUCTS GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* ===========================
   POST → CREATE PRODUCT (ADMIN)
=========================== */
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      slug,
      category,
      meta,
      heroImage,
      shortDescription,
      sections = [],
      features = [],
      applicationAreas = [],
      galleryImages = [],
      previewImageSrc,
      datasheetImageSrc,
      graphImageURL,
      tableImageURL,
      canonical,
      status = "draft",
      featured = false,
    } = body;

    /* ---------------------------
       VALIDATION (STRICT)
    ----------------------------*/
    if (
      !title ||
      !slug ||
      !category ||
      !meta?.title ||
      !meta?.description ||
      !heroImage?.src ||
      !shortDescription
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedSlug = slug.toLowerCase().trim();
    const normalizedCategory = category.toLowerCase().trim();

    /* ---------------------------
       UNIQUE CHECK (slug + category)
    ----------------------------*/
    const exists = await Product.findOne({
      slug: normalizedSlug,
      category: normalizedCategory,
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Product with same slug already exists in this category",
        },
        { status: 409 }
      );
    }

    /* ---------------------------
       CREATE PRODUCT
    ----------------------------*/

    // Normalize canonical (if provided): allow absolute URLs or site-relative paths.
    let normalizedCanonical = undefined;
    if (canonical) {
      if (!canonical.startsWith("http") && !canonical.startsWith("/")) {
        normalizedCanonical = `https://${canonical}`;
      } else {
        normalizedCanonical = canonical;
      }
    }

    const product = await new Product({
      title,
      slug: normalizedSlug,
      category: normalizedCategory,
      meta,
      shortDescription,
      heroImage,
      galleryImages,
      previewImageSrc,
      datasheetImageSrc,
      graphImageURL,
      tableImageURL,
      canonical: normalizedCanonical,
      sections,
      features,
      applicationAreas,
      featured,
      status,
    }).save();

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    console.error("ADMIN PRODUCTS POST ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Create product failed",
      },
      { status: 500 }
    );
  }
}
