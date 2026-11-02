export function CardSkeleton() {
  return <div className="h-[340px] animate-pulse rounded-2xl bg-line" />;
}

export function PageSkeleton() {
  return (
    <div className="wrap py-10">
      <div className="mb-6 h-9 w-64 animate-pulse rounded-lg bg-line" />
      <div className="h-64 animate-pulse rounded-2xl bg-line" />
    </div>
  );
}
