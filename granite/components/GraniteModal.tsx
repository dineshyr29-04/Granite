"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SlabSpecs {
  mohs: string;
  density: string;
  compressive: string;
  absorption: string;
  recommended: string[];
}

interface SlabData {
  id: string;
  name: string;
  description: string;
  source: string;
  image: string;
  features: string[];
  color: string;
  tone: "dark" | "light" | "colored";
  texture: "veined" | "crystalline";
  category: "BLACK" | "WHITE" | "GREY" | "BROWN" | "EXOTIC";
  finish: string;
  specs: SlabSpecs;
}

interface GraniteModalProps {
  slab: SlabData | null;
  onClose: () => void;
}

export default function GraniteModal({ slab, onClose }: GraniteModalProps) {
  const [visualizeActive, setVisualizeActive] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (slab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [slab]);

  if (!slab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Dark backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl rounded-lg overflow-hidden border border-gold-500/20 bg-[#0b0b0f] shadow-2xl flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300"
        style={{
          boxShadow: `0 0 45px rgba(214, 170, 99, 0.1)`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-zinc-400 hover:text-gold-400 rounded-full border border-zinc-800 hover:border-gold-500/30 bg-zinc-950/80 transition-all duration-300 focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Slab image or Visualizer Kitchen layout */}
        <div className="relative w-full md:w-1/2 h-[320px] md:h-[600px] bg-zinc-950 flex-shrink-0 overflow-hidden">
          {/* Image Container with cross-fade */}
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: visualizeActive ? 0 : 1 }}>
            <Image
              src={slab.image}
              alt={`${slab.name} raw slab`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: visualizeActive ? 1 : 0 }}>
            {/* Visualized space rendering: Luxury Granite Kitchen Island */}
            <Image
              src="/kitchen.png"
              alt="Granite kitchen visualization"
              fill
              priority={visualizeActive}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter contrast-[1.02] brightness-95"
            />
            {/* Highlighted text overlay explaining visualization */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gold-600/90 border border-gold-400/40 text-[9px] font-semibold text-black tracking-[0.2em] rounded uppercase">
              Real Space Rendering
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/50 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
          
          {/* Stone Category & Sourcing Badges */}
          <div className="absolute bottom-6 left-6 z-20 flex gap-2">
            <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-semibold text-gold-300 bg-zinc-950/90 border border-gold-500/30 rounded uppercase shadow-lg">
              {slab.finish} Finish
            </span>
            <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-semibold text-white bg-zinc-950/90 border border-zinc-800 rounded uppercase shadow-lg">
              {slab.source.replace("Sourced: ", "")}
            </span>
          </div>
        </div>

        {/* Right Side: Technical Specs & Visualizer Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[600px] bg-[#0b0b0f] text-white">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-gold-400 font-bold uppercase block mb-1">
              {slab.category} Collection
            </span>
            <h2 className="font-serif text-3xl font-normal tracking-widest text-white uppercase mb-2">
              {slab.name}
            </h2>
            
            <div className="h-[1px] w-16 bg-gold-400/40 my-4" />
            
            <p className="text-zinc-350 text-xs leading-relaxed mb-6 font-light">
              {slab.description}
            </p>

            {/* Technical Specs */}
            <h3 className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase mb-3 border-b border-zinc-900 pb-2">
              STRUCTURAL METRICS
            </h3>
            <div className="space-y-2.5 mb-6 text-xs font-light">
              <div className="flex justify-between py-1 border-b border-zinc-900/40">
                <span className="text-zinc-400">Hardness (Mohs Scale)</span>
                <span className="text-gold-200">{slab.specs.mohs}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900/40">
                <span className="text-zinc-400">Density</span>
                <span className="text-gold-200">{slab.specs.density}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900/40">
                <span className="text-zinc-400">Compressive Strength</span>
                <span className="text-gold-200">{slab.specs.compressive}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900/40">
                <span className="text-zinc-400">Water Absorption</span>
                <span className="text-gold-200">{slab.specs.absorption}</span>
              </div>
            </div>

            {/* Recommended Applications */}
            <h3 className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase mb-3 border-b border-zinc-900 pb-2">
              BEST APPLICATIONS
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {slab.specs.recommended.map((app, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-[9px] tracking-wider text-zinc-300 border border-zinc-800 bg-zinc-900/30 rounded uppercase font-light"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 pt-5 border-t border-zinc-900">
            {/* Visualizer Toggle Button */}
            <button
              onClick={() => setVisualizeActive(!visualizeActive)}
              className={`w-full py-3 px-6 text-center text-xs tracking-widest font-semibold uppercase rounded transition-all duration-300 border cursor-pointer active:scale-[0.98] ${
                visualizeActive
                  ? "bg-zinc-900 border-gold-500/50 text-gold-400 shadow-lg"
                  : "bg-transparent border-zinc-700 text-zinc-200 hover:border-gold-400 hover:text-white"
              }`}
            >
              {visualizeActive ? "← VIEW RAW STONE SLAB" : "✦ VISUALIZE IN YOUR SPACE"}
            </button>
            
            <button
              onClick={() => alert(`Vault inquiry logged for ${slab.name}. A luxury showroom consultant will call you.`)}
              className="w-full py-3 px-6 text-center text-xs tracking-widest font-semibold uppercase text-black bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-400 hover:to-gold-200 transition-all duration-300 rounded shadow-md cursor-pointer active:scale-[0.98]"
            >
              REQUEST VAULT CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
