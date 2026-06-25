"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { FAQ } from "@/types";

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl bg-[#F9FAFB] transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-6 text-left group transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-semibold text-[#1A1A1A] group-hover:opacity-80 transition-opacity">
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          {isOpen ? (
            <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </span>
      </button>

      {/* Accordion Panel */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-7">
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="h-20 w-full bg-slate-100 rounded-2xl animate-pulse" />
  );
}

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data, loading, error, refetch } = useFetch<{ data: FAQ[] }>("/api/faqs");

  const faqs = data?.data || [];

  return (
    <section id="faq" className="py-24 bg-white relative px-4 sm:px-6">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1A1A] mb-4">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load FAQs</p>
            <button
              onClick={refetch}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonItem key={i} />
            ))}
          </div>
        )}

        {/* Accordion Container */}
        {!loading && !error && faqs.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
