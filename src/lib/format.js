const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatBudget(value) {
  const n = Number(value);
  if (value === undefined || value === null || value === "" || !Number.isFinite(n) || n <= 0) {
    return "Not specified";
  }
  return usd.format(n);
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export function splitTags(tags) {
  return typeof tags === "string" ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

export function isSafeRedirect(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//");
}
