import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import PageTransition from '../../components/PageTransition/PageTransition';
import CoffeeCard from '../../components/CoffeeCard/CoffeeCard';
import { coffees } from '../../data/coffees';
import { selectFavoriteIds } from '../../redux/favoritesSlice';
import './Favorites.css';

function Favorites() {
  const favoriteIds = useSelector(selectFavoriteIds);
  const favoriteCoffees = coffees.filter((coffee) => favoriteIds.includes(coffee.id));

  return (
    <PageTransition>
      <section className="favorites-page">
        <h2>Your Favorites</h2>

        {favoriteCoffees.length === 0 ? (
          <p className="favorites-page__empty">
            You haven't favorited any coffee yet — tap the heart icon on a coffee card.
          </p>
        ) : (
          <motion.div className="favorites-page__grid" layout>
            <AnimatePresence>
              {favoriteCoffees.map((coffee) => (
                <motion.div key={coffee.id} layout exit={{ opacity: 0, scale: 0.9 }}>
                  <CoffeeCard coffee={coffee} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </PageTransition>
  );
}

export default Favorites;
