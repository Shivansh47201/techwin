"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";


const PRIMARY_COLOR = "#3B9ACB";


const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const storedSession = localStorage.getItem("adminSession");
    if (storedSession) {
      const session = JSON.parse(storedSession);
      if (Date.now() < session.expiryTime) {
        router.push("/admin/dashboard");
      } else {
        localStorage.removeItem("adminSession");
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const now = Date.now();
      const expiryTime = now + 12 * 60 * 60 * 1000;

      localStorage.setItem(
        "adminSession",
        JSON.stringify({
          username,
          loginTime: now,
          expiryTime,
        })
      );

      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
     

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">

            {/* LOGO + HEADING */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-lg text-white text-xl font-bold"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  T
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                Techwin Admin
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Secure Control Panel
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={18} className="text-red-600" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-4 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Login
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-600 mt-4">
            © 2025 Techwin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
