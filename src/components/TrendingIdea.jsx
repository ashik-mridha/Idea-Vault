"use client";

import Link from "next/link";
import { FaFire } from "react-icons/fa";
import { useApiQuery } from "@/hooks/useApiQuery";
import IdeaCard from "./IdeaCard";
import CardGridSkeleton from "./ui/CardGridSkeleton";
import SectionHeading from "./ui/SectionHeading";

const TrendingIdea = () => {
  const { data: ideas, loading, error, reload } = useApiQuery("/ideas/trending?limit=6");

  return (
    <section aria-labelledby="trending-title" className="w-11/12 max-w-7xl mx-auto py-12 md:py-16">
      <div id="trending-title">
        <SectionHeading
          icon={FaFire}
          title="Trending Ideas"
          subtitle="The startup concepts getting the most feedback from the IdeaVault community right now."
        />
      </div>

      {loading ? (
        <CardGridSkeleton />
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-slate-600 dark:text-slate-400 mb-4">We could not load trending ideas right now.</p>
          <button type="button" onClick={reload} className="btn-outline">
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/items" className="btn-outline">
              Browse all ideas
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default TrendingIdea;
