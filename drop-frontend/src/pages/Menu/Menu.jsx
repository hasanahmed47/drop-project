import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuFilters from '../../components/MenuFilters/MenuFilters';
import MenuListCard from '../../components/MenuListCard/MenuListCard';
import PageTransition from '../../components/PageTransition/PageTransition';
import { coffees } from '../../data/coffees';
import './Menu.css';

function Menu() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredCoffees = useMemo(() => {
    return coffees.filter((coffee) => {
      const matchesCategory = activeCategory === 'All' || coffee.category === activeCategory;
      const matchesSearch = coffee.name.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchValue]);

  return (
    <PageTransition>
      <section className="menu-page">
        <div className="menu-page__header">
          <span className="menu-page__eyebrow">CRAFTED WITH PASSION</span>
          <h2>Our Menu</h2>
        </div>

        <MenuFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <div className="menu-page__list">
          {filteredCoffees.map((coffee, index) => (
            <MenuListCard key={coffee.id} coffee={coffee} index={index} />
          ))}
        </div>

        {filteredCoffees.length === 0 && (
          <p className="menu-page__empty">No coffee matches your search.</p>
        )}
      </section>
    </PageTransition>
  );
}

export default Menu;
