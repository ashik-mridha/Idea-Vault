const inputClass =
  "w-full rounded-xl border bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 " +
  "dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-60";

/**
 * Labelled form control with an inline error message.
 * `as` can be "input" (default), "textarea" or "select" (pass <option>s as children).
 */
const Field = ({ label, name, error, hint, as: Tag = "input", className = "", children, required, ...props }) => {
  const id = `field-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-red-600 dark:text-red-400" aria-hidden="true"> *</span>}
      </label>
      <Tag
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${inputClass} ${error ? "border-red-500" : "border-slate-300 dark:border-slate-600"}`}
        {...props}
      >
        {children}
      </Tag>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;
