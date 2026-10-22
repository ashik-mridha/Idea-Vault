"use client";

import { Avatar, Spinner } from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiMenu, FiMoon, FiSun, FiUser, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { NAV_LINKS, SITE, USER_MENU_LINKS } from "@/lib/site";
import { authErrorMessage, useAuth } from "@/providers/AuthProvider";
import Navlinks from "./Navlinks";

const menuItemClass =
  "flex w-full items-center gap-2 px-4 py-2 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-800 " +
  "focus-visible:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    try {
      await logout();
      toast.success("You have been logged out");
    } catch (error) {
      toast.error(authErrorMessage(error));
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const themeToggle = (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="btn-outline h-10 w-10 p-0! text-lg"
      aria-label="Toggle dark mode"
    >
      <FiMoon className="dark:hidden" aria-hidden="true" />
      <FiSun className="hidden dark:block" aria-hidden="true" />
    </button>
  );

  const authArea = loading ? (
    <Spinner size="sm" />
  ) : user ? (
    <div className="relative" ref={profileRef}>
      <button
        type="button"
        onClick={() => setProfileOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={profileOpen}
        aria-label="Open user menu"
        className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 p-1 md:pr-3 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <Avatar size="sm">
          {user.photoURL ? <Avatar.Image src={user.photoURL} alt="" referrerPolicy="no-referrer" /> : null}
          <Avatar.Fallback>{displayName.charAt(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>
        <span className="hidden md:inline text-sm font-medium max-w-32 truncate">{displayName}</span>
      </button>

      {profileOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-2 z-50"
        >
          <div className="px-4 pb-2 mb-1 border-b border-slate-200 dark:border-slate-700">
            <p className="font-semibold truncate">{displayName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
          </div>
          {USER_MENU_LINKS.map((link) => (
            <Link key={link.href} href={link.href} role="menuitem" className={menuItemClass} onClick={() => setProfileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/my-profile" role="menuitem" className={menuItemClass} onClick={() => setProfileOpen(false)}>
            <FiUser aria-hidden="true" /> Profile
          </Link>
          <button type="button" role="menuitem" onClick={handleLogout} className={`${menuItemClass} text-red-600 dark:text-red-400`}>
            <FiLogOut aria-hidden="true" /> Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="hidden md:flex items-center gap-3">
      <Link href="/login" className="btn-outline">
        Login
      </Link>
      <Link href="/register" className="btn-primary">
        Register
      </Link>
    </div>
  );

  return (
    <nav aria-label="Main" className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
      <div className="w-11/12 max-w-7xl mx-auto flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="link-focus text-2xl md:text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text tracking-tighter shrink-0"
        >
          {SITE.name}
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Navlinks href={link.href}>{link.label}</Navlinks>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {themeToggle}
          {authArea}
          <button
            type="button"
            className="btn-outline h-10 w-10 p-0! text-xl md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <ul className="w-11/12 mx-auto py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Navlinks href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Navlinks>
              </li>
            ))}
            {!loading && !user && (
              <li className="flex gap-3 pt-2">
                <Link href="/login" className="btn-outline flex-1" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="btn-primary flex-1" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
