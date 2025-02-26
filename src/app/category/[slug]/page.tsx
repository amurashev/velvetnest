import { sanityFetch } from "@/sanity/lib/client";
import {
  LATEST_POSTS_FOR_CATEGORY_QUERY,
  FULL_CATEGORY_QUERY,
} from "@/sanity/lib/queries";

import {
  LATEST_POSTS_FOR_CATEGORY_QUERYResult,
  FULL_CATEGORY_QUERYResult,
} from "@/../sanity.types";

import CategoryPage from "@/components/pages/category-page";

export const revalidate = 86400 // invalidate every day

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
    },
  });

  return <CategoryPage posts={posts} category={category} />;
}
