"use client";
import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Great for small businesses.",
    price: "799",
    features: [
      { text: "Core modules: Finance, HR, CRM", highlighted: false },
      { text: "Up to 10 users", highlighted: false },
      { text: "Standard reports & analytics", highlighted: false },
      { text: "Email support", highlighted: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "For growing teams managing multiple operations.",
    price: "1,499",
    features: [
      { text: "Includes all Starter modules", highlighted: true },
      { text: "Adds Project Management, Sales & Inventory", highlighted: false },
      { text: "Advanced dashboards & analytics", highlighted: false },
      { text: "Custom dashboards", highlighted: false },
      { text: "Role-based access control", highlighted: false },
      { text: "Priority support", highlighted: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "For large organizations that need full customization.",
    price: "2,999",
    features: [
      { text: "All ERP modules included", highlighted: true },
      { text: "API integrations & custom workflows", highlighted: false },
      { text: "Dedicated account manager", highlighted: false },
      { text: "On-premise or cloud deployment", highlighted: false },
      { text: "24/7 premium support", highlighted: false },
      { text: "Custom integration support", highlighted: false },
      { text: "Compliance tools", highlighted: false },
    ],
  },
];

// Solid filled orange icons matching the reference design
const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A3D">
    <path d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666zM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"/>
    <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FF6A3D"/>
    <polyline points="12 6 12 12 16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A3D">
    <path fillRule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-6.75v1.5H15a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5h2.25V18H5.25a3 3 0 0 1-3-3V6z" clipRule="evenodd"/>
  </svg>
);

const WalkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A3D">
    <path d="M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    <path d="M9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6a1.98 1.98 0 0 0-1.7-1H11c-.7 0-1.3.3-1.7.8L6 13h2.3l1.5-4.1z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A3D">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A3D">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A3D">
    <path d="M5 20h2V10H5v10zm4 0h2V4H9v16zm4 0h2v-7h-2v7z"/>
  </svg>
);

const advantages = [
  { label: "Grows with you", Icon: RocketIcon },
  { label: "Save time", Icon: ClockIcon },
  { label: "1-month free trial", Icon: MonitorIcon },
  { label: "Work on the go", Icon: WalkIcon },
  { label: "Better Teamwork & Collaboration", Icon: UsersIcon },
  { label: "Stay compliant", Icon: HomeIcon },
  { label: "Keep Finances on Track", Icon: BarChartIcon },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlan;
            return (
              <div
                key={plan.name}
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
                      ₹{plan.price}
                    </span>
                    <span className="text-[12px] text-slate-400">/per user</span>
                  </div>
                  <ul className="space-y-2 flex-1 mb-5">
                    {plan.features.map((feat) => (
                      <li key={feat.text} className="flex items-start gap-2.5 text-[11px] text-slate-600 leading-snug">
                        <svg
                          width="15" height="15" viewBox="0 0 24 24"
                          fill={feat.highlighted ? "#FF6A3D" : "none"}
                          stroke={feat.highlighted ? "#FF6A3D" : "#94A3B8"}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="shrink-0 mt-[1.5px]"
                        >
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74z" />
                          <path d="m9 12 2 2 4-4" stroke={feat.highlighted ? "white" : "#94A3B8"} strokeWidth="2.5" />
                        </svg>
                        <span className={feat.highlighted ? "font-semibold text-[#1A1A1A]" : "text-slate-600"}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#1A1A1A] hover:bg-[#333] transition-colors">
                    Select plan
                  </button>
                  <p
                    className={`text-center text-[12px] mt-2.5 transition-all duration-300 ${
                      isSelected
                        ? "text-slate-400 cursor-pointer hover:text-slate-600"
                        : "text-transparent select-none pointer-events-none"
                    }`}
                  >
                    or contact sales
                  </p>
                </div>
              </div>
            );
          })}
        </div>

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
