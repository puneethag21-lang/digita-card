import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ganapathi - Auto Rickshaw Services | ZEO Cards',
  description: 'Digital Business Card for Ganapathi Auto Rickshaw Services across Kundapura-Udupi. Book rides, call, WhatsApp, or get directions instantly.',
  keywords: ['Ganapathi Auto', 'Kundapura Auto', 'Udupi Auto Rickshaw', 'ZEO Cards', 'Goliyangadi Auto Stand', 'Local Outstation Rides'],
  authors: [{ name: 'Ganapathi' }],
  openGraph: {
    title: 'Ganapathi - Auto Rickshaw Services | ZEO Cards',
    description: 'Reliable rides across Kundapura-Udupi. Call 9535129792 or chat on WhatsApp.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFC107',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center antialiased selection:bg-[#FFC107] selection:text-black">
        {children}
      </body>
    </html>
  );
}
