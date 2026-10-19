import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, type, q, shop, limit = 40, page = 1 } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (shop) filter.shop = shop;
    if (q) filter.$text = { $search: String(q).slice(0, 100) };
    const safeLimit = Math.min(Math.max(Number(limit) || 40, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const [items, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
      Product.countDocuments(filter)
    ]);
    res.json({ items, page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) });
  } catch (e) { next(e); }
});

// TODO: Protect with verified authentication + shop ownership/admin authorization before production.
router.post('/', async (req, res, next) => {
  try {
    const { name, category, price, type, unit, stock, shop, description, imageUrl } = req.body;
    if (!name || !category || price === undefined) return res.status(400).json({ error: 'name, category and price are required' });
    const product = await Product.create({ name, category, price, type, unit, stock, shop, description, imageUrl });
    res.status(201).json(product);
  } catch (e) { next(e); }
});
export default router;
