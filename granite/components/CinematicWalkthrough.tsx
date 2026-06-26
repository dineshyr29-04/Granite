"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Scene {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  origin: string;
  desc: string;
  button?: string;
  align: "center" | "left" | "right";
}

const SCENES: Scene[] = [
  {
    id: "exterior",
    image: "/hero_exterior.png",
    title: "THE GRANITE VAULT",
    subtitle: "Experience Natural Stone Inside Luxury Spaces",
    origin: "",
    desc: "",
    button: "Enter The Home",
    align: "center",
  },
  {
    id: "living",
    image: "/room_living.png",
    title: "COSMIC BLACK",
    subtitle: "Applied on Feature Wall",
    origin: "Brazil",
    desc: "Deep black granite with natural golden veins.",
    align: "left",
  },
  {
    id: "kitchen",
    image: "/room_kitchen.png",
    title: "ALASKA WHITE",
    subtitle: "Applied on Island & Backsplash",
    origin: "India",
    desc: "Frosty white background with complex pewter veining.",
    align: "right",
  },
  {
    id: "bathroom",
    image: "/room_bathroom.png",
    title: "TITANIUM GREY",
    subtitle: "Applied on Walls & Vanity",
    origin: "India",
    desc: "Contemporary charcoal grey with natural quartz swirls.",
    align: "left",
  },
  {
    id: "bedroom",
    image: "/room_bedroom.png",
    title: "PATAGONIA",
    subtitle: "Applied on Statement Wall",
    origin: "Brazil",
    desc: "Translucent cream quartz with dark obsidian patches.",
    align: "right",
  },
];

interface Props {
  onProgress: (progress: number) => void;
}

export default function CinematicWalkthrough({ onProgress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Total scrollable height = section height - viewport height
      const scrollHeight = rect.height - window.innerHeight;
      const relativeScroll = -rect.top;
      
      let p = relativeScroll / scrollHeight;
      p = Math.max(0, Math.min(1, p));
      
      rafId = requestAnimationFrame(() => {
        setProgress(p);
        onProgress(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [onProgress]);

  const SCENE_DURATION = 1 / SCENES.length; // 0.2
  const FADE_DUR = 0.05;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "600vh", background: "#060608" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        
        {SCENES.map((scene, i) => {
          const start = i * SCENE_DURATION;
          const end = start + SCENE_DURATION;
          
          const fadeInStart = i === 0 ? 0 : start - FADE_DUR;
          const fadeOutStart = i === SCENES.length - 1 ? 1 : end - FADE_DUR;

          // Opacity calculation
          let opacity = 0;
          if (progress >= fadeInStart && progress <= fadeOutStart) {
            opacity = 1;
            if (progress < start && i > 0) {
              opacity = (progress - fadeInStart) / FADE_DUR;
            }
          } else if (progress > fadeOutStart && progress <= end && i < SCENES.length - 1) {
            opacity = 1 - (progress - fadeOutStart) / FADE_DUR;
          } else if (i === SCENES.length - 1 && progress >= fadeOutStart) {
            opacity = 1; // Last scene stays visible until standard scroll takes over
          }

          // Scale calculation (simulate walking forward)
          const visibleDur = (i === SCENES.length - 1 ? 1.0 : end) - fadeInStart;
          let scaleProgress = 0;
          if (progress > fadeInStart) {
            scaleProgress = Math.min(1, (progress - fadeInStart) / visibleDur);
          }
          const scale = 1.0 + (scaleProgress * 0.25);

          // Text Opacity (plateau only)
          let textOpacity = 0;
          const textFadeStart = start;
          const textFadeEnd = start + 0.03;
          const textFadeOutStart = end - 0.06;
          const textFadeOutEnd = end - 0.03;

          if (progress >= textFadeEnd && progress <= textFadeOutStart) {
            textOpacity = 1;
          } else if (progress > textFadeStart && progress < textFadeEnd) {
            textOpacity = (progress - textFadeStart) / 0.03;
          } else if (progress > textFadeOutStart && progress < textFadeOutEnd && i < SCENES.length - 1) {
            textOpacity = 1 - (progress - textFadeOutStart) / 0.03;
          } else if (i === SCENES.length - 1 && progress >= textFadeOutStart) {
             textOpacity = 1;
          }
          
          if (i === 0 && progress < 0.1) textOpacity = 1;
          if (i === 0 && progress >= 0.1 && progress <= 0.15) {
             textOpacity = 1 - (progress - 0.1) / 0.05;
          }

          return (
            <div
              key={scene.id}
              className="absolute inset-0 flex flex-col justify-center will-change-transform"
              style={{
                opacity: opacity,
                pointerEvents: opacity > 0.1 ? "auto" : "none",
                zIndex: i,
              }}
            >
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 will-change-transform origin-center"
                style={{
                  transform: `scale(${scale})`,
                }}
              >
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  priority={i < 2}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
                {scene.align === "left" && <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />}
                {scene.align === "right" && <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />}
              </div>

              {/* Minimal Text Overlay Layer */}
              <div
                className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col will-change-opacity"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${(1 - textOpacity) * 20}px)`,
                  transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
                  alignItems: scene.align === "center" ? "center" : scene.align === "right" ? "flex-end" : "flex-start",
                  textAlign: scene.align === "center" ? "center" : scene.align === "right" ? "right" : "left",
                }}
              >
                {scene.id === "exterior" ? (
                  <>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.1em] mb-4 drop-shadow-2xl">
                      {scene.title}
                    </h1>
                    <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-white/80 font-medium mb-12 drop-shadow-md">
                      {scene.subtitle}
                    </p>
                    {scene.button && (
                      <div className="flex flex-col items-center gap-4">
                        <button 
                          className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 cursor-pointer"
                          onClick={() => {
                            window.scrollBy({ top: window.innerHeight * 1.5, behavior: "smooth" });
                          }}
                        >
                          {scene.button}
                        </button>
                        <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="max-w-lg">
                    <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 font-medium mb-2">
                      {scene.subtitle}
                    </p>
                    <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-2 tracking-wide drop-shadow-lg">
                      {scene.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-4 justify-start" style={{ justifyContent: scene.align === "right" ? "flex-end" : "flex-start" }}>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-gold-400 font-medium border border-gold-400/30 px-3 py-1">
                        {scene.origin}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      {scene.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Minimal Progress Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SCENES.map((_, i) => {
            const isActive = progress >= i * SCENE_DURATION && progress < (i + 1) * SCENE_DURATION;
            return (
              <div 
                key={i} 
                className="w-8 h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)"
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
