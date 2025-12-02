// src/components/layout/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, X, Instagram, Youtube, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const productCategories = [
  "Single-Frequency Fiber Lasers",
  "Seed Lasers",
  "High-Power Fiber Lasers",
  "Wavelength Conversion Lasers",
  "Broadband & ASE Sources",
  "Fiber Amplifiers",
  "Testing Systems",
  "SLED Light Sources",
];

export default function Footer() {
  return (
    <footer className="bg-[#3B9ACB] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* grid: logo | quick links | product categories | policy | contact+follow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Logo */}
          <div className="md:col-span-1 flex items-start">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/techwin-logo-rectangle.png"
                alt="Techwin"
                width={160}
                height={48}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/90 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2 text-sm">
              {productCategories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/products?category=${encodeURIComponent(c)}`}
                    className="text-white/90 hover:text-white"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Policy</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-white/90 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/90 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-white/90 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Follow (right-aligned on desktop) */}
          <div className="flex flex-col items-start md:items-end">
            <div className="text-sm">
              <h4 className="text-sm font-semibold mb-3">Contact</h4>
              <p className="leading-relaxed text-white/90 max-w-[220px] text-left md:text-right">
                Techwin – Single Frequency Fiber Laser Solutions
                <br />
                Email:{" "}
                <Link href="mailto:techwinchina@gmail" className="underline hover:text-white">
                   techwinchina@gmail.com
                </Link>
                <br />
                 <Link href="tel: +86-517-88284299" className="underline hover:text-white">
                   Tel: +86-517-88284299
                </Link>
                
              </p>
            </div>

            {/* Follow Us (placed under contact) */}
            <div className="mt-6 md:mt-8 w-full md:w-auto">
             
              <p className="text-sm text-white/90 mb-3 md:text-left">Connect with us</p>

              <div className="flex items-center gap-3 md:justify-end">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center h-10 w-10 rounded bg-white/10 hover:bg-white/20"
                >
                  <Facebook className="h-5 w-5" style={{ color: "#1877F2" }} />
                </Link>

                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex items-center justify-center h-10 w-10 rounded bg-white/10 hover:bg-white/20"
                >
                  <X className="h-5 w-5" style={{ color: "#1DA1F2" }} />
                </Link>

                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center h-10 w-10 rounded bg-white/10 hover:bg-white/20"
                >
                  <Linkedin className="h-5 w-5" style={{ color: "#0A66C2" }} />
                </Link>

                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex items-center justify-center h-10 w-10 rounded bg-white/10 hover:bg-white/20"
                >
                  <Youtube className="h-5 w-5" style={{ color: "#FF0000" }} />
                </Link>

                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center h-10 w-10 rounded bg-white/10 hover:bg-white/20"
                >
                  <Instagram className="h-5 w-5" style={{ color: "#E1306C" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-8 border-t border-white/20 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-white/80">© {new Date().getFullYear()} Techwin. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-white/80 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-white/80 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
