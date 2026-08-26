import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Button, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { selectCartCount } from '../../redux/cartSlice';
import { selectIsAuthenticated, selectUser, logout } from '../../redux/authSlice';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Coffee Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  // Only the home page has a full-bleed dark hero — everywhere else
  // needs a solid background so the navbar text is always legible.
  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solidNav = !isHeroPage || scrolled;

  return (
    <motion.header
      className={`navbar ${solidNav ? 'navbar--solid' : ''}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
          <Link
            to="/"
            className="navbar__logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            DROP
          </Link>
        </motion.div>

        <nav className="navbar__links">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    className="navbar__indicator"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="navbar__actions">
          <IconButton className="navbar__icon-btn" aria-label="Search">
            <SearchIcon />
          </IconButton>

          {/* Account / Login */}
          {isAuthenticated ? (
            <>
              <IconButton className="navbar__icon-btn" onClick={handleMenuOpen}>
                <Avatar sx={{ width: 26, height: 26, bgcolor: '#c68a4b', fontSize: '0.85rem' }}>
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1.5, backgroundColor: '#1a1512', color: '#f6f1ea', border: '1px solid rgba(198, 138, 75, 0.2)' }
                }}
              >
                <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>My Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              className="navbar__icon-btn"
              aria-label="Login"
              component={Link}
              to="/login"
            >
              <PersonOutlineIcon />
            </IconButton>
          )}

          <IconButton
            className="navbar__icon-btn"
            aria-label="Favorites"
            component={Link}
            to="/favorites"
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            className="navbar__icon-btn"
            aria-label="Cart"
            component={Link}
            to="/cart"
            data-cart-target="true"
          >
            <Badge badgeContent={cartCount} color="warning">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
          <Button
            variant="contained"
            color="warning"
            className="navbar__cta"
            component={Link}
            to="/menu"
          >
            Order Now
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
