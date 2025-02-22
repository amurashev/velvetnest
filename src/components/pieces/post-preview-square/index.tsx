import Link from "next/link";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import { urlFor } from "@/sanity/lib/image";
import { blogPostRoute } from "@/constants/routes";
import AssetImage from "@/components/ui/asset-image";

import styles from "./styles.module.css";

export default function PostPreviewSquare({
  post,
}: {
  post: LATEST_POSTS_QUERYResult[0];
}) {
  const blogPostUrl = blogPostRoute.getUrl({
    params: {
      slug: post?.slug?.current as string,
    },
  });

  return (
    <Link href={blogPostUrl} className={styles.box} key={post._id}>
      {post.mainImage?.asset?._ref ? (
        <div className={styles.mainImageBox}>
          <AssetImage
            src={urlFor(post.mainImage?.asset?._ref)
              .width(400)
              .height(400)
              .fit("max")
              .auto("format")
              .url()}
            fill
            alt={post.title || ""}
          />
        </div>
      ) : null}
      <div>
        <div className={styles.title}>{post?.title as string}</div>
      </div>
    </Link>
  );
}
