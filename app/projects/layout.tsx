import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flagship Humanitarian Projects & Community Impact',
  description:
    'Explore documented legacy projects of Rotaract District 9126 — including Operation Vaccinate 500, Clean Water for Offa, Digital Skills Academy, and Hunger Relief across 7 states.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Flagship Humanitarian Projects | Rotaract District 9126',
    description: '180+ completed projects, 50,000+ lives impacted across 7 Nigerian states.',
    url: 'https://rotaractdistrict9126.com.ng/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
