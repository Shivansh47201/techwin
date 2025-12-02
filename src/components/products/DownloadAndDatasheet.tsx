"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, FileText, Paperclip, ArrowRight } from "lucide-react";

export type DownloadAndDatasheetProps = {
  title?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  imageUrl?: string;
  otherDownloads?: {
    title: string;
    description: string;
    url: string;
  }[];
};

const PRIMARY_COLOR = "#3B9ACB";

export default function DownloadAndDatasheet({
  title = "Access Key Resources",
  description = "Download technical datasheets, view application notes, and access CAD files to integrate our laser into your setup.",
  fileUrl = "/path/to/datasheet.pdf",
  fileName = "TN-SFL-1550-Datasheet.pdf",
  imageUrl = "/products/Single-Frequency-Fiber-Lasers/ultra-narrow-linewidth.jpg",
  otherDownloads = [
    { title: "Application Note: Sensing", description: "Using the laser for fiber optic sensing.", url: "#" },
    { title: "CAD Files (.step)", description: "Mechanical drawings for integration.", url: "#" },
    { title: "User Manual", description: "Full operational guide.", url: "#" },
  ],
}: DownloadAndDatasheetProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3B9ACB]">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Side: Image Preview */}
          <motion.div
            className="lg:col-span-2 w-full h-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-full h-[400px] bg-gray-100 shadow-lg rounded-2xl border border-gray-200/80">
              <Image
                src={imageUrl}
                alt="Product Datasheet Preview"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                style={{
                  boxShadow: `inset 0px 0px 120px 40px ${PRIMARY_COLOR}30`,
                }}
              />
            </div>
          </motion.div>

          {/* Right Side: Download Links */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50/80 rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Main Datasheet
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {fileName}
                  </p>
                </div>
                <a
                  href={fileUrl}
                  download
                  className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300"
                  style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 4px 20px ${PRIMARY_COLOR}40` }}
                >
                  <Download size={18} />
                  Download
                </a>
              </div>

              <div className="border-t my-6 border-gray-200"></div>

              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Additional Resources
              </h4>
              <ul className="space-y-3">
                {otherDownloads.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <a
                      href={item.url}
                      className="group flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200/80 hover:border-blue-400/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full" style={{backgroundColor: `${PRIMARY_COLOR}1A`}}>
                          <Paperclip size={18} style={{color: PRIMARY_COLOR}} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-blue-600">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
