import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import PageTransition from '../../components/PageTransition/PageTransition';
import axiosInstance from '../../api/axiosInstance';
import './Orders.css';

const STATUS_STEPS = ['Order Placed', 'Preparing', 'Brewing', 'Out for Delivery', 'Delivered'];

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <motion.div
      className="order-card"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button className="order-card__header" onClick={() => setExpanded((prev) => !prev)}>
        <div>
          <span className="order-card__id">#{order._id.slice(-8).toUpperCase()}</span>
          <span className="order-card__date">
            {new Date(order.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="order-card__header-right">
          <span className="order-card__status-pill">{order.status}</span>
          <span className="order-card__price">Rs. {order.total}</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ExpandMoreIcon />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="order-card__body"
          >
            <div className="order-card__stepper">
              {STATUS_STEPS.map((step, index) => (
                <div key={step} className="order-card__step">
                  <span
                    className={`order-card__step-dot ${
                      index <= currentStepIndex ? 'order-card__step-dot--done' : ''
                    }`}
                  >
                    {index <= currentStepIndex && <CheckIcon sx={{ fontSize: 14 }} />}
                  </span>
                  <span className="order-card__step-label">{step}</span>
                  {index < STATUS_STEPS.length - 1 && (
                    <span
                      className={`order-card__step-line ${
                        index < currentStepIndex ? 'order-card__step-line--done' : ''
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <span className="order-card__section-label">ORDER ITEMS</span>
            {order.items.map((item) => (
              <div key={`${item.name}-${item.milkOption}`} className="order-card__item-row">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}

            <div className="order-card__meta-row">
              <span>Method: {order.paymentMethod}</span>
              <span className="order-card__total">Total Rs. {order.total}</span>
            </div>

            <span className="order-card__section-label">DELIVERY TO</span>
            <p className="order-card__address">
              {order.phone} · {order.address}
            </p>

            <div className="order-card__actions">
              <Button variant="outlined" size="small">
                Reorder
              </Button>
              {order.status === 'Order Placed' && (
                <Button variant="outlined" color="error" size="small">
                  Cancel Order
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axiosInstance.get('/orders/my');
        setOrders(data);
      } catch (error) {
        // Fails quietly — page just stays empty if the backend isn't reachable yet.
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <section className="orders-page">
        <div className="orders-page__header">
          <h2>My Orders</h2>
          <span className="orders-page__live">
            <span className="orders-page__live-dot" />
            Live updates every 30s
          </span>
        </div>

        {loading && <p className="orders-page__empty">Loading your orders...</p>}

        {!loading && orders.length === 0 && (
          <p className="orders-page__empty">No orders yet — your DROP history will show up here.</p>
        )}

        <div className="orders-page__list">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

export default Orders;
