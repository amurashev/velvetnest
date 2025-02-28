import { sanityFetch } from "@/sanity/lib/client";
import {
  LATEST_POSTS_FOR_CATEGORY_QUERY,
  FULL_CATEGORY_QUERY,
  ALL_POSTS_FOR_CATEGORY_COUNT_QUERY,
} from "@/sanity/lib/queries";

import {
  LATEST_POSTS_FOR_CATEGORY_QUERYResult,
  FULL_CATEGORY_QUERYResult,
  ALL_POSTS_FOR_CATEGORY_COUNT_QUERYResult,
} from "@/../sanity.types";

import CategoryPage from "@/components/pages/category-page";
import { PAGE_SIZE } from "@/constants/main";

export const revalidate = 86400; // invalidate every day

type Props = {
  params: Promise<{ slug: string; pageNumber: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: { params: Props["params"] }) {
  const { slug, pageNumber } = await params;
  const category = await sanityFetch<FULL_CATEGORY_QUERYResult>({
    query: FULL_CATEGORY_QUERY,
    params: {
      slug,
    },
  });

  const posts = await sanityFetch<LATEST_POSTS_FOR_CATEGORY_QUERYResult>({
    query: LATEST_POSTS_FOR_CATEGORY_QUERY,
    params: {
      slug,
      start: PAGE_SIZE * (Number(pageNumber) - 1),
      end: PAGE_SIZE * Number(pageNumber),
    },
  });

  const count = await sanityFetch<ALL_POSTS_FOR_CATEGORY_COUNT_QUERYResult>({
    query: ALL_POSTS_FOR_CATEGORY_COUNT_QUERY,
    params: {
      slug,
    },
  });

  return (
    <CategoryPage
      posts={posts}
      category={category}
      count={count}
      pageNumber={Number(pageNumber)}
    />
  );
}
