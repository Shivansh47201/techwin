// src/components/category/KeyFeatures.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";

export type FeatureItemObj = {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  text: string;
  details?: string;
};

export type FeatureItem = string | FeatureItemObj;

// Sub Category Item for display
export interface SubCategoryItemObj {
  id?: string;
  name: string;
  shortDescription: string;
  details?: string;
}

// Feature Matrix types
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
};

const WRAPPER = "max-w-7xl mx-auto px-6";
const SECTION = "py-12 md:py-16";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.9, 0.3, 1] },
  },
};

const getFeatureIcon = (featureType: string): React.ReactNode => {
  switch (featureType) {
    case "stability":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "noise":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm-2 15l-5-5 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z" />
        </svg>
      );
    case "coherence":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
        </svg>
      );
    case "integration":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
  }
};

const getFeatureColor = (featureType: string): string => {
  switch (featureType) {
    case "stability":
      return "from-blue-400 to-blue-600 text-blue-600";
    case "noise":
      return "from-green-400 to-green-600 text-green-600";
    case "coherence":
      return "from-purple-400 to-purple-600 text-purple-600";
    case "integration":
      return "from-orange-400 to-orange-600 text-orange-600";
    case "bonus5":
      return "from-pink-400 to-pink-600 text-pink-600";
    case "bonus6":
      return "from-indigo-400 to-indigo-600 text-indigo-600";
    default:
      return "from-slate-400 to-slate-600 text-slate-600";
  }
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
      // Extract meaningful label from feature value if it's the first few words
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
}: Props) {
  // If featureMatrix is provided, use it; otherwise fall back to items
  const hasFeatureMatrix = featureMatrix && featureMatrix.categories && featureMatrix.categories.length > 0;

  const matrixCategories = useMemo<FeatureMatrixCategory[]>(() => {
    if (hasFeatureMatrix) {
      // If we have subCategories, combine them with featureMatrix
      if (subCategories && subCategories.length > 0) {
        // Create a map of featureMatrix by index
        const featureMatrixCategories = featureMatrix!.categories;
        
        // Combine subCategories with featureMatrix, cycling through if needed
        return subCategories.map((subCat, index) => {
          const featureData = featureMatrixCategories[index % featureMatrixCategories.length];
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

  // normalize items (for backward compatibility)
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

  // Initialize activeId when data is ready
  React.useEffect(() => {
    if (hasFeatureMatrix && matrixCategories.length > 0 && !activeId) {
      setActiveId(matrixCategories[0].id);
    } else if (!hasFeatureMatrix && normalized.length > 0 && !activeId) {
      setActiveId(normalized[0].id!);
    }
  }, [matrixCategories, normalized, activeId, hasFeatureMatrix]);

  if (!hasFeatureMatrix && !normalized.length) return null;

  const isUsingMatrix = hasFeatureMatrix && matrixCategories.length > 0;
  const activeCategory = isUsingMatrix
    ? matrixCategories.find((c) => c.id === activeId) ?? matrixCategories[0]
    : null;
  const activeItem = !isUsingMatrix
    ? normalized.find((f) => f.id === activeId) ?? normalized[0]
    : null;

  const handleTabClick = (id: string) => {
    if (!interactive) return;
    setActiveId(id);
    setActiveFeatureType("stability");
  };

  const getLabel = (feat: FeatureItemObj, index: number) => {
    if (feat.title && feat.title.trim().length > 0) return feat.title;
    const raw = feat.text || "";
    return raw.length > 42
      ? raw.slice(0, 42) + "…"
      : raw || `Feature ${index + 1}`;
  };

  const activeIndex = isUsingMatrix
    ? matrixCategories.findIndex((c) => c.id === activeId) + 1
    : normalized.findIndex((f) => f.id === activeId) + 1;

  // Get all feature types to display - only include bonus features if they have values
  const featureTypes: string[] = ["stability", "noise", "coherence", "integration"];
  if (activeCategory?.features?.bonus5) featureTypes.push("bonus5");
  if (activeCategory?.features?.bonus6) featureTypes.push("bonus6");

  return (
    <section
      className={`${SECTION} bg-slate-50`}
      aria-label="Key features"
    >
      <div className={WRAPPER}>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-1.5 w-8 rounded-full bg-[#3B9ACB]/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Feature matrix
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#3B9ACB]">
              Engineered features that matter in the lab
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-500">
            Compare the most critical performance aspects of this laser
            family – stability, noise, coherence and integration – in a
            clean, tab-based view.
          </p>
        </motion.div>

        {/* Tab layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Tabs */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-2 md:p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-medium text-slate-500">
                  {isUsingMatrix ? matrixCategories.length : normalized.length} engineered capabilities
                </span>
                <span className="hidden md:inline-flex text-[11px] text-slate-400">
                  Select to view details
                </span>
              </div>

              <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 hide-scrollbar">
                {isUsingMatrix
                  ? matrixCategories.map((cat, idx) => {
                      const isActive = cat.id === activeId;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleTabClick(cat.id)}
                          className={`group flex items-center justify-between md:justify-start whitespace-nowrap rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 text-xs md:text-sm border transition-all ${
                            isActive
                              ? "bg-[#3B9ACB]/10 border-[#3B9ACB]/50 text-[#3B9ACB] shadow-sm"
                              : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                                isActive
                                  ? "bg-[#3B9ACB] text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="truncate">{cat.name}</span>
                          </div>

                          <span
                            className={`ml-2 hidden md:inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] border ${
                              isActive
                                ? "border-[#3B9ACB]/40 text-[#3B9ACB]"
                                : "border-slate-200 text-slate-400 group-hover:border-slate-300"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 h-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                d="M8 5h11M8 12h8M8 19h5M5 5h.01M5 12h.01M5 19h.01"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      );
                    })
                  : normalized.map((feat, idx) => {
                      const isActive = feat.id === activeId;
                      const label = getLabel(feat, idx);

                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => handleTabClick(feat.id!)}
                          className={`group flex items-center justify-between md:justify-start whitespace-nowrap rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 text-xs md:text-sm border transition-all ${
                            isActive
                              ? "bg-[#3B9ACB]/10 border-[#3B9ACB]/50 text-[#3B9ACB] shadow-sm"
                              : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                                isActive
                                  ? "bg-[#3B9ACB] text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="truncate">{label}</span>
                          </div>

                          <span
                            className={`ml-2 hidden md:inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] border ${
                              isActive
                                ? "border-[#3B9ACB]/40 text-[#3B9ACB]"
                                : "border-slate-200 text-slate-400 group-hover:border-slate-300"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 h-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                d="M8 5h11M8 12h8M8 19h5M5 5h.01M5 12h.01M5 19h.01"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      );
                    })}
              </div>
            </div>
          </div>

          {/* Active panel */}
          <div className="md:col-span-8">
            <div className="relative h-full rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)] px-5 py-5 md:px-7 md:py-7 overflow-hidden">
              {/* soft gradients */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-16 w-48 h-48 rounded-full bg-[#3B9ACB]/10 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 bottom-0 w-52 h-40 rounded-full bg-sky-200/30 blur-3xl"
              />

              <motion.div
                key={`${activeId}-${activeFeatureType}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 0.9, 0.3, 1],
                }}
                className="relative z-10"
              >
                {/* badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                  <span>
                    {isUsingMatrix
                      ? `${activeCategory?.name} – Capability #${activeIndex}`
                      : `Focused capability #${activeIndex}`}
                  </span>
                </div>

                <div className="flex flex-col gap-3 md:gap-4">
                  {isUsingMatrix && activeCategory ? (
                    <>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold tracking-[-0.01em] text-slate-900">
                          {activeCategory.name}
                        </h3>
                        <p className="mt-2 text-xs text-slate-500">
                          Performance metrics and technical specifications
                        </p>
                      </div>

                      {/* Feature type selector */}
                      <div className={`grid gap-2 ${
                        featureTypes.length <= 3 ? 'grid-cols-3' :
                        featureTypes.length <= 4 ? 'grid-cols-4' :
                        featureTypes.length <= 5 ? 'grid-cols-5' :
                        'grid-cols-6'
                      }`}>
                        {featureTypes.map((fType) => {
                          const isActiveFeature = fType === activeFeatureType;
                          const featureValue = activeCategory.features[fType as keyof typeof activeCategory.features];
                          const label = getFeatureLabel(fType, featureValue);
                          const colorClass = getFeatureColor(fType);

                          return (
                            <button
                              key={fType}
                              onClick={() => setActiveFeatureType(fType)}
                              className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border-2 overflow-hidden group ${
                                isActiveFeature
                                  ? `bg-linear-to-br ${colorClass} text-white border-transparent shadow-lg`
                                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm"
                              }`}
                            >
                              {!isActiveFeature && (
                                <span className={`absolute inset-0 bg-linear-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity`} />
                              )}
                              <span className="relative">{label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feature content */}
                      <div className="mt-4 rounded-2xl bg-slate-50/80 border border-slate-200 px-4 py-4 md:px-5 md:py-5">
                        <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                          {getFeatureLabel(activeFeatureType, activeCategory.features[activeFeatureType as keyof typeof activeCategory.features])}
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {activeCategory.features[activeFeatureType as keyof typeof activeCategory.features] ||
                            "Feature details not available"}
                        </p>
                      </div>

                      {/* All features grid */}
                      <div className="mt-6">
                        <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500 mb-3">
                          All Performance Metrics
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {featureTypes.map((fType) => {
                            const colorClass = getFeatureColor(fType);
                            const featureValue = activeCategory.features[fType as keyof typeof activeCategory.features];
                            const label = getFeatureLabel(fType, featureValue);
                            
                            return (
                              <div
                                key={fType}
                                className="relative group p-3 rounded-xl bg-linear-to-br from-white to-slate-50 border-2 border-slate-100 hover:border-slate-200 transition-all hover:shadow-md overflow-hidden"
                              >
                                {/* Colored accent bar */}
                                <div className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${colorClass}`} />
                                
                                <div className="pl-2">
                                  <p className="text-xs font-semibold text-slate-700 mb-1">
                                    {label}
                                  </p>
                                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                    {featureValue || "N/A"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : activeItem ? (
                    <>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {activeItem.icon && (
                            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#3B9ACB]">
                              {activeItem.icon}
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold tracking-[-0.01em] text-slate-900">
                              {activeItem.title || getLabel(activeItem, 0)}
                            </h3>
                          </div>
                        </div>

                        <div className="mt-2 md:mt-0 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
                          <span className="h-1 w-6 rounded-full bg-[#3B9ACB]/30" />
                          <span>Lab-ready specification</span>
                        </div>
                      </div>

                      {activeItem.details && (
                        <div className="mt-4 rounded-2xl bg-slate-50/80 border border-slate-200 px-4 py-4 md:px-5 md:py-5">
                          <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                            Technical context
                          </h4>
                          <p className="text-sm sm:text-sm text-slate-600 leading-relaxed">
                            {activeItem.details}
                          </p>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
