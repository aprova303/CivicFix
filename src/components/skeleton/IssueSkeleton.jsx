export default function IssueSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 w-full bg-base-300 overflow-hidden"></div>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* Title Skeleton */}
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-5/6"></div>
        </div>

        {/* Location & Upvotes Skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-4 bg-base-300 rounded w-24"></div>
          <div className="h-4 bg-base-300 rounded w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="card-actions mt-4">
          <div className="h-10 bg-base-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
