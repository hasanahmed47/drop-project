import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PageTransition from '../../components/PageTransition/PageTransition';
import './OrderTracking.css';

const STEPS = [
  { label: 'Order Placed', status: 'complete' },
  { label: 'Preparing', status: 'complete' },
  { label: 'Brewing', status: 'active' },
  { label: 'Out for Delivery', status: 'pending' },
  { label: 'Delivered', status: 'pending' },
];

function OrderTracking() {
  const completedCount = STEPS.filter((step) => step.status === 'complete').length;
  const activeIndex = STEPS.findIndex((step) => step.status === 'active');
  const progressPercent = ((completedCount + (activeIndex >= 0 ? 0.5 : 0)) / STEPS.length) * 100;

  return (
    <PageTransition>
      <section className="order-tracking">
        <h2>Track Your Order</h2>
        <p className="order-tracking__subtitle">Order #DROP-24681</p>

        <div className="order-tracking__timeline">
          <div className="order-tracking__line">
            <motion.div
              className="order-tracking__line-fill"
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="order-tracking__steps">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.label}
                className={`order-tracking__step order-tracking__step--${step.status}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="order-tracking__icon">
                  {step.status === 'complete' ? (
                    <CheckCircleIcon sx={{ color: '#c68a4b' }} />
                  ) : (
                    <RadioButtonUncheckedIcon
                      sx={{ color: step.status === 'active' ? '#c68a4b' : '#e3d8c8' }}
                    />
                  )}
                </span>
                <span className="order-tracking__label">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default OrderTracking;
