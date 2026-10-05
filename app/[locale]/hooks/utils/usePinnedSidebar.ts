import { useCallback, useSyncExternalStore } from 'react';

const storageKey = 'easystore:sidebar-pinned';
const changeEvent = 'easystore:sidebar-pinned-change';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(storageKey) === 'true';
  } catch {
    return false;
  }
}

/**
 * Persisted preference: when pinned, the sidebar stays expanded instead of
 * collapsing to icons. Defaults to false (auto-collapse) on the server.
 */
export function usePinnedSidebar() {
  const pinned = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const setPinned = useCallback((value: boolean) => {
    try {
      window.localStorage.setItem(storageKey, String(value));
    } catch {
      // Storage unavailable: preference just won't persist.
    }
    window.dispatchEvent(new Event(changeEvent));
  }, []);

  return { pinned, setPinned };
}
