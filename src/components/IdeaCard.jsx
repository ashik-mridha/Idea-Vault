import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { formatBudget } from "@/lib/format";
import SafeImage from "./ui/SafeImage";

const IdeaCard = ({ idea }) => {
  const { _id, title, category, imgUrl, sortDescription, targetAudience, estimatedBudget } = idea;

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:shadow-lg">
      <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800">
        <SafeImage
          src={imgUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
          {category}
        </p>
        <h3 className="mt-1 text-xl font-bold line-clamp-1">{title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-2">
          {sortDescription || `For ${targetAudience}`}
        </p>

        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-slate-500 dark:text-slate-400">Budget</dt>
            <dd className="font-semibold">{formatBudget(estimatedBudget)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-slate-500 dark:text-slate-400 shrink-0">Audience</dt>
            <dd className="truncate text-right">{targetAudience}</dd>
          </div>
        </dl>

        <Link href={`/items/${_id}`} className="btn-primary mt-4 w-full">
          View Details <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default IdeaCard;
