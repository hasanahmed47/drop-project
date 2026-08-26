import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './src/config/db.js';
import setupSocket from './src/sockets/index.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

import authRoutes from './src/routes/authRoutes.js';
import coffeeRoutes from './src/routes/coffeeRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import couponRoutes from './src/routes/couponRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';

const app = express();
const httpServer = createServer(app);

connectDB();

const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));
app.use(express.json());

const io = setupSocket(httpServer);
app.set('io', io);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'drop-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/coffees', coffeeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`DROP backend running on port ${PORT}`);
});
