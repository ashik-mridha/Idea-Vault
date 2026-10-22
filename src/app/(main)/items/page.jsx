import { Suspense } from "react";
import ItemsExplorer from "@/components/ItemsExplorer";
import PageHeader from "@/components/ui/PageHeader";
import CardGridSkeleton from "@/components/ui/CardGridSkeleton";

export const metadata = {
  title: "Explore Ideas | IdeaVault",
  description: "Search and filter startup ideas shared by the IdeaVault community.",
};

export default function ItemsPage() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10">
      <PageHeader
        title="Explore Startup Ideas"
        subtitle="Search by keyword, then narrow the list by category, budget and date."
      />
      <Suspense fallback={<CardGridSkeleton />}>
        <ItemsExplorer />
      </Suspense>
    </div>
  );
}
