import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-[140px] sm:pt-[160px] pb-24 px-6 lg:px-10 max-w-7xl mx-auto space-y-12">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto">
        <Skeleton className="w-36 h-6 rounded-full" />
        <Skeleton className="w-3/4 h-16 rounded-2xl" />
        <Skeleton className="w-full h-8 rounded-lg" />
      </div>

      {/* 2-Column Story Showcase Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <Skeleton className="w-32 h-5 rounded-full" />
          <Skeleton className="w-full h-10 rounded-xl" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-4/5 h-4 rounded" />
          <div className="pt-4 flex gap-4">
            <Skeleton className="w-32 h-11 rounded-full" />
            <Skeleton className="w-32 h-11 rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-6 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      {/* 7 Constituent States Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-24 h-6 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-16 h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
