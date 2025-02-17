/* eslint-disable camelcase, no-underscore-dangle */

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions, SanityImageObjectStub } from "@sanity/asset-utils";

import { POST_QUERYResult } from "@/../sanity.types";

import styles from "./styles.module.css";

// Barebones lazy-loaded image component
function SampleImageComponent({ value }: { value: SanityImageObjectStub }) {
  const { width, height } = getImageDimensions(value);
  console.warn(value);
  return (
    <Image
      // src={urlBuilder().image(value).width(800).fit("max").auto("format").url()}
      src={urlFor(value.asset).width(680).height(520).url()}
      // alt={value.alt || " "}
      alt=""
      loading="lazy"
      width={680}
      height={520}
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
}

export default async function Article({ post }: { post: POST_QUERYResult }) {
  // console.warn(post);

  if (!post) {
    return null;
  }

  return (
    <div className={styles.box}>
      <div className="text">
        <h1>{post.title || "Missed title"}</h1>
        {post.mainImage?.asset?._ref ? (
          <Image
            // className="m-0 w-1/3 rounded-lg flex-shrink-0"
            src={urlFor(post.mainImage?.asset?._ref)
              .width(680)
              .height(520)
              .fit("max")
              .auto("format")
              .url()}
            width={680}
            height={520}
            alt={post.title || ""}
          />
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
  );
}
