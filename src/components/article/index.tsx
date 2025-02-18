/* eslint-disable camelcase, no-underscore-dangle */

import Image from "next/image";
import { PortableText, toPlainText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions, SanityImageObjectStub } from "@sanity/asset-utils";

import { POST_QUERYResult } from "@/../sanity.types";

import styles from "./styles.module.css";

// Barebones lazy-loaded image component
function SampleImageComponent({
  value,
  isInline,
}: {
  value: SanityImageObjectStub;
  isInline: boolean;
}) {
  if (!value) {
    return null;
  }

  const IMAGE_WIDTH = 680;

  const { width, height } = getImageDimensions(value);
  const title = (value.alt as string) || "";

  return (
    <div className={styles.imageBox}>
      <Image
        src={urlFor(value.asset)
          .width(IMAGE_WIDTH)
          .fit("max")
          .auto("format")
          .url()}
        alt={title}
        title={title}
        className={styles.image}
        fill
        loading="lazy"
        style={{
          display: isInline ? "inline-block" : "block",
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
    </div>
  );
}

function countWords(str: string) {
  return str.trim().split(/\s+/).length;
}

export default async function Article({ post }: { post: POST_QUERYResult }) {
  if (!post) {
    return null;
  }

  const text = post.body
    ? toPlainText(post.body).replace(/(\r\n|\n|\r)/gm, " ")
    : "";
  const words = countWords(text);
  const timeToRead = Math.ceil(words / 200);

  return (
    <div className={styles.box}>
      <div className={styles.textBox}>
        <div className="text">
          <h1>{post.title || "Missed title"}</h1>
          <div>{timeToRead} min read</div>
          {post.mainImage?.asset?._ref ? (
            <div className={styles.mainImageBox}>
              <Image
                src={urlFor(post.mainImage?.asset?._ref)
                  .width(680)
                  .height(520)
                  .fit("max")
                  .auto("format")
                  .url()}
                width={680}
                height={520}
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
                  image: SampleImageComponent,
                },
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
