/**
 * Lightweight analytics service for tracking user interactions.
 * 
 * Supports:
 * - Google Analytics 4 (gtag)
 * - Custom event tracking
 * - Page view tracking
 * 
 * Initialize in src/main.tsx by calling initAnalytics()
 */

export type EventData = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

// Check if gtag is available (Google Analytics)
const hasGtag = () => typeof window !== 'undefined' && typeof (window as any).gtag === 'function';

// Check if development mode (using import.meta.env from Vite)
const isDev = () => {
  if (typeof window === 'undefined') return false;
  return (import.meta as any).env?.DEV || false;
};

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, data?: EventData) {
  try {
    // Google Analytics 4
    if (hasGtag()) {
      (window as any).gtag('event', eventName, data);
    }

    // Console logging for development
    if (isDev()) {
      console.log('📊 Event:', eventName, data);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track a CTA click
 */
export function trackCTAClick(ctaName: string, section?: string) {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    section: section || 'unknown',
  });
}

/**
 * Track module open
 */
export function trackModuleOpen(moduleName: string) {
  trackEvent('module_open', {
    event_category: 'engagement',
    event_label: moduleName,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(interest: string, success: boolean) {
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: interest,
    success,
  });
}

/**
 * Track video play
 */
export function trackVideoPlay(videoName: string) {
  trackEvent('video_play', {
    event_category: 'engagement',
    event_label: videoName,
  });
}

/**
 * Track section view (for scroll analytics)
 */
export function trackSectionView(sectionName: string) {
  trackEvent('section_view', {
    event_category: 'navigation',
    event_label: sectionName,
  });
}

/**
 * Initialize analytics (call from src/main.tsx)
 */
export function initAnalytics(gtag_id?: string) {
  if (typeof window === 'undefined') return;

  // If gtag_id is provided and gtag is not already initialized, initialize it
  if (gtag_id && !hasGtag()) {
    console.warn('Google Analytics not initialized. Add gtag script to index.html');
  }

  // Track page view on load
  if (hasGtag()) {
    (window as any).gtag('pageview', {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }

  if (isDev()) {
    console.log('📊 Analytics initialized');
  }
}
