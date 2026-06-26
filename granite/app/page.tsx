"use client";

import React from "react";
import CorridorFlythrough from "@/components/CorridorFlythrough";
import GraniteGrid from "@/components/GraniteGrid";
import Image from "next/image";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you. Your consultation request has been received. A gallery representative will call you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 selection:bg-gold-500/30 selection:text-zinc-900">
      
      {/* Premium Editorial Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 border border-gold-500/50 rotate-45 flex items-center justify-center bg-white shadow-[0_0_10px_rgba(214,170,99,0.05)]">
            <span className="font-serif text-xs font-bold text-gold-600 -rotate-45">GV</span>
          </div>
          <span className="font-serif text-xs md:text-sm font-semibold tracking-[0.25em] text-zinc-900">THE GRANITE VAULT</span>
        </div>

        <nav className="hidden md:flex space-x-8 text-[10px] tracking-[0.2em] font-bold text-zinc-500">
          <button onClick={() => scrollToSection("showroom")} className="hover:text-gold-600 transition-colors duration-300 uppercase cursor-pointer">
            Collection
          </button>
          <button onClick={() => scrollToSection("sourcing")} className="hover:text-gold-600 transition-colors duration-300 uppercase cursor-pointer">
            Our Sourcing
          </button>
          <button onClick={() => scrollToSection("about")} className="hover:text-gold-600 transition-colors duration-300 uppercase cursor-pointer">
            About Us
          </button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-gold-600 transition-colors duration-300 uppercase cursor-pointer">
            Contact
          </button>
        </nav>

        <div>
          <button
            onClick={() => scrollToSection("contact")}
            className="py-2.5 px-6 text-[10px] tracking-[0.15em] font-bold text-white bg-gold-600 hover:bg-gold-500 rounded-sm transition-all duration-300 cursor-pointer shadow-sm active:scale-95 uppercase"
          >
            Get A Quote
          </button>
        </div>
      </header>

      {/* Main Page Layout */}
      <main className="flex-grow">
        
        {/* Section 1 & 2: sticky Hallway corridor flythrough (Hero integrated) */}
        <section id="showroom" className="w-full relative bg-[#060608]">
          <CorridorFlythrough onComplete={() => {}} />
        </section>

        {/* Section 3: Curated Collections Grid */}
        <GraniteGrid />

        {/* Section 4: Sourcing Timeline Section */}
        <section id="sourcing" className="w-full bg-[#faf9f6] py-24 px-6 md:px-16 border-t border-b border-zinc-200/50 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
            {/* Sourcing descriptive intro text */}
            <div className="w-full lg:w-[40%] select-none">
              <span className="text-[10px] tracking-[0.4em] text-gold-600 font-extrabold uppercase mb-2 block">
                OUR SOURCING
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-zinc-900 uppercase mb-6">
                From Nature.<br />To Perfection.
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed tracking-wider mb-8 font-light max-w-md">
                We bring you the finest granite, sourced from trusted quarry mines and crafted with high-precision diamond cutting technologies. Every slab undergoes strict safety and quality audits before installation.
              </p>
              <button 
                onClick={() => scrollToSection("about")}
                className="py-3 px-8 text-[10px] tracking-[0.2em] font-semibold text-white bg-gold-600 hover:bg-gold-500 transition-colors duration-300 rounded shadow-md cursor-pointer uppercase"
              >
                Learn More
              </button>
            </div>

            {/* Timeline progression */}
            <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 select-none relative">
              {/* Quarry Selection */}
              <div className="flex flex-col items-center text-center p-5 bg-white border border-zinc-200 rounded shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200/50 flex items-center justify-center mb-4 text-gold-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold tracking-widest text-zinc-800 uppercase mb-2">Carefully Selected</h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">The finest stone blocks are handpicked from trusted global quarry mines.</p>
              </div>

              {/* Stone Processing */}
              <div className="flex flex-col items-center text-center p-5 bg-white border border-zinc-200 rounded shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200/50 flex items-center justify-center mb-4 text-gold-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold tracking-widest text-zinc-800 uppercase mb-2">Expert Processing</h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">Diamond wire cut and book-matched with high-precision engineering.</p>
              </div>

              {/* Quality Audit */}
              <div className="flex flex-col items-center text-center p-5 bg-white border border-zinc-200 rounded shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200/50 flex items-center justify-center mb-4 text-gold-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold tracking-widest text-zinc-800 uppercase mb-2">Quality Checked</h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">Every single panel is tested for density, compressive load, and polish quality.</p>
              </div>

              {/* Safe Delivery */}
              <div className="flex flex-col items-center text-center p-5 bg-white border border-zinc-200 rounded shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200/50 flex items-center justify-center mb-4 text-gold-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold tracking-widest text-zinc-800 uppercase mb-2">Delivered to You</h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">Safely packed and transported for flawless architectural installations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Trust building About Metrics */}
        <section id="about" className="w-full bg-white py-24 px-6 md:px-16 border-b border-zinc-100 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 select-none">
            <div className="w-full md:w-[45%] text-left">
              <span className="text-[10px] tracking-[0.4em] text-gold-600 font-extrabold uppercase mb-2 block">
                TRUST & ACCREDITATION
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-zinc-900 uppercase mb-6 leading-tight">
                Architectural Integrity<br />Built Over Decades
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed tracking-wider font-light max-w-sm">
                The Granite Vault stands as a premier catalog partner for international interior designers, luxury contractors, and private homeowners seeking pristine quarry selections.
              </p>
            </div>
            
            <div className="w-full md:w-[50%] grid grid-cols-2 gap-8 text-center md:text-left">
              <div>
                <span className="font-serif text-4xl md:text-5xl font-extrabold text-gold-600 block mb-1">15+</span>
                <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">Years Experience</span>
                <span className="text-[9px] text-zinc-500 font-light block leading-normal">Premium stone select and processing logs.</span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5xl font-extrabold text-gold-600 block mb-1">450+</span>
                <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">Luxury Projects</span>
                <span className="text-[9px] text-zinc-500 font-light block leading-normal">Residences, corporate lobbies, and yachts globally.</span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5xl font-extrabold text-gold-600 block mb-1">100%</span>
                <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">Pristine Sourcing</span>
                <span className="text-[9px] text-zinc-500 font-light block leading-normal">Direct import of quarry blocks without intermediaries.</span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5xl font-extrabold text-gold-600 block mb-1">10+</span>
                <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">Quarry Partners</span>
                <span className="text-[9px] text-zinc-500 font-light block leading-normal">Direct quarry layers in Brazil, India, and Norway.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Contact inquiry split */}
        <section id="contact" className="w-full bg-[#fcfcf9] py-24 px-6 md:px-16 border-t border-zinc-200/50 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
            
            {/* Left Column: Sourced Image & details */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="relative w-full h-[320px] md:h-[400px] rounded-lg overflow-hidden border border-zinc-200/80 shadow-md mb-8">
                <Image
                  src="/kitchen.png"
                  alt="Curated Granite Kitchen Space Layout"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none text-left">
                <div>
                  <span className="text-[9px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">CALL US</span>
                  <span className="text-xs text-zinc-800 font-semibold block">+91 98765 43210</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">EMAIL INQUIRY</span>
                  <span className="text-xs text-zinc-800 font-semibold block">hello@thegranitevault.com</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-widest text-zinc-400 font-bold uppercase block mb-1">OFFICE LAB</span>
                  <span className="text-xs text-zinc-800 font-semibold block">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 bg-white rounded-lg border border-zinc-200/60 shadow-lg">
              <span className="text-[10px] tracking-[0.4em] text-gold-600 font-extrabold uppercase mb-2 block select-none">
                LET&apos;S BUILD SOMETHING BEAUTIFUL
              </span>
              <h2 className="font-serif text-3xl font-normal text-zinc-900 uppercase mb-3 select-none">
                Get in Touch
              </h2>
              <p className="text-zinc-500 text-xs leading-relaxed font-light mb-8 select-none">
                Have a premium project in mind? We would love to arrange a showroom viewing or custom quote consultation.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-zinc-50/60 border border-zinc-200 rounded py-3 px-4 text-xs tracking-wider text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 font-medium"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full bg-zinc-50/60 border border-zinc-200 rounded py-3 px-4 text-xs tracking-wider text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 font-medium"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full bg-zinc-50/60 border border-zinc-200 rounded py-3 px-4 text-xs tracking-wider text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 font-medium"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your Message"
                    className="w-full bg-zinc-50/60 border border-zinc-200 rounded py-3 px-4 text-xs tracking-wider text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-8 text-xs tracking-[0.25em] font-semibold text-black bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-400 hover:to-gold-200 transition-all duration-300 rounded shadow-md cursor-pointer active:scale-[0.98] uppercase"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Luxury Footer */}
      <footer className="w-full bg-zinc-50 py-16 px-6 md:px-16 border-t border-zinc-200 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 select-none text-left mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-7 h-7 border border-gold-500/50 rotate-45 flex items-center justify-center bg-white shadow-sm">
                <span className="font-serif text-[10px] font-bold text-gold-600 -rotate-45">GV</span>
              </div>
              <span className="font-serif text-sm font-semibold tracking-[0.25em] text-zinc-900">THE GRANITE VAULT</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed max-w-sm font-light mb-6">
              Bringing nature&apos;s finest geological stones to life. Curating and custom crafting premium book-matched slabs for luxury spatial designs.
            </p>
            {/* Social Icons mockups */}
            <div className="flex space-x-4 text-zinc-400">
              {["fb", "tw", "ig", "ln", "yt"].map((social, idx) => (
                <span key={idx} className="w-6 h-6 rounded-full border border-zinc-200 hover:border-gold-400 hover:text-gold-600 flex items-center justify-center text-[9px] uppercase cursor-pointer font-bold transition-all duration-300">
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-xs text-zinc-500 font-light">
              <li onClick={() => scrollToSection("showroom")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Home</li>
              <li onClick={() => scrollToSection("collection")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Collection</li>
              <li onClick={() => scrollToSection("sourcing")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Our Sourcing</li>
              <li onClick={() => scrollToSection("about")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">About Us</li>
              <li onClick={() => scrollToSection("contact")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Contact</li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase mb-4">COLLECTION</h4>
            <ul className="space-y-2 text-xs text-zinc-500 font-light">
              <li onClick={() => scrollToSection("collection")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Black Granites</li>
              <li onClick={() => scrollToSection("collection")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">White Granites</li>
              <li onClick={() => scrollToSection("collection")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Grey Granites</li>
              <li onClick={() => scrollToSection("collection")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Brown Granites</li>
              <li onClick={() => scrollToSection("collection")} className="hover:text-gold-600 cursor-pointer transition-colors duration-300">Exotic Slabs</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase mb-4">NEWSLETTER</h4>
            <p className="text-zinc-500 text-[10px] leading-relaxed mb-4 font-light">
              Stay updated with our latest quarry shipments and design projects.
            </p>
            <div className="flex gap-1 border border-zinc-200 rounded p-1 bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent text-[11px] py-1 px-2 text-zinc-800 placeholder-zinc-400 focus:outline-none font-medium"
              />
              <button onClick={() => alert("Subscribed successfully.")} className="px-3 py-1 bg-gold-600 hover:bg-gold-500 text-[10px] text-white rounded-sm font-semibold cursor-pointer uppercase tracking-wider">
                →
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-400 font-light select-none gap-4">
          <div>
            © {new Date().getFullYear()} The Granite Vault. All Rights Reserved. Crafted with nature.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-gold-600 cursor-pointer transition-colors">Privacy Regulation</span>
            <span className="hover:text-gold-600 cursor-pointer transition-colors">Terms of Accreditation</span>
            <span className="hover:text-gold-600 cursor-pointer transition-colors">Vault Security</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
