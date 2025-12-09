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

<<<<<<< HEAD
/** Band key → simple label */
=======
/** Band key → heading text */
>>>>>>> origin/main
function bandLabelFromKey(key: string): string {
  switch (key) {
    case "1um":
      return "1.0 µm";
    case "1_5um":
      return "1.5 µm";
    case "2um":
      return "2.0 µm";
<<<<<<< HEAD
    default:
      return "Other";
  }
}

// Column order (categories)
const CATEGORY_COLUMN_CONFIG = [
  { slug: "single-frequency", title: "Single-Frequency Fiber Lasers" },
  { slug: "seed-lasers", title: "Seed Lasers" },
  { slug: "high-power", title: "High-Power Fiber Lasers" },
  { slug: "wavelength-conversion", title: "Wavelength Conversion Lasers" },
  { slug: "testing", title: "Testing Systems" },
  { slug: "ase-sources", title: "Broadband & ASE Sources" },
  { slug: "fiber-amplifiers", title: "Fiber Amplifiers" },
  { slug: "sled", title: "SLED Light Sources" },
];

// Band order inside category
=======
    case "_other":
      return "Other wavelengths";
    default:
      return key;
  }
}

// Column order: 1.0µm → 1.5µm → 2.0µm → others
>>>>>>> origin/main
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

<<<<<<< HEAD
type ColumnBand = {
  key: string;
  label: string;
  products: CatalogProduct[];
};

type Column = {
  slug: string;
  title: string;
  bands: ColumnBand[];
};

/** Column + band subtitle text (jaise screenshot me bold lines) */
function bandSubtitleForColumn(columnSlug: string, bandLabel: string) {
  switch (columnSlug) {
    case "single-frequency":
      return `${bandLabel} single-frequency fiber lasers`;
    case "seed-lasers":
      return `${bandLabel} seed lasers`;
    case "high-power":
      return `${bandLabel} high-power single-frequency lasers`;
    case "wavelength-conversion":
      return `${bandLabel} wavelength conversion lasers`;
    case "testing":
      return `${bandLabel} test systems`;
    case "ase-sources":
      return `${bandLabel} ASE / broadband sources`;
    case "fiber-amplifiers":
      return `${bandLabel} fiber amplifiers`;
    case "sled":
      return `${bandLabel} SLED light sources`;
    default:
      return `${bandLabel}`;
  }
}

// Featured products column – tumhare text se map kiya hua
const FEATURED_PRODUCTS = [
  {
    label: "Hz-level ultra-narrow linewidth single-frequency fiber laser",
    href: "/products/single-frequency/ultra-narrow-linewidth",
  },
  {
    label: "Wideband ultra-low noise single-frequency fiber laser",
    href: "/products/single-frequency/broadband-low-noise",
  },
  {
    label: "Kilowatt-class fiber laser for combustion diagnostics",
    href: "/products/high-power/kilowatt",
  },
  {
    label: "Compact single-frequency fiber laser",
    href: "/products/single-frequency/compact",
  },
  {
    label: "High-sensitivity magnetic detection laser",
    href: "/products/single-frequency/magnetic-field",
  },
  {
    label: "High-power light source for long-range, high-resolution lidar",
    href: "/products/high-power/lidar",
  },
  {
    label: "Frequency-stabilized laser for high-sensitivity sensing",
    href: "/products/single-frequency/sensor-stabilized",
  },
];

