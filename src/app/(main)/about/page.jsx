import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "About | IdeaVault",
  description: "Why IdeaVault exists, how it works and who builds it.",
};

const steps = [
  { title: "Post", text: "Describe your startup idea: the problem, your solution, the audience and a rough budget." },
  { title: "Discuss", text: "Community members comment with questions, risks and suggestions." },
  { title: "Improve", text: "Edit your idea as you learn, then keep track of everything you have published." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-11/12 max-w-5xl py-10">
      <PageHeader
        title="About IdeaVault"
        subtitle="IdeaVault is a community where aspiring founders share startup ideas and get honest feedback before they invest time and money."
      />

      <div className="relative mb-10 h-56 w-full overflow-hidden rounded-2xl md:h-80">
        <Image
          src="/assets/banner-2.jpg"
          alt="A hand touching a glowing interface that connects phones, laptops and desktops"
          fill
          sizes="(max-width: 1024px) 92vw, 1024px"
          className="object-cover"
        />
      </div>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold md:text-4xl">Our mission</h2>
        <p className="leading-7 text-slate-600 dark:text-slate-300">
          Most startups fail because they build something nobody needs. Our mission is to make it easy and free to test
          an idea early: write it down clearly, put it in front of people who will challenge it, and decide what to do
          next with real feedback in hand.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">How it works</h2>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="card p-6">
              <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">Step {i + 1}</p>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold md:text-4xl">Who builds it</h2>
        <p className="leading-7 text-slate-600 dark:text-slate-300">
          IdeaVault is an open project built in Dhaka, Bangladesh.
          The source code for the website and its API lives on GitHub (see the footer link), and suggestions are
          welcome through the contact page.
        </p>
      </section>

      <div className="card p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Have an idea worth testing?</h2>
        <p className="mb-6 text-slate-600 dark:text-slate-300">
          Browse what others are building, or publish your own in a couple of minutes.
        </p>
        <Link href="/items" className="btn-primary">
          Explore ideas
        </Link>
      </div>
    </div>
  );
}
