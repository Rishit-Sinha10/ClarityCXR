export default function DashboardLoading() {
  return (
    <div
      className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7"
      aria-busy="true"
      aria-label="Loading workspace"
    >
      <div className="rounded-xl border border-hairline bg-card p-5 sm:p-6">
        <div className="h-2.5 w-24 animate-pulse rounded-full bg-plate" />
        <div className="mt-4 h-7 w-52 animate-pulse rounded-md bg-plate" />
        <div className="mt-3 h-3 w-80 max-w-full animate-pulse rounded-full bg-plate" />
        <div className="mt-5 h-10 w-full animate-pulse rounded-lg bg-plate/70" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border border-hairline bg-card"
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 min-[1400px]:grid-cols-[minmax(0,1fr)_300px]">
        <div className="h-[430px] animate-pulse rounded-xl border border-hairline bg-card" />
        <div className="grid gap-4 md:grid-cols-3 min-[1400px]:grid-cols-1">
          <div className="h-40 animate-pulse rounded-xl border border-hairline bg-card" />
          <div className="h-40 animate-pulse rounded-xl border border-hairline bg-card" />
        </div>
      </div>
      <span className="sr-only">Loading dashboard content…</span>
    </div>
  );
}
