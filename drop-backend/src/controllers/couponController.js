import Coupon from '../models/Coupon.js';

async function getCoupons(req, res, next) {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    next(error);
  }
}

async function createCoupon(req, res, next) {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    next(error);
  }
}

async function updateCoupon(req, res, next) {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    next(error);
  }
}

async function deleteCoupon(req, res, next) {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
}

async function validateCoupon(req, res, next) {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code: code?.toUpperCase(), isActive: true });

    if (!coupon || coupon.expiresAt < new Date()) {
      return res.status(400).json({ valid: false, message: 'Coupon is invalid or expired' });
    }

    res.json({ valid: true, discountPercent: coupon.discountPercent });
  } catch (error) {
    next(error);
  }
}

export { getCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon };
