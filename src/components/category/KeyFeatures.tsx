// src/components/category/KeyFeatures.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";

export type FeatureItemObj = {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  text: string;
  details?: string;
};

export type FeatureItem = string | FeatureItemObj;

export interface SubCategoryItemObj {
  id?: string;
  name: string;
  shortDescription: string;
  details?: string;
}

export interface FeatureMatrixCategory {
  id: string;
  name: string;
  features: {
    stability: string;
    noise: string;
    coherence: string;
    integration: string;
    bonus5?: string;
    bonus6?: string;
  };
}

export interface FeatureMatrixData {
  categories: FeatureMatrixCategory[];
}

type Props = {
  items?: FeatureItem[];
  featureMatrix?: FeatureMatrixData;
  subCategories?: SubCategoryItemObj[];
  maxColumns?: 1 | 2 | 3;
  interactive?: boolean;
  compact?: boolean;
  headingLevel?: string;
};

const WRAPPER = "max-w-7xl mx-auto px-4 sm:px-6";
const SECTION = "py-8 sm:py-12 md:py-16";
const PRIMARY = "#3B9ACB";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.9, 0.3, 1] },
  },
};

const getFeatureLabel = (featureType: string, featureValue?: string): string => {
  switch (featureType) {
    case "stability":
      return "Stability";
    case "noise":
      return "Low Noise";
    case "coherence":
      return "High Coherence";
    case "integration":
      return "Easy Integration";
    case "bonus5":
      if (featureValue) {
        const words = featureValue.split(" ");
        return words.slice(0, 2).join(" ");
      }
      return "Extra Feature";
    case "bonus6":
      if (featureValue) {
        const words = featureValue.split(" ");
        return words.slice(0, 2).join(" ");
      }
      return "Advanced Feature";
    default:
      return featureType;
  }
};

