import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Placed outside function to prevent repeated creation of PrismaClient.

const getProperties = async (location, pricePerNight, amenities) => {
  // Empty filter object
  const filter = {};

  // Add filters only if they have a value
  if (location && typeof location === "string") {
    filter.location = { contains: location, mode: "insensitive" }; // Case-insensitive search for location
  }

  if (pricePerNight && !isNaN(pricePerNight)) {
    filter.pricePerNight = { lte: parseFloat(pricePerNight) }; // Less than or equal to the given price
  }

  if (amenities && typeof amenities === "string") {
    // Split the amenities string by commas and remove any extra spaces from each item
    const amenitiesArray = amenities
      .split(",")
      .map((amenity) => amenity.trim());

    // Check if the resulting array has any items
    if (amenitiesArray.length > 0) {
      // Add a filter to match properties that have at least one of the specified amenities
      filter.amenities = { hasSome: amenitiesArray };
    }
  }

  // Retrieve properties with the constructed filter
  const properties = await prisma.property.findMany({
    where: filter,
  });

  return properties;
};

export default getProperties;
