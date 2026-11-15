'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RideBooking, DriverProfile, RoutePricing } from '../types/admin';

const DEFAULT_PROFILE: DriverProfile = {
  name: 'Ganapathi',
  nameKn: 'ಗಣಪತಿ',
  phone: '9535129792',
  alternatePhone: '9535129792',
  location: 'Goliyangadi, Kundapura',
  locationKn: 'ಗೋಳಿಯಂಗಡಿ, ಕುಂದಾಪುರ',
  routeScope: 'Local & Outstation Rides',
  routeScopeKn: 'ಸ್ಥಳೀಯ ಮತ್ತು ಹೊರಗಿನ ಪ್ರಯಾಣ',
  isAvailable: true,
  vehicleModel: 'TVS Duramax (Black & Yellow)',
  vehicleNumber: 'KA-20-EA-4892',
  rating: 4.9,
  totalTrips: 1420,
  profilePhoto: '/driver-photo.jpg',
};

const DEFAULT_BOOKINGS: RideBooking[] = [
  {
    id: 'BK-1001',
    customerName: 'Suresh Shetty',
    phone: '9845123456',
    pickup: 'Goliyangadi Stand',
    destination: 'Kundapura Railway Station',
    date: '2026-11-15',
    time: '17:30',
    passengers: 2,
    rideType: 'station',
    status: 'pending',
    estimatedFare: '₹280',
    notes: '2 suitcases, please be on time for Matsyagandha train',
    createdAt: '2026-11-15T15:10:00Z',
  },
  {
    id: 'BK-1002',
    customerName: 'Praveen Poojary',
    phone: '9741987654',
    pickup: 'Kundapura New Bus Stand',
    destination: 'Koteshwara Temple',
    date: '2026-11-15',
    time: '18:15',
    passengers: 3,
    rideType: 'local',
    status: 'confirmed',
    estimatedFare: '₹120',
    notes: 'Family visit',
    createdAt: '2026-11-15T14:30:00Z',
  },
  {
    id: 'BK-1003',
    customerName: 'Deepak Nayak',
    phone: '9480112233',
    pickup: 'Goliyangadi',
    destination: 'Udupi Krishna Matha',
    date: '2026-11-16',
    time: '08:00',
    passengers: 3,
    rideType: 'outstation',
    status: 'confirmed',
    estimatedFare: '₹750',
    notes: 'Outstation morning trip',
    createdAt: '2026-11-15T12:00:00Z',
  },
  {
    id: 'BK-1004',
    customerName: 'Ramesh Acharya',
    phone: '9900445566',
    pickup: 'Saligrama',
    destination: 'Kundapura Town',
    date: '2026-11-14',
    time: '19:00',
    passengers: 1,
    rideType: 'local',
    status: 'completed',
    estimatedFare: '₹180',
    notes: '',
    createdAt: '2026-11-14T18:40:00Z',
  },
];

const DEFAULT_ROUTES: RoutePricing[] = [
  { id: 'R1', from: 'Goliyangadi', to: 'Kundapura Bus Stand', approxDistance: '8 km', estimatedPrice: '₹160' },
  { id: 'R2', from: 'Goliyangadi', to: 'Kundapura Railway Stn', approxDistance: '12 km', estimatedPrice: '₹280' },
  { id: 'R3', from: 'Goliyangadi', to: 'Koteshwara', approxDistance: '6 km', estimatedPrice: '₹120' },
  { id: 'R4', from: 'Kundapura', to: 'Udupi City', approxDistance: '36 km', estimatedPrice: '₹750 - ₹850' },
  { id: 'R5', from: 'Kundapura', to: 'Saligrama', approxDistance: '15 km', estimatedPrice: '₹300' },
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
    totalBookings: 4,
    pendingCount: 1,
    confirmedCount: 2,
    completedCount: 1,
    cardViews: 148,
    callClicks: 62,
    whatsappClicks: 47,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('zeo_driver_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedBookings = localStorage.getItem('zeo_driver_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedStats = localStorage.getItem('zeo_driver_stats');
      if (savedStats) setStats(JSON.parse(savedStats));
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

  // Add new booking
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
          totalBookings: bookings.length,
          pendingCount: bookings.filter((b) => b.status === 'pending').length,
          confirmedCount: bookings.filter((b) => b.status === 'confirmed').length,
          completedCount: bookings.filter((b) => b.status === 'completed').length,
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
