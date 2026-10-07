"use client";

import { useState } from "react";
import { isAddressEqual, recoverTypedDataAddress } from "viem";
import { useBalance, useChains, useConnection, useEnsName, usePublicClient, useSignTypedData, useSwitchChain } from "wagmi";
import { mainnet } from "wagmi/chains";
import { WalletButton } from "@/components/wallet/WalletButton";
import { buildCheckIn, checkInDomain, checkInTypes } from "@/lib/checkin";
import { formatBalance, shortAddress, shortHex } from "@/lib/format";
import { usePassport } from "@/lib/passport-store";
import { useHydrated } from "@/lib/use-hydrated";
import { nextTier, stays, tierFor } from "@/lib/stays";
import { testnetIds } from "@/lib/wagmi";
import { PassportBook } from "./PassportBook";

type Status =
  | { kind: "idle" }
  | { kind: "signing" }
  | { kind: "verifying" }
  | { kind: "stamped"; stay: string }
  | { kind: "error"; message: string };

export function PassportApp() {
  const connection = useConnection();
  const hydrated = useHydrated();
  // Wallet state is restored from storage before hydration; wait so markup matches the server.
  const isConnected = hydrated && connection.isConnected;
  const address = isConnected ? connection.address : undefined;
  const { chainId, chain } = connection;
  const chains = useChains();
  const switchChain = useSwitchChain();
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id });
  const balance = useBalance({ address, query: { enabled: Boolean(address && chain) } });
  const publicClient = usePublicClient({ chainId: chain?.id });
  const signTypedData = useSignTypedData();
  const { stamps, addStamp, reset } = usePassport(address);

  const [stayId, setStayId] = useState(stays[0].id);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [freshIndex, setFreshIndex] = useState<number>();

  const tier = tierFor(stamps.length);
  const upcoming = nextTier(stamps.length);
  const onTestnet = chainId !== undefined && testnetIds.includes(chainId);
  const busy = status.kind === "signing" || status.kind === "verifying";

  async function checkIn() {
    if (!address || !chain || !publicClient) return;
    const stay = stays.find((s) => s.id === stayId)!;
    const message = buildCheckIn(address, stay.id, `${stay.name}, ${stay.area}`);
    const domain = checkInDomain(chain.id);

    try {
      setStatus({ kind: "signing" });
      const signature = await signTypedData.mutateAsync({ domain, types: checkInTypes, primaryType: "CheckIn", message });

      // Verify before stamping. Most wallets are plain accounts, so recover the signer
      // locally first: instant, and no RPC needed. Only if that doesn't match (smart-contract
      // wallets sign via ERC-1271 / ERC-6492) do we ask the chain.
      setStatus({ kind: "verifying" });
      const typed = { domain, types: checkInTypes, primaryType: "CheckIn", message, signature } as const;
      const recovered = await recoverTypedDataAddress(typed).catch(() => undefined);
      const valid =
        (recovered !== undefined && isAddressEqual(recovered, address)) ||
        (await publicClient.verifyTypedData({ address, ...typed }));
      if (!valid) throw new Error("invalid-signature");

      addStamp({ stayId: stay.id, chainId: chain.id, issuedAt: Number(message.issuedAt), nonce: message.nonce, signature });
      setFreshIndex(stamps.length);
      setStatus({ kind: "stamped", stay: stay.name });
    } catch (err) {
      const rejected = err instanceof Error && /reject|denied|cancel/i.test(`${err.name} ${err.message}`);
      setStatus({
        kind: "error",
        message: rejected
          ? "Signature cancelled. Nothing was sent, so try again whenever you like."
          : "We couldn't verify that signature. Try again, or switch to a testnet.",
      });
    }
  }

  const last = stamps.at(-1);

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
      <div className="space-y-8">
        {!isConnected || !address ? (
          <div className="space-y-5">
            <p className="max-w-md text-lg text-ink-700">
              Connect any browser wallet to open your passport. Checking in is a free signature, never a transaction.
            </p>
            <WalletButton label="Open my passport" />
          </div>
        ) : (
          <>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl bg-sand-100 p-5 text-sm ring-1 ring-sand-200">
              <div>
                <dt className="eyebrow">Holder</dt>
                <dd className="mt-1 truncate font-mono text-[0.8rem]">{ensName ?? shortAddress(address)}</dd>
              </div>
              <div>
                <dt className="eyebrow">Network</dt>
                <dd className="mt-1 font-medium">{chain?.name ?? "Unsupported"}</dd>
              </div>
              <div>
                <dt className="eyebrow">Balance</dt>
                <dd className="mt-1 tabular-nums">
                  {balance.data ? formatBalance(balance.data.value, balance.data.decimals, balance.data.symbol) : "…"}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Status</dt>
                <dd className="mt-1 font-medium">{tier ? tier.name : "No stamps yet"}</dd>
              </div>
            </dl>

            {!onTestnet && (
              <div className="rounded-2xl bg-clay-100 p-4 text-sm text-clay-700">
                <p className="font-semibold">{chain ? "You're on mainnet." : "This network isn't supported."}</p>
                <p className="mt-1">Kelana runs on testnets. Signing is free either way, but switch to keep things tidy.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chains
                    .filter((c) => testnetIds.includes(c.id))
                    .map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        disabled={switchChain.isPending}
                        onClick={() => switchChain.mutate({ chainId: c.id })}
                        className="btn btn-ghost !min-h-9 bg-sand-50 !px-3.5 text-sm"
                      >
                        Switch to {c.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <fieldset className="min-w-0 space-y-3" disabled={busy || !chain}>
              <legend className="eyebrow mb-3">Where are you staying tonight?</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {stays.map((s) => (
                  <label
                    key={s.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl px-3.5 py-3 ring-1 ring-sand-300 transition-colors has-checked:bg-clay-100 has-checked:ring-clay-500 hover:bg-sand-100"
                  >
                    <input
                      type="radio"
                      name="stay"
                      value={s.id}
                      checked={stayId === s.id}
                      onChange={() => setStayId(s.id)}
                      className="mt-1 accent-clay-600"
                    />
                    <span>
                      <span className="block font-semibold">{s.name}</span>
                      <span className="block text-sm text-ink-500">
                        {s.area} · {s.kind}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-3">
              <button type="button" onClick={checkIn} disabled={busy || !chain} className="btn btn-primary w-full sm:w-auto">
                {status.kind === "signing" ? "Confirm in your wallet…" : status.kind === "verifying" ? "Verifying signature…" : "Sign check-in"}
              </button>
              <p aria-live="polite" className="min-h-6 text-sm">
                {status.kind === "stamped" && (
                  <span className="text-leaf-600">Stamped. Welcome to {status.stay}.</span>
                )}
                {status.kind === "error" && <span className="text-clay-700">{status.message}</span>}
              </p>
            </div>

            {last && (
              <details className="group rounded-2xl ring-1 ring-sand-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold">
                  <span>Latest signature</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-leaf-600">
                    Verified
                  </span>
                </summary>
                <dl className="space-y-2 border-t border-sand-300 px-4 py-3 font-mono text-[0.72rem] text-ink-700">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Standard</dt>
                    <dd>EIP-712 typed data</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Chain ID</dt>
                    <dd className="tabular-nums">{last.chainId}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Nonce</dt>
                    <dd>{shortHex(last.nonce)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Signature</dt>
                    <dd>{shortHex(last.signature)}</dd>
                  </div>
                </dl>
              </details>
            )}
          </>
        )}
      </div>

      <div className="space-y-4">
        <PassportBook stamps={stamps} freshIndex={freshIndex} owner={address ? (ensName ?? address) : undefined} />
        <div className="flex items-center justify-between gap-4 px-1 text-sm text-ink-500">
          <p>
            {upcoming
              ? `${upcoming.stamps - stamps.length} more ${upcoming.stamps - stamps.length === 1 ? "stamp" : "stamps"} to ${upcoming.name}`
              : "Top tier reached. Bali is yours."}
          </p>
          {stamps.length > 0 && (
            <button type="button" onClick={reset} className="underline decoration-sand-400 underline-offset-4 hover:text-ink-900">
              Reset passport
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
