"use client";

import React, { useEffect } from "react";
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
  specs: SlabSpecs;
}

interface GraniteModalProps {
  slab: SlabData | null;
  onClose: () => void;
}

export default function GraniteModal({ slab, onClose }: GraniteModalProps) {
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
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl rounded-lg overflow-hidden border border-gold-500/30 glass-panel shadow-2xl flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300"
        style={{
          boxShadow: `0 0 50px rgba(214, 170, 99, 0.15)`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-zinc-400 hover:text-gold-400 rounded-full border border-zinc-800 hover:border-gold-500/40 bg-zinc-950/80 transition-all duration-300 focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Slab image showcase */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[600px] bg-zinc-950 flex-shrink-0">
          <Image
            src={slab.image}
            alt={slab.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/50 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
          
          {/* Stone Texture Badge */}
          <div className="absolute bottom-6 left-6 z-20 flex gap-2">
            <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-semibold text-gold-300 bg-zinc-950/90 border border-gold-500/30 rounded uppercase shadow-lg">
              {slab.texture}
            </span>
            <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-semibold text-white bg-zinc-950/90 border border-zinc-800 rounded uppercase shadow-lg">
              {slab.source.replace("Sourced: ", "")}
            </span>
          </div>
        </div>

        {/* Right Side: Technical Specs & Information */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[600px] bg-[#0b0b0f]">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-gold-400 font-bold uppercase block mb-1">
              THE GRANITE VAULT COLLECTION
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-widest text-white uppercase mb-2">
              {slab.name}
            </h2>
            
            <div className="h-[1px] w-16 bg-gold-400/50 my-4" />
            
            <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light">
              {slab.description}
            </p>

            {/* Technical Specifications Table */}
            <h3 className="text-xs tracking-[0.2em] font-bold text-white uppercase mb-3 border-b border-zinc-800 pb-2">
              TECHNICAL SPECIFICATIONS
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Hardness (Mohs Scale)</span>
                <span className="text-gold-200 font-medium">{slab.specs.mohs}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Density</span>
                <span className="text-gold-200 font-medium">{slab.specs.density}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Compressive Strength</span>
                <span className="text-gold-200 font-medium">{slab.specs.compressive}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Water Absorption</span>
                <span className="text-gold-200 font-medium">{slab.specs.absorption}</span>
              </div>
            </div>

            {/* Recommended Applications */}
            <h3 className="text-xs tracking-[0.2em] font-bold text-white uppercase mb-3 border-b border-zinc-800 pb-2">
              RECOMMENDED APPLICATIONS
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {slab.specs.recommended.map((app, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-[10px] tracking-wider text-zinc-300 border border-zinc-800 bg-zinc-900/40 rounded uppercase"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-900">
            <button
              onClick={() => alert("Vault inquiry request received. A showroom consultant will contact you.")}
              className="flex-1 py-3 px-6 text-center text-xs tracking-widest font-semibold uppercase text-black bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-400 hover:to-gold-200 transition-all duration-300 rounded shadow-md hover:shadow-gold-500/20 active:scale-[0.98]"
            >
              INQUIRE FOR SLAB ACCESS
            </button>
            <button
              onClick={onClose}
              className="py-3 px-6 text-center text-xs tracking-widest font-semibold uppercase text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950 transition-all duration-300 rounded active:scale-[0.98]"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
