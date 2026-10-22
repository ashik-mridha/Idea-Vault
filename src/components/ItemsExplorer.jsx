"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useApiQuery } from "@/hooks/useApiQuery";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/constants";
import Field from "./ui/Field";
import IdeaCard from "./IdeaCard";
import CardGridSkeleton from "./ui/CardGridSkeleton";

const FILTER_KEYS = ["search", "category", "sort", "minBudget", "maxBudget", "startDate", "endDate"];

function Filters({ initial, onApply, onClear }) {
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(FILTER_KEYS.map((key) => [key, String(form.get(key) ?? "").trim()]));

    const found = {};
    if (values.minBudget && !(Number(values.minBudget) >= 0)) found.minBudget = "Enter 0 or more";
    if (values.maxBudget && !(Number(values.maxBudget) >= 0)) found.maxBudget = "Enter 0 or more";
    if (values.minBudget && values.maxBudget && Number(values.minBudget) > Number(values.maxBudget)) {
      found.maxBudget = "Must be at least the minimum";
    }
    if (values.startDate && values.endDate && values.startDate > values.endDate) {
      found.endDate = "Must be after the start date";
    }
    setErrors(found);
    if (Object.keys(found).length) return;
    onApply(values);
  };

  return (
    <form onSubmit={submit} noValidate className="card p-4 md:p-6 mb-8 space-y-4" aria-label="Filter ideas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="field-search" className="block text-sm font-medium mb-1.5">
            Search
          </label>
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="field-search"
              name="search"
              type="search"
              defaultValue={initial.search}
              placeholder="Search by title, summary or tag"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-base dark:border-slate-600 dark:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>
        </div>
        <Field as="select" label="Category" name="category" defaultValue={initial.category || "All"}>
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Field>
        <Field as="select" label="Sort by" name="sort" defaultValue={initial.sort || "newest"}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Field>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Min budget (USD)" name="minBudget" type="number" min="0" inputMode="numeric" defaultValue={initial.minBudget} error={errors.minBudget} />
        <Field label="Max budget (USD)" name="maxBudget" type="number" min="0" inputMode="numeric" defaultValue={initial.maxBudget} error={errors.maxBudget} />
        <Field label="Posted from" name="startDate" type="date" defaultValue={initial.startDate} />
        <Field label="Posted until" name="endDate" type="date" defaultValue={initial.endDate} error={errors.endDate} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          Apply filters
        </button>
        <button type="button" onClick={onClear} className="btn-outline">
          Clear
        </button>
      </div>
    </form>
  );
}

export default function ItemsExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) || ""]));

  const apiParams = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    if (current[key] && !(key === "category" && current[key] === "All")) apiParams.set(key, current[key]);
  }
  const queryString = apiParams.toString();
  const { data: ideas, loading, error, reload } = useApiQuery(`/ideas${queryString ? `?${queryString}` : ""}`);

  const apply = (values) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (value && !(key === "category" && value === "All") && !(key === "sort" && value === "newest")) {
        params.set(key, value);
      }
    }
    const qs = params.toString();
    router.push(qs ? `/items?${qs}` : "/items");
  };

  // `key` remounts the form so its inputs follow the URL (links from the home page, Clear, back button).
  return (
    <>
      <Filters key={searchParams.toString()} initial={current} onApply={apply} onClear={() => router.push("/items")} />

      {loading ? (
        <CardGridSkeleton />
      ) : error ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">We could not load ideas right now.</p>
          <button type="button" onClick={reload} className="btn-outline">
            Try again
          </button>
        </div>
      ) : ideas.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-xl font-semibold">No ideas match your filters</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Try a different search term or clear the filters.</p>
          <button type="button" onClick={() => router.push("/items")} className="btn-primary mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400" role="status">
            Showing {ideas.length} {ideas.length === 1 ? "idea" : "ideas"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
