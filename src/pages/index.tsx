import styles from "@/styles/Home.module.css";
import { Button } from "reactstrap";

export default function Home() {
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
        <Button color="primary">Connect Wallet</Button>
      </section>
    </div>
  );
}
