import { footerColumns } from "@/lib/constants";

export default function Footer() {

  return (
    <footer id="footer" className="bg-[#000000] text-zinc-400 pt-16 pb-0 border-t border-zinc-800 relative overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start mb-8">
          
          {/* Brand/Description Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Dooyt"
                className="h-[42px] w-auto brightness-0 invert select-none pointer-events-none"
              />
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-[290px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            
            {/* Download App Badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              {/* App Store button */}
              <a 
                href="#"
                className="px-3.5 py-1.5 rounded-xl border border-white bg-black flex items-center gap-2.5 cursor-pointer hover:border-zinc-300 transition-colors duration-200"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.005 1.45 2.187 3.068 3.763 3.008 1.514-.06 2.09-.97 3.916-.97 1.815 0 2.34.97 3.925.94 1.613-.03 2.656-1.48 3.64-2.917 1.137-1.66 1.61-3.27 1.636-3.35-.06-.024-3.13-1.2-3.16-4.785-.024-2.99 2.454-4.425 2.565-4.49-1.4-2.05-3.56-2.285-4.32-2.333-2.015-.166-3.415 1.077-4.316 1.077zm3.178-4.636c.866-1.05 1.45-2.5 1.29-3.96-1.255.05-2.783.83-3.68 1.884-.8.93-1.5 2.39-1.31 3.832 1.39.1 2.834-.7 3.7-1.756z" />
                </svg>
                <div className="text-left leading-none">
                  <span className="text-[7.5px] text-white block uppercase tracking-tight">Download on the</span>
                  <span className="text-[12px] font-semibold text-white block mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play button */}
              <a 
                href="#"
                className="px-3.5 py-1.5 rounded-xl border border-white bg-black flex items-center gap-2.5 cursor-pointer hover:border-zinc-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M19.38 10.87c.73.42.73 1.48 0 1.9l-14.8 8.54a1.1 1.1 0 0 1-1.65-.95V3.34a1.1 1.1 0 0 1 1.65-.95l14.8 8.48z" />
                </svg>
                <div className="text-left leading-none">
                  <span className="text-[7.5px] text-zinc-400 block uppercase tracking-tight">GET IT ON</span>
                  <span className="text-[12px] font-semibold text-white block mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-10">
            {footerColumns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[15px] font-semibold text-white tracking-normal">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 font-normal"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-6 pb-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-zinc-500 font-normal">
            Copyright &copy; 2025 DOOYT. All Rights Reserved
          </p>
          
          {/* Social icons in rounded squares */}
          <div className="flex gap-3">
            {/* Facebook Card */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-lg bg-zinc-900/65 border border-zinc-800/80 hover:border-zinc-700 hover:text-white flex items-center justify-center text-zinc-400 cursor-pointer transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M14 13.5h2.5l1-3H14V8.5c0-.8.2-1.1 1-1.1h1.5v-3h-2.5C11.5 4.4 10 5.8 10 8.5v2H8v3h2V21h4v-7.5z" />
              </svg>
            </a>

            {/* X Card */}
            <a
              href="#"
              aria-label="X (formerly Twitter)"
              className="w-9 h-9 rounded-lg bg-zinc-900/65 border border-zinc-800/80 hover:border-zinc-700 hover:text-white flex items-center justify-center text-zinc-400 cursor-pointer transition-colors duration-200"
            >
              <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn Card */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg bg-zinc-900/65 border border-zinc-800/80 hover:border-zinc-700 hover:text-white flex items-center justify-center text-zinc-400 cursor-pointer transition-colors duration-200"
            >
              <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                <path d="M19 18.5h-2.79v-4.93c0-.77-.62-1.4-1.39-1.4a1.4 1.4 0 0 0-1.4 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3a3.26 3.26 0 0 1 3.26 3.26v5.3zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Giant Sunset-Textured Watermark Logo */}
      <div className="w-full overflow-hidden pointer-events-none select-none relative h-auto flex items-end justify-center z-0 mt-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/footer-watermark.png" 
          alt="Dooyt Watermark" 
          className="w-[110%] sm:w-full max-w-[1320px] h-auto opacity-[0.92] translate-y-0 object-bottom"
        />
      </div>
    </footer>
  );
}
