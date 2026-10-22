import { Spinner } from "@heroui/react";

const LoadingSpiner = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <Spinner size="lg" />
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
};

export default LoadingSpiner;
