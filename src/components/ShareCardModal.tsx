'use client';

import React, { useState } from 'react';
import { Translations, Language } from '../types';
import { CONTACT_INFO } from '../constants/translations';
import { X, Copy, Check, Share2, MessageCircle, QrCode } from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
  currentLang: Language;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  t,
  currentLang,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://zeo-cards-auto.vercel.app';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = currentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${CONTACT_INFO.driverName} - Auto Rickshaw Services`,
          text: `Contact ${CONTACT_INFO.driverName} for reliable auto rides across Kundapura-Udupi:`,
          url: currentUrl,
        });
        onClose();
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const text =
      currentLang === 'kn'
        ? `ಕುಂದಾಪುರ-ಉಡುಪಿ ಆಟೋ ರಿಕ್ಷಾ ಸೇವೆಗಳು - ಗಣಪತಿ (${CONTACT_INFO.phone}): ${currentUrl}`
        : `Ganapathi Auto Rickshaw Services (Kundapura-Udupi) - Call ${CONTACT_INFO.phone}: ${currentUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-sm bg-[#151518] border border-[#2E2E36] rounded-3xl p-6 shadow-2xl relative animate-slideUp text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#25252D] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FFC107]/15 flex items-center justify-center text-[#FFC107] mb-3">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{t.shareModal.title}</h3>
        <p className="text-xs text-gray-400 mb-5">{t.shareModal.subtitle}</p>

        {/* QR Code Container */}
        <div className="mx-auto w-40 h-40 bg-white p-2.5 rounded-2xl shadow-inner flex flex-col items-center justify-center mb-4">
          <div className="relative w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
            {/* Elegant SVG QR Mockup */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="#000000">
              {/* Corner 1 */}
              <rect x="5" y="5" width="26" height="26" fill="#000" rx="3" />
              <rect x="9" y="9" width="18" height="18" fill="#FFF" rx="2" />
              <rect x="13" y="13" width="10" height="10" fill="#000" rx="1" />
              {/* Corner 2 */}
              <rect x="69" y="5" width="26" height="26" fill="#000" rx="3" />
              <rect x="73" y="9" width="18" height="18" fill="#FFF" rx="2" />
              <rect x="77" y="13" width="10" height="10" fill="#000" rx="1" />
              {/* Corner 3 */}
              <rect x="5" y="69" width="26" height="26" fill="#000" rx="3" />
              <rect x="9" y="73" width="18" height="18" fill="#FFF" rx="2" />
              <rect x="13" y="77" width="10" height="10" fill="#000" rx="1" />
              {/* Data matrix dots */}
              <rect x="36" y="8" width="5" height="5" />
              <rect x="46" y="8" width="5" height="5" />
              <rect x="56" y="8" width="5" height="5" />
              <rect x="36" y="18" width="5" height="5" />
              <rect x="46" y="24" width="5" height="5" />
              <rect x="8" y="38" width="5" height="5" />
              <rect x="18" y="38" width="5" height="5" />
              <rect x="28" y="38" width="5" height="5" />
              <rect x="38" y="38" width="12" height="12" rx="2" fill="#FDB813" />
              <rect x="56" y="38" width="5" height="5" />
              <rect x="68" y="38" width="5" height="5" />
              <rect x="78" y="38" width="5" height="5" />
              <rect x="88" y="38" width="5" height="5" />
              <rect x="8" y="48" width="5" height="5" />
              <rect x="24" y="48" width="5" height="5" />
              <rect x="56" y="48" width="5" height="5" />
              <rect x="72" y="48" width="5" height="5" />
              <rect x="88" y="48" width="5" height="5" />
              <rect x="38" y="58" width="5" height="5" />
              <rect x="48" y="58" width="5" height="5" />
              <rect x="58" y="58" width="5" height="5" />
              <rect x="78" y="58" width="5" height="5" />
              <rect x="36" y="68" width="5" height="5" />
              <rect x="46" y="74" width="5" height="5" />
              <rect x="56" y="68" width="5" height="5" />
              <rect x="68" y="78" width="5" height="5" />
              <rect x="82" y="78" width="5" height="5" />
              <rect x="36" y="88" width="5" height="5" />
              <rect x="52" y="88" width="5" height="5" />
              <rect x="68" y="88" width="5" height="5" />
              <rect x="84" y="88" width="5" height="5" />
            </svg>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mb-4">{t.shareModal.scanQr}</p>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#202026] hover:bg-[#282832] text-white border border-[#30303C] text-xs font-semibold transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{t.shareModal.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-400" />
                <span>{t.shareModal.copyLink}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.shareModal.shareViaWhatsApp}</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFC107] hover:bg-[#FFD54F] text-black text-xs font-bold transition-colors shadow-md shadow-[#FFC107]/20"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via Device</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
