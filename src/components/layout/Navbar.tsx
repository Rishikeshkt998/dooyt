"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#modules", label: "Benefits" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#demo", label: "Contact Us" },
  ];

  return (
    <>
      {/* Fixed wrapper */}
      <div className="fixed top-1 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3">
        <nav
          id="main-nav"
          className={`w-full max-w-7xl flex items-center justify-between h-[52px] pl-4 pr-5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "border border-orange-100"
              : "border border-orange-100/70"
          }`}
          style={{ backgroundColor: "#FDEFE7" }}
        >
          {/* Logo — sized to fit nav height comfortably */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Dooyt"
              style={{ height: "42px", width: "auto" }}
            />
          </Link>

          {/* Desktop Nav — absolutely centered */}
          <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-[#F15A24] transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#demo"
              className="px-5 py-2 text-xs font-normal text-white rounded-lg transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              Request A Demo
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full text-slate-700 hover:bg-orange-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed top-[74px] left-4 right-4 z-40 rounded-2xl border border-orange-100 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        style={{ backgroundColor: "#FFF7F4" }}
      >
        <div className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#F15A24] rounded-xl hover:bg-orange-50 transition-all duration-200 flex items-center justify-between"
            >
              {link.label}
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          ))}
          <div className="mt-2 pt-3 border-t border-orange-100">
            <a
              href="#demo"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-6 py-3 text-sm font-normal text-white rounded-lg"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              Request A Demo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
