import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.update({
    where: { id },
    data: updatedAmenity,
  });

  return amenity ? id : null;
};

export default updateAmenityById;
