export default function IssouePageLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-6 h-10 w-32 bg-base-300 rounded"></div>

      {/* Main Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Banner Image Skeleton */}
          <div className="h-96 w-full rounded-lg bg-base-300"></div>

          {/* Title Skeleton */}
          <div className="space-y-4">
            <div className="h-12 bg-base-300 rounded w-3/4"></div>
            <div className="flex gap-3">
              <div className="h-8 bg-base-300 rounded w-24"></div>
              <div className="h-8 bg-base-300 rounded w-32"></div>
              <div className="h-8 bg-base-300 rounded w-24"></div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-4"></div>

          {/* Meta Information Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-base-300 p-4 rounded-lg h-20"></div>
            ))}
          </div>

          {/* Description Skeleton */}
          <div>
            <div className="h-8 bg-base-300 rounded w-48 mb-4"></div>
            <div className="bg-base-100 p-6 rounded-lg border border-base-300 space-y-3">
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-5/6"></div>
              <div className="h-4 bg-base-300 rounded w-4/5"></div>
            </div>
          </div>

          {/* Additional Information Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-base-300 p-6 rounded-lg h-32"></div>
            ))}
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-base-300 p-6 rounded-lg sticky top-4 space-y-6">
            <div className="h-40 bg-base-200 rounded"></div>
            <div className="h-40 bg-base-200 rounded"></div>
            <div className="flex gap-2">
              <div className="h-10 bg-base-200 rounded flex-1"></div>
              <div className="h-10 bg-base-200 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
