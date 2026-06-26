"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface RoomScene {
  id: string;
  name: string;
  subtitle: string;
  granite: string;
  graniteDesc: string;
  origin: string;
  features: string[];
  roomImage: string;
  slabImage: string;
  accentColor: string;
  textColor: string;
}

const ROOMS: RoomScene[] = [
  {
    id: "living",
    name: "The Living Room",
    subtitle: "Feature Wall",
    granite: "Cosmic Black",
    graniteDesc: "Intense black stone with flowing 24-karat gold veins sourced from the quarries of Espirito Santo, Brazil. Book-matched for a mirror-perfect symmetry.",
    origin: "Brazil",
    features: ["Book-Matched", "High Polish", "Scratch Resistant"],
    roomImage: "/room_living.png",
    slabImage: "/cosmic_black.png",
    accentColor: "rgba(214, 170, 99, 0.9)",
    textColor: "#fff",
  },
  {
    id: "kitchen",
    name: "The Kitchen",
    subtitle: "Countertop & Backsplash",
    granite: "Alaska White",
    graniteDesc: "Frosty white granite with complex pewter veining and dark biotite crystal clusters. Refined, cool, and effortlessly timeless for culinary spaces.",
    origin: "India",
    features: ["Stain Resistant", "Heat Proof", "Food Safe"],
    roomImage: "/room_kitchen.png",
    slabImage: "/alaska_white.png",
    accentColor: "rgba(180, 195, 210, 0.9)",
    textColor: "#fff",
  },
  {
    id: "bathroom",
    name: "The Spa Bathroom",
    subtitle: "Floor & Wall Cladding",
    granite: "Titanium Grey",
    graniteDesc: "Contemporary charcoal grey granite with natural quartz swirls and subtle crystalline sparkle. Engineered for high-moisture environments.",
    origin: "India",
    features: ["Anti-Slip", "Waterproof", "Low Maintenance"],
    roomImage: "/room_bathroom.png",
    slabImage: "/titanium_grey.png",
    accentColor: "rgba(160, 170, 185, 0.9)",
    textColor: "#fff",
  },
  {
    id: "bedroom",
    name: "The Master Bedroom",
    subtitle: "Headboard Feature Wall",
    granite: "Patagonia",
    graniteDesc: "Dramatic translucent cream quartz with dark obsidian patches and golden feldspar. A geological masterpiece that transforms any bedroom into a sanctuary.",
    origin: "Brazil",
    features: ["Translucent Quartz", "Book-Matched", "Premium Finish"],
    roomImage: "/room_bedroom.png",
    slabImage: "/patagonia.png",
    accentColor: "rgba(220, 195, 155, 0.9)",
    textColor: "#fff",
  },
];

interface Props {
  onGraniteClick?: (granite: string) => void;
}

