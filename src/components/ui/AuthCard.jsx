const AuthCard = ({ title, subtitle, children }) => (
  <div className="mx-auto my-10 w-11/12 max-w-md md:my-16">
    <div className="card p-6 md:p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

export default AuthCard;
