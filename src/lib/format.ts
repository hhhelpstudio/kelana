import { formatUnits, type Address } from "viem";

export const shortAddress = (a: Address) => `${a.slice(0, 6)}…${a.slice(-4)}`;

export function formatBalance(value: bigint, decimals: number, symbol: string) {
  const n = Number(formatUnits(value, decimals));
  const shown = n === 0 ? "0" : n < 0.0001 ? "<0.0001" : n.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return `${shown} ${symbol}`;
}

export const shortHex = (h: string, keep = 10) => `${h.slice(0, keep)}…${h.slice(-6)}`;
