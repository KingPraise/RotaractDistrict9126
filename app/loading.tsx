import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-[140px] sm:pt-[160px] pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center gap-4 mb-16 text-center">
        <Skeleton className="w-36 h-7 rounded-full" />
        <Skeleton className="w-3/4 sm:w-1/2 h-14 rounded-2xl" />
        <Skeleton className="w-2/3 sm:w-1/3 h-5 rounded-lg" />
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-4">
            <Skeleton className="w-full h-48 rounded-xl" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-5 rounded-full" />
              <Skeleton className="w-16 h-5 rounded-full ml-auto" />
            </div>
            <Skeleton className="w-3/4 h-6 rounded-lg" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-2/3 h-4 rounded" />
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-16 h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
