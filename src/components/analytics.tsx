"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Analytics — comprehensive multi-platform tracking.
 *
 * Loads ALL configured SDKs immediately (not consent-gated — privacy handled
 * by GTM Consent Mode v2). Each SDK only loads when its env var is set.
 * Silently skips if unconfigured — zero overhead.
 *
 * Supported SDKs:
 *   - Google Tag Manager (GTM) — preferred; manages GA4 + Consent Mode v2
 *   - Google Analytics 4 (gtag) — fallback if no GTM
 *   - Microsoft Clarity — free session replay + heatmaps
 *   - Meta / Facebook Pixel — Facebook + Instagram ad tracking
 *   - TikTok Pixel — TikTok ad tracking
 *   - LinkedIn Insight Tag — LinkedIn B2B ad tracking
 *   - Google Ads — Google search/display ad tracking
 *   - Microsoft UET — Bing ad tracking
 *   - Reddit Pixel — Reddit ad tracking
 *   - Beehiiv — newsletter list management
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: {
      track: (...args: unknown[]) => void;
      page: () => void;
      load: (id: string) => void;
      methods: string[];
      queue: unknown[];
      setAndDefer: (t: unknown, e: string) => void;
      instance: unknown;
    };
    _linkedin_data_partner_ids?: unknown[];
    lintrk?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    uetq?: unknown[];
    rdt?: (...args: unknown[]) => void;
    plausible?: (...args: unknown[]) => void;
    beehiiv?: (...args: unknown[]) => void;
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_PARTNER_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const MICROSOFT_UET_ID = process.env.NEXT_PUBLIC_MICROSOFT_UET_TAG_ID;
const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID;
const BEEHIIV_PUBLICATION_ID = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID;

