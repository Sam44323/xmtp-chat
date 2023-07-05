import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { LensProvider } from "@lens-protocol/react-web";
import { LensContext } from "@/core/context";
import { lensConfig } from "@/configs/lens";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@/configs/wagmi";

export default function App({ Component, pageProps }: AppProps) {
  const [contextState, setContextState] = React.useState({
    wagmiClient: null,
    signer: null,
    handle: null,
    data: null,
  });

  const contextSetter = (data: any, key: string) => {
    setContextState((prevState) => ({
      ...prevState,
      [key]: data,
    }));
  };

  return (
    <LensContext.Provider
      value={{
        ...contextState,
        onSetData: contextSetter,
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <LensProvider config={lensConfig}>
          <Component {...pageProps} />
        </LensProvider>
      </WagmiConfig>
    </LensContext.Provider>
  );
}
