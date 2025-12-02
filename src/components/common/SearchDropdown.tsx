"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  if (!query) return null;

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
                  <Link
                    key={result.url}
                    href={result.url}
                    onClick={onResultClick}
                  >
                    <div className="px-4 py-3 hover:bg-[#EAF6FC] transition-colors cursor-pointer flex gap-3">
                      {result.image && (
                        <div className="h-10 w-10 shrink-0 relative">
                          <Image
                            src={result.image}
                            alt={result.title}
                            width={40}
                            height={40}
                            className="object-cover rounded"
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
                  </Link>
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
                  <Link
                    key={result.url}
                    href={result.url}
                    onClick={onResultClick}
                  >
                    <div className="px-4 py-3 hover:bg-[#EAF6FC] transition-colors cursor-pointer">
                      <div className="font-medium text-sm text-gray-900">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500">Category</div>
                    </div>
                  </Link>
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
                  <Link
                    key={result.url}
                    href={result.url}
                    onClick={onResultClick}
                  >
                    <div className="px-4 py-3 hover:bg-[#EAF6FC] transition-colors cursor-pointer">
                      <div className="font-medium text-sm text-gray-900">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.category}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
