import express from 'express';
import {
  getStats,
  getRevenueByDay,
  getPopularCoffees,
  getBestRatedCoffees,
} from '../controllers/dashboardController.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/revenue-by-day', getRevenueByDay);
router.get('/popular-coffees', getPopularCoffees);
router.get('/best-rated', getBestRatedCoffees);

export default router;
