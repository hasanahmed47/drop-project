import { InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import './MenuFilters.css';

const CATEGORIES = ['All', 'Espresso Based', 'Cold Brew', 'Specialty', 'Seasonal'];

function MenuFilters({ activeCategory, onCategoryChange, searchValue, onSearchChange }) {
  return (
    <div className="menu-filters">
      <div className="menu-filters__search">
        <SearchIcon sx={{ color: 'var(--color-muted)', fontSize: 22 }} />
        <InputBase
          placeholder="Search coffee..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="menu-filters__search-input"
          fullWidth
        />
      </div>

      <div className="menu-filters__chips">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`menu-filters__chip ${
              activeCategory === category ? 'menu-filters__chip--active' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
            {activeCategory === category && (
              <motion.span
                className="menu-filters__chip-bg"
                layoutId="chipBg"
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MenuFilters;
