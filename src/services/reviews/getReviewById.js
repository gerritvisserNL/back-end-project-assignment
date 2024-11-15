import { PrismaClient } from "@prisma/client";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();

  // Retrieve a single review by its unique ID
  const review = await prisma.review.findUnique({
    where: { id },
  });

  return review;
};

export default getReviewById;
