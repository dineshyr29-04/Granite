"use client";

import React from "react";
import CorridorFlythrough from "@/components/CorridorFlythrough";
import GraniteGrid from "@/components/GraniteGrid";

export default function Home() {
  const startShowroom = () => {
    // Smooth scroll down to start the flythrough container
    const showroomElement = document.getElementById("showroom");
    if (showroomElement) {
      showroomElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 selection:bg-gold-500/30 selection:text-zinc-900">
      
      {/* Sticky Premium Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 py-5 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {/* Symmetrical logo design */}
          <div className="w-8 h-8 border border-gold-500/50 rotate-45 flex items-center justify-center bg-white shadow-[0_0_10px_rgba(214,170,99,0.05)]">
            <span className="font-serif text-xs font-bold text-gold-600 -rotate-45">GV</span>
          </div>
          <span className="font-serif text-sm md:text-base font-semibold tracking-[0.25em] text-zinc-900">THE GRANITE VAULT</span>
        </div>

        <nav className="flex space-x-6 md:space-x-10 text-[10px] md:text-xs tracking-[0.25em] font-medium text-zinc-500">
          <button 
            onClick={() => scrollToSection("showroom")}
            className="hover:text-gold-400 transition-colors duration-300 uppercase focus:outline-none"
          >
            Vault Corridor
          </button>
          <button 
            onClick={() => scrollToSection("collection")}
            className="hover:text-gold-400 transition-colors duration-300 uppercase focus:outline-none"
          >
            Grid Explorer
          </button>
          <button 
            onClick={() => scrollToSection("about")}
            className="hover:text-gold-400 transition-colors duration-300 uppercase focus:outline-none hidden sm:inline-block"
          >
            Sourcing
          </button>
        </nav>
      </header>

      {/* Main Page Sections */}
      <main className="flex-grow">
        
        {/* Section 1: Cinematic Entrance Hero */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-radial from-zinc-50 via-white to-white">
          {/* Ambient lighting spots */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold-100/30 to-transparent rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto flex flex-col items-center z-10 select-none animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <span className="text-[11px] tracking-[0.5em] text-gold-600 font-extrabold uppercase mb-4">
              MONUMENTAL GEOLOGY & ARTISTRY
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-[0.3em] text-zinc-900 uppercase mb-6 leading-tight">
              THE <span className="gold-text-metallic gold-glow">GRANITE</span> VAULT
            </h1>
            <div className="h-[2px] w-36 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-8" />
            <p className="text-zinc-650 text-sm md:text-base leading-relaxed tracking-wide max-w-xl mb-12 font-light">
              Enter a virtual first-person camera showroom of the world&apos;s most exclusive natural stone panels, integrated seamlessly into luxury villa architecture.
            </p>

            {/* Cinematic CTA Button */}
            <button
              onClick={startShowroom}
              className="group relative px-10 py-4 overflow-hidden rounded bg-transparent border border-zinc-350 text-xs tracking-[0.3em] uppercase font-semibold text-zinc-800 transition-all duration-500 hover:border-gold-500 focus:outline-none hover:shadow-[0_0_30px_rgba(214,170,99,0.1)] active:scale-95 cursor-pointer"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500 ease-out group-hover:w-full -z-10" />
              <span className="group-hover:text-black transition-colors duration-500">ENTER THE VAULT</span>
            </button>
          </div>

          {/* Absolute Scroll Down Mouse Icon */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center select-none cursor-pointer" onClick={startShowroom}>
            <span className="text-[9px] tracking-widest text-zinc-400 uppercase mb-2">SCROLL TO WALK</span>
            <div className="w-[18px] h-8 rounded-full border border-zinc-300 flex justify-center p-[4px]">
              <div className="w-[2px] h-[6px] bg-gold-500 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Section 2: Immersive 3D Corridor Sticky Section */}
        <section id="showroom" className="w-full relative bg-[#060608]">
          <CorridorFlythrough onComplete={() => {}} />
        </section>

        {/* Section 3: Granite Explorer Grid (Standard View Grid) */}
        <GraniteGrid />

        {/* Section 4: Brand About / Sourcing details */}
        <section id="about" className="w-full bg-zinc-50 py-24 px-6 md:px-16 border-t border-zinc-100 relative z-20">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="w-full lg:w-1/2 select-none">
              <span className="text-[10px] tracking-[0.4em] text-gold-600 font-bold uppercase mb-2 block">
                GLOBAL ORIGINS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-widest text-zinc-900 uppercase mb-6">
                EXQUISITE SLABS <br />
                DIRECTLY FROM EARTH
              </h2>
              <p className="text-zinc-650 text-xs md:text-sm leading-relaxed tracking-wider mb-6 font-light">
                We select our architectural blocks exclusively from remote Brazilian granite veins, sodalite reserves, and high-altitude quarry layers. Each slab undergoes diamond-wire cutting and polishing, rendering textures of cosmic scale.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-zinc-200 rounded p-4 bg-white shadow-sm">
                  <span className="text-gold-600 text-xs font-bold tracking-widest uppercase block mb-1">BRAZIL</span>
                  <p className="text-zinc-500 text-[10px] tracking-wider">Cosmic Black & Patagonia quartz mines.</p>
                </div>
                <div className="border border-zinc-200 rounded p-4 bg-white shadow-sm">
                  <span className="text-gold-600 text-xs font-bold tracking-widest uppercase block mb-1">BAHIA REGION</span>
                  <p className="text-zinc-500 text-[10px] tracking-wider">Rare royal blue sodalite deposits.</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative h-[350px] rounded-lg overflow-hidden border border-zinc-200 shadow-lg">
              {/* Sourcing background visual */}
              <div className="absolute inset-0 bg-zinc-950/95 z-10 flex flex-col items-center justify-center p-8 text-center text-white">
                <span className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center mb-6 text-gold-400 font-serif text-lg">W</span>
                <h3 className="font-serif text-lg tracking-[0.2em] font-semibold text-white uppercase mb-2">WORLDWIDE DISTRIBUTION</h3>
                <p className="text-zinc-300 text-[11px] leading-relaxed max-w-sm font-light">
                  Shipment coordinates and freight logistics are fully secured from Brazil ports to luxury custom architectural installations globally.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Luxury Footer */}
      <footer className="w-full bg-zinc-100 py-16 px-6 md:px-16 border-t border-zinc-200 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left select-none">
          <div className="flex flex-col">
            <span className="font-serif text-base tracking-[0.35em] text-zinc-900">THE GRANITE VAULT</span>
            <span className="text-[9px] tracking-[0.45em] text-gold-600 uppercase mt-1">CURATED GEOLOGICAL ARCHIVE</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
            <span className="hover:text-gold-600 cursor-pointer transition-colors duration-300">PRIVACY REGULATION</span>
            <span className="hover:text-gold-600 cursor-pointer transition-colors duration-300">TERMS OF ACCREDITATION</span>
            <span className="hover:text-gold-600 cursor-pointer transition-colors duration-300">VAULT SECURITY</span>
          </div>

          <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-light">
            © {new Date().getFullYear()} THE GRANITE VAULT. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

    </div>
  );
}

