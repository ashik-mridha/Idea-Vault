"use client";

import { useState } from "react";
import { CATEGORIES, PRIORITIES } from "@/lib/constants";
import { hasErrors, textError, urlError } from "@/lib/validators";
import Field from "./ui/Field";

const FIELDS = [
  "title",
  "sortDescription",
  "description",
  "category",
  "priority",
  "estimatedBudget",
  "imgUrl",
  "targetAudience",
  "problemStatement",
  "proposedSolution",
  "tags",
];

function validate(values) {
  const errors = {
    title: textError(values.title, "Title", 3, 100),
    sortDescription: textError(values.sortDescription, "Short description", 10, 200),
    description: textError(values.description, "Full description", 30, 5000),
    category: CATEGORIES.includes(values.category) ? undefined : "Choose a category",
    targetAudience: textError(values.targetAudience, "Target audience", 2, 150),
    problemStatement: textError(values.problemStatement, "Problem statement", 20, 2000),
    proposedSolution: textError(values.proposedSolution, "Proposed solution", 20, 2000),
    imgUrl: urlError(values.imgUrl?.trim()),
  };
  if (values.estimatedBudget?.trim() && !(Number(values.estimatedBudget) >= 0)) {
    errors.estimatedBudget = "Enter a number of 0 or more";
  }
  if (values.tags && values.tags.length > 200) errors.tags = "Tags must be at most 200 characters";
  return errors;
}

/** Shared create/edit form. `onSubmit(values)` receives trimmed strings and only runs when valid. */
export default function IdeaForm({ initial = {}, submitLabel, submitting, onSubmit, formId }) {
  const [errors, setErrors] = useState({});

  const read = (form) =>
    Object.fromEntries(FIELDS.map((name) => [name, String(new FormData(form).get(name) ?? "").trim()]));

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = read(e.currentTarget);
    const found = validate(values);
    setErrors(found);
    if (hasErrors(found)) {
      document.getElementById(`field-${FIELDS.find((name) => found[name])}`)?.focus();
      return;
    }
    onSubmit(values);
  };

  // Re-check a field while the user fixes it. Doing this on blur would shift the layout under the
  // pointer and swallow the click on the submit button.
  const recheckField = (e) => {
    const { name } = e.target;
    if (!FIELDS.includes(name) || !errors[name]) return;
    const message = validate(read(e.currentTarget))[name];
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const value = (name) => (initial[name] === undefined || initial[name] === null ? "" : String(initial[name]));

  return (
    <form id={formId} onSubmit={handleSubmit} onChange={recheckField} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field className="md:col-span-2" label="Title" name="title" defaultValue={value("title")} placeholder="A short, clear name for your idea" error={errors.title} required />
        <Field
          as="select"
          label="Category"
          name="category"
          defaultValue={value("category") || ""}
          error={errors.category}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Field>
        <Field as="select" label="Priority" name="priority" defaultValue={value("priority") || "Medium"}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Field>
        <Field
          className="md:col-span-2"
          as="textarea"
          rows={2}
          label="Short description"
          name="sortDescription"
          defaultValue={value("sortDescription")}
          placeholder="One or two sentences that explain the idea"
          hint="10 to 200 characters. Shown on idea cards."
          error={errors.sortDescription}
          required
        />
        <Field
          className="md:col-span-2"
          as="textarea"
          rows={4}
          label="Full description"
          name="description"
          defaultValue={value("description")}
          placeholder="How the idea works, who uses it and how it makes money"
          error={errors.description}
          required
        />
        <Field
          label="Estimated budget (USD)"
          name="estimatedBudget"
          type="number"
          min="0"
          inputMode="numeric"
          defaultValue={value("estimatedBudget")}
          placeholder="e.g. 15000"
          hint="Optional."
          error={errors.estimatedBudget}
        />
        <Field label="Target audience" name="targetAudience" defaultValue={value("targetAudience")} placeholder="Who is this for?" error={errors.targetAudience} required />
        <Field
          className="md:col-span-2"
          as="textarea"
          rows={3}
          label="Problem statement"
          name="problemStatement"
          defaultValue={value("problemStatement")}
          placeholder="What problem does this solve?"
          error={errors.problemStatement}
          required
        />
        <Field
          className="md:col-span-2"
          as="textarea"
          rows={3}
          label="Proposed solution"
          name="proposedSolution"
          defaultValue={value("proposedSolution")}
          placeholder="How does your idea solve it?"
          error={errors.proposedSolution}
          required
        />
        <Field
          label="Image URL"
          name="imgUrl"
          type="url"
          defaultValue={value("imgUrl")}
          placeholder="https://..."
          hint="Optional. A default image is used when empty."
          error={errors.imgUrl}
        />
        <Field label="Tags" name="tags" defaultValue={value("tags")} placeholder="Comma separated, e.g. AI, Education" hint="Optional." error={errors.tags} />
      </div>

      {submitLabel && (
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
      )}
    </form>
  );
}
