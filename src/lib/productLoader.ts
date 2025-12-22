// src/lib/productLoader.ts
import fs from "fs";
import path from "path";
import { SubCategoryItem } from "@/components/category/SubCategoryGrid";
import { PRODUCT_MAP } from "@/data/products";

type ProductsJsonStructure = {
  products: {
    categorySlug: string;
    categoryTitle: string;
    categoryImage: string;
    products: {
      slug: string;
      title: string;
    }[];
  }[];
};

/**
 * Load and filter products from products.json based on categorySlug
 * Returns SubCategoryItem[] ready for SubCategoryGrid
 */
export async function getProductsByCategory(
  categorySlug: string
): Promise<SubCategoryItem[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json"
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: ProductsJsonStructure = JSON.parse(fileContent);

    // Find matching category
    const categoryData = data.products.find(
      (cat) => cat.categorySlug === categorySlug
    );

    if (!categoryData) {
      console.warn(`No products found for category: ${categorySlug}`);
      return [];
    }

    // Map products to SubCategoryItem format
    const items: SubCategoryItem[] = categoryData.products.map((product) => {
      // Try to get additional data from PRODUCT_MAP
      const productData = PRODUCT_MAP[product.slug];

      return {
        id: product.slug,
        name: product.title,
        shortDescription:
          productData?.overview?.shortDescription ||
          `High-precision ${product.title} for advanced applications`,
        details: productData?.overview?.detailedDescription,
        image: productData?.heroImage?.src || `/products/${categorySlug}/${product.slug}.jpg`,
        imageAlt:
          productData?.heroImage?.alt || `${product.title} — Techwin`,
        datasheet: productData?.downloads?.find((d) => d.label.includes("Datasheet"))?.href,
        tag: extractTag(product.title),
      };
    });

    return items;
  } catch (error) {
    console.error("Error loading products from products.json:", error);
    return [];
  }
}

/**
 * Extract tag from product title (e.g., "1.5 µm", "2.0 µm", "PM")
 */
function extractTag(title: string): string | undefined {
  // Match wavelength patterns like "1.5 μm", "2.0 µm", "1um"
  const wavelengthMatch = title.match(/(\d+\.?\d*)\s*[µμu]m/i);
  if (wavelengthMatch) {
    return wavelengthMatch[0].replace(/um/i, " µm");
  }

  // Match other tags like "PM", "CW", "High-Power"
  if (title.includes("PM") || title.toLowerCase().includes("polarization")) {
    return "PM";
  }
  if (title.includes("CW")) {
    return "CW";
  }
  if (title.toLowerCase().includes("high-power")) {
    return "High-Power";
  }
  if (title.toLowerCase().includes("narrow linewidth")) {
    return "Narrow";
  }

  return undefined;
}

/**
 * Get all categories from products.json
 */
export async function getAllProductCategories() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json"
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: ProductsJsonStructure = JSON.parse(fileContent);

    return data.products.map((cat) => ({
      slug: cat.categorySlug,
      title: cat.categoryTitle,
      image: cat.categoryImage,
      productCount: cat.products.length,
    }));
  } catch (error) {
    console.error("Error loading categories from products.json:", error);
    return [];
  }
}
