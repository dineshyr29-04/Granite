"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SlabData {
  id: string;
  name: string;
  description: string;
  source: string;
  image: string;
  side: "left" | "right";
  depth: number; // Z position in world space
  features: string[];
  color: string;
}

const SLABS: SlabData[] = [
  {
    id: "cosmic-black",
    name: "COSMIC BLACK",
    description: "Deep black stone with flowing golden veins of quartz, offering unparalleled luxury.",
    source: "Sourced: Brazil",
    image: "/cosmic_black.png",
    side: "left",
    depth: -1200,
    features: ["High Polish", "Scratch Resistant", "Acid Proof"],
    color: "rgba(214, 170, 99, 0.8)",
  },
  {
    id: "alaska-white",
    name: "ALASKA WHITE",
    description: "Elegant white granite with natural pewter veining and dark biotite crystals.",
    source: "Sourced: India",
    image: "/alaska_white.png",
    side: "right",
    depth: -2400,
    features: ["Bright Aesthetic", "Versatile Design", "Frost Texture"],
    color: "rgba(200, 200, 200, 0.8)",
  },
  {
    id: "titanium-grey",
    name: "TITANIUM GREY",
    description: "Modern grey texture with natural swirls of quartz and dark charcoal for contemporary interiors.",
    source: "Sourced: India",
    image: "/titanium_grey.png",
    side: "left",
    depth: -3600,
    features: ["Quartz Blend", "Extremely Durable", "Contemporary Polish"],
    color: "rgba(120, 120, 120, 0.8)",
  },
];

