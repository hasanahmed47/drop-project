import Order from '../models/Order.js';
import Coupon from '../models/Coupon.js';
import { sendEmail, orderConfirmationTemplate } from '../utils/sendEmail.js';

async function createOrder(req, res, next) {
  try {
    const { items, total, paymentMethod, address, phone, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (!coupon || coupon.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Coupon is invalid or has expired' });
      }
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      paymentMethod,
      address,
      phone,
      couponCode,
    });

    const io = req.app.get('io');
    if (io) {
      io.to('admins').emit('newOrder', order);
      io.to(`user:${req.user._id}`).emit('orderStatusUpdated', {
        orderId: order._id,
        status: order.status,
      });
    }

    sendEmail({
      to: req.user.email,
      subject: 'Your DROP order is confirmed',
      html: orderConfirmationTemplate(order),
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    const io = req.app.get('io');
    if (io) {
      io.to(`user:${order.user}`).emit('orderStatusUpdated', {
        orderId: order._id,
        status: order.status,
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

export { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus };
