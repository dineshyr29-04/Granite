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
  color: string; // theme color for hover effects
}

const SLABS: SlabData[] = [
  {
    id: "cosmic-black",
    name: "COSMIC BLACK",
    description: "Flowing golden veins of quartz set against a deep obsidian night sky, offering unparalleled luxury.",
    source: "Sourced: Brazil",
    image: "/cosmic_black.png",
    side: "left",
    depth: -1000,
    features: ["High Polish", "Scratch Resistant", "Acid Proof"],
    color: "rgba(214, 170, 99, 0.8)",
  },
  {
    id: "patagonia",
    name: "PATAGONIA",
    description: "A dramatic tapestry of translucent quartz crystals, smoky obsidian, and golden feldspar fragments.",
    source: "Sourced: Brazil",
    image: "/patagonia.png",
    side: "right",
    depth: -2000,
    features: ["Backlit Capable", "Quartz Blend", "Extremely Rare"],
    color: "rgba(226, 195, 130, 0.8)",
  },
  {
    id: "blue-bahia",
    name: "BLUE BAHIA",
    description: "A rare sodalite masterpiece featuring vibrant royal blue tones accented by delicate white and gold waves.",
    source: "Sourced: Brazil",
    image: "/blue_bahia.png",
    side: "left",
    depth: -3000,
    features: ["Exotic Sodalite", "Ultra Premium", "Vibrant Polish"],
    color: "rgba(59, 130, 246, 0.8)",
  },
  {
    id: "alaska-white",
    name: "ALASKA WHITE",
    description: "A frosty glacier pattern blending cool silver and warm pewter veining with dark biotite crystals.",
    source: "Sourced: Brazil",
    image: "/alaska_white.png",
    side: "right",
    depth: -4000,
    features: ["Bright Aesthetic", "Versatile Design", "Frost Texture"],
    color: "rgba(200, 200, 200, 0.8)",
  },
];

export default function CorridorFlythrough({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  
  const [activeSlab, setActiveSlab] = useState<string | null>(null);
  const [scrollProgressPercent, setScrollProgressPercent] = useState(0);
  
  // Render loop states
  const [cameraZ, setCameraZ] = useState(0);
  
  // Custom piece-wise step function mapping scroll progress to Camera Z Depth
  // This slows down the camera at each slab to give the user time to inspect it!
  const getEasedZ = (p: number): number => {
    if (p < 0.12) {
      // Rush to Slab 1
      const ratio = p / 0.12;
      return ratio * -1000;
    } else if (p >= 0.12 && p < 0.28) {
      // PLATEAU 1 (Cosmic Black): Crawl slowly from -1000 to -1050
      const ratio = (p - 0.12) / 0.16;
      return -1000 - ratio * 50;
    } else if (p >= 0.28 && p < 0.38) {
      // Rush to Slab 2
      const ratio = (p - 0.28) / 0.10;
      return -1050 - ratio * 950;
    } else if (p >= 0.38 && p < 0.54) {
      // PLATEAU 2 (Patagonia): Crawl slowly from -2000 to -2050
      const ratio = (p - 0.38) / 0.16;
      return -2000 - ratio * 50;
    } else if (p >= 0.54 && p < 0.64) {
      // Rush to Slab 3
      const ratio = (p - 0.54) / 0.10;
      return -2050 - ratio * 950;
    } else if (p >= 0.64 && p < 0.80) {
      // PLATEAU 3 (Blue Bahia): Crawl slowly from -3000 to -3050
      const ratio = (p - 0.64) / 0.16;
      return -3000 - ratio * 50;
    } else if (p >= 0.80 && p < 0.90) {
      // Rush to Slab 4
      const ratio = (p - 0.80) / 0.10;
      return -3050 - ratio * 950;
    } else if (p >= 0.90 && p < 0.98) {
      // PLATEAU 4 (Alaska White): Crawl slowly from -4000 to -4050
      const ratio = (p - 0.90) / 0.08;
      return -4000 - ratio * 50;
    } else {
      // Final exit rush to the product grid
      const ratio = (p - 0.98) / 0.02;
      return -4050 - ratio * 450;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      
      // Calculate scroll progress from 0 to 1 relative to container's sticky track
      const relativeScroll = -rect.top;
      let progress = relativeScroll / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      targetProgress.current = progress;
      setScrollProgressPercent(Math.round(progress * 100));

      // Trigger grid view showing when user finishes the corridor scroll
      if (progress >= 0.99) {
        onComplete();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onComplete]);

  // RequestAnimationFrame animation loop for smooth inertia (damping)
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      // Damping formula: current = current + (target - current) * factor
      const diff = targetProgress.current - currentProgress.current;
      
      // Apply smooth damping
      currentProgress.current += diff * 0.07;

      // Handle very small threshold to stop ticking
      if (Math.abs(diff) > 0.0001) {
        const easedZ = getEasedZ(currentProgress.current);
        setCameraZ(easedZ);

        // Determine active slab based on proximity to camera focus
        let activeId: string | null = null;
        SLABS.forEach((slab) => {
          // A slab is in active focus if camera is close to it
          const distance = Math.abs(easedZ - slab.depth);
          if (distance < 300) {
            activeId = slab.id;
          }
        });
        setActiveSlab(activeId);
      } else {
        // Even when static, make sure camera is updated precisely
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

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      {/* Sticky corridor viewer */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#060608] flex items-center justify-center">
        
        {/* Invisible UI Overlay: Ambient Header and Sidebar Sourcing Details */}
        <div className="absolute top-8 left-8 right-8 z-30 flex justify-between items-center select-none pointer-events-none">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.25em] text-white">THE GRANITE VAULT</span>
            <span className="text-[10px] tracking-[0.4em] text-gold-400 mt-1 uppercase">Immersive Showroom</span>
          </div>
          <div className="hidden md:flex space-x-8 text-xs tracking-widest text-zinc-400">
            <span className="hover:text-gold-400 transition-colors pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
              NORMAL VIEW GRID
            </span>
          </div>
        </div>

        {/* Cinematic Backdrop: Luxury Kitchen continuation from video_0 */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/corridor.png"
            alt="Luxury Corridor Background"
            fill
            priority
            className="object-cover opacity-75 filter brightness-[0.85] contrast-[1.0] saturate-[0.9]"
          />
          {/* Subtle vignette shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-transparent to-[#060608] opacity-40" />
        </div>

        {/* 3D Perspective Viewport */}
        <div className="perspective-container relative w-full h-full flex items-center justify-center z-10">
          
          {/* Corridor Wrapper translating in 3D Space */}
          <div
            className="corridor-wrapper absolute w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(0, 0, ${-cameraZ}px)`,
            }}
          >
            {/* The Floating Floor Scroll Line */}
            <div
              className="absolute h-[6px] rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60"
              style={{
                width: "400px",
                top: "70%",
                transform: "rotateX(90deg) translate3d(0, 0, 0)",
                boxShadow: "0 0 20px rgba(214, 170, 99, 0.8)",
              }}
            />

            {/* Render slabs along the wall */}
            {SLABS.map((slab) => {
              const isLeft = slab.side === "left";
              const slabDist = cameraZ - slab.depth;
              
              // Fade calculation
              let opacity = 0;
              if (slabDist > 0) {
                opacity = 0;
              } else {
                const dist = Math.abs(slabDist);
                if (dist < 1800) {
                  if (dist < 300) {
                    opacity = Math.max(0, (dist / 300));
                  } else {
                    opacity = Math.max(0, 1 - (dist - 500) / 1200);
                  }
                }
              }

              const isActive = activeSlab === slab.id;

              return (
                <div
                  key={slab.id}
                  className="absolute w-[450px] h-[650px] flex items-center justify-center transition-all duration-300"
                  style={{
                    opacity: opacity,
                    transform: `translate3d(${isLeft ? "-500px" : "500px"}, -50%, ${slab.depth}px) rotateY(${isLeft ? "90deg" : "-90deg"})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Granite Slab Panel frame */}
                  <div
                    className="relative w-full h-full rounded bg-zinc-950 overflow-hidden border border-zinc-800 transition-all duration-500 shadow-2xl group"
                    style={{
                      boxShadow: isActive 
                        ? `0 0 40px -5px ${slab.color}, inset 0 0 20px rgba(255,255,255,0.05)`
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                      borderColor: isActive ? "rgba(214, 170, 99, 0.6)" : "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 pointer-events-none transform translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000" />
                    
                    <Image
                      src={slab.image}
                      alt={slab.name}
                      fill
                      sizes="450px"
                      priority
                      className="object-cover transition-transform duration-700 select-none pointer-events-none filter brightness-95 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 z-0" />
                  </div>

                  {/* INVISIBLE UI: Layered Glowing Gold Text floating 45px off the slab */}
                  <div
                    className="absolute w-[380px] z-20 flex flex-col items-center justify-center text-center p-6 select-none transition-all duration-500 pointer-events-none"
                    style={{
                      transform: `translate3d(0, 0, 45px)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-widest text-center select-none uppercase mb-2 gold-text-metallic gold-glow">
                      {slab.name}
                    </h2>
                    
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-3" />
                    
                    <p className="text-[11px] tracking-[0.3em] font-semibold text-gold-300 uppercase mb-4">
                      {slab.source}
                    </p>

                    <p className="text-zinc-300 text-xs leading-relaxed max-w-sm font-light filter drop-shadow">
                      {slab.description}
                    </p>

                    {/* Granite Technical Badges */}
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                      {slab.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-[9px] font-medium tracking-widest text-gold-200 border border-gold-500/20 bg-gold-950/20 rounded uppercase"
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

        {/* Minimalist Scroll Progress Track on Floor */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-80 flex flex-col items-center select-none">
          <div className="flex justify-between w-full text-[10px] tracking-[0.3em] text-zinc-500 mb-2 uppercase font-medium">
            <span>ENTRANCE</span>
            <span className="text-gold-400 font-bold">{scrollProgressPercent}%</span>
            <span>GALLERY</span>
          </div>
          <div className="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-75"
              style={{ width: `${scrollProgressPercent}%` }}
            />
          </div>
          <span className="text-[9px] tracking-[0.2em] text-zinc-600 mt-2 animate-pulse uppercase">
            SCROLL TO EXPLORE THE VAULT
          </span>
        </div>

        {/* Subtle Side Navigation Lines */}
        <div className="absolute left-8 bottom-24 z-20 hidden md:flex flex-col space-y-4">
          {SLABS.map((slab, index) => {
            const isActive = activeSlab === slab.id;
            return (
              <button
                key={slab.id}
                onClick={() => {
                  const progressTargets = [0.2, 0.46, 0.72, 0.94];
                  const scrollHeight = containerRef.current 
                    ? containerRef.current.offsetHeight - window.innerHeight
                    : 0;
                  const newScrollTop = containerRef.current 
                    ? containerRef.current.offsetTop + (progressTargets[index] * scrollHeight)
                    : 0;
                  window.scrollTo({ top: newScrollTop, behavior: "smooth" });
                }}
                className="flex items-center space-x-3 text-left focus:outline-none pointer-events-auto group"
              >
                <div
                  className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                    isActive ? "bg-gold-400 scale-125" : "bg-zinc-700 group-hover:bg-zinc-500"
                  }`}
                />
                <span
                  className={`text-[9px] tracking-widest uppercase transition-all duration-300 ${
                    isActive ? "text-gold-300 font-semibold" : "text-zinc-600 group-hover:text-zinc-400"
                  }`}
                >
                  {slab.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
