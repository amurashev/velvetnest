/* eslint-disable camelcase, no-underscore-dangle */

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions, SanityImageObjectStub } from "@sanity/asset-utils";

import styles from "./styles.module.css";

// Barebones lazy-loaded image component
function PostImage({
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

export default PostImage