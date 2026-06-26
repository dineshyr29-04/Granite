"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Scene {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  origin: string;
  desc: string;
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

interface Props {
  onProgress: (progress: number) => void;
}

export default function CinematicWalkthrough({ onProgress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all scenes inside the container
    const scenes = gsap.utils.toArray<HTMLElement>(".walkthrough-scene");
    
    // We create a timeline that scrubs with scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // Pin for 400vh to smoothly transition through scenes
        scrub: 1,      // 1 second lag for smooth scrubbing
        pin: true,
        onUpdate: (self) => {
          if (onProgress) {
            onProgress(self.progress);
          }
        }
      }
    });

    // Sequence the animations sequentially
    scenes.forEach((scene, i) => {
      // The last scene remains as the final view
      if (i === scenes.length - 1) return;

      const bg = scene.querySelector(".scene-bg");
      const card = scene.querySelector(".scene-card");

      const label = `scene${i}`;

      // 1) Fade out text card quickly (faster than the background)
      tl.to(card, {
        opacity: 0,
        y: -40,
        duration: 0.3,
        ease: "power2.inOut"
      }, label);

      // 2) Concurrently scale up and fade out the background image
      tl.to(bg, {
        scale: 1.6,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, label);
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {SCENES.map((scene, i) => (
        <div
          key={scene.id}
          className="walkthrough-scene absolute inset-0 w-full h-full flex items-center"
          // Highest z-index on top so that as it fades out, it reveals the one below it
          style={{ zIndex: SCENES.length - i }}
        >
          {/* Background Image Container */}
          <div className="scene-bg absolute inset-0 w-full h-full origin-center will-change-transform">
            <Image
              src={scene.image}
              alt={scene.title}
              fill
              priority={i < 2}
              sizes="100vw"
              className="object-cover"
            />
            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none" />
            {scene.align === "left" && <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent pointer-events-none" />}
            {scene.align === "right" && <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-transparent pointer-events-none" />}
            
            {/* Architectural Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none" />
          </div>

          {/* Text Card Container */}
          <div 
            className="scene-card relative w-full max-w-7xl mx-auto px-6 md:px-16 flex will-change-transform"
            style={{ 
              justifyContent: scene.align === "center" ? "center" : scene.align === "right" ? "flex-end" : "flex-start",
            }}
          >
            {scene.id === "exterior" ? (
               /* Hero Glassmorphic Title */
               <div className="flex flex-col items-center text-center max-w-4xl pt-20">
                 <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.1em] mb-8 drop-shadow-2xl">
                   {scene.title}
                 </h1>
                 <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white font-medium mb-16 drop-shadow-lg">
                   {scene.subtitle}
                 </p>
                 <div className="w-[1px] h-20 bg-gradient-to-b from-white/80 to-transparent animate-pulse shadow-xl" />
                 <span className="mt-8 text-[9px] tracking-[0.4em] uppercase text-white/80 font-semibold drop-shadow-md">Scroll to explore</span>
               </div>
            ) : (
              /* High-End Room Glassmorphic Card */
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 max-w-md shadow-2xl rounded-sm">
                <p className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/70 font-medium mb-4">
                  {scene.subtitle}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4 tracking-wide drop-shadow-lg">
                  {scene.title}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-block text-[9px] tracking-[0.22em] uppercase font-medium px-3 py-1 border border-gold-400/40 text-gold-300 bg-black/20">
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
      ))}
    </div>
  );
}
