// src/components/application/detail/ApplicationCTA.tsx
"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Check, Mail, Phone, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApplicationCTAProps = {
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  phone?: string;
  email?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  background?: string;
};

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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
    // Simulate API call
    await new Promise(res => setTimeout(res, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#3b9acb]/10 inline-block py-1 px-4 rounded-full text-sm text-[#3b9acb] font-semibold mb-4">
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              {subheading}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#3b9acb]/20 p-3 rounded-full">
                  <Users className="w-6 h-6 text-[#3b9acb]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Expert Consultation</h3>
                  <p className="text-gray-600">Our application engineers are ready to help you select the right product and configuration.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#3b9acb]/20 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-[#3b9acb]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Fast Prototyping</h3>
                  <p className="text-gray-600">From concept to reality, we accelerate your development cycle with rapid prototyping.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-x-8 gap-y-4">
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-gray-700 hover:text-[#3b9acb] transition-colors">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{email}</span>
              </a>
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-gray-700 hover:text-[#3b9acb] transition-colors">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{phone}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div variants={itemVariants} className="bg-gray-50/70 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
            <p className="text-gray-600 mt-2">Fill out the form and we'll respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b9acb] focus:border-[#3b9acb] outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b9acb] focus:border-[#3b9acb] outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b9acb] focus:border-[#3b9acb] outline-none transition"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={sending || sent}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300",
                    "bg-[#3b9acb] hover:bg-[#2c8ab8] focus:ring-2 focus:ring-offset-2 focus:ring-[#3b9acb]",
                    "disabled:bg-gray-400 disabled:cursor-not-allowed",
                    sent && "bg-green-500 hover:bg-green-600"
                  )}
                >
                  {sending && "Sending..."}
                  {sent && <><Check className="w-5 h-5" /> Message Sent!</>}
                  {!sending && !sent && <>
                    <span>{primaryLabel}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}