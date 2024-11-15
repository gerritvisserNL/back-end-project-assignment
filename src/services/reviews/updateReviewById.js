import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  // Update the review by its ID using the updatedReview object
  const review = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });

  // Return the ID if the update was successful, or null if no review was updated
  return review.count > 0 ? id : null;
};

export default updateReviewById;
