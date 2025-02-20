import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import PostPreviewSquare from "@/components/pieces/post-preview-square";

import styles from "./styles.module.css";
import Image from "next/image";

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
        />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.innerBox}>
          <div className={styles.postsBox}>
            {posts.map((post) => {
              return (
                <div key={post._id}>
                  <PostPreviewSquare post={post} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
