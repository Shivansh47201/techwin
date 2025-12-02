# URL Fix Summary

## Problem
URLs like the following returned 404:
- `/products/ase-sources/ase-light-source-1.5um`
- `/products/ase-sources/ase-light-source-1um`
- `/products/seed-lasers/1.0um-frequency-stabilized-seed-laser`

## Root Cause
Product files on disk contain dots (e.g., `1.0um-`, `1.5um-`) but when generating product lists, `getAllProducts()` was stripping dots from slugs (dots → hyphens). This created a mismatch:
- File on disk: `ase-light-source-1.5um.ts`
- Generated slug: `ase-light-source-1-5um` (dots removed)
- Menu URL: `/products/ase-sources/ase-light-source-1-5um`
- But file lookup tried to find: `ase-light-source-1-5um.ts` ❌ Not found → 404

## Solution
Updated `getProductData()` in `src/lib/products.ts` to try multiple slug variants:
1. Original resolved slug as-is
2. Slug with dots → hyphens (inverse fallback)
3. Original productSlug from URL
4. **Hyphen-to-dot restoration** (the key fix): Converts `1-5um` → `1.5um` to match actual filenames

This allows the file lookup to succeed because `ase-light-source-1.5um.ts` is now found even when the URL contains `ase-light-source-1-5um`.

## Files Changed
- `src/lib/products.ts` — Updated `getProductData()` candidate slug generation
- `src/app/api/category-products/route.ts` — Added (fetches products for menu)
- `src/components/layout/header.tsx` — Added `handleCategoryHover()` to fetch full product lists

## No Design Changes
- Header styling: unchanged ✅
- Navigation structure: unchanged ✅
- Mobile menu: unchanged ✅
- Only URLs and backend resolution logic fixed ✅

## Testing URLs
After dev server starts (`npm run dev`), visit:
- http://localhost:3000/products/ase-sources/ase-light-source-1.5um
- http://localhost:3000/products/ase-sources/ase-light-source-1um
- http://localhost:3000/products/ase-sources/ase-light-source-2um
- http://localhost:3000/products/ase-sources/broadband-light-source
- http://localhost:3000/products/ase-sources/sled-light-source
- http://localhost:3000/products/seed-lasers/1.0um-frequency-stabilized-seed-laser
- http://localhost:3000/products/seed-lasers/1.5um-narrow-linewidth-seed-laser

All should load (200 OK), not 404.
