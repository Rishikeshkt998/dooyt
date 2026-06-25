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

  const [isOpen, setIsOpen] = useState(false);

  // Sync planId with URL query params (e.g. ?plan=plan-professional)
  useEffect(() => {
    const urlPlan = searchParams.get("plan");
    if (urlPlan && plansData?.data?.some((p) => p.id === urlPlan)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, planId: urlPlan }));
    }
  }, [searchParams, plansData]);

  // Listen to hash change to open/close modal
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#demo") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    if (window.location.hash === "#demo") {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

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
    <>
      {/* Modal Dialog — opened by any href="#demo" or window.location.hash="demo" */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          {/* Modal Overlay Close */}
          <div className="absolute inset-0" onClick={closeModal} />
          
          {/* Modal Container Card */}
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 z-10">
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
            
            {/* Left Column - Info Panel (Desktop Only) */}
            <div className="hidden md:flex md:w-[40%] bg-[#FCF9F6] p-8 flex-col justify-between border-r border-slate-100">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFF2ED] border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                  Dooyt ERP
                </span>
                <h3 className="text-2xl font-bold text-[#1A1A1A] leading-tight">
                  Schedule Your <span className="text-primary">Demo</span>
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Fill out this quick form and one of our experts will prepare a custom demonstration tailored for your business needs.
                </p>
                
                <div className="space-y-3 pt-6 border-t border-slate-250/20">
                  {[
                    "Personalized onboarding roadmap",
                    "Detailed evaluation checklist",
                    "Full trial account credentials",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-[#FFF2ED] border border-primary/20 flex items-center justify-center text-primary font-bold text-[10px] shrink-0">
                        ✓
                      </span>
                      <span className="text-xs font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Form Panel */}
            <div className="w-full md:w-[60%] p-6 sm:p-8 overflow-y-auto">
              
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.fullName ? "border-red-500/50" : "border-slate-200 focus:border-primary"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.email ? "border-red-500/50" : "border-slate-200 focus:border-primary"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label htmlFor="company" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Plan Dropdown */}
                <div>
                  <label htmlFor="planId" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Select a Plan
                  </label>
                  <div className="relative">
                    <select
                      suppressHydrationWarning
                      id="planId"
                      name="planId"
                      value={formData.planId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
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
                  <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    suppressHydrationWarning
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full font-bold text-white bg-primary hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed"
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
      )}
    </>
  );
}
