import Image from "next/image";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";
import PostsList from "@/components/pieces/posts-list";

import styles from "./styles.module.css";

export default async function HomePage({
  posts,
}: {
  posts: LATEST_POSTS_QUERYResult;
}) {
  return (
    <div className={styles.box}>
      <div className={styles.bgBox}>
        <Image
          src="/bg/bg3.jpg"
          alt="Background"
          loading="lazy"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <PostsList posts={posts} />
    </div>
  );
}
