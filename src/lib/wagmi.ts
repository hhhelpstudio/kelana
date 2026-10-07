import { createConfig, http } from "wagmi";
import { baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

/**
 * Testnets first: check-ins are signatures, not transactions, so no gas is
 * spent anywhere. Mainnet is included so ENS names resolve and so people
 * whose wallet sits on mainnet aren't forced to switch just to look around.
 *
 * Wallets are discovered through EIP-6963 (on by default in wagmi), so every
 * installed browser wallet shows up by name and icon. The generic `injected`
 * connector is the fallback for older wallets that don't announce themselves.
 */
export const config = createConfig({
  chains: [baseSepolia, sepolia, mainnet],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});

export const testnetIds: readonly number[] = [baseSepolia.id, sepolia.id];

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
