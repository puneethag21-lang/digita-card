'use client';

import React, { useState } from 'react';

interface AutoRickshawGraphicProps {
  className?: string;
  imageSrc?: string;
}

export const AutoRickshawGraphic: React.FC<AutoRickshawGraphicProps> = ({
  className = '',
  imageSrc = '/auto-rickshaw.png',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Dynamic Image with Fallback to SVG */}
      {!imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt="TVS Duramax Auto Rickshaw - Black and Yellow"
          className="w-full h-auto object-contain max-h-[175px] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.03]"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Highly detailed SVG rendering of TVS Duramax Indian Auto Rickshaw */
        <div className="relative w-full max-w-[240px] aspect-[16/11]">
          {/* Ground Soft Glow & Cast Shadow */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-black/80 rounded-full blur-[6px] pointer-events-none" />
          <div className="absolute -bottom-1 left-[35%] -translate-x-1/2 w-[60%] h-3 bg-amber-500/10 rounded-full blur-[10px] pointer-events-none" />

          <svg
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-[1.03]"
          >
            <defs>
              <linearGradient id="yellowRoofGrad" x1="60" y1="20" x2="280" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="35%" stopColor="#FDB813" />
                <stop offset="85%" stopColor="#E69500" />
                <stop offset="100%" stopColor="#B36B00" />
              </linearGradient>

              <linearGradient id="blackBodyGrad" x1="50" y1="90" x2="270" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2A2A2E" />
                <stop offset="50%" stopColor="#18181A" />
                <stop offset="100%" stopColor="#0B0B0C" />
              </linearGradient>

              <linearGradient id="windshieldGrad" x1="100" y1="40" x2="160" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#81D4FA" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#29B6F6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0288D1" stopOpacity="0.6" />
              </linearGradient>

              <radialGradient id="headlightGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="60%" stopColor="#FBC02D" />
                <stop offset="100%" stopColor="#F57F17" />
              </radialGradient>

              <linearGradient id="chromeTrim" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E0E0E0" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#9E9E9E" />
              </linearGradient>
            </defs>

            {/* Rear / Left Wheel Shadow */}
            <ellipse cx="235" cy="188" rx="34" ry="10" fill="#050505" opacity="0.9" />
            <ellipse cx="78" cy="192" rx="28" ry="8" fill="#050505" opacity="0.9" />

            {/* Back Passenger Cabin Interior Shadow */}
            <path
              d="M175 75 H265 C275 75 285 85 285 105 V145 C285 155 275 160 260 160 H180 Z"
              fill="#0F0F12"
            />
            {/* Passenger Seat Leather */}
            <rect x="220" y="115" width="55" height="30" rx="6" fill="#1C1C1F" stroke="#2B2B30" strokeWidth="2" />
            {/* Cabin roll cage bar */}
            <path d="M185 62 V155 M240 62 V140" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

            {/* Yellow Canopy / Roof */}
            <path
              d="M75 58 C85 45 110 32 155 28 C215 24 265 30 282 45 C290 52 292 64 290 75 C275 75 180 72 75 58 Z"
              fill="url(#yellowRoofGrad)"
            />
            {/* Roof Top Contour & Highlight */}
            <path
              d="M82 52 C115 36 175 30 270 38"
              stroke="#FFF9C4"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Roof Rib lines */}
            <path d="M125 32 C132 44 135 56 138 65" stroke="#D97706" strokeWidth="1.5" opacity="0.6" />
            <path d="M175 29 C182 42 185 55 188 66" stroke="#D97706" strokeWidth="1.5" opacity="0.6" />
            <path d="M225 31 C231 43 234 56 236 67" stroke="#D97706" strokeWidth="1.5" opacity="0.6" />

            {/* Windshield Pillar A (Front Slope) */}
            <path d="M85 58 L58 115" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
            <path d="M142 66 L130 115" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />

            {/* Front Windshield Glass */}
            <polygon
              points="84,60 140,67 128,114 62,114"
              fill="url(#windshieldGrad)"
              stroke="#111827"
              strokeWidth="3"
            />
            {/* Windshield Reflection Slant */}
            <polygon
              points="95,62 110,64 92,112 78,112"
              fill="#FFFFFF"
              opacity="0.25"
            />
            {/* Windshield Wiper */}
            <line x1="95" y1="113" x2="80" y2="78" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />

            {/* Rear Wheel (Deep perspective) */}
            <g>
              <circle cx="236" cy="168" r="28" fill="#151518" stroke="#050505" strokeWidth="3" />
              <circle cx="236" cy="168" r="18" fill="#26262B" />
              <circle cx="236" cy="168" r="10" fill="#4B5563" />
              <circle cx="236" cy="168" r="4" fill="#E5E7EB" />
            </g>

            {/* Main Black Chassis & Passenger Shell */}
            <path
              d="M58 114 C56 122 55 135 60 146 C66 156 75 160 88 160 H140 L168 160 C172 160 178 155 182 148 L195 125 H275 C284 125 288 132 288 142 C288 155 280 168 268 170 H258 C256 174 250 182 238 182 C226 182 218 174 216 170 H170 L145 162 L115 162 C108 175 96 186 78 186 C62 186 52 175 48 162 C42 152 40 134 42 122 Z"
              fill="url(#blackBodyGrad)"
              stroke="#2E2E33"
              strokeWidth="1.5"
            />

            {/* Lower Side Step & Mudguard */}
            <path
              d="M142 158 H210 V165 H142 Z"
              fill="#27272A"
              stroke="#3F3F46"
              strokeWidth="1"
            />

            {/* Front Wheel (Prominent Left/Front angle) */}
            <g>
              <circle cx="78" cy="172" r="26" fill="#18181B" stroke="#0A0A0C" strokeWidth="4" />
              <circle cx="78" cy="172" r="17" fill="#2E2E33" />
              <circle cx="78" cy="172" r="9" fill="url(#chromeTrim)" />
              <circle cx="78" cy="172" r="4" fill="#111827" />
              {/* Wheel Mudguard Flap */}
              <path
                d="M55 164 C55 148 68 144 86 144 C95 144 100 148 102 154"
                stroke="#18181B"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>

            {/* Front Bonnet / Apron (TVS King / Duramax signature nose) */}
            <path
              d="M44 120 C42 130 45 142 55 148 C65 152 75 150 78 142 L84 120 Z"
              fill="#18181B"
              stroke="#3F3F46"
              strokeWidth="1.5"
            />

            {/* Yellow Accent Stripe on Front Nose */}
            <path
              d="M48 128 C55 134 68 134 76 128"
              stroke="#FDB813"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* TVS Chrome Logo / Badge */}
            <ellipse cx="62" cy="138" rx="6" ry="3" fill="url(#chromeTrim)" />
            <circle cx="62" cy="138" r="1.5" fill="#111827" />

            {/* Chrome Front Halogen Headlight */}
            <g>
              <ellipse cx="50" cy="122" rx="9" ry="10" fill="url(#chromeTrim)" stroke="#374151" strokeWidth="1" />
              <ellipse cx="50" cy="122" rx="7" ry="8" fill="url(#headlightGlow)" />
              <ellipse cx="49" cy="120" rx="3" ry="4" fill="#FFFFFF" opacity="0.7" />
            </g>

            {/* Turn Signal Indicator (Amber) */}
            <rect x="74" y="122" width="6" height="5" rx="1.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
            <rect x="36" y="120" width="5" height="5" rx="1.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />

            {/* Front Handlebar & Mirror */}
            <path d="M72 108 L62 104" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="60" cy="103" rx="4" ry="5" fill="#4B5563" stroke="#9CA3AF" strokeWidth="1" />

            {/* Side Passenger Entry Safety Bar */}
            <path
              d="M142 118 V152 M175 118 V152"
              stroke="url(#chromeTrim)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Grab handle curve */}
            <path
              d="M142 118 C158 114 165 114 175 118"
              stroke="url(#chromeTrim)"
              strokeWidth="2"
            />

            {/* TVS Duramax Badge on Rear Quarter */}
            <rect x="238" y="134" width="34" height="7" rx="2" fill="#111827" stroke="#374151" strokeWidth="0.8" />
            <text x="240" y="139" fill="#FDB813" fontSize="5" fontWeight="bold" fontFamily="sans-serif">
              DURAMAX
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};
