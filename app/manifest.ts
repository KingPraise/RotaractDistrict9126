import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rotaract District 9126',
    short_name: 'Rotaract 9126',
    description:
      'Official platform for Rotaract District 9126 — Fellowship, Leadership & Service across 7 Nigerian States.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5F2',
    theme_color: '#981132',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
