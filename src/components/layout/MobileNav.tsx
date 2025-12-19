"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, X, Home, Info, Grid, Box, Phone, Star, FileText } from "lucide-react";
import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { highPowerData } from "@/data/categories/highPowerData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { sledLightData } from "@/data/categories/sledLightData";
import { applications } from "@/data/Application/applications";
import { SearchDropdown } from "@/components/common/SearchDropdown";
import type { SearchResult } from "@/app/api/search/route";
import { useRequestQuote } from "@/context/RequestQuoteContext";

const categoryTitleMap = [
  { title: "Single-Frequency Fiber Lasers", data: singleFrequencyData },
  { title: "Seed Lasers", data: seedFiberData },
  { title: "High-Power Fiber Lasers", data: highPowerData },
  { title: "Wavelength Conversion Lasers", data: wavelengthConversionData },
  { title: "Broadband & ASE Sources", data: broadbandAseData },
  { title: "Fiber Amplifiers", data: fiberAmplifierData },
  { title: "Testing Systems", data: laserTestingData },
  { title: "SLED Light Sources", data: sledLightData },
];

const productCategories = categoryTitleMap.map((item) => {
  const parts = String(item.data.url || "").split("/").filter(Boolean);
  const slug = parts.length ? parts[parts.length - 1] : "";
  return {
    title: item.title,
    slug,
    image: item.data?.hero?.image || "",
    children: (item.data?.subCategories || []).map((subCat) => ({
      title: subCat.name,
      slug: subCat.id ?? "",
    })),
  };
});

type MobileNavProps = {
  onClose: () => void;
};

export default function MobileNav({ onClose }: MobileNavProps) {
  const [openProductCategory, setOpenProductCategory] = useState<string | null>(null);
  const [openApplicationCategory, setOpenApplicationCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openModal } = useRequestQuote();

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
        setShowSearchDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Debounce 300ms

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  const toggleProductCategory = (slug: string) => {
    setOpenProductCategory(openProductCategory === slug ? null : slug);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowSearchDropdown(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-white text-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white shrink-0">
        <h2 className="text-lg font-bold text-[#3B9ACB]">Menu</h2>
        <button onClick={onClose} aria-label="Close menu" className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B9ACB] focus:border-transparent transition-all"
          />
          {showSearchDropdown && (
            <SearchDropdown
              query={searchQuery}
              isLoading={isSearching}
              results={searchResults}
              onResultClick={handleResultClick}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-1">
          {/* Home */}
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EAF6FC] text-gray-800 font-medium transition-colors" onClick={onClose}>
            <Home className="h-4 w-4 text-[#3B9ACB]" />
            <span>Home</span>
          </Link>

          {/* About */}
          <Link href="/about" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EAF6FC] text-gray-800 font-medium transition-colors" onClick={onClose}>
            <Info className="h-4 w-4 text-[#3B9ACB]" />
            <span>About Us</span>
          </Link>

          {/* Applications */}
          <div className="my-2">
            <button
              onClick={() => setOpenApplicationCategory(!openApplicationCategory)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-[#EAF6FC] text-gray-800 font-medium transition-colors"
            >
              <div className="flex items-center gap-3">
                <Grid className="h-4 w-4 text-[#3B9ACB]" />
                <span>Applications</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[#3B9ACB] transition-transform ${
                  openApplicationCategory ? "rotate-180" : ""
                }`}
              />
            </button>
            {openApplicationCategory && (
              <div className="mt-1 pl-4 border-l-2 border-[#3B9ACB]/30 space-y-1">
                {applications.map((app) => (
                  <Link
                    key={app.slug}
                    href={`/application/${app.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-[#D4E9F7] transition-colors"
                    onClick={onClose}
                  >
                    • {app.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Products */}
          <div className="my-2">
            <h3 className="px-4 py-2 text-sm font-bold text-[#3B9ACB] uppercase tracking-wider flex items-center gap-2"><Box className="h-4 w-4" />Products</h3>
            <div className="space-y-1">
              {productCategories.map((category) => (
                <div key={category.slug}>
                  <button
                    onClick={() => toggleProductCategory(category.slug)}
                    className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg hover:bg-[#EAF6FC] text-gray-800 font-medium text-sm transition-colors"
                  >
                    <span>{category.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#3B9ACB] transition-transform ${
                        openProductCategory === category.slug ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openProductCategory === category.slug && (
                    <div className="mt-1 ml-4 pl-3 border-l-2 border-[#3B9ACB]/30 space-y-1">
                      <Link
                        href={`/products/${category.slug}`}
                        className="block px-4 py-2 text-sm font-semibold text-[#3B9ACB] rounded hover:bg-[#D4E9F7] transition-colors"
                        onClick={onClose}
                      >
                        View All
                      </Link>
                      {category.children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/products/${category.slug}/${child.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-[#D4E9F7] transition-colors"
                          onClick={onClose}
                        >
                          ▸ {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blog */}
          <Link href="/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EAF6FC] text-gray-800 font-medium transition-colors my-2" onClick={onClose}>
            <FileText className="h-4 w-4 text-[#3B9ACB]" />
            <span>Blog</span>
          </Link>

          {/* Contact */}
          <Link href="/contact" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EAF6FC] text-gray-800 font-medium transition-colors my-2" onClick={onClose}>
            <Phone className="h-4 w-4 text-[#3B9ACB]" />
            <span>Contact</span>
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Request Quote Button */}
          <button
            onClick={() => {
              openModal();
              onClose();
            }}
            className="w-full px-4 py-3 rounded-lg bg-[#3B9ACB] text-white font-semibold transition-all hover:bg-[#2D87B7] active:scale-95 flex items-center justify-center gap-2"
          >
            <Star className="h-4 w-4" />
            <span>Request Quote</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
