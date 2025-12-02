// Minimal placeholder for static export: real search API is moved to src/app/_api
import { NextResponse } from "next/server";

// Shared type for search results used by client components
export type SearchResult = {
  type: "application" | "category" | "product" | string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
};

export async function GET() {
  // Return empty results for static export build-time checks.
  const results: SearchResult[] = [];
  return NextResponse.json({ results });
}