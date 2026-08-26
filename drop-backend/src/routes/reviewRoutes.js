import express from 'express';
import {
  getReviewsForCoffee,
  createReview,
  deleteReview,
} from '../controllers/reviewController.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/coffee/:coffeeId', getReviewsForCoffee);
router.post('/', protect, createReview);
router.delete('/:id', protect, authorize('admin'), deleteReview);

export default router;
