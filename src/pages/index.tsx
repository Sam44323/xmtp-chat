import React, { useContext } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "reactstrap";
import {
  useWalletLogin,
  useActiveProfile,
  useWalletLogout,
} from "@lens-protocol/react-web";
import { LensContext } from "@/core/context";
import { useAccount, useConnect, useDisconnect, useSigner } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Client, Conversation } from "@xmtp/xmtp-js";

export default function Home() {
  const { execute: loginLens } = useWalletLogin();
  const { execute: logoutLens } = useWalletLogout();
  const lensContext = useContext(LensContext);
  const { data } = useActiveProfile();
  const { data: signerData } = useSigner();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const [userConversations, setUserConversations] = React.useState<
    Conversation[]
  >([] as Conversation[]);

  const onLoginWithMetamaskClick = async () => {
    if (isConnected) {
      await disconnectAsync();
      logoutLens();
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
    const dataSetter = async (data: any) => {
      const xmtp = await Client.create(signerData!, {
        env: "production",
      });
      setUserConversations(await xmtp.conversations.list());
      lensContext.onSetData({
        signer: signerData,
        handle: data.handle,
        xmtp,
        data: data,
      });
    };

    if (data) {
      dataSetter(data);
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
          suppressHydrationWarning
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </section>
    </div>
  );
}
