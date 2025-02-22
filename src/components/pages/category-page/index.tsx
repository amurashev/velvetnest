import {
  LATEST_POSTS_FOR_CATEGORY_QUERYResult,
  FULL_CATEGORY_QUERYResult,
} from "@/../sanity.types";

import PostsList from "@/components/pieces/posts-list";

import styles from "./styles.module.css";

export default async function CategoryPage({
  posts,
  category,
}: {
  posts: LATEST_POSTS_FOR_CATEGORY_QUERYResult;
  category: FULL_CATEGORY_QUERYResult;
}) {
  return (
    <div className={styles.box}>
      <div className={styles.innerBox}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{category?.title}</h1>
        </div>

        <PostsList posts={posts} />
      </div>
    </div>
  );
}
