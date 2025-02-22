/* eslint-disable camelcase, no-underscore-dangle */

import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions, SanityImageObjectStub } from "@sanity/asset-utils";
import AssetImage from "@/components/ui/asset-image";

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

  const IMAGE_WIDTH = 700;

  const { width, height } = getImageDimensions(value);
  const title = (value.alt as string) || "";
  const src = urlFor(value.asset)
    .width(IMAGE_WIDTH)
    // .fit("max")
    .auto("format")
    .url();
  const aspectRatio = width / height

  return (
    <div className={styles.imageBox}>
      <AssetImage
        src={src}
        alt={title}
        title={title}
        className={styles.image}
        // fill
        width={IMAGE_WIDTH}
        height={IMAGE_WIDTH * aspectRatio}
        style={{
          display: isInline ? "inline-block" : "block",
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
    </div>
  );
}

export default PostImage;
