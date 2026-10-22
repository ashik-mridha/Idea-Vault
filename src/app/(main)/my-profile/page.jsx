"use client";

import { Avatar } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import Field from "@/components/ui/Field";
import PageHeader from "@/components/ui/PageHeader";
import { hasErrors, textError, urlError } from "@/lib/validators";
import { authErrorMessage, useAuth } from "@/providers/AuthProvider";

function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const photo = form.get("photo").trim();

    const found = { name: textError(name, "Name", 2, 60), photo: urlError(photo) };
    setErrors(found);
    if (hasErrors(found)) return;

    setSaving(true);
    try {
      await updateProfile({ displayName: name, photoURL: photo });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const displayName = user.displayName || user.email;

  return (
    <div className="mx-auto w-11/12 max-w-lg py-10">
      <PageTitle title="Profile" />
      <PageHeader title="Profile" subtitle="Update the name and photo shown next to your ideas and comments." />

      <div className="mb-6 flex items-center gap-4">
        <Avatar size="lg">
          {user.photoURL ? <Avatar.Image src={user.photoURL} alt="" referrerPolicy="no-referrer" /> : null}
          <Avatar.Fallback>{displayName.charAt(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-semibold">{displayName}</p>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="card space-y-4 p-6">
        <Field label="Name" name="name" defaultValue={user.displayName || ""} error={errors.name} required />
        <Field label="Photo URL" name="photo" type="url" defaultValue={user.photoURL || ""} placeholder="https://..." error={errors.photo} />
        <button type="submit" className="btn-primary w-full" disabled={saving}>
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>
    </div>
  );
}

export default function MyProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileForm />
    </ProtectedRoute>
  );
}
