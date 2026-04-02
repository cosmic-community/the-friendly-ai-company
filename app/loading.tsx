export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sunshine-50">
      <div className="text-center">
        <div className="text-6xl animate-float mb-4">🤖</div>
        <p className="text-lg text-gray-500 font-medium">Loading something friendly...</p>
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-3 h-3 bg-sunshine-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-meadow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}