"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  Menu, 
  X, 
  LogOut, 
  User,
  ChevronRight,
  FileText,
  Tags,
  FolderOpen,
} from "lucide-react";

const PRIMARY_COLOR = "#3B9ACB";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Blog Posts", href: "/admin/posts", icon: <FileText size={20} /> },
    { label: "Products", href: "#products", icon: <Package size={20} />, disabled: true },
    { label: "Inbox", href: "#inbox", icon: <Inbox size={20} />, disabled: true },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3B9ACB] shadow-lg transition-all duration-300 hover:bg-gray-50 hover:scale-105 active:scale-95 md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed md:relative z-40 h-screen shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? "w-[280px]" : "w-[0px] md:w-[80px]"
        }`}
        style={{
          background: `linear-gradient(145deg, ${PRIMARY_COLOR} 0%, #2c7da6 100%)`,
        }}
      >
        <div className="flex h-full flex-col justify-between overflow-hidden">
          {/* Top Section */}
          <div>
            {/* Header / Logo */}
            <div className={`flex items-center gap-3 px-6 py-8 ${!isOpen && "md:justify-center px-2"}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              
              <div className={`transition-all duration-300 ${!isOpen && "md:hidden md:opacity-0"}`}>
                <h2 className="text-lg font-bold tracking-wide text-white">
                  ADMIN PANEL
                </h2>
                <p className="text-xs font-medium text-blue-100/70">
                  Control Center
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="mt-4 px-3">
              <p className={`mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-blue-100/50 ${!isOpen && "md:hidden"}`}>
                Main Menu
              </p>
              
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={index}>
                      <button
                        onClick={() => {
                          if (!item.disabled) {
                            router.push(item.href);
                            setIsOpen(false);
                          }
                        }}
                        className={`group relative flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 w-full text-left
                          ${
                            isActive
                              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                              : "text-blue-50 hover:bg-white/10 hover:text-white"
                          }
                          ${item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                          ${!isOpen && "md:justify-center md:px-2"}
                        `}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                        )}

                        <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-blue-100"}`}>
                          {item.icon}
                        </span>

                        <span className={`whitespace-nowrap font-medium transition-all duration-300 ${!isOpen && "md:hidden md:w-0 md:opacity-0"}`}>
                          {item.label}
                        </span>

                        {isActive && isOpen && (
                          <ChevronRight size={16} className="ml-auto text-white/70" />
                        )}

                        {!isOpen && (
                          <div className="invisible absolute left-14 z-50 rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100 md:block">
                            {item.label}
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 bg-black/10 px-4 py-4 backdrop-blur-sm">
            <div className={`flex items-center gap-3 ${!isOpen && "md:justify-center"}`}>
              <div className="relative">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white shadow-sm ring-2 ring-white/30">
                  <User size={20} />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-[#3B9ACB]" />
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 ${!isOpen && "md:w-0 md:hidden"}`}>
                <p className="truncate text-sm font-semibold text-white">Administrator</p>
                <button 
                  onClick={() => {
                    localStorage.removeItem("adminSession");
                    router.push("/auth/login");
                  }}
                  className="flex items-center gap-1 text-xs text-blue-200 transition-colors hover:text-white hover:text-red-300 cursor-pointer"
                >
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Toggle */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-8 z-40 hidden h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all duration-300 hover:bg-gray-50 hover:text-[#3B9ACB] md:flex
          ${isOpen ? "left-[265px]" : "left-[65px]"}
        `}
      >
        <ChevronRight size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] md:hidden"
        />
      )}
    </>
  );
}
