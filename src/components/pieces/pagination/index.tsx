import Link from "next/link";

import { PAGE_SIZE } from "@/constants/main";
import { pageRoute } from "@/constants/routes";

import styles from "./styles.module.css";

export default async function Pagination({
  count,
  pageNumber,
}: {
  count: number;
  pageNumber: number;
}) {
  const pages = Math.ceil(count / PAGE_SIZE);

  return (
    <div className={styles.paginationBox}>
      <div className={styles.paginationBoxInner}>
        <div className={styles.items}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((item) => (
            <div key={item} className={styles.item}>
              {Number(item) === Number(pageNumber) ? (
                <strong>{item}</strong>
              ) : (
                <Link
                  href={
                    item === 1
                      ? "/"
                      : pageRoute.getUrl({
                          params: { pageNumber: String(item) },
                        })
                  }
                >
                  {item}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
