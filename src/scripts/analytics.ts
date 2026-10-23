/**
 * Google Analytics 4, loaded only after the visitor accepts analytics cookies.
 *
 * The choice is kept in localStorage ("mist-consent": "granted" | "denied"), which is not a cookie.
 * Without consent nothing is loaded and track() does nothing.
 */
import { site } from '../data/site';

const STORAGE_KEY = 'mist-consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 395; // 13 months, in seconds

type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode: the choice holds for this page view only.
  }
  if (value === 'granted') loadAnalytics();
  else revokeAnalytics();
}

function loadAnalytics() {
  const id = site.analytics.measurementId;
  if (!id) return;
  if (loaded) {
    // Consent given again after a "Decline" on the same page.
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', id, { cookie_expires: COOKIE_MAX_AGE, allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.append(script);
}

/** Stops tracking and removes the Google Analytics cookies (_ga, _ga_*). */
function revokeAnalytics() {
  if (loaded) window.gtag('consent', 'update', { analytics_storage: 'denied' });
  const host = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  });
}

/** Sends a GA event when the visitor has consented; otherwise does nothing. */
export function track(event: string, params: Record<string, string> = {}) {
  if (loaded && getConsent() === 'granted') window.gtag('event', event, params);
}

/** Loads GA for returning visitors who already agreed, and tracks the agreed clicks. */
export function initAnalytics() {
  if (getConsent() === 'granted') loadAnalytics();

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const gapReview = target.closest<HTMLAnchorElement>(`a[href="${site.gapReview.url}"]`);
    if (gapReview) track('gap_review_click', { location: gapReview.dataset.trackLocation ?? 'link' });
    if (target.closest(`a[href="${site.gapReview.bookCallUrl}"]`)) track('book_call_click');
    if (target.closest('[data-copy-email]')) track('copy_email');
    if (target.closest('a[href^="mailto:"]')) track('email_click');
  });
}
