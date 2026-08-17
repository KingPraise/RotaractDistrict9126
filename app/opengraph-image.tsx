import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rotaract District 9126 — Leadership, Fellowship & Service';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0E1A 0%, #15050C 50%, #981132 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Gold & Cranberry Accent Bars */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '8px',
            background: 'linear-gradient(90deg, #981132, #D91B5C, #D4A520)',
          }}
        />

        {/* Rotary Badge / Lockup */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              padding: '6px 20px',
              borderRadius: '999px',
              background: 'rgba(217, 27, 92, 0.2)',
              border: '1px solid rgba(217, 27, 92, 0.4)',
              color: '#FF4D8D',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ROTARY INTERNATIONAL
          </div>
          <div
            style={{
              padding: '6px 20px',
              borderRadius: '999px',
              background: 'rgba(212, 165, 32, 0.2)',
              border: '1px solid rgba(212, 165, 32, 0.4)',
              color: '#D4A520',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            DISTRICT 9126
          </div>
        </div>

        {/* Display Title */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: '0 0 20px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Fellowship. Service.{' '}
          <span style={{ color: '#F87171' }}>Impact.</span>
        </h1>

        {/* Narrative Subtitle */}
        <p
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.75)',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
            margin: '0 0 40px 0',
          }}
        >
          Uniting 77 Clubs and 700+ Young Leaders across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi & Niger
        </p>

        {/* 3 Metric Pills */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '12px 32px',
            }}
          >
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#D4A520' }}>77</span>
            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Active Clubs
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '12px 32px',
            }}
          >
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#D4A520' }}>700+</span>
            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Rotaractors
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '12px 32px',
            }}
          >
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#D4A520' }}>50,000+</span>
            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Beneficiaries
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
