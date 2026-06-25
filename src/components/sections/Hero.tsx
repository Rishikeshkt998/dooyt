export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-8"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFF2ED] border border-orange-100/50 text-primary text-xs font-semibold mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fire.png" alt="🔥" className="w-4 h-4 object-contain shrink-0" />
          Best ERP Software
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight mb-6 max-w-4xl">
          Accuracy. Productivity.
          <span className="block text-primary mt-2">Business Wins</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mb-8 leading-relaxed">
          Instead of using many tools, just choose one to control your entire business<br className="hidden md:inline" />
          effortlessly. Dooyt, the best ERP software that makes smarter decisions and<br className="hidden md:inline" />
          drives business growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="#demo"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-hover transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15"
          >
            <svg className="w-4 h-4 text-white fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.149 15.149 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.43a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.27 1.11z" />
            </svg>
            Request A Demo
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-8 py-4 text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm"
          >
            Try Free for 30 Days
            <svg className="w-3.5 h-3.5 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-8">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-slate-400 font-normal">(Rating 4.5 star)</span>
        </div>
      </div>

      {/* Dashboard Showcase Image Container - Full width, edge-to-edge displaying the entire image */}
      <div className="w-full relative mt-6">
        <div className="relative z-10 w-full flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/website_ready_dashboard.png" 
            alt="Dashboard Showcase" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
