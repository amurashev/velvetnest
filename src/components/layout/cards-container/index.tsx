import styles from "./styles.module.css";

export default async function CardsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.contentBox}>
      <div className={styles.innerBox}>{children}</div>
    </div>
  );
}
