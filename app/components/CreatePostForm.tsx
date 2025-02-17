import React from "react";
import { createPost } from "../lib/actions/posts";

export default function CreatePostForm() {
  return (
    <>
      <form
        action={createPost}
        className="flex flex-col gap-2 text-black max-w-[400px] mb-2"
      >
        <input type="text" name="title" placeholder="Title..." />
        <input type="text" name="content" placeholder="Content..." />
        <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">
          Create
        </button>
      </form>
    </>
  );
}
