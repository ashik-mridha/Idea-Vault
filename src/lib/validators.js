const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emailError(value) {
  if (!value) return "Email is required";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
}

export function passwordError(value) {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
  if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
}

export function urlError(value, { required = false } = {}) {
  if (!value) return required ? "URL is required" : undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
  } catch {
    return "Enter a valid URL starting with http:// or https://";
  }
}

export function textError(value, label, min, max = Infinity) {
  const text = (value || "").trim();
  if (!text) return `${label} is required`;
  if (text.length < min) return `${label} must be at least ${min} characters`;
  if (text.length > max) return `${label} must be at most ${max} characters`;
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
