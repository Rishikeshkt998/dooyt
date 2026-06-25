export default function Features() {
  return (
    <section id="features" className="py-20 bg-white overflow-hidden">
      {/* Section Header - Centered Content Alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <span className="text-[#FF6A3D] text-sm font-medium mb-2 block">Features</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-5 max-w-xl font-sans">
          How Dooyt Can Simplify Your Business Management?
        </h2>
        <p className="text-slate-500 text-xs max-w-xl leading-relaxed">
          Dooyt is renowned as the best ERP system for small companies and has many<br className="hidden md:inline" />
          features that help to simplify every aspect of your business on a single, easy-<br className="hidden md:inline" />
          to-use platform.
        </p>
      </div>

      {/* Grid wrapper: aligns left edge to max-w-7xl content edge, bleeds to right edge on desktop */}
      <div className="w-full pl-4 pr-4 sm:pl-6 sm:pr-6 md:pr-0 md:pl-6 xl:pl-[calc((100vw-1280px)/2+24px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">

          {/* LEFT CARD: Orange gradient with donut chart */}
          <div
            className="rounded-[12px] px-8 sm:px-14 py-8 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FF9E00 0%, #FF4D00 50%, #FF1F00 100%)" }}
          >
            <div className="bg-white rounded-[12px] p-4 sm:p-5 w-full h-full flex flex-col shadow-sm border border-slate-100/50">
              <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] pb-2 border-b border-[#F2F2F2] mb-3">
                Lead Source Summary
              </h4>

              <div className="relative w-26 h-26 sm:w-28 sm:h-28 mx-auto mb-3 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFAE34" />
                      <stop offset="100%" stopColor="#FF7A00" />
                    </linearGradient>
                    <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF7A6B" />
                      <stop offset="100%" stopColor="#DE3D2F" />
                    </linearGradient>
                  </defs>
                  
                  {/* FACEBOOK - Orange gradient */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="url(#orangeGrad)" strokeWidth="11" strokeDasharray="79 226.2" strokeDashoffset="0" />
                  
                  {/* MURSHID - Blue */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3FA9F5" strokeWidth="11" strokeDasharray="3 226.2" strokeDashoffset="-81" />
                  
                  {/* Not Defined - Red gradient */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="url(#coralGrad)" strokeWidth="11" strokeDasharray="44 226.2" strokeDashoffset="-86" />
                  
                  {/* INSTAGRAM - Orange/Red */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#FF5722" strokeWidth="11" strokeDasharray="7 226.2" strokeDashoffset="-132" />
                  
                  {/* Whatsapp - Cyan */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#26C6DA" strokeWidth="11" strokeDasharray="7 226.2" strokeDashoffset="-141" />
                  
                  {/* Google Ad - Blue */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#2F80ED" strokeWidth="11" strokeDasharray="3 226.2" strokeDashoffset="-150" />
                  
                  {/* Cafit - Pink */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#EC407A" strokeWidth="11" strokeDasharray="5 226.2" strokeDashoffset="-155" />
                  
                  {/* BNI - Yellow */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#FBC02D" strokeWidth="11" strokeDasharray="15 226.2" strokeDashoffset="-162" />
                  
                  {/* Facebook ERP - Purple */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#7E57C2" strokeWidth="11" strokeDasharray="3 226.2" strokeDashoffset="-179" />
                  
                  {/* Website - Green */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#26A69A" strokeWidth="11" strokeDasharray="3 226.2" strokeDashoffset="-184" />
                  
                  {/* Meta Ad - Purple */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#BA68C8" strokeWidth="11" strokeDasharray="9 226.2" strokeDashoffset="-189" />
                  
                  {/* Public Reference - Green */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#66BB6A" strokeWidth="11" strokeDasharray="24 226.2" strokeDashoffset="-200" />
                </svg>
              </div>

              <div className="flex flex-col gap-y-1.5 mt-auto text-[8px] font-medium text-slate-500 w-full px-1">
                {/* Row 1 */}
                <div className="flex flex-row flex-wrap justify-center gap-x-1.5 gap-y-1">
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BA68C8]" />
                    <span>Meta Ad</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66BB6A]" />
                    <span>Public Reference</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A4D]" />
                    <span>FACEBOOK</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3FA9F5]" />
                    <span>MURSHID</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-row flex-wrap justify-center gap-x-1.5 gap-y-1">
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EE5A4B]" />
                    <span>Not Defined</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                    <span>INSTAGRAM</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26C6DA]" />
                    <span>Whatsapp</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F80ED]" />
                    <span>Google Ad</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC407A]" />
                    <span>Cafit</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-row flex-wrap justify-center gap-x-1.5 gap-y-1">
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBC02D]" />
                    <span>BNI</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7E57C2]" />
                    <span>Facebook ERP</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26A69A]" />
                    <span>Website</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE CARD: Real-Time Dashboards */}
          <div className="rounded-[12px] bg-[#FFF0EB] p-8 sm:p-10 flex flex-col justify-center">
            <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#1A1A1A] mb-5 tracking-tight leading-[1.2] font-sans">
              Real-Time Dashboards<br />for Every Department
            </h3>
            <p className="text-[#666666] text-[12px] sm:text-[13px] leading-[1.6] font-normal">
              Dooyt ERP has a dedicated dashboard for each module. This visually interactive
              dashboard provides instant access to data and business performance, tracks progress,
              and makes quick, informed decisions anytime.
            </p>
          </div>

          {/* RIGHT CARD: Task History on deep blue — flush right edge on desktop */}
          <div
            className="rounded-[12px] md:rounded-r-none pl-8 sm:pl-14 pr-8 sm:pr-14 md:pr-0 py-8 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3D52E0 0%, #2A3BB0 100%)" }}
          >
            <div className="bg-white rounded-[12px] md:rounded-r-none p-5 sm:p-6 w-full h-full flex flex-col shadow-sm border border-slate-100/50">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <span className="text-sm sm:text-base font-bold text-slate-800">Task History</span>
                <button className="text-slate-400 hover:text-slate-600 text-lg transition-colors leading-none">
                  ×
                </button>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {[
                  { 
                    time: "09:20 am", 
                    status: "Started",  
                    barColor: "#1E56E2", 
                    bgColor: "#E9F0FE", 
                    textColor: "#1E56E2",
                    lineColor: "#E2EAFE",
                    offset: "0%"
                  },
                  { 
                    time: "10:25 am", 
                    status: "Hold",     
                    barColor: "#F59E0B", 
                    bgColor: "#FFF7ED", 
                    textColor: "#D97706",
                    lineColor: "#FFEDD5",
                    offset: "18%"
                  },
                  { 
                    time: "11:45 am", 
                    status: "Started",  
                    barColor: "#1E56E2", 
                    bgColor: "#E9F0FE", 
                    textColor: "#1E56E2",
                    lineColor: "#E2EAFE",
                    offset: "36%"
                  },
                  { 
                    time: "02:30 pm", 
                    status: "Finished", 
                    barColor: "#10B981", 
                    bgColor: "#ECFDF5", 
                    textColor: "#10B981",
                    lineColor: "#D1FAE5",
                    offset: "48%"
                  },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-center h-10 w-full" style={{ paddingLeft: item.offset }}>
                    {/* Horizontal connector line */}
                    <div className="absolute left-0 right-0 h-[1px]" style={{ backgroundColor: item.lineColor }} />
                    
                    {/* Time indicator (sits on top of horizontal line with matching white background) */}
                    <span 
                      className="relative z-10 px-2 text-[10px] font-semibold bg-white mr-3 shrink-0" 
                      style={{ color: item.textColor }}
                    >
                      {item.time}
                    </span>
                    
                    {/* Status badge with integrated vertical left color bar */}
                    <div 
                      className="relative z-10 rounded-lg flex items-center overflow-hidden h-7 px-3 shrink-0 shadow-sm border border-slate-100"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: item.barColor }} />
                      <span className="text-[11px] font-semibold pl-1.5" style={{ color: item.textColor }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
