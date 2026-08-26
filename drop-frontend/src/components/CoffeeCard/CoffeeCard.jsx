import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Chip, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { toggleFavorite, selectFavoriteIds } from '../../redux/favoritesSlice';
import { addToCart } from '../../redux/cartSlice';
import { triggerCartFly } from '../../utils/cartFlyBus';
import './CoffeeCard.css';

const MotionLink = motion(Link);

function CoffeeCard({ coffee }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(coffee.id);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(
      addToCart({
        id: coffee.id,
        name: coffee.name,
        price: coffee.price,
        image: coffee.image,
        milkOption: coffee.milkOptions[0],
        quantity: 1,
      })
    );
    triggerCartFly(event.clientX, event.clientY);
  };

  const handleToggleFavorite = (event) => {
    event.preventDefault();
    dispatch(toggleFavorite(coffee.id));
  };

  return (
    <MotionLink
      to={`/coffee/${coffee.id}`}
      className="coffee-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="coffee-card__image-wrap">
        <img src={coffee.image} alt={coffee.name} className="coffee-card__image" />
        <IconButton className="coffee-card__favorite" onClick={handleToggleFavorite}>
          <motion.span
            animate={{ rotate: isFavorite ? [0, -15, 15, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#c68a4b' }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: '#181411' }} />
            )}
          </motion.span>
        </IconButton>
      </div>

      <div className="coffee-card__body">
        <Chip label={coffee.roast} size="small" className="coffee-card__chip" />
        <h3 className="coffee-card__title">{coffee.name}</h3>

        <div className="coffee-card__meta">
          <span className="coffee-card__rating">
            <StarIcon sx={{ fontSize: 16, color: '#c68a4b' }} />
            {coffee.rating}
          </span>
          <span className="coffee-card__origin">{coffee.origin}</span>
        </div>

        <div className="coffee-card__footer">
          <span className="coffee-card__price">Rs. {coffee.price}</span>
          <Button variant="contained" color="warning" size="small" onClick={handleAddToCart}>
            Add
          </Button>
        </div>
      </div>
    </MotionLink>
  );
}

export default CoffeeCard;
