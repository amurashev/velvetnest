import Link from "next/link";

import { LATEST_POSTS_FOR_POST_QUERYResult } from "@/../sanity.types";

import { urlFor } from "@/sanity/lib/image";
import { blogPostRoute } from "@/constants/routes";

import styles from "./styles.module.css";
import AssetImage from "@/components/ui/asset-image";

export default function PostPreviewSmall({
  post,
}: {
  post: LATEST_POSTS_FOR_POST_QUERYResult[0];
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
              .width(270)
              .height(200)
              // .fit("max")
              // .auto("format")
              .url()}
            width={270}
            height={200}
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
