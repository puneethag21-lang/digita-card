export type Language = 'en' | 'kn';

export interface Translations {
  brand: {
    title: string;
    subtitle: string;
  };
  category: string;
  driver: {
    name: string;
    tagline1: string;
    tagline2: string;
    vehicleModel: string;
  };
  badges: {
    location: string;
    routeScope: string;
  };
  actions: {
    callTitle: string;
    callPhone: string;
    whatsAppTitle: string;
    whatsAppSubtitle: string;
    bookRideTitle: string;
    bookRideSubtitle: string;
    saveContact: string;
    shareCard: string;
    getDirection: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    pickupLabel: string;
    pickupPlaceholder: string;
    destLabel: string;
    destPlaceholder: string;
    dateTimeLabel: string;
    passengersLabel: string;
    rideTypeLabel: string;
    rideTypes: {
      local: string;
      outstation: string;
      urgent: string;
      station: string;
    };
    submitWhatsApp: string;
    callDirectly: string;
    cancel: string;
    popularPickups: string[];
    popularDests: string[];
  };
  shareModal: {
    title: string;
    subtitle: string;
    copyLink: string;
    copied: string;
    shareViaWhatsApp: string;
    scanQr: string;
    close: string;
  };
  toasts: {
    contactSaved: string;
    linkCopied: string;
    openingWhatsApp: string;
  };
}
