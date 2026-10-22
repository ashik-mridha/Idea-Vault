import { auth } from "./firebase";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

/** Fetches from the API; sends the Firebase ID token when someone is signed in. */
export async function apiFetch(path, options = {}) {
  const headers = { ...options.headers };
  if (options.body) headers["Content-Type"] = "application/json";

  const user = auth?.currentUser;
  if (user) headers.Authorization = `Bearer ${await user.getIdToken()}`;

  return fetch(`${API_URL}${path}`, { ...options, headers });
}

/** Reads the first useful message out of a failed API response. */
export async function readError(res, fallback = "Something went wrong. Please try again.") {
  const body = await res.json().catch(() => null);
  if (body?.errors) return Object.values(body.errors)[0];
  return body?.message || fallback;
}
