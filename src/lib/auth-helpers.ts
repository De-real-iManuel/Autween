const REDIRECT_ORIGIN = "https://autween.invalid";
const DEFAULT_REDIRECT = "/dashboard";

/** Accept only same-origin path redirects. Never forward an arbitrary URL. */
export function safeLocalRedirectPath(candidate: string | null | undefined): string {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("\\\\")) {
    return DEFAULT_REDIRECT;
  }
  if (/[\\u0000-\\u001f\\u007f]/.test(candidate)) return DEFAULT_REDIRECT;

  try {
    const resolved = new URL(candidate, REDIRECT_ORIGIN);
    if (resolved.origin !== REDIRECT_ORIGIN) return DEFAULT_REDIRECT;
    return resolved.pathname + resolved.search + resolved.hash;
  } catch {
    return DEFAULT_REDIRECT;
  }
}

/** Require an explicit canonical site origin for email-auth redirects. */
export function configuredSiteOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    const localHost = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    if (parsed.username || parsed.password) return null;
    if (parsed.protocol !== "https:" && !(localHost && parsed.protocol === "http:")) return null;
    if (parsed.pathname !== "/" || parsed.search || parsed.hash) return null;
    return parsed.origin;
  } catch {
    return null;
  }
}
