"use client";

import { useState } from "react";

export default function InteractiveHero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[90vh] min-h-[650px] overflow-hidden bg-neutral-950 flex items-center justify-center cursor-crosshair border-y border-black/10 shadow-inner"
    >
      {/* 
        LAYER 1: Default State (Everything is heavily blurred: background + text) 
      */}
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 filter blur-[12px]"
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1800&auto=format&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-black/50 filter blur-[12px] pointer-events-none" />

      {/* Default Blurred Text Layer */}
      <div className="absolute z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-none filter blur-[10px] transition-opacity duration-300"
           style={{ opacity: isHovered ? 0 : 1 }}
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-md mb-4 border border-white/15">
            Sony A6400 Shooter
          </div>
          <h1 className="text-6xl sm:text-8xl font-light tracking-tight text-white leading-none">
            chas.<span className="font-semibold">arw</span>
          </h1>
        </div>
        <div className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
          <p>
            Hello, I am Chas, a photographer capturing moments with intention. My passion for photography stems from a desire to freeze fleeting emotions, raw street stories, and timeless memories through the lens of my Sony A6400.
          </p>
        </div>
      </div>

      {/* 
        LAYER 2: Interactive Spotlight Focus Area (Unblurred background + text right under mouse) 
      */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 overflow-hidden flex items-center justify-center"
        style={{ 
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
        }}
      >
        {/* Sharp Background Image inside Spotlight */}
        <div className="absolute inset-0 bg-cover bg-center scale-105"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1800&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-black/35" />

        {/* Sharp Text Layer inside Spotlight */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-md mb-4 border border-white/30 shadow-lg">
              Sony A6400 Shooter
            </div>
            <h1 className="text-6xl sm:text-8xl font-light tracking-tight text-white leading-none drop-shadow-md">
              chas.<span className="font-semibold">arw</span>
            </h1>
          </div>
          <div className="text-white text-base sm:text-lg leading-relaxed font-light drop-shadow-sm">
            <p>
              Hello, I am Anjobhel Achas, a freelance-photographer capturing moments with intention. My passion for photography stems from a desire to freeze fleeting emotions, raw street stories, and timeless memories through the lens of my Sony A6400.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Grid Overlay for Camera Viewfinder Look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Interactive Focus Reticle (Follows Mouse) */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none w-32 h-32 -ml-16 -mt-16 border border-white/60 rounded-lg transition-all duration-75 flex items-center justify-center shadow-2xl z-20"
          style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
        >
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-white" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-white" />
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>
      )}

      {/* Camera Viewfinder UI Elements (Corners) */}
      <div className="absolute top-8 left-8 text-[11px] uppercase tracking-[0.3em] text-white/60 font-mono z-30">
        AF-C [4K] 24FPS
      </div>
      <div className="absolute top-8 right-8 text-[11px] uppercase tracking-[0.3em] text-white/60 font-mono z-30">
        ISO 400 · f/2.8
      </div>
      <div className="absolute bottom-8 left-8 text-[11px] uppercase tracking-[0.3em] text-white/60 font-mono z-30">
        SONY ILCE-6400
      </div>
      <div className="absolute bottom-8 right-8 text-[11px] uppercase tracking-[0.3em] text-white/60 font-mono z-30">
        [ • FOCUS LOCKED ]
      </div>

    </section>
  );
}