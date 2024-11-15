import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.amenity.deleteMany({
    where: { id },
  });

  return event.count > 0 ? id : null;
};

export default deleteAmenityById;
