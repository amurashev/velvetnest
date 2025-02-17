import Link from "next/link";

import { POSTS_QUERYResult } from "@/../sanity.types";

import { toPlainText } from "@portabletext/react";

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const blogPostUrl = post?.slug?.current as string;

        return (
          <Link href={blogPostUrl} className="block" key={post._id}>
            <div>
              <div className="font-bold text-lg flex-grow min-w-[1px] truncate mt-1">
                {post?.title as string}
              </div>

              {post.body && post.body.length > 0 && (
                <p className="line-clamp-2 text-muted-foreground h-[48px]">
                  {post.body ? toPlainText(post.body).slice(0, 255) : ""}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}


export default async function Articles({ posts }: { posts: POSTS_QUERYResult }) {

  return (
    <div>
      <h1 className="text-2xl font-bold">Posts</h1>
      <Posts posts={posts} />
    </div>
  );
}