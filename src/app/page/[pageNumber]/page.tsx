import { sanityFetch } from "@/sanity/lib/client";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";

import HomePage from "@/components/pages/home-page";

type Props = {
  params: Promise<{ pageNumber: string }>;
};

export default async function Page({ params }: { params: Props["params"] }) {
  const { pageNumber = 2 } = await params;
  const posts = await sanityFetch<LATEST_POSTS_QUERYResult>({
    query: LATEST_POSTS_QUERY,
    params: {
      pageNumber,
      // start: PAGE_SIZE * (pageNumber - 1),
      // end: PAGE_SIZE * pageNumber,
    }
  });

  return (
    <HomePage posts={posts} />
  );
}