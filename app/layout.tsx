import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rotaract District 9126 | Leadership, Fellowship & Service',
  description:
    'Official digital platform for Rotaract District 9126 covering Oyo, Osun, Ogun, Ondo, and Ekiti states.',
  openGraph: {
    title: 'Rotaract District 9126',
    description: 'Empowering youth leaders across Nigeria through fellowship, professional development, and community impact.',
    url: 'https://rotaractdistrict9126.com.ng',
    siteName: 'Rotaract District 9126',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080C14] text-slate-100 antialiased selection:bg-[#D91B5C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
