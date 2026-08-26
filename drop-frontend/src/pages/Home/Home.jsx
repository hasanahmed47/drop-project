import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import StatsCounter from '../../components/StatsCounter/StatsCounter';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import Testimonials from '../../components/Testimonials/Testimonials';
import PageTransition from '../../components/PageTransition/PageTransition';
import './Home.css';

/* ─── Craft Story (replaces repetitive card grid) ─────────── */
function CraftStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  return (
    <section className="craft" ref={ref}>
      {/* Left — parallax photo */}
      <div className="craft__img-col">
        <motion.div className="craft__img-track" style={{ y: imgY }}>
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000&q=85"
            alt="Barista at work"
            className="craft__img"
            loading="lazy"
          />
          {/* Floating stat card */}
          <motion.div
            className="craft__float-card"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="craft__float-num">8k+</span>
            <span className="craft__float-label">Happy regulars — and counting</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Right — content */}
      <motion.div className="craft__content" style={{ y: textY }}>
        <motion.span
          className="craft__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          OUR PHILOSOPHY
        </motion.span>

        <motion.h2
          className="craft__heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Crafted with{' '}
          <em className="craft__heading-em">intention,</em>
          <br />
          served with care.
        </motion.h2>

        <motion.p
          className="craft__body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Every cup starts with single-origin beans sourced directly from small farms across
          Ethiopia, Colombia, and Guatemala. We roast in micro-batches every three days —
          so what reaches your hands is never stale, always alive.
        </motion.p>

        <motion.ul
          className="craft__list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          {[
            'Direct-trade, single-origin beans',
            'Micro-batch roasted every 72 hrs',
            'SCA-certified head baristas',
            'Zero artificial flavourings',
          ].map((point) => (
            <li key={point} className="craft__list-item">
              <span className="craft__list-dot" />
              {point}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <Link
            to="/about"
            className="craft__cta"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Our story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Immersive CTA banner ─────────────────────────────────── */
function CTABanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className="cta-banner" ref={ref}>
      <motion.div className="cta-banner__bg" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=85"
          alt="Coffee atmosphere"
          className="cta-banner__img"
          loading="lazy"
        />
        <div className="cta-banner__overlay" />
      </motion.div>

      <div className="cta-banner__content">
        <motion.span
          className="cta-banner__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          READY WHEN YOU ARE
        </motion.span>

        <motion.h2
          className="cta-banner__heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Your next cup awaits.
        </motion.h2>

        <motion.p
          className="cta-banner__sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          Order in minutes, or stop by — we'll have something warm ready for you.
        </motion.p>

        <motion.div
          className="cta-banner__actions"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.26 }}
        >
          <Link
            to="/menu"
            className="cta-banner__btn cta-banner__btn--primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Your Order
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="cta-banner__btn cta-banner__btn--ghost"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Learn about us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Home ────────────────────────────────────────────── */
function Home() {
  return (
    <PageTransition>
      <Hero />
      <StatsCounter />
      <CategoryGrid />
      <CraftStory />
      <Testimonials />
      <CTABanner />
    </PageTransition>
  );
}

export default Home;
