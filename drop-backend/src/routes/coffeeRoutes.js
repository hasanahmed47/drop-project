import express from 'express';
import {
  getCoffees,
  getCoffeeById,
  createCoffee,
  updateCoffee,
  deleteCoffee,
} from '../controllers/coffeeController.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/', getCoffees);
router.get('/:id', getCoffeeById);
router.post('/', protect, authorize('admin'), createCoffee);
router.put('/:id', protect, authorize('admin'), updateCoffee);
router.delete('/:id', protect, authorize('admin'), deleteCoffee);

export default router;
