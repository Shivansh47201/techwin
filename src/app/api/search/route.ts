// Search API endpoint - must be dynamic to accept query parameters
import { NextResponse, type NextRequest } from "next/server";

// IMPORTANT: This must be dynamic, not static!
// The route needs to accept query parameters for search to work
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Shared type for search results used by client components
export type SearchResult = {
  type: "application" | "category" | "product" | string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
};

// The real implementation lives in `src/app/_api/search/route.ts`
// This wrapper ensures the route is treated as dynamic
export async function GET(request: NextRequest) {
  try {
    // Call the real API implementation
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = await import("@/app/_api/search/route");
    if (mod && typeof mod.GET === "function") {
      return await mod.GET(request);
    }
  } catch (err) {
    console.error("Search API error:", err);
  }

  // Return empty results fallback
  const results: SearchResult[] = [];
  return NextResponse.json({ results });
}