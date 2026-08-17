import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password — Rotaract District 9126 Identity System',
  description: 'Reset your password to regain access to your District 9126 account, member dashboard, and club portal.',
  alternates: {
    canonical: '/forgot-password',
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
