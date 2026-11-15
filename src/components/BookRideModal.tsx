'use client';

import React, { useState } from 'react';
import { Translations, Language } from '../types';
import { CONTACT_INFO } from '../constants/translations';
import {
  X,
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Users,
  Car,
  MessageSquare,
  Phone,
  CheckCircle2,
} from 'lucide-react';

interface BookRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
  currentLang: Language;
}

export const BookRideModal: React.FC<BookRideModalProps> = ({
  isOpen,
  onClose,
  t,
  currentLang,
}) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    return d.toTimeString().slice(0, 5);
  });
  const [passengers, setPassengers] = useState<number>(1);
  const [rideType, setRideType] = useState<string>('local');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim() || !destination.trim()) {
      alert(currentLang === 'kn' ? 'ದಯವಿಟ್ಟು ಪಿಕಪ್ ಮತ್ತು ತಲುಪುವ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ' : 'Please enter pickup and destination points');
      return;
    }

    const rideTypeLabel =
      rideType === 'local'
        ? t.bookingModal.rideTypes.local
        : rideType === 'outstation'
        ? t.bookingModal.rideTypes.outstation
        : rideType === 'urgent'
        ? t.bookingModal.rideTypes.urgent
        : t.bookingModal.rideTypes.station;

    const message =
      currentLang === 'kn'
        ? `ನಮಸ್ಕಾರ ಗಣಪತಿ ಅವರೇ,\nನನಗೆ ಆಟೋ ರೈಡ್ ಬೇಕಾಗಿದೆ:\n📍 ಪಿಕಪ್: ${pickup}\n🏁 ತಲುಪುವ ಸ್ಥಳ: ${destination}\n📅 ದಿನಾಂಕ: ${date}\n⏰ ಸಮಯ: ${time}\n👥 ಪ್ರಯಾಣಿಕರು: ${passengers}\n🏷️ ವಿಧ: ${rideTypeLabel}${
            notes ? `\n📝 ಟಿಪ್ಪಣಿ: ${notes}` : ''
          }\n\nದಯವಿಟ್ಟು ದೃಢೀಕರಿಸಿ.`
        : `Hello Ganapathi,\nI would like to book an auto ride:\n📍 Pickup: ${pickup}\n🏁 Destination: ${destination}\n📅 Date: ${date}\n⏰ Time: ${time}\n👥 Passengers: ${passengers}\n🏷️ Type: ${rideTypeLabel}${
            notes ? `\n📝 Notes: ${notes}` : ''
          }\n\nPlease confirm availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneInternational}?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(false);
      onClose();
    }, 600);
  };

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog */}
      <div
        className="w-full max-w-lg bg-[#141416] border border-[#2B2B32] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#24242A] bg-[#18181C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFC107]/15 flex items-center justify-center text-[#FFC107]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.bookingModal.title}</h3>
              <p className="text-xs text-gray-400">{t.bookingModal.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#25252D] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWhatsAppBooking} className="p-6 space-y-4 overflow-y-auto">
          {/* Pickup Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFC107]" />
              {t.bookingModal.pickupLabel}
            </label>
            <input
              type="text"
              required
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={t.bookingModal.pickupPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C22] border border-[#2F2F38] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107] transition-colors"
            />
            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {t.bookingModal.popularPickups.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setPickup(loc)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-[#22222A] text-gray-300 hover:text-white hover:bg-[#2D2D38] border border-[#2E2E36] transition-colors"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              {t.bookingModal.destLabel}
            </label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t.bookingModal.destPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C22] border border-[#2F2F38] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107] transition-colors"
            />
            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {t.bookingModal.popularDests.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setDestination(loc)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-[#22222A] text-gray-300 hover:text-white hover:bg-[#2D2D38] border border-[#2E2E36] transition-colors"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {t.bookingModal.dateTimeLabel.split('&')[0]}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1C1C22] border border-[#2F2F38] text-xs text-white focus:outline-none focus:border-[#FFC107] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {t.bookingModal.dateTimeLabel.split('&')[1] || 'Time'}
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1C1C22] border border-[#2F2F38] text-xs text-white focus:outline-none focus:border-[#FFC107] transition-colors"
              />
            </div>
          </div>

          {/* Ride Type & Passengers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {t.bookingModal.rideTypeLabel}
              </label>
              <select
                value={rideType}
                onChange={(e) => setRideType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1C1C22] border border-[#2F2F38] text-xs text-white focus:outline-none focus:border-[#FFC107] transition-colors"
              >
                <option value="local">{t.bookingModal.rideTypes.local}</option>
                <option value="outstation">{t.bookingModal.rideTypes.outstation}</option>
                <option value="urgent">{t.bookingModal.rideTypes.urgent}</option>
                <option value="station">{t.bookingModal.rideTypes.station}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                {t.bookingModal.passengersLabel}
              </label>
              <div className="flex rounded-xl bg-[#1C1C22] border border-[#2F2F38] p-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(num)}
                    className={`flex-1 py-1 text-xs rounded-lg font-medium transition-all ${
                      passengers === num
                        ? 'bg-[#FFC107] text-black font-bold shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={submitted}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-sm shadow-lg shadow-[#25D366]/20 transition-all duration-200 active:scale-[0.98]"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  <span>{currentLang === 'kn' ? 'ತೆರೆಯಲಾಗುತ್ತಿದೆ...' : 'Opening WhatsApp...'}</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5 fill-black" />
                  <span>{t.bookingModal.submitWhatsApp}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCall}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#202026] hover:bg-[#282830] text-gray-200 border border-[#30303A] font-semibold text-xs transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FFC107]" />
              <span>{t.bookingModal.callDirectly}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
