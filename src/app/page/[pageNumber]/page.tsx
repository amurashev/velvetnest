import { sanityFetch } from "@/sanity/lib/client";
import { client } from "@/sanity/lib/client";
import {
  LATEST_POSTS_QUERY,
  ALL_POSTS_COUNT_QUERY,
} from "@/sanity/lib/queries";

import {
  LATEST_POSTS_QUERYResult,
  ALL_POSTS_COUNT_QUERYResult,
} from "@/../sanity.types";

import HomePage from "@/components/pages/home-page";
import { PAGE_SIZE } from "@/constants/main";

export async function generateStaticParams() {
  const count = await client.fetch<ALL_POSTS_COUNT_QUERYResult>(
    ALL_POSTS_COUNT_QUERY,
    {},
    { perspective: "published" }
  );

  const pagesNumber = Math.ceil(count / PAGE_SIZE);

  const pages = Array.from({ length: pagesNumber }, (_, i) => i + 1)//.map((item)
  pages.shift()

  return pages.map(num => ({
    pagesNumber: num,
  }))
}

type Props = {
  params: Promise<{ pageNumber: string }>;
};

export default async function Page({ params }: { params: Props["params"] }) {
  const { pageNumber = "2" } = await params;
  const posts = await sanityFetch<LATEST_POSTS_QUERYResult>({
    query: LATEST_POSTS_QUERY,
    params: {
      start: PAGE_SIZE * (Number(pageNumber) - 1),
      end: PAGE_SIZE * Number(pageNumber)
    }
  });

  const count = await sanityFetch<ALL_POSTS_COUNT_QUERYResult>({
    query: ALL_POSTS_COUNT_QUERY,
  });

  return (
    <HomePage posts={posts} count={count} pageNumber={Number(pageNumber)} />
  );
}
