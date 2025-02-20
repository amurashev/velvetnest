import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.box}>
      <div className={styles.logoBox}>
        <Link href="/" className={styles.link}>
          <Image
            src="/logo.png"
            width={260}
            height={130}
            alt="VelvetNest.Club"
          />
        </Link>
      </div>
    </header>
  );
}
