'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error Boundary]', error);
  }, [error]);

  // If the user navigates back/forward after a crash, do a hard reload so the
  // page recovers instead of staying stuck on the error screen.
  useEffect(() => {
    const onPopState = () => window.location.reload();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'rgb(248, 245, 244)', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-md w-full text-center bg-white rounded-2xl border border-black/10 shadow-lg p-8">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] mb-3">
          Something went wrong
        </div>
        <h1 className="text-2xl font-black text-[#1C1C1E] mb-3">We hit a snag</h1>
        <p className="text-sm text-gray-600 mb-6">
          This page ran into an unexpected problem. You can try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-sm font-bold transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full border border-black/10 text-[#1C1C1E] text-sm font-bold hover:bg-black/[0.04] transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
