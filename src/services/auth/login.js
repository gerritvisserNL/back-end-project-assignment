import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  // Search for user by username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return null; // No user found
  }

  // Compare passwords
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return null; // Incorrect password
  }

  // Generate token
  const token = jwt.sign({ userId: user.id }, secretKey);

  return token;
};

export default login;
