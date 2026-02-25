export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl bg-card/60"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
