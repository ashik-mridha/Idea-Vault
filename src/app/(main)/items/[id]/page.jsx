import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Comment from "@/components/comment";
import IdeaCard from "@/components/IdeaCard";
import SafeImage from "@/components/ui/SafeImage";
import { API_URL } from "@/lib/api";
import { formatBudget, formatDate, splitTags } from "@/lib/format";

async function getJson(path) {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (res.status === 400 || res.status === 404) return null;
  if (!res.ok) throw new Error(`API request failed (${res.status})`);
  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const idea = await getJson(`/idea/${id}`).catch(() => null);
  return {
    title: idea ? `${idea.title} | IdeaVault` : "Idea not found | IdeaVault",
    description: idea?.sortDescription,
  };
}

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;

  const idea = await getJson(`/idea/${id}`);
  if (!idea?._id) notFound();
  const related = (await getJson(`/idea/${id}/related`)) ?? [];

  const {
    title,
    category,
    imgUrl,
    sortDescription,
    description,
    problemStatement,
    proposedSolution,
    targetAudience,
    estimatedBudget,
    priority,
    tags,
    authorName,
    createdAt,
    updatedAt,
  } = idea;

  const specs = [
    ["Category", category],
    ["Estimated budget", formatBudget(estimatedBudget)],
    ["Priority", priority],
    ["Target audience", targetAudience],
    ["Posted on", formatDate(createdAt)],
  ].filter(([, value]) => value);

  const additional = [
    ["Author", authorName],
    ["Last updated", formatDate(updatedAt)],
  ].filter(([, value]) => value);

  const tagList = splitTags(tags);

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-8">
      <Link href="/items" className="btn-outline mb-6 px-3!">
        <FaArrowLeft aria-hidden="true" /> Back to all ideas
      </Link>

      <article>
        <div className="card flex flex-col gap-8 p-6 lg:flex-row">
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 lg:h-96 lg:w-1/2">
            <SafeImage
              src={imgUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              {category}
            </p>
            <h1 className="mt-1 text-3xl font-bold md:text-5xl">{title}</h1>
            {sortDescription && (
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{sortDescription}</p>
            )}

            <h2 className="mt-6 mb-2 text-lg font-semibold">Specifications</h2>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800 sm:grid-cols-2">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="card p-6">
            <h2 className="mb-2 text-xl font-semibold">Problem statement</h2>
            <p className="leading-7 text-slate-600 dark:text-slate-300">{problemStatement}</p>
          </section>
          <section className="card p-6">
            <h2 className="mb-2 text-xl font-semibold">Proposed solution</h2>
            <p className="leading-7 text-slate-600 dark:text-slate-300">{proposedSolution}</p>
          </section>
        </div>

        <section className="card mt-6 p-6">
          <h2 className="mb-2 text-xl font-semibold">Full description</h2>
          <p className="whitespace-pre-line leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </section>

        <section className="card mt-6 p-6">
          <h2 className="mb-3 text-xl font-semibold">Additional information</h2>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {additional.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          {tagList.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {tagList.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-6 text-2xl font-bold md:text-3xl">
            Related ideas
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <IdeaCard key={item._id} idea={item} />
            ))}
          </div>
        </section>
      )}

      <Comment ideaId={id} />
    </div>
  );
}
