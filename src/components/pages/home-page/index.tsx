import Image from "next/image";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";
import PostsList from "@/components/pieces/posts-list";
import Pagination from "@/components/pieces/pagination";

import styles from "./styles.module.css";
import CardsContainer from "@/components/layout/cards-container";

export default async function HomePage({
  posts,
  count,
  pageNumber,
  // deviceType,
}: {
  posts: LATEST_POSTS_QUERYResult;
  count: number;
  pageNumber: number;
  deviceType: "mobile" | "desktop"
}) {
  return (
    <div className={styles.box}>
      <div className={styles.bgBox}>
        <Image
          src="/bg/bg3.jpg"
          alt="Background"
          loading="lazy"
          priority={false}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <CardsContainer>
        <PostsList posts={posts} />
        <Pagination count={count} pageNumber={pageNumber} type="all" />
      </CardsContainer>
    </div>
  );
}
