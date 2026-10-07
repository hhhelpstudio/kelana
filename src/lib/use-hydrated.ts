"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False on the server and during hydration, true afterwards. Wallet state comes
 * from the browser (saved connection, EIP-6963 announcements) before React
 * hydrates, so anything that depends on it must wait for this to stay in sync
 * with the server-rendered HTML.
 */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
