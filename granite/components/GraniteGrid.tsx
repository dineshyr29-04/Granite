"use client";

import React, { useState } from "react";
import Image from "next/image";
import GraniteModal from "./GraniteModal";

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

const GRANITE_DATA: SlabData[] = [
  {
    id: "cosmic-black",
    name: "COSMIC BLACK",
    description: "Flowing golden veins of quartz set against a deep obsidian night sky, offering unparalleled luxury.",
    source: "Sourced: Brazil",
    image: "/cosmic_black.png",
    features: ["High Polish", "Scratch Resistant", "Acid Proof"],
    color: "rgba(214, 170, 99, 0.8)",
    tone: "dark",
    texture: "veined",
    specs: {
      mohs: "6.5",
      density: "2,680 kg/m³",
      compressive: "22,500 psi",
      absorption: "0.15%",
      recommended: ["Kitchen Countertops", "Flooring", "Accent Walls", "Fireplace Surrounds"],
    },
  },
  {
    id: "patagonia",
    name: "PATAGONIA",
    description: "A dramatic tapestry of translucent quartz crystals, smoky obsidian, and golden feldspar fragments.",
    source: "Sourced: Brazil",
    image: "/patagonia.png",
    features: ["Backlit Capable", "Quartz Blend", "Extremely Rare"],
    color: "rgba(226, 195, 130, 0.8)",
    tone: "light",
    texture: "crystalline",
    specs: {
      mohs: "7.0",
      density: "2,620 kg/m³",
      compressive: "19,800 psi",
      absorption: "0.22%",
      recommended: ["Backlit Panels", "Luxury Bar Tops", "Feature Walls", "Architectural Columns"],
    },
  },
  {
    id: "blue-bahia",
    name: "BLUE BAHIA",
    description: "A rare sodalite masterpiece featuring vibrant royal blue tones accented by delicate white and gold waves.",
    source: "Sourced: Brazil",
    image: "/blue_bahia.png",
    features: ["Exotic Sodalite", "Ultra Premium", "Vibrant Polish"],
    color: "rgba(59, 130, 246, 0.8)",
    tone: "colored",
    texture: "veined",
    specs: {
      mohs: "6.0",
      density: "2,580 kg/m³",
      compressive: "18,200 psi",
      absorption: "0.28%",
      recommended: ["Luxury Bathrooms", "Feature Walls", "Bespoke Furniture", "Vanity Tops"],
    },
  },
  {
    id: "alaska-white",
    name: "ALASKA WHITE",
    description: "A frosty glacier pattern blending cool silver and warm pewter veining with dark biotite crystals.",
    source: "Sourced: Brazil",
    image: "/alaska_white.png",
    features: ["Bright Aesthetic", "Versatile Design", "Frost Texture"],
    color: "rgba(200, 200, 200, 0.8)",
    tone: "light",
    texture: "crystalline",
    specs: {
      mohs: "6.5",
      density: "2,650 kg/m³",
      compressive: "21,000 psi",
      absorption: "0.18%",
      recommended: ["Kitchen Countertops", "Outdoor Kitchens", "High-Traffic Flooring", "Accent Walls"],
    },
  },
];

export default function GraniteGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTone, setSelectedTone] = useState<"all" | "dark" | "light" | "colored">("all");
  const [selectedTexture, setSelectedTexture] = useState<"all" | "veined" | "crystalline">("all");
  const [activeSlabModal, setActiveSlabModal] = useState<SlabData | null>(null);

  // Filter items
  const filteredGranites = GRANITE_DATA.filter((slab) => {
    const matchesSearch =
      slab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slab.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slab.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTone = selectedTone === "all" || slab.tone === selectedTone;
    const matchesTexture = selectedTexture === "all" || slab.texture === selectedTexture;

    return matchesSearch && matchesTone && matchesTexture;
  });

  return (
    <section id="collection" className="w-full bg-white py-24 px-6 md:px-16 border-t border-zinc-100 relative z-20">
      
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="text-[10px] tracking-[0.4em] text-gold-500 font-bold uppercase mb-2">
            SELECTIVE ARCHIVE
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-widest text-zinc-900 uppercase mb-4">
            THE GRANITE COLLECTION
          </h2>
          <div className="h-[1.5px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-6" />
          <p className="text-zinc-500 text-xs md:text-sm tracking-wider max-w-xl leading-relaxed font-light">
            Browse our complete inventory in standard grid preview. Click on any classification panel to inspect structural metrics and sourcing logs.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-zinc-50 rounded-lg p-6 mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between shadow-sm border border-zinc-200/60">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <span className="absolute inset-y-0 left-4 flex items-center text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by classification or origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded py-3 pl-12 pr-4 text-xs tracking-wider text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-gold-500/50 transition-all duration-300 font-medium"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 items-center w-full lg:w-auto">
            
            {/* Tone Filter */}
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase mr-2">Tone:</span>
              <div className="flex bg-white p-1 border border-zinc-200/80 rounded">
                {(["all", "dark", "light", "colored"] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-3 py-1.5 rounded text-[10px] tracking-wider font-semibold uppercase transition-all duration-300 ${
                      selectedTone === tone
                        ? "text-black bg-gold-400 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Texture Filter */}
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase mr-2">Texture:</span>
              <div className="flex bg-white p-1 border border-zinc-200/80 rounded">
                {(["all", "veined", "crystalline"] as const).map((texture) => (
                  <button
                    key={texture}
                    onClick={() => setSelectedTexture(texture)}
                    className={`px-3 py-1.5 rounded text-[10px] tracking-wider font-semibold uppercase transition-all duration-300 ${
                      selectedTexture === texture
                        ? "text-black bg-gold-400 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {texture}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Slabs Grid */}
        {filteredGranites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredGranites.map((slab) => (
              <div
                key={slab.id}
                onClick={() => setActiveSlabModal(slab)}
                className="group cursor-pointer rounded-lg overflow-hidden border border-zinc-200/80 bg-white transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-sm hover:shadow-md"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Slab Card Image Container */}
                <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden border-b border-zinc-200">
                  <Image
                    src={slab.image}
                    alt={slab.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Subtle hover detail indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 text-[10px] tracking-[0.3em] font-bold text-black bg-gradient-to-r from-gold-500 to-gold-300 rounded uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      INSPECT SPECIFICATIONS
                    </span>
                  </div>
                </div>

                {/* Card Text Info */}
                <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] tracking-[0.25em] text-gold-600 font-bold uppercase">
                        {slab.source}
                      </span>
                      <span className="text-[9px] tracking-widest text-zinc-400 uppercase">
                        {slab.texture}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-widest text-zinc-800 group-hover:text-gold-600 transition-colors duration-300 mb-2">
                      {slab.name}
                    </h3>
                    <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2 font-light">
                      {slab.description}
                    </p>
                  </div>

                  {/* Technical Summary List */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between text-[10px] tracking-wider text-zinc-400 uppercase">
                    <span>MOHS: {slab.specs.mohs}</span>
                    <span>DENSITY: {slab.specs.density.split(" ")[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-200 rounded-lg">
            <span className="text-zinc-400 text-xs tracking-widest uppercase">
              No classifications match your criteria.
            </span>
          </div>
        )}

      </div>

      {/* Specifications Modal Overlay */}
      <GraniteModal
        slab={activeSlabModal}
        onClose={() => setActiveSlabModal(null)}
      />
    </section>
  );
}
