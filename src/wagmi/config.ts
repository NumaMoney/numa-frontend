import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import {
  coinbaseWallet,
  injected,
  metaMask,
  safe,
  walletConnect,
} from 'wagmi/connectors';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

const projectId = '54a1a167063aca3350b294e306774934';

export const config = createConfig({
  chains: [sepolia],
  syncConnectedChain: true,
  multiInjectedProviderDiscovery: false,
  ssr: true,
  connectors: [
    injected(),
    safe(),
    coinbaseWallet({
      appName: 'Numa',
    }),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});
