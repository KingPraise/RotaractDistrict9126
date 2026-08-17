import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find a Rotaract Club Near You — 77 Chartered Clubs Directory',
  description:
    'Discover and join any of the 77 Rotaract clubs across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states. Explore meeting locations, schedules, and leadership.',
  alternates: {
    canonical: '/clubs',
  },
  openGraph: {
    title: 'Find a Rotaract Club Near You | District 9126',
    description: 'Explore 77 active community, campus, and e-clubs across South-West & North-Central Nigeria.',
    url: 'https://rotaractdistrict9126.com.ng/clubs',
  },
};

export default function ClubsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
