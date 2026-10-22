"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import EditIdeaModal from "@/components/EditIdeaModal";
import LoadingSpiner from "@/components/LoadingSpiner";
import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageHeader from "@/components/ui/PageHeader";
import SafeImage from "@/components/ui/SafeImage";
import { useApiQuery } from "@/hooks/useApiQuery";
import { apiFetch, readError } from "@/lib/api";
import { formatBudget, formatDate } from "@/lib/format";

function RowActions({ idea, isOwner, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={`/items/${idea._id}`} className="btn-outline px-3! py-1.5!" aria-label={`View ${idea.title}`}>
        <FiEye aria-hidden="true" /> View
      </Link>
      {isOwner && (
        <>
          <button type="button" className="btn-outline px-3! py-1.5!" onClick={onEdit} aria-label={`Edit ${idea.title}`}>
            <FiEdit2 aria-hidden="true" /> Edit
          </button>
          <button type="button" className="btn-danger px-3! py-1.5!" onClick={onDelete} aria-label={`Delete ${idea.title}`}>
            <FiTrash2 aria-hidden="true" /> Delete
          </button>
        </>
      )}
    </div>
  );
}

function ManageIdeas() {
  const { data, loading, error, reload } = useApiQuery("/ideas");
  const ideas = data ?? [];

  const [editIdea, setEditIdea] = useState(null);
  const [deleteIdea, setDeleteIdea] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSave = async (id, values) => {
    setBusy(true);
    try {
      const res = await apiFetch(`/idea/${id}`, { method: "PUT", body: JSON.stringify(values) });
      if (!res.ok) throw new Error(await readError(res, "Update failed."));
      toast.success("Idea updated");
      setEditIdea(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmDelete = async () => {
    setBusy(true);
    try {
      const res = await apiFetch(`/idea/${deleteIdea._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await readError(res, "Delete failed."));
      toast.success("Idea deleted");
      setDeleteIdea(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  

  return (
    <div className="mx-auto w-11/12 max-w-7xl py-10">
      <PageTitle title="Manage Ideas" />
      <PageHeader
        title="Manage Ideas"
        subtitle="Every idea on IdeaVault. You can edit or delete the ideas you published; all others are view-only."
      />

      {loading ? (
        <LoadingSpiner />
      ) : error ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">We could not load the ideas.</p>
          <button type="button" onClick={reload} className="btn-outline">
            Try again
          </button>
        </div>
      ) : ideas.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-xl font-semibold">There are no ideas yet.</p>
          <Link href="/items/add" className="btn-primary">
            Add the first idea
          </Link>
        </div>
      ) : (
        <>
          <div className="card hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">All ideas</caption>
              <thead className="border-b border-slate-200 bg-slate-100 text-xs uppercase tracking-wide dark:border-slate-700 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-4 py-3">Idea</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3">Budget</th>
                  <th scope="col" className="px-4 py-3">Author</th>
                  <th scope="col" className="px-4 py-3">Posted</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {ideas.map((idea) => (
                  <tr key={idea._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                          <SafeImage src={idea.imgUrl} alt="" fill sizes="64px" className="object-cover" />
                        </div>
                        <span className="max-w-64 truncate font-medium">{idea.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{idea.category}</td>
                    <td className="px-4 py-3">{formatBudget(idea.estimatedBudget)}</td>
                    <td className="px-4 py-3">{idea.authorName || "Unknown"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(idea.createdAt)}</td>
                    <td className="px-4 py-3">
                      <RowActions idea={idea} isOwner={idea.isOwner} onEdit={() => setEditIdea(idea)} onDelete={() => setDeleteIdea(idea)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-4 md:hidden">
            {ideas.map((idea) => (
              <li key={idea._id} className="card p-4">
                <div className="flex gap-3">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                    <SafeImage src={idea.imgUrl} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{idea.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {idea.category} &middot; {formatBudget(idea.estimatedBudget)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {idea.authorName || "Unknown"} &middot; {formatDate(idea.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <RowActions idea={idea} isOwner={idea.isOwner} onEdit={() => setEditIdea(idea)} onDelete={() => setDeleteIdea(idea)} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <EditIdeaModal idea={editIdea} isOpen={!!editIdea} saving={busy} onClose={() => setEditIdea(null)} onSave={handleSave} />
      <DeleteConfirmModal
        isOpen={!!deleteIdea}
        title={deleteIdea?.title}
        deleting={busy}
        onClose={() => setDeleteIdea(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default function ManageIdeasPage() {
  return (
    <ProtectedRoute>
      <ManageIdeas />
    </ProtectedRoute>
  );
}
