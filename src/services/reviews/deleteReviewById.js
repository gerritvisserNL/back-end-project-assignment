import { PrismaClient } from "@prisma/client";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();

  // Delete the review with the given ID
  const review = await prisma.review.deleteMany({
    where: { id },
  });

  // Return the ID if deletion was successful, otherwise return null
  return review.count > 0 ? id : null;
};

export default deleteReviewById;
