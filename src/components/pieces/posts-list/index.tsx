import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import PostPreviewSquare from "@/components/pieces/post-preview-square";

import styles from "./styles.module.css";

export default async function PostsList({
  posts,
}: {
  posts: LATEST_POSTS_QUERYResult;
}) {
  return (
    <div className={styles.postsBox}>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <PostPreviewSquare post={post} />
          </div>
        );
      })}
    </div>
  );
}
