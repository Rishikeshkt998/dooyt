"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import type { PlanResponse } from "@/types";

export default function DemoRequestForm() {
  const searchParams = useSearchParams();
  const { data: plansData } = useFetch<{ data: PlanResponse[] }>("/api/plans");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    planId: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync planId with URL query params (e.g. ?plan=plan-professional)
  useEffect(() => {
    const urlPlan = searchParams.get("plan");
    if (urlPlan && plansData?.data?.some((p) => p.id === urlPlan)) {
      setFormData((prev) => ({ ...prev, planId: urlPlan }));
    }
  }, [searchParams, plansData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const payload: Record<string, string> = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
      };

      if (formData.company.trim()) payload.company = formData.company.trim();
      if (formData.phone.trim()) payload.phone = formData.phone.trim();
      if (formData.planId) payload.planId = formData.planId;
      if (formData.message.trim()) payload.message = formData.message.trim();

      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        planId: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-[#FCF9F6] relative overflow-hidden px-4 sm:px-6">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF2ED] border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              Request a Demo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
              See Dooyt in <span className="text-primary">Action</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-semibold">
              Fill out the form to schedule a personalized walkthrough. Our ERP experts will guide you through relevant modules and answer any integration questions.
            </p>
            <div className="space-y-4 pt-6 border-t border-slate-250/20">
              {[
                "Personalized onboarding roadmap",
                "Detailed evaluation checklist",
                "Full trial account credentials",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-[#FFF2ED] border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-150/50">
              
              {/* Toast Alerts */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-xs sm:text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-bold block">Demo requested successfully!</span>
                    Our team will reach out to you within 24 hours.
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs sm:text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <div>
                    <span className="font-bold block">Request failed</span>
                    {errorMessage}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.fullName ? "border-red-500/50" : "border-slate-200 focus:border-primary"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.email ? "border-red-500/50" : "border-slate-200 focus:border-primary"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <label htmlFor="company" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      suppressHydrationWarning
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Plan Dropdown */}
                <div>
                  <label htmlFor="planId" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Select a Plan
                  </label>
                  <div className="relative">
                    <select
                      suppressHydrationWarning
                      id="planId"
                      name="planId"
                      value={formData.planId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Choose a plan...</option>
                      {plansData?.data?.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} (₹{plan.price}/user)
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    suppressHydrationWarning
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-full font-bold text-white bg-primary hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    "Schedule Walkthrough"
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