export default function KeyFeatures({
  items,
  featureMatrix,
  subCategories = [],
  interactive = true,
  headingLevel = "h2",
}: Props) {
  const hasFeatureMatrix =
    featureMatrix && featureMatrix.categories && featureMatrix.categories.length > 0;

  const matrixCategories = useMemo<FeatureMatrixCategory[]>(() => {
    if (hasFeatureMatrix) {
      if (subCategories && subCategories.length > 0) {
        const featureMatrixCategories = featureMatrix!.categories;
        return subCategories.map((subCat, index) => {
          const featureData =
            featureMatrixCategories[index % featureMatrixCategories.length];
          return {
            id: subCat.id || `sub-cat-${index}`,
            name: subCat.name,
            features: featureData.features,
          };
        });
      }
      return featureMatrix!.categories;
    }
    return [];
  }, [featureMatrix, hasFeatureMatrix, subCategories]);

  const normalized = useMemo<FeatureItemObj[]>(
    () =>
      items
        ? items.map((it, i) =>
            typeof it === "string"
              ? { id: `feature-${i}`, text: it }
              : {
                  id: it.id ?? `feature-${i}`,
                  title: it.title,
                  text: it.text,
                  details: it.details,
                  icon: it.icon,
                }
          )
        : [],
    [items]
  );

  const [activeId, setActiveId] = useState<string>("");
  const [activeFeatureType, setActiveFeatureType] = useState<string>("stability");

  const isUsingMatrix = hasFeatureMatrix && matrixCategories.length > 0;

  // ensure a valid default active id is always set (prevents blank UI)
  useEffect(() => {
    if (isUsingMatrix) {
      if (matrixCategories.length > 0) {
        setActiveId((prev) => (prev ? prev : matrixCategories[0].id));
      }
    } else {
      if (normalized.length > 0) {
        setActiveId((prev) => (prev ? prev : normalized[0].id!));
      }
    }
  }, [isUsingMatrix, matrixCategories, normalized]);

  const activeCategory = isUsingMatrix
    ? matrixCategories.find((c) => c.id === activeId) ?? matrixCategories[0]
    : null;

  const activeItem = !isUsingMatrix
    ? normalized.find((f) => f.id === activeId) ?? normalized[0]
    : null;

  if (!isUsingMatrix && !normalized.length) return null;

  const handleTabClick = (id: string) => {
    if (!interactive) return;
    setActiveId(id);
    setActiveFeatureType("stability");
  };

  const getLabel = (feat: FeatureItemObj, index: number) => {
    if (feat.title && feat.title.trim().length > 0) return feat.title;
    const raw = feat.text || "";
    return raw.length > 42 ? raw.slice(0, 42) + "…" : raw || `Feature ${index + 1}`;
  };

  const activeIndex = isUsingMatrix
    ? Math.max(0, matrixCategories.findIndex((c) => c.id === activeId)) + 1
    : Math.max(0, normalized.findIndex((f) => f.id === activeId)) + 1;

  // feature types for selector (use available bonus fields)
  const featureTypes: string[] = ["stability", "noise", "coherence", "integration"];
  if (activeCategory?.features?.bonus5) featureTypes.push("bonus5");
  if (activeCategory?.features?.bonus6) featureTypes.push("bonus6");

  return (
    <section className={`${SECTION} bg-slate-50`} aria-label="Key features">
      <div className={WRAPPER}>
        {/* header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-1.5 w-8 rounded-full bg-[#3B9ACB]/20" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Feature matrix
                </span>
              </div>
              {React.createElement(
                headingLevel,
                { className: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.02em] text-[#3B9ACB]" },
                "Engineered features that matter in the lab"
              )}
            </div>

            {/* mobile compact action / count (keeps layout tidy) */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => {
                  // small convenience: jump to next item for quick preview on mobile
                  if (isUsingMatrix && matrixCategories.length > 1) {
                    const idx = matrixCategories.findIndex((c) => c.id === activeId);
                    setActiveId(matrixCategories[(idx + 1) % matrixCategories.length].id);
                  } else if (!isUsingMatrix && normalized.length > 1) {
                    const idx = normalized.findIndex((f) => f.id === activeId);
                    setActiveId(normalized[(idx + 1) % normalized.length].id!);
                  }
                }}
                aria-label="Toggle preview"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium"
              >
                <span className="text-xs font-semibold">
                  {isUsingMatrix ? `${matrixCategories.length} items` : `${normalized.length} items`}
                </span>
                <span className="inline-block w-5 h-5 rounded-full bg-white/10 text-xs text-white flex items-center justify-center">›</span>
              </button>
            </div>
          </div>

          
        </motion.div>

        {/* grid: left (tabs) + right (panel) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6"
        >
          {/* left: categories / tabs */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                  {isUsingMatrix ? matrixCategories.length : normalized.length} engineered capabilities
                </span>
                <span className="hidden md:inline-flex text-[11px] text-slate-400">Select to view details</span>
              </div>

              {/* desktop: vertical list */}
              <div className="hidden md:flex md:flex-col gap-2">
                {(isUsingMatrix ? matrixCategories : normalized).map((entry: any, idx: number) => {
                  const id = isUsingMatrix ? entry.id : entry.id;
                  const label = isUsingMatrix ? entry.name : getLabel(entry, idx);
                  const isActive = id === activeId;
                  return (
                    <button
                      key={id}
                      onClick={() => handleTabClick(id)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all border ${
                        isActive
                          ? "bg-[#3B9ACB]/10 border-[#3B9ACB]/50 text-[#3B9ACB] shadow-sm"
                          : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-semibold ${isActive ? "bg-[#3B9ACB] text-white" : "bg-slate-100 text-slate-700"}`}>
                          {idx + 1}
                        </span>
                        <span className="truncate">{label}</span>
                      </div>
                      <span className={`hidden md:inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] border ${isActive ? "border-[#3B9ACB]/40 text-[#3B9ACB]" : "border-slate-200 text-slate-400"}`}>
                        ⋯
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* mobile: horizontal pill scroller */}
              <div className="md:hidden -mx-2 px-2 overflow-x-auto hide-scrollbar">
                <div className="flex gap-3 items-center py-2">
                  {(isUsingMatrix ? matrixCategories : normalized).map((entry: any, idx: number) => {
                    const id = isUsingMatrix ? entry.id : entry.id;
                    const label = isUsingMatrix ? entry.name : getLabel(entry, idx);
                    const isActive = id === activeId;
                    return (
                      <button
                        key={id}
                        onClick={() => handleTabClick(id)}
                        className={`flex-shrink-0 inline-flex items-center gap-3 px-3.5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                          isActive ? "bg-[#3B9ACB] text-white shadow-md" : "bg-white text-[#3B9ACB] border border-[#3B9ACB]/20"
                        }`}
                        type="button"
                        aria-pressed={isActive}
                      >
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-semibold ${isActive ? "bg-white text-[#3B9ACB]" : "bg-[#e6f7ff] text-[#3B9ACB]"}`}>
                          {idx + 1}
                        </span>
                        <span className="truncate max-w-[11rem]">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* right: active panel */}
          <div className="md:col-span-8">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-lg overflow-hidden">
              {/* decorative gradients */}
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-16 w-48 h-48 rounded-full bg-[#3B9ACB]/8 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 w-52 h-40 rounded-full bg-sky-200/30 blur-3xl" />

              <motion.div
                key={`${activeId}-${activeFeatureType}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 0.9, 0.3, 1] }}
                className="relative z-10"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                  <span className="truncate inline-block max-w-[60%]">
                    {isUsingMatrix
                      ? `${activeCategory?.name ?? ""} – Capability #${activeIndex}`
                      : `Focused capability #${activeIndex}`}
                  </span>
                </div>

                {/* title + intro */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900">
                    {isUsingMatrix ? activeCategory?.name : activeItem?.title ?? getLabel(activeItem!, 0)}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[12px] text-slate-500">
                    {isUsingMatrix
                      ? "Performance metrics and technical specifications across key dimensions like stability, noise, coherence and integration."
                      : "Key capability within this product family."}
                  </p>
                </div>

                {/* feature type selector:
                    - mobile: horizontal scroller (PRIMARY styling)
                    - md+: grid with PRIMARY active pill
                */}
                <div className="mt-4">
                  {/* desktop grid */}
                  <div className="hidden md:grid gap-2"
                    style={{
                      gridTemplateColumns:
                        featureTypes.length <= 3
                          ? "repeat(3, minmax(0,1fr))"
                          : featureTypes.length <= 4
                          ? "repeat(4, minmax(0,1fr))"
                          : featureTypes.length <= 5
                          ? "repeat(5, minmax(0,1fr))"
                          : "repeat(6, minmax(0,1fr))",
                    }}
                  >
                    {featureTypes.map((fType) => {
                      const isActiveFeature = fType === activeFeatureType;
                      const label = getFeatureLabel(fType, activeCategory?.features?.[fType as keyof FeatureMatrixCategory["features"]]);
                      return (
                        <button
                          key={fType}
                          onClick={() => setActiveFeatureType(fType)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                            isActiveFeature ? "bg-[#3B9ACB] text-white border-transparent shadow-lg" : "bg-white text-[#3B9ACB] border-[#3B9ACB]/20"
                          }`}
                          type="button"
                          aria-pressed={isActiveFeature}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* mobile scroller */}
                  <div className="md:hidden -mx-2 px-2 overflow-x-auto hide-scrollbar mt-1">
                    <div className="flex gap-3 items-center py-2">
                      {featureTypes.map((fType) => {
                        const isActiveFeature = fType === activeFeatureType;
                        const label = getFeatureLabel(fType, activeCategory?.features?.[fType as keyof FeatureMatrixCategory["features"]]);
                        return (
                          <button
                            key={fType}
                            onClick={() => setActiveFeatureType(fType)}
                            className={`flex-shrink-0 inline-flex items-center gap-3 px-3 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                              isActiveFeature ? "bg-[#3B9ACB] text-white shadow-md" : "bg-white text-[#3B9ACB] border border-[#3B9ACB]/20"
                            }`}
                            type="button"
                            aria-pressed={isActiveFeature}
                          >
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-semibold ${isActiveFeature ? "bg-white text-[#3B9ACB]" : "bg-[#e6f7ff] text-[#3B9ACB]"}`}>
                              ●
                            </span>
                            <span className="truncate max-w-[12rem]">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* details panel for active feature */}
                <div className="mt-4 rounded-2xl bg-slate-50/80 border border-slate-200 px-4 py-4">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">
                    {getFeatureLabel(activeFeatureType, activeCategory?.features?.[activeFeatureType as keyof FeatureMatrixCategory["features"]])}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isUsingMatrix
                      ? activeCategory?.features[activeFeatureType as keyof FeatureMatrixCategory["features"]] ?? "Feature details not available"
                      : activeItem?.details ?? activeItem?.text ?? "Feature details not available"}
                  </p>
                </div>

                {/* grid with all metrics */}
                {isUsingMatrix && (
                  <div className="mt-4">
                    <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">All Performance Metrics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {featureTypes.map((fType) => (
                        <div key={fType} className="relative p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                          <p className="text-[11px] font-semibold text-slate-700 mb-1">{getFeatureLabel(fType, activeCategory?.features?.[fType as keyof FeatureMatrixCategory["features"]])}</p>
                          <p className="text-[12px] text-slate-600 leading-relaxed">
                            {activeCategory?.features?.[fType as keyof FeatureMatrixCategory["features"]] ?? "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between">
                    {/* <span>Interactive comparison for quick decision-making.</span>
                    <span className="hidden sm:inline">Tap a metric to read detailed impact.</span> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
