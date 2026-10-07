"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { useConnection, useDisconnect, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { shortAddress } from "@/lib/format";
import { useHydrated } from "@/lib/use-hydrated";
import { WalletPicker } from "./WalletPicker";

type Props = { label?: string; variant?: "primary" | "ghost"; className?: string };

/**
 * Connect button + account menu built on the native Popover API: light-dismiss,
 * Escape-to-close and top-layer stacking come free from the browser. Where CSS
 * anchor positioning is supported the panel sits under its button; elsewhere it
 * falls back to the browser's centered popover.
 */
export function WalletButton({ label = "Connect wallet", variant = "primary", className }: Props) {
  const connection = useConnection();
  const hydrated = useHydrated();
  // Treat the wallet as disconnected until hydration so markup matches the server.
  const isConnected = hydrated && connection.isConnected;
  const { address, chain } = connection;
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id });
  const disconnect = useDisconnect();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const rawId = useId();
  const popoverId = `wallet-${rawId.replace(/:/g, "")}`;
  const anchor = `--${popoverId}`;

  const close = () => popoverRef.current?.hidePopover();

  const copy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        className={`btn ${isConnected ? "btn-ghost" : variant === "primary" ? "btn-primary" : "btn-ghost"} ${className ?? ""}`}
        style={{ anchorName: anchor } as CSSProperties}
      >
        {isConnected && address ? (
          <>
            <span aria-hidden className="size-2 rounded-full bg-leaf-600" />
            <span className="font-mono text-[0.8rem] font-medium">{ensName ?? shortAddress(address)}</span>
          </>
        ) : (
          label
        )}
      </button>

      <div
        ref={popoverRef}
        id={popoverId}
        popover="auto"
        className="wallet-popover w-[min(20rem,calc(100vw-2rem))] rounded-2xl bg-sand-50 p-4 text-ink-900 shadow-[0_18px_50px_-12px_oklch(30%_0.04_50/0.35)] ring-1 ring-sand-300"
        style={{ positionAnchor: anchor } as CSSProperties}
      >
        {isConnected && address ? (
          <div className="space-y-4">
            <div>
              <p className="eyebrow">Connected</p>
              <p className="mt-1 break-all font-mono text-sm">{ensName ?? address}</p>
              <p className="mt-1 text-sm text-ink-500">{chain ? chain.name : "Unsupported network"}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={copy} className="btn btn-ghost !min-h-9 flex-1 !px-3 text-sm">
                {copied ? "Copied" : "Copy address"}
              </button>
              <button
                type="button"
                onClick={() => {
                  disconnect.mutate();
                  close();
                }}
                className="btn btn-ghost !min-h-9 flex-1 !px-3 text-sm"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <WalletPicker onConnected={close} />
        )}
      </div>
    </>
  );
}
