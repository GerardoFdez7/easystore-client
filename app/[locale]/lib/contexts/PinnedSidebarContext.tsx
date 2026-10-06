'use client';

import { createContext, useContext, type ReactNode } from 'react';

const PinnedSidebarContext = createContext(false);

/** Supplies the server-read pinned preference used as the SSR snapshot. */
export function PinnedSidebarProvider({
  initialPinned,
  children,
}: {
  initialPinned: boolean;
  children: ReactNode;
}) {
  return (
    <PinnedSidebarContext.Provider value={initialPinned}>
      {children}
    </PinnedSidebarContext.Provider>
  );
}

export function useInitialPinnedSidebar() {
  return useContext(PinnedSidebarContext);
}
