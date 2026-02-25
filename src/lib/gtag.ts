export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function pageview(url: string) {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    GA_MEASUREMENT_ID
  ) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    GA_MEASUREMENT_ID
  ) {
    window.gtag("event", action, params);
  }
}

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
