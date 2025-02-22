import { sanityFetch } from "@/sanity/lib/client";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import HomePage from "@/components/pages/home-page";
import { PAGE_SIZE } from "@/constants/main";

export default async function Page() {
  const posts = await sanityFetch<LATEST_POSTS_QUERYResult>({
    query: LATEST_POSTS_QUERY,
    params: {
      start: 0,
      end: PAGE_SIZE,
    }
  });

  return (
    <HomePage posts={posts} />
  );
}