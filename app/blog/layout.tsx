import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact Blog & News Hub — Rotaract District 9126',
  description:
    'Explore the latest impact reports, community stories, club spotlights, leadership summits, and district announcements across Rotaract District 9126 Nigeria.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Impact Blog & News Hub | Rotaract District 9126',
    description: 'Latest impact reports, events, and community stories from 77 clubs across 7 states in Nigeria.',
    url: 'https://rotaractdistrict9126.com.ng/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
