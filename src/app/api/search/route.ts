// Minimal placeholder for static export: real search API is moved to src/app/_api
import { NextResponse, type NextRequest } from "next/server";

// For static HTML export ensure this route is treated as static by default
export const dynamic = "force-static";
export const revalidate = false;

// Shared type for search results used by client components
export type SearchResult = {
  type: "application" | "category" | "product" | string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
};

// The real implementation lives in `src/app/_api/search/route.ts` so that
// static export isn't blocked. Always use the real implementation.
export async function GET(request?: NextRequest) {
  try {
    // Always use the real API implementation
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = await import("@/app/_api/search/route");
    if (mod && typeof mod.GET === "function") {
      return await mod.GET(request as NextRequest);
    }
  } catch (err) {
    // ignore and fall back to empty
  }

  // Return empty results fallback.
  const results: SearchResult[] = [];
  return NextResponse.json({ results });
}