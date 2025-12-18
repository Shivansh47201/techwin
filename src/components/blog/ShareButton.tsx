"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

type Props = {
  url: string;
  title?: string;
};

export default function ShareButton({ url, title }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared" | "error">("idle");

  async function handleClick() {
    try {
      let copied = false;

      // Try to copy first (if available)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(url);
          copied = true;
        } catch (err) {
          copied = false;
        }
      }

      // If native share is available, open it too
      if ((navigator as any).share) {
        try {
          await (navigator as any).share({ title: title || document.title, url });
          // Prefer to show "Link copied" if copy succeeded, otherwise show "Shared"
          setStatus(copied ? "copied" : "shared");
        } catch (err) {
          // If share failed but copy succeeded, show copied; otherwise fallback to prompt
          if (copied) setStatus("copied");
          else {
            // eslint-disable-next-line no-alert
            window.prompt("Copy this link", url);
            setStatus("copied");
          }
        }
      } else {
        // No native share available — show copy status or prompt
        if (copied) setStatus("copied");
        else {
          // eslint-disable-next-line no-alert
          window.prompt("Copy this link", url);
          setStatus("copied");
        }
      }
    } catch (err) {
      console.error("Share error", err);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Share article"
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#3B9ACB] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3B9ACB]"
    >
      <Share2 className="h-4 w-4" />

      {status !== "idle" && (
        <span className="absolute -bottom-8 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white">
          {status === "copied" && "Link copied"}
          {status === "shared" && "Shared"}
          {status === "error" && "Failed"}
        </span>
      )}
    </button>
  );
}
