// Copied from src/app/api/search/route.ts — moved out of `app/api` so static export isn't blocked
import { NextRequest, NextResponse } from "next/server";
import { applications } from "@/data/Application/applications";
import { getAllProducts } from "@/lib/products";

export interface SearchResult {
  type: "product" | "application" | "category";
  title: string;
  slug: string;
  category?: string;
  description?: string;
  image?: string;
  url: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q")?.trim().toLowerCase();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];

  // Search in applications
  for (const app of applications) {
    if (
      app.name.toLowerCase().includes(q) ||
      app.heading.toLowerCase().includes(q) ||
      app.short.toLowerCase().includes(q) ||
      app.keywords.some((k) => k.toLowerCase().includes(q))
    ) {
      results.push({
        type: "application",
        title: app.name,
        slug: app.slug,
        description: app.short,
        image: app.image,
        url: `/application/${app.slug}/`,
      });
    }
  }

  // Search in products and categories
  const allProducts = getAllProducts();
  
  for (const category of allProducts) {
    const categoryTitle = category.categoryTitle || category.categorySlug;
    
    // Check if category matches
    if (categoryTitle.toLowerCase().includes(q)) {
      results.push({
        type: "category",
        title: categoryTitle,
        slug: category.categorySlug,
        url: `/products/${category.categorySlug}/`,
      });
    }

    // Check if any product in this category matches
    for (const product of category.products) {
      if (
        product.title.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q)
      ) {
        results.push({
          type: "product",
          title: product.title,
          slug: product.slug,
          category: categoryTitle,
          url: `/products/${category.categorySlug}/${product.slug}/`,
        });
      }
    }
  }

  // Limit results to 10
  return NextResponse.json({ results: results.slice(0, 10) });
}
