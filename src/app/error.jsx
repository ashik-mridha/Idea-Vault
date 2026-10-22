"use client";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-3xl font-bold md:text-5xl">Something went wrong</h1>
      <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
        We could not load this page. Please check your connection and try again.
      </p>
      <button type="button" onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
