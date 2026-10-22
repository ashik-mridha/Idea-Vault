import { FaRocket } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";

// Publicly documented origin stories of well-known companies, kept to facts the founders have shared.
const stories = [
  {
    name: "Airbnb",
    year: "2007",
    story:
      "Two roommates in San Francisco could not afford their rent, so they put air mattresses in their living room and rented them to visitors who could not find a hotel during a design conference. That experiment became Airbnb.",
    lesson: "Solve a problem you have yourself, and test it with real customers before building anything big.",
  },
  {
    name: "Dropbox",
    year: "2007",
    story:
      "Drew Houston kept forgetting his USB drive, so he built a way to keep files in sync. Before the product was finished he released a short demo video, and the waiting list grew from thousands to tens of thousands of people.",
    lesson: "A clear demo can prove demand long before the full product exists.",
  },
  {
    name: "Pathao",
    year: "2015",
    story:
      "Pathao started in Dhaka as a motorbike ride-sharing service for people stuck in the city traffic, and later grew into delivery and digital payments for the same customers.",
    lesson: "Start with one painful local problem, then expand to the needs of the customers you already serve.",
  },
];

const SuccessStories = () => (
  <section aria-labelledby="stories-title" className="w-11/12 max-w-7xl mx-auto py-12 md:py-16">
    <div id="stories-title">
      <SectionHeading
        icon={FaRocket}
        title="Success Stories"
        subtitle="Every big company started as a small idea. Here is how a few of them began."
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stories.map(({ name, year, story, lesson }) => (
        <article
          key={name}
          className="card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-300">
            Started {year}
          </p>
          <h3 className="mt-1 text-2xl font-bold">{name}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{story}</p>
          <p className="mt-4 border-t border-slate-200 pt-4 text-sm font-medium dark:border-slate-700">
            <span className="text-indigo-600 dark:text-indigo-300">Lesson: </span>
            {lesson}
          </p>
        </article>
      ))}
    </div>
  </section>
);

export default SuccessStories;
