import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './FlyingCartOverlay.css';

let idCounter = 0;

function getCartTargetPosition() {
  const target = document.querySelector('[data-cart-target="true"]');
  if (target) {
    const rect = target.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }
  return { x: window.innerWidth - 40, y: 40 };
}

function FlyingCartOverlay() {
  const [flights, setFlights] = useState([]);

  const handleRemove = useCallback((id) => {
    setFlights((prev) => prev.filter((flight) => flight.id !== id));
  }, []);

  useEffect(() => {
    function handleFly(event) {
      const { x, y } = event.detail;
      const target = getCartTargetPosition();
      const id = idCounter++;
      setFlights((prev) => [
        ...prev,
        { id, startX: x, startY: y, endX: target.x, endY: target.y },
      ]);
    }

    window.addEventListener('drop:cart-fly', handleFly);
    return () => window.removeEventListener('drop:cart-fly', handleFly);
  }, []);

  return (
    <div className="flying-cart-overlay">
      <AnimatePresence>
        {flights.map((flight) => (
          <motion.span
            key={flight.id}
            className="flying-cart-overlay__icon"
            initial={{
              x: flight.startX,
              y: flight.startY,
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              x: [flight.startX, flight.startX - 20, flight.endX],
              y: [flight.startY, flight.startY - 80, flight.endY],
              scale: [0.5, 1.2, 0.4],
              opacity: [0, 1, 0],
              rotate: [0, -15, 10],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.4, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => handleRemove(flight.id)}
          >
            <ShoppingCartIcon sx={{ fontSize: 26 }} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FlyingCartOverlay;
