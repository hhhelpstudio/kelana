"use client";

import { useSyncExternalStore } from "react";
import { useConnect, useConnectors, type Connector } from "wagmi";
import { useHydrated } from "@/lib/use-hydrated";

const hasInjected = () => typeof window !== "undefined" && "ethereum" in window;
const noopSubscribe = () => () => {};

/**
 * Lists wallets the browser actually has. EIP-6963 wallets announce themselves
 * with a name and icon; the generic "Browser wallet" entry is only shown when
 * a legacy wallet injected window.ethereum without announcing.
 */
export function WalletPicker({ onConnected }: { onConnected?: () => void }) {
  const connectors = useConnectors();
  const connect = useConnect();
  const legacyInjected = useSyncExternalStore(noopSubscribe, hasInjected, () => false);
  // Wallets announce themselves (EIP-6963) before React hydrates, so the client's list
  // can differ from the server's. Render a neutral state until hydration is done.
  const hydrated = useHydrated();

  if (!hydrated) return <p className="eyebrow">Looking for wallets…</p>;

  const announced = connectors.filter((c) => c.id !== "injected");
  const fallback = connectors.find((c) => c.id === "injected");
  const list: Connector[] = announced.length > 0 ? announced : legacyInjected && fallback ? [fallback] : [];

  if (list.length === 0) {
    return (
      <div className="space-y-3 text-sm">
        <p className="font-semibold text-ink-900">No browser wallet found</p>
        <p className="text-ink-500">
          Kelana works with any EVM wallet. Install one, refresh, and your passport is one click away.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a className="btn btn-ghost !min-h-9 !px-3.5 text-sm" href="https://rabby.io" target="_blank" rel="noreferrer">
            Get Rabby
          </a>
          <a className="btn btn-ghost !min-h-9 !px-3.5 text-sm" href="https://metamask.io/download" target="_blank" rel="noreferrer">
            Get MetaMask
          </a>
        </div>
      </div>
    );
  }

  const pending = connect.isPending ? connect.variables?.connector : undefined;

  return (
    <div className="space-y-3">
      <p className="eyebrow">Choose a wallet</p>
      <ul className="space-y-1.5">
        {list.map((connector) => (
          <li key={connector.uid}>
            <button
              type="button"
              disabled={connect.isPending}
              onClick={() => connect.mutate({ connector }, { onSuccess: () => onConnected?.() })}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-medium text-ink-900 transition-colors hover:bg-sand-100 disabled:opacity-60"
            >
              {connector.icon ? (
                // eslint-disable-next-line @next/next/no-img-element -- wallet icons are data: URIs supplied at runtime
                <img src={connector.icon} alt="" width={24} height={24} className="size-6 rounded-md" />
              ) : (
                <span aria-hidden className="grid size-6 place-items-center rounded-md bg-sand-200 text-xs">◎</span>
              )}
              <span className="flex-1">{connector.id === "injected" ? "Browser wallet" : connector.name}</span>
              {pending === connector &&<span className="text-xs text-ink-500">Check your wallet…</span>}
            </button>
          </li>
        ))}
      </ul>
      {connect.error && (
        <p role="alert" className="text-sm text-clay-700">
          {connect.error.name === "UserRejectedRequestError"
            ? "Connection cancelled. Try again whenever you're ready."
            : "That wallet didn't connect. Unlock it and try again."}
        </p>
      )}
    </div>
  );
}
