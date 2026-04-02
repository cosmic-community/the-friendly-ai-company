export default function ShopLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="gradient-hero py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 w-40 bg-sunshine-200 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-80 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-100 rounded-xl mx-auto animate-pulse" />
        </div>
      </section>

      {/* Products Grid skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-card animate-pulse">
                <div className="h-56 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                  <div className="h-6 w-48 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}