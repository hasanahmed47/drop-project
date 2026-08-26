import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TextField, Button, Card } from '@mui/material';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import PageTransition from '../../components/PageTransition/PageTransition';
import AnimatedNumber from '../../components/AnimatedNumber/AnimatedNumber';
import axiosInstance from '../../api/axiosInstance';
import { selectCartItems, removeFromCart } from '../../redux/cartSlice';
import { selectCheckoutItems, clearCheckoutItems } from '../../redux/uiSlice';
import './Checkout.css';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', subtitle: 'Pay when it arrives', icon: PaymentsOutlinedIcon },
  { id: 'jazzcash', label: 'JazzCash', subtitle: 'Mobile wallet', icon: PhoneAndroidOutlinedIcon },
  { id: 'easypaisa', label: 'Easypaisa', subtitle: 'Mobile wallet', icon: PhoneAndroidOutlinedIcon },
  { id: 'bank', label: 'Bank Transfer', subtitle: 'Direct deposit', icon: AccountBalanceOutlinedIcon },
];

const WALLET_ACCOUNTS = {
  jazzcash: '0300-1234567 (DROP Coffee)',
  easypaisa: '0333-9876543 (DROP Coffee)',
  bank: 'DROP Coffee — Meezan Bank — 01234567890123',
};

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const checkoutItems = useSelector(selectCheckoutItems);
  const items = checkoutItems.length > 0 ? checkoutItems : cartItems;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [transactionId, setTransactionId] = useState('');
  const [coupon, setCoupon] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const [status, setStatus] = useState('idle');
  const [placedOrder, setPlacedOrder] = useState(null);

  const isWallet = ['jazzcash', 'easypaisa', 'bank'].includes(paymentMethod);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async () => {
    const nextErrors = {};
    ['name', 'phone', 'address', 'city'].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = true;
    });
    if (isWallet && !transactionId.trim()) {
      nextErrors.transactionId = true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus('loading');

    try {
      const { data } = await axiosInstance.post('/orders', {
        items: items.map((item) => ({
          coffee: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          milkOption: item.milkOption,
        })),
        total,
        paymentMethod,
        address: `${form.address}, ${form.city}`,
        phone: form.phone,
        couponCode: coupon || undefined,
      });

      items.forEach((item) => dispatch(removeFromCart({ id: item.id, milkOption: item.milkOption })));
      dispatch(clearCheckoutItems());
      setPlacedOrder(data);
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      setErrors({ submit: error.response?.data?.message || 'Could not place order, please try again.' });
    }
  };

  if (status === 'success') {
    return (
      <PageTransition>
        <section className="checkout checkout--success">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <CheckCircleIcon sx={{ fontSize: 72, color: '#6b8f71' }} />
            <h2>Order placed!</h2>
            <p>Order #{placedOrder?._id?.slice(-8).toUpperCase()} is being prepared.</p>
            <Button variant="contained" color="warning" component={Link} to="/orders">
              Track My Orders
            </Button>
          </motion.div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="checkout">
        <div className="checkout__form">
          <h2>Checkout</h2>

          {['name', 'phone', 'address', 'city'].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={errors[field] ? 'checkout__field--shake' : ''}
            >
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange(field)}
                error={!!errors[field]}
                helperText={errors[field] ? 'This field is required' : ''}
                margin="normal"
              />
            </motion.div>
          ))}

          <TextField
            fullWidth
            label="Delivery Notes (optional)"
            value={form.notes}
            onChange={handleChange('notes')}
            margin="normal"
          />

          <h3 className="checkout__section-title">Payment Method</h3>
          <div className="checkout__payment-list">
            {PAYMENT_METHODS.map(({ id, label, subtitle, icon: Icon }) => (
              <motion.button
                key={id}
                type="button"
                className={`checkout__payment-row ${
                  paymentMethod === id ? 'checkout__payment-row--active' : ''
                }`}
                whileHover={{ y: -2 }}
                onClick={() => setPaymentMethod(id)}
              >
                <Icon sx={{ fontSize: 24, color: paymentMethod === id ? '#c68a4b' : '#8c7b6b' }} />
                <span className="checkout__payment-text">
                  <span className="checkout__payment-label">{label}</span>
                  <span className="checkout__payment-subtitle">{subtitle}</span>
                </span>
                {paymentMethod === id && <CheckIcon sx={{ color: '#c68a4b' }} />}
              </motion.button>
            ))}
          </div>

          {isWallet && (
            <motion.div
              className="checkout__wallet-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="checkout__wallet-title">
                {PAYMENT_METHODS.find((method) => method.id === paymentMethod)?.label} Account
              </span>
              <p className="checkout__wallet-account">{WALLET_ACCOUNTS[paymentMethod]}</p>
              <p className="checkout__wallet-instruction">
                Send Rs. {total} to the above account and enter your transaction ID below.
              </p>

              <TextField
                fullWidth
                label="Transaction ID / Reference"
                value={transactionId}
                onChange={(event) => setTransactionId(event.target.value)}
                error={!!errors.transactionId}
                helperText={
                  errors.transactionId
                    ? 'Transaction ID is required'
                    : 'Enter the transaction ID from your payment app'
                }
                margin="normal"
              />
            </motion.div>
          )}

          {errors.submit && <p className="checkout__submit-error">{errors.submit}</p>}

          <Button
            variant="contained"
            color="warning"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={status === 'loading' || items.length === 0}
          >
            {status === 'loading' ? 'Placing order...' : `Place Order — Rs. ${total}`}
          </Button>
        </div>

        <Card className="checkout__summary">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div key={`${item.id}-${item.milkOption}`} className="checkout__summary-row">
              <span>
                {item.name} <span className="checkout__summary-qty">×{item.quantity}</span>
              </span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}

          <button
            type="button"
            className="checkout__coupon-toggle"
            onClick={() => setShowCoupon((prev) => !prev)}
          >
            🏷️ Have a promo code? {showCoupon ? '▲' : '▼'}
          </button>

          {showCoupon && (
            <TextField
              fullWidth
              size="small"
              label="Promo Code"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              margin="dense"
            />
          )}

          <div className="checkout__summary-total">
            <span>Total</span>
            <span>
              Rs. <AnimatedNumber value={total} />
            </span>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}

export default Checkout;
