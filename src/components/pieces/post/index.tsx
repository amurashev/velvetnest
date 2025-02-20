/* eslint-disable camelcase, no-underscore-dangle */

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

import PostImage from "@/components/pieces/post-image";

import { POST_QUERYResult } from "@/../sanity.types";

import styles from "./styles.module.css";

// function countWords(str: string) {
//   return str.trim().split(/\s+/).length;
// }

export default async function PostEntire({ post }: { post: POST_QUERYResult }) {
  if (!post) {
    return null;
  }

  // const text = post.body
  //   ? toPlainText(post.body).replace(/(\r\n|\n|\r)/gm, " ")
  //   : "";
  // const words = countWords(text);
  // const timeToRead = Math.ceil(words / 200);

  return (
    <div className="text">
      {post.mainImage?.asset?._ref ? (
        <div className={styles.mainImageBox}>
          <Image
            src={urlFor(post.mainImage?.asset?._ref)
              .width(680)
              .height(520)
              .fit("max")
              .auto("format")
              .url()}
            layout='fill'
            // width={680}
            // height={520}
            loading="lazy"
            alt={post.title || ""}
            title={post.title || ""}
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
