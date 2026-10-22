import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
      <p className="mb-6 text-xl text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or was moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
