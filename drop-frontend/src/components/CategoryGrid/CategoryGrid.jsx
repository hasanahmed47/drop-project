import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const CATEGORIES = [
  {
    eyebrow: 'SIGNATURE',
    title: 'Espresso Based',
    desc: 'Bold pulls, perfect crema',
    category: 'Espresso Based',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80',
  },
  {
    eyebrow: "BARISTA'S PICK",
    title: 'Cold Brew',
    desc: 'Smooth, slow-steeped, ice-cold',
    category: 'Cold Brew',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
  },
  {
    eyebrow: 'CROWD FAVOURITE',
    title: 'Specialty',
    desc: 'Single-origin, craft-roasted',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
  {
    eyebrow: 'LIMITED RELEASE',
    title: 'Seasonal',
    desc: 'Rotating with the harvest',
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function CategoryGrid() {
  return (
    <section className="cat-section">
      <motion.div
        className="cat-section__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="cat-section__eyebrow">CURATED SELECTIONS</span>
        <h2 className="cat-section__title">Explore Our Categories</h2>
        <p className="cat-section__sub">
          From bright pour overs to bold nitro brews — each category tells its own story.
        </p>
      </motion.div>

      <motion.div
        className="cat-section__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {CATEGORIES.map((item) => (
          <motion.div key={item.category} className="cat-card" variants={cardVariants}>
            <Link
              to={`/menu?category=${encodeURIComponent(item.category)}`}
              className="cat-card__inner"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Photo */}
              <div className="cat-card__img-wrap">
                <img src={item.image} alt={item.title} className="cat-card__img" loading="lazy" />
                <div className="cat-card__img-overlay" />
              </div>

              {/* Content */}
              <div className="cat-card__body">
                <span className="cat-card__eyebrow">{item.eyebrow}</span>
                <h3 className="cat-card__title">{item.title}</h3>
                <p className="cat-card__desc">{item.desc}</p>
                <span className="cat-card__cta">
                  Discover
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default CategoryGrid;
