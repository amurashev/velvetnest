import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import PostPreview from "../../pieces/post-preview";

import styles from "./styles.module.css";

export default async function HomePage({
  posts,
}: {
  posts: LATEST_POSTS_QUERYResult;
}) {
  return (
    <div className={styles.box}>
      <div className={styles.innerBox}>
        <div className={styles.postsBox}>
          {posts.map((post) => {
            return <PostPreview key={post._id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}
