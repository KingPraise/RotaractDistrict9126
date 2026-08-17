import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rotaract District 9126 — Leadership, Fellowship & Service';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const logoSrc = 'https://rotaractdistrict9126.com.ng/images/rotaract-logo.png';
  const heroSrc = 'https://images.unsplash.com/photo-1584789873389-48e7320e350a?w=1200&h=800&fit=crop&auto=format';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #070A12 0%, #12040A 45%, #1C050E 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '48px 56px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Accent Gradient Border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #981132 0%, #D91B5C 50%, #D4A520 100%)',
          }}
        />

        {/* Ambient Radial Glow in background */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '5%',
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, rgba(217, 27, 92, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ================= LEFT COLUMN: ROTARACT LOGO, HEADLINE & STATS ================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '53%',
            height: '100%',
            zIndex: 10,
          }}
        >
          {/* Logo & Category Badges Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              marginBottom: '22px',
            }}
          >
            {/* Official Rotaract Logo on Left */}
            <img
              src={logoSrc}
              alt="Rotaract Logo"
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.6))',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    padding: '5px 14px',
                    borderRadius: '999px',
                    background: 'rgba(217, 27, 92, 0.28)',
                    border: '1px solid rgba(217, 27, 92, 0.6)',
                    color: '#FF4D8D',
                    fontSize: '13px',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  ROTARY
                </div>
                <div
                  style={{
                    padding: '5px 14px',
                    borderRadius: '999px',
                    background: 'rgba(212, 165, 32, 0.28)',
                    border: '1px solid rgba(212, 165, 32, 0.6)',
                    color: '#D4A520',
                    fontSize: '13px',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  DISTRICT 9126
                </div>
              </div>
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                South-West & North-Central Nigeria
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.05,
              margin: '0 0 14px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Fellowship. Service.{' '}
            <span style={{ color: '#F87171' }}>Impact.</span>
          </h1>

          {/* Narrative Subtitle */}
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.78)',
              lineHeight: 1.4,
              margin: '0 0 24px 0',
            }}
          >
            Uniting 77 Chartered Clubs & 700+ Young Leaders across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi & Niger.
          </p>

          {/* 3 Metric Badges */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '14px',
                padding: '8px 20px',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#D4A520', lineHeight: 1 }}>77</span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px' }}>
                Clubs
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '14px',
                padding: '8px 20px',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#D4A520', lineHeight: 1 }}>700+</span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px' }}>
                Leaders
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '14px',
                padding: '8px 20px',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#D4A520', lineHeight: 1 }}>50K+</span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px' }}>
                Impacted
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: FEATURED ACTION IMAGE CARD ================= */}
        <div
          style={{
            display: 'flex',
            width: '43%',
            height: '100%',
            position: 'relative',
            borderRadius: '22px',
            overflow: 'hidden',
            border: '2px solid rgba(217, 27, 92, 0.45)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 50px rgba(152, 17, 50, 0.35)',
          }}
        >
          <img
            src={heroSrc}
            alt="Rotaract District 9126 Community Action"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Subtle gradient vignette over photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(7, 10, 18, 0.88) 0%, rgba(7, 10, 18, 0.25) 50%, transparent 100%)',
            }}
          />

          {/* Bottom Card Pill Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderRadius: '14px',
              background: 'rgba(7, 10, 18, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              District 9126 in Action
            </span>
            <span
              style={{
                color: '#D4A520',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              7 States · Nigeria
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
