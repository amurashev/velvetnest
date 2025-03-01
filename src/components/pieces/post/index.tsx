/* eslint-disable camelcase, no-underscore-dangle */

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

import PostImage from "@/components/pieces/post-image";
import AssetImage from "@/components/ui/asset-image";

import { POST_QUERYResult } from "@/../sanity.types";

import styles from "./styles.module.css";

// function countWords(str: string) {
//   return str.trim().split(/\s+/).length;
// }

export default async function PostEntire({
  post,
  deviceType,
}: {
  post: POST_QUERYResult;
  deviceType: "mobile" | "desktop";
}) {
  if (!post) {
    return null;
  }

  // const text = post.body
  //   ? toPlainText(post.body).replace(/(\r\n|\n|\r)/gm, " ")
  //   : "";
  // const words = countWords(text);
  // const timeToRead = Math.ceil(words / 200);

  const isMobile = deviceType === "mobile";
  const width = isMobile ? 400 : 700;
  const height = isMobile ? 266 : 467;

  return (
    <div className="text">
      {post.mainImage?.asset?._ref ? (
        <div className={styles.mainImageBox}>
          <AssetImage
            src={urlFor(post.mainImage?.asset?._ref)
              .width(width)
              .height(height)
              .fit("max")
              .auto("format")
              .url()}
            fill
            alt={post.title || ""}
            title={post.title || ""}
            // style={{
            //   aspectRatio: 0.66,
            // }}
          />
        </div>
      ) : null}
      {post.body ? (
        <PortableText
          value={post.body}
          components={{
            types: {
              image: PostImage,
            },
          }}
        />
      ) : null}
    </div>
  );
}
