import React from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "reactstrap";
import { useWalletLogin, useActiveProfile } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect, useSigner } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const {
    execute: loginLens,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

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
      return;
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      console.log(signer);
      const response = await loginLens(signer);
      console.log(response);
    }
  };

  React.useEffect(() => {
    console.log(data);
    if (data) {
      console.log(signerData);
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
        <Button color="primary" onClick={onLoginWithMetamaskClick}>
          Connect Wallet
        </Button>
      </section>
    </div>
  );
}
