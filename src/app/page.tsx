import { sanityFetch } from "@/sanity/lib/client";
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
import getDeviceType from "@/utils/mobile";

export const revalidate = 86400 // invalidate every day

export default async function Page() {
  const deviceType = await getDeviceType()
  const posts = await sanityFetch<LATEST_POSTS_QUERYResult>({
    query: LATEST_POSTS_QUERY,
    params: {
      start: 0,
      end: PAGE_SIZE,
    },
  });

  const count = await sanityFetch<ALL_POSTS_COUNT_QUERYResult>({
    query: ALL_POSTS_COUNT_QUERY,
  });

  return <HomePage posts={posts} count={count} pageNumber={1} deviceType={deviceType} />;
}
