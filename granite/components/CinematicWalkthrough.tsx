"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
    subtitle: "Living Room — Feature Wall",
    origin: "Brazil",
    desc: "Deep black granite with natural golden veins.",
    align: "left",
  },
  {
    id: "kitchen",
    image: "/room_kitchen.png",
    title: "ALASKA WHITE",
    subtitle: "Kitchen — Island & Backsplash",
    origin: "India",
    desc: "Frosty white background with complex pewter veining.",
    align: "right",
  },
  {
    id: "bathroom",
    image: "/room_bathroom.png",
    title: "TITANIUM GREY",
    subtitle: "Spa Bathroom — Walls & Vanity",
    origin: "India",
    desc: "Contemporary charcoal grey with natural quartz swirls.",
    align: "left",
  },
  {
    id: "bedroom",
    image: "/room_bedroom.png",
    title: "PATAGONIA",
    subtitle: "Master Bedroom — Statement Wall",
    origin: "Brazil",
    desc: "Translucent cream quartz with dark obsidian patches.",
    align: "right",
  },
];

const N = SCENES.length; // 5

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
      const scrollHeight = rect.height - window.innerHeight;
      const relativeScroll = -rect.top;
      let p = relativeScroll / scrollHeight;
      p = Math.max(0, Math.min(1, p));
      cancelAnimationFrame(rafId);
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

  const scrollIn = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * 1.5, behavior: "smooth" });
  }, []);

  // ─── Per-scene opacity logic ───────────────────────────────────────────────
  // Each scene owns a 1/N slice of [0, 1].
  // Cross-fade duration = 5% of total progress on each boundary.
  const CROSS = 0.05; // cross-fade width

  function getSceneOpacity(i: number, p: number): number {
    const start = i / N;        // scene starts
    const end = (i + 1) / N;   // scene ends
    const fadeIn = start - CROSS / 2;   // fade-in begins half a CROSS before start
    const fadeOut = end - CROSS / 2;    // fade-out begins half a CROSS before end

    if (i === 0) {
      // First scene: always visible until its fade-out starts
      if (p < fadeOut) return 1;
      if (p < fadeOut + CROSS) return 1 - (p - fadeOut) / CROSS;
      return 0;
    }

    if (i === N - 1) {
      // Last scene: fades in, then stays at 1 forever (until the walkthrough ends)
      if (p < fadeIn) return 0;
      if (p < fadeIn + CROSS) return (p - fadeIn) / CROSS;
      return 1;
    }

    // Middle scenes: fade in then fade out
    if (p < fadeIn) return 0;
    if (p < fadeIn + CROSS) return (p - fadeIn) / CROSS;   // fading in
    if (p < fadeOut) return 1;                              // fully visible
    if (p < fadeOut + CROSS) return 1 - (p - fadeOut) / CROSS; // fading out
    return 0;
  }

  // ─── Per-scene text opacity ────────────────────────────────────────────────
  // Text fades in 20% into the scene's window and fades out 20% before the end.
  function getTextOpacity(i: number, p: number): number {
    const start = i / N;
    const end = (i + 1) / N;
    const dur = end - start;
    const textIn = start + dur * 0.15;
    const textOut = end - dur * 0.20;
    const fadeDur = dur * 0.12;

    // Special case: exterior hero text is visible right from 0
    if (i === 0) {
      if (p < textOut) return 1;
      if (p < textOut + fadeDur) return 1 - (p - textOut) / fadeDur;
      return 0;
    }

    if (i === N - 1) {
      // Last scene text stays visible
      if (p < textIn) return 0;
      if (p < textIn + fadeDur) return (p - textIn) / fadeDur;
      return 1;
    }

    if (p < textIn) return 0;
    if (p < textIn + fadeDur) return (p - textIn) / fadeDur;
    if (p < textOut) return 1;
    if (p < textOut + fadeDur) return 1 - (p - textOut) / fadeDur;
    return 0;
  }

  // ─── Scale (push-forward illusion) ────────────────────────────────────────
  function getScale(i: number, p: number): number {
    const start = i === 0 ? 0 : i / N - CROSS / 2;
    const end = i === N - 1 ? 1 : (i + 1) / N;
    const range = end - start;
    const sp = Math.max(0, Math.min(1, (p - start) / range));
    // Subtle architectural pan (1.0 to 1.05) rather than aggressive zoom
    return 1.0 + sp * 0.05; 
  }

  // Active scene index (for progress dots)
  const activeIndex = Math.min(N - 1, Math.floor(progress * N));

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "600vh", background: "#0a0a0a" }}
    >
      {/* ─── Sticky viewport ──────────────────────────────────────────────── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">

        {/* ─── Architectural Frame (Immersive Window Effect) ────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[25] border-[12px] md:border-[32px] border-[#0a0a0a]" />
        <div className="pointer-events-none absolute inset-0 z-[25] shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] md:shadow-[inset_0_0_250px_rgba(0,0,0,0.95)]" />

        {/* ─── Scene layers ─────────────────────────────────────────────── */}
        {SCENES.map((scene, i) => {
          const opacity = getSceneOpacity(i, progress);
          const textOpacity = getTextOpacity(i, progress);
          const scale = getScale(i, progress);

          return (
            <div
              key={scene.id}
              className="absolute inset-0 flex items-center justify-start"
              style={{
                opacity,
                zIndex: i, // later scenes sit on top; all use their own opacity
                willChange: "opacity",
              }}
            >
              {/* Background image – scales independently for parallax push */}
              <div
                className="absolute inset-0 origin-center"
                style={{
                  transform: `scale(${scale})`,
                  willChange: "transform",
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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/40" />
                {scene.align === "left"  && <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />}
                {scene.align === "right" && <div className="absolute inset-0 bg-gradient-to-l from-black/75 to-transparent" />}
              </div>

              {/* Text overlay */}
              <div
                className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${(1 - textOpacity) * 18}px)`,
                  transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
                  alignItems: scene.align === "center" ? "center" : scene.align === "right" ? "flex-end" : "flex-start",
                  textAlign:  scene.align === "center" ? "center" : scene.align === "right" ? "right"    : "left",
                }}
              >
                {scene.id === "exterior" ? (
                  /* ── Hero text ── */
                  <>
                    <h1
                      className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.08em] mb-5"
                      style={{ textShadow: "0 4px 32px rgba(0,0,0,0.6)" }}
                    >
                      {scene.title}
                    </h1>
                    <p className="text-[11px] md:text-xs tracking-[0.42em] uppercase text-white/75 font-medium mb-12">
                      {scene.subtitle}
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <button
                        onClick={scrollIn}
                        className="px-10 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] tracking-[0.28em] uppercase font-medium transition-all duration-300 cursor-pointer active:scale-95"
                      >
                        {scene.button}
                      </button>
                      <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
                    </div>
                  </>
                ) : (
                  /* ── Room text ── */
                  <div className="max-w-lg">
                    <p className="text-[9px] md:text-[10px] tracking-[0.38em] uppercase text-white/60 font-medium mb-3">
                      {scene.subtitle}
                    </p>
                    <h2
                      className="font-serif text-4xl md:text-6xl font-light text-white mb-3 tracking-wide"
                      style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
                    >
                      {scene.title}
                    </h2>
                    <span
                      className="inline-block text-[9px] tracking-[0.22em] uppercase font-medium mb-4 px-3 py-1 border"
                      style={{ color: "var(--color-gold-300)", borderColor: "rgba(218,168,74,0.35)" }}
                    >
                      {scene.origin}
                    </span>
                    <p className="text-white/75 text-sm md:text-base leading-relaxed font-light">
                      {scene.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* ─── Progress dots ─────────────────────────────────────────────── */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 items-center">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width:  i === activeIndex ? "24px" : "6px",
                height: "6px",
                background: i === activeIndex ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* ─── Scroll hint (only at very beginning) ─────────────────────── */}
        <div
          className="absolute bottom-9 right-10 z-30 flex items-center gap-2 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: progress < 0.06 ? 1 : 0 }}
        >
          <div className="w-[14px] h-[22px] border border-white/30 rounded-full flex justify-center pt-1">
            <div className="w-[2px] h-[6px] bg-white/50 rounded-full animate-bounce" />
          </div>
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/35 font-medium">Scroll</span>
        </div>

      </div>
    </div>
  );
}
