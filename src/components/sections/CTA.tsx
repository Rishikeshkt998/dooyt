import Image from "next/image";

export default function CTA() {
  return (
    <section id="cta" className="py-16 bg-white relative px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/cta-phone.png"
            alt="Make Every Day A Win with Dooyt - Schedule a demo"
            width={1536}
            height={480}
            className="w-full h-auto object-cover"
            priority
          />
          {/* Invisible clickable link over the "Schedule a demo" button area */}
          <a
            href="#demo"
            className="absolute bottom-[18%] left-[7%] w-[18%] h-[12%] z-10"
            aria-label="Schedule a demo"
          />
        </div>
      </div>
    </section>
  );
}
