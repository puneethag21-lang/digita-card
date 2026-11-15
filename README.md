# ZEO Cards – Digital Business Card Website

A responsive, high-performance Digital Business Card website built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**, recreating the Figma design for **Ganapathi Auto Rickshaw Services** (Goliyangadi, Kundapura – Udupi).

---

## ✨ Features Implemented

1. **Pixel-Perfect Figma Recreation**:
   - Signature **Black, Charcoal, and Taxi Yellow (`#FFC107` / `#FC0`)** aesthetic.
   - Exact branding: **`ZEO Cards`** with yellow "O" highlight and `DIGITAL BUSINESS CARD` subtitle.
   - Category banner with ornamental rules: `— AUTO RICKSHAW SERVICES —`.
   - Hero spotlight showcase with driver **Ganapathi** and subtitle `Reliable rides across Kundapura-Udupi`.
   - Dual-zone status badge: **`Goliyangadi, Kundapura | Local & Outstation Rides`**.

2. **High-Definition Vehicles & Background Theme**:
   - Uses the supplied studio **TVS King / Duramax (Black & Yellow)** auto-rickshaw assets.
   - Built-in asphalt road perspective and radial atmospheric lighting.
   - Includes custom asset fallbacks and theme overlay options.

3. **Fully Working Actions**:
   - 📞 **Call Now**: Initiates one-tap phone call to `9535129792` (`tel:+919535129792`).
   - 💬 **WhatsApp**: Launches WhatsApp chat (`https://wa.me/919535129792`) with a pre-filled professional booking message.
   - 📇 **Save Contact**: Automatically compiles and downloads `Ganapathi_Auto_Kundapura.vcf` (vCard 3.0) for instant addition to iOS/Android address books.
   - 🔗 **Share Card**: Uses native device Web Share API (`navigator.share`) with fallback clipboard copying, custom QR code, and WhatsApp share sheet.
   - 📍 **Get Direction**: Opens turn-by-turn navigation on Google Maps to Goliyangadi, Kundapura.

4. **Interactive "Book a Ride" Enquiry Form**:
   - Pickup and Destination inputs with 1-click popular location chips (*Goliyangadi Stand, Kundapura Bus Stand, Kundapura Railway Stn, Koteshwara, Udupi, Saligrama*).
   - Date, Time, Passenger selector (1-3), and Ride Category (*Local, Outstation, Urgent, Station*).
   - Instant WhatsApp booking transmission and direct call verification.

5. **English / Kannada (`ಕನ್ನಡ`) Language Selector**:
   - Instant bilingual toggling across all labels, buttons, forms, and WhatsApp message templates.

6. **Responsive Mobile & Desktop Experience**:
   - Mobile: Edge-to-edge native mobile card layout with safe areas.
   - Desktop: Centered titanium phone mockup with ambient lighting, comparison view toggle with the original Figma design, and responsive controls.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```
