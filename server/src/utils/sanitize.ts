import xss from "xss";

export function sanitizeObject<T>(value: T): T {
  if (typeof value === "string") return xss(value.trim()) as T;
  if (Array.isArray(value)) return value.map((item) => sanitizeObject(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeObject(item)])) as T;
  }
  return value;
}
