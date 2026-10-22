"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import IdeaForm from "@/components/IdeaForm";
import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch, readError } from "@/lib/api";

function AddIdeaForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    const idea = Object.fromEntries(Object.entries(values).filter(([, v]) => v !== ""));
    setSubmitting(true);
    try {
      const res = await apiFetch("/ideas", { method: "POST", body: JSON.stringify(idea) });
      if (!res.ok) throw new Error(await readError(res, "Failed to publish your idea."));
      toast.success("Idea published successfully!");
      router.push("/items/manage");
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-11/12 max-w-4xl py-10">
      <PageTitle title="Add Idea" />
      <div className="card p-6 md:p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-5xl">Add New Idea</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Share your startup concept with the IdeaVault community.
          </p>
        </div>
        <IdeaForm submitLabel="Publish idea" submitting={submitting} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default function AddIdeaPage() {
  return (
    <ProtectedRoute>
      <AddIdeaForm />
    </ProtectedRoute>
  );
}
