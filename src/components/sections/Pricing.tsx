"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { PlanResponse } from "@/types";
import { advantages } from "@/utils/advantages";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  const { data, loading } = useFetch<{ data: PlanResponse[] }>(
    `/api/plans?billing=${billing}`
  );

  const plans = data?.data || [];

  return (
    <section id="pricing" className="py-20 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF6A3D] text-sm font-medium block mb-3">Pricing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-3 font-sans">
            Find the Right Plan for You
          </h2>
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex p-1 bg-[#E2E2E2] rounded-[14px]">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-8 py-2.5 text-sm rounded-[10px] transition-all font-sans font-medium ${
                  billing === "monthly" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-slate-600 hover:text-[#1A1A1A]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-8 py-2.5 text-sm rounded-[10px] transition-all font-sans font-medium ${
                  billing === "annual" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-slate-600 hover:text-[#1A1A1A]"
                }`}
              >
                Annual
              </button>
            </div>
            <span className="text-xs text-[#FF6A3D] font-medium">-15% off on annual payments</span>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF6A3D]"></div>
          </div>
        ) : (
          /* Pricing Cards */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlan;
              const formattedPrice = plan.price.toLocaleString("en-IN");
              
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex flex-col rounded-[24px] transition-all duration-300 cursor-pointer p-[8px] pt-0 pb-[12px] ${
                    isSelected
                      ? "bg-[#FF6A3D] shadow-xl -translate-y-1 border border-transparent"
                      : "bg-transparent"
                  }`}
                >
                  {/* Banner — always present so card height stays constant */}
                  <div
                    className={`text-[10px] font-bold uppercase text-center py-[9px] select-none transition-colors duration-300 ${
                      isSelected ? "text-white" : "text-transparent pointer-events-none"
                    }`}
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {plan.id === "pro" ? "MOST POPULAR PLAN" : plan.id === "starter" ? "STARTER PLAN" : "ENTERPRISE PLAN"}
                  </div>

                  {/* Inner card */}
                  <div
                    className={`flex flex-col flex-1 px-7 pt-5 pb-5 rounded-[18px] transition-colors duration-300 ${
                      isSelected
                        ? "bg-gradient-to-b from-[#FFE8DB] to-[#FFFAF7]"
                        : "bg-white border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <h3 className="text-[17px] font-bold text-[#1A1A1A]">
                      {plan.name}
                      {isSelected && <span className="ml-1 text-[#FF6A3D]">⚡</span>}
                    </h3>
                    <p className="text-[12px] text-slate-400 mt-1 mb-3">{plan.description}</p>
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-[38px] font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                        ₹{formattedPrice}
                      </span>
                      <span className="text-[12px] text-slate-400">/per user</span>
                    </div>
                    <ul className="space-y-2 flex-1 mb-5">
                      {plan.features.map((featText) => {
                        const isHighlighted =
                          featText.toLowerCase().includes("includes all") ||
                          featText.toLowerCase().includes("all erp");

                        return (
                          <li key={featText} className="flex items-start gap-2.5 text-[11px] text-slate-600 leading-snug">
                            <svg
                              width="15" height="15" viewBox="0 0 24 24"
                              fill={isHighlighted ? "#FF6A3D" : "none"}
                              stroke={isHighlighted ? "#FF6A3D" : "#94A3B8"}
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="shrink-0 mt-[1.5px]"
                            >
                              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74z" />
                              <path d="m9 12 2 2 4-4" stroke={isHighlighted ? "white" : "#94A3B8"} strokeWidth="2.5" />
                            </svg>
                            <span className={isHighlighted ? "font-semibold text-[#1A1A1A]" : "text-slate-600"}>
                              {featText}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <a
                      href="#demo"
                      className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#1A1A1A] hover:bg-[#333] transition-colors text-center block"
                    >
                      Select plan
                    </a>
                    <a
                      href="#demo"
                      className={`text-center text-[12px] mt-2.5 transition-all duration-300 block ${
                        isSelected
                          ? "text-slate-400 cursor-pointer hover:text-slate-600"
                          : "text-transparent select-none pointer-events-none"
                      }`}
                    >
                      or contact sales
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dooyt Advantage */}
        <div className="mt-16 pt-10 border-t border-slate-100">
          <p className="text-center text-[13px] text-slate-400 mb-6">Experience the Dooyt Advantage</p>
          <div className="flex flex-wrap justify-center gap-3">
            {advantages.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF3EE] text-[13px] font-medium text-[#1A1A1A] select-none"
              >
                <Icon />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