export default function CorridorFlythrough({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  
  const [activeSlab, setActiveSlab] = useState<string | null>(null);
  const [scrollProgressPercent, setScrollProgressPercent] = useState(0);
  const [cameraZ, setCameraZ] = useState(0);
  
  // Custom non-linear speed mapping (giving plenty of inspection time at each plateau)
  const getEasedZ = (p: number): number => {
    // Total camera movement length is 4000px
    if (p < 0.15) {
      // Phase 1: Stationary Hero Zone (0% to 15% scroll progress)
      return 0;
    } else if (p >= 0.15 && p < 0.25) {
      // Rush to Slab 1
      const ratio = (p - 0.15) / 0.10;
      return ratio * -1200;
    } else if (p >= 0.25 && p < 0.42) {
      // PLATEAU 1 (Cosmic Black): Hold camera focus at -1200px
      const ratio = (p - 0.25) / 0.17;
      return -1200 - ratio * 50;
    } else if (p >= 0.42 && p < 0.52) {
      // Rush to Slab 2
      const ratio = (p - 0.42) / 0.10;
      return -1250 - ratio * 1150;
    } else if (p >= 0.52 && p < 0.69) {
      // PLATEAU 2 (Alaska White): Hold camera focus at -2400px
      const ratio = (p - 0.52) / 0.17;
      return -2400 - ratio * 50;
    } else if (p >= 0.69 && p < 0.79) {
      // Rush to Slab 3
      const ratio = (p - 0.69) / 0.10;
      return -2450 - ratio * 1150;
    } else if (p >= 0.79 && p < 0.94) {
      // PLATEAU 3 (Titanium Grey): Hold camera focus at -3600px
      const ratio = (p - 0.79) / 0.15;
      return -3600 - ratio * 50;
    } else {
      // Final exit rush to collection grid
      const ratio = (p - 0.94) / 0.06;
      return -3650 - ratio * 550;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      
      const relativeScroll = -rect.top;
      let progress = relativeScroll / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      targetProgress.current = progress;
      setScrollProgressPercent(Math.round(progress * 100));

      if (progress >= 0.99) {
        onComplete();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onComplete]);

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      const diff = targetProgress.current - currentProgress.current;
      currentProgress.current += diff * 0.075; // smooth damping inertia

      if (Math.abs(diff) > 0.0001) {
        const easedZ = getEasedZ(currentProgress.current);
        setCameraZ(easedZ);

        let activeId: string | null = null;
        SLABS.forEach((slab) => {
          const distance = Math.abs(easedZ - slab.depth);
          if (distance < 250) {
            activeId = slab.id;
          }
        });
        setActiveSlab(activeId);
      } else {
        const easedZ = getEasedZ(targetProgress.current);
        setCameraZ(easedZ);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Calculate Hero opacity fade out
  // The Hero starts fully visible (opacity 1) and fades out completely by 18% progress
  const heroOpacity = Math.max(0, 1 - (scrollProgressPercent / 16));

  const handleExploreClick = () => {
    const targetElement = document.getElementById("collection");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[550vh]">
      {/* Sticky Frame viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#060608] flex items-center justify-center">
        
        {/* Cinematic Backdrop: Architectural Corridor */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/corridor.png"
            alt="Luxury Corridor Background"
            fill
            priority
            className="object-cover opacity-70 filter brightness-[0.8] contrast-[1.05] saturate-[0.85]"
          />
          {/* Symmetrical dark lighting vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-transparent to-[#060608] opacity-55" />
        </div>

        {/* INTEGRATED HERO EXPERIENCE OVERLAY (Active at beginning of scroll) */}
        <div 
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-24 select-none pointer-events-none transition-all duration-300"
          style={{ 
            opacity: heroOpacity,
            visibility: heroOpacity <= 0.01 ? "hidden" : "visible",
            transform: `translateY(${-scrollProgressPercent * 1.5}px)`
          }}
        >
          <div className="max-w-xl text-left pointer-events-auto">
            <span className="text-[10px] tracking-[0.45em] text-gold-400 font-extrabold uppercase mb-4 block">
              PREMIUM GRANITES
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight text-white uppercase mb-5 tracking-wide">
              Timeless Beauty.<br />
              Strength That<br />
              Lasts Forever.
            </h1>
            <p className="text-zinc-300 text-xs md:text-sm tracking-wide leading-relaxed max-w-sm mb-8 font-light">
              Step into a world of natural elegance. Explore our premium granites permanently installed inside a luxury showroom space that inspires.
            </p>
            
            <button
              onClick={handleExploreClick}
              className="py-3 px-8 text-xs tracking-[0.25em] font-semibold text-black bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-400 hover:to-gold-200 transition-all duration-300 rounded shadow-lg active:scale-95 cursor-pointer uppercase"
            >
              Explore Collection
            </button>
          </div>

          {/* Mouse Scroll indicator in Hero */}
          <div className="absolute bottom-10 right-10 md:right-24 flex items-center space-x-3 text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
            <span>SCROLL TO EXPLORE</span>
            <div className="w-[16px] h-7 rounded-full border border-zinc-600 flex justify-center p-[4px]">
              <div className="w-[2px] h-[5px] bg-gold-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* 3D Perspective container */}
        <div className="perspective-container relative w-full h-full flex items-center justify-center z-10">
          
          {/* 3D Corridor Wrapper */}
          <div
            className="corridor-wrapper absolute w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(0, 0, ${-cameraZ}px)`,
            }}
          >
            {/* Symmetrical guide track on floor */}
            <div
              className="absolute h-[4px] rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"
              style={{
                width: "450px",
                top: "70%",
                transform: "rotateX(90deg) translate3d(0, 0, 0)",
                boxShadow: "0 0 15px rgba(214, 170, 99, 0.6)",
              }}
            />

            {/* Slabs rendered on walls */}
            {SLABS.map((slab) => {
              const isLeft = slab.side === "left";
              const slabDist = cameraZ - slab.depth;
              
              // Fade calculations for immersive viewing
              let opacity = 0;
              if (slabDist > 0) {
                opacity = 0;
              } else {
                const dist = Math.abs(slabDist);
                if (dist < 1800) {
                  if (dist < 250) {
                    opacity = Math.max(0, (dist / 250));
                  } else {
                    opacity = Math.max(0, 1 - (dist - 400) / 1300);
                  }
                }
              }

              const isActive = activeSlab === slab.id;

              return (
                <div
                  key={slab.id}
                  className="absolute w-[440px] h-[640px] flex items-center justify-center transition-all duration-300"
                  style={{
                    opacity: opacity,
                    transform: `translate3d(${isLeft ? "-480px" : "480px"}, -50%, ${slab.depth}px) rotateY(${isLeft ? "90deg" : "-90deg"})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Granite panel frame (Physically set into the wall) */}
                  <div
                    className="relative w-full h-full rounded bg-zinc-950 overflow-hidden border border-zinc-800 transition-all duration-500 shadow-2xl group cursor-pointer"
                    onClick={handleExploreClick}
                    style={{
                      boxShadow: isActive 
                        ? `0 0 40px -5px ${slab.color}, inset 0 0 25px rgba(255,255,255,0.05)`
                        : "0 20px 45px -12px rgba(0, 0, 0, 0.8)",
                      borderColor: isActive ? "rgba(214, 170, 99, 0.5)" : "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {/* Highly-polished sheen reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 pointer-events-none transform translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000" />
                    
                    <Image
                      src={slab.image}
                      alt={slab.name}
                      fill
                      sizes="440px"
                      priority
                      className="object-cover transition-transform duration-700 select-none pointer-events-none filter brightness-95 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25 z-0" />
                  </div>

                  {/* INVISIBLE UI: Glowing Typography Floating 40px Forward */}
                  <div
                    className="absolute w-[360px] z-20 flex flex-col items-center justify-center text-center p-6 select-none transition-all duration-500 pointer-events-none"
                    style={{
                      transform: `translate3d(0, 0, 40px)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <h2 className="font-serif text-3xl font-extrabold tracking-widest text-center select-none uppercase mb-1.5 gold-text-metallic gold-glow">
                      {slab.name}
                    </h2>
                    
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-2.5" />
                    
                    <p className="text-[10px] tracking-[0.3em] font-semibold text-gold-300 uppercase mb-3.5">
                      {slab.source}
                    </p>

                    <p className="text-zinc-300 text-xs leading-relaxed max-w-sm font-light filter drop-shadow">
                      {slab.description}
                    </p>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-2 justify-center mt-5">
                      {slab.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[8.5px] font-medium tracking-widest text-gold-200 border border-gold-500/20 bg-gold-950/20 rounded uppercase"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimalist Floor Progress tracker */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-72 flex flex-col items-center select-none">
          <div className="flex justify-between w-full text-[9px] tracking-[0.25em] text-zinc-500 mb-1.5 uppercase font-medium">
            <span>START</span>
            <span className="text-gold-400 font-bold">{scrollProgressPercent}%</span>
            <span>END</span>
          </div>
          <div className="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-75"
              style={{ width: `${scrollProgressPercent}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
