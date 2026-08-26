import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import './StatsCounter.css';

const STATS = [
  { value: 25, suffix: '+', label: 'Coffee Blends' },
  { value: 8, suffix: 'k+', label: 'Happy Regulars' },
  { value: 5, suffix: ' yrs', label: 'Of Craft' },
  { value: 30, suffix: ' min', label: 'Avg. Delivery' },
];

function StatItem({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const spanRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return undefined;

    const controls = animate(motionValue, value, {
      duration: 1.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });

    const unsubscribe = motionValue.on('change', (latest) => {
      if (spanRef.current) {
        spanRef.current.textContent = Math.round(latest);
      }
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, value, delay, motionValue]);

  return (
    <motion.div
      ref={ref}
      className="stats-counter__item"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="stats-counter__value">
        <span ref={spanRef}>0</span>
        {suffix}
      </span>
      <span className="stats-counter__label">{label}</span>
    </motion.div>
  );
}

function StatsCounter() {
  return (
    <section className="stats-counter">
      {STATS.map((stat, index) => (
        <StatItem key={stat.label} {...stat} delay={index * 0.1} />
      ))}
    </section>
  );
}

export default StatsCounter;
