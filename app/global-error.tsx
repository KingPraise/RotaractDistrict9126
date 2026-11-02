'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error Boundary]', error);
    const onPopState = () => window.location.reload();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgb(248, 245, 244)',
          fontFamily: 'Inter, sans-serif',
          padding: 24,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1C1C1E', marginBottom: 12 }}>
            We hit a snag
          </h1>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>
            Something unexpected happened. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              background: '#981132',
              color: 'white',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              marginRight: 8,
            }}
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = '/')}
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              background: 'white',
              color: '#1C1C1E',
              fontWeight: 700,
              border: '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          >
            Go home
          </button>
        </div>
      </body>
    </html>
  );
}
