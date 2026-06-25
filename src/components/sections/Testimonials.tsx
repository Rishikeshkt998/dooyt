"use client";
import { useFetch } from "@/hooks/useFetch";
import type { Testimonial, PaginatedResponse } from "@/types";

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#F59E0B">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data, loading, error, refetch } = useFetch<PaginatedResponse<Testimonial>>(
    "/api/testimonials?page=1&limit=6"
  );
  const testimonials = data?.data || [];

  return (
    <section id="testimonials" className="py-20 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF6A3D] text-sm font-medium block mb-3">Testimonials</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-3 font-sans">
            Proven Results. Real Feedback.
          </h2>
          <p className="text-slate-400 text-sm">Here&apos;s what our customers experienced.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load testimonials</p>
            <button onClick={refetch} className="px-6 py-2.5 text-sm font-semibold text-white bg-[#F15A24] rounded-full">Try Again</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-7 rounded-2xl border border-slate-200 animate-pulse h-60" />
            ))}
          </div>
        )}

        {/* Row 1 */}
        {!loading && !error && testimonials.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              {testimonials.slice(0, 3).map((t, idx) => (
                <div key={t.id} className="rounded-2xl p-7 flex flex-col bg-white" style={{ border: "1.5px solid #E2E8F0" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Stars />
                    <span className="text-sm font-bold text-[#1A1A1A]">5.0</span>
                  </div>
                  <p className="text-[13.5px] font-semibold text-[#1A1A1A] leading-[1.6] mb-6 flex-1">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/person${(idx % 3) + 1}.png`}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover object-top shrink-0"
                    />
                    <div>
                      <span className="block text-sm font-bold text-[#1A1A1A]">{t.author}</span>
                      <span className="text-xs text-slate-400">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            {testimonials.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {testimonials.slice(3, 6).map((t, idx) => (
                  <div key={t.id} className="rounded-2xl p-7 flex flex-col bg-white" style={{ border: "1.5px solid #E2E8F0" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Stars />
                      <span className="text-sm font-bold text-[#1A1A1A]">5.0</span>
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#1A1A1A] leading-[1.6] mb-6 flex-1">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/person${(idx % 3) + 1}.png`}
                        alt={t.author}
                        className="w-10 h-10 rounded-full object-cover object-top shrink-0"
                      />
                      <div>
                        <span className="block text-sm font-bold text-[#1A1A1A]">{t.author}</span>
                        <span className="text-xs text-slate-400">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
