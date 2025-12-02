import React, { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex justify-center py-12">
              <div className="text-gray-500">Loading...</div>
            </div>
          </div>
        </div>
      }
    >
      {/* SearchClient is a client component that uses `useSearchParams()` */}
      <SearchClient />
    </Suspense>
  );
}
