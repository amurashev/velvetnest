import Link from "next/link";

import { PAGE_SIZE } from "@/constants/main";
import {
  pageRoute,
  categoryPageRoute,
  categoryRoute,
} from "@/constants/routes";

import styles from "./styles.module.css";

export default async function Pagination({
  count,
  pageNumber,
  type = "all",
  categorySlug = "",
}: {
  count: number;
  pageNumber: number;
  type: "all" | "category";
  categorySlug?: string;
}) {
  const pages = Math.ceil(count / PAGE_SIZE);

  if (pages < 2) return null;

  return (
    <div className={styles.items}>
      {Array.from({ length: pages }, (_, i) => i + 1).map((item) => {
        let pageLink = "";
        let rootLink = "";

        if (type === "all") {
          rootLink = "/";
          pageLink = pageRoute.getUrl({
            params: { pageNumber: String(item) },
          });
        }

        if (type === "category") {
          rootLink = categoryRoute.getUrl({
            params: { slug: categorySlug },
          });
          pageLink = categoryPageRoute.getUrl({
            params: { pageNumber: String(item), slug: categorySlug },
          });
        }

        return (
          <div key={item} className={styles.item}>
            {Number(item) === Number(pageNumber) ? (
              <strong>{item}</strong>
            ) : (
              <Link href={item === 1 ? rootLink : pageLink}>{item}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
