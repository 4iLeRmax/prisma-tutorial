import { updatePost } from "@/app/lib/actions/posts";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (post === null) redirect("/posts");

  return (
    <>
      <div>
        <div className="flex items-center justify-start">
          <Link href={"/posts"}>{"<"} Go back</Link>
        </div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <form
          action={updatePost.bind(null, post.id)}
          className="flex flex-col gap-2 text-black max-w-[400px]"
        >
          <input
            type="text"
            name="title"
            placeholder="Title..."
            defaultValue={post.title}
          />
          <input
            type="text"
            name="content"
            placeholder="Content..."
            defaultValue={post.content}
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md text-white"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
