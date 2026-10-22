"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";

/**
 * GETs `path` from the API (pass null to skip). Requests wait until the sign-in state is
 * known, carry the user's ID token, and re-run when the user signs in or out so that
 * per-user fields such as `isOwner` stay correct.
 * Returns { data, loading, error, reload }.
 */
export function useApiQuery(path) {
  const { user, loading: authLoading } = useAuth();
  const [result, setResult] = useState({ key: null, data: null, error: null });
  const [nonce, setNonce] = useState(0);

  const uid = user?.uid ?? "anonymous";
  const active = path !== null && !authLoading;
  const key = active ? `${path}|${uid}|${nonce}` : null;

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    apiFetch(path)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => !cancelled && setResult({ key, data, error: null }))
      .catch((error) => !cancelled && setResult({ key, data: null, error: error.message }));
    return () => {
      cancelled = true;
    };
  }, [active, path, key]);

  const settled = key !== null && result.key === key;
  return {
    data: settled ? result.data : null,
    error: settled ? result.error : null,
    loading: path !== null && !settled,
    reload: () => setNonce((n) => n + 1),
  };
}
