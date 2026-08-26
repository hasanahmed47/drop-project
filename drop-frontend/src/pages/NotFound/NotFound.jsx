import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import './NotFound.css';

function NotFound() {
  return (
    <PageTransition>
      <section className="not-found-page">
        <motion.div
          className="not-found-page__cup"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ☕
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404 — This cup ran empty.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The page you're looking for doesn't exist.
        </motion.p>

        <Button variant="contained" color="warning" size="large" component={Link} to="/">
          Back to Home
        </Button>
      </section>
    </PageTransition>
  );
}

export default NotFound;
