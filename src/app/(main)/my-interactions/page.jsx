"use client";

import Link from "next/link";
import LoadingSpiner from "@/components/LoadingSpiner";
import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageHeader from "@/components/ui/PageHeader";
import SafeImage from "@/components/ui/SafeImage";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

function Interactions() {
  const { data, loading, error, reload } = useApiQuery("/my-interactions");
  const interactions = data ?? [];

  return (
    <div className="mx-auto w-11/12 max-w-5xl py-10">
      <PageTitle title="My Interactions" />
      <PageHeader title="My Interactions" subtitle="Ideas you have commented on." />

      {loading ? (
        <LoadingSpiner />
      ) : error ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">We could not load your interactions.</p>
          <button type="button" onClick={reload} className="btn-outline">
            Try again
          </button>
        </div>
      ) : interactions.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">You have not commented on any ideas yet.</p>
          <Link href="/items" className="btn-primary">
            Browse ideas
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4">
          {interactions.map((item) => (
            <li key={String(item.commentId)} className="card flex flex-col gap-4 p-4 md:flex-row">
              {item.idea && (
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 md:w-40">
                  <SafeImage src={item.idea.imgUrl} alt="" fill sizes="160px" className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {item.idea ? (
                    <Link href={`/items/${item.ideaId}`} className="link-focus text-indigo-600 hover:underline dark:text-indigo-300">
                      {item.idea.title}
                    </Link>
                  ) : (
                    "This idea is no longer available"
                  )}
                </h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">{item.text}</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{formatDateTime(item.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MyInteractionsPage() {
  return (
    <ProtectedRoute>
      <Interactions />
    </ProtectedRoute>
  );
}
