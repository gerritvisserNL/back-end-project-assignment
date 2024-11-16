import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Placed outside function to prevent repeated creation of PrismaClient.

const getProperties = async (location, pricePerNight, amenities) => {
  // Empty filter object
  const filter = {};

  // Add filters only if they have a value
  if (location) {
    filter.location = { contains: location, mode: "insensitive" }; // Case-insensitive search for location
  }
  if (pricePerNight) {
    filter.pricePerNight = { lte: parseFloat(pricePerNight) }; // Less than or equal to the given price
  }
  if (amenities) {
    const amenitiesArray = amenities.split(","); // Split amenities into an array
    filter.amenities = { hasSome: amenitiesArray }; // Matches properties with at least one of the amenities
  }

  // Retrieve properties with the constructed filter
  const properties = await prisma.property.findMany({
    where: filter,
  });

  return properties;
};

export default getProperties;
