import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import StartupCategories from "@/components/StartupCategories";
import SuccessStories from "@/components/SuccessStories";
import TrendingIdea from "@/components/TrendingIdea";

export default function Home() {
  return (
    <>
      <Banner />
      <TrendingIdea />
      <StartupCategories />
      <HowItWorks />
      <SuccessStories />
    </>
  );
}
