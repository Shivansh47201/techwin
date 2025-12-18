"use client";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page - no protection, no sidebar
  return <>{children}</>;
}
