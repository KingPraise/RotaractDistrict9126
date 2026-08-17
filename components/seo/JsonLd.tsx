import React from 'react';

export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Rotaract District 9126',
    alternateName: 'Rotaract D9126 Nigeria',
    url: 'https://rotaractdistrict9126.com.ng',
    logo: 'https://rotaractdistrict9126.com.ng/images/rotaract-logo.png',
    image: 'https://rotaractdistrict9126.com.ng/images/rotaract-logo.png',
    description:
      'Official digital platform for Rotaract District 9126 — uniting 77 chartered clubs and over 700 young leaders across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states for humanitarian service, youth leadership, and professional development.',
    foundingDate: '2009',
    parentOrganization: {
      '@type': 'NGO',
      name: 'Rotary International',
      url: 'https://www.rotary.org',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Oyo State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Osun State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Ondo State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Ekiti State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Kwara State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Kogi State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Niger State, Nigeria' },
    ],
    knowsAbout: [
      'Youth Leadership Development',
      'Humanitarian Community Service',
      'Polio Eradication & Public Health',
      'Water, Sanitation & Hygiene (WASH)',
      'Basic Education & Literacy',
      'Maternal & Child Health',
      'Economic & Community Development',
    ],
    sameAs: [
      'https://www.facebook.com/rotaractdistrict9126',
      'https://www.instagram.com/rotaractdistrict9126',
      'https://twitter.com/rotaract9126',
      'https://www.linkedin.com/company/rotaractdistrict9126',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'District Secretariat',
      email: 'secretariat@rotaractdistrict9126.com.ng',
      areaServed: 'NG',
      availableLanguage: ['English', 'Yoruba', 'Hausa'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rotaract District 9126',
    url: 'https://rotaractdistrict9126.com.ng',
    description: 'Empowering youth leaders across South-West & North-Central Nigeria.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://rotaractdistrict9126.com.ng/clubs?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
