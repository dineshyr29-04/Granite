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
  category: "BLACK" | "WHITE" | "GREY" | "BROWN" | "EXOTIC";
  finish: string;
  specs: SlabSpecs;
}

const GRANITE_DATA: SlabData[] = [
  {
    id: "cosmic-black",
    name: "COSMIC BLACK",
    description: "Deep black stone with flowing golden veins of quartz, offering unparalleled luxury.",
    source: "Brazil",
    image: "/cosmic_black.png",
    features: ["High Polish", "Scratch Resistant", "Acid Proof"],
    color: "rgba(214, 170, 99, 0.8)",
    tone: "dark",
    texture: "veined",
    category: "BLACK",
    finish: "Polished",
    specs: {
      mohs: "6.5",
      density: "2,680 kg/m³",
      compressive: "22,500 psi",
      absorption: "0.15%",
      recommended: ["Kitchen Countertops", "Flooring", "Accent Walls", "Fireplace Surrounds"],
    },
  },
  {
    id: "alaska-white",
    name: "ALASKA WHITE",
    description: "Elegant white granite with natural pewter veining and dark biotite crystals.",
    source: "India",
    image: "/alaska_white.png",
    features: ["Bright Aesthetic", "Versatile Design", "Frost Texture"],
    color: "rgba(200, 200, 200, 0.8)",
    tone: "light",
    texture: "crystalline",
    category: "WHITE",
    finish: "Polished",
    specs: {
      mohs: "6.5",
      density: "2,650 kg/m³",
      compressive: "21,000 psi",
      absorption: "0.18%",
      recommended: ["Kitchen Countertops", "Outdoor Kitchens", "High-Traffic Flooring", "Accent Walls"],
    },
  },
  {
    id: "titanium-grey",
    name: "TITANIUM GREY",
    description: "Modern grey texture with natural swirls of quartz and dark charcoal for contemporary interiors.",
    source: "India",
    image: "/titanium_grey.png",
    features: ["Quartz Blend", "Extremely Durable", "Contemporary Polish"],
    color: "rgba(120, 120, 120, 0.8)",
    tone: "dark",
    texture: "veined",
    category: "GREY",
    finish: "Honed",
    specs: {
      mohs: "6.5",
      density: "2,660 kg/m³",
      compressive: "21,800 psi",
      absorption: "0.16%",
      recommended: ["Modern Fireplaces", "Lobby Cladding", "Living Area Flooring"],
    },
  },
  {
    id: "coffee-brown",
    name: "COFFEE BROWN",
    description: "Rich dark brown base with black aggregates and speckles of copper and tan minerals.",
    source: "India",
    image: "/coffee_brown.png",
    features: ["Warm Aesthetic", "Heavy Traffic Durable", "Low Porosity"],
    color: "rgba(139, 90, 43, 0.8)",
    tone: "dark",
    texture: "crystalline",
    category: "BROWN",
    finish: "Leathered",
    specs: {
      mohs: "6.0",
      density: "2,630 kg/m³",
      compressive: "20,500 psi",
      absorption: "0.20%",
      recommended: ["Kitchen Countertops", "High-Traffic Corridors", "Luxury Bar Counters"],
    },
  },
  {
    id: "emerald-pearl",
    name: "EMERALD PEARL",
    description: "Deep dark green-black base with shimmering, reflective emerald green crystalline feldspar clusters.",
    source: "Norway",
    image: "/emerald_pearl.png",
    features: ["High Gloss", "Shimmering Crystals", "Feldspar Blend"],
    color: "rgba(16, 185, 129, 0.8)",
    tone: "dark",
    texture: "crystalline",
    category: "EXOTIC",
    finish: "High-Gloss Polished",
    specs: {
      mohs: "6.5",
      density: "2,700 kg/m³",
      compressive: "23,000 psi",
      absorption: "0.11%",
      recommended: ["Bespoke Furniture", "Luxury Bathroom Vanities", "Accent Wall Cladding"],
    },
  },
  {
    id: "blue-bahia",
    name: "BLUE BAHIA",
    description: "Rare exotic sodalite masterpiece featuring vibrant royal blue tones accented by delicate white and gold waves.",
    source: "Brazil",
    image: "/blue_bahia.png",
    features: ["Exotic Sodalite", "Ultra Premium", "Vibrant Polish"],
    color: "rgba(59, 130, 246, 0.8)",
    tone: "colored",
    texture: "veined",
    category: "EXOTIC",
    finish: "Polished",
    specs: {
      mohs: "6.0",
      density: "2,580 kg/m³",
      compressive: "18,200 psi",
      absorption: "0.28%",
      recommended: ["Backlit Accent Panels", "Luxury Fireplace Surrounds", "Powder Room Counters"],
    },
  },
];

