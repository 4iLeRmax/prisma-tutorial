"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { kebabCaseFormatter } from "../kebabCaseFormatter";
import { Prisma } from "@prisma/client";

export const createPost = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const slug = kebabCaseFormatter(title);
    const content = formData.get("content") as string;

    if (title !== "" && content !== "") {
      await prisma.post.create({
        data: {
          title,
          slug,
          content,
          author: {
            connect: {
              email: "max@gmail.com",
            },
          },
        },
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
  }

  revalidatePath("/posts");
};

export const updatePost = async (id: string, formData: FormData) => {
  const title = formData.get("title") as string;
  const slug = kebabCaseFormatter(title);
  const content = formData.get("content") as string;

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      slug,
      content,
    },
  });

  revalidatePath(`/posts/${id}`);
  revalidatePath("/posts");
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/posts");
};
