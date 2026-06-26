"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Granite {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  finish: string;
  thickness: string;
  application: string[];
  features: string[];
  image: string;
  featured?: boolean;
}

const GRANITES: Granite[] = [
  {
    id: "cosmic-black",
    name: "Cosmic Black",
    category: "Black",
    origin: "Brazil",
    description: "Intense deep-black stone with luminous golden veins of quartz and feldspar. Book-matched for a mirror-perfect symmetrical finish. The pinnacle of dramatic luxury design.",
    finish: "High Polish",
    thickness: "18mm / 20mm",
    application: ["Feature Walls", "Countertops", "Flooring", "Staircase"],
    features: ["Book-Matched", "Acid Proof", "Scratch Resistant", "High Density"],
    image: "/cosmic_black.png",
    featured: true,
  },
  {
    id: "alaska-white",
    name: "Alaska White",
    category: "White",
    origin: "India",
    description: "Frosty arctic-white granite with intricate pewter veining and dark biotite crystal clusters. Bright, versatile, and timelessly elegant in any space.",
    finish: "High Polish / Leathered",
    thickness: "18mm / 20mm",
    application: ["Countertops", "Backsplash", "Bathrooms", "Reception Desks"],
    features: ["Stain Resistant", "Heat Proof", "Food Safe", "Versatile"],
    image: "/alaska_white.png",
  },
  {
    id: "titanium-grey",
    name: "Titanium Grey",
    category: "Grey",
    origin: "India",
    description: "A sophisticated contemporary grey with natural swirls of white quartz and dark charcoal mineral patterns. Engineered for high-traffic and high-moisture environments.",
    finish: "Flamed / Polished",
    thickness: "18mm",
    application: ["Spa Bathrooms", "Outdoor Paving", "Commercial Floors", "Facades"],
    features: ["Anti-Slip", "Waterproof", "Frost Resistant", "Low Maintenance"],
    image: "/titanium_grey.png",
  },
  {
    id: "patagonia",
    name: "Patagonia",
    category: "Exotic",
    origin: "Brazil",
    description: "A geological masterpiece — translucent cream quartz combined with dark obsidian patches and golden feldspar fragments. Unique like a fingerprint, striking like art.",
    finish: "High Polish",
    thickness: "20mm / 25mm",
    application: ["Headboard Walls", "Luxury Countertops", "Art Installations", "Hotel Lobbies"],
    features: ["Translucent Quartz", "Book-Matched", "Ultra-Rare", "Collector's Grade"],
    image: "/patagonia.png",
    featured: true,
  },
  {
    id: "blue-bahia",
    name: "Blue Bahia",
    category: "Exotic",
    origin: "Brazil",
    description: "A rare sodalite mineral with deep royal blue that shifts to violet in different light. Interlaced with white quartz and golden feldspar veins. Exceptionally rare.",
    finish: "High Polish",
    thickness: "20mm",
    application: ["Decorative Walls", "Luxury Furniture", "Art Pieces", "Custom Counters"],
    features: ["Sodalite Mineral", "Color-Shifting", "Ultra-Rare", "Heirloom Grade"],
    image: "/blue_bahia.png",
  },
  {
    id: "coffee-brown",
    name: "Coffee Brown",
    category: "Brown",
    origin: "India",
    description: "Warm espresso-brown granite with soft cream swirls and golden mineral sparkle. Radiates warmth and earthiness — perfect for cozy, organic luxury interiors.",
    finish: "High Polish / Leathered",
    thickness: "18mm / 20mm",
    application: ["Kitchen Counters", "Dining Surfaces", "Library Walls", "Bar Tops"],
    features: ["Warm Tones", "Scratch Resistant", "High Polish", "Eco-Quarried"],
    image: "/coffee_brown.png",
  },
  {
    id: "emerald-pearl",
    name: "Emerald Pearl",
    category: "Exotic",
    origin: "Norway",
    description: "Norwegian Labradorite granite with iridescent pearl and emerald-green mineral deposits. The stone displays a shifting labradorescence — a living, breathing surface.",
    finish: "High Polish",
    thickness: "18mm / 20mm",
    application: ["Accent Walls", "Bar Counters", "Luxury Reception", "Spa Floors"],
    features: ["Labradorescence", "Iridescent", "Norwegian Heritage", "Premium Grade"],
    image: "/emerald_pearl.png",
  },
];

const CATEGORIES = ["All", "Black", "White", "Grey", "Brown", "Exotic"];

interface Props {
  highlightId?: string | null;
}

