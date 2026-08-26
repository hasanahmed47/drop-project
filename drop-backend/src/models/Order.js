import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    coffee: {
      type: String,
      required: true,
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1,
    },
    milkOption: String,
  },
  { _id: false }
);

const ORDER_STATUSES = [
  'Order Placed',
  'Preparing',
  'Brewing',
  'Out for Delivery',
  'Delivered',
];

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'Order Placed',
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'card'],
      default: 'cod',
    },
    couponCode: String,
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const orderStatuses = ORDER_STATUSES;

const Order = mongoose.model('Order', orderSchema);

export default Order;
