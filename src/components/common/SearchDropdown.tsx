"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";

interface SearchDropdownProps {
  query: string;
  isLoading: boolean;
  results: SearchResult[];
  onResultClick?: () => void;
}

export function SearchDropdown({
  query,
  isLoading,
  results,
  onResultClick,
}: SearchDropdownProps) {
  const router = useRouter();
  
  if (!query) return null;

  const handleResultClick = (url: string) => {
    // Call the parent callback to clear search state
    onResultClick?.();
    // Then navigate
    router.push(url);
  };

  const groupedResults = {
    applications: results.filter((r) => r.type === "application"),
    categories: results.filter((r) => r.type === "category"),
    products: results.filter((r) => r.type === "product"),
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
      {isLoading ? (
        <div className="p-4 text-center text-sm text-gray-500">
          Searching...
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-sm text-gray-500">
          No results found for "{query}"
        </div>
      ) : (
        <div>
          {/* Applications Section */}
          {groupedResults.applications.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase">
                Applications
              </div>
              <div className="divide-y">
                {groupedResults.applications.map((result) => (
                  <button
                    key={result.url}
                    type="button"
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left hover:bg-[#EAF6FC] transition-colors"
                  >
                    <div className="px-4 py-3 cursor-pointer flex gap-3">
                      {result.image && (
                        <div className="h-12 w-12 shrink-0 rounded overflow-hidden">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-1">
                          {result.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {groupedResults.categories.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase">
                Categories
              </div>
              <div className="divide-y">
                {groupedResults.categories.map((result) => (
                  <button
                    key={result.url}
                    type="button"
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left hover:bg-[#EAF6FC] transition-colors"
                  >
                    <div className="px-4 py-3 cursor-pointer flex gap-3">
                      {result.image && (
                        <div className="h-12 w-12 shrink-0 rounded overflow-hidden">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-500">Category</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          {groupedResults.products.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase">
                Products
              </div>
              <div className="divide-y">
                {groupedResults.products.map((result) => (
                  <button
                    key={result.url}
                    type="button"
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left hover:bg-[#EAF6FC] transition-colors"
                  >
                    <div className="px-4 py-3 cursor-pointer flex gap-4">
                      {result.image && (
                        <div className="h-14 w-14 shrink-0 relative">
                          <Image
                            src={result.image}
                            alt={result.title}
                            width={56}
                            height={56}
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-1">
                          {result.category}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
