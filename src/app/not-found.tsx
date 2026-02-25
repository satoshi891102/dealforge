import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-4">
      <div className="text-center max-w-md">
        <p className="font-mono text-6xl font-bold text-accent-green mb-4">404</p>
        <h2 className="text-xl font-semibold text-text-primary mb-2">Page not found</h2>
        <p className="text-text-secondary text-sm mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-bg-surface border border-border-default text-text-primary rounded-xl text-sm font-medium hover:border-border-hover transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
