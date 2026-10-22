import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Terms of Use | IdeaVault",
  description: "The rules for using IdeaVault.",
};

const sections = [
  {
    title: "Using IdeaVault",
    text: "IdeaVault is a place to share startup ideas and give feedback. You must provide accurate account details and keep your sign-in credentials private.",
  },
  {
    title: "Your content",
    text: "You keep ownership of the ideas and comments you publish. By publishing them you allow IdeaVault to display them to other visitors. Because ideas are public, do not post anything confidential or that you are not ready to share.",
  },
  {
    title: "Acceptable behaviour",
    text: "Do not post content that is unlawful, abusive, misleading or that infringes someone else's rights, and do not attempt to disrupt the service or access other people's accounts. We may remove content or accounts that break these rules.",
  },
  {
    title: "No guarantees",
    text: "Feedback on IdeaVault comes from community members and is not professional, legal or financial advice. The service is provided as is, without any promise that it will always be available or error free.",
  },
  {
    title: "Changes",
    text: "We may update these terms as the site evolves. Continuing to use IdeaVault after a change means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto w-11/12 max-w-3xl py-10">
      <PageHeader title="Terms of Use" subtitle="The simple rules that keep IdeaVault useful for everyone." />
      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="mb-2 text-xl font-bold">{s.title}</h2>
            <p className="leading-7 text-slate-600 dark:text-slate-300">{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
