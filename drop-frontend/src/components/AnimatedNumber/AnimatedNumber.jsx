import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedNumber({ value, decimals = 0 }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => latest.toFixed(decimals));
  const spanRef = useRef(null);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    });

    const unsubscribe = rounded.on('change', (latest) => {
      if (spanRef.current) {
        spanRef.current.textContent = latest;
      }
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value]);

  return <span ref={spanRef}>{value.toFixed(decimals)}</span>;
}

export default AnimatedNumber;
