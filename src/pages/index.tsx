import React, { useContext } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "reactstrap";
import { useWalletLogin, useActiveProfile } from "@lens-protocol/react-web";
import { LensContext } from "@/core/context";
import { useAccount, useConnect, useDisconnect, useSigner } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const {
    execute: loginLens,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const lensContext = useContext(LensContext);

  const { data } = useActiveProfile();
  const { data: signerData } = useSigner();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginWithMetamaskClick = async () => {
    if (isConnected) {
      await disconnectAsync();
      lensContext.onSetData({
        signer: null,
        handle: null,
        data: null,
      });
      return;
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await loginLens(signer);
    }
  };

  React.useEffect(() => {
    if (data) {
      lensContext.onSetData({
        signer: signerData,
        handle: data.handle,
        data: data,
      });
    }
  }, [data]);

  return (
    <div>
      <section
        className="
        d-flex
        flex-row
        justify-content-between
        p-3
      "
      >
        <h1 className={styles.title}>XMTP Chat</h1>
        <Button
          color="primary"
          onClick={onLoginWithMetamaskClick}
          style={{
            width: "180px",
          }}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </section>
    </div>
  );
}
