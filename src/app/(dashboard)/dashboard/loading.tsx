export default function Loading() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-bg-elevated rounded-xl" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-bg-elevated rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-bg-elevated rounded-2xl" />
    </div>
  );
}
