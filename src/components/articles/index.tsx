import { POSTS_QUERYResult } from "@/../sanity.types";

import Post from "../post";

import styles from "./styles.module.css";

export default async function Articles({
  posts,
}: {
  posts: POSTS_QUERYResult;
}) {
  return (
    <div className={styles.box}>
      <div className={styles.innerBox}>
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className={styles.postsBox}>
          {posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}
