// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { highPowerData } from "@/data/categories/highPowerData";
import { pointLightSourceData } from "@/data/categories/pointLightSourceData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { sledLightData } from "@/data/categories/sledLightData";

// Map category slugs to their image data
const categoryImageMap: Record<string, string> = {
  "broadband-ase-sources": broadbandAseData.hero.image,
  "fiber-amplifiers": fiberAmplifierData.hero.image,
  "high-power-fiber-lasers": highPowerData.hero.image,
  "point-light-sources": pointLightSourceData.hero.image,
  "seed-lasers": seedFiberData.hero.image,
  "single-frequency-fiber-lasers": singleFrequencyData.hero.image,
  "wavelength-conversion-lasers": wavelengthConversionData.hero.image,
  "testing-systems": laserTestingData.hero.image,
  "sled": sledLightData.hero.image,
};

export async function GET() {
  try {
    const products = getAllProducts();
    
    // Enhance products with category images from data files
    const enrichedProducts = products.map((cat) => {
      const categoryImage = categoryImageMap[cat.categorySlug] || "";
      
      return {
        categorySlug: cat.categorySlug,
        categoryTitle: cat.categoryTitle,
        categoryImage,
        products: cat.products,
      };
    });
    
    return NextResponse.json({ products: enrichedProducts });
  } catch (err) {
    console.error("Error in /api/products:", err);
    return NextResponse.json({ products: [] });
  }
}
