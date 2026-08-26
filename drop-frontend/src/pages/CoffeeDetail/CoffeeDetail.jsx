import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import PageTransition from '../../components/PageTransition/PageTransition';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { coffees } from '../../data/coffees';
import { reviews } from '../../data/reviews';
import { addToCart } from '../../redux/cartSlice';
import { toggleFavorite, selectFavoriteIds } from '../../redux/favoritesSlice';
import { triggerCartFly } from '../../utils/cartFlyBus';
import './CoffeeDetail.css';

const TABS = ['Description', 'Nutrition', 'Ingredients'];

function CoffeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const coffee = coffees.find((item) => item.id === id) || coffees[0];
  const coffeeReviews = reviews.filter((review) => review.coffeeId === coffee.id);
  const isFavorite = favoriteIds.includes(coffee.id);

  const [activeTab, setActiveTab] = useState('Description');
  const [quantity, setQuantity] = useState(1);
  const [milkOption, setMilkOption] = useState(coffee.milkOptions[0]);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 400], [0, 60]);

  const handleAddToCart = (event) => {
    dispatch(
      addToCart({
        id: coffee.id,
        name: coffee.name,
        price: coffee.price,
        image: coffee.image,
        milkOption,
        quantity,
      })
    );
    triggerCartFly(event.clientX, event.clientY);
    setTimeout(() => navigate('/cart'), 500);
  };

  return (
    <PageTransition>
      <section className="coffee-detail">
        <div className="coffee-detail__hero">
          <motion.img
            src={coffee.image}
            alt={coffee.name}
            className="coffee-detail__image"
            style={{ y: imageY }}
          />
        </div>

        <div className="coffee-detail__content">
          <div className="coffee-detail__main">
            <div className="coffee-detail__title-row">
              <h1>{coffee.name}</h1>
              <IconButton onClick={() => dispatch(toggleFavorite(coffee.id))}>
                {isFavorite ? (
                  <FavoriteIcon sx={{ color: '#c68a4b' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#181411' }} />
                )}
              </IconButton>
            </div>

            <div className="coffee-detail__chips">
              <Chip label={`Roast: ${coffee.roast}`} />
              <Chip label={`Origin: ${coffee.origin}`} />
              <Chip label={`Strength: ${coffee.strength}/5`} />
            </div>

            <div className="coffee-detail__tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`coffee-detail__tab ${
                    activeTab === tab ? 'coffee-detail__tab--active' : ''
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              className="coffee-detail__tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'Description' && <p>{coffee.description}</p>}

              {activeTab === 'Nutrition' && (
                <ul className="coffee-detail__list">
                  <li>Calories: {coffee.nutrition?.calories ?? '—'} kcal</li>
                  <li>Caffeine: {coffee.nutrition?.caffeine ?? '—'} mg</li>
                  <li>Sugar: {coffee.nutrition?.sugar ?? '—'} g</li>
                </ul>
              )}

              {activeTab === 'Ingredients' && (
                <ul className="coffee-detail__list">
                  {coffee.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}
            </motion.div>

            <section className="coffee-detail__reviews">
              <h3>Customer Reviews</h3>
              <div className="coffee-detail__reviews-grid">
                {coffeeReviews.length > 0 ? (
                  coffeeReviews.map((review, index) => (
                    <ReviewCard key={review.id} review={review} index={index} />
                  ))
                ) : (
                  <p className="coffee-detail__no-reviews">
                    No reviews yet — be the first to try {coffee.name}.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="coffee-detail__sidebar">
            <span className="coffee-detail__price">Rs. {coffee.price}</span>

            <div className="coffee-detail__milk-options">
              <span className="coffee-detail__label">Milk</span>
              <div className="coffee-detail__milk-chips">
                {coffee.milkOptions.map((option) => (
                  <button
                    key={option}
                    className={`coffee-detail__milk-chip ${
                      milkOption === option ? 'coffee-detail__milk-chip--active' : ''
                    }`}
                    onClick={() => setMilkOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="coffee-detail__quantity">
              <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))} size="small">
                <RemoveIcon />
              </IconButton>
              <span>{quantity}</span>
              <IconButton onClick={() => setQuantity((q) => q + 1)} size="small">
                <AddIcon />
              </IconButton>
            </div>

            <Button variant="contained" color="warning" size="large" fullWidth onClick={handleAddToCart}>
              Add to Cart — Rs. {coffee.price * quantity}
            </Button>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}

export default CoffeeDetail;
