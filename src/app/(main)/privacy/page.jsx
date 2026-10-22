import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Privacy Policy | IdeaVault",
  description: "What data IdeaVault collects and how it is used.",
};

const sections = [
  {
    title: "What we collect",
    text: "When you create an account we receive your name, email address and optional profile photo through Firebase Authentication. When you use the site we store the ideas and comments you publish, and any message you send through the contact form.",
  },
  {
    title: "How we use it",
    text: "Your account details identify you as the author of your ideas and comments and let you sign in. Contact messages are used only to reply to you. We do not sell your data and we do not show advertising.",
  },
  {
    title: "What is public",
    text: "Ideas and comments you publish, together with your display name, are visible to every visitor. Your email address is used to match your content to your account and is not shown on idea pages.",
  },
  {
    title: "Third-party services",
    text: "Sign-in is handled by Google Firebase Authentication, and content is stored in a MongoDB database. These providers process data on our behalf under their own privacy terms.",
  },
  {
    title: "Your choices",
    text: "You can edit or delete your ideas and comments at any time from the site. To have your account and data removed, send a request through the contact page.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-11/12 max-w-3xl py-10">
      <PageHeader title="Privacy Policy" subtitle="A plain-language summary of how IdeaVault handles your information." />
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
