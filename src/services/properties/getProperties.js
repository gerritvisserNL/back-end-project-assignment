import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();
  const properties = await prisma.properties.findMany();

  return properties;
};

export default getProperties;
