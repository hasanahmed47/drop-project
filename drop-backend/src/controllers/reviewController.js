import Review from '../models/Review.js';
import Coffee from '../models/Coffee.js';

async function getReviewsForCoffee(req, res, next) {
  try {
    const reviews = await Review.find({ coffee: req.params.coffeeId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const { coffeeId, rating, comment } = req.body;

    const coffee = await Coffee.findById(coffeeId);
    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' });
    }

    const review = await Review.create({
      coffee: coffeeId,
      user: req.user._id,
      rating,
      comment,
    });

    const allReviews = await Review.find({ coffee: coffeeId });
    const avgRating =
      allReviews.reduce((sum, item) => sum + item.rating, 0) / allReviews.length;

    coffee.rating = Number(avgRating.toFixed(1));
    coffee.reviewsCount = allReviews.length;
    await coffee.save();

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
}

export { getReviewsForCoffee, createReview, deleteReview };
