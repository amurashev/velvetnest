/* eslint-disable camelcase, no-underscore-dangle */

import { QueryParams } from "next-sanity";
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

export default async function Page({ params }: { params: QueryParams }) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params,
  });

  if (!post) {
    return notFound();
  }

  return <Article post={post} />;
}
