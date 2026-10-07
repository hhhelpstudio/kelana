"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Address, Hex } from "viem";

/**
 * Stamps live in localStorage, keyed by wallet address. There's no backend:
 * each stamp keeps its signature, so it can be re-verified at any time.
 */
export type Stamp = {
  stayId: number;
  chainId: number;
  issuedAt: number;
  nonce: Hex;
  signature: Hex;
};

const EMPTY: readonly Stamp[] = [];
const keyFor = (address: Address) => `kelana:passport:${address.toLowerCase()}`;
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: readonly Stamp[] }>();

function read(key: string): readonly Stamp[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return EMPTY; // storage blocked (private mode, sandboxed iframe)
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value; // stable reference for useSyncExternalStore
  let value: readonly Stamp[] = EMPTY;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) value = parsed as Stamp[];
  } catch {
    value = EMPTY;
  }
  cache.set(key, { raw, value });
  return value;
}

function write(key: string, stamps: readonly Stamp[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(stamps));
  } catch {
    /* storage blocked: stamps just won't persist across reloads */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => e.key?.startsWith("kelana:passport:") && listener();
  window.addEventListener("storage", onStorage); // keep other tabs in sync
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function usePassport(address: Address | undefined) {
  const key = address ? keyFor(address) : null;

  const stamps = useSyncExternalStore(
    subscribe,
    () => (key ? read(key) : EMPTY),
    () => EMPTY,
  );

  const addStamp = useCallback(
    (stamp: Stamp) => {
      if (key) write(key, [...read(key), stamp]);
    },
    [key],
  );

  const reset = useCallback(() => {
    if (key) write(key, []);
  }, [key]);

  return { stamps, addStamp, reset };
}
