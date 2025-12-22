export const runtime = "nodejs";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

/* ---------------------------
   DB CONNECT
----------------------------*/
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

/* ---------------------------
   VALIDATE OBJECT ID
----------------------------*/
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

/* ===========================
   GET → SINGLE PRODUCT (ADMIN)
=========================== */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // params is a Promise in the new Next.js app router; unwrap it before use
    const id = String((await context.params).id ?? "").trim();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("ADMIN PRODUCT GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* ===========================
   PUT → UPDATE PRODUCT (ADMIN)
=========================== */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = String((await context.params).id ?? "").trim();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await connectDB();
    const body = await req.json();

    const normalizedSlug = body.slug?.toLowerCase().trim();
    const normalizedCategory = body.category?.toLowerCase().trim();

    // Normalize canonical if provided
    if (body.canonical && !body.canonical.startsWith("http") && !body.canonical.startsWith("/")) {
      body.canonical = `https://${body.canonical}`;
    }

    if (normalizedSlug && normalizedCategory) {
      const exists = await Product.findOne({
        slug: normalizedSlug,
        category: normalizedCategory,
        _id: { $ne: id },
      });

      if (exists) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Product with same slug already exists in this category",
          },
          { status: 409 }
        );
      }
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error: any) {
    console.error("ADMIN PRODUCT PUT ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Update failed",
      },
      { status: 500 }
    );
  }
}

/* ===========================
   DELETE → SOFT DELETE (ADMIN)
=========================== */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = String((await context.params).id ?? "").trim();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await connectDB();

    // Allow a hard-delete via query param: ?hard=true
    const url = new URL(_req.url);
    const hard = url.searchParams.get("hard") === "true";

    if (hard) {
      const removed = await Product.findByIdAndDelete(id);
      if (!removed) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Product permanently deleted",
      });
    } else {
      const updated = await Product.findByIdAndUpdate(
        id,
        { status: "draft" },
        { new: true }
      );

      if (!updated) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Product moved to draft",
      });
    }
  } catch (error) {
    console.error("ADMIN PRODUCT DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}
