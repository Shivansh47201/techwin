// src/lib/products.ts
import {
  getProductDataDB,
  getAllProductsDB,
  getAllProductPathsDB,
} from "./products.db";

import {
  getProductData as getStaticProduct,
  getAllProducts as getStaticProducts,
  getAllProductPaths as getStaticPaths,
} from "./products.static";

/* ===========================
   SINGLE PRODUCT
=========================== */
export async function getProductData(category: string, slug: string) {
  // 1️⃣ Try MongoDB
  try {
    const dbProduct = await getProductDataDB(category, slug);
    if (dbProduct) return dbProduct;
  } catch (e) {
    console.warn("DB product fetch failed, falling back to static", e);
  }

  // 2️⃣ Fallback → static FS
  return getStaticProduct(category, slug);
}

/* ===========================
   ALL PRODUCTS (CATALOG)
=========================== */
export async function getAllProducts() {
  try {
    const dbProducts = await getAllProductsDB();
    if (dbProducts && dbProducts.length > 0) return dbProducts;
  } catch (e) {}

  return getStaticProducts();
}

/* ===========================
   STATIC PARAMS
=========================== */
export async function getAllProductPaths() {
  try {
    const dbPaths = await getAllProductPathsDB();
    if (dbPaths && dbPaths.length > 0) return dbPaths;
  } catch (e) {}

  return getStaticPaths();
}
