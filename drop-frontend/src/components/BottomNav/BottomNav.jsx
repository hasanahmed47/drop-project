import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { selectCartCount } from '../../redux/cartSlice';
import { selectIsAuthenticated } from '../../redux/authSlice';
import './BottomNav.css';

function BottomNav() {
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const tabs = [
    { label: 'Home', to: '/', icon: HomeOutlinedIcon },
    { label: 'Menu', to: '/menu', icon: RestaurantMenuOutlinedIcon },
    { label: 'Cart', to: '/cart', icon: ShoppingBagOutlinedIcon, showCartBadge: true },
    { label: 'Favorites', to: '/favorites', icon: FavoriteBorderIcon },
    {
      label: 'Account',
      to: isAuthenticated ? '/orders' : '/login',
      icon: PersonOutlineOutlinedIcon,
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.to;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.label}
            to={tab.to}
            className={`bottom-nav__tab ${isActive ? 'bottom-nav__tab--active' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bottom-nav__icon-wrap">
              {tab.showCartBadge && cartCount > 0 ? (
                <Badge badgeContent={cartCount} color="warning">
                  <Icon />
                </Badge>
              ) : (
                <Icon />
              )}
              {isActive && (
                <motion.span
                  className="bottom-nav__indicator"
                  layoutId="bottomNavIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
            </div>
            <span className="bottom-nav__label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
