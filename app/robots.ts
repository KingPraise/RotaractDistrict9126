import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/portal/admin/'],
      },
    ],
    sitemap: 'https://rotaractdistrict9126.com.ng/sitemap.xml',
    host: 'https://rotaractdistrict9126.com.ng',
  };
}
