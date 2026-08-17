import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join a Rotaract Club — Prospective Member Registration',
  description:
    'Begin your leadership and community service journey with Rotaract District 9126. Submit your intake application to connect with a club in your city or university.',
  alternates: {
    canonical: '/join',
  },
  openGraph: {
    title: 'Join a Rotaract Club | Rotaract District 9126',
    description: 'Find your community, develop leadership skills, and create real impact.',
    url: 'https://rotaractdistrict9126.com.ng/join',
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
