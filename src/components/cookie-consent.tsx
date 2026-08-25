"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X, Check, ShieldCheck, Settings2 } from "lucide-react";
import {
  acceptAll,
  getConsent,
  hasDecided,
  rejectAll,
  saveGranular,
  type ConsentCategory,
} from "@/lib/consent";

/**
 * Cookie consent banner — GDPR / UK GDPR compliant.
 *
 * Behaviours:
 *   - Shows on first visit (no localStorage decision yet)
 *   - Three CTAs: Accept all / Reject all / Customize
 *   - Customize opens a modal with granular toggles
 *   - Choice persists for 1 year; version bump forces re-prompt
 *   - Rejecting does NOT block the site — only blocks non-essential SDKs
 *   - Links to /privacy (so users can change their mind later)
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [choices, setChoices] = useState<Record<ConsentCategory, boolean>>({
    analytics_storage: true,
    ad_storage: true,
    functionality_storage: true,
  });

  useEffect(() => {
    // Slight delay so it doesn't fight the hero animation
    const t = setTimeout(() => {
      if (!hasDecided()) setVisible(true);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setVisible(false);
  }

  function handleAcceptAll() {
    acceptAll();
    dismiss();
  }

  function handleRejectAll() {
    rejectAll();
    dismiss();
  }

  function handleSaveGranular() {
    saveGranular(choices);
    dismiss();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-3 bottom-3 z-[60] flex justify-center md:inset-x-6 md:bottom-6"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl">
            {!showSettings ? (
              <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6 md:p-6">
                <div className="flex items-start gap-3 md:flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
                    <Cookie className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-foreground md:text-lg">
                      We value your privacy
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                      We use cookies for analytics and marketing to improve your experience and show relevant
                      content. You can accept all, reject non-essential, or customize. Read our{" "}
                      <a href="/privacy" className="font-medium text-teal underline-offset-2 hover:underline">
                        privacy policy
                      </a>.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
                  <button onClick={handleAcceptAll} className="btn-purple h-10 px-5 text-xs md:text-sm">
                    <Check className="h-4 w-4" /> Accept all
                  </button>
                  <button onClick={handleRejectAll} className="btn-outline h-10 px-5 text-xs md:text-sm">
                    Reject
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Settings2 className="h-3.5 w-3.5" /> Customize
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg text-foreground">Customize consent</h3>
                  <button onClick={() => setShowSettings(false)} aria-label="Close settings" className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <ConsentToggle
                    label="Essential"
                    description="Required for the site to function (security, forms, authentication). Always on."
                    checked
                    disabled
                  />
                  <ConsentToggle
                    label="Analytics"
                    description="GA4, Microsoft Clarity, Hotjar, Plausible. Helps us understand what's working."
                    checked={choices.analytics_storage}
                    onChange={(v) => setChoices((c) => ({ ...c, analytics_storage: v }))}
                  />
                  <ConsentToggle
                    label="Marketing & advertising"
                    description="Meta Pixel, TikTok, LinkedIn, Bing, X, Snapchat, Pinterest. Used to measure ad performance."
                    checked={choices.ad_storage}
                    onChange={(v) => setChoices((c) => ({ ...c, ad_storage: v, functionality_storage: v }))}
                  />
                </div>

                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={handleRejectAll} className="btn-outline h-10 px-5 text-sm">
                    Reject all
                  </button>
                  <button onClick={handleSaveGranular} className="btn-purple h-10 px-5 text-sm">
                    <ShieldCheck className="h-4 w-4" /> Save selection
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConsentToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className={`flex items-start gap-3 rounded-lg border border-border p-3 ${disabled ? "opacity-70" : "cursor-pointer hover:border-teal/40"}`}>
      <span
        className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-teal" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
      </span>
      {disabled && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Always on
        </span>
      )}
      {!disabled && (
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
      )}
    </label>
  );
}
