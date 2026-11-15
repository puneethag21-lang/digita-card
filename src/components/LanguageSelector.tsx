'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1E] border border-[#2E2E34] text-xs font-medium text-[#E5E7EB] hover:text-white hover:border-[#44444C] transition-all duration-200 active:scale-95 shadow-sm"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-[#FFC107]" />
        <span>{currentLang === 'en' ? 'English' : 'ಕನ್ನಡ'}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#9CA3AF] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-[#161618] border border-[#2E2E34] shadow-2xl py-1 z-50 overflow-hidden backdrop-blur-md">
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#FFC107]/10 text-[#FFC107] font-semibold'
                    : 'text-gray-300 hover:bg-[#202024] hover:text-white'
                }`}
              >
                <div>
                  <span className="block">{lang.label}</span>
                  <span className="text-[10px] text-gray-500">{lang.native}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FFC107]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
