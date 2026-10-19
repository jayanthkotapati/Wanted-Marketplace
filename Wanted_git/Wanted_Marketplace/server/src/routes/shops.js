import { Router } from 'express';
import Shop from '../models/Shop.js';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const { city, kind, q, limit = 50 } = req.query;
    const filter = {};
    if (city) filter.city = new RegExp(`^${String(city).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
    if (kind) filter.kind = kind;
    if (q) filter.name = { $regex: String(q).slice(0, 80), $options: 'i' };
    const items = await Shop.find(filter).sort({ isVerified: -1, name: 1 }).limit(Math.min(Number(limit)||50,100)).lean();
    res.json({ items });
  } catch (e) { next(e); }
});
router.post('/', async (req, res, next) => {
  try {
    const { name, kind, address, city, country, description, location } = req.body;
    if (!name || !address || !city) return res.status(400).json({ error: 'name, address and city are required' });
    // New shops are unverified until reviewed by an authorized admin.
    const shop = await Shop.create({ name, kind, address, city, country, description, location, isVerified: false });
    res.status(201).json(shop);
  } catch (e) { next(e); }
});
export default router;
