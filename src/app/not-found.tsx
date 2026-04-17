"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#fa695c] opacity-[0.03] blur-[150px]" />
      </div>

      {/* Brand mark */}
      <Link
        href="/"
        className="absolute top-8 left-8 font-black text-2xl tracking-tighter text-white flex items-baseline hover:opacity-80 transition-opacity"
      >
        PK
        <span className="text-[#fa695c] font-black text-3xl leading-none ml-[2px]">
          .
        </span>
      </Link>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Giant 404 */}
        <h1 className="text-[clamp(8rem,25vw,16rem)] font-black leading-none tracking-tighter text-white select-none">
          4
          <span className="inline-block text-[#fa695c] relative">
            0
            {/* Glitch flicker */}
            <span className="absolute inset-0 text-[#fa695c] opacity-20 animate-pulse blur-[2px]">
              0
            </span>
          </span>
          4
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-bold tracking-tight text-white/80 -mt-4 md:-mt-6">
          Page Not Found
        </p>

        {/* Description */}
        <p className="mt-4 text-sm md:text-base text-white/40 max-w-md leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to a different URL.
        </p>

        {/* Back to Home button */}
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#fa695c] hover:border-[#fa695c] hover:shadow-[0_0_40px_rgba(250,105,92,0.3)] hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
