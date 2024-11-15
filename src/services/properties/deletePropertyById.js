import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();

  // Delete property based on the provided ID
  const property = await prisma.property.deleteMany({
    where: { id },
  });

  // If a property was deleted, return the ID, otherwise return null
  return property.count > 0 ? id : null;
};

export default deletePropertyById;
