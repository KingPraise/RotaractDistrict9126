import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function ClubsLoading() {
  return (
    <div className="h-screen overflow-hidden flex flex-col pt-[76px] bg-[#F8F5F2]">
      <div className="flex-1 flex overflow-hidden">
        {/* Left column list skeleton */}
        <div className="w-full lg:w-[37%] flex flex-col h-full border-r border-black/[0.07] bg-white/90 p-6 space-y-4">
          <Skeleton className="w-24 h-4 rounded-full" />
          <Skeleton className="w-56 h-8 rounded-xl" />
          <Skeleton className="w-full h-10 rounded-xl" />
          
          {/* Pills row */}
          <div className="flex gap-2 pb-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-16 h-7 rounded-full shrink-0" />
            ))}
          </div>

          {/* Cards List Skeleton */}
          <div className="space-y-3 flex-1 overflow-hidden pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/70 border border-black/[0.06] space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-11 h-11 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="w-3/4 h-4 rounded" />
                    <Skeleton className="w-1/2 h-3 rounded" />
                  </div>
                  <Skeleton className="w-14 h-5 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-5 rounded-full" />
                  <Skeleton className="w-24 h-5 rounded-full" />
                  <Skeleton className="w-16 h-5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column map skeleton */}
        <div className="hidden lg:flex flex-1 h-full p-4 items-center justify-center bg-slate-100 relative">
          <div className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center">
            <Skeleton className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
              <div className="w-8 h-8 rounded-full border-2 border-[#981132] border-t-transparent animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#981132] font-sans">
                Loading District Map…
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
