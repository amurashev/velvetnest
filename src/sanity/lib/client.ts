import "server-only";

import { createClient, type QueryOptions, type QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { apiVersion, dataset, projectId } from "../env";
import { token } from "./tokens";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const result = await draftMode();

  const { isEnabled } = result;
  if (isEnabled && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  let dynamicRevalidate = revalidate;
  if (isEnabled) {
    // Do not cache in Draft Mode
    dynamicRevalidate = 0;
  } else if (tags.length) {
    // Cache indefinitely if tags supplied, purge with revalidateTag()
    dynamicRevalidate = false;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isEnabled &&
      ({
        token: token,
        perspective: "previewDrafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
}
