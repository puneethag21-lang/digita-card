'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCard } from '@/context/CardContext';
import { RideBooking } from '@/types/admin';
import {
  Car,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  Plus,
  ArrowLeft,
  ExternalLink,
  Shield,
  KeyRound,
  TrendingUp,
  Sliders,
  QrCode,
  Printer,
  Copy,
  Check,
  Trash2,
  AlertCircle,
  Eye,
} from 'lucide-react';

export default function AdminPage() {
  const {
    profile,
    updateProfile,
    bookings,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    routes,
    stats,
  } = useCard();

  const [activeTab, setActiveTab] = useState<'bookings' | 'settings' | 'routes' | 'qr'>('bookings');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default true for convenience
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Edit State
  const [driverName, setDriverName] = useState(profile.name);
  const [driverNameKn, setDriverNameKn] = useState(profile.nameKn);
  const [phone, setPhone] = useState(profile.phone);
  const [location, setLocation] = useState(profile.location);
  const [vehicleNumber, setVehicleNumber] = useState(profile.vehicleNumber);
  const [isAvailable, setIsAvailable] = useState(profile.isAvailable);

  // New Booking Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newPickup, setNewPickup] = useState('');
  const [newDest, setNewDest] = useState('');
  const [newFare, setNewFare] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('17:00');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: driverName,
      nameKn: driverNameKn,
      phone,
      location,
      vehicleNumber,
      isAvailable,
    });
    showToast('Profile and Card Settings Updated Successfully!');
  };

  const handleToggleAvailability = () => {
    const nextState = !profile.isAvailable;
    updateProfile({ isAvailable: nextState });
    setIsAvailable(nextState);
    showToast(nextState ? 'Status: Available for Rides 🟢' : 'Status: Busy / Off-Duty 🔴');
  };

  const handleManualAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPickup || !newDest) {
      alert('Please fill pickup and destination');
      return;
    }
    addBooking({
      customerName: newCustName || 'Direct Booking',
      phone: newCustPhone || 'Walk-in / Phone',
      pickup: newPickup,
      destination: newDest,
      date: newDate,
      time: newTime,
      passengers: 2,
      rideType: 'local',
      status: 'confirmed',
      estimatedFare: newFare ? `₹${newFare}` : '₹150',
    });
    setShowAddModal(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewPickup('');
    setNewDest('');
    setNewFare('');
    showToast('New Booking added to schedule!');
  };

  const handleWhatsAppConfirm = (booking: RideBooking) => {
    const text = `Hello ${booking.customerName},\nYour auto ride booking with Ganapathi Auto Kundapura has been CONFIRMED!\n\n📍 Pickup: ${booking.pickup}\n🏁 Destination: ${booking.destination}\n📅 Date: ${booking.date} at ${booking.time}\n🚖 Vehicle: ${profile.vehicleNumber} (TVS Duramax)\n📞 Driver Phone: ${profile.phone}\n\nSee you at the scheduled time!`;
    const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
    const target = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${target}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.status === statusFilter;
  });

  return (
    <div className="min-h-screen w-full bg-[#08080A] text-white flex flex-col font-sans selection:bg-[#FFC107] selection:text-black">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-[#111216]/95 backdrop-blur-md border-b border-[#21232B] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C1E24] hover:bg-[#252830] text-gray-300 hover:text-white text-xs font-semibold border border-[#2D3039] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Card</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-tight text-white">
              ZE<span className="text-[#FFC107]">O</span> Cards
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/30">
              OWNER ADMIN
            </span>
          </div>
        </div>

        {/* Live Availability Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleAvailability}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
              profile.isAvailable
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                profile.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span>{profile.isAvailable ? 'Status: Available' : 'Status: Off-Duty'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFC107] text-black text-xs font-bold hover:bg-[#FFD54F] transition-all shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Card</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Driver Welcome Banner & Vehicle Summary */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#18191E] via-[#1E2028] to-[#18191E] border border-[#2B2D38] p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full ring-2 ring-[#FFC107] ring-offset-2 ring-offset-black overflow-hidden shadow-lg shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="w-full h-full object-cover object-[center_18%]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {profile.name} ({profile.nameKn})
                </h1>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/15 text-[#FFC107] font-semibold border border-[#FFC107]/20">
                  ★ {profile.rating}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {profile.vehicleModel} • {profile.vehicleNumber} • {profile.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFC107] text-black text-xs font-bold hover:bg-[#FFD54F] active:scale-95 transition-all shadow-lg shadow-[#FFC107]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Record New Ride</span>
            </button>
          </div>
        </div>

        {/* Analytics & Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl bg-[#131418] border border-[#22242D] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span>Total Bookings</span>
              <Calendar className="w-4 h-4 text-[#FFC107]" />
            </div>
            <span className="text-2xl font-black text-white">{stats.totalBookings}</span>
            <span className="text-[11px] text-gray-500 mt-1">Direct from Digital Card</span>
          </div>

          <div className="rounded-2xl bg-[#131418] border border-[#22242D] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span>Pending Action</span>
              <Clock3 className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400">{stats.pendingCount}</span>
            <span className="text-[11px] text-gray-500 mt-1">Requires confirmation</span>
          </div>

          <div className="rounded-2xl bg-[#131418] border border-[#22242D] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span>Direct Calls</span>
              <Phone className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-white">{stats.callClicks}</span>
            <span className="text-[11px] text-gray-500 mt-1">Customer Call Now taps</span>
          </div>

          <div className="rounded-2xl bg-[#131418] border border-[#22242D] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span>WhatsApp Chats</span>
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </div>
            <span className="text-2xl font-black text-white">{stats.whatsappClicks}</span>
            <span className="text-[11px] text-gray-500 mt-1">Direct WhatsApp chats</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#22242D] pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'bg-[#14151A] text-gray-400 hover:text-white border border-[#23252E]'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Ride Enquiries ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'bg-[#14151A] text-gray-400 hover:text-white border border-[#23252E]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Card & Profile Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'routes'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'bg-[#14151A] text-gray-400 hover:text-white border border-[#23252E]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Popular Routes & Fares</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'qr'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'bg-[#14151A] text-gray-400 hover:text-white border border-[#23252E]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Auto Windshield QR Sticker</span>
          </button>
        </div>

        {/* =========================================
            TAB 1: RIDE BOOKINGS & ENQUIRIES
           ========================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Filter Chips */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {(['all', 'pending', 'confirmed', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      statusFilter === filter
                        ? 'bg-zinc-200 text-black'
                        : 'bg-[#181920] text-gray-400 hover:text-white border border-[#262832]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <span className="text-xs text-gray-500">
                Showing {filteredBookings.length} bookings
              </span>
            </div>

            {/* Bookings List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBookings.length === 0 ? (
                <div className="col-span-full py-12 text-center rounded-3xl bg-[#121317] border border-[#21232B] text-gray-500">
                  <Car className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm font-semibold">No bookings found in this view.</p>
                  <p className="text-xs mt-1">Bookings submitted on the digital card will appear here automatically.</p>
                </div>
              ) : (
                filteredBookings.map((booking) => {
                  const isPending = booking.status === 'pending';
                  const isConfirmed = booking.status === 'confirmed';
                  const isCompleted = booking.status === 'completed';

                  return (
                    <div
                      key={booking.id}
                      className="rounded-3xl bg-[#14151A] border border-[#252834] p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-[#383B4A] transition-all"
                    >
                      {/* Booking Top Info */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="text-[10px] font-mono text-gray-500 font-semibold">
                              {booking.id} • {booking.rideType.toUpperCase()}
                            </span>
                            <h3 className="text-base font-bold text-white tracking-tight">
                              {booking.customerName}
                            </h3>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize flex items-center gap-1 ${
                              isPending
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                : isConfirmed
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : isCompleted
                                ? 'bg-zinc-700/30 text-gray-300 border border-zinc-700'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPending
                                  ? 'bg-amber-400 animate-pulse'
                                  : isConfirmed
                                  ? 'bg-emerald-400'
                                  : 'bg-gray-400'
                              }`}
                            />
                            {booking.status}
                          </span>
                        </div>

                        {/* Route Locations */}
                        <div className="space-y-1.5 py-2 border-y border-[#1E2028] text-xs">
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                            <span className="text-gray-500 font-medium">Pickup:</span>
                            <strong className="text-white font-semibold">{booking.pickup}</strong>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Car className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-gray-500 font-medium">Drop:</span>
                            <strong className="text-white font-semibold">{booking.destination}</strong>
                          </div>
                        </div>

                        {/* Timing & Notes */}
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gray-500" />
                            {booking.passengers} Pax
                          </span>
                        </div>

                        {booking.notes && (
                          <p className="mt-2 text-[11px] text-gray-400 bg-[#1A1C24] p-2 rounded-xl italic">
                            &ldquo;{booking.notes}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Action Bar for Ganapathi */}
                      <div className="pt-2 border-t border-[#1E2028] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {/* Call Button */}
                          <a
                            href={`tel:${booking.phone}`}
                            className="p-2 rounded-xl bg-[#20222B] hover:bg-[#282B36] text-white border border-[#2E313D] text-xs flex items-center gap-1.5 transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                            <span className="hidden sm:inline">Call</span>
                          </a>

                          {/* WhatsApp Confirm */}
                          <button
                            type="button"
                            onClick={() => handleWhatsAppConfirm(booking)}
                            className="px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Confirm via WA</span>
                          </button>
                        </div>

                        {/* Status Switcher */}
                        <div className="flex items-center gap-1">
                          {isPending && (
                            <button
                              type="button"
                              onClick={() => {
                                updateBookingStatus(booking.id, 'confirmed');
                                showToast(`Booking #${booking.id} Confirmed!`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold transition-colors"
                            >
                              Accept
                            </button>
                          )}

                          {isConfirmed && (
                            <button
                              type="button"
                              onClick={() => {
                                updateBookingStatus(booking.id, 'completed');
                                showToast(`Booking #${booking.id} Marked Completed!`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 text-xs font-semibold transition-colors"
                            >
                              Done
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Delete this booking record?')) {
                                deleteBooking(booking.id);
                                showToast('Booking deleted');
                              }
                            }}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: DRIVER & CARD SETTINGS
           ========================================= */}
        {activeTab === 'settings' && (
          <form
            onSubmit={handleSaveProfile}
            className="rounded-3xl bg-[#131418] border border-[#23252E] p-6 space-y-6 max-w-2xl"
          >
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Digital Business Card Information
              </h2>
              <p className="text-xs text-gray-400">
                Updating these settings live-updates Ganapathi&apos;s digital card for all customers.
              </p>
            </div>

            <div className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Driver Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1D24] border border-[#2D303B] text-xs text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Driver Name (Kannada - ಕನ್ನಡ)
                  </label>
                  <input
                    type="text"
                    required
                    value={driverNameKn}
                    onChange={(e) => setDriverNameKn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1D24] border border-[#2D303B] text-xs text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Primary Mobile (Call & WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1D24] border border-[#2D303B] text-xs text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Auto Stand Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1D24] border border-[#2D303B] text-xs text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
              </div>

              {/* Vehicle Number & Model */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Auto Rickshaw Registration Number
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1D24] border border-[#2D303B] text-xs text-white focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              {/* Driver Availability */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Live Availability Status
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAvailable(true)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      isAvailable
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-md'
                        : 'bg-[#181920] text-gray-400 border-[#282A34]'
                    }`}
                  >
                    🟢 Available for Rides
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAvailable(false)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      !isAvailable
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-md'
                        : 'bg-[#181920] text-gray-400 border-[#282A34]'
                    }`}
                  >
                    🔴 Busy / Off-Duty
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#22242D] flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#FFC107] text-black font-bold text-xs hover:bg-[#FFD54F] transition-all shadow-md active:scale-95"
              >
                Save All Changes
              </button>
            </div>
          </form>
        )}

        {/* =========================================
            TAB 3: ROUTES & FARES
           ========================================= */}
        {activeTab === 'routes' && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Standard Route Fares (Kundapura – Udupi)
                </h2>
                <p className="text-xs text-gray-400">
                  Pre-configured estimates to provide instant quotes to customers.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#131418] border border-[#23252E] overflow-hidden shadow-lg">
              <div className="divide-y divide-[#20222B]">
                {routes.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-[#181920] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#20222B] flex items-center justify-center text-[#FFC107]">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {r.from} ➔ {r.to}
                        </div>
                        <div className="text-[11px] text-gray-500">Approx. {r.approxDistance}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-[#FFC107]">{r.estimatedPrice}</span>
                      <div className="text-[10px] text-gray-500">Standard auto fare</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 4: QR CODE & MARKETING
           ========================================= */}
        {activeTab === 'qr' && (
          <div className="max-w-xl mx-auto rounded-3xl bg-[#131418] border border-[#23252E] p-6 text-center space-y-5 shadow-2xl">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC107]">
                PRINTABLE VEHICLE STICKER
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                Auto Windshield & Passenger Seat QR
              </h2>
              <p className="text-xs text-gray-400">
                Print this QR sticker and place it inside the rickshaw so passengers can scan and save your contact instantly.
              </p>
            </div>

            {/* Printable Graphic Container */}
            <div className="w-64 mx-auto bg-white p-5 rounded-3xl shadow-xl text-black space-y-3">
              <div className="border-b border-gray-200 pb-2">
                <span className="text-xs font-black tracking-tight block">
                  ZEO Cards • Auto Services
                </span>
                <span className="text-[14px] font-bold text-black block">
                  {profile.name} ({profile.nameKn})
                </span>
                <span className="text-[10px] text-gray-600 block">{profile.phone}</span>
              </div>

              {/* QR Mockup */}
              <div className="w-48 h-48 mx-auto bg-white border border-gray-300 p-2 rounded-xl">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="#000000">
                  <rect x="5" y="5" width="26" height="26" rx="2" />
                  <rect x="9" y="9" width="18" height="18" fill="#FFF" rx="1" />
                  <rect x="13" y="13" width="10" height="10" rx="1" />
                  <rect x="69" y="5" width="26" height="26" rx="2" />
                  <rect x="73" y="9" width="18" height="18" fill="#FFF" rx="1" />
                  <rect x="77" y="13" width="10" height="10" rx="1" />
                  <rect x="5" y="69" width="26" height="26" rx="2" />
                  <rect x="9" y="73" width="18" height="18" fill="#FFF" rx="1" />
                  <rect x="13" y="77" width="10" height="10" rx="1" />
                  <rect x="36" y="8" width="5" height="5" />
                  <rect x="46" y="8" width="5" height="5" />
                  <rect x="56" y="8" width="5" height="5" />
                  <rect x="36" y="18" width="5" height="5" />
                  <rect x="46" y="24" width="5" height="5" />
                  <rect x="8" y="38" width="5" height="5" />
                  <rect x="38" y="38" width="14" height="14" rx="3" fill="#FDB813" />
                  <rect x="56" y="38" width="5" height="5" />
                  <rect x="68" y="38" width="5" height="5" />
                  <rect x="88" y="38" width="5" height="5" />
                  <rect x="8" y="48" width="5" height="5" />
                  <rect x="56" y="48" width="5" height="5" />
                  <rect x="88" y="48" width="5" height="5" />
                  <rect x="38" y="58" width="5" height="5" />
                  <rect x="48" y="58" width="5" height="5" />
                  <rect x="78" y="58" width="5" height="5" />
                  <rect x="36" y="68" width="5" height="5" />
                  <rect x="56" y="68" width="5" height="5" />
                  <rect x="82" y="78" width="5" height="5" />
                  <rect x="36" y="88" width="5" height="5" />
                  <rect x="52" y="88" width="5" height="5" />
                  <rect x="68" y="88" width="5" height="5" />
                </svg>
              </div>

              <div className="pt-1 text-[11px] font-semibold text-gray-800">
                Scan to Call or Book Rides
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-[#22242D] hover:bg-[#2A2C38] text-white text-xs font-semibold flex items-center gap-2 border border-[#303340] transition-colors"
              >
                <Printer className="w-4 h-4 text-[#FFC107]" />
                <span>Print QR Sticker</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  showToast('Card link copied to clipboard!');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FFC107] hover:bg-[#FFD54F] text-black text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Card Link</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Manual Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#14151A] border border-[#262832] rounded-3xl p-6 shadow-2xl relative animate-slideUp">
            <h3 className="text-base font-bold text-white mb-1">Record a Phone / Walk-in Ride</h3>
            <p className="text-xs text-gray-400 mb-4">Add directly to your daily schedule.</p>

            <form onSubmit={handleManualAddBooking} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Ramesh Shetty"
                  className="w-full px-3 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Customer Phone</label>
                <input
                  type="tel"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  placeholder="9845123456"
                  className="w-full px-3 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Pickup Location</label>
                  <input
                    type="text"
                    required
                    value={newPickup}
                    onChange={(e) => setNewPickup(e.target.value)}
                    placeholder="Goliyangadi"
                    className="w-full px-3 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    placeholder="Kundapura Station"
                    className="w-full px-3 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Fare (₹)</label>
                  <input
                    type="number"
                    value={newFare}
                    onChange={(e) => setNewFare(e.target.value)}
                    placeholder="250"
                    className="w-full px-2 py-2 rounded-xl bg-[#1B1D24] border border-[#2C2E38] text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1E2028] text-gray-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FFC107] text-black text-xs font-bold hover:bg-[#FFD54F]"
                >
                  Add Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-zinc-900 border border-[#3E4150] text-white text-xs font-medium shadow-2xl flex items-center gap-2 animate-slideUp">
          <Check className="w-4 h-4 text-[#FFC107]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
