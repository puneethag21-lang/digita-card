'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RideBooking, DriverProfile, RoutePricing } from '../types/admin';

const DEFAULT_PROFILE: DriverProfile = {
  name: 'Ganapathi',
  nameKn: 'ಗಣಪತಿ',
  phone: '8431632763',
  alternatePhone: '8431632763',
  location: 'Goliyangadi, Kundapura',
  locationKn: 'ಗೋಳಿಯಂಗಡಿ, ಕುಂದಾಪುರ',
  routeScope: 'Local & Outstation Rides',
  routeScopeKn: 'ಸ್ಥಳೀಯ ಮತ್ತು ಹೊರಗಿನ ಪ್ರಯಾಣ',
  isAvailable: true,
  vehicleModel: 'TVS Duramax (Black & Yellow)',
  vehicleNumber: 'KA-20-EA-4892',
  rating: 5.0,
  totalTrips: 0,
  profilePhoto: '/driver-photo.jpg',
};

// Start cleanly with NO fake bookings! Only real bookings submitted by users.
const DEFAULT_BOOKINGS: RideBooking[] = [];

// Clean standard route estimates
const DEFAULT_ROUTES: RoutePricing[] = [
  { id: 'R1', from: 'Goliyangadi', to: 'Kundapura Bus Stand', approxDistance: '8 km', estimatedPrice: '₹160' },
  { id: 'R2', from: 'Goliyangadi', to: 'Kundapura Railway Stn', approxDistance: '12 km', estimatedPrice: '₹280' },
  { id: 'R3', from: 'Goliyangadi', to: 'Koteshwara', approxDistance: '6 km', estimatedPrice: '₹120' },
  { id: 'R4', from: 'Kundapura', to: 'Udupi City', approxDistance: '36 km', estimatedPrice: '₹750 - ₹850' },
];

interface CardContextType {
  profile: DriverProfile;
  updateProfile: (updates: Partial<DriverProfile>) => void;
  bookings: RideBooking[];
  addBooking: (booking: Omit<RideBooking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: RideBooking['status']) => void;
  deleteBooking: (id: string) => void;
  routes: RoutePricing[];
  stats: {
    totalBookings: number;
    pendingCount: number;
    confirmedCount: number;
    completedCount: number;
    cardViews: number;
    callClicks: number;
    whatsappClicks: number;
  };
  trackClick: (type: 'call' | 'whatsapp' | 'view') => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<DriverProfile>(DEFAULT_PROFILE);
  const [bookings, setBookings] = useState<RideBooking[]>(DEFAULT_BOOKINGS);
  const [routes, setRoutes] = useState<RoutePricing[]>(DEFAULT_ROUTES);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingCount: 0,
    confirmedCount: 0,
    completedCount: 0,
    cardViews: 0,
    callClicks: 0,
    whatsappClicks: 0,
  });

  // Load from localStorage on mount (real data only)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedProfile = localStorage.getItem('zeo_driver_profile');
        if (savedProfile) {
          try {
            const parsed = JSON.parse(savedProfile);
            if (parsed.phone === '9535129792') parsed.phone = '8431632763';
            if (parsed.alternatePhone === '9535129792') parsed.alternatePhone = '8431632763';
            setProfile(parsed);
          } catch {}
        }

        const savedBookings = localStorage.getItem('zeo_driver_bookings');
        if (savedBookings) {
          try {
            const parsed = JSON.parse(savedBookings);
            if (Array.isArray(parsed)) setBookings(parsed);
          } catch {}
        }

        const savedStats = localStorage.getItem('zeo_driver_stats');
        if (savedStats) {
          try {
            setStats(JSON.parse(savedStats));
          } catch {}
        }
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  // Save profile updates
  const updateProfile = (updates: Partial<DriverProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('zeo_driver_profile', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Add real booking
  const addBooking = (bookingData: Omit<RideBooking, 'id' | 'createdAt'>) => {
    const newBooking: RideBooking = {
      ...bookingData,
      id: `BK-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('zeo_driver_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Update booking status
  const updateBookingStatus = (id: string, status: RideBooking['status']) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status } : b));
      try {
        localStorage.setItem('zeo_driver_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Delete booking
  const deleteBooking = (id: string) => {
    setBookings((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem('zeo_driver_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Track analytics click
  const trackClick = (type: 'call' | 'whatsapp' | 'view') => {
    setStats((prev) => {
      const next = {
        ...prev,
        callClicks: type === 'call' ? prev.callClicks + 1 : prev.callClicks,
        whatsappClicks: type === 'whatsapp' ? prev.whatsappClicks + 1 : prev.whatsappClicks,
        cardViews: type === 'view' ? prev.cardViews + 1 : prev.cardViews,
      };
      try {
        localStorage.setItem('zeo_driver_stats', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <CardContext.Provider
      value={{
        profile,
        updateProfile,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        routes,
        stats: {
          ...stats,
          totalBookings: Array.isArray(bookings) ? bookings.length : 0,
          pendingCount: Array.isArray(bookings) ? bookings.filter((b) => b?.status === 'pending').length : 0,
          confirmedCount: Array.isArray(bookings) ? bookings.filter((b) => b?.status === 'confirmed').length : 0,
          completedCount: Array.isArray(bookings) ? bookings.filter((b) => b?.status === 'completed').length : 0,
        },
        trackClick,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
