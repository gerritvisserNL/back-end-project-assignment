import { PrismaClient } from "@prisma/client";

const getUsers = async (
  id,
  username,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  // Empty filter object
  const filter = {};

  // Only add fields to filter that have a value
  if (id) filter.id = id;
  if (username) filter.username = username;
  if (name) filter.name = name;
  if (email) filter.email = email;
  if (phoneNumber) filter.phoneNumber = phoneNumber;
  if (profilePicture) filter.profilePicture = profilePicture;

  // Find users who match filter criteria
  const users = await prisma.user.findMany({
    where: filter,
  });

  return users;
};

export default getUsers;
