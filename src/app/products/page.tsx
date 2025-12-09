// app/products/page.tsx
import React from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductsIndexShell from "./components/ProductsIndexShell";

export const metadata: Metadata = {
  title: "Products | Techwin",
  description:
    "Explore Techwin’s complete laser product portfolio: single-frequency fiber lasers, high-power CW lasers, seed sources, frequency-conversion lasers, testing systems and more.",
};

export default async function ProductsPage() {
  const catalog = await getAllProducts();

  const totalCategories = catalog.length;
  const totalProducts = catalog.reduce(
    (sum: number, cat: any) => sum + (cat.products?.length ?? 0),
    0
  );

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-linear-to-b from-[#f7faff] via-[#eef3fb] to-[#f4f7fb] text-slate-900">
=======
    <main className="min-h-screen bg-gradient-to-b from-[#f7faff] via-[#eef3fb] to-[#f4f7fb] text-slate-900">
>>>>>>> origin/main
      {/* Top band */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="uppercase tracking-[0.22em] text-slate-400">
              PRODUCT CENTER
            </span>
<<<<<<< HEAD
            <span className="h-px w-6 bg-slate-300" />
=======
            <span className="h-[1px] w-6 bg-slate-300" />
>>>>>>> origin/main
            <span className="hidden sm:inline text-slate-500">
              Techwin Global Laser Product Index
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <span>
              {totalCategories} families ·{" "}
              <span className="font-semibold text-slate-900">
                {totalProducts}
              </span>{" "}
              products
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-5 pt-40 md:pt-40 pb-14">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.05)] px-8 py-12 mb-12">
          {/* subtle accents */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-[#3B9ACB]/20 blur-[140px]" />
            <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-slate-300/40 blur-[130px]" />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            {/* LEFT TEXT */}
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                <span className="text-slate-900">Techwin</span>{" "}
                <span className="text-[#3B9ACB]">Laser Product Center</span>
              </h1>

              <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
                A structured index of Techwin’s full laser portfolio — covering
                single-frequency modules, fiber lasers, ASE sources, frequency
                conversion, high-power CW systems and laser test equipment.
              </p>
            </div>

            {/* RIGHT FACT BLOCK */}
            <div className="flex flex-col items-start md:items-end gap-6 text-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-4 py-2 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                <span className="uppercase tracking-[0.18em] text-slate-600">
                  Precision Photonics
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">
                    Wavelength Range
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    1.0 – 2.0 µm
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">
                    Output Power
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    mW → kW
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT INDEX */}
        <section>
          <ProductsIndexShell catalog={catalog} />
        </section>
      </div>
    </main>
  );
}
