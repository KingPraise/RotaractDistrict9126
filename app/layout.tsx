import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/seo/JsonLd';
import AwwwardsPreloader from '@/components/ui/AwwwardsPreloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  themeColor: '#981132',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rotaractdistrict9126.com.ng'),
  title: {
    default: 'Rotaract District 9126 | Leadership, Fellowship & Service across 7 States',
    template: '%s | Rotaract District 9126',
  },
  description:
    'Official digital platform for Rotaract District 9126 — uniting 77 chartered clubs and 700+ young leaders across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states for humanitarian service, youth leadership, and community impact.',
  applicationName: 'Rotaract District 9126',
  authors: [{ name: 'Rotaract District 9126 Secretariat', url: 'https://rotaractdistrict9126.com.ng' }],
  creator: 'Rotaract District 9126',
  publisher: 'Rotaract District 9126',
  category: 'Community Organization & Youth Leadership',
  keywords: [
    'Rotaract District 9126',
    'Rotaract 9126',
    'Rotary International District 9126',
    'Rotaract Nigeria',
    'Rotaract Clubs in Oyo State',
    'Rotaract Clubs in Osun State',
    'Rotaract Clubs in Ondo State',
    'Rotaract Clubs in Ekiti State',
    'Rotaract Clubs in Kwara State',
    'Rotaract Clubs in Niger State',
    'Rotaract Clubs in Kogi State',
    'Rotary Youth Leadership Nigeria',
    'Humanitarian Projects Nigeria',
    'District 9126 Nigeria',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://rotaractdistrict9126.com.ng',
    siteName: 'Rotaract District 9126 Nigeria',
    title: 'Rotaract District 9126 | Leadership, Fellowship & Service across 7 States',
    description:
      'Uniting 77 chartered clubs and 700+ young leaders across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states for humanitarian service, youth leadership, and community transformation.',
    images: [
      {
        url: '/images/rotaract-logo.png',
        width: 1200,
        height: 630,
        alt: 'Rotaract District 9126 Leadership & Community Impact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rotaract9126',
    creator: '@rotaract9126',
    title: 'Rotaract District 9126 | Leadership, Fellowship & Service across 7 States',
    description:
      'Uniting 77 chartered clubs and 700+ young leaders across 7 Nigerian states for impactful community projects and leadership development.',
    images: ['/images/rotaract-logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/images/favicon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'NG-OY',
    'geo.placename': 'Nigeria',
    'geo.position': '7.3775;3.9470',
    'ICBM': '7.3775, 3.9470',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://basemaps.cartocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://basemaps.cartocdn.com" />
        <JsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased bg-[#F8F5F2] text-[#1C1C1E]">
        <AwwwardsPreloader />
        {children}
      </body>
    </html>
  );
}
