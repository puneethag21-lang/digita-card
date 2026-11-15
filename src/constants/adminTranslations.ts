import { Language } from '../types';

export interface AdminTranslations {
  nav: {
    publicCard: string;
    adminBadge: string;
    available: string;
    offDuty: string;
    openLiveCard: string;
    langToggle: string;
  };
  metrics: {
    totalBookings: string;
    totalDesc: string;
    pendingAction: string;
    pendingDesc: string;
    directCalls: string;
    callsDesc: string;
    whatsAppChats: string;
    whatsAppDesc: string;
  };
  tabs: {
    bookings: string;
    settings: string;
    routes: string;
    qr: string;
  };
  bookings: {
    recordNew: string;
    showing: string;
    noBookingsTitle: string;
    noBookingsDesc: string;
    callBtn: string;
    confirmWaBtn: string;
    acceptBtn: string;
    completeBtn: string;
    deleteBtn: string;
    pickup: string;
    drop: string;
    passengers: string;
    pax: string;
    filters: {
      all: string;
      pending: string;
      confirmed: string;
      completed: string;
    };
  };
  settings: {
    title: string;
    subtitle: string;
    nameEn: string;
    nameKn: string;
    phone: string;
    location: string;
    vehicleNumber: string;
    liveStatus: string;
    statusAvailable: string;
    statusOffDuty: string;
    saveBtn: string;
    savedToast: string;
  };
  routes: {
    title: string;
    subtitle: string;
    approx: string;
    standardFare: string;
  };
  qr: {
    badge: string;
    title: string;
    desc: string;
    scanText: string;
    printBtn: string;
    copyLinkBtn: string;
    copiedToast: string;
  };
  addModal: {
    title: string;
    subtitle: string;
    custName: string;
    custPhone: string;
    pickup: string;
    dest: string;
    date: string;
    time: string;
    fare: string;
    cancel: string;
    submit: string;
  };
}

