import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Placed outside function to prevent repeated creation of PrismaClient

const getReviews = async (userId, propertyId, rating, comment) => {
  // Empty filter object
  const filter = {};

  // Only add fields to filter that have a value
  if (userId) filter.userId = userId;
  if (propertyId) filter.propertyId = propertyId;
  if (rating) filter.rating = rating;
  if (comment) filter.comment = comment;

  // Retrieve all reviews from the database
  const reviews = await prisma.review.findMany({
    where: filter,
  });

  return reviews;
};

export default getReviews;
