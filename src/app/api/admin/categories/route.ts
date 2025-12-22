import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

/* --------------------------------
   Helpers
---------------------------------*/
function normalizeSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* --------------------------------
   GET: List Categories (Admin)
---------------------------------*/
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .select(
        "_id slug url metaTitle status hero.image createdAt updatedAt"
      )
      .lean();

    console.log("📦 Categories from DB:", categories.length, "items");

    return NextResponse.json({ success: true, categories });
  } catch (err: any) {
    console.error("❌ MongoDB categories fetch failed:", String(err));
    return NextResponse.json({ success: false, categories: [], message: "Failed to fetch categories" });
  }
}

/* --------------------------------
   POST: Create New Category
---------------------------------*/
export async function POST(req: Request) {
  // allow fallback logic to access the parsed body when DB is not available
  let body: any = null;
  try {
    await connectDB();

    body = await req.json();
    console.log("Received category data:", body);

    const metaTitle = (body?.metaTitle || "").trim();
    if (!metaTitle) {
      return NextResponse.json(
        { success: false, message: "Meta title is required" },
        { status: 400 }
      );
    }

    const slug = normalizeSlug(body.slug || metaTitle);
    console.log("Normalized slug:", slug);
    
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Invalid slug" },
        { status: 400 }
      );
    }

    // Prevent duplicate slug
    const exists = await Category.findOne({ slug });
    if (exists) {
      console.log("Duplicate slug found:", slug);
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({
      slug,
      url: `/products/${slug}`,

      metaTitle,
      metaDescription: body.metaDescription || "",

      hero: body.hero,
      intro: body.intro,

      keyFeatures: body.keyFeatures || [],
      subCategories: body.subCategories || [],
      technicalBenefits: body.technicalBenefits || [],
      applications: body.applications || [],

      cta: body.cta,
      contactPhone: body.contactPhone,
      notes: body.notes,

      featureMatrix: body.featureMatrix,

      status: body.status || "draft",
    });

    console.log("Category created successfully:", category._id);

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (err: any) {
    console.error("CATEGORY_POST_ERROR", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
