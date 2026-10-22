const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center mb-10">
    <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center gap-3">
      {Icon && <Icon className="text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />}
      {title}
    </h2>
    {subtitle && (
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-3">{subtitle}</p>
    )}
  </div>
);

export default SectionHeading;
