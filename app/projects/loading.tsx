import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-[140px] sm:pt-[160px] pb-24 px-6 lg:px-10 max-w-7xl mx-auto space-y-12">
      {/* Hero Header Skeleton */}
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto">
        <Skeleton className="w-44 h-6 rounded-full" />
        <Skeleton className="w-3/4 h-16 rounded-2xl" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>

      {/* 3D Carousel Stage Skeleton */}
      <div className="w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden relative shadow-lg">
        <Skeleton className="w-full h-full" />
      </div>

      {/* 4-Metric Ribbon Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white rounded-2xl p-6 border border-black/[0.06] shadow-sm">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-4">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-16 h-8 rounded-lg" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>
        ))}
      </div>

      {/* Masonry Feed Skeletons */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {[360, 260, 300, 280, 340, 280].map((h, idx) => (
          <div key={idx} className="break-inside-avoid mb-5">
            <div 
              style={{ height: `${h}px` }} 
              className="rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-md p-5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="w-20 h-5 rounded-full" />
                <Skeleton className="w-12 h-5 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-3/4 h-5 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="w-20 h-5 rounded-full" />
                  <Skeleton className="w-20 h-5 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
