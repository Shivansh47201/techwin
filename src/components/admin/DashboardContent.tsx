"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Package, 
  Tags, 
  FolderOpen, 
  ArrowRight, 
  Plus,
  Clock,
  Layers
} from "lucide-react";

const PRIMARY_COLOR = "#3B9ACB";

interface DashboardStats {
  products: number;
  applications: number;
  categories: number;
  blogs: number;
}

export default function DashboardContent() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    applications: 0,
    categories: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, appsRes, categoriesRes, blogsRes] = await Promise.all([
          fetch("/api/admin/products").catch(() => ({ json: async () => ({ data: [] }) })),
          fetch("/api/admin/applications").catch(() => ({ json: async () => ({ data: [] }) })),
          fetch("/api/admin/categories").catch(() => ({ json: async () => ({ data: [] }) })),
          fetch("/api/admin/posts").catch(() => ({ json: async () => ({ data: [] }) })),
        ]);

        const [products, apps, categories, blogs] = await Promise.all([
          productsRes.json(),
          appsRes.json(),
          categoriesRes.json(),
          blogsRes.json(),
        ]);

        setStats({
          products: products?.data?.length || 0,
          applications: apps?.data?.length || 0,
          categories: categories?.data?.length || 0,
          blogs: blogs?.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Blog Posts",
      count: loading ? "..." : stats.blogs.toString(),
      icon: <FileText size={40} className="text-white/80" />,
      color: "bg-gradient-to-br from-rose-400 to-red-500",
      shadow: "shadow-red-200",
      link: "/admin/posts"
    },
    {
      title: "Total Applications",
      count: loading ? "..." : stats.applications.toString(),
      icon: <Layers size={40} className="text-white/80" />,
      color: "bg-gradient-to-br from-purple-400 to-indigo-500",
      shadow: "shadow-purple-200",
      link: "/admin/applications"
    },
    {
      title: "Total Products",
      count: loading ? "..." : stats.products.toString(),
      icon: <Package size={40} className="text-white/80" />,
      color: "bg-gradient-to-br from-teal-400 to-emerald-500",
      shadow: "shadow-teal-200",
      link: "/admin/products"
    },
    {
      title: "Categories",
      count: loading ? "..." : stats.categories.toString(),
      icon: <Tags size={40} className="text-white/80" />,
      color: "bg-gradient-to-br from-sky-400 to-blue-500",
      shadow: "shadow-blue-200",
      link: "/admin/categories"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 md:p-8 w-full">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">
              Dashboard <span className="text-2xl">👋</span>
            </h1>
            <p className="mt-1 text-slate-500">
              {loading ? "Loading stats..." : `Manage ${stats.blogs} blogs, ${stats.products} products, ${stats.applications} applications & ${stats.categories} categories`}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/admin/applications/new')}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition-transform hover:scale-105 active:scale-95"
            >
              <Plus size={18} />
              New App
            </button>
            <button 
              onClick={() => router.push('/admin/posts/new')}
              className="flex items-center gap-2 rounded-lg bg-[#3B9ACB] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-transform hover:scale-105 active:scale-95"
            >
              <Plus size={18} />
              New Post
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <div 
              key={index}
              onClick={() => {
                if (stat.link && stat.link !== "#") {
                  router.push(stat.link);
                }
              }}
              className={`group relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stat.link && stat.link !== "#" ? "cursor-pointer" : "cursor-default"} ${stat.color} ${stat.shadow}`}
            >
              {/* Decorative Circles */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl transition-all group-hover:bg-white/30" />
              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-black/10 blur-xl" />

              <div className="relative z-10 flex justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">{stat.title}</p>
                  <h3 className="mt-2 text-4xl font-bold">{stat.count}</h3>
                </div>
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm h-fit">
                  {stat.icon}
                </div>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-medium text-white/80 transition-colors group-hover:text-white">
                <span>View Details</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions / Content Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
           {/* Recent Activity / Chart Placeholder */}
           <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Overview Stats</h3>
                <select className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last Month</option>
                </select>
              </div>
              
              {/* Mock Chart UI */}
              <div className="flex h-64 items-end gap-2 sm:gap-4 px-2">
                {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                  <div key={i} className="group relative flex w-full flex-col items-center gap-2">
                    <div 
                      className="w-full rounded-t-lg bg-blue-100 transition-all duration-500 group-hover:bg-[#3B9ACB]" 
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="text-xs text-gray-400">Day {i + 1}</span>
                    {/* Tooltip */}
                    <div className="absolute -top-10 hidden rounded-md bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                      {h} Views
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Quick Links */}
           <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <h3 className="mb-4 text-lg font-bold text-slate-800">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => router.push('/admin/posts/new')}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-all hover:border-[#3B9ACB] hover:bg-blue-50 hover:shadow-md"
                  >
                    <div className="rounded-lg bg-white p-2 text-[#3B9ACB] shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">New Blog Post</p>
                      <p className="text-xs text-slate-500">Create content</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => router.push('/admin/applications/new')}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-all hover:border-purple-500 hover:bg-purple-50 hover:shadow-md"
                  >
                    <div className="rounded-lg bg-white p-2 text-purple-500 shadow-sm">
                      <Layers size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">New Application</p>
                      <p className="text-xs text-slate-500">Add application</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => router.push('/admin/products/new')}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md"
                  >
                    <div className="rounded-lg bg-white p-2 text-emerald-500 shadow-sm">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">New Product</p>
                      <p className="text-xs text-slate-500">Add to inventory</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => router.push('/admin/categories/new')}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md"
                  >
                    <div className="rounded-lg bg-white p-2 text-blue-500 shadow-sm">
                      <Tags size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">New Category</p>
                      <p className="text-xs text-slate-500">Organize content</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold">Quick Stats 📊</h3>
                <div className="mt-3 space-y-2 text-sm text-indigo-100">
                  <div className="flex justify-between">
                    <span>Published Blogs:</span>
                    <span className="font-semibold text-white">{loading ? "..." : stats.blogs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Products:</span>
                    <span className="font-semibold text-white">{loading ? "..." : stats.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applications:</span>
                    <span className="font-semibold text-white">{loading ? "..." : stats.applications}</span>
                  </div>
                </div>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}
