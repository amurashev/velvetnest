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
            <>
              {Number(item) === Number(pageNumber) ? (
                <strong className={styles.item} key={item}>
                  {item}
                </strong>
              ) : (
                <Link
                  key={item} // eslint-disable-line react/no-array-index-key
                  href={
                    item === 1
                      ? "/"
                      : pageRoute.getUrl({
                          params: { pageNumber: String(item) },
                        })
                  }
                  className={styles.item}
                >
                  {item}
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
