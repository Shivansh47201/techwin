"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

interface Props { children: React.ReactNode; }

export default function ProtectedRoute({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    // don't protect login pages
    if (pathname?.includes("/login") || pathname?.includes("/auth")) return;

    // wait while next-auth is loading
    if (status === "loading") return;

    // if no session, redirect to auth login
    if (!session) {
      router.push("/auth/login");
    }
  }, [status, session, pathname, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // while unauthenticated we already redirected in effect; render nothing
  if (!session && !pathname?.includes("/login") && !pathname?.includes("/auth")) {
    return null;
  }

  return <>{children}</>;
}
