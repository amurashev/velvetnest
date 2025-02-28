"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { categoryRoute } from "@/constants/routes";
import CATEGORIES from "@/constants/categories";

import styles from "./styles.module.css";

const MENU = CATEGORIES.map((item) => ({
  url: categoryRoute.getUrl({ params: { slug: item.slug } }),
  label: item.label,
}));

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.box}>
      <div className={styles.logoBox}>
        <Link href="/">
          <Image
            src="/logo.png"
            width={260}
            height={83}
            quality={100}
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
                <Link href={item.url} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
