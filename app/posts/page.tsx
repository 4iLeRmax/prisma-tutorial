import React from "react";
import Link from "next/link";
import prisma from "../lib/prisma";
import CreatePostForm from "../components/CreatePostForm";
import { deletePost } from "../lib/actions/posts";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    // where: {
    //   title: {
    //     contains: "post",
    //   },
    // },
    // orderBy: {
    //   createdAt: "asc",
    // },
    // select: {
    //   id: true,
    //   title: true,
    //   content: true,
    //   createdAt: true,
    // },
    // take: 1,
    // skip: 1,
  });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: "max@gmail.com",
  //   },
  //   include: {
  //     posts: true,
  //   },
  // });

  // if (user === null) return null;
  // console.log(user);

  const postsCount = await prisma.post.count();
  // console.log(posts);

  return (
    <>
      <div>PostsPage</div>
      <div>
        <h2>All Posts ({postsCount})</h2>
        <CreatePostForm />
        <div className="grid grid-cols-2 gap-2">
          {posts.map((post) => (
            <div key={post.id} className="p-2 bg-blue-500 rounded-md">
              <div className="flex items-center justify-between">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                <form action={deletePost.bind(null, post.id)}>
                  <button>X</button>
                </form>
              </div>
              <p>{post.content}</p>
              <div className="text-sm flex items-center justify-end pt-2">
                Created: {post.createdAt.toUTCString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
