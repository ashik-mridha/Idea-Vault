"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import Field from "@/components/ui/Field";
import PageHeader from "@/components/ui/PageHeader";
import { apiFetch, readError } from "@/lib/api";
import { SITE } from "@/lib/site";
import { emailError, hasErrors, textError } from "@/lib/validators";

export default function ContactPage() {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      message: data.get("message").trim(),
    };

    const found = {
      name: textError(values.name, "Name", 2, 80),
      email: emailError(values.email),
      message: textError(values.message, "Message", 10, 2000),
    };
    setErrors(found);
    if (hasErrors(found)) return;

    setSubmitting(true);
    try {
      const res = await apiFetch("/contact", { method: "POST", body: JSON.stringify(values) });
      if (!res.ok) throw new Error(await readError(res));
      toast.success("Message sent. Thank you for reaching out!");
      form.reset();
      setSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-11/12 max-w-3xl py-10">
      <PageTitle title="Contact" />
      <PageHeader
        title="Contact us"
        subtitle="Questions, feedback or ideas for improving IdeaVault? Send us a message and we will read it."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <form onSubmit={onSubmit} noValidate className="card space-y-4 p-6 md:col-span-2">
          <Field label="Name" name="name" autoComplete="name" error={errors.name} required />
          <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} required />
          <Field as="textarea" rows={5} label="Message" name="message" error={errors.message} required />
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Sending..." : "Send message"}
          </button>
          {sent && (
            <p role="status" className="text-sm text-green-700 dark:text-green-400">
              Your message was received.
            </p>
          )}
        </form>

        <aside className="card h-fit p-6 text-sm">
          <h2 className="mb-3 text-lg font-bold">Other ways to reach us</h2>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            {SITE.contactEmail && (
              <li>
                Email:{" "}
                <a href={`mailto:${SITE.contactEmail}`} className="link-focus text-indigo-600 hover:underline dark:text-indigo-300">
                  {SITE.contactEmail}
                </a>
              </li>
            )}
            <li>Location: {SITE.location}</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
