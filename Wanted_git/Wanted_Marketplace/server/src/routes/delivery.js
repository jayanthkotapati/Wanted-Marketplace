import { Router } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
const router = Router();

router.post('/location', async (req, res, next) => {
  try {
    const { orderId, lat, lng } = req.body;
    if (!mongoose.isValidObjectId(orderId) || !Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Valid orderId, latitude and longitude are required' });
    }
    // TODO: authenticate delivery partner, verify assignment and active delivery,
    // enforce consent/retention policy, and broadcast only to authorized order participants.
    const order = await Order.findByIdAndUpdate(orderId, {
      $push: { tracking: { $each: [{ lat, lng, at: new Date() }], $slice: -100 } }
    }, { new: true, projection: { tracking: { $slice: -1 }, status: 1 } });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ orderId, latestLocation: order.tracking?.[0] || null, status: order.status, note: 'Demo endpoint; live sockets and access control still need configuration.' });
  } catch (e) { next(e); }
});
export default router;
