/**
 * GDPR/UK GDPR consent state management.
 *
 * Categories (matching TCF/GTM Consent Mode v2):
 *   - analytics_storage   : GA4, Plausible, Hotjar, Clarity
 *   - ad_storage          : Meta Pixel, TikTok, LinkedIn, Bing, X, Snap, Pinterest
 *   - functionality_storage : Hotjar session recording (treated as analytics)
 *   - security_storage    : always on (auth, fraud, rate-limit — never needs consent)
 *
 * Default state (before user interaction) = all denied.
 * Persisted in localStorage under "kh_consent" + cookie "kh_consent" for server reads.
 */

export type ConsentCategory = "analytics_storage" | "ad_storage" | "functionality_storage";
export type ConsentState = Record<ConsentCategory, boolean> & { timestamp: number; version: string };

const STORAGE_KEY = "kh_consent";
const CONSENT_VERSION = "1.0.0";
const CATEGORIES: ConsentCategory[] = [
  "analytics_storage",
  "ad_storage",
  "functionality_storage",
];

const DEFAULT_STATE: ConsentState = {
  analytics_storage: false,
  ad_storage: false,
  functionality_storage: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

/** Read consent from localStorage (client-only). */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    // Version migration: if version mismatches, reset to defaults so banner re-shows
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...parsed, version: CONSENT_VERSION };
  } catch {
    return DEFAULT_STATE;
  }
}

/** Has the user consented to a specific category? */
export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()[category] === true;
}

/** Has the user made ANY choice (so we can hide the banner)? */
export function hasDecided(): boolean {
  return getConsent().timestamp > 0;
}

/** Persist consent choice + notify all subscribers + push to GTM dataLayer. */
export function setConsent(state: Partial<Record<ConsentCategory, boolean>>) {
  if (typeof window === "undefined") return;
  const full: ConsentState = {
    ...DEFAULT_STATE,
    ...state,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  // Mirror into a cookie for server-side reads (httpOnly=false, expires in 1 year)
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(full))}; expires=${expires}; path=/; SameSite=Lax`;
  // GTM Consent Mode v2 push
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "consent_update",
      analytics_storage: full.analytics_storage ? "granted" : "denied",
      ad_storage: full.ad_storage ? "granted" : "denied",
      functionality_storage: full.functionality_storage ? "granted" : "denied",
      wait_for_update: 500,
    });
  }
  // Notify our React subscribers
  window.dispatchEvent(new CustomEvent("consent:updated", { detail: full }));
}

/** Accept all (most common on consulting sites — users want to talk to you). */
export function acceptAll() {
  const all = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: true }), {} as Record<ConsentCategory, boolean>);
  setConsent(all);
}

/** Reject all (essential only). */
export function rejectAll() {
  const none = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: false }), {} as Record<ConsentCategory, boolean>);
  setConsent(none);
}

/** Granular accept (from the settings modal). */
export function saveGranular(choices: Record<ConsentCategory, boolean>) {
  setConsent(choices);
}

/** Read consent from cookies on the server (for SSR edge cases). */
export function getConsentFromCookie(cookieHeader: string | null): ConsentState {
  if (!cookieHeader) return DEFAULT_STATE;
  try {
    const match = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${STORAGE_KEY}=`));
    if (!match) return DEFAULT_STATE;
    const value = decodeURIComponent(match.slice(STORAGE_KEY.length + 1));
    return { ...DEFAULT_STATE, ...JSON.parse(value), version: CONSENT_VERSION };
  } catch {
    return DEFAULT_STATE;
  }
}
