import { Router } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { items, shopId, deliveryAddress, deliveryLocation, paymentMethod = 'cod' } = req.body;
    if (!Array.isArray(items) || !items.length || !shopId || !deliveryAddress) {
      return res.status(400).json({ error: 'items, shopId and deliveryAddress are required' });
    }
    if (!['cod', 'upi', 'phonepe', 'paytm', 'card'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'Unsupported payment method' });
    }
    // Recalculate all prices server-side; never trust prices supplied by the client.
    const ids = items.map(i => i.productId);
    if (ids.some(id => !mongoose.isValidObjectId(id))) return res.status(400).json({ error: 'Invalid product ID' });
    const products = await Product.find({ _id: { $in: ids }, isActive: true }).lean();
    if (products.length !== new Set(ids).size) return res.status(400).json({ error: 'One or more products are unavailable' });
    if (products.some(p => String(p.shop) !== String(shopId))) return res.status(400).json({ error: 'A single-shop order is required in this MVP' });
    const byId = new Map(products.map(p => [String(p._id), p]));
    const orderItems = items.map(i => {
      const p = byId.get(String(i.productId));
      const quantity = Math.floor(Number(i.quantity));
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) throw Object.assign(new Error('Quantity must be between 1 and 99'), { status: 400 });
      if (p.stock < quantity) throw Object.assign(new Error(`Insufficient stock for ${p.name}`), { status: 409 });
      return { product: p._id, nameSnapshot: p.name, quantity, unitPrice: p.price };
    });
    const subtotal = orderItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const deliveryFee = 0; // Replace with transparent location/merchant-based fee calculation.
    const order = await Order.create({
      shopId, items: orderItems, deliveryAddress, deliveryLocation, paymentMethod,
      subtotal, deliveryFee, total: subtotal + deliveryFee,
      paymentStatus: paymentMethod === 'cod' ? 'cod_due' : 'pending'
    });
    res.status(201).json({ order, note: 'Demo order created. Real payment capture and dispatch are not configured.' });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid order ID' });
    const order = await Order.findById(req.params.id).populate('shopId', 'name address').lean();
    if (!order) return res.status(404).json({ error: 'Order not found' });
    // TODO: enforce customer/partner/admin authorization before production.
    res.json(order);
  } catch (e) { next(e); }
});

const allowedStatuses = ['accepted','preparing','ready_for_pickup','picked_up','on_the_way','delivered','cancelled'];
router.patch('/:id/status', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid order ID' });
    if (!allowedStatuses.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
    // TODO: role/ownership checks and transition validation are mandatory before production.
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (e) { next(e); }
});
export default router;
