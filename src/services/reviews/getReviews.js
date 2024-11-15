import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();

  // Retrieve all reviews from the database
  const reviews = await prisma.review.findMany();

  return reviews;
};

export default getReviews;
