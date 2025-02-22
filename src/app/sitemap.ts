import type { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/lib/client";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";

import { ALL_POSTS_QUERYResult } from "@/../sanity.types";
import { blogPostRoute, categoryRoute } from "@/constants/routes";

import CATEGORIES from "@/constants/categories";
import { DOMAIN } from "@/constants/main";

// TODO: Do not generate on demand
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<ALL_POSTS_QUERYResult>({
    query: ALL_POSTS_QUERY,
  });

  const pages = [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ] as MetadataRoute.Sitemap;

  CATEGORIES.forEach((item) => {
    const categoryUrl = categoryRoute.getUrl({ params: { slug: item.slug } });
    pages.push({
      url: `${DOMAIN}${categoryUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });
  });

  posts.forEach((item) => {
    const blogPostUrl = blogPostRoute.getUrl({
      params: {
        slug: item?.slug?.current as string,
      },
    });

    pages.push({
      url: `${DOMAIN}${blogPostUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return pages;
}
