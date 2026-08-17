import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'District Heritage & DRR Historical Lineage (2023–2027)',
  description:
    'Explore the leadership succession and history of Rotaract District 9126 — from District 9125 transition to the inaugural administration and current executive council.',
  alternates: {
    canonical: '/heritage',
  },
  openGraph: {
    title: 'District Heritage & DRR Lineage | Rotaract District 9126',
    description: 'Documenting the visionary leaders of Rotaract District 9126 from 2023 to 2027.',
    url: 'https://rotaractdistrict9126.com.ng/heritage',
  },
};

export default function HeritageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