type CategoryFilter = "ALL" | "BLACK" | "WHITE" | "GREY" | "BROWN" | "EXOTIC";

export default function GraniteGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [activeSlabModal, setActiveSlabModal] = useState<SlabData | null>(null);

  // Filter items
  const filteredGranites = GRANITE_DATA.filter((slab) => {
    const matchesSearch =
      slab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slab.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slab.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "ALL" || slab.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="collection" className="w-full bg-white py-24 px-6 md:px-16 border-t border-zinc-100 relative z-20">
      
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="text-[10px] tracking-[0.4em] text-gold-500 font-extrabold uppercase mb-2">
            OUR COLLECTION
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-widest text-zinc-900 uppercase mb-4">
            Explore Our Premium Granites
          </h2>
          <div className="h-[1.5px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-6" />
          <p className="text-zinc-500 text-xs md:text-sm tracking-wider max-w-xl leading-relaxed font-light">
            Browse our complete inventory in standard grid preview. Click on any classification panel to inspect structural metrics, finishes, and applications.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-zinc-50 rounded-lg p-6 mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between shadow-sm border border-zinc-200/60">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <span className="absolute inset-y-0 left-4 flex items-center text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search our catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded py-3 pl-12 pr-4 text-xs tracking-wider text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-gold-500/50 transition-all duration-300 font-medium"
            />
          </div>

          {/* Categories Tab Filters */}
          <div className="flex flex-wrap gap-2 items-center justify-start lg:justify-end w-full lg:w-auto">
            {(["ALL", "BLACK", "WHITE", "GREY", "BROWN", "EXOTIC"] as CategoryFilter[]).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded text-[10px] tracking-widest font-semibold uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "text-black bg-gold-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Slabs Grid */}
        {filteredGranites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredGranites.map((slab) => (
              <div
                key={slab.id}
                onClick={() => setActiveSlabModal(slab)}
                className="group cursor-pointer rounded-lg overflow-hidden border border-zinc-200/80 bg-white transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-sm hover:shadow-md"
                style={{
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
                }}
              >
                {/* Slab Card Image Container */}
                <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden border-b border-zinc-200">
                  <Image
                    src={slab.image}
                    alt={slab.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                  />
                  {/* Sheen Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-10 pointer-events-none transform translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000" />
                  
                  {/* Subtle hover detail indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 text-[9px] tracking-[0.3em] font-bold text-black bg-gradient-to-r from-gold-500 to-gold-300 rounded uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details →
                    </span>
                  </div>
                </div>

                {/* Card Text Info */}
                <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] tracking-[0.25em] text-gold-600 font-bold uppercase">
                        {slab.source}
                      </span>
                      <span className="text-[9px] tracking-widest text-zinc-400 uppercase font-light">
                        {slab.finish}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold tracking-widest text-zinc-800 group-hover:text-gold-600 transition-colors duration-300 mb-2 uppercase">
                      {slab.name}
                    </h3>
                    <p className="text-zinc-500 text-[10px] leading-relaxed line-clamp-2 font-light">
                      {slab.description}
                    </p>
                  </div>

                  {/* Card bottom specifications summary */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-between text-[9px] tracking-wider text-zinc-400 uppercase font-light">
                    <span>APP: {slab.specs.recommended[0].split(" ")[0]}</span>
                    <span>MOHS: {slab.specs.mohs}</span>
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
        key={activeSlabModal?.id || "modal"}
        slab={activeSlabModal}
        onClose={() => setActiveSlabModal(null)}
      />
    </section>
  );
}