export function Analytics() {
  const pathname = usePathname();
  const prevPath = useRef<string>("");

  // Page view tracking on SPA navigation
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // GA4 / GTM
    if (GA4_ID && typeof window.gtag === "function") {
      window.gtag("config", GA4_ID, { page_path: pathname, anonymize_ip: true });
    }
    if (GOOGLE_ADS_ID && typeof window.gtag === "function") {
      window.gtag("config", GOOGLE_ADS_ID);
    }

    // Meta Pixel
    if (window.fbq && META_PIXEL_ID) {
      window.fbq("track", "PageView");
    }

    // TikTok
    if (window.ttq && TIKTOK_PIXEL_ID) {
      window.ttq.page();
    }

    // LinkedIn
    if (window.lintrk && LINKEDIN_PARTNER_ID) {
      window.lintrk("track", { conversion_id: 0 });
    }

    // Reddit
    if (window.rdt && REDDIT_PIXEL_ID) {
      window.rdt("track", "PageVisit");
    }

    // Microsoft UET
    if (window.uetq && MICROSOFT_UET_ID) {
      window.uetq.push("event", "page_view", {});
    }

    // First-party log (legacy events API — kept for backward compat with existing dashboard widgets)
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "page_view", page: pathname }),
      keepalive: true,
    }).catch(() => {});

    // ─── First-party session + pageview tracking (new) ───────────
    // This powers the marketing dashboard: visitors, bounce rate,
    // time-on-page, traffic sources, device breakdown, etc.
    if (typeof navigator === "undefined" || navigator.doNotTrack === "1") return;

    // Get or create a stable sessionId for the visitor
    const SESSION_KEY = "kh_sid";
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    // Parse UTM params from URL (only captured on landing, then in sessionStorage)
    const UTM_KEY = "kh_utm";
    let utm: Record<string, string> | undefined;
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    if (utmSource) {
      utm = {
        source: utmSource || "",
        medium: urlParams.get("utm_medium") || "",
        campaign: urlParams.get("utm_campaign") || "",
        term: urlParams.get("utm_term") || "",
        content: urlParams.get("utm_content") || "",
      };
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    } else {
      const stored = sessionStorage.getItem(UTM_KEY);
      if (stored) {
        try { utm = JSON.parse(stored); } catch { /* ignore */ }
      }
    }

    // Beacon the pageview
    const payload = JSON.stringify({
      sessionId,
      page: pathname,
      title: document.title,
      referrer: document.referrer || undefined,
      utm,
      screen: { width: window.screen.width, height: window.screen.height },
    });
    try {
      navigator.sendBeacon("/api/analytics/collect", new Blob([payload], { type: "application/json" }));
    } catch {
      // Fallback if sendBeacon is unavailable
      void fetch("/api/analytics/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  // Scroll depth + time-on-page tracking
  useEffect(() => {
    const scrollMilestones = [25, 50, 75, 90, 100];
    const firedScroll = new Set<number>();
    const timeMilestones = [
      { ms: 30_000, label: "30s" },
      { ms: 60_000, label: "60s" },
      { ms: 120_000, label: "2m" },
      { ms: 180_000, label: "3m" },
    ];
    const firedTime = new Set<string>();
    const timers: ReturnType<typeof setTimeout>[] = [];

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const m of scrollMilestones) {
        if (pct >= m && !firedScroll.has(m)) {
          firedScroll.add(m);
          void trackEvent("scroll_depth", {
            category: "engagement",
            label: `${m}%`,
            value: m,
          });

          // Also update the pageview's scroll depth in the new analytics system
          const sid = sessionStorage.getItem("kh_sid");
          if (sid) {
            try {
              navigator.sendBeacon(
                "/api/analytics/collect",
                new Blob(
                  [JSON.stringify({ sessionId: sid, scrollDepth: m })],
                  { type: "application/json" },
                ),
              );
            } catch { /* ignore */ }
            // Also PATCH the pageview scroll depth
            void fetch("/api/analytics/collect", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: sid, scrollDepth: m }),
              keepalive: true,
            }).catch(() => {});
          }
        }
      }
    }

    // Time-on-page milestones
    for (const t of timeMilestones) {
      const timer = setTimeout(() => {
        if (!firedTime.has(t.label)) {
          firedTime.add(t.label);
          void trackEvent("time_on_page", {
            category: "engagement",
            label: t.label,
            page: pathname,
          });
        }
      }, t.ms);
      timers.push(timer);
    }

    // Social + outbound link click tracking
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";

      // Social link tracking
      const socialDomains = ["linkedin.com", "twitter.com", "facebook.com", "instagram.com", "youtube.com", "tiktok.com"];
      const isSocial = socialDomains.some(d => href.includes(d));
      if (isSocial) {
        const platform = socialDomains.find(d => href.includes(d))?.replace(".com", "") || "social";
        void trackEvent("social_click", {
          category: "engagement",
          label: platform,
          page: pathname,
        });
      }

      // Outbound link tracking (external links, not social)
      const isExternal = href.startsWith("http") && !href.includes(window.location.hostname);
      if (isExternal && !isSocial) {
        void trackEvent("outbound_click", {
          category: "engagement",
          label: href.slice(0, 100),
          page: pathname,
        });
      }

      // File download tracking
      const fileExtensions = [".pdf", ".zip", ".doc", ".docx", ".xls", ".xlsx"];
      if (fileExtensions.some(ext => href.toLowerCase().endsWith(ext))) {
        void trackEvent("file_download", {
          category: "engagement",
          label: href.split("/").pop() || href,
          page: pathname,
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return (
    <>
      {/* ───────── Google Tag Manager (preferred) ───────── */}
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
            gtag('js', new Date());
            gtag('config', '${GTM_ID}');
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {/* ───────── GA4 (fallback when no GTM) ───────── */}
      {!GTM_ID && GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'functionality_storage': 'denied',
                'security_storage': 'granted'
              });
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { page_path: window.location.pathname, anonymize_ip: true });
              ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
            `}
          </Script>
        </>
      )}

      {/* ───────── Microsoft Clarity ───────── */}
      {CLARITY_ID && (
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {/* ───────── Meta (Facebook) Pixel ───────── */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ───────── TikTok Pixel ───────── */}
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
              var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
              var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* ───────── LinkedIn Insight Tag ───────── */}
      {LINKEDIN_PARTNER_ID && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_data_partner_ids = _linkedin_data_partner_ids || [];
            _linkedin_data_partner_ids.push('${LINKEDIN_PARTNER_ID}');
            (function(){var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})();
          `}
        </Script>
      )}

      {/* ───────── Microsoft UET (Bing Ads) ───────── */}
      {MICROSOFT_UET_ID && (
        <Script id="microsoft-uet" strategy="afterInteractive">
          {`
            (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${MICROSOFT_UET_ID}",enableAutoSpaTracking:true};
            o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,
            n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},
            i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
          `}
        </Script>
      )}

      {/* ───────── Reddit Pixel ───────── */}
      {REDDIT_PIXEL_ID && (
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`
            !function(w,d){if(!w.rdt){var p=d.createElement("script");
            p.src="https://www.redditstatic.com/ads/pixel.js",p.async=1;
            var s=d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(p,s)}}(window,document);
            rdt('init','${REDDIT_PIXEL_ID}');
            rdt('track', 'PageVisit');
          `}
        </Script>
      )}

      {/* ───────── Beehiiv ───────── */}
      {BEEHIIV_PUBLICATION_ID && (
        <Script id="beehiiv" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'beehiiv.init': i});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);
              j.async=true;
              j.src='https://cdn.beehiiv.com/embed.js';
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','beehiiv','${BEEHIIV_PUBLICATION_ID}');
          `}
        </Script>
      )}

      {/* GTM noscript fallback */}
      {GTM_ID && (
        <noscript>
          <img
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}

/**
 * UTM attribution capture — stores first-touch + last-touch in localStorage.
 * Called on page load; read by the contact form on submission.
 */
export function captureUTM() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      content: params.get("utm_content") || "",
      term: params.get("utm_term") || "",
      referrer: document.referrer || "",
      timestamp: Date.now(),
    };

    // Only store if we have UTM params
    if (utm.source || utm.medium || utm.campaign) {
      // First-touch (only set once)
      if (!localStorage.getItem("kh_utm_first")) {
        localStorage.setItem("kh_utm_first", JSON.stringify(utm));
      }
      // Last-touch (always update)
      localStorage.setItem("kh_utm_last", JSON.stringify(utm));
    }

    // Capture referrer even without UTM
    if (!localStorage.getItem("kh_referrer") && document.referrer) {
      localStorage.setItem("kh_referrer", document.referrer);
    }
  } catch {}
}

/**
 * Get stored UTM attribution data for form submission.
 */
export function getUTMData() {
  if (typeof window === "undefined") return null;
  try {
    return {
      first: JSON.parse(localStorage.getItem("kh_utm_first") || "null"),
      last: JSON.parse(localStorage.getItem("kh_utm_last") || "null"),
      referrer: localStorage.getItem("kh_referrer") || "",
    };
  } catch {
    return null;
  }
}

/**
 * Track an event across ALL configured platforms + first-party log.
 * Fires to every platform simultaneously — no per-platform config needed.
 */
export async function trackEvent(
  event: string,
  props?: {
    category?: string;
    label?: string;
    value?: number;
    currency?: string;
    eventId?: string;
    [k: string]: unknown;
  }
) {
  if (typeof window === "undefined") return;
  try {
    const isConversion = event === "lead" || event === "lead_submit" || event === "subscribe" ||
      event === "schedule" || event === "purchase" || event === "view_content" ||
      event === "initiate_checkout" || props?.category === "conversion";

    // GA4 / GTM dataLayer
    if (window.gtag || window.dataLayer) {
      if (window.gtag) window.gtag("event", event, props);
      else if (window.dataLayer) window.dataLayer.push({ event, ...props });
    }

    // Meta Pixel
    if (window.fbq && META_PIXEL_ID) {
      if (isConversion) {
        const metaEvent = event === "subscribe" ? "Subscribe" :
          event === "schedule" ? "Schedule" :
          event === "purchase" ? "Purchase" :
          event === "view_content" ? "ViewContent" :
          event === "initiate_checkout" ? "InitiateCheckout" : "Lead";
        window.fbq("track", metaEvent, props, props?.eventId ? { eventID: props.eventId } : undefined);
      } else {
        window.fbq("trackCustom", event, props);
      }
    }

    // TikTok
    if (window.ttq && TIKTOK_PIXEL_ID) {
      const ttEvent = isConversion ?
        (event === "subscribe" ? "Subscribe" :
         event === "schedule" ? "Schedule" :
         event === "purchase" ? "CompletePayment" :
         event === "view_content" ? "ViewContent" :
         event === "initiate_checkout" ? "InitiateCheckout" : "SubmitForm") : event;
      window.ttq.track(ttEvent, props);
    }

    // LinkedIn
    if (window.lintrk && LINKEDIN_PARTNER_ID) {
      window.lintrk("track", { conversion_id: 0 });
    }

    // Microsoft UET
    if (window.uetq && MICROSOFT_UET_ID) {
      window.uetq.push("event", event, props || {});
    }

    // Reddit
    if (window.rdt && REDDIT_PIXEL_ID) {
      const rdtEvent = isConversion ? (event === "subscribe" ? "Subscribe" : "Lead") : "Custom";
      window.rdt("track", rdtEvent, props);
    }

    // First-party log (always fires)
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, ...props, page: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});

    // Server-side conversion mirroring (Meta CAPI + GA4 MP)
    if (isConversion) {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event,
          eventId: props?.eventId,
          value: props?.value,
          currency: props?.currency || "USD",
          page: window.location.pathname,
          referrer: document.referrer,
        }),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // analytics should never break UX
  }
}

// Auto-capture UTM on page load
if (typeof window !== "undefined") {
  captureUTM();
}
