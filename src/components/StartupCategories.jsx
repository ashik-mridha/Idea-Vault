"use client";

import Link from "next/link";
import {
  FaBriefcase,
  FaGraduationCap,
  FaHeartbeat,
  FaLaptopCode,
  FaLeaf,
  FaRegSmile,
  FaRobot,
  FaCoins,
  FaShapes,
} from "react-icons/fa";
import { useApiQuery } from "@/hooks/useApiQuery";
import SectionHeading from "./ui/SectionHeading";

const details = {
  Tech: { Icon: FaLaptopCode, text: "Software, hardware and platforms that make everyday work easier." },
  Health: { Icon: FaHeartbeat, text: "Healthcare access, wellbeing and care for patients and families." },
  AI: { Icon: FaRobot, text: "Tools that use machine learning to automate and personalise." },
  Education: { Icon: FaGraduationCap, text: "Learning platforms and services built around students." },
  Finance: { Icon: FaCoins, text: "Payments, lending, savings and money tools for small businesses." },
  Business: { Icon: FaBriefcase, text: "Marketplaces, logistics and services that help businesses grow." },
  Environment: { Icon: FaLeaf, text: "Clean energy, recycling and ideas that reduce environmental harm." },
  Lifestyle: { Icon: FaRegSmile, text: "Fitness, community and everyday-life ideas for better living." },
};

const StartupCategories = () => {
  const { data: counts } = useApiQuery("/categories");
  const countFor = (name) => counts?.find((c) => c.category === name)?.count;

  return (
    <section aria-labelledby="categories-title" className="w-11/12 max-w-7xl mx-auto py-12 md:py-16">
      <div id="categories-title">
        <SectionHeading
          icon={FaShapes}
          title="Startup Categories"
          subtitle="Pick an industry to see the ideas the community has shared in it."
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(details).map(([name, { Icon, text }]) => {
          const count = countFor(name);
          return (
            <li key={name}>
              <Link
                href={`/items?category=${encodeURIComponent(name)}`}
                className="card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
                <p className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                  {count === undefined ? "View ideas" : `${count} ${count === 1 ? "idea" : "ideas"}`}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default StartupCategories;
