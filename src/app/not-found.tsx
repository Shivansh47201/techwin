"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Circle background */}
      <div className="w-40 h-40 rounded-full bg-[#3B9ACB]/10 flex items-center justify-center mb-6">
        <h1 className="text-7xl font-extrabold text-[#3B9ACB]">404</h1>
      </div>

      <h2 className="text-3xl font-semibold text-[#3B9ACB] mb-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md text-center mb-8">
        The page you're looking for doesn’t exist or has been moved.  
        Please check the URL or return to the homepage.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-lg bg-[#3B9ACB] text-white font-medium shadow hover:bg-[#3386B1] transition"
        >
          Go Back
        </button>

        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-[#3B9ACB] text-[#3B9ACB] font-medium hover:bg-[#3B9ACB]/10 transition"
        >
          Home Page
        </Link>
      </div>

      <p className="mt-12 text-sm text-gray-400">
        © {new Date().getFullYear()} Techwin. All rights reserved.
      </p>
    </main>
  );
}
