"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { highPowerData } from "@/data/categories/highPowerData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { sledLightData } from "@/data/categories/sledLightData";

export type ProductCard = {
  id: string;
  title: string;
  short: string;
  img?: string;
  href?: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  showSeeAllButton?: boolean;
};

const categoryData = [
  singleFrequencyData,
  seedFiberData,
  highPowerData,
  wavelengthConversionData,
  broadbandAseData,
  fiberAmplifierData,
  laserTestingData,
  sledLightData,
];

const products: ProductCard[] = categoryData.map((cat) => ({
  id: cat.url,
  title: cat.intro.heading,
  short: cat.hero.tagline,
  img: cat.hero.image,
  href: `/products${cat.url}`,
}));

export default function ProductFamilies({
  heading = "Product Families",
  subheading = "Explore our complete range of high-performance laser systems and optical sources.",
  showSeeAllButton = true,
}: Props) {
  const gridBgStyle = {
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
    `,
    backgroundSize: '2rem 2rem',
  };

  return (
    <section 
      className="relative bg-[var(--color-primary)] py-16 text-white"
      style={gridBgStyle}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">{heading}</h2>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">{subheading}</p>
        </div>

        {/* product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={p.href || "/products"} className="block h-full">
              <div
                className="group bg-white text-black rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 h-full cursor-pointer flex flex-col"
              >
                {/* image */}
                <div className="relative h-40 md:h-44 overflow-hidden shrink-0">
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>

                {/* text content */}
                <div className="p-4 md:p-5 flex flex-col grow">
                  <div className="grow">
                    <h3 className="text-lg font-semibold mb-2 text-[#111827]">{p.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{p.short}</p>
                  </div>
                  <div className="mt-4">
                    <span
                      className="inline-block rounded-full bg-primary text-white text-sm px-4 py-2 font-medium"
                    >
                      View More
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* button bottom center */}
        {showSeeAllButton && (
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-white text-primary font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-white/90 transition"
            >
              See All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
