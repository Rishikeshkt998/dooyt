"use client";

import { useState, useEffect, useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { Module } from "@/types";
import { moduleImages } from "@/lib/constants";

export default function Modules() {
  const { data, loading, error, refetch } = useFetch<{ data: Module[] }>("/api/modules");
  const [activeTabId, setActiveTabId] = useState<string>("");

  const modules = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (modules.length > 0 && !activeTabId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTabId(modules[0].id);
    }
  }, [modules, activeTabId]);

  const activeModule = useMemo(() => modules.find((m) => m.id === activeTabId) || null, [modules, activeTabId]);

  return (
    <section id="modules" className="py-10 bg-white relative px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#FF6A3D] text-sm font-medium mb-3">
            Modules
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-8 font-sans">
            Modules That Do More
          </h2>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load modules</p>
            <button
              onClick={refetch}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-10 w-28 bg-slate-200 rounded-full" />
              ))}
            </div>
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
          </div>
        )}

        {/* Tab Switcher Grid */}
        {!loading && !error && modules.length > 0 && (
          <div className="flex flex-col items-center gap-12">
            
            {/* Tabs List */}
            <div className="flex flex-wrap gap-x-8 gap-y-6 justify-center w-full max-w-7xl mx-auto mb-4">
              {modules.map((mod) => {
                const isActive = activeTabId === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveTabId(mod.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#FF6A3D] text-white shadow-md shadow-[#FF6A3D]/20"
                        : "bg-transparent text-[#1A1A1A] hover:text-[#FF6A3D]"
                    }`}
                  >
                    <ModuleIcon name={mod.name} isActive={isActive} />
                    {mod.name}
                  </button>
                );
              })}
            </div>

            {/* Active Module Panel */}
            {activeModule && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-[#FFF8F2] p-6 sm:p-10 lg:p-12 rounded-[2rem] border border-[#FFF0E0] overflow-hidden">
                
                {/* Visual Mock Side */}
                <div className="lg:col-span-7 w-full flex justify-center lg:-mb-12 self-end">
                  <div className="w-full rounded-t-[1.5rem] rounded-b-none lg:rounded-l-[1.5rem] lg:rounded-r-none overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={moduleImages[activeModule.id] || `/images/module-${activeModule.id}.png`} 
                      alt={`${activeModule.name} Dashboard Mockup`} 
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                </div>

                {/* Description Side */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <h3 className="text-3xl sm:text-[2.25rem] font-bold text-[#1A1A1A] tracking-tight mb-4 leading-tight">
                    {activeModule.name}
                  </h3>
                  <p className="text-[#555555] text-[15px] sm:text-base leading-[1.65]">
                    {activeModule.description}
                  </p>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

function ModuleIcon({ name, isActive }: { name: string; isActive: boolean }) {
  const c = "currentColor";
  const accentColor = isActive ? "white" : "#FF6A3D";
  
  // Task Management: Layers icon
  if (name.includes("Task")) {
    return (
      <svg width="18" height="18" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        {/* Top layer */}
        <path stroke={c} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5l7 3.5-7 3.5-7-3.5 7-3.5z" />
        {/* Middle layer - Accent */}
        <path stroke={accentColor} strokeLinecap="round" strokeLinejoin="round" d="M19 11l-7 3.5L5 11" />
        {/* Bottom layer */}
        <path stroke={c} strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7 3.5L5 15" />
      </svg>
    );
  }
  
  // Inventory: Drawer/Box icon
  if (name.includes("Inventory")) {
    return (
      <svg width="18" height="18" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        {/* Box body */}
        <rect x="4" y="5" width="16" height="14" rx="2" stroke={c} />
        {/* Divider */}
        <path stroke={c} d="M4 12h16" />
        {/* Handle - Accent */}
        <path stroke={accentColor} strokeLinecap="round" d="M10 16h4" />
      </svg>
    );
  }
  
  // E-commerce: Shopping Cart icon
  if (name.includes("E-commerce") || name.includes("commerce")) {
    return (
      <svg width="18" height="18" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        {/* Cart body */}
        <path stroke={c} strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
        {/* Wheels - Accent */}
        <circle cx="17" cy="18.5" r="2" stroke={accentColor} />
        <circle cx="9" cy="18.5" r="2" stroke={accentColor} />
      </svg>
    );
  }
  
  // Default: Document with lines (used in CRM, Project, Accounting, HRMS, Marketing in the design)
  return (
    <svg width="18" height="18" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
      {/* Document outline */}
      <path stroke={c} strokeLinecap="round" strokeLinejoin="round" d="M12 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H12z" />
      {/* Inner lines - Accent */}
      <path stroke={accentColor} strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6" />
    </svg>
  );
}
