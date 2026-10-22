"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import AuthCard from "@/components/ui/AuthCard";
import Field from "@/components/ui/Field";
import PasswordField from "@/components/ui/PasswordField";
import { isSafeRedirect } from "@/lib/format";
import { emailError, hasErrors } from "@/lib/validators";
import { authErrorMessage, useAuth } from "@/providers/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const requested = useSearchParams().get("redirect");
  const redirectPath = isSafeRedirect(requested) ? requested : "/";
  const { login, googleLogin } = useAuth();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    const found = { email: emailError(email), password: password ? undefined : "Password is required" };
    setErrors(found);
    if (hasErrors(found)) return;

    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back to IdeaVault");
      router.push(redirectPath);
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setSubmitting(true);
    try {
      await googleLogin();
      toast.success("Signed in with Google");
      router.push(redirectPath);
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to share and validate startup ideas">
      <PageTitle title="Login" />
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} required />
        <PasswordField autoComplete="current-password" placeholder="Enter your password" error={errors.password} required />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        or
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <button type="button" className="btn-outline w-full" onClick={onGoogle} disabled={submitting}>
        <FcGoogle className="text-xl" aria-hidden="true" /> Continue with Google
      </button>

      <p className="mt-6 text-center text-sm">
        New here?{" "}
        <Link href="/register" className="link-focus font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="py-20 text-center">Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
}
