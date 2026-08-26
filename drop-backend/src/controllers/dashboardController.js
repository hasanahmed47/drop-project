import Order from '../models/Order.js';
import Coffee from '../models/Coffee.js';
import User from '../models/User.js';

async function getStats(req, res, next) {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      avgOrderValue: Number(avgOrderValue.toFixed(0)),
    });
  } catch (error) {
    next(error);
  }
}

async function getRevenueByDay(req, res, next) {
  try {
    const results = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);

    const formatted = results.map((entry) => ({
      date: entry._id,
      revenue: entry.revenue,
      orders: entry.orders,
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

async function getPopularCoffees(req, res, next) {
  try {
    const results = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          totalOrdered: { $sum: '$items.quantity' },
        },
      },
      { $sort: { totalOrdered: -1 } },
      { $limit: 6 },
    ]);

    const formatted = results.map((entry) => ({
      name: entry._id,
      totalOrdered: entry.totalOrdered,
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

async function getBestRatedCoffees(req, res, next) {
  try {
    const coffees = await Coffee.find({ reviewsCount: { $gt: 0 } })
      .sort({ rating: -1 })
      .limit(6)
      .select('name rating reviewsCount');

    res.json(coffees);
  } catch (error) {
    next(error);
  }
}

export { getStats, getRevenueByDay, getPopularCoffees, getBestRatedCoffees };
