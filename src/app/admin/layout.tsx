"use client";

import React from "react";
import SidebarOnly from "@/components/admin/SidebarOnly";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        <SidebarOnly />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}


