import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Rotaract District 9126 Identity System',
  description: 'Sign in to access your District 9126 member profile, club console, verified digital ID card, and dues tracker.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
