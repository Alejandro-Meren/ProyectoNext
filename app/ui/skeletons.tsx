const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-pink-100 p-4 shadow-lg`}
    >
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        <div className="h-6 w-6 rounded-md bg-pink-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-pink-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-pink-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-pink-100" />
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <div className="h-48 bg-pink-200 rounded-md mb-4"></div>
        <div className="h-4 bg-pink-200 rounded-md mb-2"></div>
        <div className="h-4 bg-pink-200 rounded-md mb-2"></div>
        <div className="h-4 bg-pink-200 rounded-md"></div>
      </div>
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-pink-100" />
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <div className="h-6 bg-pink-200 rounded-md mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 bg-pink-200 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col h-full p-6 md:p-12 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 rounded-lg shadow-lg overflow-hidden">
      <h1 className="mb-4 text-2xl md:text-3xl text-pink-600">
        Loading Dashboard...
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 flex-grow overflow-auto">
        <CardsSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 flex-grow overflow-auto">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </div>
  );
}