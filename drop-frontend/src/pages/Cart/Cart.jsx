import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PageTransition from '../../components/PageTransition/PageTransition';
import AnimatedNumber from '../../components/AnimatedNumber/AnimatedNumber';
import {
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../../redux/cartSlice';
import { selectIsAuthenticated } from '../../redux/authSlice';
import { setCheckoutItems } from '../../redux/uiSlice';
import './Cart.css';

function itemKey(item) {
  return `${item.id}-${item.milkOption}`;
}

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [selectedKeys, setSelectedKeys] = useState(() => new Set(items.map(itemKey)));

  const toggleItem = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedKeys.size === items.length) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(items.map(itemKey)));
    }
  };

  const selectedItems = useMemo(
    () => items.filter((item) => selectedKeys.has(itemKey(item))),
    [items, selectedKeys]
  );

  const selectedTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceed = () => {
    dispatch(setCheckoutItems(selectedItems));
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <PageTransition>
      <section className="cart-page">
        <div className="cart-page__header">
          <h2>Your Cart</h2>
        </div>

        {items.length === 0 ? (
          <div className="cart-page__empty">
            <p>Your cart is empty.</p>
            <Button variant="contained" color="warning" component={Link} to="/menu">
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-page__select-row">
              <label className="cart-page__select-all">
                <Checkbox
                  checked={selectedKeys.size === items.length}
                  indeterminate={selectedKeys.size > 0 && selectedKeys.size < items.length}
                  onChange={toggleAll}
                  sx={{ color: '#c68a4b', '&.Mui-checked': { color: '#c68a4b' } }}
                />
                {selectedKeys.size}/{items.length} selected
              </label>
              <Button variant="outlined" color="error" size="small" onClick={() => dispatch(clearCart())}>
                Clear All
              </Button>
            </div>

            <div className="cart-page__list">
              <AnimatePresence>
                {items.map((item) => {
                  const key = itemKey(item);
                  const isSelected = selectedKeys.has(key);

                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="cart-page__item"
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleItem(key)}
                        sx={{ color: '#c68a4b', '&.Mui-checked': { color: '#c68a4b' } }}
                      />
                      <img src={item.image} alt={item.name} className="cart-page__item-image" />

                      <div className="cart-page__item-info">
                        <span className="cart-page__item-name">{item.name}</span>
                        <span className="cart-page__item-unit">Rs. {item.price} each</span>

                        <div className="cart-page__item-controls">
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(decrementQuantity({ id: item.id, milkOption: item.milkOption }))
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(incrementQuantity({ id: item.id, milkOption: item.milkOption }))
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>

                      <div className="cart-page__item-right">
                        <IconButton
                          size="small"
                          onClick={() =>
                            dispatch(removeFromCart({ id: item.id, milkOption: item.milkOption }))
                          }
                        >
                          <DeleteOutlineIcon sx={{ color: '#b4432d' }} fontSize="small" />
                        </IconButton>
                        <span className="cart-page__item-total">Rs. {item.price * item.quantity}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="cart-page__summary">
              <span className="cart-page__summary-label">ORDER SUMMARY</span>

              <div className="cart-page__summary-row">
                <span>Selected ({selectedItems.length} items)</span>
                <span>Rs. {selectedTotal}</span>
              </div>

              <div className="cart-page__topay">
                <span>To Pay</span>
                <span className="cart-page__topay-value">
                  Rs. <AnimatedNumber value={selectedTotal} />
                </span>
              </div>

              {!isAuthenticated && (
                <div className="cart-page__auth-notice">
                  <InfoOutlinedIcon fontSize="small" />
                  Please login to place an order
                </div>
              )}

              <Button
                variant="contained"
                color="warning"
                size="large"
                fullWidth
                disabled={selectedItems.length === 0}
                onClick={handleProceed}
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>

              <Link to="/menu" className="cart-page__continue">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </section>
    </PageTransition>
  );
}

export default Cart;
