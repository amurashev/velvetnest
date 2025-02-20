import PostEntire from "@/components/pieces/post";
import PostPreviewSmall from "@/components/pieces/post-preview-small";

import { POST_QUERYResult, LATEST_POSTS_FOR_POST_QUERYResult } from "@/../sanity.types";

import styles from "./styles.module.css";

export default async function PostPage({
  post,
  posts = [],
}: {
  post: POST_QUERYResult;
  posts: LATEST_POSTS_FOR_POST_QUERYResult;
}) {
  if (!post) {
    return null;
  }

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.h1}>{post.title || "Missed title"}</h1>
        <div className={styles.containerInner}>
          <div className={styles.postBox}>
            <PostEntire post={post} />
          </div>
          <div className={styles.sidebarBox}>
            <div className={styles.posts}>
              {posts.map((item) => (
                <PostPreviewSmall key={item._id} post={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
