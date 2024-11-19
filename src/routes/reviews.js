import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new review
router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// Get all reviews with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.query;

    // getReviews call with filter
    const reviews = await getReviews(userId, propertyId, rating, comment);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// Get a specific review by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

// Update a review by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const review = await updateReviewById(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a review by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
