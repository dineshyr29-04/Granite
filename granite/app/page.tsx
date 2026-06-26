"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HouseWalkthrough from "@/components/HouseWalkthrough";
import GraniteGrid from "@/components/GraniteGrid";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [highlightGranite, setHighlightGranite] = useState<string | null>(null);

  // Scroll reveal
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Reveal elements
      const revealEls = document.querySelectorAll(".reveal");
      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add("is-visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleGraniteClick = (granite: string) => {
    setHighlightGranite(granite.toLowerCase().replace(/\s+/g, "-"));
    setTimeout(() => {
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you! Your consultation request has been received. Our team will contact you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#faf9f6" }}>

      {/* ========== NAVIGATION ========== */}
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(250,249,246,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #e4ddd2" : "1px solid transparent",
          paddingTop: scrolled ? "14px" : "20px",
          paddingBottom: scrolled ? "14px" : "20px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer bg-none border-none p-0"
          >
            <div className="gv-mark">
              <span>GV</span>
            </div>
            <span
              className="font-serif text-sm font-semibold tracking-[0.28em] transition-colors duration-300"
              style={{ color: scrolled ? "#1a1814" : "#fff" }}
            >
              THE GRANITE VAULT
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Walkthrough", id: "walkthrough" },
              { label: "Collection", id: "collection" },
              { label: "Sourcing", id: "sourcing" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link"
                style={{ color: scrolled ? "#5a4f44" : "rgba(255,255,255,0.75)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary py-2.5 px-6 text-[10px]"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer border-none bg-none p-1"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-[1.5px] transition-all duration-300"
                style={{ background: scrolled ? "#1a1814" : "#fff" }}
              />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 px-6 py-6 flex flex-col gap-4">
            {[
              { label: "Walkthrough", id: "walkthrough" },
              { label: "Collection", id: "collection" },
              { label: "Sourcing", id: "sourcing" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link text-left"
                style={{ color: "#5a4f44" }}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-primary mt-2">
              Get a Quote
            </button>
          </div>
        )}
      </header>

      {/* ========== HERO SECTION ========== */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        {/* Background image */}
        <Image
          src="/hero_corridor.png"
          alt="Luxury Villa Interior — The Granite Vault"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* Pre-heading */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold-400" />
              <span className="text-[10px] font-medium tracking-[0.45em] uppercase text-gold-300">
                Premium Architectural Granite
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] tracking-wide mb-6">
              Where Stone<br />
              Becomes <em className="font-light italic">Art.</em>
            </h1>

            {/* Subtext */}
            <p className="text-white/65 text-sm md:text-base leading-relaxed font-light max-w-md mb-10">
              Experience our premium granites inside a luxury villa walkthrough. 
              Each stone tells a geological story millions of years in the making.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => scrollTo("walkthrough")}
                className="btn-primary"
              >
                Begin Walkthrough ↓
              </button>
              <button
                onClick={() => scrollTo("collection")}
                className="btn-ghost border-white/30 text-white/80 hover:bg-white hover:text-zinc-900 hover:border-white"
              >
                View Collection
              </button>
            </div>
          </div>

          {/* Floating trust indicators */}
          <div className="absolute bottom-12 right-8 md:right-16 flex gap-8 md:gap-12">
            {[
              { value: "15+", label: "Years" },
              { value: "450+", label: "Projects" },
              { value: "10+", label: "Quarries" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-serif text-2xl md:text-3xl font-light text-white block leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-white/30">Scroll</span>
        </div>
      </section>

      {/* ========== INTRO STRIP ========== */}
      <section className="w-full bg-white py-16 px-6 md:px-16 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="font-serif text-xl md:text-2xl font-light text-zinc-600 leading-relaxed max-w-xl italic">
            "We don&apos;t sell granite. We curate natural masterpieces — each slab is a one-of-a-kind geological event frozen in stone."
          </p>
          <div className="flex gap-10 flex-shrink-0">
            <div className="text-center">
              <span className="font-serif text-4xl text-gold-600 font-light block">100%</span>
              <span className="text-[9px] tracking-widest text-stone-400 uppercase font-medium">Direct Import</span>
            </div>
            <div className="w-[1px] bg-stone-200 self-stretch" />
            <div className="text-center">
              <span className="font-serif text-4xl text-gold-600 font-light block">7</span>
              <span className="text-[9px] tracking-widest text-stone-400 uppercase font-medium">Stone Types</span>
            </div>
            <div className="w-[1px] bg-stone-200 self-stretch" />
            <div className="text-center">
              <span className="font-serif text-4xl text-gold-600 font-light block">3</span>
              <span className="text-[9px] tracking-widest text-stone-400 uppercase font-medium">Countries</span>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* ========== HOUSE WALKTHROUGH ========== */}
        <section id="walkthrough" className="w-full relative">
          {/* Section header */}
          <div className="w-full bg-white py-16 px-6 md:px-16 border-b border-stone-200">
            <div className="max-w-7xl mx-auto">
              <span className="section-label mb-3 block">Virtual Tour</span>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-zinc-900 leading-tight">
                  Explore Granite<br />
                  <em className="font-light">In Real Spaces</em>
                </h2>
                <p className="text-stone-400 text-sm font-light max-w-xs">
                  Scroll to walk through a luxury villa and discover how each granite transforms a space.
                </p>
              </div>
            </div>
          </div>

          <HouseWalkthrough onGraniteClick={handleGraniteClick} />
        </section>

        {/* ========== GRANITE COLLECTION GRID ========== */}
        <GraniteGrid highlightId={highlightGranite} />

        {/* ========== SOURCING SECTION ========== */}
        <section id="sourcing" className="w-full bg-white py-24 px-6 md:px-16 border-t border-stone-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              {/* Left: copy */}
              <div className="w-full lg:w-[40%] lg:sticky lg:top-28">
                <span className="section-label mb-3 block reveal">From Earth to Architecture</span>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-zinc-900 leading-tight mb-6 reveal reveal-delay-1">
                  Our Sourcing<br /><em>Philosophy</em>
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed font-light mb-8 reveal reveal-delay-2">
                  We partner directly with trusted quarry owners across Brazil, India, and Norway — eliminating intermediaries to deliver pristine stone at uncompromised quality. Every block is hand-selected by our geologists.
                </p>
                <button onClick={() => scrollTo("contact")} className="btn-primary reveal reveal-delay-3">
                  Schedule a Consultation
                </button>
              </div>

              {/* Right: timeline steps */}
              <div className="w-full lg:w-[60%] flex flex-col gap-6">
                {[
                  {
                    step: "01",
                    title: "Geological Survey",
                    desc: "Our expert geologists conduct on-site surveys at quarry mines across 3 continents to identify blocks with exceptional mineral composition and natural beauty.",
                    icon: "◇",
                  },
                  {
                    step: "02",
                    title: "Block Selection",
                    desc: "We handpick raw granite blocks based on color consistency, vein patterns, mineral density, and structural integrity. Only the top 5% make the cut.",
                    icon: "◈",
                  },
                  {
                    step: "03",
                    title: "Diamond Wire Cutting",
                    desc: "Using state-of-the-art diamond wire saws, blocks are precision-cut into slabs at exact thicknesses. Book-matching is performed for symmetrical panel pairs.",
                    icon: "◆",
                  },
                  {
                    step: "04",
                    title: "Surface Finishing",
                    desc: "Slabs are polished, leathered, flamed, or honed to your specification. Each finish undergoes a 48-hour quality audit for uniformity and surface integrity.",
                    icon: "✦",
                  },
                  {
                    step: "05",
                    title: "Protected Delivery",
                    desc: "Custom timber-crated slabs are shipped with structural foam insulation and GPS-tracked containers, arriving pristine and ready for installation.",
                    icon: "◉",
                  },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    className={`flex gap-6 p-6 border border-stone-200 bg-stone-50 hover:border-gold-300 hover:bg-white transition-all duration-300 reveal reveal-delay-${Math.min(idx + 1, 4)}`}
                  >
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <span className="font-serif text-2xl text-gold-500 leading-none">{item.icon}</span>
                      <div className="flex-1 w-[1px] bg-stone-200 mt-3" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-stone-400">
                          Step {item.step}
                        </span>
                        <div className="flex-1 h-[1px] bg-stone-200" />
                      </div>
                      <h3 className="font-serif text-xl font-light text-zinc-900 mb-2">{item.title}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== ABOUT METRICS ========== */}
        <section id="about" className="w-full py-24 px-6 md:px-16 border-t border-stone-100" style={{ background: "#fdf9f4" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: image collage */}
              <div className="relative h-[480px] reveal">
                <div className="absolute top-0 left-0 w-[65%] h-[75%] overflow-hidden shadow-xl">
                  <Image src="/room_living.png" alt="Luxury living with granite" fill sizes="40vw" className="object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-[50%] h-[55%] overflow-hidden shadow-xl border-4 border-white">
                  <Image src="/room_bathroom.png" alt="Granite spa bathroom" fill sizes="30vw" className="object-cover" />
                </div>
                {/* Floating tag */}
                <div className="absolute top-[60%] left-[30%] bg-white shadow-lg px-4 py-3 border-l-2 border-gold-500 reveal reveal-delay-2">
                  <span className="font-serif text-2xl text-gold-600 font-light block">450+</span>
                  <span className="text-[9px] tracking-widest uppercase text-stone-400 font-medium">Luxury Projects</span>
                </div>
              </div>

              {/* Right: text + metrics */}
              <div>
                <span className="section-label mb-3 block reveal">Trust & Accreditation</span>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-zinc-900 leading-tight mb-6 reveal reveal-delay-1">
                  Architectural Integrity<br /><em>Built Over Decades</em>
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed font-light mb-10 reveal reveal-delay-2">
                  The Granite Vault stands as a premier partner for international interior designers, luxury contractors, and private homeowners. Our expertise spans from intimate residential spaces to grand corporate lobbies and superyacht interiors.
                </p>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "15+", label: "Years Experience", desc: "Premium stone sourcing & processing expertise" },
                    { value: "450+", label: "Luxury Projects", desc: "Residences, hotels, corporates & yachts worldwide" },
                    { value: "100%", label: "Direct Import", desc: "No intermediaries — quarry direct to your site" },
                    { value: "10+", label: "Quarry Partners", desc: "Trusted partners in Brazil, India & Norway" },
                  ].map((m, i) => (
                    <div key={m.label} className={`reveal reveal-delay-${i + 1}`}>
                      <span className="font-serif text-4xl font-light text-gold-600 block leading-none mb-1">
                        {m.value}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-stone-700 block mb-1">
                        {m.label}
                      </span>
                      <span className="text-xs text-stone-400 font-light leading-relaxed">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CONTACT SECTION ========== */}
        <section id="contact" className="w-full bg-white py-24 px-6 md:px-16 border-t border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left: info + image */}
              <div className="w-full lg:w-[45%]">
                <span className="section-label mb-3 block reveal">Get in Touch</span>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-zinc-900 leading-tight mb-6 reveal reveal-delay-1">
                  Let&apos;s Build<br /><em>Something Beautiful</em>
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed font-light mb-8 reveal reveal-delay-2">
                  Have a premium project in mind? Arrange a showroom visit, request a sample delivery, or book a private consultation with our stone specialists.
                </p>

                {/* Contact details */}
                <div className="flex flex-col gap-4 mb-10 reveal reveal-delay-3">
                  {[
                    { label: "Call Us", value: "+91 98765 43210" },
                    { label: "Email", value: "hello@thegranitevault.com" },
                    { label: "Showroom", value: "Bengaluru, Karnataka, India" },
                    { label: "Hours", value: "Mon – Sat  9am – 7pm IST" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 items-baseline">
                      <span className="text-[9px] tracking-[0.25em] uppercase font-medium text-stone-400 w-20 flex-shrink-0">
                        {item.label}
                      </span>
                      <span className="text-sm text-zinc-800 font-light">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Kitchen image */}
                <div className="relative h-48 md:h-60 overflow-hidden shadow-lg reveal reveal-delay-4">
                  <Image src="/room_kitchen.png" alt="Granite in your kitchen" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="font-serif text-white text-lg italic font-light">Alaska White</span>
                    <span className="text-[9px] text-white/60 tracking-widest uppercase block">Kitchen Countertop</span>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="w-full lg:w-[55%]">
                <div className="bg-stone-50 border border-stone-200 p-8 md:p-12 reveal reveal-delay-1">
                  <h3 className="font-serif text-2xl font-light text-zinc-900 mb-6">
                    Book a Consultation
                  </h3>

                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Vikram Sharma"
                          className="w-full bg-white border border-stone-200 py-3 px-4 text-sm text-zinc-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 font-light transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1.5">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-stone-200 py-3 px-4 text-sm text-zinc-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 font-light transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full bg-white border border-stone-200 py-3 px-4 text-sm text-zinc-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 font-light transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1.5">
                        Project Type
                      </label>
                      <select className="w-full bg-white border border-stone-200 py-3 px-4 text-sm text-zinc-700 focus:outline-none focus:border-gold-400 font-light transition-colors duration-300 cursor-pointer appearance-none">
                        <option value="">Select your project type</option>
                        <option>Residential — Villa / Bungalow</option>
                        <option>Residential — Apartment</option>
                        <option>Commercial — Office</option>
                        <option>Hospitality — Hotel / Resort</option>
                        <option>Custom / Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1.5">
                        Granite of Interest
                      </label>
                      <select className="w-full bg-white border border-stone-200 py-3 px-4 text-sm text-zinc-700 focus:outline-none focus:border-gold-400 font-light transition-colors duration-300 cursor-pointer appearance-none">
                        <option value="">Select a granite</option>
                        <option>Cosmic Black</option>
                        <option>Alaska White</option>
                        <option>Titanium Grey</option>
                        <option>Patagonia</option>
                        <option>Blue Bahia</option>
                        <option>Coffee Brown</option>
                        <option>Emerald Pearl</option>
                        <option>Not sure — need advice</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-1.5">
                        Your Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project — space dimensions, application, timeline..."
                        className="w-full bg-white border border-stone-200 py-3 px-4 text-sm text-zinc-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 font-light transition-colors duration-300 resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center mt-2">
                      Send Consultation Request →
                    </button>

                    <p className="text-[9px] text-stone-400 text-center font-light tracking-wider">
                      We typically respond within 4 business hours. Your details are never shared.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="w-full py-16 px-6 md:px-16 border-t border-stone-200" style={{ background: "#f5f3ef" }}>
        <div className="max-w-7xl mx-auto">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="gv-mark" style={{ background: "transparent" }}>
                  <span>GV</span>
                </div>
                <span className="font-serif text-sm font-semibold tracking-[0.28em] text-zinc-900">
                  THE GRANITE VAULT
                </span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed max-w-xs font-light mb-5">
                Bringing nature&apos;s finest geological stones to life. Curating and crafting premium book-matched slabs for luxury architectural spaces worldwide.
              </p>
              <div className="flex gap-3">
                {["FB", "IG", "LN", "YT"].map((s) => (
                  <span
                    key={s}
                    className="w-7 h-7 border border-stone-200 flex items-center justify-center text-[9px] font-bold text-stone-400 hover:border-gold-400 hover:text-gold-600 cursor-pointer transition-all duration-300 uppercase"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-stone-400 mb-4">
                Navigate
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Home", id: "top" },
                  { label: "Walkthrough", id: "walkthrough" },
                  { label: "Collection", id: "collection" },
                  { label: "Sourcing", id: "sourcing" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => item.id === "top" ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollTo(item.id)}
                      className="text-xs text-stone-500 hover:text-gold-600 cursor-pointer transition-colors duration-300 bg-none border-none font-light"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collection */}
            <div>
              <h4 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-stone-400 mb-4">
                Collection
              </h4>
              <ul className="flex flex-col gap-2.5">
                {["Cosmic Black", "Alaska White", "Titanium Grey", "Patagonia", "Emerald Pearl", "Blue Bahia"].map((g) => (
                  <li key={g}>
                    <button
                      onClick={() => scrollTo("collection")}
                      className="text-xs text-stone-500 hover:text-gold-600 cursor-pointer transition-colors duration-300 bg-none border-none font-light text-left"
                    >
                      {g}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-stone-400 mb-4">
                Newsletter
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light mb-4">
                Stay updated on new quarry shipments and design projects.
              </p>
              <div className="flex border border-stone-200 bg-white">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2.5 text-xs text-zinc-700 placeholder-stone-300 focus:outline-none font-light bg-transparent"
                />
                <button
                  onClick={() => alert("Thank you for subscribing!")}
                  className="px-3 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs cursor-pointer transition-colors duration-300"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-stone-400 font-light">
              © {new Date().getFullYear()} The Granite Vault. All rights reserved. Crafted with nature.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((link) => (
                <span
                  key={link}
                  className="text-[10px] text-stone-400 hover:text-gold-600 cursor-pointer transition-colors duration-300"
                >
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
