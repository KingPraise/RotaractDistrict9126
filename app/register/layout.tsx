import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the District — Rotaract District 9126 Identity System',
  description: 'Create your Rotaract District 9126 account to join over 700 young leaders across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states.',
  alternates: {
    canonical: '/register',
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
