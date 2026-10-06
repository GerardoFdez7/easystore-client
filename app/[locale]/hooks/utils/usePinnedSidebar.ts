import { useCallback, useSyncExternalStore } from 'react';
import { useInitialPinnedSidebar } from '@contexts/PinnedSidebarContext';
import {
  sidebarPinnedCookieMaxAge,
  sidebarPinnedCookieName,
} from '@lib/consts/sidebar';

const changeEvent = 'easystore:sidebar-pinned-change';

function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  return () => window.removeEventListener(changeEvent, callback);
}

function readCookie(): boolean | null {
  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${sidebarPinnedCookieName}=`));
  return match ? match.split('=')[1] === 'true' : null;
}

/**
 * Persisted preference: when pinned, the sidebar stays expanded instead of
 * collapsing to icons. Stored in a cookie so the server can render the right
 * state on first paint.
 */
export function usePinnedSidebar() {
  const initialPinned = useInitialPinnedSidebar();

  const getSnapshot = useCallback(
    () => readCookie() ?? initialPinned,
    [initialPinned],
  );

  const pinned = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialPinned,
  );

  const setPinned = useCallback((value: boolean) => {
    document.cookie = `${sidebarPinnedCookieName}=${value}; path=/; max-age=${sidebarPinnedCookieMaxAge}; samesite=lax`;
    window.dispatchEvent(new Event(changeEvent));
  }, []);

  return { pinned, setPinned };
}
