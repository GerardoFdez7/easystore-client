import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useInitialPinnedSidebar } from '@contexts/PinnedSidebarContext';
import {
  sidebarPinnedCookieMaxAge,
  sidebarPinnedCookieName,
  sidebarPinnedStorageKey,
} from '@lib/consts/sidebar';

function writeCookie(value: boolean) {
  document.cookie = `${sidebarPinnedCookieName}=${value}; path=/; max-age=${sidebarPinnedCookieMaxAge}; samesite=lax`;
}

const changeEvent = 'easystore:sidebar-pinned-change';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEvent, callback);
  };
}

/**
 * Persisted preference: when pinned, the sidebar stays expanded instead of
 * collapsing to icons. localStorage is the source of truth; a cookie mirrors it
 * so the server can render the right state on first paint.
 */
export function usePinnedSidebar() {
  const initialPinned = useInitialPinnedSidebar();

  const getSnapshot = useCallback(() => {
    try {
      const stored = window.localStorage.getItem(sidebarPinnedStorageKey);
      return stored === null ? initialPinned : stored === 'true';
    } catch {
      return initialPinned;
    }
  }, [initialPinned]);

  const pinned = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialPinned,
  );

  // Keep the server-readable cookie in step (also backfills preferences saved before it existed).
  useEffect(() => {
    writeCookie(pinned);
  }, [pinned]);

  const setPinned = useCallback((value: boolean) => {
    try {
      window.localStorage.setItem(sidebarPinnedStorageKey, String(value));
    } catch {
      // Storage unavailable: preference just won't persist locally.
    }
    writeCookie(value);
    window.dispatchEvent(new Event(changeEvent));
  }, []);

  return { pinned, setPinned };
}
