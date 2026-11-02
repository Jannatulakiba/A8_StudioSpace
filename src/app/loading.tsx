export default function Loading() {
  return (
    <div className="wrap py-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[300px] animate-pulse rounded-2xl bg-line" />
        ))}
      </div>
    </div>
  );
}
