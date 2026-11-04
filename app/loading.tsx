export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-12">
      <div className="mx-auto max-w-7xl animate-pulse">

       
        <div className="mb-10 space-y-3">
          <div className="h-8 w-56 rounded-lg bg-[#E8E1D9]" />
          <div className="h-4 w-80 rounded-lg bg-[#E8E1D9]" />
        </div>

       
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#E8E1D9] bg-white"
            >
              <div className="h-56 w-full bg-[#E8E1D9]" />

              <div className="space-y-4 p-5">
                <div className="h-4 w-24 rounded bg-[#E8E1D9]" />
                <div className="h-6 w-3/4 rounded bg-[#E8E1D9]" />
                <div className="h-4 w-1/2 rounded bg-[#E8E1D9]" />
                <div className="h-10 w-full rounded-lg bg-[#E8E1D9]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}