import { Prisma } from "@prisma/client";

export type Post = Prisma.PostGetPayload<{
  select: {
    title: true;
    slug: true;
    content: true;
  };
}>;
