import { Router } from "express";
import bcrypt from "bcrypt";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new user
router.post("/", auth, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(
      username,
      hashedPassword,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const { id, username, name, email, phoneNumber, profilePicture } =
      req.query;
    const users = await getUsers(
      id,
      username,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Get a specific user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

// Update a user by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    // Hash the password if provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await updateUserById(id, {
      username,
      password: hashedPassword || password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a user by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (deletedUser) {
      res
        .status(200)
        .json({ message: `User with id ${id} successfully deleted` });
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
