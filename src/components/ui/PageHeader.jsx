const PageHeader = ({ title, subtitle }) => (
  <div className="mb-8">
    <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
    {subtitle && <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl">{subtitle}</p>}
  </div>
);

export default PageHeader;
