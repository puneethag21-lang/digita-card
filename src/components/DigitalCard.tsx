'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { BookRideModal } from './BookRideModal';
import { ShareCardModal } from './ShareCardModal';
import { downloadVCard } from '../utils/vcard';
import { useCard } from '../context/CardContext';

interface DigitalCardProps {
  initialLanguage?: Language;
}

export const DigitalCard: React.FC<DigitalCardProps> = ({
  initialLanguage = 'en',
}) => {
  const { profile, trackClick } = useCard();
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  // Dynamic driver info synced with Admin Panel
  const displayName = language === 'kn' ? profile.nameKn : profile.name;
  const displayLocation = language === 'kn' ? profile.locationKn : profile.location;
  const displayScope = language === 'kn' ? profile.routeScopeKn : profile.routeScope;
  const currentPhone = profile.phone;

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleCall = () => {
    trackClick('call');
    showNotice(`Calling ${currentPhone}...`);
    window.location.href = `tel:+91${currentPhone}`;
  };

  const handleWhatsApp = () => {
    trackClick('whatsapp');
    showNotice(t.toasts.openingWhatsApp);
    const greeting =
      language === 'kn'
        ? `ನಮಸ್ಕಾರ ${profile.nameKn} ಅವರೇ, ನಾನು ನಿಮ್ಮ ಆಟೋ ರಿಕ್ಷಾ ರೈಡ್ ಬುಕ್ ಮಾಡಲು ಇಚ್ಛಿಸುತ್ತೇನೆ.`
        : `Hi ${profile.name}, I would like to book an auto ride.`;
    window.open(
      `https://wa.me/91${currentPhone}?text=${encodeURIComponent(greeting)}`,
      '_blank'
    );
  };

  const handleSaveContact = () => {
    downloadVCard();
    showNotice(t.toasts.contactSaved);
  };

  const handleShareCard = async () => {
    const shareData = {
      title: `${displayName} Auto Rickshaw`,
      text: `${displayName} Auto Rickshaw — reliable rides across Kundapura-Udupi. Call ${currentPhone}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
      } else {
        setIsShareModalOpen(true);
      }
    } catch {
      // User cancelled share
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'kn' : 'en');
  };

  const asset = (name: string) => `/assets/${name}`;

  return (
    <div className="relative w-full max-w-[395px] mx-auto rounded-[38px] overflow-hidden bg-black text-white shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] select-none">
      {/* =========================================
          HERO SECTION (With Exact Background & Vehicle)
         ========================================= */}
      <section className="relative h-[423px] overflow-hidden">
        {/* Exact Hero Background from Figma */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute -top-[284px] left-0 w-[397px] h-[706px] max-w-none pointer-events-none"
          src={asset('d467d.png')}
          alt="Hero Background"
        />

        {/* Brand Row + Language Toggle */}
        <header className="relative z-10 flex items-center justify-between pt-[49px] pl-[30px] pr-[55px]">
          <div>
            <p className="text-[21px] font-bold text-white tracking-tight leading-normal">
              ZE<span className="text-[#fc0]">O</span> Cards
            </p>
            <p className="mt-[1px] text-[#a1a1aa] font-mono text-[11px] tracking-wider uppercase leading-normal">
              {t.brand.subtitle}
            </p>
          </div>

          <button
            className="relative w-[115px] h-[28px] text-white cursor-pointer active:scale-95 transition-transform"
            type="button"
            onClick={handleLanguageToggle}
            aria-label="Change language"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('4ea66.svg')}
              alt=""
              className="absolute inset-0 w-[115px] h-[28px]"
            />
            <span className="relative z-10 text-[15px] font-medium flex items-center justify-center h-full">
              {language === 'en' ? 'English' : 'ಕನ್ನಡ'}
            </span>
          </button>
        </header>

        {/* Service Label with Horizontal Flank Lines */}
        <div className="absolute top-[134px] left-[14px] z-10 flex items-center gap-[8px] h-[31px] text-[#8E929A] text-[10.5px] font-medium tracking-[0.16em] uppercase whitespace-nowrap">
          <div className="w-[30px] h-[1px] bg-[#5A5D66]" />
          <span>{t.category}</span>
          <div className="w-[24px] h-[1px] bg-[#5A5D66]" />
        </div>

        {/* Title Rule */}
        <div className="absolute top-[168px] left-[15px] z-10 w-[103px] h-[1px] bg-[#3E4148]" />

        {/* Driver Profile DP + Name & Tagline */}
        <div className="absolute top-[180px] left-[15px] z-20 flex flex-col items-start">
          {/* Owner Display Picture (Small Rounded DP) */}
          <div className="relative w-[48px] h-[48px] rounded-full ring-2 ring-[#FFC107] ring-offset-2 ring-offset-black overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.8)] mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.profilePhoto}
              alt="Ganapathi - Auto Owner & Driver"
              className="w-full h-full object-cover object-[center_18%]"
            />
            {/* Live Active Status Indicator from Admin Panel */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-black rounded-full ${
                profile.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
              }`}
              title={profile.isAvailable ? 'Available for Rides' : 'Busy / Off-Duty'}
            />
          </div>

          <h1 className="text-[32px] font-normal text-white leading-none tracking-normal">
            {displayName}
          </h1>
          <p className="mt-[4px] text-[#a1a1aa] text-[12.5px] font-normal leading-snug">
            {t.driver.tagline1}
            <br />
            {t.driver.tagline2}
          </p>
        </div>

        {/* TVS Duramax Rickshaw Graphic Cutout */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute top-[165px] left-[166px] z-10 w-[225px] h-[176px] max-w-none object-contain drop-shadow-2xl pointer-events-none"
          src={asset('b8e85.png')}
          alt="Black and yellow TVS auto rickshaw"
        />

        {/* Route Scope Pill */}
        <div className="absolute top-[383px] left-[21px] z-10 grid grid-cols-[1fr_1px_1fr] items-center w-[calc(100%-42px)] min-h-[31px] px-[10px] border border-[#34383d] rounded-full bg-[#171a1d] text-center shadow-md">
          <strong className="text-[11.2px] font-bold text-white truncate px-1">
            {displayLocation}
          </strong>
          <span className="block w-[1px] h-[20px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('6b02a.svg')}
              alt=""
              className="w-[20px] rotate-90 origin-top-left"
            />
          </span>
          <strong className="text-[11.2px] font-bold text-white truncate px-1">
            {displayScope}
          </strong>
        </div>
      </section>

      {/* =========================================
          ACTIONS SECTION (Buttons & Interaction)
         ========================================= */}
      <section className="flex flex-col gap-[28px] px-[16px] pt-[24px] pb-[32px]">
        {/* Primary Action Buttons (2-Grid) */}
        <div className="grid grid-cols-2 gap-[20px]">
          {/* Call Now Card - Yellow Theme */}
          <button
            type="button"
            className="relative flex items-center h-[96px] px-[12px] rounded-[22px] text-black active:scale-[0.98] transition-transform overflow-hidden group shadow-[0_8px_20px_rgba(255,193,7,0.22)] text-left cursor-pointer"
            onClick={handleCall}
          >
            {/* Exact Yellow Card Background SVG */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={asset('cb631.svg')}
              alt=""
            />
            {/* Phone Icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('e139d.svg')}
              alt=""
              className="relative z-10 w-[16px] h-[16px] mr-[8px] shrink-0"
            />
            <span className="relative z-10 flex flex-col">
              <strong className="text-[16px] font-bold leading-tight">
                {t.actions.callTitle}
              </strong>
              <small className="text-[20px] font-normal leading-tight tracking-normal">
                {currentPhone}
              </small>
            </span>
          </button>

          {/* WhatsApp Card - Dark Theme */}
          <button
            type="button"
            className="relative flex items-center h-[96px] px-[12px] gap-[8px] rounded-[22px] bg-[#1e1e1e] hover:bg-[#252525] border border-[#2e2e2e] active:scale-[0.98] transition-transform text-white group text-left cursor-pointer"
            onClick={handleWhatsApp}
          >
            {/* WhatsApp Icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('a5c65.svg')}
              alt=""
              className="w-[20px] h-[20px] shrink-0"
            />
            <span className="flex flex-col">
              <strong className="text-[19px] font-bold leading-tight">
                {t.actions.whatsAppTitle}
              </strong>
              <small className="text-[13px] text-[#a1a1aa] leading-tight mt-0.5">
                {t.actions.whatsAppSubtitle}
              </small>
            </span>
          </button>
        </div>

        {/* Book a Ride Interactive Banner */}
        <button
          type="button"
          onClick={() => setIsBookModalOpen(true)}
          className="relative flex items-center min-h-[96px] gap-[18px] px-[22px] rounded-[22px] bg-[#1e1e1e] hover:bg-[#252525] border border-[#2e2e2e] active:scale-[0.98] transition-all text-left text-white group shadow-sm cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('c4e22.svg')}
            alt=""
            className="w-[26px] h-[26px] shrink-0 group-hover:scale-105 transition-transform"
          />
          <span className="flex flex-col">
            <strong className="text-[17px] font-bold leading-tight">
              {t.actions.bookRideTitle}
            </strong>
            <small className="text-[13px] text-[#a1a1aa] leading-tight mt-1">
              {t.actions.bookRideSubtitle}
            </small>
          </span>
        </button>

        {/* Utility Actions (3 Buttons) */}
        <div className="grid grid-cols-3 gap-[22px]">
          {/* Save Contact */}
          <button
            className="flex flex-col items-center justify-center h-[90px] gap-[14px] rounded-[24px] bg-[#1e1e1e] hover:bg-[#252525] border border-[#2a2a2a] active:scale-95 transition-all cursor-pointer text-white"
            type="button"
            onClick={handleSaveContact}
          >
            <span className="relative block w-[21px] h-[21px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('216c1.svg')}
                alt=""
                className="absolute left-0 bottom-0 w-[16px] h-[16px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('a2c21.svg')}
                alt=""
                className="absolute top-[1px] right-0 w-[8px]"
              />
            </span>
            <small className="text-[10.5px] font-medium tracking-tight whitespace-nowrap text-gray-300">
              {t.actions.saveContact}
            </small>
          </button>

          {/* Share Card */}
          <button
            className="flex flex-col items-center justify-center h-[90px] gap-[14px] rounded-[24px] bg-[#1e1e1e] hover:bg-[#252525] border border-[#2a2a2a] active:scale-95 transition-all cursor-pointer text-white"
            type="button"
            onClick={handleShareCard}
          >
            <span className="relative block w-[21px] h-[21px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('d763a.svg')}
                alt=""
                className="absolute inset-[5px_7px] w-[7px] h-[11px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute top-[8px] left-[2px] w-[6px] h-[6px]"
                src={asset('9e7ec.svg')}
                alt=""
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute top-[1px] right-[2px] w-[6px] h-[6px]"
                src={asset('9e7ec.svg')}
                alt=""
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute right-[2px] bottom-[1px] w-[6px] h-[6px]"
                src={asset('9e7ec.svg')}
                alt=""
              />
            </span>
            <small className="text-[10.5px] font-medium tracking-tight whitespace-nowrap text-gray-300">
              {t.actions.shareCard}
            </small>
          </button>

          {/* Get Direction */}
          <a
            className="flex flex-col items-center justify-center h-[90px] gap-[14px] rounded-[24px] bg-[#1e1e1e] hover:bg-[#252525] border border-[#2a2a2a] active:scale-95 transition-all text-white"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              profile.location
            )}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => showNotice('Opening Google Maps...')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('651f0.svg')} alt="" className="w-[21px] h-[21px]" />
            <small className="text-[10.5px] font-medium tracking-tight whitespace-nowrap text-gray-300">
              {t.actions.getDirection}
            </small>
          </a>
        </div>
      </section>

      {/* Floating Notice Toast */}
      {notice && (
        <p
          className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-50 px-4 py-2 border border-[#34383d] rounded-full bg-[#171a1d] text-white text-xs shadow-2xl flex items-center gap-2 animate-slideUp"
          role="status"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFC107]" />
          <span>{notice}</span>
        </p>
      )}

      {/* Book a Ride Interactive Modal */}
      <BookRideModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        t={t}
        currentLang={language}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        t={t}
        currentLang={language}
      />
    </div>
  );
};
