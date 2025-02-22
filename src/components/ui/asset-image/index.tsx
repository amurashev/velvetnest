import Image from "next/image";

import { isDev } from "@/utils/develop";

import styles from "./styles.module.css";

function AssetImage({
  src,
  alt = "",
  title = "",
  className = '',
  fill = false,
  width,
  height,
  style,
}: {
  src: string;
  alt: string;
  className?: string
  title?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: object
}) {
  return (
    <>
      {isDev() ? (
        <div
          className={styles.nullImage}
          style={{
            width,
            height,
            position: fill ? "absolute" : "relative",
          }}
        />
      ) : (
        <Image
          src={src}
          fill={fill}
          loading="lazy"
          className={className}
          alt={alt}
          title={title}
          width={width}
          height={height}
          style={style}
          unoptimized
        />
      )}
    </>
  );
}

export default AssetImage;
