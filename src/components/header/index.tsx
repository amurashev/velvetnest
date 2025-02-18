import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.box}>
      <Link href="/" className={styles.link}>VelvetNest</Link>
    </header>
  );
}