export default function GraniteGrid({ highlightId }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedGranite, setSelectedGranite] = useState<Granite | null>(null);

  const filtered = activeCategory === "All"
    ? GRANITES
    : GRANITES.filter((g) => g.category === activeCategory);

  return (
    <section id="collection" className="w-full bg-stone-50 py-24 px-6 md:px-16 relative z-20 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
          <div>
            <span className="section-label mb-3 block">Our Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 leading-tight">
              Curated Granite<br />
              <em className="font-light not-italic text-stone-500">Selection</em>
            </h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs font-light">
            Every slab individually inspected. Sourced from verified quarries across Brazil, India, and Norway.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 reveal reveal-delay-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium cursor-pointer transition-all duration-300 border"
              style={{
                background: activeCategory === cat ? "var(--color-gold-600)" : "#fff",
                color: activeCategory === cat ? "#fff" : "#7e7265",
                borderColor: activeCategory === cat ? "var(--color-gold-600)" : "#e4ddd2",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((granite, idx) => (
            <div
              key={granite.id}
              className={`granite-tile reveal reveal-delay-${Math.min(idx % 4 + 1, 4)} ${
                granite.id === highlightId ? "ring-2 ring-gold-400" : ""
              }`}
              onClick={() => setSelectedGranite(granite)}
            >
              {/* Slab image */}
              <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
                <Image
                  src={granite.image}
                  alt={granite.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                {granite.featured && (
                  <div className="absolute top-3 left-3 bg-gold-600 text-white text-[8px] tracking-[0.2em] uppercase font-medium px-2.5 py-1">
                    Featured
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 text-stone-600 text-[8px] tracking-[0.15em] uppercase font-medium px-2.5 py-1">
                  {granite.category}
                </div>
              </div>

              {/* Info */}
              <div className="bg-white p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-light text-zinc-900 leading-tight">
                      {granite.name}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium mt-0.5">
                      {granite.origin}
                    </p>
                  </div>
                  <span className="text-[9px] tracking-wider text-stone-400 border border-stone-200 px-2 py-1 mt-0.5 font-medium uppercase whitespace-nowrap">
                    {granite.finish}
                  </span>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed font-light mb-4 line-clamp-2">
                  {granite.description}
                </p>

                {/* Application tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {granite.application.slice(0, 2).map((app) => (
                    <span key={app} className="text-[8px] tracking-wider uppercase font-medium text-stone-500 border border-stone-200 px-2 py-0.5">
                      {app}
                    </span>
                  ))}
                  {granite.application.length > 2 && (
                    <span className="text-[8px] tracking-wider uppercase font-medium text-stone-400">
                      +{granite.application.length - 2} more
                    </span>
                  )}
                </div>

                <button className="w-full py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium text-gold-700 border border-gold-300 hover:bg-gold-600 hover:text-white hover:border-gold-600 transition-all duration-300 cursor-pointer">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-14 reveal">
          <div className="text-center">
            <p className="text-stone-400 text-xs font-light mb-4">
              Looking for something specific? We source custom slabs on request.
            </p>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request Custom Slab
            </button>
          </div>
        </div>
      </div>

      {/* === DETAIL MODAL === */}
      {selectedGranite && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedGranite(null);
          }}
        >
          <div className="modal-content">
            <div className="flex flex-col md:flex-row">
              {/* Image side */}
              <div className="relative md:w-[45%] flex-shrink-0" style={{ minHeight: "320px" }}>
                <Image
                  src={selectedGranite.image}
                  alt={selectedGranite.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {selectedGranite.featured && (
                  <div className="absolute top-4 left-4 bg-gold-600 text-white text-[8px] tracking-[0.2em] uppercase font-medium px-3 py-1.5">
                    Featured Collection
                  </div>
                )}
              </div>

              {/* Info side */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <span className="section-label">{selectedGranite.category} Granite</span>
                  <button
                    onClick={() => setSelectedGranite(null)}
                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors border border-stone-200 hover:border-stone-400 cursor-pointer text-lg"
                  >
                    ×
                  </button>
                </div>

                <h2 className="font-serif text-4xl font-light text-zinc-900 mb-1">
                  {selectedGranite.name}
                </h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-5">
                  Sourced from {selectedGranite.origin}
                </p>

                <div className="divider-gold mb-5" />

                <p className="text-stone-600 text-sm leading-relaxed font-light mb-6">
                  {selectedGranite.description}
                </p>

                {/* Spec grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1">Finish</span>
                    <span className="text-sm text-zinc-800 font-light">{selectedGranite.finish}</span>
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1">Thickness</span>
                    <span className="text-sm text-zinc-800 font-light">{selectedGranite.thickness}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-2">Applications</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGranite.application.map((a) => (
                        <span key={a} className="feature-badge">✦ {a}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-stone-50 p-4 mb-6 border border-stone-200">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-3">Key Properties</span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGranite.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
                        <span className="text-xs text-stone-600 font-light">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    className="btn-primary flex-1 justify-center"
                    onClick={() => {
                      setSelectedGranite(null);
                      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
                    }}
                  >
                    Request Sample
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      setSelectedGranite(null);
                      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
                    }}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
