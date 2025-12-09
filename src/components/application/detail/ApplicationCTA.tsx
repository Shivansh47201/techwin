// src/components/application/detail/ApplicationCTA.tsx
"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Check, Mail, Phone, Users, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApplicationCTAProps = {
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  phone?: string;
  email?: string;
};

const PRIMARY = "#3B9ACB";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 0.86, 0.39, 0.96],
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ApplicationCTA({
  heading = "Let's Build the Future Together",
  subheading = "Ready to discuss your project requirements? Our team of experts is here to help you find the perfect solution.",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
  phone = "+86-571-88284299",
  email = "techwinchina@gmail.com",
}: ApplicationCTAProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(res => setTimeout(res, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white text-gray-900">
      {/* NO BLUE BACKGROUND — CLEAN WHITE */}

      <motion.div
        className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE */}
          <motion.div variants={itemVariants} className="space-y-8">

            {/* Small Badge */}
            <div
              className="inline-flex items-center gap-2 py-2 px-5 rounded-full text-sm font-bold mb-6 border"
              style={{ borderColor: PRIMARY, backgroundColor: PRIMARY + "10", color: PRIMARY }}
            >
              <Sparkles className="w-4 h-4" style={{ color: PRIMARY }} />
              <span>Get Started Now</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4"
              style={{ color: PRIMARY }}
            >
              {heading}
            </h2>

            {/* Subheading */}
            <p className="text-lg md:text-xl leading-relaxed max-w-lg"
               style={{ color: "#333" }}
            >
              {subheading}
            </p>

            {/* Feature Blocks */}
            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div className="flex items-start gap-4 group" variants={featureVariants}>
                <div
                  className="shrink-0 p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: PRIMARY + "15" }}
                >
                  <Users className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: "#000" }}>
                    Expert Consultation
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#555" }}>
                    Our application engineers are ready to help you select the right product and configuration.
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start gap-4 group" variants={featureVariants}>
                <div
                  className="shrink-0 p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: PRIMARY + "15" }}
                >
                  <Zap className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: "#000" }}>
                    Fast Prototyping
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#555" }}>
                    From concept to reality, we accelerate your development cycle with rapid prototyping.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* EMAIL + PHONE */}
            <motion.div className="pt-8 flex flex-wrap gap-x-8 gap-y-4 border-t"
              style={{ borderColor: "#e5e7eb" }}
              variants={itemVariants}
            >
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 font-medium hover:underline underline-offset-4"
                 style={{ color: "#000", textDecorationColor: PRIMARY }}
              >
                <Mail className="w-5 h-5" style={{ color: PRIMARY }} />
                <span>{email}</span>
              </a>

              <a href={`tel:${phone}`} className="inline-flex items-center gap-3 font-medium hover:underline underline-offset-4"
                 style={{ color: "#000", textDecorationColor: PRIMARY }}
              >
                <Phone className="w-5 h-5" style={{ color: PRIMARY }} />
                <span>{phone}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — FORM CARD */}
          <motion.div variants={itemVariants} className="relative group">
            <div
              className="relative p-10 md:p-12 rounded-3xl border bg-white shadow-2xl backdrop-blur-xl"
              style={{
                borderColor: PRIMARY + "25",
              }}
            >
              <h3 className="text-2xl md:text-3xl font-black mb-2"
                  style={{ color: PRIMARY }}
              >
                Get in Touch
              </h3>

              <p style={{ color: "#555" }} className="mb-8">
                Fill out the form and we'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-3 rounded-xl border bg-white"
                  style={{
                    borderColor: PRIMARY + "40",
                    color: "#000"
                  }}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-3 rounded-xl border bg-white"
                  style={{
                    borderColor: PRIMARY + "40",
                    color: "#000"
                  }}
                />

                <textarea
                  name="message"
                  placeholder="How can we help?"
                  rows={4}
                  value={form.message}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl border bg-white resize-none"
                  style={{
                    borderColor: PRIMARY + "40",
                    color: "#000"
                  }}
                />

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: PRIMARY,
                    color: "white",
                    boxShadow: `0 4px 15px -5px ${PRIMARY}`
                  }}
                >
                  {sending && <>⏳ Sending...</>}
                  {sent && <><Check className="w-5 h-5" /> Message Sent!</>}
                  {!sending && !sent && (
                    <>
                      <span>{primaryLabel}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
