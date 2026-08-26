import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Hero.css';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80',
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero__bg">
        <AnimatePresence mode="sync">
          <motion.img
            key={HERO_IMAGES[activeIndex]}
            src={HERO_IMAGES[activeIndex]}
            alt="DROP specialty coffee"
            className="hero__bg-image"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <StarIcon sx={{ fontSize: 16 }} />
          Specialty Coffee · Karachi
        </motion.div>

        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Every Drop
          <span className="hero__heading-accent"> Matters.</span>
        </motion.h1>

        <motion.p
          className="hero__subheading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          Small-batch beans, slow-brewed with care — a specialty coffee house
          built for people who taste the difference.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            variant="contained"
            color="warning"
            size="large"
            component={Link}
            to="/menu"
            endIcon={<ArrowForwardIcon />}
          >
            Explore the Menu
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/menu"
            className="hero__outline-btn"
          >
            Order Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
