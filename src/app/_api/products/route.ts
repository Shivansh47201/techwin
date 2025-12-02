// Copied from src/app/api/products/route.ts — moved out of `app/api` so static export isn't blocked
import { NextResponse } from "next/server";
import { getAllProducts, getProductData } from "@/lib/products";

export async function GET() {
  try {
    const allProducts = getAllProducts();
    
    // Enrich each category with image from first product
    const enrichedProducts = await Promise.all(
      allProducts.map(async (category) => {
        let categoryImage = "";
        
        // Try to get image from first product
        if (category.products && category.products.length > 0) {
          try {
            const firstProduct = await getProductData(category.categorySlug, category.products[0].slug);
            if (firstProduct?.previewImageSrc || firstProduct?.galleryImages?.[0]) {
              categoryImage = firstProduct.previewImageSrc || firstProduct.galleryImages[0].src;
            }
          } catch (err) {
            // Continue without image if fetch fails
          }
        }
        
        return {
          ...category,
          image: categoryImage,
          products: category.products.map(p => ({
            ...p,
            // Include empty previewImageSrc for consistency
            previewImageSrc: ""
          }))
        };
      })
    );
    
    return NextResponse.json({ products: enrichedProducts });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
