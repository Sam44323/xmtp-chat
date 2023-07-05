import { configureChains, createClient } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(
  [polygon, mainnet],
  [publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
