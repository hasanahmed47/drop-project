import { motion } from 'framer-motion';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote: 'The most consistent flat white in Karachi — every single cup tastes intentional.',
    name: 'Ayesha K.',
    role: 'Coffee Blogger',
    stars: 5,
    initials: 'AK',
  },
  {
    quote: 'Their cold brew ruined every other cold brew for me. Smooth, never bitter.',
    name: 'Bilal R.',
    role: 'Regular Customer',
    stars: 5,
    initials: 'BR',
  },
  {
    quote: 'Warm space, faster than expected delivery, and the cardamom blend is unreal.',
    name: 'Sana M.',
    role: 'Event Host',
    stars: 5,
    initials: 'SM',
  },
];

function Stars({ count }) {
  return (
    <div className="testimonials__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function Testimonials() {
  return (
    <section className="testimonials">
      <motion.div
        className="testimonials__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="testimonials__eyebrow">GUEST STORIES</span>
        <h2 className="testimonials__title">Loved by Our Regulars</h2>
        <p className="testimonials__sub">Real words from the people who make DROP worth it.</p>
      </motion.div>

      <motion.div
        className="testimonials__list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {TESTIMONIALS.map((item) => (
          <motion.div key={item.name} className="testimonials__card" variants={cardVariants}>
            <Stars count={item.stars} />
            <p className="testimonials__quote">"{item.quote}"</p>
            <div className="testimonials__author">
              <span className="testimonials__avatar">{item.initials}</span>
              <div className="testimonials__author-info">
                <span className="testimonials__name">{item.name}</span>
                <span className="testimonials__role">{item.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Testimonials;
