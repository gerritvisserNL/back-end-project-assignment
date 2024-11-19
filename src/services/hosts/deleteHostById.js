import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteHostById = async (id) => {
  try {
    // Delete all related properties of the host first
    await prisma.property.deleteMany({
      where: {
        hostId: id,
      },
    });

    // Delete the host afterwards
    const host = await prisma.host.delete({
      where: { id },
    });

    // If the host is successfully deleted, return the id, otherwise return null
    return host ? id : null;
  } catch (error) {
    console.error("Error deleting host:", error);
    throw new Error("Failed to delete host.");
  }
};

export default deleteHostById;
