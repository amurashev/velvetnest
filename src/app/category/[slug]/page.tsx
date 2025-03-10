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
import CATEGORIES from "@/constants/categories";

export const revalidate = 86400; // invalidate every day

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: { params: Props["params"] }) {
  const { slug } = await params;
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
      start: 0,
      end: PAGE_SIZE,
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
      pageNumber={1}
    />
  );
}
