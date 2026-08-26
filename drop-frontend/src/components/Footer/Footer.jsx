import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Footer.css';

// Update these URLs to the real social profiles when ready
const SOCIAL_LINKS = [
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/dropcoffeebar',
    label: 'Instagram',
  },
  {
    icon: FacebookIcon,
    href: 'https://www.facebook.com/dropcoffeebar',
    label: 'Facebook',
  },
];

const SECTIONS = [
  {
    title: 'Explore',
    defaultOpen: false,
    links: [
      { label: 'Home', to: '/' },
      { label: 'Menu', to: '/menu' },
      { label: 'Favorites', to: '/favorites' },
      { label: 'My Orders', to: '/orders' },
      { label: 'Cart', to: '/cart' },
    ],
  },
  {
    title: 'Hours',
    lines: ['Mon – Fri: 7:00 AM – 10:00 PM', 'Sat – Sun: 8:00 AM – 11:00 PM'],
  },
  {
    title: 'Visit',
    lines: ['Clifton, Karachi, Pakistan', '+92 300 1234567'],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function FooterAccordionItem({ section }) {
  const [open, setOpen] = useState(Boolean(section.defaultOpen));

  return (
    <div className="footer__accordion-item">
      <button className="footer__accordion-header" onClick={() => setOpen((prev) => !prev)}>
        <span>{section.title.toUpperCase()}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ExpandMoreIcon />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="footer__accordion-body"
          >
            {section.links?.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="footer__accordion-link"
                onClick={scrollTop}
              >
                {link.label}
              </Link>
            ))}
            {section.lines?.map((line) => (
              <p key={line} className="footer__accordion-line">
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer__brand">
        <Link to="/" className="footer__logo" onClick={scrollTop}>
          DROP
        </Link>
        <p className="footer__tagline">
          Specialty coffee, redefined. Small-batch beans slow-brewed with care, served with warmth.
        </p>
        <div className="footer__socials">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer__social-link"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__accordion">
        {SECTIONS.map((section) => (
          <FooterAccordionItem key={section.title} section={section} />
        ))}
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} DROP Coffee House. All rights reserved.</span>
      </div>
    </motion.footer>
  );
}

export default Footer;
