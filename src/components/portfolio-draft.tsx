"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  FolderGit2,
  Mail,
  Menu,
  Sparkles,
  X,
  Sun,
  Moon,
  Briefcase,
  Leaf,
  Gamepad2,
  Smile,
  GraduationCap,
  Award,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { siteData, type ProjectPreview, type SocialItem } from "@/lib/portfolio-draft-data";

// ─── Custom Magnetic Icon Component ───
function MagneticIcon({ tooltip, iconUrl, altText }: { tooltip: string; iconUrl: string; altText: string; }) {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const ref = useRef<HTMLDivElement>(null);
 
   const handleMouseMove = (e: React.MouseEvent) => {
     if (!ref.current) return;
     const { clientX, clientY } = e;
     const { top, left, width, height } = ref.current.getBoundingClientRect();
     const centerX = left + width / 2;
     const centerY = top + height / 2;
     
     // Magnetic pull strictly inside icon container bounds
     const moveX = (clientX - centerX) * 0.4;
     const moveY = (clientY - centerY) * 0.4;
     setPosition({ x: moveX, y: moveY });
   };
 
   const handleMouseLeave = () => {
     // Spring back to center smoothly
     setPosition({ x: 0, y: 0 });
   };
 
   return (
     <div
       ref={ref}
       onMouseMove={handleMouseMove}
       onMouseLeave={handleMouseLeave}
       className="relative group/icon flex flex-col items-center justify-center p-2 cursor-pointer"
     >
       <div 
         className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-200 ease-out z-10 relative flex items-center justify-center filter drop-shadow hover:drop-shadow-lg"
         style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${position.x !== 0 ? 1.15 : 1})` }}
       >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={iconUrl} 
            alt={altText} 
            width={40}
            height={40}
            loading="lazy"
            className="w-full h-full object-contain grayscale opacity-80 dark:opacity-60 transition-all duration-300 group-hover/icon:grayscale-0 group-hover/icon:opacity-100" 
          />
       </div>
       <span className="absolute -top-7 bg-[#2b2929] border border-[var(--border-strong)] text-white text-[0.65rem] font-bold tracking-widest px-3 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none uppercase z-20">
         {tooltip}
       </span>
     </div>
   );
 }

// ─── Custom Fluid Cursor ───
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    
    // Hide default cursor globally
    document.documentElement.classList.add("cursor-none");
    
    // GSAP quickTo for 60fps tracking without state lag
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Expand cursor on interactive elements
    const handleHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .hover-target, .cursor-pointer')) {
         gsap.to(cursorRef.current, { scale: 3.5, backgroundColor: "transparent", border: "1px solid #fa695c", duration: 0.3 });
      }
    };
    
    const handleHoverOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .hover-target, .cursor-pointer')) {
         gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#fa695c", border: "none", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverIn);
    window.addEventListener("mouseout", handleHoverOut);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverIn);
      window.removeEventListener("mouseout", handleHoverOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-[#fa695c] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block transform -translate-x-1/2 -translate-y-1/2 will-change-transform" 
    />
  );
}

// ─── Preloader Component (Pure CSS @keyframes – zero JS dependency) ───
function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Fire onComplete after CSS animation finishes (2.5s)
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-[#09090b] flex flex-col items-center justify-center preloader-container">
      <div className="text-6xl md:text-8xl font-black tracking-tighter text-white flex items-baseline preloader-text">
        PK <span className="text-[#fa695c] ml-2 text-7xl md:text-9xl leading-none">.</span>
      </div>
    </div>
  );
}

export function PortfolioDraft() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showAllJourney, setShowAllJourney] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroTlRef = useRef<gsap.core.Timeline | null>(null);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global GSAP Context (ScrollTriggers)
  // This runs regardless of isLoading so masks are ready.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        /* ── Hero Entrance: GPU-optimized for mobile ── */
        const heroTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out", force3D: true } });

        heroTimeline
          .fromTo(
            ".hero-badge",
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 0.1 }
          )
          .fromTo(
            ".hero-title-letter",
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.03 },
            "-=0.3"
          )
          .fromTo(
            ".hero-support",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
            "-=0.3"
          );

        heroTlRef.current = heroTimeline;

        /* ── Radar Pulse on Contact CTA ── */
        gsap.to(".talk-pulse-ring", {
          scale: 2.5,
          opacity: 0,
          duration: 2.5,
          ease: "power2.out",
          repeat: -1,
          stagger: 1.25,
        });
      }

      /* ── Scroll-triggered Reveals (GPU-friendly: transform + opacity only) ── */
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          once: true,
          onEnter: () => {
             gsap.fromTo(block, 
               { y: 40, opacity: 0 },
               { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", force3D: true, clearProps: "all" }
             );
          },
        });
      });

      /* ── Custom About Section Reveal (Horizontal Slide In) ── */
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section-container",
          start: "top 80%",
          once: true,
        }
      });
      // gsap natively applies these starting positions immediately on load, solving the flash issue.
      aboutTl.fromTo(".about-portrait-panel", 
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", force3D: true }
      )
      .fromTo(".about-text-panel", 
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", force3D: true },
        "-=0.7"
      );

      /* ── Custom Journey Timeline Reveal (Staggered Draw) ── */
      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".journey-section-container",
          start: "top 80%",
          once: true,
        }
      });
      journeyTl.fromTo(".journey-title", 
         { y: 30, opacity: 0 },
         { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(".journey-line", 
         { scaleY: 0, transformOrigin: "top" },
         { scaleY: 1, duration: 1.5, ease: "power4.out" },
         "-=0.5" 
      )
      .fromTo(".journey-item", 
         { x: -50, opacity: 0 },
         { x: 0, opacity: 1, duration: 0.8, stagger: 0.25, ease: "power3.out" },
         "-=1.0"
      );

      /* ── Works Counter Stagger (left ↔ right) ── */
      const workCards = gsap.utils.toArray<HTMLElement>(".works-card");
      workCards.forEach((card) => {
        const isFromLeft = card.classList.contains("works-from-left");
        const isFromRight = card.classList.contains("works-from-right");
        const xStart = isFromLeft ? -80 : isFromRight ? 80 : 0;
        const yStart = (!isFromLeft && !isFromRight) ? 60 : 30;

        gsap.fromTo(card,
          { x: xStart, y: yStart, opacity: 0 },
          {
            x: 0, y: 0, opacity: 1,
            duration: 1, ease: "power3.out", force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* ── Skills Typewriter Reveal (title → desc → icons) ── */
      const skillCards = gsap.utils.toArray<HTMLElement>(".skill-card");
      skillCards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(card,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true }
        )
        .fromTo(card.querySelector(".skill-title")!,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(card.querySelector(".skill-desc")!,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(card.querySelectorAll(".skill-icon"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: "back.out(1.7)", force3D: true },
          "-=0.1"
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Hero Entrance GSAP - Play after preloader CSS animation finishes
  useEffect(() => {
    if (heroTlRef.current) {
        // Delay matches preloader CSS animation (2.5s)
        setTimeout(() => {
            heroTlRef.current?.play();
        }, 2600);
    }
  }, []);

  return (
    <>
      <CustomCursor />
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* 
        This aside must remain strictly outside the `id="top"` wrapper 
        because the wrapper uses Tailwind scale-100 which triggers a 
        transform containing block, breaking `position: fixed` relative to viewport! 
      */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden flex-col items-center gap-4 lg:flex pointer-events-auto backdrop-blur-xl bg-[var(--bg-elevated)]/80 border border-[var(--border)] py-6 px-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {siteData.social.map((item) => (
          <SocialLink key={item.label} item={item} variant="sidebar" />
        ))}
      </aside>


      <div 
        ref={rootRef}
        className={`relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)] transition-all ease-out duration-1000 font-display opacity-100 scale-100`}
        id="top"
      >
        {/* ── Ambient glow ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[var(--accent-glow)] blur-[120px]" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[var(--accent-glow)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 sm:px-10 lg:px-16">
        {/* ═══════════════ HEADER ═══════════════ */}
        <header className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a className="group font-black text-2xl tracking-tighter brand-mark text-[var(--text-primary)] flex items-baseline relative" href="#top">
              <span>{siteData.brand}</span>
              <span className="text-[#fa695c] font-black text-3xl leading-none ml-[2px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">.</span>
            </a>
            <a className="group hidden items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] transition-all duration-300 hover:border-[#fa695c] hover:shadow-[0_0_15px_rgba(250,105,92,0.15)] lg:flex" href={`mailto:${siteData.email}`}>
              <span className="mr-3 border-r border-[var(--border)] pr-3 transition-colors duration-300 group-hover:border-[#fa695c]/30">
                <Mail className="h-3.5 w-3.5 transition-colors duration-300 group-hover:text-[#fa695c]" />
              </span>
              <span className="relative inline-flex overflow-hidden">
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                  {siteData.email}
                </span>
                <span className="absolute left-0 top-0 inline-block translate-y-full text-[#fa695c] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0">
                  Click To Email
                </span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6">
             <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {siteData.nav.map((item) => (
                  <a key={item.label} className="relative group px-1 py-1 flex items-center transition-colors" href={item.href}>
                    <span className="relative inline-block overflow-hidden">
                       <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                         {item.label}
                       </span>
                       <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 text-[var(--text-primary)]">
                         {item.label}
                       </span>
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#fa695c] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"></span>
                  </a>
                ))}
            </nav>

            <button
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition-all overflow-hidden hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] shadow-sm hover:scale-105 active:scale-95"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className={`absolute h-4 w-4 transition-all duration-500 ${theme === "dark" ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
                <Moon className={`absolute h-4 w-4 transition-all duration-500 ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`} />
              </button>

            <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:hidden ${menuOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>
          <div className="overflow-hidden">
            <div className="relative z-20 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                {siteData.nav.map((item) => (
                  <a key={item.label} className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]" href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ MAIN ═══════════════ */}
        <main className="relative z-10 pt-20 lg:pt-32 lg:pl-20">
          
          {/* ── HERO ── */}
          <section className="pb-12 lg:pb-40 overflow-hidden flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0 mt-8 mb-8" id="hero">
            {/* Left Side: Text and CTA */}
            <div className="flex-1 max-w-[55rem] lg:max-w-[50%] lg:pr-8 order-2 lg:order-1 pt-4 sm:pt-6 lg:pt-0">
              <div className="hero-badge inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[#2b2929] px-5 py-2 text-xs font-bold tracking-widest uppercase text-white shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                {siteData.hero.badge}
              </div>

              <h1 className="mt-10 text-[clamp(2.5rem,5vw,6rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] font-black flex flex-wrap">
                 {siteData.hero.titleTop.split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="overflow-hidden inline-flex mr-4 pb-4 -mb-4">
                      {Array.from(word).map((char, cIdx) => (
                         <span className="hero-title-letter inline-block" key={`${wIdx}-${cIdx}`}>{char}</span>
                      ))}
                    </span>
                 ))}
              </h1>

              <div className="hero-support flex flex-col gap-6 mt-10">
                <p className="text-xl font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                  {siteData.hero.role}
                </p>
                <p className="max-w-lg text-lg leading-[1.8] text-[var(--text-muted)]">
                  {siteData.hero.body}
                </p>
              </div>

              <div className="hero-support mt-16 ml-4 md:ml-12">
                <a className="group flex items-center" href="#contact">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                     {/* Solid Red Pulse */}
                     <span className="absolute h-full w-full rounded-full bg-[#fa695c] opacity-40 animate-ping" style={{ animationDuration: '3s' }}></span>
                     
                     <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#fa695c] text-white transition-transform duration-300 group-hover:scale-105 shadow-xl text-center leading-tight">
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-loose">
                           let's <br /> talk
                        </span>
                     </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Portrait Image */}
            <div className="flex-1 hero-support flex justify-center lg:justify-end relative order-1 lg:order-2 mt-2 lg:mt-0">
               <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[450px] lg:max-w-[550px] z-10 mx-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex justify-center items-center overflow-hidden lg:overflow-visible">
                  {siteData.hero.image && (
                     <div className="relative w-full h-[36vh] min-h-[16rem] max-h-[24rem] sm:h-[46vh] sm:min-h-[20rem] sm:max-h-[28rem] md:h-[64vh] lg:h-[85vh] lg:max-h-none">
                       <Image 
                         src={siteData.hero.image} 
                         alt="Portrait" 
                         fill
                         priority
                         loading="eager"
                         sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 50vw"
                         className="object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
                         style={{
                            maskImage: 'linear-gradient(to top, transparent 2%, transparent 10%, black 40%)',
                            WebkitMaskImage: 'linear-gradient(to top, transparent 2%, transparent 10%, black 40%)'
                         }}
                       />
                     </div>
                  )}
               </div>
            </div>
          </section>

          {/* ── ABOUT (README) ── */}
          <section className="scroll-mt-32 mt-16 md:mt-48 relative about-section-container" id="about">
             <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 overflow-hidden px-4 md:px-0">
                {/* Portrait */}
                <div className="about-portrait-panel relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:h-[600px] bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg)] rounded-[2.5rem] overflow-hidden border border-[var(--border)] flex items-end justify-center shadow-2xl group">
                   {/* Soft Inner Glow */}
                   <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 aspect-square rounded-full bg-[#fa695c] opacity-[0.05] blur-3xl transition-opacity duration-700 group-hover:opacity-[0.1]"></div>
                   
                   {/* Subtle backdrop arch for structural depth */}
                   <div className="absolute inset-x-8 bottom-0 top-32 rounded-t-[50%] border-t border-x border-[var(--border-strong)] opacity-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:top-28 group-hover:opacity-30"></div>
                   
                   {/* Bottom Gradient Fade */}
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent z-10 pointer-events-none opacity-90"></div>

                   <div className="relative z-10 w-full h-[95%] transition-transform duration-700 ease-out group-hover:scale-105 origin-bottom">
                     <Image 
                        src="/about-me-transparent.png" 
                        alt="About Me Portrait" 
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                     />
                   </div>
                </div>
                
                {/* Facts & Bio */}
                <div className="flex flex-col justify-center about-text-panel">
                   <ul className="flex flex-col gap-5 mb-16">
                      {siteData.about.facts.map((fact, index) => {
                         const FactIconMap: Record<string, any> = {
                           sparkles: Sparkles, briefcase: Briefcase, sprout: Leaf, gamepad: Gamepad2, smile: Smile
                         };
                         const Icon = FactIconMap[fact.icon] || Sparkles;
                         return (
                           <li key={index} className="flex items-start gap-4 text-[var(--text-secondary)] group">
                              <Icon className="w-5 h-5 text-[var(--text-primary)] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                              <div className="text-sm md:text-base leading-relaxed">
                                 {fact.prefix && <span className="font-bold text-[var(--text-primary)] mr-2">{fact.prefix}</span>}
                                 {fact.highlight && <span className="underline underline-offset-4 decoration-[var(--border-strong)] transition-colors hover:text-[var(--text-primary)]">{fact.highlight}</span>}
                                 {fact.suffix && <span className="ml-1">{fact.suffix}</span>}
                              </div>
                           </li>
                         );
                      })}
                   </ul>

                   <div className="mb-8 relative">
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-[var(--text-primary)] relative inline-block">
                         {siteData.about.title}
                         <div className="absolute -bottom-4 left-0 w-16 h-1 bg-[#fa695c] rounded-full"></div>
                      </h2>
                   </div>

                   <div className="flex flex-col gap-6 mt-8">
                      {siteData.about.paragraphs.map((p, index) => (
                         <p key={index} className="text-base md:text-lg leading-[1.8] text-[var(--text-secondary)]">
                            {p}
                         </p>
                      ))}
                   </div>

                   <div className="mt-12 flex justify-start">
                      <a 
                         href={(siteData as any).resumeUrl || "/Pyae_Phyoe_Kyaw_CV.pdf"} 
                         download="Pyae_Phyoe_Kyaw_CV.pdf"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="group flex items-center gap-4 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg)] font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:bg-[#fa695c] hover:text-white shadow-xl hover:shadow-[#fa695c]/30"
                      >
                         Download CV
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </a>
                   </div>
                </div>
             </div>
          </section>

          {/* ── MY JOURNEY ── */}
          <section className="scroll-mt-32 mt-32 md:mt-48 relative mb-24 journey-section-container" id="journey">
             <div className="max-w-4xl mx-auto">
                <h2 className="journey-title text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-tight text-[var(--text-primary)] mb-16 text-center">
                   My Journey
                </h2>
                
                <div className="relative ml-4 md:ml-8 pl-8 md:pl-16 flex flex-col gap-12 py-4">
                   {/* Gradient beam line replacing simple border */}
                   <div className="journey-line absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-[#fa695c] via-[var(--border-strong)] to-transparent rounded-full opacity-60"></div>

                   {/* @ts-ignore */}
                   {(showAllJourney ? siteData.about.journey : siteData.about.journey?.slice(0, 3)).map((item: any, index: number) => {
                      const JourneyIconMap: Record<string, any> = {
                         education: GraduationCap, certificate: Award, experience: Briefcase
                      };
                      const Icon = JourneyIconMap[item.type] || Briefcase;
                      const isPresent = item.year.toLowerCase().includes("present");

                      return (
                         <div key={index} className="relative group journey-item">
                            {/* Timeline Dot (Pulsing if Present) */}
                            <div className={`absolute -left-[2.85rem] md:-left-[4.85rem] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 z-10 top-0 md:top-2 shadow-[0_0_0_8px_var(--bg)] 
                               ${isPresent 
                                  ? 'bg-[#fa695c] text-white border-none shadow-[0_0_20px_rgba(250,105,92,0.4)] group-hover:scale-110' 
                                  : 'bg-[var(--bg)] border-2 border-[var(--border-strong)] text-[var(--text-secondary)] group-hover:border-[var(--text-primary)] group-hover:text-[var(--text-primary)] group-hover:scale-110'
                               }`}
                            >
                               {/* Pulsing ring for active job */}
                               {isPresent && (
                                  <span className="absolute inset-0 rounded-full border border-[#fa695c] animate-ping opacity-50"></span>
                               )}
                               <Icon className="w-4 h-4 relative z-10" />
                            </div>

                            {/* Content Card (Editorial Style) */}
                            <div className={`relative p-8 sm:p-10 transition-all duration-500 overflow-hidden ${
                               isPresent 
                               ? 'rounded-[2rem] bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border)] shadow-xl group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:-translate-y-1' 
                               : 'rounded-3xl border border-transparent hover:bg-[var(--bg-card)] hover:border-[var(--border)]'
                            }`}>
                               
                               <span className={`inline-block px-4 py-1.5 mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm
                                  ${isPresent ? 'bg-[#fa695c]/10 text-[#fa695c] border border-[#fa695c]/20' : 'bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text-secondary)]'} 
                               `}>
                                  {item.year}
                               </span>
                               
                               <h3 className="text-lg md:text-xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[#fa695c] transition-colors duration-300">
                                  {item.title}
                               </h3>
                               
                               {item.subtitle && (
                                  <p className="font-bold uppercase tracking-widest text-[var(--text-muted)] text-[0.65rem] mt-3">
                                     {item.subtitle}
                                  </p>
                               )}
                            </div>
                         </div>
                      );
                   })}
                </div>

                {/* Show More / Less Toggle Button */}
                {siteData.about.journey && siteData.about.journey.length > 3 && (
                   <div className="mt-16 flex justify-center relative z-20">
                      <button 
                         onClick={() => setShowAllJourney(!showAllJourney)}
                         className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold text-xs uppercase tracking-[0.2em] hover:border-[#fa695c] hover:bg-[#fa695c] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(250,105,92,0.2)] hover:-translate-y-1"
                      >
                         <span>{showAllJourney ? "Show Less" : "View Full Journey"}</span>
                         {/* Animated Plus/Minus icon logic could go here, but text is very clear */}
                      </button>
                   </div>
                )}
             </div>
          </section>

          {/* ── SKILLS ── */}
          <section className="reveal-block scroll-mt-32 relative mt-32 md:mt-48" id="skills">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-tight text-[var(--text-primary)]">
              {siteData.skills.title}
            </h2>
            <p className="mt-4 text-lg font-medium text-[var(--text-secondary)]">{siteData.skills.eyebrow}</p>
            <div className="mt-5 w-16 h-1 bg-[#fa695c] rounded-full"></div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
               {siteData.skills.groups.map((group, index) => {
                  const techCat = siteData.skills.techCategories[index];
                  // Revised Proportions to balance text heights (7-5 and 5-7 grid logic)
                  // 0: Backend (Span 7) | 1: Database (Span 5)
                  // 2: Frontend (Span 5) | 3: DevOps (Span 7)
                  const bentoClasses = [
                     "md:col-span-12 lg:col-span-7",
                     "md:col-span-12 lg:col-span-5",
                     "md:col-span-12 lg:col-span-5",
                     "md:col-span-12 lg:col-span-7",
                  ];
                  const bentoClass = bentoClasses[index] || "col-span-12";

                  return (
                     <SpotlightCard key={group.title} className={`skill-card ${bentoClass} rounded-[2rem] md:rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden flex flex-col p-6 sm:p-8 transition-all duration-500 hover:border-[#fa695c] hover:shadow-[0_20px_40px_rgba(250,105,92,0.1)] group relative`}>
                        
                        {/* Film Grain Noise Texture */}
                        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
                           <filter id={`noiseFilter-${index}`}>
                              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                           </filter>
                           <rect width="100%" height="100%" filter={`url(#noiseFilter-${index})`} />
                        </svg>

                        {/* Subtle Ambient Glow Orb */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#fa695c] opacity-[0.08] dark:opacity-[0.03] rounded-full blur-[70px] pointer-events-none z-0 transition-opacity duration-700 group-hover:opacity-[0.15] dark:group-hover:opacity-[0.07]"></div>

                        {/* Content Area */}
                        <div className="relative z-10 flex-1 flex flex-col">
                           <div className="flex justify-between items-start mb-4">
                              <h3 className="skill-title text-lg md:text-xl font-black text-[var(--text-primary)] tracking-tight group-hover:text-[#fa695c] transition-colors">{group.title}</h3>
                              <Sparkles className="w-5 h-5 text-[#fa695c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-4" />
                           </div>
                           <p className="skill-desc text-sm md:text-base leading-[1.7] text-[var(--text-secondary)] drop-shadow-sm">{group.description}</p>
                        </div>

                        {/* Bento Icon Dock Area */}
                        <div className="relative z-10 mt-8 pt-5 border-t border-[var(--border-strong)] border-dashed flex flex-wrap items-center gap-2">
                           {/* @ts-ignore */}
                           {techCat?.skills.map((skill: any, i: number) => (
                              <div key={skill.name} className={`skill-icon ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}>
                                 <MagneticIcon 
                                    tooltip={skill.name} 
                                    iconUrl={skill.icon} 
                                    altText={skill.name} 
                                 />
                              </div>
                           ))}
                        </div>
                     </SpotlightCard>
                  );
               })}
            </div>
          </section>

          {/* ── WORKS ── */}
          <section className="reveal-block scroll-mt-32 mt-32 sm:mt-48" id="works">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-tight text-[var(--text-primary)]">
              {siteData.works.title}
            </h2>
            <div className="mt-5 w-16 h-1 bg-[#fa695c] rounded-full"></div>

            <div className="mt-16 grid gap-6 md:gap-8 md:grid-cols-12">
              {siteData.works.webProjects.map((project, index) => {
                
                // Asymmetrical Project Layout (5 Projects Total)
                // 0: Masterpiece (Span 12)
                // 1, 2: Standard halves (Span 6, Span 6)
                // 3, 4: Asymmetric bases (Span 5, Span 7)
                let spanClass = "md:col-span-12 lg:col-span-6";
                if (index === 0) spanClass = "md:col-span-12";
                else if (index === 3) spanClass = "md:col-span-12 lg:col-span-5";
                else if (index === 4) spanClass = "md:col-span-12 lg:col-span-7";

                return (
                  <article 
                    key={project.title} 
                    className={`works-card ${index === 0 ? '' : index % 2 !== 0 ? 'works-from-left' : 'works-from-right'} group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] p-1.5 md:p-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-[#fa695c] ${spanClass}`}
                    style={{ 
                      '--project-accent': project.palette[2],
                      '--project-bg': project.palette[0]
                    } as React.CSSProperties}
                  >
                     {/* Ambient Hover Glow from Bottom Center */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at 50% 120%, var(--project-accent) 0%, transparent 60%)' }}></div>
                     
                     {/* Glass Mockup Container (Fixed Height to prevent bloating) */}
                     <div className={`relative w-full overflow-hidden rounded-[1.5rem] bg-[var(--bg-elevated)] flex items-end justify-center transition-colors duration-500 p-4 md:p-8 pb-0 z-10 ${index === 0 ? 'h-56 md:h-72' : 'h-48 md:h-64'}`}>
                        
                        {/* Abstract UI Glass Element */}
                        <div className={`rounded-t-2xl bg-white/90 dark:bg-[var(--bg-card)]/40 backdrop-blur-md shadow-[0_-15px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.3)] border border-[var(--border)] border-b-0 flex flex-col overflow-hidden transition-all duration-700 group-hover:translate-y-2 group-hover:border-[var(--project-accent)]/40 ${index === 0 ? 'w-[75%] md:w-[60%] h-[90%]' : 'w-[85%] h-[85%]'}`}>
                            {/* Mockup Toolbar */}
                            <div className="h-6 md:h-8 border-b border-[var(--border-strong)]/30 bg-black/5 dark:bg-white/5 flex items-center px-4 gap-1.5">
                               <div className="w-2 h-2 rounded-full bg-[#fa695c]/60"></div>
                               <div className="w-2 h-2 rounded-full bg-[#facc15]/60"></div>
                               <div className="w-2 h-2 rounded-full bg-[#4ade80]/60"></div>
                            </div>
                            {/* Mockup Body Skeletons */}
                            <div className="flex-1 p-4 md:p-6 flex flex-col gap-3 md:gap-4 opacity-30 mix-blend-luminosity transition-opacity duration-300 group-hover:opacity-100">
                               <div className="w-1/3 h-3 md:h-4 rounded-full bg-[var(--project-accent)]"></div>
                               <div className="w-3/4 h-2 md:h-2.5 rounded-full bg-[var(--border-strong)] mt-2"></div>
                               <div className="w-2/3 h-2 md:h-2.5 rounded-full bg-[var(--border-strong)]"></div>
                               <div className="w-1/2 h-2 md:h-2.5 rounded-full bg-[var(--border-strong)]"></div>
                            </div>
                        </div>
                     </div>

                     {/* Content Info */}
                     <div className={`relative z-10 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mt-2 ${index === 0 ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}>
                        <div className="flex-1">
                           <h4 className="text-xl md:text-2xl font-black tracking-tight text-[var(--text-primary)] transition-colors duration-300">{project.title}</h4>
                           {project.subtitle && <p className="font-bold text-[0.6rem] md:text-xs uppercase tracking-[0.2em] text-[#fa695c] mt-2">{project.subtitle}</p>}
                           <p className="text-sm md:text-base leading-[1.7] text-[var(--text-secondary)] mt-4 max-w-2xl">{project.description}</p>
                           
                           {/* Tech Stack Pills (Moved out of picture to allow high number of tags safely) */}
                           <div className="flex flex-wrap gap-2 mt-6">
                             {project.stack?.map(tech => (
                                <span key={tech} className="px-2.5 py-1 text-[0.6rem] font-bold tracking-widest uppercase rounded border border-[var(--border-strong)] bg-transparent text-[var(--text-muted)] transition-colors duration-300 hover:border-[#fa695c] hover:text-[#fa695c] cursor-default">
                                   {tech}
                                </span>
                             ))}
                           </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="shrink-0 group/btn self-start md:self-end mt-2 md:mt-0">
                           {project.link ? (
                             <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[var(--border-strong)] bg-transparent flex items-center justify-center transition-all duration-300 group-hover:bg-[#fa695c] group-hover:border-[#fa695c] group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(250,105,92,0.2)] text-[var(--text-primary)] relative overflow-hidden">
                               <ArrowUpRight className="w-5 h-5 absolute transition-all duration-300 group-hover/btn:translate-x-10 group-hover/btn:-translate-y-10" />
                               <ArrowUpRight className="w-5 h-5 absolute -translate-x-10 translate-y-10 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                             </a>
                           ) : (
                             <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[var(--border-strong)] bg-transparent flex items-center justify-center transition-all duration-300 group-hover:bg-[#fa695c] group-hover:border-[#fa695c] group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(250,105,92,0.2)] text-[var(--text-primary)] relative overflow-hidden">
                               <ArrowUpRight className="w-5 h-5 absolute transition-all duration-300 group-hover/btn:translate-x-10 group-hover/btn:-translate-y-10" />
                               <ArrowUpRight className="w-5 h-5 absolute -translate-x-10 translate-y-10 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                             </div>
                           )}
                        </div>
                     </div>
                  </article>
                );
              })}
            </div>
          </section>

        </main>

          {/* ── MASSIVE FOOTER / CONTACT ── */}
          <footer className="relative mt-32 md:mt-48 pt-32 pb-10 border-t border-[var(--border-strong)] overflow-hidden" id="contact">
            {/* Massive Ambient Glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent-glow)] blur-[150px] rounded-full opacity-60"></div>
            
            <div className="container mx-auto px-6 lg:px-16 flex flex-col items-center text-center relative z-10 mb-32">
               <h2 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter text-[var(--text-primary)] mb-8 uppercase">
                 Let's Work <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa695c] via-red-500 to-purple-600">Together</span>
               </h2>
               
               <p className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] font-medium mb-16 md:mb-24">
                 {siteData.contact.body}
               </p>
               
               <a 
                  href={`mailto:${siteData.email}`} 
                  className="group hover-target relative flex items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border)] text-[var(--text-primary)] hover:bg-[#fa695c] hover:border-[#fa695c] hover:text-white transition-all duration-500 ease-out shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_80px_rgba(250,105,92,0.4)] hover:-translate-y-2 cursor-pointer z-20"
               >
                  <div className="flex flex-col items-center gap-2">
                     <span className="text-sm md:text-lg font-black uppercase tracking-widest">Get In Touch</span>
                     <div className="relative overflow-hidden w-8 h-8">
                        <ArrowUpRight className="w-8 h-8 absolute transition-all duration-500 group-hover:translate-x-10 group-hover:-translate-y-10" />
                        <ArrowUpRight className="w-8 h-8 absolute -translate-x-10 translate-y-10 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                     </div>
                  </div>
                  {/* Radar Pulse Rings */}
                  <div className="pointer-events-none absolute inset-0 rounded-full border border-[var(--border-strong)] talk-pulse-ring"></div>
                  <div className="pointer-events-none absolute inset-0 rounded-full border border-[var(--border-strong)] talk-pulse-ring delay-500"></div>
               </a>
            </div>

            {/* Sub-footer Layer */}
            <div className="container mx-auto px-6 lg:px-16 pt-16 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                <a href="#top" className="font-black text-3xl tracking-tighter text-[var(--text-primary)] flex items-baseline hover:opacity-80 transition-opacity cursor-pointer">
                   PK <span className="text-[#fa695c] ml-1 text-4xl leading-none">.</span>
                </a>
                
                <p className="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] order-3 md:order-2">
                  &copy; {new Date().getFullYear()} PK Portfolio. All rights reserved.
                </p>
                
                <div className="flex gap-4 order-2 md:order-3">
                   {siteData.social.map(s => (
                     <SocialLink key={s.label} item={s} variant="rail" />
                   ))}
                </div>
            </div>
          </footer>

      </div>
    </div>
    </>
  );
}

function SocialLink({ item, variant }: { item: SocialItem; variant: "sidebar" | "rail" | "button" }) {
  let hoverColorClass = "group-hover:text-[var(--text-primary)] group-hover:bg-[var(--border)]";
  if (item.icon === "linkedin") hoverColorClass = "group-hover:text-[#0077b5] group-hover:bg-[#0077b5]/10 dark:group-hover:bg-[#0077b5]/20 dark:group-hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.5)]";
  if (item.icon === "facebook") hoverColorClass = "group-hover:text-[#1877F2] group-hover:bg-[#1877F2]/10 dark:group-hover:bg-[#1877F2]/20 dark:group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.5)]";
  if (item.icon === "github") hoverColorClass = "group-hover:text-black group-hover:bg-black/10 dark:group-hover:text-white dark:group-hover:bg-white/20 dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";
  if (item.icon === "mail") hoverColorClass = "group-hover:text-[#fa695c] group-hover:bg-[#fa695c]/10 dark:group-hover:bg-[#fa695c]/20 dark:group-hover:drop-shadow-[0_0_8px_rgba(250,105,92,0.5)]";

  return (
    <a className={`group relative inline-flex w-10 h-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 text-[var(--text-secondary)] ${hoverColorClass}`} href={item.href} target="_blank" rel="noopener noreferrer">
      {item.icon === "facebook" ? (
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-colors duration-300"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      ) : item.icon === "linkedin" ? (
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-colors duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      ) : item.icon === "github" ? (
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-colors duration-300"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      ) : (
         <Mail className="h-5 w-5 transition-colors duration-300" />
      )}

      {variant === "sidebar" && (
        <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border)] text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-primary)] rounded shadow-[0_4px_12px_rgba(0,0,0,0.1)] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap pointer-events-none before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[5px] before:w-0 before:h-0 before:border-y-[5px] before:border-y-transparent before:border-r-[5px] before:border-r-[var(--border)]">
           {item.label}
        </span>
      )}
    </a>
  );
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <article 
      className={`spotlight-wrapper ${className}`} 
      onMouseMove={handleMouseMove}
    >
      <div className="spotlight-overlay z-0 rounded-[inherit]"></div>
      {children}
    </article>
  );
}
