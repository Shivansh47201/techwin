// src/app/api/products/category/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/productLoader";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Category slug is required" },
        { status: 400 }
      );
    }

    const products = await getProductsByCategory(slug);

    return NextResponse.json(
      {
        success: true,
        categorySlug: slug,
        products,
        count: products.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in products category API:", error);
    return NextResponse.json(
      {
        error: "Failed to load products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
