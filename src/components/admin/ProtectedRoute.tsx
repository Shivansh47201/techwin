"use client";

import React, { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Don't protect login pages
    if (pathname?.includes("/login") || pathname?.includes("/auth")) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check if session exists and is valid
    const checkSession = () => {
      const storedSession = localStorage.getItem("adminSession");

      if (!storedSession) {
        // No session, redirect to login
        setIsLoading(false);
        router.push("/admin/login");
        return;
      }

      try {
        const session = JSON.parse(storedSession);
        const expiryTime = session.expiryTime;
        const now = Date.now();

        if (now > expiryTime) {
          // Session expired
          localStorage.removeItem("adminSession");
          setIsLoading(false);
          router.push("/admin/login");
          return;
        }

        // Session valid
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        // Invalid session data
        localStorage.removeItem("adminSession");
        setIsLoading(false);
        router.push("/admin/login");
        return;
      }
    };

    checkSession();

    // Set interval to check session expiry every minute
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
