/* eslint-disable camelcase, no-underscore-dangle */

import { toPlainText } from "@portabletext/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { client } from "@/sanity/lib/client";

import { POSTS_QUERYResult, POST_QUERYResult } from "@/../sanity.types";
import Article from "@/components/article";

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    { perspective: "published" }
  );

  return posts.map((post) => ({
    slug: post?.slug?.current,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: {
      slug,
    },
  });

  if (!post) {
    return {};
  }

  const description = post.body
    ? toPlainText(post.body)
        .slice(0, 255)
        .replace(/(\r\n|\n|\r)/gm, " ")
    : "";

  return {
    title: post?.title,
    description,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default async function Page({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: {
      slug,
    },
  });

  if (!post) {
    return notFound();
  }

  return <Article post={post} />;
}
