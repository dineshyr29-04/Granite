"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolledPastWalkthrough, setIsScrolledPastWalkthrough] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The walkthrough is 600vh (6 window heights).
      // Let's transition the navbar to light mode once we pass the dark cinematic section.
      const walkthroughHeight = window.innerHeight * 6;
      if (window.scrollY > walkthroughHeight - 100) {
        setIsScrolledPastWalkthrough(true);
      } else {
        setIsScrolledPastWalkthrough(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Collection", "Sourcing", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${
        isScrolledPastWalkthrough
          ? "bg-white/80 backdrop-blur-lg border-stone-200 py-4 shadow-sm"
          : "bg-black/20 backdrop-blur-md border-white/10 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-4 cursor-pointer group">
          <div
            className={`w-10 h-10 flex items-center justify-center border transition-colors duration-500 ${
              isScrolledPastWalkthrough
                ? "border-gold-600 bg-transparent text-gold-600"
                : "border-white/30 bg-transparent text-white group-hover:border-gold-400 group-hover:text-gold-400"
            }`}
            style={{ transform: "rotate(45deg)" }}
          >
            <span
              style={{ transform: "rotate(-45deg)" }}
              className="font-serif text-sm font-semibold tracking-wider"
            >
              GV
            </span>
          </div>
          <span
            className={`font-serif text-lg tracking-[0.25em] transition-colors duration-500 ${
              isScrolledPastWalkthrough ? "text-stone-900" : "text-white"
            }`}
          >
            THE GRANITE VAULT
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
                  isScrolledPastWalkthrough
                    ? "text-stone-600 hover:text-gold-600"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <button
              className={`px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 ${
                isScrolledPastWalkthrough
                  ? "bg-gold-600 text-white hover:bg-gold-700"
                  : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
              }`}
            >
              Get a Quote
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
