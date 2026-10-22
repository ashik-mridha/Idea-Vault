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
import { emailError, hasErrors, passwordError, textError, urlError } from "@/lib/validators";
import { authErrorMessage, useAuth } from "@/providers/AuthProvider";

function RegisterForm() {
  const router = useRouter();
  const requested = useSearchParams().get("redirect");
  const redirectPath = isSafeRedirect(requested) ? requested : "/";
  const { register, googleLogin } = useAuth();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const password = form.get("password");
    const photo = form.get("photo").trim();

    const found = {
      name: textError(name, "Name", 2, 60),
      email: emailError(email),
      password: passwordError(password),
      photo: urlError(photo),
    };
    setErrors(found);
    if (hasErrors(found)) return;

    setSubmitting(true);
    try {
      await register(name, email, password, photo);
      toast.success("Account created successfully!");
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
    <AuthCard title="Create Account" subtitle="Join IdeaVault and start sharing ideas">
      <PageTitle title="Register" />
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <Field label="Name" name="name" autoComplete="name" placeholder="Your full name" error={errors.name} required />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} required />
        <Field
          label="Photo URL"
          name="photo"
          type="url"
          placeholder="https://..."
          hint="Optional. A link to a profile picture."
          error={errors.photo}
        />
        <PasswordField
          autoComplete="new-password"
          placeholder="Create a password"
          hint="At least 6 characters with an uppercase and a lowercase letter."
          error={errors.password}
          required
        />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
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
        Already have an account?{" "}
        <Link href="/login" className="link-focus font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<p className="py-20 text-center">Loading...</p>}>
      <RegisterForm />
    </Suspense>
  );
}