export default function HouseWalkthrough({ onGraniteClick }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayRoom, setDisplayRoom] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Each room gets ~25% of the scroll range
  const ROOMS_COUNT = ROOMS.length;

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Total scrollable height = section height - viewport height
      const scrollHeight = rect.height - window.innerHeight;
      const relativeScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, relativeScroll / scrollHeight));
      setScrollProgress(progress);

      // Determine which room to show based on progress
      const roomIndex = Math.min(
        ROOMS_COUNT - 1,
        Math.floor(progress * ROOMS_COUNT)
      );

      if (roomIndex !== activeRoom) {
        setIsTransitioning(true);
        setTimeout(() => {
          setDisplayRoom(roomIndex);
          setIsTransitioning(false);
        }, 200);
        setActiveRoom(roomIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeRoom, ROOMS_COUNT]);

  const goToRoom = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionScrollHeight = section.offsetHeight - window.innerHeight;
    const targetProgress = index / ROOMS_COUNT + 0.01;
    const targetScroll = sectionTop + targetProgress * sectionScrollHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, [ROOMS_COUNT]);

  const room = ROOMS[displayRoom];
  const roomProgress = (scrollProgress * ROOMS_COUNT) % 1;

  return (
    // 500vh gives ~125vh per room, enough dwell time
    <div ref={sectionRef} className="relative w-full" style={{ height: "520vh" }}>
      {/* Sticky viewport */}
      <div className="walkthrough-sticky">
        {/* === ROOM IMAGE LAYER === */}
        {ROOMS.map((r, i) => (
          <div
            key={r.id}
            className="room-scene"
            style={{
              opacity: i === displayRoom && !isTransitioning ? 1 : 0,
              transform: `scale(${i === displayRoom && !isTransitioning ? 1 : 1.03})`,
              position: "absolute",
              inset: 0,
            }}
          >
            <Image
              src={r.roomImage}
              alt={r.name}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Gradient overlay — left side for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* === ROOM INFO PANEL (left) === */}
        <div
          className="absolute inset-0 z-20 flex items-center px-8 md:px-16 lg:px-24"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: `translateY(${isTransitioning ? "16px" : "0"})`,
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <div className="w-full max-w-lg">
            {/* Room badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[1px] bg-gold-400" />
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold-300">
                {displayRoom + 1} / {ROOMS_COUNT} — {room.subtitle}
              </span>
            </div>

            {/* Room Name */}
            <h2
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {room.name}
            </h2>

            {/* Granite Name */}
            <div className="flex items-center gap-4 mb-4">
              <span
                className="font-serif text-xl md:text-2xl italic"
                style={{ color: room.accentColor }}
              >
                {room.granite}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent max-w-[80px]" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-medium">
                {room.origin}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed font-light max-w-md mb-6">
              {room.graniteDesc}
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {room.features.map((f) => (
                <span
                  key={f}
                  className="text-[9px] tracking-[0.15em] uppercase font-medium px-3 py-1.5 border border-white/20 text-white/60 bg-white/5 backdrop-blur-sm"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                className="btn-primary text-[11px]"
                onClick={() => onGraniteClick?.(room.granite)}
              >
                View Slab →
              </button>
              <button
                className="btn-ghost text-[11px]"
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Request Sample
              </button>
            </div>
          </div>

          {/* === SLAB PREVIEW CARD (right side, desktop only) === */}
          <div className="hidden lg:flex flex-col items-end ml-auto">
            <div className="relative w-[220px] h-[300px] overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={room.slabImage}
                alt={room.granite}
                fill
                sizes="220px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-serif text-white text-lg font-light italic mb-1">
                  {room.granite}
                </p>
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/50">
                  Natural Slab
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === ROOM NAVIGATION DOTS === */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {ROOMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goToRoom(i)}
              className={`room-dot ${i === activeRoom ? "active" : ""}`}
              aria-label={`Go to ${r.name}`}
            />
          ))}
        </div>

        {/* === ROOM NAMES SIDEBAR (desktop) === */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-4">
          {ROOMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goToRoom(i)}
              className="text-[9px] tracking-[0.25em] uppercase font-medium cursor-pointer transition-all duration-300 text-right bg-none border-none"
              style={{
                color: i === activeRoom ? "#daa84a" : "rgba(255,255,255,0.35)",
                transform: i === activeRoom ? "scale(1.05)" : "scale(1)",
              }}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* === SCROLL PROGRESS BAR (bottom) === */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-64">
          {/* Room progress indicator */}
          <div className="flex gap-1.5 mb-3 justify-center">
            {ROOMS.map((_, i) => (
              <div
                key={i}
                className="h-[2px] flex-1 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    background: "#daa84a",
                    width:
                      i < activeRoom
                        ? "100%"
                        : i === activeRoom
                        ? `${Math.min(100, roomProgress * 100)}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] tracking-[0.25em] uppercase text-white/30">
            <span>Walk Through</span>
            <span className="text-gold-400">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* === SCROLL HINT (shown only at start) === */}
        <div
          className="absolute bottom-8 left-8 z-30 flex items-center gap-2 transition-opacity duration-500"
          style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
        >
          <div className="w-[14px] h-6 border border-white/30 rounded-full flex justify-center pt-1">
            <div className="w-[2px] h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );
}
