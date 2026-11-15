export interface RideBooking {
  id: string;
  customerName: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  rideType: 'local' | 'outstation' | 'urgent' | 'station';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  estimatedFare?: string;
  notes?: string;
  createdAt: string;
}

export interface DriverProfile {
  name: string;
  nameKn: string;
  phone: string;
  alternatePhone?: string;
  location: string;
  locationKn: string;
  routeScope: string;
  routeScopeKn: string;
  isAvailable: boolean;
  vehicleModel: string;
  vehicleNumber: string;
  rating: number;
  totalTrips: number;
  profilePhoto: string;
}

export interface RoutePricing {
  id: string;
  from: string;
  to: string;
  approxDistance: string;
  estimatedPrice: string;
}