export const ADMIN_TRANSLATIONS: Record<Language, AdminTranslations> = {
  en: {
    nav: {
      publicCard: 'Public Card',
      adminBadge: 'OWNER ADMIN',
      available: 'Status: Available',
      offDuty: 'Status: Off-Duty',
      openLiveCard: 'Open Live Card',
      langToggle: 'ಕನ್ನಡ',
    },
    metrics: {
      totalBookings: 'Total Bookings',
      totalDesc: 'Real customer bookings',
      pendingAction: 'Pending Action',
      pendingDesc: 'Requires confirmation',
      directCalls: 'Direct Calls',
      callsDesc: 'Customer Call taps',
      whatsAppChats: 'WhatsApp Chats',
      whatsAppDesc: 'Direct WhatsApp clicks',
    },
    tabs: {
      bookings: 'Ride Enquiries',
      settings: 'Card & Profile Settings',
      routes: 'Popular Routes & Fares',
      qr: 'Auto Windshield QR Sticker',
    },
    bookings: {
      recordNew: 'Record New Ride',
      showing: 'Showing',
      noBookingsTitle: 'No bookings recorded yet',
      noBookingsDesc: 'When customers book a ride on your digital business card, their details will appear here automatically.',
      callBtn: 'Call',
      confirmWaBtn: 'Confirm via WA',
      acceptBtn: 'Accept',
      completeBtn: 'Done',
      deleteBtn: 'Delete',
      pickup: 'Pickup',
      drop: 'Drop',
      passengers: 'Passengers',
      pax: 'Pax',
      filters: {
        all: 'All',
        pending: 'Pending',
        confirmed: 'Confirmed',
        completed: 'Completed',
      },
    },
    settings: {
      title: 'Digital Business Card Information',
      subtitle: 'Updating these settings live-updates your public card immediately.',
      nameEn: 'Driver Name (English)',
      nameKn: 'Driver Name (Kannada - ಕನ್ನಡ)',
      phone: 'Primary Mobile (Call & WhatsApp)',
      location: 'Auto Stand Location',
      vehicleNumber: 'Auto Rickshaw Registration Number',
      liveStatus: 'Live Availability Status',
      statusAvailable: '🟢 Available for Rides',
      statusOffDuty: '🔴 Busy / Off-Duty',
      saveBtn: 'Save All Changes',
      savedToast: 'Settings updated successfully!',
    },
    routes: {
      title: 'Standard Route Fares (Kundapura – Udupi)',
      subtitle: 'Standard estimates to provide instant quotes to customers.',
      approx: 'Approx.',
      standardFare: 'Standard auto fare',
    },
    qr: {
      badge: 'PRINTABLE VEHICLE STICKER',
      title: 'Auto Windshield & Passenger Seat QR',
      desc: 'Print this QR sticker and paste it inside the auto rickshaw so passengers can scan and save your contact.',
      scanText: 'Scan to Call or Book Rides',
      printBtn: 'Print QR Sticker',
      copyLinkBtn: 'Copy Card Link',
      copiedToast: 'Card link copied to clipboard!',
    },
    addModal: {
      title: 'Record a Phone / Walk-in Ride',
      subtitle: 'Add a customer ride directly to your daily schedule.',
      custName: 'Customer Name',
      custPhone: 'Customer Phone',
      pickup: 'Pickup Location',
      dest: 'Destination / Drop',
      date: 'Date',
      time: 'Time',
      fare: 'Fare (₹)',
      cancel: 'Cancel',
      submit: 'Add to Schedule',
    },
  },
  kn: {
    nav: {
      publicCard: 'ಸಾರ್ವಜನಿಕ ಕಾರ್ಡ್',
      adminBadge: 'ಮಾಲೀಕರ ಅಡ್ಮಿನ್',
      available: 'ಸ್ಥಿತಿ: ಲಭ್ಯವಿದೆ',
      offDuty: 'ಸ್ಥಿತಿ: ಕಾರ್ಯನಿರತ',
      openLiveCard: 'ಕಾರ್ಡ್ ನೋಡಿ',
      langToggle: 'English',
    },
    metrics: {
      totalBookings: 'ಒಟ್ಟು ಬುಕಿಂಗ್‌ಗಳು',
      totalDesc: 'ನೈಜ ಗ್ರಾಹಕರ ಬುಕಿಂಗ್',
      pendingAction: 'ದೃಢೀಕರಣ ಬಾಕಿ',
      pendingDesc: 'ದೃಢೀಕರಿಸಬೇಕಾದ ರೈಡ್‌ಗಳು',
      directCalls: 'ನೇರ ಕರೆಗಳು',
      callsDesc: 'ಗ್ರಾಹಕರ ಕರೆ ಕ್ಲಿಕ್‌ಗಳು',
      whatsAppChats: 'ವಾಟ್ಸಾಪ್ ಚಾಟ್‌ಗಳು',
      whatsAppDesc: 'ನೇರ ವಾಟ್ಸಾಪ್ ಕ್ಲಿಕ್‌ಗಳು',
    },
    tabs: {
      bookings: 'ರೈಡ್ ವಿಚಾರಣೆಗಳು',
      settings: 'ಕಾರ್ಡ್ ಮತ್ತು ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್ಸ್',
      routes: 'ಮಾರ್ಗ ಮತ್ತು ದರಗಳು',
      qr: 'ಆಟೋ ಕ್ಯೂಆರ್ ಸ್ಟಿಕ್ಕರ್',
    },
    bookings: {
      recordNew: 'ಹೊಸ ರೈಡ್ ದಾಖಲಿಸಿ',
      showing: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
      noBookingsTitle: 'ಇನ್ನೂ ಯಾವುದೇ ಬುಕಿಂಗ್ ದಾಖಲಾಗಿಲ್ಲ',
      noBookingsDesc: 'ಗ್ರಾಹಕರು ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ರೈಡ್ ಬುಕ್ ಮಾಡಿದಾಗ, ಅವರ ವಿವರಗಳು ಇಲ್ಲಿ ತಕ್ಷಣ ಕಾಣಿಸುತ್ತವೆ.',
      callBtn: 'ಕರೆ ಮಾಡಿ',
      confirmWaBtn: 'ವಾಟ್ಸಾಪ್ ದೃಢೀಕರಣ',
      acceptBtn: 'ಸ್ವೀಕರಿಸಿ',
      completeBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      deleteBtn: 'ಅಳಿಸಿ',
      pickup: 'ಪಿಕಪ್',
      drop: 'ತಲುಪುವ ಸ್ಥಳ',
      passengers: 'ಪ್ರಯಾಣಿಕರು',
      pax: 'ಜನರು',
      filters: {
        all: 'ಎಲ್ಲವೂ',
        pending: 'ಬಾಕಿ',
        confirmed: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
        completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      },
    },
    settings: {
      title: 'ಡಿಜಿಟಲ್ ಬಿಸಿನೆಸ್ ಕಾರ್ಡ್ ಮಾಹಿತಿ',
      subtitle: 'ಇಲ್ಲಿ ಮಾಡಿದ ಬದಲಾವಣೆಗಳು ಸಾರ್ವಜನಿಕ ಕಾರ್ಡ್‌ನಲ್ಲಿ ತಕ್ಷಣವೇ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತವೆ.',
      nameEn: 'ಚಾಲಕರ ಹೆಸರು (ಇಂಗ್ಲಿಷ್)',
      nameKn: 'ಚಾಲಕರ ಹೆಸರು (ಕನ್ನಡ)',
      phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಕರೆ ಮತ್ತು ವಾಟ್ಸಾಪ್)',
      location: 'ಆಟೋ ಸ್ಟ್ಯಾಂಡ್ ಸ್ಥಳ',
      vehicleNumber: 'ಆಟೋ ರಿಕ್ಷಾ ನೋಂದಣಿ ಸಂಖ್ಯೆ (ನಂಬರ್ ಪ್ಲೇಟ್)',
      liveStatus: 'ಪ್ರಸ್ತುತ ಲಭ್ಯತೆಯ ಸ್ಥಿತಿ',
      statusAvailable: '🟢 ರೈಡ್‌ಗೆ ಲಭ್ಯವಿದೆ',
      statusOffDuty: '🔴 ಕಾರ್ಯನಿರತ / ಆಫ್-ಡ್ಯೂಟಿ',
      saveBtn: 'ಎಲ್ಲಾ ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
      savedToast: 'ಸೆಟ್ಟಿಂಗ್ಸ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!',
    },
    routes: {
      title: 'ಪ್ರಮುಖ ಮಾರ್ಗಗಳ ದರಗಳು (ಕುಂದಾಪುರ – ಉಡುಪಿ)',
      subtitle: 'ಗ್ರಾಹಕರಿಗೆ ತಕ್ಷಣವೇ ದರ ತಿಳಿಸಲು ಮಾರ್ಗದರ್ಶಿ ಪಟ್ಟಿ.',
      approx: 'ಅಂದಾಜು',
      standardFare: 'ಸಾಮಾನ್ಯ ಆಟೋ ದರ',
    },
    qr: {
      badge: 'ಮುದ್ರಿಸಬಹುದಾದ ವಾಹನದ ಸ್ಟಿಕ್ಕರ್',
      title: 'ಆಟೋ ವಿಂಡ್‌ಶೀಲ್ಡ್ ಮತ್ತು ಸೀಟ್ ಕ್ಯೂಆರ್ ಕೋಡ್',
      desc: 'ಈ ಕ್ಯೂಆರ್ ಸ್ಟಿಕ್ಕರ್ ಪ್ರಿಂಟ್ ಮಾಡಿ ಆಟೋದೊಳಗೆ ಅಂಟಿಸಿ, ಪ್ರಯಾಣಿಕರು ಸುಲಭವಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಸಂಪರ್ಕಿಸಬಹುದು.',
      scanText: 'ಕರೆ ಮಾಡಲು ಅಥವಾ ಬುಕ್ ಮಾಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      printBtn: 'ಕ್ಯೂಆರ್ ಸ್ಟಿಕ್ಕರ್ ಮುದ್ರಿಸಿ',
      copyLinkBtn: 'ಕಾರ್ಡ್ ಲಿಂಕ್ ನಕಲಿಸಿ',
      copiedToast: 'ಕಾರ್ಡ್ ಲಿಂಕ್ ಕಾಪಿಯಾಗಿದೆ!',
    },
    addModal: {
      title: 'ಹೊಸ ರೈಡ್ ದಾಖಲಿಸಿ',
      subtitle: 'ಫೋನ್ ಅಥವಾ ನೇರ ಗ್ರಾಹಕರ ಬುಕಿಂಗ್ ಅನ್ನು ನಿಮ್ಮ ವೇಳಾಪಟ್ಟಿಗೆ ಸೇರಿಸಿ.',
      custName: 'ಗ್ರಾಹಕರ ಹೆಸರು',
      custPhone: 'ಗ್ರಾಹಕರ ಮೊಬೈಲ್',
      pickup: 'ಪಿಕಪ್ ಸ್ಥಳ',
      dest: 'ತಲುಪುವ ಸ್ಥಳ',
      date: 'ದಿನಾಂಕ',
      time: 'ಸಮಯ',
      fare: 'ದರ (₹)',
      cancel: 'ರದ್ದುಮಾಡಿ',
      submit: 'ವೇಳಾಪಟ್ಟಿಗೆ ಸೇರಿಸಿ',
    },
  },
};
