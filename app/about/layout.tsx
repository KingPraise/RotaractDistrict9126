import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About District 9126 — Heritage, History & Leadership Council',
  description:
    'Discover the history, founding charter, and leadership structure of Rotaract District 9126 across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About District 9126 | Heritage & Leadership',
    description: 'Our heritage, history from District 9125 transition, and the sitting executive council.',
    url: 'https://rotaractdistrict9126.com.ng/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
