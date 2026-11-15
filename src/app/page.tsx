'use client';

import React from 'react';
import { DigitalCard } from '@/components/DigitalCard';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#060608] text-white flex flex-col items-center justify-center p-2 sm:p-6 lg:p-10 relative overflow-x-hidden selection:bg-[#FFC107] selection:text-black">
      {/* Ambient background glows for desktop */}
      <div className="fixed top-1/4 -left-48 w-[420px] h-[420px] bg-[#FFC107]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-48 w-[420px] h-[420px] bg-amber-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Digital Card View */}
      <div className="w-full flex items-center justify-center animate-fadeIn">
        <DigitalCard />
      </div>
    </main>
  );
}
