import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async (
  username,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  // Empty filter object
  const filter = {};

  // Only add fields to filter that have a value
  if (username) filter.username = username;
  if (name) filter.name = name;
  if (email) filter.email = email;
  if (phoneNumber) filter.phoneNumber = phoneNumber;
  if (profilePicture) filter.profilePicture = profilePicture;
  if (aboutMe) filter.aboutMe = aboutMe;

  const hosts = await prisma.host.findMany({
    where: filter,
  });

  return hosts;
};

export default getHosts;
