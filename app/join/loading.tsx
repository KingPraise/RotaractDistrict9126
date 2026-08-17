import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function JoinLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-[140px] sm:pt-[160px] pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-5 space-y-6">
          <Skeleton className="w-44 h-6 rounded-full" />
          <Skeleton className="w-full h-16 rounded-2xl" />
          <Skeleton className="w-full h-12 rounded-lg" />
          
          <div className="space-y-3 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="w-1/2 h-4 rounded" />
                  <Skeleton className="w-3/4 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card Skeleton */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-black/[0.07] shadow-xl space-y-5">
          <Skeleton className="w-48 h-7 rounded-lg" />
          <Skeleton className="w-3/4 h-4 rounded" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Skeleton className="w-full h-12 rounded-xl" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="w-full h-12 rounded-xl" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <Skeleton className="w-full h-12 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-14 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
