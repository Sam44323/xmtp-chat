import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { LensProvider } from "@lens-protocol/react-web";
import { lensConfig } from "@/configs/lens";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@/configs/wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <LensProvider config={lensConfig}>
        <Component {...pageProps} />
      </LensProvider>
    </WagmiConfig>
  );
}