const ProductsIndexShell: React.FC<Props> = ({ catalog }) => {
  /** Category → bands → products */
  const columns: Column[] = useMemo(() => {
    type BandBucket = { label: string; products: CatalogProduct[] };

    const map = new Map<
      string,
      {
        slug: string;
        title: string;
        bands: Map<string, BandBucket>;
      }
    >();

    const configBySlug = new Map(
      CATEGORY_COLUMN_CONFIG.map((c) => [c.slug, c])
    );

    (catalog || []).forEach((cat) => {
      if (!configBySlug.has(cat.categorySlug)) return;

      const cfg = configBySlug.get(cat.categorySlug)!;
      const baseTitle = cfg.title || formatCategoryTitle(cat.categorySlug);

      if (!map.has(cat.categorySlug)) {
        map.set(cat.categorySlug, {
          slug: cat.categorySlug,
          title: baseTitle,
          bands: new Map(),
        });
      }

      const col = map.get(cat.categorySlug)!;
=======
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
>>>>>>> origin/main

      (cat.products || []).forEach((p) => {
        const bandKey = inferBandKeyFromTitle(p.title);
        const bandLabel = bandLabelFromKey(bandKey);

<<<<<<< HEAD
        if (!col.bands.has(bandKey)) {
          col.bands.set(bandKey, { label: bandLabel, products: [] });
        }

        col.bands.get(bandKey)!.products.push(p);
      });
    });

    // Map → ordered array
    const cols: Column[] = CATEGORY_COLUMN_CONFIG.map((cfg) => {
      const col = map.get(cfg.slug);
      if (!col)
        return {
          slug: cfg.slug,
          title: cfg.title,
          bands: [],
        };

      const bands: ColumnBand[] = Array.from(col.bands.entries())
        .map(([key, bucket]) => ({
          key,
          label: bucket.label,
          products: bucket.products.sort((a, b) =>
            a.title.localeCompare(b.title)
          ),
        }))
        .sort((a, b) => sortBands(a.key, b.key));

      return {
        slug: col.slug,
        title: cfg.title,
        bands,
      };
    });

    return cols;
  }, [catalog]);

  const familiesWithProducts = useMemo(
    () => columns.filter((c) => c.bands.some((b) => b.products.length > 0)),
    [columns]
  );

  const totalModels = useMemo(
    () =>
      (catalog || []).reduce(
        (sum, cat) => sum + (cat.products?.length ?? 0),
        0
      ),
    [catalog]
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
            Structured index of all laser products.
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 max-w-xl">
            Left column lists featured models; other columns group products by
            family (single-frequency, seed, high-power, etc.) and wavelength
            band inside each family — similar to a catalog table view.
=======
            Wavelength-wise index of all laser products.
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 max-w-xl">
            Columns are global wavelength bands: all 1.0 µm products together,
            then 1.5 µm, then 2.0 µm. Inside each band, models are grouped by
            product family.
>>>>>>> origin/main
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
            <span className="uppercase tracking-[0.18em] text-slate-500">
<<<<<<< HEAD
              Family view
            </span>
          </span>
          <span className="text-slate-500">
            {familiesWithProducts.length} families ·{" "}
            <span className="font-semibold text-slate-800">{totalModels}</span>{" "}
=======
              Band view
            </span>
          </span>
          <span className="text-slate-500">
            {bands.length} bands ·{" "}
            <span className="font-semibold text-slate-800">{totalProducts}</span>{" "}
>>>>>>> origin/main
            models
          </span>
        </div>
      </div>

<<<<<<< HEAD
      {/* GRID: Featured + category columns (screenshot style) */}
      <div className="relative mt-2 grid gap-x-14 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {/* Featured products column */}
        <div className="min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-3">
            Featured Products
          </h3>
          <ul className="space-y-1.5 text-xs md:text-sm leading-relaxed text-slate-600">
            {FEATURED_PRODUCTS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group inline-flex items-baseline gap-1 max-w-full"
                >
                  <span className="mt-[3px] h-[3px] w-[3px] rounded-full bg-slate-300 group-hover:bg-[#3B9ACB] shrink-0 " />
                  <span className="truncate group-hover:text-[#3B9ACB] group-hover:underline underline-offset-[3px] decoration-slate-300">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Other columns: Single-frequency, Seed, High-power, etc. */}
        {familiesWithProducts.map((col) => (
          <div key={col.slug} className="min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-3">
              {col.title}
            </h3>

            {col.bands
              .filter((band) => band.products.length > 0)
              .map((band, idx) => (
                <div key={band.key} className={idx > 0 ? "mt-4" : ""}>
                  <p className="text-xs md:text-[13px] font-semibold text-slate-900">
                    {bandSubtitleForColumn(col.slug, band.label)}
                  </p>
                  <ul className="mt-1 space-y-1 text-xs md:text-sm leading-relaxed text-slate-600">
                    {band.products.map((p) => (
                      <li key={p.slug} className="truncate">
                        <a
                          href={`/products/${col.slug}/${p.slug}`}
                          className="group inline-flex items-baseline gap-1 max-w-full transition-transform duration-150 hover:translate-x-px"
                        >
                          <span className="mt-[3px] h-[3px] w-[3px] rounded-full bg-slate-300 group-hover:bg-[#3B9ACB] shrink-0" />
                          <span className="truncate group-hover:text-[#3B9ACB] group-hover:underline underline-offset-[3px] decoration-slate-300">
                            {p.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
=======
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
>>>>>>> origin/main
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsIndexShell;
