import Link from "next/link";
import Image from "next/image";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import { urlFor } from "@/sanity/lib/image";
import { blogPostRoute } from "@/constants/routes";

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
        <Image
          src={urlFor(post.mainImage?.asset?._ref)
            .width(292)
            .height(292)
            // .fit("max")
            // .auto("format")
            .url()}
          width={292}
          height={292}
          // style={{
          //   objectFit: 'cover'
          // }}
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
