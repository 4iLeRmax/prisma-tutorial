import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "First Post",
    slug: "first-post",
    content: "This is the first post!",
    author: {
      connectOrCreate: {
        where: {
          email: "max@example.com",
        },
        create: {
          email: "admin@example.com",
          hashedPassword: "qwerty",
        },
      },
    },
  },
];

async function main() {
  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
