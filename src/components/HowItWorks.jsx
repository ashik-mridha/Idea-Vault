import Link from "next/link";
import { FaComments, FaListAlt, FaPenFancy } from "react-icons/fa";
import { FaRoute } from "react-icons/fa6";
import SectionHeading from "./ui/SectionHeading";

const steps = [
  {
    Icon: FaPenFancy,
    title: "1. Share your idea",
    text: "Describe the problem, your proposed solution, the audience and a rough budget in one short form.",
  },
  {
    Icon: FaComments,
    title: "2. Get community feedback",
    text: "Other members read your pitch and leave comments, questions and suggestions you can act on.",
  },
  {
    Icon: FaListAlt,
    title: "3. Refine and manage",
    text: "Update your idea as you learn, and keep every idea you have published in one place.",
  },
];

const HowItWorks = () => (
  <section aria-labelledby="how-title" className="w-11/12 max-w-7xl mx-auto py-12 md:py-16">
    <div id="how-title">
      <SectionHeading
        icon={FaRoute}
        title="How It Works"
        subtitle="From a rough thought to a validated concept in three simple steps."
      />
    </div>

    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map(({ Icon, title, text }) => (
        <li key={title} className="card p-6 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-2xl text-purple-600 dark:bg-purple-950 dark:text-purple-300">
            <Icon aria-hidden="true" />
          </span>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
        </li>
      ))}
    </ol>

    <div className="text-center mt-10">
      <Link href="/items/add" className="btn-primary">
        Share your idea
      </Link>
    </div>
  </section>
);

export default HowItWorks;
