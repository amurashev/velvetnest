"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { categoryRoute } from "@/constants/routes";

import styles from "./styles.module.css";

const MENU = [
  {
    url: categoryRoute.getUrl({ params: { slug: "interior" } }),
    label: "Interior",
  },
  {
    url: categoryRoute.getUrl({ params: { slug: "home-decor" } }),
    label: "Home decor",
  },
  {
    url: categoryRoute.getUrl({ params: { slug: "food" } }),
    label: "Food",
  },
];

export default function Header() {
  const pathname = usePathname();

  console.warn(pathname);
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
      <div className={styles.menuBox}>
        <ul className={styles.menu}>
          {MENU.map((item) => {
            const isActive = pathname === item.url;
            return (
              <li
                key={item.url}
                className={`${styles.menuItem} ${isActive ? styles.menuItemIsActive : ""}`}
              >
                <Link href={item.url} className={styles.link}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
