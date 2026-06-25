"use client";

import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import type { Industry } from "@/types";

interface CardProps {
  name: string;
  description: string;
  image?: string;
  textTop?: boolean;
}

function IndustryCard({ name, description, image, textTop = true }: CardProps) {
  const imageUrl = image || "/images/solar.png";
  return (
    <div className="rounded-3xl bg-[#FFFBF8] border border-slate-100 p-6 flex flex-col h-full  hover:shadow-md transition-shadow">
      {textTop ? (
        <>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{name}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="rounded-2xl overflow-hidden mt-auto">
            <Image
              src={imageUrl}
              alt={name}
              width={400}
              height={240}
              className="w-full h-40 object-cover"
            />
          </div>
        </>
      ) : (
        <>
          <div className="rounded-2xl overflow-hidden mb-4">
            <Image
              src={imageUrl}
              alt={name}
              width={400}
              height={240}
              className="w-full h-40 object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{name}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {description}
          </p>
        </>
      )}
    </div>
  );
}

export default function Industries() {
  const { data, loading } = useFetch<{ data: Industry[] }>("/api/industries");
  const industries = data?.data || [];

  if (loading || industries.length < 8) {
    return (
      <section id="industries" className="py-20 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF6A3D]"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="industries" className="py-20 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header - Centered */}
        <div className="text-center mb-14">
          <span className="text-[#FF6A3D] text-sm font-medium mb-3 block">Industries</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-3 font-sans">
            Smart Solutions for Every Industry
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Dooyt is recognized as a reliable and customized ERP solution that adapts to
            the unique needs of every industry.
          </p>
        </div>

        {/* Bento Grid - Row 1 & 2: Irregularly situated layout on desktop */}
        {/* On desktop: 3-column grid with equal-height rows where the center items are offset upwards */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-stretch mb-6">
          {/* Row 1, Col 1: Solar */}
          <IndustryCard {...industries[0]} textTop={true} />
          
          {/* Row 1, Col 2: IT & SaaS - Shifted Upwards */}
          <div className="relative md:-mt-12 h-full flex flex-col">
            <IndustryCard {...industries[1]} textTop={false} />
          </div>
          
          {/* Row 1, Col 3: Construction */}
          <IndustryCard {...industries[2]} textTop={true} />

          {/* Row 2, Col 1: Manufacturing */}
          <IndustryCard {...industries[4]} textTop={false} />
          
          {/* Row 2, Col 2: Education - Shifted Upwards */}
          <div className="relative md:-mt-12 h-full min-h-[352px] flex flex-col">
            <IndustryCard {...industries[3]} textTop={true} />
          </div>
          
          {/* Row 2, Col 3: E-commerce */}
          <IndustryCard {...industries[5]} textTop={false} />
        </div>

        {/* On mobile: standard vertical stacked grid */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:hidden">
          <IndustryCard {...industries[0]} textTop={true} />
          <IndustryCard {...industries[1]} textTop={false} />
          <IndustryCard {...industries[2]} textTop={true} />
          <IndustryCard {...industries[4]} textTop={false} />
          <IndustryCard {...industries[3]} textTop={true} />
          <IndustryCard {...industries[5]} textTop={false} />
        </div>

        {/* Bento Grid - Row 3: Logistics | Digital Marketing (2 horizontal cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Logistics — image left, text right */}
          <div className="rounded-3xl bg-[#FFFBF8] border border-slate-100 p-6 flex flex-row items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
            {industries[6].image && (
              <div className="rounded-2xl overflow-hidden shrink-0 w-40 h-32">
                <Image src={industries[6].image} alt="Logistics" width={200} height={160} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{industries[6].name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {industries[6].description}
              </p>
            </div>
          </div>

          {/* Digital Marketing — image left, text right */}
          <div className="rounded-3xl bg-[#FFFBF8] border border-slate-100 p-6 flex flex-row items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
            {industries[7].image && (
              <div className="rounded-2xl overflow-hidden shrink-0 w-40 h-32">
                <Image src={industries[7].image} alt="Digital Marketing" width={200} height={160} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{industries[7].name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {industries[7].description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
