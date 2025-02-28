import {
  LATEST_POSTS_FOR_CATEGORY_QUERYResult,
  FULL_CATEGORY_QUERYResult,
} from "@/../sanity.types";

import PostsList from "@/components/pieces/posts-list";
import CardsContainer from "@/components/layout/cards-container";
import Pagination from "@/components/pieces/pagination";

import styles from "./styles.module.css";

export default async function CategoryPage({
  posts,
  category,
  count,
  pageNumber,
}: {
  posts: LATEST_POSTS_FOR_CATEGORY_QUERYResult;
  category: FULL_CATEGORY_QUERYResult;
  count: number;
  pageNumber: number;
}) {
  return (
    <div className={styles.box}>
      <CardsContainer>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{category?.title}</h1>
        </div>

        <PostsList posts={posts} />

        <Pagination
          count={count}
          pageNumber={pageNumber}
          categorySlug={category?.slug?.current}
          type="category"
        />
      </CardsContainer>
    </div>
  );
}
