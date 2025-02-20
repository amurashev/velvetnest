import type { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/lib/client";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";

import { LATEST_POSTS_QUERYResult } from "@/../sanity.types";
import { blogPostRoute } from "@/constants/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<LATEST_POSTS_QUERYResult>({
    query: LATEST_POSTS_QUERY,
  });

  const pages = [
    {
      url: "https://velvetnest.club",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ] as MetadataRoute.Sitemap;

  posts.forEach((item) => {
    const blogPostUrl = blogPostRoute.getUrl({
      params: {
        slug: item?.slug?.current as string,
      },
    });

    pages.push({
      url: `https://velvetnest.club${blogPostUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return pages;
}
