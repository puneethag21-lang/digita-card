'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DigitalCard } from '@/components/DigitalCard';
import { Smartphone, Monitor, Sparkles, Sliders } from 'lucide-react';

export default function Home() {
  const [viewMode, setViewMode] = useState<'card' | 'compare'>('card');

  return (
    <main className="min-h-screen w-full bg-[#060608] text-white flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-x-hidden selection:bg-[#FFC107] selection:text-black">
      {/* Ambient background glows for desktop */}
      <div className="fixed top-1/4 -left-48 w-[420px] h-[420px] bg-[#FFC107]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-48 w-[420px] h-[420px] bg-amber-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Header / Control Bar */}
      <header className="w-full max-w-4xl hidden sm:flex items-center justify-between gap-3 mb-6 px-5 py-3 rounded-2xl bg-[#121316]/90 backdrop-blur-md border border-[#23252C] text-xs text-gray-300 shadow-xl">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107] animate-pulse" />
          <span className="font-bold text-white tracking-wide">ZEO Cards</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-300 font-medium">
            Ganapathi Auto Rickshaw Services (Goliyangadi, Kundapura)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Admin Panel Link */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1C1E24] hover:bg-[#252830] text-gray-300 hover:text-white border border-[#2B2D36] text-xs font-semibold transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>Admin Panel</span>
          </Link>

          {/* Side-by-side comparison on desktop */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'card' ? 'compare' : 'card')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border transition-all text-xs font-semibold ${
              viewMode === 'compare'
                ? 'bg-[#FFC107]/15 border-[#FFC107]/50 text-[#FFC107]'
                : 'bg-[#1A1C22] border-[#2A2D36] text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{viewMode === 'compare' ? 'Show Card Only' : 'Compare with Figma'}</span>
          </button>
        </div>
      </header>

      {/* Main Card View */}
      {viewMode === 'card' ? (
        <div className="w-full flex items-center justify-center animate-fadeIn">
          <DigitalCard />
        </div>
      ) : (
        /* Side by Side Comparison */
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center animate-fadeIn py-2">
          {/* Left: Live Interactive Next.js Component */}
          <div className="flex flex-col items-center">
            <div className="mb-3 px-3.5 py-1 rounded-full bg-[#18191E] border border-[#2D3039] text-xs font-semibold text-[#FFC107] flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Recreated React & Next.js Website</span>
            </div>
            <DigitalCard />
          </div>

          {/* Right: Original Figma Design Reference */}
          <div className="flex flex-col items-center">
            <div className="mb-3 px-3.5 py-1 rounded-full bg-[#18191E] border border-[#2D3039] text-xs font-semibold text-gray-300 flex items-center gap-1.5 shadow-md">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Figma Design Reference</span>
            </div>
            <div className="relative w-full max-w-[395px] rounded-[38px] overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/design-screenshot.jpg"
                alt="Original Figma Mockup"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
