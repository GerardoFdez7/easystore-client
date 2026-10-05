export const sidebarPinnedStorageKey = 'easystore:sidebar-pinned';
// Server-readable mirror of the localStorage preference, so SSR can render the
// sidebar already expanded.
export const sidebarPinnedCookieName = 'sidebar_pinned';
export const sidebarPinnedCookieMaxAge = 60 * 60 * 24 * 365;
