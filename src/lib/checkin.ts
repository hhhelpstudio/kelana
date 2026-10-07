import type { Address, Hex } from "viem";
import { toHex } from "viem";

/**
 * A check-in is an EIP-712 typed-data signature, not a transaction.
 * The wallet shows the guest a readable summary of what they're signing,
 * it costs no gas, and anyone can later verify who signed it.
 */
export const checkInTypes = {
  CheckIn: [
    { name: "guest", type: "address" },
    { name: "stayId", type: "uint256" },
    { name: "stay", type: "string" },
    { name: "issuedAt", type: "uint64" },
    { name: "nonce", type: "bytes32" },
  ],
} as const;

export function checkInDomain(chainId: number) {
  return { name: "Kelana Passport", version: "1", chainId } as const;
}

export type CheckInMessage = {
  guest: Address;
  stayId: bigint;
  stay: string;
  issuedAt: bigint;
  nonce: Hex;
};

export function buildCheckIn(guest: Address, stayId: number, stay: string): CheckInMessage {
  return {
    guest,
    stayId: BigInt(stayId),
    stay,
    issuedAt: BigInt(Math.floor(Date.now() / 1000)),
    // Random nonce so two check-ins at the same stay never produce the same signature.
    nonce: toHex(crypto.getRandomValues(new Uint8Array(32))),
  };
}
