import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/header";
import Footer from "../components/layout/footer";
import { RequestQuoteProvider } from "@/context/RequestQuoteContext"; // Import the provider


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techwin",
  description: "Techwin — World-class Single-Frequency Fiber Laser Solutions",
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3001"),
  icons: {
    icon: { url: "/favicon.ico", type: "image/png" },
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RequestQuoteProvider> {/* Wrap the content with the provider */}
          <Navbar />
          {children}
          
          <Footer />
        </RequestQuoteProvider>
      </body>
    </html>
  );
}
