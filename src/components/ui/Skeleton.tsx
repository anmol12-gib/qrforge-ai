interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl ${className}`}
      aria-hidden
    />
  );
}

export function QRSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 p-8" aria-label="Loading QR preview">
      <Skeleton className="w-64 h-64 rounded-2xl" />
      <Skeleton className="w-32 h-4" />
    </div>
  );
}
