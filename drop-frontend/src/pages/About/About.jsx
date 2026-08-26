import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import './About.css';

const PILLARS = [
  {
    title: 'Craftsmanship',
    text: 'Every cup is pulled and poured by hand, with care baked into every step.',
  },
  {
    title: 'Fresh Beans',
    text: 'We roast in small batches and rotate our origins often, so nothing sits too long.',
  },
  {
    title: 'Slow Brewing',
    text: 'We never rush a brew. Pour overs, cold brew, and espresso all get the time they need.',
  },
  {
    title: 'Community',
    text: 'DROP started as one counter in Karachi — the goal was always a place to slow down.',
  },
];

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <PageTransition>
      <section className="about-page">
        <div className="about-page__hero">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            DROP began with a simple idea: coffee deserves the same attention
            as any other craft. From bean to cup, every drop should matter.
          </motion.p>
        </div>

        <div className="about-page__pillars">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="about-page__pillar"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

export default About;
