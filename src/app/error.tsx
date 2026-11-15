'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-2xl mb-4">
        !
      </div>
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-400 text-sm max-w-xs mb-6">
        An error occurred while loading this view.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-[#FFC107] text-black font-semibold text-sm hover:bg-[#FFD54F] transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#1C1E24] text-white font-semibold text-sm hover:bg-[#252830] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
