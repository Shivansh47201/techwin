"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, FileText, LayoutGrid, Package } from "lucide-react";
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

  const ResultItem = ({ result }: { result: SearchResult }) => (
    <Link
      href={result.url}
      prefetch={false}
      onClick={(e) => {
        e.stopPropagation();

        onResultClick?.();
      }}
      className="block w-full text-left hover:bg-blue-50 transition-colors rounded-lg"
    >
      <div className="px-4 py-3 cursor-pointer flex gap-4 items-center group">
        {result.image ? (
          <div className="h-14 w-14 shrink-0 relative rounded-md overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={result.image}
              alt={result.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-14 w-14 shrink-0 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md">
            {result.type === "application" && (
              <FileText className="h-6 w-6 text-gray-400" />
            )}
            {result.type === "category" && (
              <LayoutGrid className="h-6 w-6 text-gray-400" />
            )}
            {result.type === "product" && (
              <Package className="h-6 w-6 text-gray-400" />
            )}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base text-gray-800 group-hover:text-blue-600 transition-colors">
            {result.title}
          </div>
          <div className="text-sm text-gray-500 mt-0.5 line-clamp-2">
            {result.description || result.category}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
      {isLoading ? (
        <div className="p-6 text-center text-base text-gray-600">
          Searching for "{query}"...
        </div>
      ) : results.length === 0 ? (
        <div className="p-6 text-center text-base text-gray-600">
          No results found for "{query}"
        </div>
      ) : (
        <div className="p-2">
          {groupedResults.applications.length > 0 && (
            <div className="mb-2">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Applications
                </h3>
              </div>
              <div className="space-y-1">
                {groupedResults.applications.map((result) => (
                  <ResultItem key={result.url} result={result} />
                ))}
              </div>
            </div>
          )}

          {groupedResults.categories.length > 0 && (
            <div className="mb-2">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Categories
                </h3>
              </div>
              <div className="space-y-1">
                {groupedResults.categories.map((result) => (
                  <ResultItem key={result.url} result={result} />
                ))}
              </div>
            </div>
          )}

          {groupedResults.products.length > 0 && (
            <div className="mb-2">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Products
                </h3>
              </div>
              <div className="space-y-1">
                {groupedResults.products.map((result) => (
                  <ResultItem key={result.url} result={result} />
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 mt-2 p-3 text-center">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              prefetch={false}
              onClick={(e) => {
                e.stopPropagation();
                onResultClick?.();
              }}
              className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
            >
              <Search className="h-4 w-4" />
              <span>View all results for </span>
              <span className="font-semibold">"{query}"</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
