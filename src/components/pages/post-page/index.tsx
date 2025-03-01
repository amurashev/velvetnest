import Link from "next/link";

import PostEntire from "@/components/pieces/post";
import PostPreviewSmall from "@/components/pieces/post-preview-small";
import { categoryRoute } from "@/constants/routes";

import {
  POST_QUERYResult,
  LATEST_POSTS_FOR_POST_QUERYResult,
} from "@/../sanity.types";

import styles from "./styles.module.css";

export default async function PostPage({
  post,
  posts = [],
  deviceType,
}: {
  post: POST_QUERYResult;
  posts: LATEST_POSTS_FOR_POST_QUERYResult;
  deviceType: "mobile" | "desktop"
}) {
  if (!post) {
    return null;
  }

  const categoryPageUrl = categoryRoute.getUrl({
    params: {
      slug: post.category ? (post.category.slug?.current as string) : "all",
    },
  });

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.h1}>{post.title || "Missed title"}</h1>

        <div>
          <Link href={categoryPageUrl} className={styles.category}>
            {post.category?.title}
          </Link>
        </div>

        <div className={styles.containerInner}>
          <div className={styles.postBox}>
            <PostEntire post={post} deviceType={deviceType} />
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
