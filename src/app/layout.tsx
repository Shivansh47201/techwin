import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RequestQuoteProvider } from "@/context/RequestQuoteContext";
import ClientLayout from "@/components/layout/ClientLayout";
import { readSiteSettings } from "@/lib/siteSettings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base metadata - can be overridden by page-level metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000"
  ),
  icons: {
    icon: { url: "/favicon.ico", type: "image/png" },
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await readSiteSettings();
  const GA = settings.analyticsId?.trim();

  return (
    <html lang="en">
      <head>
        {settings.googleSiteVerification?.trim() ? (
          <meta name="google-site-verification" content={settings.googleSiteVerification.trim()} />
        ) : null}

        {GA ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA}');
                `,
              }}
            />
          </>
        ) : null}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RequestQuoteProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </RequestQuoteProvider>
      </body>
    </html>
  );
}
