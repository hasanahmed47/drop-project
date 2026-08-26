import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import './ReviewCard.css';

function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      className="review-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="review-card__header">
        <span className="review-card__name">{review.name}</span>
        <span className="review-card__date">{review.date}</span>
      </div>

      <div className="review-card__stars">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <StarIcon
            key={starIndex}
            sx={{
              fontSize: 18,
              color: starIndex < review.rating ? '#c68a4b' : '#e3d8c8',
            }}
          />
        ))}
      </div>

      <p className="review-card__comment">{review.comment}</p>
    </motion.div>
  );
}

export default ReviewCard;
