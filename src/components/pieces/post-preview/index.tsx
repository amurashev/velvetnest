import Link from "next/link";
import Image from "next/image";
// import { toPlainText } from "@portabletext/react";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import { urlFor } from "@/sanity/lib/image";
import { blogPostRoute } from "@/constants/routes";

import styles from "./styles.module.css";

export default function PostPreview({
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
      <div>
        <div className={styles.title}>{post?.title as string}</div>

        {/* {post.body && post.body.length > 0 && (
          <p className={styles.text}>
            {post.body ? toPlainText(post.body).slice(0, 255) : ""}
          </p>
        )} */}
      </div>
      {post.mainImage?.asset?._ref ? (
        <div className={styles.mainImageBox}>
          <Image
            // className="m-0 w-1/3 rounded-lg flex-shrink-0"
            src={urlFor(post.mainImage?.asset?._ref)
              .width(160)
              .height(107)
              .fit("max")
              .auto("format")
              .url()}
            width={160}
            height={107}
            alt={post.title || ""}
          />
        </div>
      ) : null}
    </Link>
  );
}
