export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-accent-green animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-accent-green animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-accent-green animate-bounce" />
      </div>
    </div>
  );
}
