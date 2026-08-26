import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toggleFavorite, selectFavoriteIds } from '../../redux/favoritesSlice';
import { addToCart } from '../../redux/cartSlice';
import { triggerCartFly } from '../../utils/cartFlyBus';
import './MenuListCard.css';

function MenuListCard({ coffee, index = 0 }) {
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
    <motion.div
      className="menu-list-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/coffee/${coffee.id}`} className="menu-list-card__image-wrap">
        <img src={coffee.image} alt={coffee.name} className="menu-list-card__image" />
        <IconButton className="menu-list-card__favorite" onClick={handleToggleFavorite}>
          <motion.span
            animate={{ rotate: isFavorite ? [0, -15, 15, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#c68a4b' }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: '#fff' }} />
            )}
          </motion.span>
        </IconButton>
      </Link>

      <div className="menu-list-card__body">
        <div className="menu-list-card__title-row">
          <Link to={`/coffee/${coffee.id}`} className="menu-list-card__title">
            {coffee.name}
          </Link>
          <span className="menu-list-card__price">Rs. {coffee.price}</span>
        </div>

        <p className="menu-list-card__description">{coffee.description}</p>

        <Button variant="contained" color="warning" fullWidth onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

export default MenuListCard;
