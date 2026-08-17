import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-[140px] sm:pt-[160px] pb-24 px-6 sm:px-10 max-w-7xl mx-auto space-y-12">
      {/* Hero Skeleton */}
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto">
        <Skeleton className="w-40 h-6 rounded-full" />
        <Skeleton className="w-3/4 h-16 rounded-2xl" />
        <Skeleton className="w-full h-8 rounded-lg" />
      </div>

      {/* Featured Lead Story Skeleton */}
      <div className="rounded-3xl bg-white border border-black/[0.06] p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <Skeleton className="w-24 h-5 rounded-full" />
          <Skeleton className="w-full h-10 rounded-xl" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-3/4 h-4 rounded" />
          <div className="pt-4 flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-16 h-3 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl bg-white border border-black/[0.06] p-5 shadow-sm space-y-4">
            <Skeleton className="w-full h-52 rounded-xl" />
            <Skeleton className="w-20 h-5 rounded-full" />
            <Skeleton className="w-full h-6 rounded" />
            <Skeleton className="w-2/3 h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
