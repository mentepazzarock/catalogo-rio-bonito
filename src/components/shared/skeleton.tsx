import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-xl bg-slate-200/70', className)} />
  )
}

export function BusinessCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
      <Skeleton className="h-36 rounded-none" />
      <div className="p-4 pt-10 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}

export function BusinessListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <BusinessCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CategoryChipsSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-24 rounded-full shrink-0" />
      ))}
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}
