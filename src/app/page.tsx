import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Modules from "@/components/sections/Modules";
import Features from "@/components/sections/Features";
import Industries from "@/components/sections/Industries";
import CTA from "@/components/sections/CTA";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/forms/FAQ";
import DemoRequestForm from "@/components/forms/DemoRequestForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Modules />
        <Features />
        <Industries />
        <CTA />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Suspense fallback={<div className="py-24 text-center text-slate-500">Loading form...</div>}>
          <DemoRequestForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

