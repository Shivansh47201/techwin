// src/lib/products.db.ts
import mongoose from "mongoose";
import { cache } from "react";
import Product from "@/models/Product";

/* -------------------------------
   DB CONNECT (SAFE)
--------------------------------*/
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI as string, {
    bufferCommands: false,
  });
}

/* -------------------------------
   GET SINGLE PRODUCT
--------------------------------*/
export const getProductDataDB = cache(
  async (category: string, slug: string) => {
    await connectDB();

    const product = await Product.findOne({
      category,
      slug,
      status: "published",
    }).lean();

    if (!product) return null;

    return normalizeProduct(product);
  }
);

/* -------------------------------
   GET PRODUCTS BY CATEGORY
--------------------------------*/
export const getProductsByCategoryDB = cache(
  async (category: string) => {
    await connectDB();

    const products = await Product.find({
      category,
      status: "published",
    })
      .sort({ title: 1 })
      .lean();

    return products.map(normalizeProduct);
  }
);

/* -------------------------------
   GET ALL PRODUCTS (CATALOG)
--------------------------------*/
export const getAllProductsDB = cache(async () => {
  await connectDB();

  const products = await Product.find(
    { status: "published" },
    { slug: 1, title: 1, category: 1 }
  )
    .sort({ category: 1, title: 1 })
    .lean();

  const map: Record<string, { categorySlug: string; products: any[] }> = {};

  for (const p of products) {
    if (!map[p.category]) {
      map[p.category] = {
        categorySlug: p.category,
        products: [],
      };
    }

    map[p.category].products.push({
      slug: p.slug,
      title: p.title,
    });
  }

  return Object.values(map);
});

/* -------------------------------
   GET STATIC PARAMS
--------------------------------*/
export const getAllProductPathsDB = cache(async () => {
  await connectDB();

  const products = await Product.find(
    { status: "published" },
    { slug: 1, category: 1 }
  ).lean();

  return products.map((p) => ({
    category: p.category,
    product: p.slug,
  }));
});

/* -------------------------------
   NORMALIZER
--------------------------------*/
function normalizeProduct(p: any) {
  return {
    ...p,
    id: p._id.toString(),

    heroImage: p.heroImage ?? {
      src: "/placeholder.jpg",
      alt: p.title,
    },

    galleryImages: p.galleryImages ?? [],
    sections: p.sections ?? [],
    features: p.features ?? [],
    applicationAreas: p.applicationAreas ?? [],
    relatedProducts: p.relatedProducts ?? [],

    previewImageSrc: p.previewImageSrc,
    datasheetUrl: p.datasheetUrl,
    datasheetImageSrc: p.datasheetImageSrc,

    tableCsvUrl: p.tableCsvUrl,
    tableImageURL: p.tableImageURL,
    graphImageURL: p.graphImageURL,
  };
}
