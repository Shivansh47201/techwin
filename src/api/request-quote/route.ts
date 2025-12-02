// Example for src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { getAllProducts, getProductData } from "@/lib/products";

export async function GET() {
  try {
    const categories = getAllProducts(); // synchronous list
    const enriched = await Promise.all(categories.map(async (c) => {
      const products = await Promise.all(
        c.products.map(async (p) => {
          // try to get product detail to extract previewImageSrc (getProductData returns null if not found)
          const pd = await getProductData(c.categorySlug, p.slug);
          return {
            slug: p.slug,
            title: p.title,
            previewImageSrc: pd?.previewImageSrc || "",
          };
        })
      );

      return {
        categoryTitle: c.categoryTitle,
        categorySlug: c.categorySlug,
        products,
      };
    }));

    return new Response(JSON.stringify({ products: enriched }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API /api/products error", err);
    return new Response(JSON.stringify({ products: [] }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}