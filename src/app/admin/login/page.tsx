"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return null;
}
