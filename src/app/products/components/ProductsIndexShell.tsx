// app/products/components/ProductsIndexShell.tsx
"use client";

import React, { useMemo } from "react";

type CatalogProduct = {
  slug: string;
  title: string;
};

type CatalogCategory = {
  categorySlug: string;
  categoryTitle?: string;
  products: CatalogProduct[];
};

type Props = {
  catalog: CatalogCategory[];
};

function formatCategoryTitle(slug: string, title?: string) {
  if (title && title.trim().length > 0) return title;
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Title se 1.0µm / 1.5µm / 2.0µm band detect karo */
function inferBandKeyFromTitle(title: string): string {
  const t = title.toLowerCase().replace(/\s/g, "");

  // 1.0 µm family
  if (
    t.includes("1.0µm") ||
    t.includes("1.0μm") ||
    t.includes("1.0um") ||
    t.includes("1µm") ||
    t.includes("1μm") ||
    t.includes("1um")
  ) {
    return "1um";
  }

  // 1.5 µm family
  if (
    t.includes("1.5µm") ||
    t.includes("1.5μm") ||
    t.includes("1.5um") ||
    t.includes("1_5µm") ||
    t.includes("1_5μm") ||
    t.includes("1_5um")
  ) {
    return "1_5um";
  }

  // 2.0 µm family
  if (
    t.includes("2.0µm") ||
    t.includes("2.0μm") ||
    t.includes("2.0um") ||
    t.includes("2µm") ||
    t.includes("2μm") ||
    t.includes("2um")
  ) {
    return "2um";
  }

  return "_other";
}

/** Band key → heading text */
function bandLabelFromKey(key: string): string {
  switch (key) {
    case "1um":
      return "1.0 µm";
    case "1_5um":
      return "1.5 µm";
    case "2um":
      return "2.0 µm";
    case "_other":
      return "Other wavelengths";
    default:
      return key;
  }
}

// Column order: 1.0µm → 1.5µm → 2.0µm → others
const BAND_ORDER = ["1um", "1_5um", "2um"];

function sortBands(aKey: string, bKey: string) {
  const ia = BAND_ORDER.indexOf(aKey);
  const ib = BAND_ORDER.indexOf(bKey);

  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;

  if (aKey === "_other") return 1;
  if (bKey === "_other") return -1;

  return aKey.localeCompare(bKey);
}

const ProductsIndexShell: React.FC<Props> = ({ catalog }) => {
  /**
   * GLOBAL GROUPING:
   * band (1um / 1.5um / 2um / other)
   *   -> categories (Single-frequency module, High-power narrow-linewidth...)
   *     -> products
   */
  const bands = useMemo(() => {
    type BandCategory = {
      categorySlug: string;
      categoryTitle: string;
      products: CatalogProduct[];
    };

    type BandBucket = {
      key: string;
      label: string;
      categories: BandCategory[];
    };

    const bandMap = new Map<
      string,
      {
        label: string;
        categories: Map<string, BandCategory>;
      }
    >();

    (catalog || []).forEach((cat) => {
      const catTitle = formatCategoryTitle(
        cat.categorySlug,
        cat.categoryTitle
      );

      (cat.products || []).forEach((p) => {
        const bandKey = inferBandKeyFromTitle(p.title);
        const bandLabel = bandLabelFromKey(bandKey);

        if (!bandMap.has(bandKey)) {
          bandMap.set(bandKey, {
            label: bandLabel,
            categories: new Map(),
          });
        }

        const bandBucket = bandMap.get(bandKey)!;

        if (!bandBucket.categories.has(cat.categorySlug)) {
          bandBucket.categories.set(cat.categorySlug, {
            categorySlug: cat.categorySlug,
            categoryTitle: catTitle,
            products: [],
          });
        }

        bandBucket.categories.get(cat.categorySlug)!.products.push(p);
      });
    });

    const bandArray: BandBucket[] = Array.from(bandMap.entries()).map(
      ([key, value]) => ({
        key,
        label: value.label,
        categories: Array.from(value.categories.values()).map((c) => ({
          ...c,
          products: c.products.sort((a, b) =>
            a.title.localeCompare(b.title)
          ),
        })),
      })
    );

    // sort bands 1.0µm → 1.5µm → 2.0µm → others
    bandArray.sort((a, b) => sortBands(a.key, b.key));

    // sort categories alphabetically inside band
    bandArray.forEach((band) => {
      band.categories.sort((a, b) =>
        a.categoryTitle.localeCompare(b.categoryTitle)
      );
    });

    return bandArray;
  }, [catalog]);

  const totalProducts = useMemo(
    () =>
      bands.reduce(
        (sum, band) =>
          sum +
          band.categories.reduce(
            (s, c) => s + c.products.length,
            0
          ),
        0
      ),
    [bands]
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm px-4 sm:px-6 md:px-8 py-7 md:py-9">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-20 left-10 h-40 w-40 rounded-full bg-[#3B9ACB]/8 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      {/* header */}
      <div className="relative mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Product Center
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            Wavelength-wise index of all laser products.
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 max-w-xl">
            Columns are global wavelength bands: all 1.0 µm products together,
            then 1.5 µm, then 2.0 µm. Inside each band, models are grouped by
            product family.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
            <span className="uppercase tracking-[0.18em] text-slate-500">
              Band view
            </span>
          </span>
          <span className="text-slate-500">
            {bands.length} bands ·{" "}
            <span className="font-semibold text-slate-800">{totalProducts}</span>{" "}
            models
          </span>
        </div>
      </div>

      {/* GRID: 1.0µm | 1.5µm | 2.0µm | Others */}
      <div className="relative mt-2 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bands.map((band) => (
          <div
            key={band.key}
            className="min-w-0 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)]"
          >
            {/* Band heading: 1.0 µm, 1.5 µm, 2.0 µm */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm md:text-base font-semibold text-slate-900">
                {band.label}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                {band.categories.reduce(
                  (s, c) => s + c.products.length,
                  0
                )}{" "}
                models
              </span>
            </div>

            {/* Category sections inside band */}
            {band.categories.map((cat, catIndex) => (
              <div
                key={cat.categorySlug}
                className={catIndex > 0 ? "mt-4 pt-3 border-t border-dashed border-slate-100" : "mt-2"}
              >
                {/* Category title visible & clear */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-1 w-4 rounded-full bg-[#3B9ACB]/60" />
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    {cat.categoryTitle}
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs md:text-sm leading-relaxed">
                  {cat.products.map((p) => (
                    <li key={p.slug} className="truncate">
                      <a
                        href={`/products/${cat.categorySlug}/${p.slug}`}
                        className="group inline-flex items-baseline gap-1 max-w-full transition-transform duration-150 hover:translate-x-[1px]"
                      >
                        <span className="mt-[3px] h-[3px] w-[3px] rounded-full bg-slate-300 group-hover:bg-[#3B9ACB] flex-shrink-0" />
                        <span className="truncate text-slate-700 group-hover:text-[#3B9ACB] group-hover:underline underline-offset-[3px] decoration-slate-300">
                          {p.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsIndexShell;
