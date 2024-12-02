import { http, createConfig } from "@wagmi/core";
import { sepolia, goerli } from "@wagmi/core/chains";
import { injected } from "@wagmi/connectors";

export const config = createConfig({
  chains: [sepolia, goerli],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [goerli.id]: http(),
  },
  ssr: true,
});
