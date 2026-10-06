// Cookie consent helpers. One small first-party cookie remembers the visitor's choice.
// To add analytics later: add a field here (for example `analytics`), a switch in
// CookieConsent.astro, and load the script only when getConsent()?.analytics is true.

export interface Consent {
  v: 1;
  /** Google Maps and other embedded third-party content */
  maps: boolean;
  ts: number;
}

export const CONSENT_COOKIE = "mfc_consent";
const MAX_AGE = 60 * 60 * 24 * 182; // about 6 months

export function getConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return parsed?.v === 1 ? (parsed as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(maps: boolean): Consent {
  const value: Consent = { v: 1, maps, ts: Date.now() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  document.dispatchEvent(new CustomEvent("mfc:consent", { detail: value }));
  return value;
}

export function onConsent(fn: (c: Consent) => void) {
  document.addEventListener("mfc:consent", (e) => fn((e as CustomEvent<Consent>).detail));
}
