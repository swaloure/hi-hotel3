'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <div className="h-screen min-h-[700px] bg-secondary animate-pulse flex items-center justify-center">
      <div className="text-center">
        <Skeleton className="h-8 w-32 mx-auto mb-4" />
        <Skeleton className="h-16 w-96 mx-auto mb-6" />
        <Skeleton className="h-4 w-64 mx-auto mb-8" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function RoomsSectionSkeleton() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-1 w-16 mx-auto mb-6" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-1 w-16 mx-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card rounded-2xl p-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 mb-6">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
