import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import mongoose from "mongoose";

/* --------------------------------
   Helper: Validate ObjectId
---------------------------------*/
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

/* --------------------------------
   GET: Single Category (Admin Edit)
---------------------------------*/
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();

    const resolved = await context.params;
    const id = resolved?.id;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await Category.findById(id).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category });
  } catch (err) {
    // Fallback to filesystem by treating `id` as slug
    try {
      console.warn("CATEGORY_GET_BY_ID_DB_FAILED, trying filesystem", String(err));
      const resolved = await context.params;
      const slug = resolved?.id;
      const fs = await import("fs/promises");
      const path = await import("path");
      const categoriesDir = path.join(process.cwd(), "src", "data", "categories");

      const folder = path.join(categoriesDir, slug || "");
      // Try meta.json inside folder
      const metaPath = path.join(folder, "meta.json");
      const exists = await fs.stat(folder).then(() => true).catch(() => false);
      if (!exists) {
        return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
      }
      let meta: any = {};
      try {
        const raw = await fs.readFile(metaPath, "utf-8");
        meta = JSON.parse(raw);
      } catch (e) {
        // try to import TS file if present
        try {
          const files = await fs.readdir(folder);
          const tsFile = files.find((f) => /\.(ts|js|tsx|jsx)$/.test(f));
          if (tsFile) {
            // Use a file:// import to avoid server-relative import errors from Next's resolver
            const imported = await import("file://" + path.join(folder, tsFile));
            meta = imported?.default || imported;
          }
        } catch (e2) {}
      }

      const resObj = {
        _id: slug,
        slug,
        url: `/products/${slug}`,
        metaTitle: meta.metaTitle || meta.title || slug,
        metaDescription: meta.metaDescription || "",
        hero: meta.hero || {},
        intro: meta.intro || {},
        keyFeatures: meta.keyFeatures || [],
        subCategories: meta.subCategories || [],
        technicalBenefits: meta.technicalBenefits || [],
        applications: meta.applications || [],
        cta: meta.cta || {},
        contactPhone: meta.contactPhone || "",
        notes: meta.notes || "",
        featureMatrix: meta.featureMatrix || undefined,
        status: meta.status || "static",
      };

      return NextResponse.json({ success: true, category: resObj });
    } catch (fsErr) {
      console.error("CATEGORY_GET_BY_ID_FS_FAILED", fsErr);
      return NextResponse.json(
        { success: false, message: "Failed to fetch category" },
        { status: 500 }
      );
    }
  }
}

/* --------------------------------
   PUT: Update Category
---------------------------------*/
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  // allow fallback to access parsed body
  let body: any = null;
  try {
    await connectDB();

    const resolved = await context.params;
    const id = resolved?.id;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }

    body = await req.json();

    // Prevent slug collision (if slug is being changed)
    if (body.slug) {
      const exists = await Category.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (exists) {
        return NextResponse.json(
          { success: false, message: "Slug already in use" },
          { status: 409 }
        );
      }
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          slug: body.slug,
          url: body.slug ? `/products/${body.slug}` : undefined,

          metaTitle: body.metaTitle,
          metaDescription: body.metaDescription,

          hero: body.hero,
          intro: body.intro,

          keyFeatures: body.keyFeatures,
          subCategories: body.subCategories,
          technicalBenefits: body.technicalBenefits,
          applications: body.applications,

          cta: body.cta,
          contactPhone: body.contactPhone,
          notes: body.notes,

          featureMatrix: body.featureMatrix,

          status: body.status,
        },
      },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category: updated,
    });
  } catch (err) {
    console.error("CATEGORY_UPDATE_ERROR", err);

    // Fallback: attempt to update a filesystem category by slug
    try {
      const resolved = await context.params;
      const slug = resolved?.id;
      const fs = await import("fs/promises");
      const path = await import("path");
      const categoriesDir = path.join(process.cwd(), "src", "data", "categories");
      const folder = path.join(categoriesDir, slug || "");
      const metaPath = path.join(folder, "meta.json");

      const exists = await fs.stat(folder).then(() => true).catch(() => false);
      if (!exists) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });

      const meta = {
        url: (body && body.url) || `/products/${slug}`,
        metaTitle: (body && body.metaTitle) || (body && body.title) || slug,
        metaDescription: (body && body.metaDescription) || "",
        hero: (body && body.hero) || { title: (body && body.metaTitle) || (body && body.title) || slug, image: "" },
        intro: (body && body.intro) || { heading: (body && body.metaTitle) || (body && body.title) || slug, description: "" },
        keyFeatures: (body && body.keyFeatures) || [],
        subCategories: (body && body.subCategories) || [],
        technicalBenefits: (body && body.technicalBenefits) || [],
        applications: (body && body.applications) || [],
        cta: (body && body.cta) || { primary: { label: "Request Quote", href: "/contact" } },
        contactPhone: (body && body.contactPhone) || "",
        notes: (body && body.notes) || "",
        featureMatrix: (body && body.featureMatrix) || undefined,
        status: (body && body.status) || "static",
      };

      await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), "utf-8");

      return NextResponse.json({ success: true, category: { _id: slug, slug, ...meta } });
    } catch (fsErr) {
      console.error("CATEGORY_UPDATE_FS_FAILED", fsErr);
      return NextResponse.json({ success: false, message: "Failed to update category" }, { status: 500 });
    }
  }
}

/* --------------------------------
   DELETE: Remove Category
---------------------------------*/
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();

    const resolved = await context.params;
    const id = resolved?.id;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deleted = await Category.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("CATEGORY_DELETE_ERROR", err);

    // Fallback: try filesystem delete by slug
    try {
      const resolved = await context.params;
      const slug = resolved?.id;
      const fs = await import("fs/promises");
      const path = await import("path");
      const categoriesDir = path.join(process.cwd(), "src", "data", "categories");
      const folder = path.join(categoriesDir, slug || "");

      const exists = await fs.stat(folder).then(() => true).catch(() => false);
      if (!exists) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });

      // remove folder recursively
      await fs.rm(folder, { recursive: true, force: true });

      return NextResponse.json({ success: true, message: "Category deleted successfully" });
    } catch (fsErr) {
      console.error("CATEGORY_DELETE_FS_FAILED", fsErr);
      return NextResponse.json({ success: false, message: "Failed to delete category" }, { status: 500 });
    }
  }
}
