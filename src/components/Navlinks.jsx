"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`link-focus block py-1 font-medium transition-colors ${
        isActive
          ? "text-indigo-600 dark:text-indigo-300"
          : "text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navlinks;
