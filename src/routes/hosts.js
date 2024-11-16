import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new host
router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

// Get all hosts with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, profilePicture, aboutMe } =
      req.query;

    // getHosts call with filter
    const hosts = await getHosts({
      username,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });
    res.json(hosts);
  } catch (error) {
    next(error);
  }
});

// Get a specific host by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (!host) {
      res.status(404).json({ message: `Host with id ${id} not found` });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

// Update a host by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const host = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Host with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a host by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await deleteHostById(id);

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} successfully deleted`,
        host,
      });
    } else {
      res.status(404).json({
        message: `Host with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
